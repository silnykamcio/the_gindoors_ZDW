import psycopg2


class DBError(Exception):
    def __init__(self, message="Unknown error"):
        self.message = message
        super().__init__(self.message)


class DataBaseManager:
    __connection = None
    __cursor = None

    @staticmethod
    def __get_point(xy):
        if len(xy) != 2:
            print(f"Bad coordinates format! should be 2 values, found {len(xy)}.")
            return None
        return f"ST_Transform(ST_GeomFromText('POINT({xy[1]} {xy[0]})',4326),2180)"

    def connect(self, host='192.168.9.172', port=5432, user='postgres', password='postgres', dbname='zdwola'):
        try:
            self.__connection = psycopg2.connect(
                f"dbname='{dbname}' user='{user}' host='{host}' password='{password}' port='{port}'")
            self.__cursor = self.__connection.cursor()
        except Exception as e:
            raise DBError(f"Unable to connect to database! Reason:{e}")

    def disconnect(self):
        if self.__connection is not None:
            self.__cursor.close()
            self.__connection.close()

    def __execute_query(self, query):
        if self.__cursor is None:
            raise DBError("Empty cursor! Check database connection status.")
        try:
            self.__cursor.execute(query)
        except Exception as e:
            raise DBError(f"Unable to execute query! Reason:{e}")

    def __fetch_one_result(self):
        try:
            val = self.__cursor.fetchone()
            if val is None:
                raise DBError(f"No records fetched!")
            return val
        except Exception as e:
            raise DBError(f"Unable to fetch! Reason:{e}")


    def check_connection(self):
        try:
            self.__execute_query("SELECT 1")
            return True
        except Exception as e:
            return False


    def insert_air_quality_measurement(self, name, datetime, pm1, pm10, pm25, latlong):
        point = self.__get_point(latlong)
        self.__execute_query(f"INSERT INTO air_quality (pm1, pm10, pm25,name,datetime,geometry)\
                                VALUES({pm1}, {pm10}, {pm25}, '{name}', TO_TIMESTAMP('{datetime}','YYYY-MM-DD HH24:MI:SS'),{point})\
                                ON CONFLICT (name,datetime) DO NOTHING")

    def get_closest_building_id(self, latlong):
        point = self.__get_point(latlong)
        self.__execute_query(f"SELECT id FROM buildings\
                              WHERE buildings.build_fun::text LIKE '11%'\
                              ORDER BY ST_DISTANCE(buildings.geometry,{point})\
                              LIMIT 1")
        id = self.__fetch_one_result()
        return id[0]

    def get_building_area_by_id(self, building_id):
        self.__execute_query(f"SELECT area as use_area FROM buildings\
                                      WHERE buildings.id = {building_id}")
        area = self.__fetch_one_result()
        return area[0]

    def get_building_use_area_by_id(self, building_id):
        self.__execute_query(f"SELECT (area*floor_count) as use_area FROM buildings\
                                      WHERE buildings.id = {building_id}")
        area = self.__fetch_one_result()
        return area[0]

    def get_building_centroid_by_id(self, building_id):
        self.__execute_query(f"SELECT ST_Centroid(buildings.geometry) FROM buildings\
                                      WHERE buildings.id = {building_id}")
        centroid = self.__fetch_one_result()
        return centroid[0]

    def get_building_xy_by_id(self, building_id):
        self.__execute_query(f"SELECT ST_X(ST_Centroid(buildings.geometry)) as X, ST_Y(ST_Centroid(buildings.geometry)) as Y FROM buildings\
                                      WHERE buildings.id = {building_id}")
        centroid = self.__fetch_one_result()
        return centroid[0],centroid[1]

    def get_distance_to_heatpipe_by_id(self, building_id):
        self.__execute_query(f"SELECT ST_DISTANCE(buildings.geometry,heatpipes.geometry) as dist, planned_year\
        FROM buildings, heatpipes\
        WHERE buildings.id = {building_id}\
        ORDER BY dist\
        LIMIT 1")
        pipe_info = self.__fetch_one_result()
        return pipe_info[0],pipe_info[1]

    def get_distance_and_geom_to_heatpipe_by_id(self, building_id):
        self.__execute_query(f"SELECT ST_AsGeoJSON(st_transform(st_makeline(st_closestpoint(buildings.geometry, heatpipes.geometry),\
        st_closestpoint(heatpipes.geometry,buildings.geometry)),4326)), planned_year,\
        ST_DISTANCE(buildings.geometry,heatpipes.geometry) as dist\
        FROM buildings, heatpipes\
        WHERE buildings.id = {building_id}\
        ORDER BY dist\
        LIMIT 1")
        pipe_info = self.__fetch_one_result()
        return pipe_info[0],pipe_info[1],pipe_info[2]

    def get_distance_to_gaspipe_by_id(self, building_id):
        self.__execute_query(f"SELECT ST_DISTANCE(buildings.geometry,gaspipes.geometry) as dist, planned_year\
        FROM buildings, gaspipes\
        WHERE buildings.id = {building_id}\
        ORDER BY dist\
        LIMIT 1")
        pipe_info = self.__fetch_one_result()
        return pipe_info[0],pipe_info[1]

    def get_distance_and_geom_to_gaspipe_by_id(self, building_id):
        self.__execute_query(f"SELECT ST_AsGeoJSON(st_transform(st_makeline(st_closestpoint(buildings.geometry, gaspipes.geometry),\
        st_closestpoint(gaspipes.geometry,buildings.geometry)),4326)), planned_year,\
        ST_DISTANCE(buildings.geometry,gaspipes.geometry) as dist\
        FROM buildings, gaspipes\
        WHERE buildings.id = {building_id}\
        ORDER BY dist\
        LIMIT 1")
        pipe_info = self.__fetch_one_result()
        return pipe_info[0],pipe_info[1],pipe_info[2]

    def get_gaspipe_network_as_geojson(self):
        self.__execute_query(f"SELECT st_asgeojson(st_union(ST_Transform(gaspipes.geometry,4326))) FROM gaspipes WHERE planned_year is NOT NULL")
        network = self.__fetch_one_result()
        return network

    def get_planned_gaspipe_network_as_geojson(self):
        self.__execute_query(f"SELECT st_asgeojson(st_union(ST_Transform(gaspipes.geometry,4326))) FROM gaspipes WHERE planned_year is NULL")
        network = self.__fetch_one_result()
        return network

    def get_heatpipe_network_as_geojson(self):
        self.__execute_query(f"SELECT st_asgeojson(st_union(ST_Transform(heatpipes.geometry,4326))) FROM heatpipes WHERE planned_year is NOT NULL")
        network = self.__fetch_one_result()
        return network

    def get_planned_heatpipe_network_as_geojson(self):
        self.__execute_query(f"SELECT st_asgeojson(st_union(ST_Transform(heatpipes.geometry,4326))) FROM heatpipes WHERE planned_year is NULL")
        network = self.__fetch_one_result()
        return network


    def get_air_quality_at_building_id(self, building_id):
        self.__execute_query(f"SELECT ST_Value(pm1.rast, ST_Centroid(buildings.geometry))\
                                FROM pm1, buildings\
                                WHERE ST_Intersects(pm1.rast, ST_Centroid(buildings.geometry)) AND buildings.id = {building_id}")
        value = self.__fetch_one_result()
        return value[0]

    def get_air_quality_at_point(self, latlong):
        point = self.__get_point(latlong)
        self.__execute_query(f"SELECT ST_Value(pm10.rast, {point})\
                                FROM pm10\
                                WHERE ST_Intersects(pm10.rast, {point})")
        value = self.__fetch_one_result()
        return value[0]

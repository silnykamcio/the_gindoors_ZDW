import configparser
import json
from enum import Enum
from flask_cors import CORS

import markdown
import requests
from flask import Flask
from flask_restful import Api
from markupsafe import escape

from db_manager import DataBaseManager, DBError


class InfoCodes(int, Enum):
    OPERATION_DONE_NO_ERROR = 4,
    NO_DATA_TO_FETCH = 5,
    QUERY_EXECUTION_ERROR = 6,
    CURSOR_NOT_INIT_ERROR = 7,
    DB_CONNECTION_FAILED = 8


config = configparser.ConfigParser()
config.read('config.conf')

# Create an instance of Flask
app = Flask(__name__)

# Create the API
api = Api(app)
dbm = DataBaseManager()


def connect_database():
    dbData = config['Database']
    try:
        dbm.connect(dbData['Host'], dbData['Port'], dbData['User'], dbData['Password'], dbData['DB'])
    except BaseException as e:
        print(e)
        return {}, 500


@app.route("/")
def index():
    """Present some documentation"""

    # Open the README file
    with open('README.md', 'r', encoding="utf-8") as markdown_file:
        # Read the content of the file
        content = markdown_file.read()

        # Convert to HTML
        return markdown.markdown(content)


@app.route("/building/get-id/<float:lat>,<float:lon>")
def get_building_id(lat, lon):
    if dbm.check_connection():
        latlon = (escape(lat), escape(lon))
        try:
            id = dbm.get_closest_building_id(latlon)
            return {'lat': lat, 'lon': lon, 'buildingId': id}, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/network/heatpipe-distance/<int:id>")
def get_distance_to_heatpipe(id):
    if dbm.check_connection():
        try:
            dist, year = dbm.get_distance_to_heatpipe_by_id(id)
            planned = True if year is not None else False
            response = {'buildingId': id, 'distanceHeatpipe': dist, 'planned': planned}
            if planned:
                response['year'] = int(year)
            return response, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route('/network/get-dist-geom-heat/<int:id>')
def get_distance_and_geom_to_heatpipe(id):
    if dbm.check_connection():
        try:
            geom, year, dist = dbm.get_distance_and_geom_to_heatpipe_by_id(id)
            planned = True if year is not None else False
            response = {'buildingId': id, 'geom': geom, 'distanceHeatpipe': dist, 'planned': planned}
            if planned:
                response['year'] = int(year)
            return response, 200
        except Exception as e:
            print(e)
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/network/gaspipe-distance/<int:id>")
def get_distance_to_gaspipe(id):
    if dbm.check_connection():
        try:
            dist, year = dbm.get_distance_to_gaspipe_by_id(id)
            planned = True if year is not None else False
            response = {'buildingId': id, 'distanceGaspipe': dist, 'planned': planned}
            if planned:
                response['year'] = int(year)
            return response, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route('/network/get-dist-geom-gas/<int:id>')
def get_distance_and_geom_to_gaspipe(id):
    if dbm.check_connection():
        try:
            geom, year, distance = dbm.get_distance_and_geom_to_gaspipe_by_id(id)
            planned = True if year is not None else False
            response = {'buildingId': id, 'distanceGaspipe': distance, 'geom': geom, 'planned': planned}
            if planned:
                response['year'] = int(year)
            return response, 200
        except Exception as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/air/quality/point/<float:lat>,<float:lon>")
def get_air_quality_point(lat, lon):
    if dbm.check_connection():
        try:
            aq_value = dbm.get_air_quality_at_point([lat, lon])
            return {'lat': lat, 'lon': lon, 'airQuality': aq_value}, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/air/quality/building/<int:id>")
def get_air_quality_building(id):
    if dbm.check_connection():
        try:
            aq_value = dbm.get_air_quality_at_building_id(id)
            return {'buildingId': id, 'airQuality': aq_value}, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/building/use-area/<int:id>")
def get_building_use_area(id):
    if dbm.check_connection():
        try:
            area = dbm.get_building_use_area_by_id(id)
            return {'buildingId': id, 'useArea': area}, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/building/area/<int:id>")
def get_building_area(id):
    if dbm.check_connection():
        try:
            area = dbm.get_building_area_by_id(id)
            return {'buildingId': id, 'area': area}, 200
        except DBError as e:
            print(e)
            return {'errorCode': json.dumps(InfoCodes.NO_DATA_TO_FETCH)}, 500
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route("/building/parcel-region/<int:id>")
def get_parcel_region(id):
    if dbm.check_connection():
        x, y = dbm.get_building_xy_by_id(id)
        xy = f"{float(x)},{float(y)}"
        print(xy)
        try:
            # Dane rejestru powiatowego (TERYT - oznaczenie działki)
            teryt = requests.get(f"https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy={xy}&result=teryt").text
            region = teryt.strip().split('.')[1]
            parcel = teryt.strip().split('.')[2]
            return {'buildingId': id, 'xy': xy, 'region': region, 'parcel': parcel}, 200
        except Exception as e:
            print(e)
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route('/network/get-geojson-heat')
def get_heatpipe_geojson():
    if dbm.check_connection():
        try:
            geom = dbm.get_heatpipe_network_as_geojson()
            return {'geom': geom}, 200
        except Exception as e:
            print(e)
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route('/network/get-geojson-heat-planned')
def get_heatpipe_geojson_planned():
    if dbm.check_connection():
        try:
            geom = dbm.get_planned_heatpipe_network_as_geojson()
            return {'geom': geom}, 200
        except Exception as e:
            print(e)
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500

@app.route('/network/get-geojson-gas')
def get_gaspipe_geojson():
    if dbm.check_connection():
        try:
            geom = dbm.get_gaspipe_network_as_geojson()[0]
            return {'type':'Feature','geometry': geom}, 200
        except Exception as e:
            print(e)
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


@app.route('/network/get-geojson-gas-planned')
def get_gaspipe_geojson_planned():
    if dbm.check_connection():
        try:
            geom = dbm.get_planned_gaspipe_network_as_geojson()
            return {'geom': geom}, 200
        except Exception as e:
            print(e)
    else:
        connect_database()
        return {'errorCode': json.dumps(InfoCodes.DB_CONNECTION_FAILED)}, 500


if __name__ == '__main__':
    # TODO: exception przy połączeniu
    connect_database()
    app_config = config['Flask_app']
    cors = CORS(app)
    app.run(host=app_config['Host'], port=app_config['Port'])

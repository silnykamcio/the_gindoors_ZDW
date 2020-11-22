import pandas as pd
import psycopg2
import geopandas as gpd
import numpy as np

from sqlalchemy import create_engine


def harmonize_buildings(filename):
    gdf = gpd.read_file(filename)
    gdf = gdf[["funOgolnaB", "zabytek", "liczbaKond", "geometry"]]
    gdf = gdf.rename(columns={"funOgolnaB": "build_fun", "zabytek": "is_relic", "liczbaKond": "floor_count"})
    gdf['area'] = gdf['geometry'].area
    gdf['is_relic'] = np.where(gdf['is_relic'] == 'T', True, False)
    return gdf


def harmonize_heatpipes(filename):
    gdf = gpd.read_file(filename)
    gdf = gdf[['nazwaDrogi', 'inwestycja', 'geometry']]
    gdf = gdf.rename(columns={'nazwaDrogi': 'street_name', 'inwestycja': 'planned_year'})
    return gdf


if __name__ == '__main__':
    db_connection_url = "postgres://postgres:postgres@localhost:5432/zdwola";

    engine = create_engine(db_connection_url)

    # gdf = harmonize_buildings('F:\\ZD_dane\\ZD_BUBD.shp')
    gdf = harmonize_heatpipes('F:\\ZD_dane\\ZD_siec_cieplownicza.shp')
    gdf.to_postgis(name="heatpipes", con=engine)

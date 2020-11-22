# gindoors-zw-backend



## API

### Lista endpointów

#### - ID budynku najbliższego podanym współrzędnym geograficznym

**Definicja**

```GET /building/get-id/{coords}```

**Przykład:**

```/building/get-id/51.6061606,18.9423702```

**Return:** 

Status: 200 OK
```json
    {
      "buildingId": 8890,
      "lat": 50.1,
      "lon": 20.2
    }
```
#### - Odległość i geometria przyłącza od budynku do sieci ciepłowniczej (rok budowy jeśli planowana)

**Definicja**

```GET /network/get-dist-geom-heat/{buildingId}```

**Przykład:**

```/network/get-dist-geom-heat/8890```

**Return:** 

Status: 200 OK

```json
    {
        "buildingId": 1346,
        "distanceHeatpipe": 47.37388651991135,
        "geom": "{\"type\":\"LineString\",\"coordinates\":[[18.950750157,51.593538581],[18.951160206,51.593879649]]}",
        "planned": false
    }
```


#### - Odległość i geometria przyłącza od budynku do sieci gazowniczej (rok budowy jeśli planowana)

**Definicja**

```GET /network/get-dist-geom-gas/{buildingId}```

**Przykład:**

```/network/get-dist-geom-gas/8890```

**Return:** 

Status: 200 OK

```json
    {
        "buildingId": 8890,
        "distanceGaspipe": 168.87347008929007,
        "geom": "{\"type\":\"LineString\",\"coordinates\":[[19.021208109,51.562107305],[19.019001662,51.562752126]]}",
        "planned": true,
        "year": 2022
    }
```


#### - Sama odległość od budynku do sieci gazowniczej

**Definicja**

```GET /network/gaspipe-distance/{buildingId}```

**Przykład:**

```/network/gaspipe-distance/8890```

**Return:** 

Status: 200 OK
```json
    {
        "buildingId": 8890,
        "distanceGaspipe": 168.87347008929007,
        "planned": true,
        "year": 2022
    }
```

#### - Sama odległość od budynku do sieci ciepłowniczej  

**Definicja**

```GET /network/heatpipe-distance/{buildingId}```

**Przykład:**

```/network/heatpipe-distance/1346```

**Return:** 

Status: 200 OK
```json
    {   
        "buildingId": 1346,
        "distanceHeatpipe": 47.37388651991135,
        "planned": false
    }
```

#### - Jakość powietrza w centroidzie budynku

**Definicja**

```GET /air/quality/building/{buildingId}```

**Przykład:**

```/air/quality/building/8890```

**Return:** 

Status: 200 OK

```json
    {
        "airQuality": 51.128454,
        "buildingId": 8890
    }
```

#### - Powierzchnia przyziemia budynku
**Definicja**

```GET /building/area/{buildingId}```

**Przykład:**

```/building/area/1223```

**Return:**

```
    {
        "area": 114.84270000014968,
        "buildingId": 1223
    }
```

#### - Powierzchnia użytkowa budynku (pow. przyziemia * l. kondygnacji)

**Definicja**

```GET /building/use-area/{buildingId}```

**Przykład:**

```/building/use-area/1223```

**Return:** 

Status: 200 OK
```json
    {
        "buildingId": 1223,
        "useArea": 344.52810000044906
    }
```
#### - Numer obrębu i działki

**Definicja**

```GET /building/parcel-region/{buildingId}```

**Przykład:**

```/building/parcel-region/1234```

**Return:** 

Status: 200 OK
```json
    {
        "buildingId": 1234,
        "parcel": "119",
        "region": "0015",
        "xy": "496017.5698224337,413528.3990275133"
    }
```

#### - Sieć gazownicza (obecna, geometria)

**Definicja**

```GET /network/get-geojson-gas```

**Przykład:**

```/network/get-geojson-gas```

**Return:** 

Status: 200 OK
```json
    {
        "geom":  [
        "{\"type\":\"MultiLineString\",\"coordinates\":[[[18.938652791,51.587102775],[18.938941522,51.587131437]],...]}"
        ]
    }
```

#### - Sieć gazownicza (planowana, geometria)

**Definicja**

```GET /network/get-geojson-gas-planned```

**Przykład:**

```/network/get-geojson-gas-planned```

**Return:** 

Status: 200 OK
```json
    {
        "geom":  [
        "{\"type\":\"MultiLineString\",\"coordinates\":[[[18.938652791,51.587102775],[18.938941522,51.587131437]],...]}"
        ]
    }
```

#### - Sieć ciepłownicza (obecna, geometria)

**Definicja**

```GET /network/get-geojson-heat```

**Przykład:**

```/network/get-geojson-heat```

**Return:** 

Status: 200 OK
```json
    {
        "geom":  [
        "{\"type\":\"MultiLineString\",\"coordinates\":[[[18.938652791,51.587102775],[18.938941522,51.587131437]],...]}"
        ]
    }
```

#### - Sieć ciepłownicza (planowana, geometria)

**Definicja**

```GET /network/get-geojson-heat-planned```

**Przykład:**

```/network/get-geojson-heat-planned```

**Return:** 

Status: 200 OK
```json
    {
        "geom":  [
        "{\"type\":\"MultiLineString\",\"coordinates\":[[[18.938652791,51.587102775],[18.938941522,51.587131437]],...]}"
        ]
    }
```


###Kody błędów:

Przykład:
```
{
    "errorCode": "5"
}
```

- NO_DATA_TO_FETCH = 5,
- QUERY_EXECUTION_ERROR = 6,
- CURSOR_NOT_INIT_ERROR = 7,
- DB_CONNECTION_FAILED = 8

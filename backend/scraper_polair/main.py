import requests
from bs4 import BeautifulSoup
from db_manager import DataBaseManager

# Na potrzeby hackathonu - hardcodowane współrzędne poszczególnych stacji pomiarów
# Docelowo integracja wsp. z danymi udostępnionymi przez PolAir - systemem którego miastem pilotażowym jest Zduńska Wola
coords = {
    'ul. Żytnia (311)': [51.6058015091409, 18.95211304120645],  # ul. Żytnia 19/23
    'ul. Świerkowa (312)': [51.580683193993806, 18.96102737703184],  # ul. Świerkowa 65
    'ul. Okrzei (313)': [51.57232999600319, 19.006728971678434],  # ul. Okrzei 11
    'ul. 1 Maja (314)': [51.57652767870696, 19.00230329742634],  # 1 Maja 27
    'SP6 (315)': [51.58749429956766, 18.920670261233372],  # ul. Złota 67
    'SP7 (316)': [51.609688785456754, 18.93076511395268],  # ul. Wodna 32
    'Ratusz (323)': [51.60266318169839, 18.93271863656263]  # pl. Wolności
}

html_doc = requests.get('https://www.airqlab.pl/polair_ZW.php').text

soup = BeautifulSoup(html_doc, 'lxml')

dbm = DataBaseManager()
dbm.connect()

for row in soup.find_all('tr')[1:]:
    name = row.contents[0].text
    datetime = row.contents[1].text
    datetime += ':00:00'
    pm10 = row.contents[5].text
    pm25 = row.contents[6].text
    pm1 = row.contents[7].text
    dbm.insert_air_quality_measurement(name, datetime, pm1, pm10, pm25, coords[name])


# Aplikacja Energetyczna transformacja miasta Zduńska Wola
### Utworzono w ramach Hackathonu PFR dla Miast. Wyzwanie miasta Zduńska Wola
### Zespół: __The GINdoors__
__Skład__
1. Alicja Konkol - Frontend/UX/UI
2. Kacper Łobodecki - Frontend/UX/UI
3. Jakub Łobodecki - Frontend/Team Leader
4. Mateusz Białek - Backend
5. Kamil Choromański - Backend

Link do wersji on-line aplikacji: TUTAJ LINK



### Instrukcja instalacji
__UWAGA!__ Instalacja całego stacku technologicznego od zera może być procesem bardzo czasochłonnym - zaleca się skorzystanie z przygotowanej wersji on-line
1. Na architekturę aplikacji składają się dwie części - backend oraz frontend. W celu uruchomienia aplikacji lokalnie należy zacząć od poprawnego skonfigurowania części backend
2. Wymagane oprogramowanie:
- PostgreSQL 12.5
- PostGIS 3.0.3
- Python 3.8.5 z bibliotekami
  - psycopg2
  - requests
  - flask
  - flask_restful
  - markdown
  - markupsafe
- flask
- GeoServer 2.18
3. Po instalacji powyższego oprgramowania należy skolonować repozytorium
4. Plik dump bazy danych (dump.sql) należy wczytać do Postgresa do wcześniej utworzonej BD z zainicjowanym dodatkiem postGIS
- sudo -u postgres psql createdb zdwola -O postgres <- Utworzenie bazy danych (przykład)
- Aktywacja PostGIS:
  - sudo -u postgres psql -d zdwola
  - CREATE EXTENSION postgis;
- Import dumpa bazy:  sudo -u postgres psql -f dump.sql -d zdwola -p 5432 -U postgres (przykład)
5. Załączony do repozytorium plik rastrowy (pm10_raster.tif) z interpolacją dziennych danych o zanieczyszczeniu powietrza należy podpiąć pod wartswę WMS Geoserver w schemacie cite o nazwie pm10_raster: cite:pm10_raster
6. Jako styl warstwy należy dodać następujący kod znajdujący się w pliku raster_style.sld
7. W pliku config.conf należy podać odpowiednie parametry bazy danych oraz flask - ip (zapewne localhost, porty, nazwę bazy danych, użytkownika i hasło)
8. Po skonfigurowaniu części serwerowej aplikacji wystarczy uruchomić plik index.html z folderu frontend


 

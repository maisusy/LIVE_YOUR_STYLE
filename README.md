# -----BACK----- #

RUN 
```
python3 manage.py makemigrations --settings=core.settings.dev 
python3 manage.py migrate --settings=core.settings.dev 
python3 manage.py createsuperuser --settings=core.settings.dev 
python3 manage.py runserver --settings=core.settings.dev 
```
INSTALL ENTORNO
```bash
# actualizar paquetes
sudo apt install python3-pip
sudo apt install python3-venv

# crear y activar entorno
python3 -m venv entorno
source entorno/bin/activate

# instalar dependencias del backend
sudo apt install python3-django
python3 -m pip install django
python3 -m pip install django-admin
python3 -m pip install djangorestframework
python3 -m pip install django-cors-headers
python3 -m pip install psycopg2-binary
pip install django-environ
pip install python-decouple
pip install djangorestframework-simplejwt
python -m pip install Pillow
```


# ----FRONT----- #

RUN
```bash
ng serve --open
```

INSTALL
```bash
npm install -g @angular/cli
npm i primeng
npm i primeflex 
npm i primeicons
```
O
```bash
npm i 
```

# -----DOCKERCOMPOSE----- #
RUN
```bash
docker-compose up
```

STOP
```bash
docker-compose down
```

INSTALL
```bash
pip install --upgrade docker-compose
```
O
```bash
pip install --force-reinstall docker-compose
```
O
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```


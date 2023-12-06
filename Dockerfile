# Usa una imagen de Python para el backend de Django
FROM python:3.8 AS Backend

# Establece el directorio de trabajo para el backend
WORKDIR /app/Backend

# Copia los archivos del backend al contenedor
COPY ./Backend .

# Instala las dependencias del backend
RUN pip install --no-cache-dir -r requirements.txt

# Ejecuta las migraciones y arranca el servidor de desarrollo
CMD ["python3", "manage.py", "makemigrations", "--settings=core.settings.dev"]
CMD ["python3", "manage.py", "migrate", "--settings=core.settings.dev"]
CMD ["python3", "manage.py", "runserver", "--settings=core.settings.dev"]

# Usa una imagen de Node.js para el frontend de Angular
FROM node AS Frontend

# Establece el directorio de trabajo para el frontend
WORKDIR /app/FrontEnd

# Copia los archivos del frontend al contenedor
COPY ./FrontEnd .

RUN rm -rf node_modules
RUN rm package-lock.json
# Limpio cache
RUN npm cache clean --force
# Instala las dependencias del frontend
RUN npm install --force

# Ejecuta el servidor de desarrollo de Angular
CMD ["ng", "serve", "--open"]

# Combina ambas imágenes en una sola
FROM python:3.8

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de ambos contenedores al directorio de trabajo
COPY --from=Backend /app/Backend /app/Backend
COPY --from=Frontend /app/FrontEnd /app/FrontEnd

# Expón el puerto 8000 para el backend de Django y el puerto 4200 para el frontend de Angular
EXPOSE 8000 4200

# Configura el entorno para el backend de Django
ENV DJANGO_SETTINGS_MODULE=core.settings.dev

# Ejecuta los comandos necesarios para iniciar ambos servicios
CMD ["python3", "manage.py", "runserver", "--settings=core.settings.dev"]
CMD ["ng", "serve", "--open"]

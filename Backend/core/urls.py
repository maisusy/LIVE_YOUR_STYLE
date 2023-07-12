
from django.contrib import admin
from django.urls import include, path
from Marca import urls as marca_url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('marca/', include(marca_url)),
]

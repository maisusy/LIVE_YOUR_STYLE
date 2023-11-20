from django.contrib import admin

from Producto.models import Producto,ImagenesProductos

# Register your models here.
admin.site.register(Producto)
admin.site.register(ImagenesProductos)
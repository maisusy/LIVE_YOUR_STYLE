
from django.contrib import admin
from django.urls import include, path
from Marca import urls as marca_url
from Categoria_producto import urls as cat_prod_url
from Color import urls as color_url
from Direccion import urls as dire_url
from Proveedor import urls as prov_url
from Unidad_medida import urls as unidadmedida_url
from Factura import urls as fact_url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('marca/', include(marca_url)),
    path('cat_prod/', include(cat_prod_url)),
    path('color/', include(color_url)),
    path('direccion/', include(dire_url)),
    path('proveedor/', include(prov_url)),
    path('unidad_medida/', include(unidadmedida_url)),
    path('factura/', include(fact_url)),
]

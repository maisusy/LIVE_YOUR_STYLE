
from django.contrib import admin
from django.urls import include, path
from Marca import urls as marca_url
from Categoria_producto import urls as cat_prod_url
from Color import urls as color_url
from Direccion import urls as dire_url
from Proveedor import urls as prov_url
from Unidad_medida import urls as unidadmedida_url
from Factura import urls as fact_url
from Observacion import urls as obs_url
from Insumo import urls as insumo_url
from Producto import urls as producto_url
from Presupuesto import urls as presupuesto_url
from Datos_Usuario import urls as datos_usuario_url
from Telefono import urls as telefono_url
from Correo import urls as correo_url
from Tarjeta import urls as tarjeta_url
from Turno import urls as turno_url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('marca/', include(marca_url)),
    path('cat_prod/', include(cat_prod_url)),
    path('color/', include(color_url)),
    path('direccion/', include(dire_url)),
    path('proveedor/', include(prov_url)),
    path('unidad_medida/', include(unidadmedida_url)),
    path('factura/', include(fact_url)),
    path('obs/', include(obs_url)),
    path('insumo/', include(insumo_url)),
    path('producto/', include(producto_url)),
    path('presupuesto/', include(presupuesto_url)),
    path('datos_usuario/', include(datos_usuario_url)),
    path('telefono/', include(telefono_url)),
    path('correo/', include(correo_url)),
    path('tarjeta/', include(tarjeta_url)),
    path('turno/', include(turno_url)),
]

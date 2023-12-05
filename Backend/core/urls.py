from django.contrib import admin
from django.urls import include, path
from Marca import urls as marca_url
from Categoria_producto import urls as cat_prod_url
from Color import urls as color_url
from Direccion import urls as dire_url
from Proveedor import urls as prov_url
from Unidad_medida import urls as unidadmedida_url
from Factura import urls as fact_url
from Insumo import urls as insumo_url
from Producto import urls as producto_url
from Presupuesto import urls as presupuesto_url
from Datos_Usuario import urls as datos_usuario_url
from Tarjeta import urls as tarjeta_url
from Turno import urls as turno_url
from Orden_trabajo import urls as ord_trabajo_url
from Venta import urls as venta_url
from Envio import urls as envio_url
from Compra import urls as compras_url
from Predefinido import urls as predefinido_url
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("marca/", include(marca_url)),
    path("cat_prod/", include(cat_prod_url)),
    path("color/", include(color_url)),
    path("direccion/", include(dire_url)),
    path("proveedor/", include(prov_url)),
    path("unidad_medida/", include(unidadmedida_url)),
    path("factura/", include(fact_url)),
    path("insumo/", include(insumo_url)),
    path("producto/", include(producto_url)),
    path("presupuesto/", include(presupuesto_url)),
    path("datos_usuario/", include(datos_usuario_url)),
    path("tarjeta/", include(tarjeta_url)),
    path("turno/", include(turno_url)),
    path("ord_trabajo/", include(ord_trabajo_url)),
    path("venta/", include(venta_url)),
    path("envio/", include(envio_url)),
    path("compras/", include(compras_url)),
    path("predefinidos/", include(predefinido_url)),
    path("api/", include(datos_usuario_url)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

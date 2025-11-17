from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from productos.views import ProductoViewSet
from django.http import HttpResponseRedirect

def home(request):
    return HttpResponseRedirect('/api/')

router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', home),  # ahora sí funciona
]


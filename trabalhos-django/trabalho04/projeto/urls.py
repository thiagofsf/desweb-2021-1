from django.contrib import admin
from django.urls import path, include

from projeto import views

urlpatterns = [
    path('', views.index, name="index"),
    path('sobre-nos/', views.sobre, name="sobre"),
    path('contato/', views.contato, name="contato"),
    path('loja-alcantara/', views.loja_alcantara, name="loja-alcantara"),
    path('produto/', include('produto.urls')),
    path('admin/', admin.site.urls),
]

from django.urls import path
from fornecedores import views

urlpatterns = [
    path('', views.index_fornecedores, name='index_fornecedores'),
    path('lista_fornecedores/', views.lista_fornecedores, name='lista_fornecedores'),
    path('cadastra_fornecedores/', views.cadastra_fornecedores, name='cadastra_fornecedores'),
    path('exibe_fornecedor/<int:id>/', views.exibe_fornecedor, name='exibe_fornecedor'),
    path('edita_fornecedor/<int:id>/', views.edita_fornecedor, name='edita_fornecedor'),
    path('remove_fornecedor/', views.remove_fornecedor, name='remove_fornecedor'),
]
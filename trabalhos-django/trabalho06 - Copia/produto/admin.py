from django.contrib import admin
from .models import Produto


class ProdutoAdmin(admin.ModelAdmin):
    fields = ('categoria', 'nome', 'qtd', 'preco')
    list_display = ['nome', 'categoria', 'qtd', 'preco']
    search_fields = ['nome']
    list_filter = ['categoria']
    list_editable = ['categoria', 'qtd', 'preco']

admin.site.register(Produto, ProdutoAdmin)

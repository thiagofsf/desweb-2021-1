from django.contrib import admin

from .models import Fornecedores

class FornecedoresAdmin(admin.ModelAdmin):
    list_display = ['nome', 'endereco', 'telefone', 'cnpj']

admin.site.register(Fornecedores, FornecedoresAdmin)

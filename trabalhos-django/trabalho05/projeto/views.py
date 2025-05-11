from django.shortcuts import render

from produto.models import Produto


def index(request):
    lista_de_produtos = Produto.objects.all().order_by('nome')
    return render(request, 'index.html', {'produtos': lista_de_produtos})

def sobre(request):
    return render(request, 'sobre.html')

def contato(request):
    return render(request, 'contato.html')

def loja_alcantara(request):
    return render(request, 'loja-alcantara.html')

def lista_produto(request):
    lista_de_produtos = Produto.objects.all().order_by('nome')
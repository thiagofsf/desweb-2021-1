from django.contrib import messages
from django.shortcuts import render, get_object_or_404

from produto.forms import CadastraProdutoForm
from produto.models import Produto


def index(request):
    frase="Index de produto"
    return render(request, 'produto/index.html', {'frase': frase})

def cadastra_produto(request):
    if request.POST:
        produto_form = CadastraProdutoForm(request.POST)
        if produto_form.is_valid():
            produto = produto_form.save(commit=False)
            produto.save()
            messages.add_message(request, messages.INFO, 'Fornecedor Cadastrado com Sucesso!')

            return render(request, 'fornecedores/exibe_fornecedor.html', {'fornecedor': fornecedor})
    produto_form = CadastraProdutoForm()
    return render(request, 'produto/cadastra_produto.html', {'form': produto_form})

def lista_produtos(request):

    return render(request, 'produto/lista_produtos.html')
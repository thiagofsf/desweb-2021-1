from django.contrib import messages
from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404

from fornecedores.forms import PesquisaFornecedorForm, FornecedorForm
from fornecedores.models import Fornecedores

def index_fornecedores(request):
    return render(request, 'fornecedores/index.html')

def lista_fornecedores(request):
    form = PesquisaFornecedorForm(request.GET)
    if form.is_valid():
        nome = form.cleaned_data['nome']
        lista_de_fornecedores = Fornecedores.objects.filter(nome__icontains=nome).order_by('nome')
        paginator = Paginator(lista_de_fornecedores, 5)
        pagina = request.GET.get('pagina')
        page_obj = paginator.get_page(pagina)
        return render(request, 'fornecedores/pesquisa_fornecedores.html', {'fornecedores': page_obj, 'form': form, 'nome': nome})
    else:
        raise ValueError('Ocorreu um erro inesperado ao tentar recuperar um Fornecedor.')

def cadastra_fornecedores(request):

    if request.POST:
        fornecedor_id = request.session.get('fornecedor_id')
        if(fornecedor_id):
            fornecedor = get_object_or_404(Fornecedores, pk=fornecedor_id)
            fornecedores_form = FornecedorForm(request.POST, instance=fornecedor)
        else:
            fornecedores_form = FornecedorForm(request.POST)

        if fornecedores_form.is_valid():
            fornecedor = fornecedores_form.save(commit=False)
            fornecedor.save()
            if (fornecedor_id):
                messages.add_message(request, messages.INFO, 'Fornecedor Atualizado com Sucesso!')
                del request.session['fornecedor_id']
            else:
                messages.add_message(request, messages.INFO, 'Fornecedor Cadastrado com Sucesso!')
            return render(request, 'fornecedores/exibe_fornecedor.html', {'fornecedor': fornecedor})
    else:
        try:
            del request.session['fornecedor_id']
        except KeyError:
            pass
        fornecedores_form = FornecedorForm()

    return render(request, 'fornecedores/cadastra_fornecedores.html', {'form': fornecedores_form})

def exibe_fornecedor(request, id):
    fornecedor = get_object_or_404(Fornecedores, pk=id)
    request.session['fornecedor_id_del'] = id
    return render(request, 'fornecedores/exibe_fornecedor.html', {'fornecedor': fornecedor})

def edita_fornecedor(request, id):
    fornecedor = get_object_or_404(Fornecedores, pk=id)
    fornecedor_form = FornecedorForm(instance=fornecedor)
    request.session['fornecedor_id'] = id
    return render(request, 'fornecedores/cadastra_fornecedores.html', {'form': fornecedor_form})

def remove_fornecedor(request):
    fornecedor_id = request.session.get('fornecedor_id_del')
    fornecedor = get_object_or_404(Fornecedores, id=fornecedor_id)
    fornecedor.delete()
    del request.session['fornecedor_id_del']
    messages.add_message(request, messages.INFO, 'Fornecedor removido com Sucesso.')
    return render(request, 'fornecedores/exibe_fornecedor.html', {'fornecedor': fornecedor})
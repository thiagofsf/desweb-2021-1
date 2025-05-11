from django import forms
from django.core.exceptions import ValidationError

from produto.models import Produto
from categoria.models import Categoria

class PesquisaFornecedorForm(forms.Form):
    nome = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'maxlenght': '100'}),
        required=False
    )

class CadastraProdutoForm(forms.ModelForm):
    class Meta:
        model = Produto
        fields = ('nome', 'categoria', 'qtd', 'preco')

    nome = forms.CharField(
        error_messages={'required': 'Campo Obrigatório'},
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'maxlenght': '100'})
    )
    categoria = forms.ModelChoiceField(
        error_messages={'required': 'Campo Obrigatório'},
        queryset=Categoria.objects.all().order_by('nome'),
        empty_label="---Selecione uma Categoria---",
        widget=forms.Select(attrs={'class': 'form-control form-control-sm'})
    )
    qtd = forms.IntegerField(
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm'})
    )
    preco = forms.DecimalField(
        localize=True,
        min_value=0,
        error_messages={'required': 'Campo Obrigatório',
                        'invalid': 'Preço Inválido',
                        'min_value': 'O preço deve ser maior ou igual a zero',
                        'max_decimal_places': 'mais de 2 digitos decimais',
                        'max_digits': 'O número pode ter até 8 digitos no total',
                        'max_whole_digits': 'Na parte inteira, o número deve ter até 6 dígitos no total'
                        },
        widget=forms.TextInput(attrs={'class': "form-control form-control-sm",
                                      'onkeypress': 'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 44'})
    )
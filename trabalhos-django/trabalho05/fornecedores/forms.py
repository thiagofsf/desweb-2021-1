from django import forms
from django.core.exceptions import ValidationError

from fornecedores.models import Fornecedores
#Importante, instalar localflavor: pip install django-localflavor
from localflavor.br.forms import BRCNPJField


class PesquisaFornecedorForm(forms.Form):
    nome = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'maxlenght': '100'}),
        required=False
    )

class FornecedorForm(forms.ModelForm):
    class Meta:
        model = Fornecedores
        fields = ('nome', 'endereco', 'telefone', 'cnpj')

    nome = forms.CharField(
        error_messages={'required': 'Campo Obrigatório', 'unique': 'Nome de Fornecedor Duplicado'},
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'maxlenght': '100'})
    )
    endereco = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'maxlenght': '100'})
    )
    telefone = forms.IntegerField(
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm'})
    )
    cnpj = BRCNPJField(
        error_messages={'required': 'Campo Obrigatório',
                        'unique': 'CNPJ Duplicado',
                        'invalid': 'Digite um CNPJ Válido',
                        'max_digits': 'O CNPJ deve ter 14 dígitos'},
        widget=forms.TextInput(attrs={'class': 'form-control form-control-sm'})
    )
    def clean_telefone(self):
        tel = self.cleaned_data['telefone']
        if tel > 99999999999:
            raise ValidationError("O numero de telefone deve possuir entre 10 e 11 digitos, lembre-se de colocar o DDD")
        if tel < 1000000000:
            raise ValidationError("O numero de telefone deve possuir entre 10 e 11 digitos, lembre-se de colocar o DDD")

        # É preciso retornar o valor recuperado de cleaned_data,
        # mesmo que ele não tenha sido alterado.
        return tel
from django.shortcuts import render

def index(request):
    frase="Index de produto"
    return render(request, 'produto/index.html', {'frase': frase})

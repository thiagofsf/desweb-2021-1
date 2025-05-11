from django.db import models
from categoria.models import Categoria

class Produto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.DO_NOTHING)
    nome = models.CharField(max_length=150, db_index=True, unique=True)
    slug = models.CharField(max_length=150)
    imagem = models.CharField(max_length=100, blank=True)
    qtd_estoque = models.IntegerField(default=0)
    preco = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    disponivel = models.BooleanField(default=False)

    class Meta:
        db_table = 'produto'

    def __str__(self):
        return self.nome

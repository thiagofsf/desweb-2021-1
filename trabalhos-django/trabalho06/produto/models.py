from django.db import models
from categoria.models import Categoria

class Produto(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.DO_NOTHING)
    nome = models.CharField(max_length=150, db_index=True)
    qtd = models.IntegerField(default=0)
    preco = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    class Meta:
        db_table = 'produto2'

    def __str__(self):
        return self.nome

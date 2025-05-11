from django.db import models

class Fornecedores(models.Model):
    nome = models.CharField(max_length=100, db_index=True, unique=True)
    endereco = models.CharField(max_length=100, db_index=True)
    telefone = models.IntegerField(max_length=11, db_index=True)
    cnpj = models.IntegerField(max_length=14, db_index=True)

    class Meta:
        db_table = 'fornecedores'
        ordering = ('nome',)

    def __str__(self):
        return self.nome
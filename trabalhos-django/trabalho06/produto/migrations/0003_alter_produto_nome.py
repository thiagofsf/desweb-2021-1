# Generated by Django 3.2.6 on 2021-09-05 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('produto', '0002_auto_20210905_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produto',
            name='nome',
            field=models.CharField(db_index=True, max_length=150),
        ),
    ]

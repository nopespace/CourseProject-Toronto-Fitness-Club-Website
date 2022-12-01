# Generated by Django 4.1.3 on 2022-11-17 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='baseklass',
            options={'verbose_name': 'Class', 'verbose_name_plural': 'Classes'},
        ),
        migrations.AlterModelOptions(
            name='klassinstance',
            options={'verbose_name': 'Class instance', 'verbose_name_plural': 'Class instances'},
        ),
        migrations.AddField(
            model_name='baseklass',
            name='add_all',
            field=models.BooleanField(default=False, help_text='If you want to add all class instances between start, end date'),
        ),
    ]
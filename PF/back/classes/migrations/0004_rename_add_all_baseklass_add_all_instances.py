# Generated by Django 4.1.3 on 2022-11-18 00:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0003_alter_baseklass_add_all'),
    ]

    operations = [
        migrations.RenameField(
            model_name='baseklass',
            old_name='add_all',
            new_name='add_all_instances',
        ),
    ]
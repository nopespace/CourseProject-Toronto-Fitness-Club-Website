# Generated by Django 4.1.3 on 2022-11-18 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0005_remove_baseklass_add_all_instances'),
    ]

    operations = [
        migrations.AddField(
            model_name='klassinstance',
            name='num_students',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
    ]

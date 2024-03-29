# Generated by Django 4.1.3 on 2022-11-17 00:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscriptions', '0022_alter_usersubscription_plan_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersubscription',
            name='plan',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='subscriptions.subscriptionplan'),
        ),
        migrations.AlterField(
            model_name='usersubscription',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]

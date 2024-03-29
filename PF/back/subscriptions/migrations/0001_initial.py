# Generated by Django 4.1.3 on 2022-11-15 18:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('studios', '0007_delete_currentloc'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField()),
                ('billing_cycle', models.CharField(help_text="options: 'day', 'month', 'year'", max_length=10)),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscriptions', to='studios.studio')),
            ],
        ),
    ]

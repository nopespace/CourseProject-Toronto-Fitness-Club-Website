# Generated by Django 4.1.3 on 2022-11-16 20:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0012_userpaymenthistory_usercard'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userpaymenthistory',
            old_name='billing_date',
            new_name='billing_datetime',
        ),
    ]

# Generated by Django 2.1.2 on 2018-10-30 08:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0014_auto_20181030_0806'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='travelplan',
            options={'ordering': ['travel_day']},
        ),
    ]
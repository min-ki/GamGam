# Generated by Django 2.1.2 on 2019-05-05 14:32

from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', imagekit.models.fields.ProcessedImageField(upload_to='uploads/%Y/%m/%d/')),
                ('location', models.CharField(max_length=140)),
                ('caption', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(max_length=255)),
                ('checked', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Travel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('main_image', imagekit.models.fields.ProcessedImageField(upload_to='uploads/%Y/%m/%d/')),
                ('title', models.CharField(max_length=50)),
                ('status', models.CharField(choices=[('0', '시작하기'), ('1', '여행 중'), ('2', '추억하기')], default='0', max_length=1)),
                ('price', models.IntegerField(blank=True, default=0)),
                ('travel_region', models.CharField(max_length=30)),
                ('start_at', models.DateField()),
                ('end_at', models.DateField()),
            ],
            options={
                'ordering': ['-updated_at'],
            },
        ),
        migrations.CreateModel(
            name='TravelPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('content', models.TextField()),
                ('travel_region', models.CharField(max_length=30)),
                ('travel_day', models.DateField()),
                ('price', models.IntegerField(default=0)),
                ('travel', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='travel_plan', to='travel.Travel')),
            ],
            options={
                'ordering': ['travel_day'],
            },
        ),
    ]

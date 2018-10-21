from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.encoding import python_2_unicode_compatible
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class User(AbstractUser):

    GENDER_CHOICES = (
        ("male", "Male"),
        ("female", "Female"),
        ('not-specified', 'Not specified')
    )

    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    phone = models.CharField(max_length=140, null=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)
    
    # follower, following 제거하기
    followers = models.ManyToManyField("self", blank=True)  # 본인 스스로
    following = models.ManyToManyField("self", blank=True)

    def __str__(self):
        return self.username

    @property
    def followers_count(self):
        return self.followers.all().count()

    @property
    def following_count(self):
        return self.following.all().count()
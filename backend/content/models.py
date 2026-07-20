import binascii
import os

from django.contrib.auth.models import User
from django.db import models


def generate_token_key():
    return binascii.hexlify(os.urandom(20)).decode()


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    title = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    video = models.FileField(upload_to='gallery/videos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or "Gallery Item"


class HomepageMedia(models.Model):
    """The single, admin-managed visual shown in the homepage hero."""
    video_url = models.URLField(blank=True, null=True)
    video = models.FileField(upload_to='homepage/videos/', blank=True, null=True)
    poster = models.ImageField(upload_to='homepage/posters/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Homepage media'


class UpdatePost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    media_url = models.URLField(blank=True, null=True)
    media_file = models.FileField(upload_to='posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AdminToken(models.Model):
    key = models.CharField(max_length=40, primary_key=True, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = generate_token_key()
        return super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username} token'


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField()
    response = models.TextField(blank=True, null=True)
    resolved = models.BooleanField(default=False)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"

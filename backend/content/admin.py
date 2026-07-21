from django.contrib import admin
from .models import AdminToken, ContactMessage, HomepageMedia, Product, GalleryImage, UpdatePost


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name', 'description')


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title',)


@admin.register(HomepageMedia)
class HomepageMediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'updated_at')


@admin.register(UpdatePost)
class UpdatePostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'content')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')


@admin.register(AdminToken)
class AdminTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'key', 'created_at')
    readonly_fields = ('key', 'created_at')
    search_fields = ('user__username', 'key')

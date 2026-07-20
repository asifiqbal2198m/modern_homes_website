from django.urls import path
from . import views

urlpatterns = [
    path('api/products/', views.product_list, name='product-list'),
    path('api/gallery/', views.gallery_list, name='gallery-list'),
    path('api/homepage-media/', views.homepage_media, name='homepage-media'),
    path('api/updates/', views.update_list, name='update-list'),
    path('api/contact/', views.contact_message, name='contact-message'),
    path('api/contact-messages/', views.contact_messages_list, name='contact-messages-list'),

    path('api/admin/login/', views.admin_login, name='admin-login'),
    path('api/admin/logout/', views.admin_logout, name='admin-logout'),
    path('api/admin/dashboard/', views.admin_dashboard, name='admin-dashboard'),
    path('api/admin/homepage-media/', views.admin_homepage_media, name='admin-homepage-media'),
    path('api/admin/contact-messages/', views.admin_contact_messages_list, name='admin-contact-messages-list'),
    path('api/admin/contact-messages/<int:message_id>/', views.admin_contact_message_detail, name='admin-contact-message-detail'),
    path('api/admin/gallery/', views.admin_gallery_items, name='admin-gallery-items'),
    path('api/admin/gallery/<int:item_id>/', views.admin_gallery_item_detail, name='admin-gallery-item-detail'),
    path('api/admin/posts/', views.admin_posts, name='admin-posts'),
    path('api/admin/posts/<int:post_id>/', views.admin_post_detail, name='admin-post-detail'),
    path('api/updates/<int:post_id>/', views.update_detail, name='update-detail'),
]

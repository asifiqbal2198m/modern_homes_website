from django.urls import path
from . import views

urlpatterns = [
    path('api/products/', views.product_list, name='product-list'),
    path('api/gallery/', views.gallery_list, name='gallery-list'),
    path('api/homepage-media/', views.homepage_media, name='homepage-media'),
    path('api/updates/', views.update_list, name='update-list'),
    path('api/contact/', views.contact_message, name='contact-message'),
    path('api/contact-messages/', views.contact_messages_list, name='contact-messages-list'),

    path('api/admin/setup/check/', views.check_first_time_setup, name='admin-setup-check'),
    path('api/admin/setup/create/', views.create_first_admin, name='admin-setup-create'),
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
    path('api/reviews/', views.review_list, name='review-list'),
    path('api/admin/reviews/settings/', views.admin_review_settings, name='admin-review-settings'),
    path('api/admin/reviews/sync/', views.admin_sync_reviews, name='admin-review-sync'),
    path('api/admin/reviews/', views.admin_reviews, name='admin-reviews'),
    path('api/admin/reviews/<int:review_id>/', views.admin_review_detail, name='admin-review-detail'),
    path('api/admin/products/', views.admin_products, name='admin-products'),
    path('api/admin/products/<int:product_id>/', views.admin_product_detail, name='admin-product-detail'),
]

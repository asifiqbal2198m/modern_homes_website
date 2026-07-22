import json
import urllib.request
from django.utils import timezone

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import AdminToken, ContactMessage, HomepageMedia, Product, GalleryImage, UpdatePost, ReviewSetting, GoogleReview


def _get_admin_user(request):
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Token '):
        return None

    token_key = auth_header.split(' ', 1)[1].strip()
    try:
        token = AdminToken.objects.select_related('user').get(key=token_key, user__is_staff=True)
        return token.user
    except AdminToken.DoesNotExist:
        return None


def _admin_required(view):
    def wrapper(request, *args, **kwargs):
        user = _get_admin_user(request)
        if not user:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
        request.admin_user = user
        return view(request, *args, **kwargs)
    return wrapper


def product_list(request):
    products = Product.objects.all().order_by('-created_at')
    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'image': p.image.url if p.image else None,
        })
    return JsonResponse(data, safe=False)


def gallery_list(request):
    images = GalleryImage.objects.all().order_by('-created_at')
    data = []
    for img in images:
        data.append({
            'id': img.id,
            'title': img.title,
            'image': img.image.url if img.image else None,
            'image_url': img.image_url,
            'video_url': img.video_url,
            'video': img.video.url if img.video else None,
        })
    return JsonResponse(data, safe=False)


def homepage_media(request):
    media = HomepageMedia.objects.order_by('-updated_at').first()
    if not media:
        return JsonResponse({'video_url': None, 'video': None, 'poster': None})
    return JsonResponse({
        'video_url': media.video_url,
        'video': media.video.url if media.video else None,
        'poster': media.poster.url if media.poster else None,
    })


def update_list(request):
    updates = UpdatePost.objects.all().order_by('-created_at')
    data = []
    for p in updates:
        data.append({
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'media_url': p.media_url,
            'media_file': p.media_file.url if p.media_file else None,
            'created_at': p.created_at,
        })
    return JsonResponse(data, safe=False)


def contact_messages_list(request):
    messages = ContactMessage.objects.order_by('-created_at').values(
        'id', 'name', 'email', 'phone', 'message', 'response', 'resolved', 'is_read', 'created_at'
    )
    return JsonResponse(list(messages), safe=False)


def check_first_time_setup(request):
    admin_count = User.objects.filter(is_staff=True).count()
    return JsonResponse({'setup_required': admin_count < 2})

@csrf_exempt
@require_http_methods(['POST'])
def create_first_admin(request):
    if User.objects.filter(is_staff=True).count() >= 2:
        return JsonResponse({'error': 'Maximum number of admin accounts (2) has been reached.'}, status=403)
        
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        
    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip()
    password = (data.get('password') or '').strip()
    
    if not username or not password:
        return JsonResponse({'error': 'Username and password are required.'}, status=400)
        
    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username is already taken.'}, status=400)
        
    user = User.objects.create_superuser(username=username, email=email, password=password)
    token, _ = AdminToken.objects.get_or_create(user=user)
    return JsonResponse({'token': token.key, 'username': user.username, 'message': 'Admin account created successfully.'})

@csrf_exempt
@require_http_methods(['POST'])
def admin_login(request):
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    username = (data.get('username') or '').strip()
    password = (data.get('password') or '').strip()

    if not username or not password:
        return JsonResponse({'error': 'Username and password are required.'}, status=400)

    user = authenticate(username=username, password=password)
    if user is None or not user.is_active or not user.is_staff:
        return JsonResponse({'error': 'Invalid credentials or not an admin.'}, status=401)

    token, _ = AdminToken.objects.get_or_create(user=user)
    return JsonResponse({'token': token.key, 'username': user.username})


@csrf_exempt
@require_http_methods(['POST'])
def admin_logout(request):
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Token '):
        token_key = auth_header.split(' ', 1)[1].strip()
        AdminToken.objects.filter(key=token_key).delete()
    return JsonResponse({'success': True})


def _notify_admin(contact):
    subject = f'New contact message from {contact.name}'
    message = (
        f'Name: {contact.name}\n'
        f'Email: {contact.email}\n'
        f'Phone: {contact.phone or "N/A"}\n'
        f'Message:\n{contact.message}\n'
        f'Received: {contact.created_at.isoformat()}'
    )
    recipient_list = [email for _, email in settings.ADMINS] or [settings.DEFAULT_FROM_EMAIL]
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        recipient_list,
        fail_silently=True,
    )


@csrf_exempt
@require_http_methods(['POST'])
def contact_message(request):
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    phone = (data.get('phone') or '').strip()
    message = (data.get('message') or '').strip()

    if not name or not email or not message:
        return JsonResponse({'error': 'Name, email, and message are required.'}, status=400)

    contact = ContactMessage.objects.create(
        name=name,
        email=email,
        phone=phone,
        message=message,
    )

    _notify_admin(contact)

    return JsonResponse({'success': True, 'id': contact.id}, status=201)


@_admin_required
def admin_contact_messages_list(request):
    messages = ContactMessage.objects.order_by('-created_at').values(
        'id', 'name', 'email', 'phone', 'message', 'response', 'resolved', 'is_read', 'created_at'
    )
    return JsonResponse(list(messages), safe=False)


@csrf_exempt
@_admin_required
@require_http_methods(['PUT', 'DELETE'])
def admin_contact_message_detail(request, message_id):
    try:
        msg = ContactMessage.objects.get(id=message_id)
    except ContactMessage.DoesNotExist:
        return JsonResponse({'error': 'Message not found.'}, status=404)

    if request.method == 'DELETE':
        msg.delete()
        return JsonResponse({'success': True})

    # PUT: update response/resolved/is_read
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    response_text = data.get('response')
    resolved = data.get('resolved')
    is_read = data.get('is_read')

    if response_text is not None:
        msg.response = response_text.strip()
        # send reply email if possible
        try:
            send_mail(
                f'Reply to your message at Modern Homes',
                msg.response,
                settings.DEFAULT_FROM_EMAIL,
                [msg.email],
                fail_silently=True,
            )
        except Exception:
            pass

    if resolved is not None:
        msg.resolved = bool(resolved)
    if is_read is not None:
        msg.is_read = bool(is_read)

    msg.save()
    return JsonResponse({'success': True})


@_admin_required
def admin_dashboard(request):
    messages = ContactMessage.objects.order_by('-created_at').values(
        'id', 'name', 'email', 'phone', 'message', 'response', 'resolved', 'is_read', 'created_at'
    )
    gallery_qs = GalleryImage.objects.order_by('-created_at')
    gallery_data = []
    for img in gallery_qs:
        gallery_data.append({
            'id': img.id,
            'title': img.title,
            'image': img.image.url if img.image else None,
            'image_url': img.image_url,
            'video_url': img.video_url,
            'video': img.video.url if img.video else None,
            'created_at': img.created_at,
        })
    posts_qs = UpdatePost.objects.order_by('-created_at')
    posts = []
    for p in posts_qs:
        posts.append({
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'media_url': p.media_url,
            'media_file': p.media_file.url if p.media_file else None,
            'created_at': p.created_at,
        })
    homepage = HomepageMedia.objects.order_by('-updated_at').first()
    homepage_media_data = {
        'video_url': homepage.video_url if homepage else None,
        'video': homepage.video.url if homepage and homepage.video else None,
        'poster': homepage.poster.url if homepage and homepage.poster else None,
    }
    reviews = GoogleReview.objects.order_by('-created_at').values(
        'id', 'author_name', 'profile_photo_url', 'rating', 'relative_time_description', 'text', 'is_visible', 'created_at'
    )
    settings_obj, _ = ReviewSetting.objects.get_or_create(pk=1)
    settings_data = {
        'google_place_id': settings_obj.google_place_id,
        'google_api_key': settings_obj.google_api_key,
        'last_sync': settings_obj.last_sync,
    }
    products_qs = Product.objects.all().order_by('-created_at')
    prod_list = []
    for p in products_qs:
        prod_list.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'image': p.image.url if p.image else None,
        })

    return JsonResponse({
        'messages': list(messages),
        'gallery': gallery_data,
        'posts': posts,
        'homepage_media': homepage_media_data,
        'reviews': list(reviews),
        'review_settings': settings_data,
        'products': prod_list
    })


@csrf_exempt
@_admin_required
@require_http_methods(['PUT'])
def admin_homepage_media(request):
    if request.content_type.startswith('multipart/'):
        data = {k: v for k, v in request.POST.items()}
    else:
        try:
            data = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    media, _ = HomepageMedia.objects.get_or_create(pk=1)
    if 'video_url' in data:
        media.video_url = (data.get('video_url') or '').strip() or None
    if hasattr(request, 'FILES') and request.FILES.get('video'):
        media.video = request.FILES.get('video')
    if hasattr(request, 'FILES') and request.FILES.get('poster'):
        media.poster = request.FILES.get('poster')
    media.save()
    return JsonResponse({
        'success': True,
        'video_url': media.video_url,
        'video': media.video.url if media.video else None,
        'poster': media.poster.url if media.poster else None,
    })


@csrf_exempt
@_admin_required
@require_http_methods(['GET', 'POST'])
def admin_gallery_items(request):
    if request.method == 'GET':
        items_qs = GalleryImage.objects.order_by('-created_at')
        items_data = []
        for img in items_qs:
            items_data.append({
                'id': img.id,
                'title': img.title,
                'image': img.image.url if img.image else None,
                'image_url': img.image_url,
                'video_url': img.video_url,
                'video': img.video.url if img.video else None,
                'created_at': img.created_at,
            })
        return JsonResponse(items_data, safe=False)

    try:
        # Support JSON body or multipart/form-data with files
        if request.content_type.startswith('multipart/'):
            data = {k: v for k, v in request.POST.items()}
        else:
            data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    title = (data.get('title') or '').strip()
    image_url = (data.get('image_url') or '').strip()
    video_url = (data.get('video_url') or '').strip()

    if not title:
        return JsonResponse({'error': 'Title is required.'}, status=400)
    # If an image file is uploaded, prefer it
    image_file = None
    video_file = None
    if hasattr(request, 'FILES') and request.FILES.get('image'):
        image_file = request.FILES.get('image')
    if hasattr(request, 'FILES') and request.FILES.get('video'):
        video_file = request.FILES.get('video')

    try:
        item = GalleryImage.objects.create(
            title=title,
            image=image_file,
            video=video_file,
            image_url=image_url or None,
            video_url=video_url or None,
        )
        return JsonResponse({'success': True, 'id': item.id}, status=201)
    except Exception as exc:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': f'Upload failed: {str(exc)}'}, status=400)


@csrf_exempt
@_admin_required
@require_http_methods(['PUT', 'POST', 'DELETE'])
def admin_gallery_item_detail(request, item_id):
    try:
        item = GalleryImage.objects.get(id=item_id)
    except GalleryImage.DoesNotExist:
        return JsonResponse({'error': 'Gallery item not found.'}, status=404)

    if request.method == 'DELETE':
        item.delete()
        return JsonResponse({'success': True})

    # Support multipart/form-data for file uploads
    if request.content_type.startswith('multipart/'):
        data = {k: v for k, v in request.POST.items()}
    else:
        try:
            data = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    title = data.get('title')
    image_url = data.get('image_url')
    video_url = data.get('video_url')

    if title is not None:
        item.title = title.strip()
    if image_url is not None:
        item.image_url = image_url.strip() or None
    if video_url is not None:
        item.video_url = video_url.strip() or None

    # Handle uploaded image file
    if hasattr(request, 'FILES') and request.FILES.get('image'):
        item.image = request.FILES.get('image')
    if hasattr(request, 'FILES') and request.FILES.get('video'):
        item.video = request.FILES.get('video')

    try:
        item.save()
        return JsonResponse({'success': True})
    except Exception as exc:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': f'Upload failed: {str(exc)}'}, status=400)


@csrf_exempt
@_admin_required
@require_http_methods(['GET', 'POST'])
def admin_posts(request):
    if request.method == 'GET':
        posts_qs = UpdatePost.objects.order_by('-created_at')
        posts = []
        for p in posts_qs:
            posts.append({
                'id': p.id,
                'title': p.title,
                'content': p.content,
                'media_url': p.media_url,
                'media_file': p.media_file.url if p.media_file else None,
                'created_at': p.created_at,
            })
        return JsonResponse(posts, safe=False)

    # Support multipart/form-data for file uploads
    if request.content_type.startswith('multipart/'):
        data = {k: v for k, v in request.POST.items()}
    else:
        try:
            data = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    title = (data.get('title') or '').strip()
    content = (data.get('content') or '').strip()
    media_url = (data.get('media_url') or '').strip()

    if not title or not content:
        return JsonResponse({'error': 'Title and content are required.'}, status=400)

    # handle uploaded media file
    media_file = None
    if hasattr(request, 'FILES') and request.FILES.get('media_file'):
        media_file = request.FILES.get('media_file')

    if media_file:
        post = UpdatePost.objects.create(title=title, content=content, media_file=media_file, media_url=media_url or None)
    else:
        post = UpdatePost.objects.create(title=title, content=content, media_url=media_url or None)
    return JsonResponse({'success': True, 'id': post.id}, status=201)


@csrf_exempt
@_admin_required
@require_http_methods(['PUT', 'POST', 'DELETE'])
def admin_post_detail(request, post_id):
    try:
        post = UpdatePost.objects.get(id=post_id)
    except UpdatePost.DoesNotExist:
        return JsonResponse({'error': 'Post not found.'}, status=404)

    if request.method == 'DELETE':
        post.delete()
        return JsonResponse({'success': True})

    # Support multipart/form-data for file uploads
    if request.content_type.startswith('multipart/'):
        data = {k: v for k, v in request.POST.items()}
    else:
        try:
            data = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    title = data.get('title')
    content = data.get('content')
    media_url = data.get('media_url')

    if title is not None:
        post.title = title.strip()
    if content is not None:
        post.content = content.strip()
    if media_url is not None:
        post.media_url = media_url.strip() or None

    # handle uploaded media file
    if hasattr(request, 'FILES') and request.FILES.get('media_file'):
        post.media_file = request.FILES.get('media_file')

    post.save()
    return JsonResponse({'success': True})


def update_detail(request, post_id):
    try:
        post = UpdatePost.objects.get(id=post_id)
    except UpdatePost.DoesNotExist:
        return JsonResponse({'error': 'Post not found.'}, status=404)

    return JsonResponse({
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'media_url': post.media_url,
        'media_file': post.media_file.url if post.media_file else None,
        'created_at': post.created_at,
    })


def review_list(request):
    reviews = list(GoogleReview.objects.filter(is_visible=True).order_by('-created_at').values(
        'id', 'author_name', 'profile_photo_url', 'rating', 'relative_time_description', 'text', 'created_at'
    ))
    if not reviews:
        reviews = [
            {
                'id': 1,
                'author_name': 'Aisha Khan',
                'profile_photo_url': None,
                'rating': 5,
                'relative_time_description': '1 month ago',
                'text': 'The team transformed our living space beautifully. Every detail was handled with professionalism and care.',
            },
            {
                'id': 2,
                'author_name': 'Rohan Mehta',
                'profile_photo_url': None,
                'rating': 5,
                'relative_time_description': '2 months ago',
                'text': 'From selection to installation, the experience was smooth and the results exceeded our expectations.',
            },
            {
                'id': 3,
                'author_name': 'Nadia Yusuf',
                'profile_photo_url': None,
                'rating': 5,
                'relative_time_description': '3 weeks ago',
                'text': 'Modern Homes delivered premium quality products with outstanding customer service.',
            }
        ]
    return JsonResponse(reviews, safe=False)


@csrf_exempt
@_admin_required
@require_http_methods(['GET', 'PUT'])
def admin_review_settings(request):
    settings_obj, _ = ReviewSetting.objects.get_or_create(pk=1)
    if request.method == 'GET':
        return JsonResponse({
            'google_place_id': settings_obj.google_place_id,
            'google_api_key': settings_obj.google_api_key,
            'last_sync': settings_obj.last_sync,
        })
    
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
    
    if 'google_place_id' in data:
        settings_obj.google_place_id = data.get('google_place_id', '').strip() or None
    if 'google_api_key' in data:
        settings_obj.google_api_key = data.get('google_api_key', '').strip() or None
    settings_obj.save()
    return JsonResponse({'success': True})


@csrf_exempt
@_admin_required
@require_http_methods(['POST'])
def admin_sync_reviews(request):
    settings_obj, _ = ReviewSetting.objects.get_or_create(pk=1)
    place_id = settings_obj.google_place_id
    api_key = settings_obj.google_api_key

    if not place_id or not api_key:
        return JsonResponse({'error': 'Google Place ID and API Key are required.'}, status=400)

    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=reviews&key={api_key}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode('utf-8'))
        
        status = res_data.get('status')
        if status != 'OK':
            error_message = res_data.get('error_message') or f"Google Places API returned status: {status}"
            return JsonResponse({'error': error_message}, status=400)
            
        result = res_data.get('result', {})
        reviews = result.get('reviews', [])
        
        if not reviews:
            return JsonResponse({'error': 'No reviews found for this place ID on Google.'}, status=400)

        # Clear existing reviews
        GoogleReview.objects.all().delete()
        
        # Insert new synced reviews
        for rev in reviews:
            GoogleReview.objects.create(
                author_name=rev.get('author_name', 'Anonymous'),
                profile_photo_url=rev.get('profile_photo_url'),
                rating=rev.get('rating', 5),
                relative_time_description=rev.get('relative_time_description', 'recently'),
                text=rev.get('text', ''),
                is_visible=True
            )
            
        settings_obj.last_sync = timezone.now()
        settings_obj.save()
        
        return JsonResponse({'success': True, 'count': len(reviews)})
    except Exception as e:
        return JsonResponse({'error': f"Failed to connect to Google API: {str(e)}"}, status=500)


@csrf_exempt
@_admin_required
@require_http_methods(['GET', 'POST'])
def admin_reviews(request):
    if request.method == 'GET':
        reviews = GoogleReview.objects.order_by('-created_at').values(
            'id', 'author_name', 'profile_photo_url', 'rating', 'relative_time_description', 'text', 'is_visible', 'created_at'
        )
        return JsonResponse(list(reviews), safe=False)

    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    author_name = (data.get('author_name') or '').strip()
    text = (data.get('text') or '').strip()
    rating = int(data.get('rating') or 5)
    relative_time_description = (data.get('relative_time_description') or 'recently').strip()

    if not author_name or not text:
        return JsonResponse({'error': 'Author name and review text are required.'}, status=400)

    rev = GoogleReview.objects.create(
        author_name=author_name,
        text=text,
        rating=rating,
        relative_time_description=relative_time_description,
        is_visible=True
    )
    return JsonResponse({'success': True, 'id': rev.id}, status=201)


@csrf_exempt
@_admin_required
@require_http_methods(['PUT', 'DELETE'])
def admin_review_detail(request, review_id):
    try:
        rev = GoogleReview.objects.get(id=review_id)
    except GoogleReview.DoesNotExist:
        return JsonResponse({'error': 'Review not found.'}, status=404)
        
    if request.method == 'DELETE':
        rev.delete()
        return JsonResponse({'success': True})
        
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        
    if 'author_name' in data:
        rev.author_name = data.get('author_name').strip()
    if 'text' in data:
        rev.text = data.get('text').strip()
    if 'rating' in data:
        rev.rating = int(data.get('rating') or 5)
    if 'relative_time_description' in data:
        rev.relative_time_description = data.get('relative_time_description').strip()
    if 'is_visible' in data:
        rev.is_visible = bool(data.get('is_visible'))
        
    rev.save()
    return JsonResponse({'success': True})


@csrf_exempt
@_admin_required
@require_http_methods(['GET', 'POST'])
def admin_products(request):
    if request.method == 'GET':
        prod_list = []
        for p in Product.objects.all().order_by('-created_at'):
            prod_list.append({
                'id': p.id,
                'name': p.name,
                'description': p.description,
                'image': p.image.url if p.image else None,
            })
        return JsonResponse(prod_list, safe=False)

    try:
        if request.content_type.startswith('multipart/'):
            data = {k: v for k, v in request.POST.items()}
        else:
            data = json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    name = (data.get('name') or '').strip()
    description = (data.get('description') or '').strip()

    if not name:
        return JsonResponse({'error': 'Product name is required.'}, status=400)

    image_file = None
    if hasattr(request, 'FILES') and request.FILES.get('image'):
        image_file = request.FILES.get('image')

    prod = Product.objects.create(
        name=name,
        description=description,
        image=image_file
    )
    return JsonResponse({'success': True, 'id': prod.id}, status=201)


@csrf_exempt
@_admin_required
@require_http_methods(['PUT', 'POST', 'DELETE'])
def admin_product_detail(request, product_id):
    try:
        prod = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found.'}, status=404)

    if request.method == 'DELETE':
        prod.delete()
        return JsonResponse({'success': True})

    if request.content_type.startswith('multipart/'):
        data = {k: v for k, v in request.POST.items()}
    else:
        try:
            data = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    name = data.get('name')
    description = data.get('description')

    if name is not None:
        prod.name = name.strip()
    if description is not None:
        prod.description = description.strip()

    if hasattr(request, 'FILES') and request.FILES.get('image'):
        prod.image = request.FILES.get('image')

    prod.save()
    return JsonResponse({'success': True})

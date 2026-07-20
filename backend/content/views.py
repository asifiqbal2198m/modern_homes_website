import json

from django.conf import settings
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import AdminToken, ContactMessage, HomepageMedia, Product, GalleryImage, UpdatePost


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
    products = Product.objects.all().values('id', 'name', 'description', 'image')
    return JsonResponse(list(products), safe=False)


def gallery_list(request):
    images = GalleryImage.objects.all().values('id', 'title', 'image', 'image_url', 'video_url', 'video')
    return JsonResponse(list(images), safe=False)


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
    updates = UpdatePost.objects.all().values('id', 'title', 'content', 'media_url', 'created_at')
    return JsonResponse(list(updates), safe=False)


def contact_messages_list(request):
    messages = ContactMessage.objects.order_by('-created_at').values(
        'id', 'name', 'email', 'phone', 'message', 'response', 'resolved', 'is_read', 'created_at'
    )
    return JsonResponse(list(messages), safe=False)


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
    gallery = GalleryImage.objects.order_by('-created_at').values(
        'id', 'title', 'image', 'image_url', 'video_url', 'video', 'created_at'
    )
    posts = UpdatePost.objects.order_by('-created_at').values(
        'id', 'title', 'content', 'media_url', 'created_at'
    )
    homepage = HomepageMedia.objects.order_by('-updated_at').first()
    homepage_media_data = {
        'video_url': homepage.video_url if homepage else None,
        'video': homepage.video.url if homepage and homepage.video else None,
        'poster': homepage.poster.url if homepage and homepage.poster else None,
    }
    return JsonResponse({'messages': list(messages), 'gallery': list(gallery), 'posts': list(posts), 'homepage_media': homepage_media_data})


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
        items = GalleryImage.objects.order_by('-created_at').values(
            'id', 'title', 'image', 'image_url', 'video_url', 'video', 'created_at'
        )
        return JsonResponse(list(items), safe=False)

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

    item = GalleryImage.objects.create(
        title=title,
        image=image_file,
        video=video_file,
        image_url=image_url or None,
        video_url=video_url or None,
    )
    return JsonResponse({'success': True, 'id': item.id}, status=201)


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

    item.save()
    return JsonResponse({'success': True})


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



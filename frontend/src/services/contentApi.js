const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export const normalizeImageUrl = (value) => {
  if (!value) return null;
  let str = String(value).trim();
  if (str.startsWith('http://') || str.startsWith('https://')) {
    return str;
  }
  if (str.startsWith('/media/media/')) {
    str = str.replace('/media/media/', '/media/');
  } else if (str.startsWith('media/media/')) {
    str = str.replace('media/media/', '/media/');
  } else if (str.startsWith('media/')) {
    str = '/' + str;
  } else if (!str.startsWith('/')) {
    str = '/media/' + str;
  }

  const base = BACKEND_URL || '';
  return `${base}${str}`;
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/products/`);
  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  const data = await response.json();
  return data.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.description,
    image: normalizeImageUrl(item.image_url || item.image),
    videoUrl: item.video_url || null,
  }));
};

export const fetchGalleryImages = async () => {
  const response = await fetch(`${API_BASE}/gallery/`);
  if (!response.ok) {
    throw new Error('Unable to load gallery images');
  }

  const data = await response.json();
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    image: normalizeImageUrl(item.image_url || item.image),
    videoUrl: normalizeImageUrl(item.video_url || item.video),
  }));
};

export const fetchHomepageMedia = async () => {
  const response = await fetch(`${API_BASE}/homepage-media/`);
  if (!response.ok) return { videoUrl: null, poster: null };
  const item = await response.json();
  return {
    videoUrl: normalizeImageUrl(item.video_url || item.video),
    poster: normalizeImageUrl(item.poster),
  };
};

export const sendContactMessage = async (payload) => {
  const response = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to send message');
  }

  return response.json();
};

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Request failed');
  }

  return response.json();
};

export const fetchContactMessages = async () => {
  const response = await fetch(`${API_BASE}/contact-messages/`);

  if (!response.ok) {
    throw new Error('Unable to load contact messages');
  }

  return response.json();
};

export const adminReplyMessage = async (token, messageId, payload) => {
  return requestJson(`${API_BASE}/admin/contact-messages/${messageId}/`, {
    method: 'PUT',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const adminDeleteMessage = async (token, messageId) => {
  return requestJson(`${API_BASE}/admin/contact-messages/${messageId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
};

export const checkAdminSetup = async () => {
  return requestJson(`${API_BASE}/admin/setup/check/`);
};

export const createFirstAdmin = async (payload) => {
  return requestJson(`${API_BASE}/admin/setup/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const adminLogin = async (payload) => {
  return requestJson(`${API_BASE}/admin/login/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const adminLogout = async (token) => {
  await requestJson(`${API_BASE}/admin/logout/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` },
  });
};

export const fetchAdminData = async (token) => {
  return requestJson(`${API_BASE}/admin/dashboard/`, {
    headers: { Authorization: `Token ${token}` },
  });
};

export const updateAdminHomepageMedia = async (token, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'PUT', headers };
  if (payload.video instanceof File || payload.poster instanceof File) {
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) form.append(key, value);
    });
    opts.body = form;
  } else {
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }
  return requestJson(`${API_BASE}/admin/homepage-media/`, opts);
};

export const createAdminGalleryItem = async (token, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'POST', headers };

  if (payload && (payload.image instanceof File || payload.video instanceof File)) {
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    opts.body = form;
    // let browser set Content-Type
  } else {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/admin/gallery/`, opts);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to save gallery item');
  }
  return response.json();
};

export const updateAdminGalleryItem = async (token, itemId, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'PUT', headers };

  if (payload && (payload.image instanceof File || payload.video instanceof File)) {
    // Django populates request.FILES for multipart POST requests, not multipart PUT requests.
    opts.method = 'POST';
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    opts.body = form;
  } else {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/admin/gallery/${itemId}/`, opts);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to update gallery item');
  }
  return response.json();
};

export const deleteAdminGalleryItem = async (token, itemId) => {
  return requestJson(`${API_BASE}/admin/gallery/${itemId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
};

export const createAdminPost = async (token, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'POST', headers };

  if (payload && payload.media_file instanceof File) {
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    opts.body = form;
  } else {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/admin/posts/`, opts);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to save post');
  }
  return response.json();
};

export const updateAdminPost = async (token, postId, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'PUT', headers };

  if (payload && payload.media_file instanceof File) {
    // See the gallery update note above.
    opts.method = 'POST';
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    opts.body = form;
  } else {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/admin/posts/${postId}/`, opts);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to update post');
  }
  return response.json();
};

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE}/updates/`);
  if (!response.ok) throw new Error('Unable to load posts');
  return response.json();
};

export const fetchPost = async (id) => {
  const response = await fetch(`${API_BASE}/updates/${id}/`);
  if (!response.ok) throw new Error('Unable to load post');
  return response.json();
};

export const deleteAdminPost = async (token, postId) => {
  return requestJson(`${API_BASE}/admin/posts/${postId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
};

// Google Reviews Client Helper APIs
export const fetchReviews = async () => {
  const response = await fetch(`${API_BASE}/reviews/`);
  if (!response.ok) throw new Error('Unable to load reviews');
  return response.json();
};

export const updateReviewSettings = async (token, payload) => {
  return requestJson(`${API_BASE}/admin/reviews/settings/`, {
    method: 'PUT',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const syncGoogleReviews = async (token) => {
  return requestJson(`${API_BASE}/admin/reviews/sync/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` },
  });
};

export const adminUpdateReviewVisibility = async (token, reviewId, payload) => {
  return requestJson(`${API_BASE}/admin/reviews/${reviewId}/`, {
    method: 'PUT',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const adminDeleteReview = async (token, reviewId) => {
  return requestJson(`${API_BASE}/admin/reviews/${reviewId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
};

export const adminCreateReview = async (token, payload) => {
  return requestJson(`${API_BASE}/admin/reviews/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const adminUpdateReview = async (token, reviewId, payload) => {
  return requestJson(`${API_BASE}/admin/reviews/${reviewId}/`, {
    method: 'PUT',
    headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const createAdminProduct = async (token, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'POST', headers };

  if (payload && payload.image instanceof File) {
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    opts.body = form;
  } else {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/admin/products/`, opts);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to save product');
  }
  return response.json();
};

export const updateAdminProduct = async (token, productId, payload) => {
  const headers = { Authorization: `Token ${token}` };
  const opts = { method: 'PUT', headers };

  if (payload && payload.image instanceof File) {
    opts.method = 'POST';
    const form = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    opts.body = form;
  } else {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/admin/products/${productId}/`, opts);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Unable to update product');
  }
  return response.json();
};

export const deleteAdminProduct = async (token, productId) => {
  return requestJson(`${API_BASE}/admin/products/${productId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
};

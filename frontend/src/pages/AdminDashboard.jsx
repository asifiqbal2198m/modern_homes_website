import { useEffect, useRef, useState, useCallback } from 'react';
import {
  fetchAdminData,
  adminLogout,
  createAdminGalleryItem,
  updateAdminGalleryItem,
  deleteAdminGalleryItem,
  createAdminPost,
  updateAdminPost,
  deleteAdminPost,
  adminReplyMessage,
  adminDeleteMessage,
  updateAdminHomepageMedia,
  updateReviewSettings,
  syncGoogleReviews,
  adminUpdateReviewVisibility,
  adminDeleteReview,
  adminCreateReview,
  adminUpdateReview,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from '../services/contentApi';

const initialGalleryForm = { title: '', image_url: '', video_url: '' };
const initialPostForm = { title: '', content: '', media_url: '' };
const initialReviewForm = { author_name: '', text: '', rating: 5, relative_time_description: 'recently' };
const initialProductForm = { name: '', description: '' };

const AdminDashboard = ({ token, onLogout }) => {
  const [data, setData] = useState({ messages: [], gallery: [], posts: [], reviews: [], products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [postForm, setPostForm] = useState(initialPostForm);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [galleryFile, setGalleryFile] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [homepageMediaForm, setHomepageMediaForm] = useState({ video_url: '' });
  const [homepageVideo, setHomepageVideo] = useState(null);
  const [homepagePoster, setHomepagePoster] = useState(null);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [replyOpenId, setReplyOpenId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState('');
  
  // Google Reviews States
  const [googlePlaceId, setGooglePlaceId] = useState('');
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [lastSync, setLastSync] = useState(null);

  const galleryFormRef = useRef(null);
  const postFormRef = useRef(null);
  const reviewFormRef = useRef(null);
  const productFormRef = useRef(null);

  const loadData = useCallback(async (showLoading = false) => {
    setError('');
    if (showLoading) {
      setLoading(true);
    }

    try {
      const result = await fetchAdminData(token);
      setData(result);
      setHomepageMediaForm({ video_url: result.homepage_media?.video_url || '' });
      if (result.review_settings) {
        setGooglePlaceId(result.review_settings.google_place_id || '');
        setGoogleApiKey(result.review_settings.google_api_key || '');
        setLastSync(result.review_settings.last_sync || null);
      }
    } catch (err) {
      setError(err.message || 'Unable to load admin data.');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, [token]);

  useEffect(() => {
    let active = true;
    if (token) {
      Promise.resolve().then(() => {
        if (active) loadData(true);
      });
    }
    let iv = null;
    if (token) {
      iv = setInterval(() => {
        if (active) loadData(false);
      }, 15000);
    }
    return () => {
      active = false;
      if (iv) clearInterval(iv);
    };
  }, [token, loadData]);

  const handleLogout = async () => {
    await adminLogout(token);
    onLogout();
  };

  const handleHomepageMediaSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionLoading(true);
    try {
      await updateAdminHomepageMedia(token, {
        video_url: homepageMediaForm.video_url,
        video: homepageVideo,
        poster: homepagePoster,
      });
      setHomepageVideo(null);
      setHomepagePoster(null);
      setReplySuccess('Homepage media updated successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to update homepage video.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleGalleryChange = (event) => {
    const { name, value } = event.target;
    setGalleryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryFile = (event) => {
    const file = event.target.files && event.target.files[0];
    setGalleryFile(file || null);
  };

  const handlePostChange = (event) => {
    const { name, value } = event.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostFile = (event) => {
    const file = event.target.files && event.target.files[0];
    setPostFile(file || null);
  };

  const handleGallerySubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionLoading(true);

    try {
      const payload = { ...galleryForm };
      if (galleryFile) {
        payload[galleryFile.type.startsWith('video/') ? 'video' : 'image'] = galleryFile;
      }

      if (editingGalleryId) {
        await updateAdminGalleryItem(token, editingGalleryId, payload);
        setReplySuccess('Gallery item updated successfully');
      } else {
        await createAdminGalleryItem(token, payload);
        setReplySuccess('Gallery item created successfully');
      }
      setGalleryForm(initialGalleryForm);
      setGalleryFile(null);
      setEditingGalleryId(null);
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to save gallery item.');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionLoading(true);

    try {
      const payload = { ...postForm };
      if (postFile) payload.media_file = postFile;

      if (editingPostId) {
        await updateAdminPost(token, editingPostId, payload);
        setReplySuccess('Blog post updated successfully');
      } else {
        await createAdminPost(token, payload);
        setReplySuccess('Blog post created successfully');
      }
      setPostForm(initialPostForm);
      setPostFile(null);
      setEditingPostId(null);
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to save post.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditGallery = (item) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title || '',
      image_url: item.image_url || '',
      video_url: item.video_url || '',
    });
    setGalleryFile(null);
    galleryFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title || '',
      content: post.content || '',
      media_url: post.media_url || '',
    });
    setPostFile(null);
    postFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleDeleteGallery = async (itemId) => {
    setError('');
    setActionLoading(true);
    try {
      await deleteAdminGalleryItem(token, itemId);
      if (editingGalleryId === itemId) {
        setEditingGalleryId(null);
        setGalleryForm(initialGalleryForm);
      }
      setReplySuccess('Gallery item deleted successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to delete gallery item.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setError('');
    setActionLoading(true);
    try {
      await deleteAdminPost(token, postId);
      if (editingPostId === postId) {
        setEditingPostId(null);
        setPostForm(initialPostForm);
      }
      setReplySuccess('Blog post deleted successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to delete post.');
    } finally {
      setActionLoading(false);
    }
  };

  const openReply = (message) => {
    setReplyOpenId(message.id);
    setReplyText(message.response || '');
  };

  const closeReply = () => {
    setReplyOpenId(null);
    setReplyText('');
  };

  const handleReplySubmit = async (messageId) => {
    setActionLoading(true);
    setError('');
    try {
      await adminReplyMessage(token, messageId, { response: replyText, resolved: true, is_read: true });
      closeReply();
      setReplySuccess('Reply sent and inquiry marked as resolved');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to send reply.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    setActionLoading(true);
    setError('');
    try {
      await adminDeleteMessage(token, messageId);
      setReplySuccess('Message deleted successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to delete message.');
    } finally {
      setActionLoading(false);
    }
  };

  // Google Reviews Handlers
  const handleReviewSettingsSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionLoading(true);
    try {
      await updateReviewSettings(token, { google_place_id: googlePlaceId, google_api_key: googleApiKey });
      setReplySuccess('Google review settings saved successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to update review settings.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSyncReviews = async () => {
    setError('');
    setActionLoading(true);
    try {
      const res = await syncGoogleReviews(token);
      setReplySuccess(`Successfully synchronized ${res.count} reviews from Google`);
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Synchronization failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleReviewVisibility = async (reviewId, currentVisibility) => {
    setError('');
    setActionLoading(true);
    try {
      await adminUpdateReviewVisibility(token, reviewId, { is_visible: !currentVisibility });
      setReplySuccess('Review visibility toggled successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to update review visibility.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setError('');
    setActionLoading(true);
    try {
      await adminDeleteReview(token, reviewId);
      setReplySuccess('Google review deleted successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete review.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionLoading(true);

    try {
      if (editingReviewId) {
        await adminUpdateReview(token, editingReviewId, reviewForm);
        setReplySuccess('Review updated successfully');
      } else {
        await adminCreateReview(token, reviewForm);
        setReplySuccess('Review created successfully');
      }
      setReviewForm(initialReviewForm);
      setEditingReviewId(null);
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to save review.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditReview = (rev) => {
    setEditingReviewId(rev.id);
    setReviewForm({
      author_name: rev.author_name || '',
      text: rev.text || '',
      rating: rev.rating || 5,
      relative_time_description: rev.relative_time_description || 'recently',
    });
    reviewFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductFile = (event) => {
    const file = event.target.files && event.target.files[0];
    setProductFile(file || null);
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionLoading(true);

    try {
      const payload = {
        name: productForm.name,
        description: productForm.description,
      };
      if (productFile) {
        payload.image = productFile;
      }

      if (editingProductId) {
        await updateAdminProduct(token, editingProductId, payload);
        setReplySuccess('Product updated successfully');
      } else {
        await createAdminProduct(token, payload);
        setReplySuccess('Product created successfully');
      }
      setProductForm(initialProductForm);
      setProductFile(null);
      setEditingProductId(null);
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to save product.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name || '',
      description: prod.description || '',
    });
    setProductFile(null);
    productFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleDeleteProduct = async (productId) => {
    setError('');
    setActionLoading(true);
    try {
      await deleteAdminProduct(token, productId);
      setReplySuccess('Product deleted successfully');
      setTimeout(() => setReplySuccess(''), 3500);
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete product.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="bg-luxury-cream py-16 mh-animate-fade-up min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Toast Alert Success Banner */}
        {replySuccess && (
          <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-luxury-bronze border border-luxury-gold/40 px-6 py-4 text-white shadow-2xl animate-fade-up flex items-center gap-3 backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold text-luxury-dark-blue font-bold text-xs">✓</span>
            <span className="text-sm font-semibold">{replySuccess}</span>
          </div>
        )}

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-lg sm:flex-row sm:items-center sm:justify-between border border-luxury-gold/15">
          <div>
            <h1 className="text-3xl font-bold text-luxury-bronze font-serif tracking-wide">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600 font-light">Manage homepage content, visual showcase gallery, blog posts, and Google reviews.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0.5 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {loading && <p className="mt-8 text-luxury-bronze font-serif font-bold text-lg animate-pulse text-center">Loading dashboard configurations...</p>}
        {error && <p className="mt-8 rounded-2xl bg-red-50 border border-red-200 px-6 py-4 text-red-700 font-light">{error}</p>}

        {!loading && (
          <div className="mt-8 space-y-8">
            
            {/* 1. Hero Video Settings */}
            <section className="rounded-[2rem] bg-luxury-dark-blue p-8 text-white shadow-xl border border-luxury-gold/20">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">Homepage feature</p>
                  <h2 className="mt-3 font-serif text-3xl font-normal text-slate-100">Hero background video</h2>
                  <p className="mt-2 max-w-2xl text-slate-300 font-light">Upload an MP4/WebM video or paste a direct video URL. A poster image keeps the page polished while the video loads.</p>
                </div>
                {(data.homepage_media?.video_url || data.homepage_media?.video) ? (
                  <span className="rounded-full bg-luxury-gold/20 border border-luxury-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-luxury-gold">
                    Video configured
                  </span>
                ) : null}
              </div>
              
              <form className="mt-8 grid gap-5 md:grid-cols-3" onSubmit={handleHomepageMediaSubmit}>
                <div className="md:col-span-3">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">Direct video URL</label>
                  <input value={homepageMediaForm.video_url} onChange={(event) => setHomepageMediaForm({ video_url: event.target.value })} className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-slate-500 focus:border-luxury-gold transition duration-300" placeholder="https://.../your-video.mp4" />
                </div>
                <label className="cursor-pointer rounded-2xl border border-dashed border-white/20 px-4 py-3.5 text-sm text-slate-200 hover:bg-white/10 flex items-center justify-center gap-2 transition duration-300 hover:border-luxury-gold/50">
                  <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l-4 4m0 0l-4-4m4 4V4m0 16a8 8 0 110-16 8 8 0 010 16z"/></svg>
                  Upload hero video
                  <input type="file" accept="video/mp4,video/webm" onChange={(event) => setHomepageVideo(event.target.files?.[0] || null)} className="hidden" />
                  {homepageVideo && <span className="ml-2 text-luxury-gold text-xs truncate max-w-[120px]">{homepageVideo.name}</span>}
                </label>
                <label className="cursor-pointer rounded-2xl border border-dashed border-white/20 px-4 py-3.5 text-sm text-slate-200 hover:bg-white/10 flex items-center justify-center gap-2 transition duration-300 hover:border-luxury-gold/50">
                  <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  Upload poster image
                  <input type="file" accept="image/*" onChange={(event) => setHomepagePoster(event.target.files?.[0] || null)} className="hidden" />
                  {homepagePoster && <span className="ml-2 text-luxury-gold text-xs truncate max-w-[120px]">{homepagePoster.name}</span>}
                </label>
                <button type="submit" disabled={actionLoading} className="rounded-full bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark-blue px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:bg-slate-700 disabled:-translate-y-0 cursor-pointer">Save homepage media</button>
              </form>

              {/* Homepage Media Previews */}
              {(homepageVideo || homepagePoster || homepageMediaForm.video_url) && (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 border-t border-white/10 pt-6">
                  {(homepageVideo || homepageMediaForm.video_url) && (
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Hero video preview</p>
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center aspect-video max-h-40">
                        {homepageVideo ? (
                          <video src={URL.createObjectURL(homepageVideo)} className="h-full w-full object-contain" controls />
                        ) : (
                          <video src={homepageMediaForm.video_url} className="h-full w-full object-contain" controls />
                        )}
                      </div>
                    </div>
                  )}
                  {homepagePoster && (
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Poster image preview</p>
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center aspect-video max-h-40">
                        <img src={URL.createObjectURL(homepagePoster)} alt="Poster Preview" className="h-full w-full object-contain" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* 2. Google Reviews Config & Sync */}
            <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-luxury-gold/15">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">Dynamic Google Reviews</p>
              <h2 className="mt-3 font-serif text-3xl font-normal text-luxury-charcoal">Google Reviews Integration</h2>
              <p className="mt-2 max-w-2xl text-slate-500 font-light text-sm">Provide your Google Place ID and API Key to fetch client testimonials directly from Google Maps. Fallbacks will show automatically if not configured.</p>
              
              <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleReviewSettingsSubmit}>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Google Place ID</label>
                  <input value={googlePlaceId} onChange={(event) => setGooglePlaceId(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300" placeholder="ChIJa1..." />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Google Maps Places API Key</label>
                  <input type="password" value={googleApiKey} onChange={(event) => setGoogleApiKey(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300" placeholder="AIzaSy..." />
                </div>
                
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <div className="text-xs text-slate-400">
                    {lastSync ? `Last synchronized: ${new Date(lastSync).toLocaleString()}` : "Not synchronized yet."}
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={actionLoading} className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer disabled:bg-slate-400">Save Settings</button>
                    <button type="button" onClick={handleSyncReviews} disabled={actionLoading || !googlePlaceId || !googleApiKey} className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer disabled:bg-slate-400">Sync Google Reviews</button>
                  </div>
                </div>
              </form>

              {/* Synced Google Reviews list */}
              {data.reviews && data.reviews.length > 0 && (
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-serif font-bold text-luxury-bronze mb-4">Synced Google Reviews</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {data.reviews.map((rev) => (
                      <div key={rev.id} className="rounded-2xl border border-slate-100 p-5 flex flex-col justify-between bg-slate-50/30">
                        <div>
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex items-center gap-3">
                              {rev.profile_photo_url ? (
                                <img src={rev.profile_photo_url} alt={rev.author_name} className="h-8 w-8 rounded-full object-cover border border-luxury-gold/15" />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-luxury-warm-gray text-luxury-bronze flex items-center justify-center font-bold text-xs border border-luxury-gold/10">
                                  {rev.author_name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h4 className="text-sm font-bold text-slate-800 leading-none">{rev.author_name}</h4>
                                <span className="text-[9px] text-slate-400 leading-none mt-1.5 inline-block">{rev.relative_time_description || "recently"}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-luxury-gold text-xs leading-none">
                              {"★".repeat(rev.rating)}
                            </div>
                          </div>
                          <p className="mt-3 text-xs text-slate-600 font-light italic leading-relaxed">“{rev.text}”</p>
                        </div>
                        <div className="mt-4 border-t border-slate-100 pt-3 flex justify-between items-center">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${rev.is_visible ? "text-emerald-600" : "text-amber-600"}`}>
                            {rev.is_visible ? "● Visible on site" : "○ Hidden from site"}
                          </span>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => handleEditReview(rev)} className="rounded-full bg-luxury-warm-gray hover:bg-luxury-gold/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-luxury-bronze transition duration-300 cursor-pointer">
                              Edit
                            </button>
                            <button type="button" onClick={() => handleToggleReviewVisibility(rev.id, rev.is_visible)} className="rounded-full bg-luxury-warm-gray hover:bg-luxury-gold/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-luxury-bronze transition duration-300 cursor-pointer">
                              {rev.is_visible ? "Hide" : "Show"}
                            </button>
                            <button type="button" onClick={() => handleDeleteReview(rev.id)} className="rounded-full bg-red-50 hover:bg-red-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-red-600 transition duration-300 cursor-pointer">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 3. Management Forms */}
            <section className="grid gap-8 xl:grid-cols-2 lg:grid-cols-2">
              
              {/* Gallery Form Card */}
              <div ref={galleryFormRef} className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10 transition-luxury hover:shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-luxury-bronze">{editingGalleryId ? 'Edit Gallery Item' : 'Gallery Item'}</h2>
                    <p className="mt-1.5 text-xs text-slate-500 font-light">Create or edit gallery photos and videos. Uploaded video audio is preserved for visitors.</p>
                  </div>
                  {editingGalleryId && (
                    <button type="button" onClick={() => { setEditingGalleryId(null); setGalleryForm(initialGalleryForm); setGalleryFile(null); }} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200 transition duration-300">
                      Cancel edit
                    </button>
                  )}
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleGallerySubmit}>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Title</label>
                    <input
                      name="title"
                      value={galleryForm.title}
                      onChange={handleGalleryChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Image URL</label>
                    <input
                      name="image_url"
                      value={galleryForm.image_url}
                      onChange={handleGalleryChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      placeholder="https://..."
                    />
                    <div className="mt-3">
                      <label className="inline-flex cursor-pointer items-center rounded-xl border border-dashed border-luxury-gold/30 px-4 py-2.5 text-xs font-semibold text-luxury-bronze hover:bg-luxury-warm-gray/20 transition duration-300">
                        <input type="file" name="media" accept="image/*,video/*" onChange={handleGalleryFile} className="hidden" />
                        <span className="mr-2">📁</span>
                        Choose image/video file
                      </label>
                      {galleryFile && <span className="ml-3 text-xs text-slate-600 truncate max-w-[150px] inline-block align-middle">{galleryFile.name}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Video URL</label>
                    <input
                      name="video_url"
                      value={galleryForm.video_url}
                      onChange={handleGalleryChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Gallery item preview */}
                  {(galleryFile || galleryForm.image_url || galleryForm.video_url) && (
                    <div className="mt-4 rounded-2xl border border-luxury-gold/15 bg-luxury-warm-gray/10 p-3">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-luxury-bronze">Preview</p>
                      <div className="overflow-hidden rounded-xl bg-white flex items-center justify-center aspect-video max-h-36">
                        {galleryFile ? (
                          galleryFile.type.startsWith('video/') ? (
                            <video src={URL.createObjectURL(galleryFile)} className="h-full w-full object-contain" controls />
                          ) : (
                            <img src={URL.createObjectURL(galleryFile)} alt="Preview" className="h-full w-full object-contain" />
                          )
                        ) : galleryForm.video_url || galleryForm.video ? (
                          <video src={galleryForm.video_url || galleryForm.video} className="h-full w-full object-contain" controls />
                        ) : galleryForm.image_url || galleryForm.image ? (
                          <img src={galleryForm.image_url || galleryForm.image} alt="Preview" className="h-full w-full object-contain" />
                        ) : null}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:bg-slate-400 disabled:-translate-y-0 cursor-pointer"
                  >
                    {editingGalleryId ? 'Update gallery item' : 'Create gallery item'}
                  </button>
                </form>
              </div>

              {/* Manual Review Creation & Editing Card */}
              <div ref={reviewFormRef} className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10 transition-luxury hover:shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-luxury-bronze">{editingReviewId ? 'Edit Review' : 'Create Review'}</h2>
                    <p className="mt-1.5 text-xs text-slate-500 font-light">Add or edit reviews manually without needing a Google API key.</p>
                  </div>
                  {editingReviewId && (
                    <button type="button" onClick={() => { setEditingReviewId(null); setReviewForm(initialReviewForm); }} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200 transition duration-300">
                      Cancel edit
                    </button>
                  )}
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleReviewSubmit}>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Author Name</label>
                    <input
                      name="author_name"
                      value={reviewForm.author_name}
                      onChange={handleReviewChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      placeholder="e.g. Aisha Khan"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Review text</label>
                    <textarea
                      name="text"
                      value={reviewForm.text}
                      onChange={handleReviewChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      rows={4}
                      placeholder="Write review here..."
                      required
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Rating</label>
                      <select
                        name="rating"
                        value={reviewForm.rating}
                        onChange={handleReviewChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      >
                        <option value={5}>★★★★★ (5 Stars)</option>
                        <option value={4}>★★★★☆ (4 Stars)</option>
                        <option value={3}>★★★☆☆ (3 Stars)</option>
                        <option value={2}>★★☆☆☆ (2 Stars)</option>
                        <option value={1}>★☆☆☆☆ (1 Star)</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Time Label</label>
                      <input
                        name="relative_time_description"
                        value={reviewForm.relative_time_description}
                        onChange={handleReviewChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                        placeholder="e.g. 2 weeks ago"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:bg-slate-400 disabled:-translate-y-0 cursor-pointer w-full text-center"
                  >
                    {editingReviewId ? 'Update review' : 'Create review'}
                  </button>
                </form>
              </div>

              {/* Post Form Card */}
              <div ref={postFormRef} className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10 transition-luxury hover:shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-luxury-bronze">{editingPostId ? 'Edit Post' : 'Create Post'}</h2>
                    <p className="mt-1.5 text-xs text-slate-500 font-light">Create or edit posts for updates and announcements.</p>
                  </div>
                  {editingPostId && (
                    <button type="button" onClick={() => { setEditingPostId(null); setPostForm(initialPostForm); setPostFile(null); }} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200 transition duration-300">
                      Cancel edit
                    </button>
                  )}
                </div>

                <form className="mt-6 space-y-5" onSubmit={handlePostSubmit}>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Title</label>
                    <input
                      name="title"
                      value={postForm.title}
                      onChange={handlePostChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Content</label>
                    <textarea
                      name="content"
                      value={postForm.content}
                      onChange={handlePostChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Media URL</label>
                    <input
                      name="media_url"
                      value={postForm.media_url}
                      onChange={handlePostChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      placeholder="https://..."
                    />
                    <div className="mt-3">
                      <label className="inline-flex cursor-pointer items-center rounded-xl border border-dashed border-luxury-gold/30 px-4 py-2.5 text-xs font-semibold text-luxury-bronze hover:bg-luxury-warm-gray/20 transition duration-300">
                        <input type="file" name="media_file" accept="image/*,video/*,audio/*" onChange={handlePostFile} className="hidden" />
                        <span className="mr-2">📁</span>
                        Choose media file
                      </label>
                      {postFile && <span className="ml-3 text-xs text-slate-600 truncate max-w-[150px] inline-block align-middle">{postFile.name}</span>}
                    </div>
                  </div>

                  {/* Post media preview */}
                  {(postFile || postForm.media_url) && (
                    <div className="mt-4 rounded-2xl border border-luxury-gold/15 bg-luxury-warm-gray/10 p-3">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-luxury-bronze">Preview</p>
                      <div className="overflow-hidden rounded-xl bg-white flex items-center justify-center aspect-video max-h-36">
                        {postFile ? (
                          postFile.type.startsWith('video/') ? (
                            <video src={URL.createObjectURL(postFile)} className="h-full w-full object-contain" controls />
                          ) : postFile.type.startsWith('audio/') ? (
                            <audio src={URL.createObjectURL(postFile)} className="w-full px-4" controls />
                          ) : (
                            <img src={URL.createObjectURL(postFile)} alt="Preview" className="h-full w-full object-contain" />
                          )
                        ) : postForm.media_url ? (
                          <img src={postForm.media_url} alt="Preview" className="h-full w-full object-contain" />
                        ) : null}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:bg-slate-400 disabled:-translate-y-0 cursor-pointer"
                  >
                    {editingPostId ? 'Update post' : 'Create post'}
                  </button>
                </form>
              </div>

              {/* Product Form Card */}
              <div ref={productFormRef} className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10 transition-luxury hover:shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-luxury-bronze">{editingProductId ? 'Edit Product' : 'Product Catalog Item'}</h2>
                    <p className="mt-1.5 text-xs text-slate-500 font-light font-sans">Create or edit items in the customer product collections page.</p>
                  </div>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleProductSubmit}>
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-700">Product Name</label>
                    <input
                      name="name"
                      value={productForm.name}
                      onChange={handleProductChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      placeholder="e.g. Italian Wallpaper"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-700">Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      value={productForm.description}
                      onChange={handleProductChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                      placeholder="e.g. Ultra premium textured wallpapers sourced from Italy..."
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-700">Product Image File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductFile}
                      className="w-full text-xs text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-luxury-warm-gray file:px-4 file:py-2.5 file:text-xs file:font-semibold file:text-luxury-bronze hover:file:bg-luxury-gold/20 file:cursor-pointer"
                    />
                    {productFile && (
                      <p className="mt-2 text-[10px] font-mono text-slate-400 truncate">Selected: {productFile.name}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:bg-slate-400 disabled:-translate-y-0 cursor-pointer"
                  >
                    {editingProductId ? 'Update Product' : 'Create Product'}
                  </button>
                </form>
              </div>
            </section>

            {/* 4. Gallery Items Table */}
            <section className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-serif font-bold text-luxury-bronze">Gallery Items</h2>
                <p className="mt-1 text-xs text-slate-500 font-light">Edit or delete existing gallery photos/videos.</p>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead>
                    <tr className="bg-luxury-warm-gray/30 text-xs font-bold uppercase tracking-wider text-luxury-bronze">
                      <th className="px-5 py-4 font-semibold">Title</th>
                      <th className="px-5 py-4 font-semibold">Image/Video Link</th>
                      <th className="px-5 py-4 font-semibold">Type</th>
                      <th className="px-5 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.gallery.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-5 py-8 text-center text-slate-400 font-light">No gallery items yet.</td>
                      </tr>
                    ) : (
                      data.gallery.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition duration-150">
                          <td className="px-5 py-4 font-serif font-bold text-luxury-charcoal">{item.title}</td>
                          <td className="px-5 py-4 text-xs font-mono text-slate-500 max-w-xs truncate">
                            {item.image_url || item.image || item.video_url || item.video || 'None'}
                          </td>
                          <td className="px-5 py-4">
                            {(item.video_url || item.video) ? (
                              <span className="rounded bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">Video</span>
                            ) : (
                              <span className="rounded bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-800">Image</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditGallery(item)}
                                className="rounded-full bg-luxury-warm-gray hover:bg-luxury-gold/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-luxury-bronze transition duration-300"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteGallery(item.id)}
                                disabled={actionLoading}
                                className="rounded-full bg-red-50 hover:bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 transition duration-300 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4b. Catalog Products Table */}
            <section className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-serif font-bold text-luxury-bronze">Catalog Products</h2>
                <p className="mt-1 text-xs text-slate-500 font-light">Edit or delete existing products in the catalog.</p>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead>
                    <tr className="bg-luxury-warm-gray/30 text-xs font-bold uppercase tracking-wider text-luxury-bronze">
                      <th className="px-5 py-4 font-semibold">Image</th>
                      <th className="px-5 py-4 font-semibold">Name</th>
                      <th className="px-5 py-4 font-semibold">Description</th>
                      <th className="px-5 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {!data.products || data.products.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-5 py-8 text-center text-slate-400 font-light">No products uploaded yet.</td>
                      </tr>
                    ) : (
                      data.products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-slate-50/50 transition duration-150">
                          <td className="px-5 py-4">
                            <div className="h-12 w-20 overflow-hidden rounded-lg bg-luxury-cream border border-luxury-gold/10">
                              {prod.image ? (
                                <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-4 font-serif font-bold text-luxury-charcoal">{prod.name}</td>
                          <td className="px-5 py-4 text-xs text-slate-500 max-w-xs truncate">{prod.description}</td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditProduct(prod)}
                                className="rounded-full bg-luxury-warm-gray hover:bg-luxury-gold/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-luxury-bronze transition duration-300"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(prod.id)}
                                disabled={actionLoading}
                                className="rounded-full bg-red-50 hover:bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 transition duration-300 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. Blog Posts & Updates List */}
            <section className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-serif font-bold text-luxury-bronze">Blog Posts & Updates</h2>
                <p className="mt-1 text-xs text-slate-500 font-light">Edit or delete existing blog posts or announcements.</p>
              </div>

              <div className="mt-6 space-y-5">
                {data.posts.length === 0 ? (
                  <p className="text-slate-400 font-light py-4 text-center">No posts yet.</p>
                ) : (
                  data.posts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-luxury-gold/15 p-6 hover:shadow-md transition duration-300 bg-luxury-cream/10">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2 flex-grow">
                          <h3 className="text-xl font-serif font-bold text-luxury-charcoal">{post.title}</h3>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-luxury-gold">{new Date(post.created_at).toLocaleString()}</p>
                          <p className="text-slate-600 font-light text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                          {(post.media_url || post.media_file || post.image) && (
                            <div className="mt-3 max-w-xs overflow-hidden rounded-xl border border-luxury-gold/10">
                              <img src={post.media_url || post.media_file || post.image} alt={post.title} className="max-h-40 w-full object-cover" />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 self-end sm:self-start">
                          <button
                            type="button"
                            onClick={() => handleEditPost(post)}
                            className="rounded-full bg-luxury-warm-gray hover:bg-luxury-gold/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-luxury-bronze transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            disabled={actionLoading}
                            className="rounded-full bg-red-50 hover:bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 transition duration-300 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* 6. Contact Inquiries */}
            <section className="rounded-3xl bg-white p-8 shadow-md border border-luxury-gold/10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-luxury-bronze">Customer Inquiries</h2>
                  <p className="mt-1 text-xs text-slate-500 font-light">View and respond to client messages submitted from the contact form.</p>
                </div>
                {data.messages && data.messages.filter(m => !m.resolved).length > 0 && (
                  <span className="rounded-full bg-red-600 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {data.messages.filter(m => !m.resolved).length} New
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-6">
                {data.messages.length === 0 ? (
                  <p className="text-slate-400 font-light py-4 text-center">No messages yet.</p>
                ) : (
                  data.messages.map((message) => (
                    <div key={message.id} className={`rounded-2xl border transition duration-300 ${message.resolved ? 'border-slate-200 bg-slate-50/50' : 'border-luxury-gold/25 bg-luxury-cream/10 shadow-sm'}`}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100/80 pb-3 p-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-serif font-bold text-luxury-charcoal text-base">{message.name}</span>
                            {message.resolved ? (
                              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-800">Resolved</span>
                            ) : (
                              <span className="rounded bg-red-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-800">Pending</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-light mt-1">
                            ✉ {message.email} • 📞 {message.phone || 'No phone'}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{new Date(message.created_at).toLocaleString()}</span>
                          {!message.resolved && (
                            <button onClick={() => openReply(message)} className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition duration-300 cursor-pointer">
                              Reply
                            </button>
                          )}
                          <button onClick={() => handleDeleteMessage(message.id)} disabled={actionLoading} className="rounded-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition duration-300 cursor-pointer">
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-4">
                        <div className="text-slate-700 text-sm font-light leading-relaxed whitespace-pre-wrap">{message.message}</div>

                        {message.response && (
                          <div className="mt-4 rounded-xl bg-luxury-warm-gray/30 border border-luxury-gold/10 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-luxury-bronze">Admin Response</p>
                            <p className="mt-2 text-slate-700 text-sm font-light whitespace-pre-wrap">{message.response}</p>
                          </div>
                        )}

                        {replyOpenId === message.id && (
                          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 animate-fade-up">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Write reply</label>
                            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-luxury-gold transition duration-300" rows={4} placeholder="Type your response to the customer..." required />
                            <div className="flex gap-2">
                              <button disabled={actionLoading} onClick={() => handleReplySubmit(message.id)} className="rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer">
                                Send & Resolve
                              </button>
                              <button onClick={closeReply} className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer">
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;

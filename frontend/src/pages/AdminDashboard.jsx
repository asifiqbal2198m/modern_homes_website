import { useEffect, useRef, useState } from 'react';
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
} from '../services/contentApi';

const initialGalleryForm = { title: '', image_url: '', video_url: '' };
const initialPostForm = { title: '', content: '', media_url: '' };

const AdminDashboard = ({ token, onLogout }) => {
  const [data, setData] = useState({ messages: [], gallery: [], posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [postForm, setPostForm] = useState(initialPostForm);
  const [galleryFile, setGalleryFile] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [homepageMediaForm, setHomepageMediaForm] = useState({ video_url: '' });
  const [homepageVideo, setHomepageVideo] = useState(null);
  const [homepagePoster, setHomepagePoster] = useState(null);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [replyOpenId, setReplyOpenId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState('');
  const galleryFormRef = useRef(null);
  const postFormRef = useRef(null);

  const loadData = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await fetchAdminData(token);
      setData(result);
      setHomepageMediaForm({ video_url: result.homepage_media?.video_url || '' });
    } catch (err) {
      setError(err.message || 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
    let iv = null;
    if (token) {
      iv = setInterval(() => loadData(), 15000);
    }
    return () => { if (iv) clearInterval(iv); };
  }, [token]);

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
      } else {
        await createAdminGalleryItem(token, payload);
      }
      setGalleryForm(initialGalleryForm);
      setGalleryFile(null);
      setEditingGalleryId(null);
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
      } else {
        await createAdminPost(token, payload);
      }
      setPostForm(initialPostForm);
      setPostFile(null);
      setEditingPostId(null);
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
      setReplySuccess('Reply sent to customer');
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
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to delete message.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 py-16 mh-animate-fade-up">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600">Manage messages, gallery items, and posts.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {loading && <p className="mt-8 text-slate-600">Loading admin data...</p>}
        {error && <p className="mt-8 rounded-xl bg-red-100 px-4 py-3 text-red-700">{error}</p>}

        {!loading && (
          <div className="mt-8 space-y-8">
            <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Homepage feature</p>
                  <h2 className="mt-2 text-2xl font-semibold">Hero video</h2>
                  <p className="mt-2 max-w-2xl text-slate-300">Upload an MP4/WebM video or paste a direct video URL. A poster image keeps the page polished while the video loads.</p>
                </div>
                {data.homepage_media?.video_url || data.homepage_media?.video ? <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-200">Video configured</span> : null}
              </div>
              <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={handleHomepageMediaSubmit}>
                <div className="md:col-span-3">
                  <label className="mb-2 block text-sm font-semibold text-slate-200">Direct video URL</label>
                  <input value={homepageMediaForm.video_url} onChange={(event) => setHomepageMediaForm({ video_url: event.target.value })} className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-blue-300" placeholder="https://.../your-video.mp4" />
                </div>
                <label className="cursor-pointer rounded-2xl border border-dashed border-white/25 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">
                  Upload hero video
                  <input type="file" accept="video/mp4,video/webm" onChange={(event) => setHomepageVideo(event.target.files?.[0] || null)} className="hidden" />
                  {homepageVideo && <span className="ml-2 text-blue-200">{homepageVideo.name}</span>}
                </label>
                <label className="cursor-pointer rounded-2xl border border-dashed border-white/25 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">
                  Upload poster image
                  <input type="file" accept="image/*" onChange={(event) => setHomepagePoster(event.target.files?.[0] || null)} className="hidden" />
                  {homepagePoster && <span className="ml-2 text-blue-200">{homepagePoster.name}</span>}
                </label>
                <button type="submit" disabled={actionLoading} className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:bg-slate-500">Save homepage media</button>
              </form>
            </section>
            <section className="grid gap-8 xl:grid-cols-2">
              <div ref={galleryFormRef} className="rounded-3xl bg-white p-6 shadow-sm mh-card-hover">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-semibold text-slate-900">{editingGalleryId ? 'Edit gallery item' : 'Gallery item'}</h2><p className="mt-2 text-slate-600">Create or edit gallery photos and videos. Uploaded video audio is preserved for visitors.</p></div>{editingGalleryId && <button type="button" onClick={() => { setEditingGalleryId(null); setGalleryForm(initialGalleryForm); setGalleryFile(null); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">Cancel edit</button>}</div>

                <form className="mt-6 space-y-4" onSubmit={handleGallerySubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
                    <input
                      name="title"
                      value={galleryForm.title}
                      onChange={handleGalleryChange}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Image URL</label>
                    <input
                      name="image_url"
                      value={galleryForm.image_url}
                      onChange={handleGalleryChange}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 transition"
                      placeholder="https://..."
                    />
                    <div className="mt-3">
                      <label className="inline-flex cursor-pointer items-center rounded-md border border-dashed border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 mh-file-input">
                        <input type="file" name="media" accept="image/*,video/*" onChange={handleGalleryFile} className="hidden" />
                        <span className="mr-3 inline-block h-4 w-4 rounded bg-slate-200"></span>
                        Choose image or video from device
                      </label>
                      {galleryFile && <span className="ml-3 text-sm text-slate-600">{galleryFile.name}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Video URL</label>
                    <input
                      name="video_url"
                      value={galleryForm.video_url}
                      onChange={handleGalleryChange}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                      placeholder="https://..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {editingGalleryId ? 'Update gallery item' : 'Create gallery item'}
                  </button>
                </form>
              </div>

              <div ref={postFormRef} className="rounded-3xl bg-white p-6 shadow-sm mh-card-hover">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-semibold text-slate-900">{editingPostId ? 'Edit post' : 'Create post'}</h2><p className="mt-2 text-slate-600">Create or edit posts for updates and announcements.</p></div>{editingPostId && <button type="button" onClick={() => { setEditingPostId(null); setPostForm(initialPostForm); setPostFile(null); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">Cancel edit</button>}</div>

                <form className="mt-6 space-y-4" onSubmit={handlePostSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
                    <input
                      name="title"
                      value={postForm.title}
                      onChange={handlePostChange}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Content</label>
                    <textarea
                      name="content"
                      value={postForm.content}
                      onChange={handlePostChange}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Media URL</label>
                    <input
                      name="media_url"
                      value={postForm.media_url}
                      onChange={handlePostChange}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 transition"
                      placeholder="https://..."
                    />
                    <div className="mt-3">
                      <label className="inline-flex cursor-pointer items-center rounded-md border border-dashed border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 mh-file-input">
                        <input type="file" name="media_file" accept="image/*,video/*,audio/*" onChange={handlePostFile} className="hidden" />
                        <span className="mr-3 inline-block h-4 w-4 rounded bg-slate-200"></span>
                        Choose media from device
                      </label>
                      {postFile && <span className="ml-3 text-sm text-slate-600">{postFile.name}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-white mh-btn-animated hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {editingPostId ? 'Update post' : 'Create post'}
                  </button>
                </form>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Gallery Items</h2>
                  <p className="mt-2 text-slate-600">Edit or delete existing gallery photos/videos.</p>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Image</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Video</th>
                      <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.gallery.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-5 text-slate-600">No gallery items yet.</td>
                      </tr>
                    ) : (
                      data.gallery.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-4 text-slate-900">{item.title}</td>
                          <td className="px-4 py-4 text-slate-700">{item.image_url || item.image || 'No image'}</td>
                          <td className="px-4 py-4 text-slate-700">{item.video_url || item.video || 'No video'}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditGallery(item)}
                                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 mh-btn-animated"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteGallery(item.id)}
                                disabled={actionLoading}
                                className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400 mh-btn-animated"
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

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Posts</h2>
                  <p className="mt-2 text-slate-600">Edit or delete existing blog/update posts.</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {data.posts.length === 0 ? (
                  <p className="text-slate-600">No posts yet.</p>
                ) : (
                  data.posts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{post.title}</p>
                          <p className="mt-1 text-sm text-slate-500">{new Date(post.created_at).toLocaleString()}</p>
                          <p className="mt-2 text-slate-700">{post.content}</p>
                          <p className="mt-2 text-sm text-slate-500">{post.media_url || 'No media URL'}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditPost(post)}
                            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            disabled={actionLoading}
                            className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
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

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Contact Messages</h2>
                <div>
                  {data.messages && data.messages.filter(m => !m.resolved).length > 0 && (
                    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                      {data.messages.filter(m => !m.resolved).length} new
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {data.messages.length === 0 ? (
                  <p className="text-slate-600">No messages yet.</p>
                ) : (
                  data.messages.map((message) => (
                    <div key={message.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{message.name} {message.resolved && <span className="ml-2 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-700">Resolved</span>}</p>
                          <p className="text-sm text-slate-500">{message.email} • {message.phone || 'No phone'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-slate-500">{new Date(message.created_at).toLocaleString()}</p>
                          <button onClick={() => openReply(message)} className="rounded-md bg-blue-600 px-3 py-1 text-white text-sm">Reply</button>
                          <button onClick={() => handleDeleteMessage(message.id)} className="rounded-md bg-red-600 px-3 py-1 text-white text-sm">Delete</button>
                        </div>
                      </div>

                      <div className="mt-3 text-slate-700">{message.message}</div>

                      {message.response && (
                        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-slate-700">
                          <strong>Reply:</strong>
                          <div className="mt-2">{message.response}</div>
                        </div>
                      )}

                      {replyOpenId === message.id && (
                        <div className="mt-3 space-y-2">
                          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3" rows={4} />
                          <div className="flex gap-2">
                            <button disabled={actionLoading} onClick={() => handleReplySubmit(message.id)} className="rounded-2xl bg-blue-600 px-4 py-2 text-white">Send Reply</button>
                            <button onClick={closeReply} className="rounded-2xl bg-slate-100 px-4 py-2">Cancel</button>
                          </div>
                        </div>
                      )}
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

import { useEffect, useState } from 'react';
import { fetchPost } from '../services/contentApi';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPost(id);
        setPost(data);
      } catch (e) {
        setError(e.message || 'Unable to load post');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="mt-6 text-slate-600">Loading post...</p>;
  if (error) return <p className="mt-6 rounded-xl bg-red-100 px-4 py-3 text-red-700">{error}</p>;
  if (!post) return <p className="mt-6 text-slate-600">Post not found.</p>;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
        <p className="mt-4 text-slate-700">{post.content}</p>
        {post.media_url && (
          <div className="mt-6">
            <a href={post.media_url} className="text-blue-600">Open media</a>
          </div>
        )}
        {post.media_file && (
          <div className="mt-6">
            <a href={post.media_file} className="text-blue-600">Download media</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostDetail;

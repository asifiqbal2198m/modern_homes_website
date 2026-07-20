import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/contentApi';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (e) {
        setError(e.message || 'Unable to load posts');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-3xl font-bold text-slate-900">Updates & Posts</h1>

        {loading && <p className="mt-6 text-slate-600">Loading posts...</p>}
        {error && <p className="mt-6 rounded-xl bg-red-100 px-4 py-3 text-red-700">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="mt-6 text-slate-600">No posts yet.</p>
        )}

        <div className="mt-8 space-y-6">
          {posts.map((p) => (
            <article key={p.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{p.title}</h2>
              <p className="mt-3 text-slate-700">{p.content.slice(0, 250)}{p.content.length>250? '...' : ''}</p>
              <div className="mt-4">
                <Link to={`/posts/${p.id}`} className="text-blue-600 font-semibold">Read more</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;

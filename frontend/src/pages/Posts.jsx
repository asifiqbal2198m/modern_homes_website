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
    <section className="bg-luxury-cream py-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">Company News</p>
          <h1 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">Updates & Announcements</h1>
          <p className="mt-4 text-slate-500 font-light">Stay updated with the latest projects, design trends, and catalog additions from Modern Homes.</p>
        </div>

        {loading && <p className="mt-12 text-center text-luxury-bronze font-serif font-bold text-lg animate-pulse">Loading posts...</p>}
        {error && <p className="mt-8 rounded-2xl bg-red-50 border border-red-200 px-6 py-4 text-red-700 font-light">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="mt-12 text-center text-slate-400 font-light">No announcements or blog posts have been added yet.</p>
        )}

        <div className="mt-12 space-y-8">
          {posts.map((p) => (
            <article key={p.id} className="rounded-3xl bg-white p-8 border border-luxury-gold/10 luxury-card-glow flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif text-luxury-charcoal leading-snug">{p.title}</h2>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-luxury-gold inline-block">
                  {new Date(p.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <p className="mt-4 text-slate-600 font-light leading-relaxed">{p.content.slice(0, 250)}{p.content.length > 250 ? '...' : ''}</p>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <Link to={`/posts/${p.id}`} className="text-xs font-bold uppercase tracking-widest text-luxury-bronze hover:text-luxury-gold transition duration-300">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;

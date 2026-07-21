import { useEffect, useState } from 'react';
import { fetchPost } from '../services/contentApi';
import { useParams, Link } from 'react-router-dom';

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

  if (loading) {
    return (
      <section className="bg-luxury-cream py-24 min-h-screen text-center">
        <p className="text-luxury-bronze font-serif font-bold text-lg animate-pulse">Loading post...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-luxury-cream py-24 min-h-screen text-center">
        <div className="mx-auto max-w-xl rounded-2xl bg-red-50 border border-red-200 px-6 py-4 text-red-700 font-light">
          {error}
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="bg-luxury-cream py-24 min-h-screen text-center">
        <h1 className="text-4xl font-serif font-bold text-luxury-charcoal">Post not found</h1>
        <Link to="/posts" className="mt-5 inline-block text-luxury-bronze hover:text-luxury-gold font-bold">
          Back to updates
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-luxury-cream py-24 min-h-screen">
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/posts" className="text-xs font-bold uppercase tracking-wider text-luxury-bronze hover:text-luxury-gold transition duration-300">
          ← Back to updates
        </Link>
        
        <article className="mt-8 rounded-3xl bg-white p-8 sm:p-12 border border-luxury-gold/10 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-gold">
            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <h1 className="mt-4 font-serif text-3xl font-normal text-luxury-charcoal sm:text-4xl leading-tight border-b border-slate-100 pb-6">
            {post.title}
          </h1>
          <p className="mt-6 text-slate-600 font-light leading-relaxed whitespace-pre-wrap text-base">
            {post.content}
          </p>

          {(post.media_url || post.media_file) && (
            <div className="mt-10 border-t border-slate-100 pt-8 flex flex-wrap gap-4">
              {post.media_url && (
                <a href={post.media_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md">
                  Open linked media
                </a>
              )}
              {post.media_file && (
                <a href={post.media_file} download className="rounded-full border border-luxury-gold/30 hover:bg-luxury-warm-gray/20 text-luxury-bronze px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm">
                  Download attachment
                </a>
              )}
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default PostDetail;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, createFirstAdmin } from '../services/contentApi';

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSetupMode) {
        const result = await createFirstAdmin({
          username: form.username,
          password: form.password,
          email: form.email,
        });
        onLogin(result.token);
        navigate('/admin');
      } else {
        const result = await adminLogin({
          username: form.username,
          password: form.password,
        });
        onLogin(result.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-luxury-cream py-24 min-h-screen flex items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 border border-luxury-gold/10 shadow-xl">
        <h1 className="text-3xl font-bold font-serif text-luxury-charcoal">
          {isSetupMode ? 'Create Admin' : 'Admin Login'}
        </h1>
        <p className="mt-2 text-sm text-slate-500 font-light">
          {isSetupMode 
            ? 'Welcome! Please create the first master admin account to secure your dashboard.' 
            : 'Sign in to manage catalog, hero media, blog posts, and customer messages.'}
        </p>

        {error && <p className="mt-6 rounded-2xl bg-red-50 border border-red-200 px-6 py-4 text-red-700 font-light">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
              required
            />
          </div>

          {isSetupMode && (
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 outline-none focus:border-luxury-gold transition duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:bg-slate-400 disabled:-translate-y-0 cursor-pointer"
          >
            {loading ? 'Processing...' : (isSetupMode ? 'Create Account & Login' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500 font-light">
          {isSetupMode ? (
            <p>
              Already have an admin account?{' '}
              <button type="button" onClick={() => setIsSetupMode(false)} className="text-luxury-bronze font-bold hover:underline outline-none">Sign In</button>
            </p>
          ) : (
            <p>
              Don't have an admin account?{' '}
              <button type="button" onClick={() => setIsSetupMode(true)} className="text-luxury-bronze font-bold hover:underline outline-none">Create Admin</button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;

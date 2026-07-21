import { useEffect, useState } from 'react';
import { fetchContactMessages } from '../services/contentApi';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchContactMessages();
        setMessages(data);
      } catch (err) {
        setError(err.message || 'Unable to load messages.');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Contact Messages
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Saved User Messages</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            All visitor messages submitted through the contact form are displayed here.
          </p>
        </div>

        {loading && <p className="text-slate-600">Loading messages...</p>}
        {error && <p className="rounded-xl bg-red-100 px-4 py-3 text-red-700">{error}</p>}

        {!loading && !error && messages.length === 0 && (
          <p className="rounded-xl bg-yellow-100 px-4 py-3 text-yellow-900">No messages found yet.</p>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{message.name}</h2>
                    <p className="text-sm text-slate-500">{message.email} • {message.phone || 'No phone provided'}</p>
                  </div>
                  <p className="text-sm text-slate-500">{new Date(message.created_at).toLocaleString()}</p>
                </div>
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-slate-700">
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactMessages;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setStatus({ type: 'success', message: res.data.message || 'If an account exists, a reset link has been sent to your email.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to process request. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden p-8 border border-white/50">
        
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-headline font-extrabold text-primary mb-2">Reset Password</h2>
          <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
            Enter the email address associated with your AIT Scholar account and we'll send you a link to reset your password.
          </p>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-5 rounded-xl bg-surface-container-low border focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-outline transition-all" 
              placeholder="student@ait.edu.gh" 
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-white font-headline font-bold rounded-xl shadow-lg hover:bg-primary-container hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Sending...
              </>
            ) : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}

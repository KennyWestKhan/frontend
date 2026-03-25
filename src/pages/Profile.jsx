import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContextObj';
import api from '../api/axios';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalHours: 0, sessionsJoined: 0 });

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const logRes = await api.get('/logs/dashboard');
        const sessionRes = await api.get('/sessions');
        const joinedCount = sessionRes.data.filter(s => s.members?.some(m => m.id === user?.id)).length;
        setStats({ totalHours: logRes.data.totalHours || 0, sessionsJoined: joinedCount });
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchProfileStats();
  }, [user]);

  return (
    <div className="space-y-12">
      {/* Profile Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-end gap-10">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Legendary AIT Scholar
          </div>
          
          <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tighter leading-none">
            {user?.username ? user.username.split(' ')[0] : 'Scholar'} <br/>
            <span className="text-secondary">{user?.username ? user.username.split(' ').slice(1).join(' ') : ''}</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-on-surface-variant font-medium max-w-xl">
            Pursuing Excellence at <span className="text-primary font-bold">AIT</span>. Dedicated to algorithmic excellence and architectural design.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-4">
            <span className="px-5 py-2 rounded-full bg-surface-container-highest text-primary font-semibold text-sm">Computer Science</span>
            <span className="px-5 py-2 rounded-full border border-outline-variant/30 text-outline font-medium text-sm hover:bg-surface-container-highest cursor-pointer transition-colors">+ Add Expertise</span>
          </div>
        </div>

        {/* Profile Identity Card */}
        <div className="w-full lg:w-[400px] glass-card rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 border border-white/40">
          <div className="relative h-64 bg-primary-container">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl bg-secondary flex items-center justify-center text-4xl font-bold text-primary rotate-3 transform hover:rotate-0 transition-transform duration-500">
                {user?.username?.charAt(0).toUpperCase() || 'S'}
              </div>
            </div>
          </div>
          <div className="p-8 text-center space-y-4">
            <p className="text-sm font-label text-on-surface-variant leading-relaxed">
              Member since 2024. Email: <b>{user?.email}</b>
            </p>
            <button className="w-full py-4 bg-primary-container text-white rounded-xl font-bold hover:bg-primary transition-all active:scale-95">
              Edit Public Profile
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-3xl text-secondary">query_stats</span>
            <span className="text-xs font-bold text-outline uppercase tracking-tighter">Academic Velocity</span>
          </div>
          <div className="mt-8">
            <h4 className="text-6xl font-headline font-extrabold text-primary tracking-tighter">{stats.totalHours.toFixed(1)}</h4>
            <p className="text-lg text-on-surface-variant font-medium">Total Study Hours</p>
          </div>
        </div>
        
        <div className="bg-primary-container p-8 rounded-3xl flex flex-col justify-between shadow-xl">
          <span className="material-symbols-outlined text-3xl text-secondary-container">groups</span>
          <div className="mt-8">
            <h4 className="text-5xl font-headline font-bold text-white tracking-tighter">{stats.sessionsJoined}</h4>
            <p className="text-sm text-on-primary-container font-medium">Sessions Joined</p>
          </div>
        </div>
        
        <div className="bg-secondary-container p-8 rounded-3xl flex flex-col justify-between shadow-lg">
          <span className="material-symbols-outlined text-3xl text-primary">workspace_premium</span>
          <div className="mt-8">
            <h4 className="text-5xl font-headline font-bold text-primary tracking-tighter">0</h4>
            <p className="text-sm text-on-secondary-fixed-variant font-medium">Impact Badges</p>
          </div>
        </div>
      </section>
    </div>
  );
}

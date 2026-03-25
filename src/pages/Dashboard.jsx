import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextObj';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [recentSessions, setRecentSessions] = useState([]);
  const [stats, setStats] = useState({ totalHours: 0 });

  useEffect(() => {
    // Fetch user's upcoming or recent sessions
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/matches');
        setRecentSessions(res.data.slice(0, 4));
        
        const logsRes = await api.get('/logs/dashboard');
        setStats({ totalHours: logsRes.data.totalHours || 0 });
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-primary-container p-12 text-white">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-4 tracking-tight">
              Good Morning, {user?.username || 'Scholar'}!<br/>Ready for your next AIT study session?
            </h1>
            <p className="text-on-primary-container text-lg mb-8 opacity-90">
              Your Semester 2 Computer Engineering squad is active right now. Join them to conquer Digital Systems.
            </p>
            <div className="flex gap-4">
              <Link to="/sessions" className="bg-secondary-container text-on-secondary-fixed font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform inline-block text-center">
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Study Progress Orbit */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-primary tracking-tight">Academic Progress</h3>
              <p className="text-slate-500 text-sm">You've logged {stats.totalHours.toFixed(1)} hours of study so far</p>
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold bg-secondary-container/20 px-4 py-2 rounded-full text-sm">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              Scholar Tier: {stats.totalHours >= 50 ? 'Platinum' : stats.totalHours >= 20 ? 'Gold' : stats.totalHours >= 5 ? 'Silver' : 'Bronze'}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                <circle className="text-secondary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="82.93" strokeWidth="12" style={{ transition: "stroke-dashoffset 1s ease-out" }}></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-primary">{stats.totalHours}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hours</span>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-7 gap-3 items-end h-40">
              <div className="bg-surface-container-high rounded-t-lg w-full h-[60%]"></div>
              <div className="bg-surface-container-high rounded-t-lg w-full h-[40%]"></div>
              <div className="bg-secondary rounded-t-lg w-full h-[90%]"></div>
              <div className="bg-surface-container-high rounded-t-lg w-full h-[55%]"></div>
              <div className="bg-secondary rounded-t-lg w-full h-[75%]"></div>
              <div className="bg-secondary rounded-t-lg w-full h-[95%]"></div>
              <div className="bg-surface-container-high rounded-t-lg w-full h-[30%] opacity-50 border-2 border-dashed border-secondary/20"></div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-primary-container text-white rounded-[2rem] p-6 flex-1 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-secondary-container text-4xl mb-4">bolt</span>
              <h4 className="text-lg font-bold">Focus Drive</h4>
              <p className="text-blue-200/80 text-sm">Keep logging hours to maximize your academic potential, Scholar!</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.totalHours.toFixed(1)} hrs</span>
              <span className="material-symbols-outlined text-secondary">trending_up</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Discover Sessions (Preview) */}
      <div className="mt-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-extrabold text-primary tracking-tight">Discover AIT Sessions</h3>
            <p className="text-slate-500">Curated study rooms based on your curriculum</p>
          </div>
          <Link to="/sessions" className="text-primary font-bold hover:underline decoration-secondary decoration-2 underline-offset-4 transition-all">See All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentSessions.length > 0 ? (
            recentSessions.map((session) => (
              <div key={session.id} className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="h-32 bg-slate-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                  <span className="absolute bottom-3 left-4 bg-secondary-container text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{session.location}</span>
                </div>
                <div className="p-5">
                  <h5 className="text-lg font-bold text-primary mb-1">{session.course}</h5>
                  <p className="text-slate-500 text-xs mb-4">Match Score: <span className="text-secondary font-bold">{session.match_score} pts</span></p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> {new Date(session.time).toLocaleDateString()}
                    </span>
                    <Link to={`/room/${session.id}`} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-full">No active sessions recommended for you right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}

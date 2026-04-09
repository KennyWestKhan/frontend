import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextObj';

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-white/70 backdrop-blur-xl w-full sticky top-0 z-30 shadow-sm shadow-blue-900/5">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-8xl mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tighter">
            AIT Study Sanctuary
          </Link>
          <nav className="hidden lg:flex gap-8 font-['Manrope'] font-semibold tracking-tight text-sm">
            <Link to="/dashboard" className="text-slate-500 hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/sessions" className="text-slate-500 hover:text-primary transition-colors">Study Groups</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <button className="p-2 text-slate-500 hover:bg-blue-50/50 rounded-full transition-all duration-300">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-blue-50/50 rounded-full transition-all duration-300">
              <span className="material-symbols-outlined">chat_bubble</span>
            </button>
          </div>
          
          <Link to="/profile" className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-primary">{user?.name || 'Scholar'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold ring-2 ring-primary-container/10">
              {user?.name?.charAt(0).toUpperCase() || 'S'}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

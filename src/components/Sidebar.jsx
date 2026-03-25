import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextObj';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);

  const isActive = (path) => pathname === path;

  return (
    <aside className="h-screen w-64 sticky left-0 top-0 hidden md:flex flex-col bg-slate-50 py-8 gap-2 z-40 border-r border-slate-100/50">
      <div className="px-8 mb-10 mt-2">
        <h2 className="text-primary font-bold text-lg tracking-tight">Scholar Workspace</h2>
        <p className="text-slate-500 text-xs font-medium">Empowering AIT Scholars</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <Link 
          to="/dashboard" 
          className={`mx-4 px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
            isActive('/dashboard') ? 'bg-secondary-container text-primary font-bold' : 'text-slate-600 hover:bg-slate-200 hover:translate-x-1'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/dashboard') ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/sessions" 
          className={`mx-4 px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
            isActive('/sessions') ? 'bg-secondary-container text-primary font-bold' : 'text-slate-600 hover:bg-slate-200 hover:translate-x-1'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/sessions') ? "'FILL' 1" : "'FILL' 0" }}>group</span>
          <span>Study Groups</span>
        </Link>
        <Link 
          to="/profile" 
          className={`mx-4 px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
            isActive('/profile') ? 'bg-secondary-container text-primary font-bold' : 'text-slate-600 hover:bg-slate-200 hover:translate-x-1'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/profile') ? "'FILL' 1" : "'FILL' 0" }}>account_circle</span>
          <span>Profile</span>
        </Link>
      </nav>

      <div className="mt-auto px-4 flex flex-col gap-2">
        <Link to="/sessions" className="bg-secondary-container text-primary w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all">
          <span className="material-symbols-outlined">add_circle</span>
          Join Study Session
        </Link>

        <div className="pt-4 flex flex-col gap-1 border-t border-slate-200 mt-4">
          <button onClick={logout} className="text-error hover:bg-error-container/20 rounded-xl px-4 py-2 flex items-center gap-3 transition-all text-sm w-full text-left">
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

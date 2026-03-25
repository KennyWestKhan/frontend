import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center py-4 z-50">
      <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/dashboard') ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      
      <Link to="/sessions" className={`flex flex-col items-center gap-1 ${isActive('/sessions') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/sessions') ? "'FILL' 1" : "'FILL' 0" }}>group</span>
        <span className="text-[10px] font-bold">Groups</span>
      </Link>
      
      <div className="relative -top-6">
        <Link to="/sessions" className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-primary shadow-lg shadow-secondary/40 ring-4 ring-white">
          <span className="material-symbols-outlined text-3xl">add</span>
        </Link>
      </div>
      
      <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/profile') ? "'FILL' 1" : "'FILL' 0" }}>account_circle</span>
        <span className="text-[10px] font-bold">Profile</span>
      </Link>
    </nav>
  );
}

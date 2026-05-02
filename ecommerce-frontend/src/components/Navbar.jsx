import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  ShoppingCart, Heart, User, LogOut, 
  LayoutDashboard, Menu, X 
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.data.user.role === 'admin') setIsAdmin(true);
      }).catch(() => setIsAdmin(false));
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full py-4 px-6 md:px-10 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 1. LEFT: LOGO */}
        <Link to="/home" className="text-xl md:text-2xl font-black text-white tracking-tighter shrink-0">
          SHOP<span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">VELLA</span>
        </Link>

        {/* 2. MIDDLE: NAV LINKS (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                isActive(link.path) ? "text-white" : "text-gray-400"
              } hover:text-white transition-colors duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. RIGHT: ICONS & AUTH */}
        <div className="flex items-center gap-3 md:gap-6 text-gray-400">
          {token ? (
            <>
              <Link to="/wishlist" className="hover:text-pink-500 transition-colors">
                <Heart size={20} />
              </Link>
              <Link to="/cart" className="hover:text-indigo-500 transition-colors relative">
                <ShoppingCart size={20} />
              </Link>
              <Link to="/profile" className="hover:text-white transition-colors">
                <User size={20} />
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-emerald-400 hover:text-emerald-300">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <button onClick={logout} className="hover:text-red-500 transition-colors ml-2">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
              Sign In
            </Link>
          )}

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden text-white ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-black z-50 flex flex-col p-8 gap-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase text-white tracking-tighter border-b border-white/5 pb-4"
            >
              {link.name}
            </Link>
          ))}
          {!token && (
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-black uppercase text-indigo-500"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
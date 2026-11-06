import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from './Logo';
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  ShieldAlert,
  ChevronDown,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'نوادي المكلا', path: '/gyms' },
    { label: 'دليل المدربين', path: '/trainers' },
    { label: 'حاسبة السعرات', path: '/calculator' },
    { label: 'الخطة الغذائية', path: '/nutrition-plan' },
    { label: 'الوجبات الصحية', path: '/meals' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* ─── ANNOUNCEMENT BAR (Top Dark Strip) ─── */}
      <div className="w-full bg-[#1F2722] text-white text-[11px] sm:text-xs py-2 font-['Cairo',sans-serif]" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="font-medium truncate">
            🏋️ منصة عزم الرياضية | اكتشف أفضل صالات المكلا واحسب سعراتك مجاناً
          </p>
          <div className="hidden sm:flex items-center gap-3 text-white/70 shrink-0">
            <span>حضرموت - المكلا</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─── */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#F0EBE3] shadow-sm font-['Cairo',sans-serif]" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">

            {/* ─── RIGHT (RTL): BRAND LOGO ─── */}
            <div className="flex items-center shrink-0">
              <Logo size="md" />
            </div>

            {/* ─── CENTER (Desktop): NAVIGATION LINKS ─── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-[13px] font-bold transition-all ${
                      isActive
                        ? 'text-[#D97241] bg-[#FDF6F2]'
                        : 'text-[#536559] hover:text-[#1F2722] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ─── LEFT (RTL): ACTION ICONS & USER ─── */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search Icon */}
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#536559] hover:bg-[#F4F1EA] hover:text-[#1F2722] transition-colors">
                <Search className="w-[18px] h-[18px]" />
              </button>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full bg-[#FAF8F5] border border-[#E5DFD3] hover:bg-white transition-all shadow-sm"
                  >
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#7D9683]/20"
                    />
                    <span className="text-xs font-bold text-[#1F2722] line-clamp-1 max-w-[80px]">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {isUserDropdownOpen && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5DFD3] py-2 z-50 text-right"
                      dir="rtl"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs text-slate-500">تم تسجيل الدخول بصفتك</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-[#F4F1EA] font-semibold transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#7D9683]" />
                        لوحة المستخدم
                      </Link>

                      <Link
                        to="/my-orders"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-[#F4F1EA] font-semibold transition-colors"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#7D9683]" />
                        طلباتي واشتراكاتي
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#D97241] hover:bg-[#FAF8F5] font-bold transition-colors border-t border-slate-100 mt-1"
                        >
                          <ShieldAlert className="w-4 h-4 text-[#D97241]" />
                          لوحة الإدارة
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors border-t border-slate-100 mt-1"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        تسجيل الخروج
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {/* User Icon (Login) */}
                  <Link
                    to="/login"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#536559] hover:bg-[#F4F1EA] hover:text-[#1F2722] transition-colors"
                    title="تسجيل الدخول"
                  >
                    <UserIcon className="w-[18px] h-[18px]" />
                  </Link>
                  {/* CTA Button */}
                  <Link
                    to="/calculator"
                    className="px-5 py-2 rounded-lg bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-xs shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    احسب سعراتك
                  </Link>
                </div>
              )}
            </div>

            {/* ─── MOBILE: Menu Button ─── */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/calculator"
                className="px-3.5 py-2 rounded-lg bg-[#D97241] text-white font-bold text-[11px]"
              >
                ابدأ الآن
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[#1F2722] hover:bg-[#F4F1EA] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* ─── MOBILE NAVIGATION DRAWER ─── */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-[#F0EBE3] space-y-1">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2.5 rounded-lg font-bold text-sm transition-colors ${
                      isActive
                        ? 'text-[#D97241] bg-[#FDF6F2]'
                        : 'text-[#1F2722] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="pt-2 border-t border-[#F0EBE3] flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="block text-center py-2.5 rounded-lg bg-[#F4F1EA] text-sm font-bold text-[#1F2722]"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center py-2.5 rounded-lg bg-[#D97241] text-white text-sm font-bold"
                  >
                    إنشاء حساب جديد
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;

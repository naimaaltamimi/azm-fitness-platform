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
  Dumbbell,
  Calculator,
  UtensilsCrossed
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'نوادي المكلا', path: '/gyms', icon: Dumbbell },
    { label: 'دليل المدربين', path: '/trainers' },
    { label: 'حاسبة السعرات', path: '/calculator', icon: Calculator },
    { label: 'الخطة الغذائية', path: '/nutrition-plan' },
    { label: 'مكتبة الوجبات', path: '/meals', icon: UtensilsCrossed },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Right side in RTL: Brand Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" variant="full" />
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-brand-blue-700 bg-brand-blue-50/80'
                        : 'text-slate-700 hover:text-brand-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Left side in RTL: Auth Actions / Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-blue-500/20"
                  />
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{user.name}</span>
                    <span className="text-[10px] text-brand-blue-600 font-medium">
                      {user.role === 'admin' ? 'مسؤول المنصة' : user.role === 'trainer' ? 'مدرب كابتن' : 'عضو متدرب'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isUserDropdownOpen && (
                  <div
                    className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50"
                    dir="rtl"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs text-slate-500">تم تسجيل الدخول بصفتك</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue-600 font-medium transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-blue-500" />
                      لوحة المستخدم
                    </Link>

                    <Link
                      to="/my-orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue-600 font-medium transition-colors"
                    >
                      <CalendarCheck className="w-4 h-4 text-brand-green-500" />
                      طلباتي واشتراكاتي
                    </Link>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue-600 font-medium transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      الملف الشخصي
                    </Link>

                    <Link
                      to="/admin"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 font-medium transition-colors border-t border-slate-50 mt-1"
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      لوحة الإدارة
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-brand-blue-600 hover:bg-slate-100/70 rounded-xl transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-brand-blue-600 hover:bg-brand-blue-700 rounded-xl shadow-md shadow-brand-blue-600/20 active:scale-95 transition-all"
                >
                  حساب جديد
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold ${
                    isActive
                      ? 'text-brand-blue-700 bg-brand-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-3">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                    <p className="text-xs text-brand-blue-600">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-brand-blue-50 text-brand-blue-700 text-xs font-bold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    لوحة التحكم
                  </Link>
                  <Link
                    to="/my-orders"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-brand-green-50 text-brand-green-700 text-xs font-bold"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    طلباتي
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    <UserIcon className="w-4 h-4" />
                    الملف الشخصي
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    لوحة الإدارة
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-2 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full text-center py-3 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-3 rounded-xl bg-brand-blue-600 font-bold text-white shadow-md shadow-brand-blue-600/20"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};


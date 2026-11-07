import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import {
  CalendarCheck,
  Building2,
  Users,
  ExternalLink,
  LogOut,
  ShieldAlert,
  ChevronLeft,
  Bell,
  Home
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'subscriptions' | 'gyms' | 'trainers';
  setActiveTab: (tab: 'subscriptions' | 'gyms' | 'trainers') => void;
  pendingCount: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  pendingCount
}) => {
  const { user, logout, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  // If not logged in as admin, show dedicated Admin Security Gate
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A192F] text-white flex items-center justify-center p-4 font-['Cairo',sans-serif]" dir="rtl">
        <div className="max-w-md w-full rounded-3xl bg-[#102C50] border border-white/15 p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#2878B8]/20 border border-[#2878B8]/40 text-[#2878B8] flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8 text-[#D9AD55]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-[#D9AD55]/30 text-[#D9AD55] text-xs font-bold inline-block">
              نظام الإدارة المركزي • عزم المكلا
            </span>
            <h2 className="text-2xl font-black text-white">بوابة التحكم الإدارية</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              هذه الصفحة مخصصة لمديري ومطوري منصة عزم لإدارة الطلبات والصالات والعمليات الميدانية في المكلا.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => loginAsDemo('admin')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2878B8] hover:bg-[#1f639a] text-white font-bold text-sm shadow-lg shadow-[#2878B8]/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-[#D9AD55]" />
              <span>الدخول بصلاحيات مدير المنصة</span>
            </button>

            <Link
              to="/"
              className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>العودة لتصفح الموقع العام كزائر</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
            منظومة عزم الرقمية • ساحل حضرموت
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-['Cairo',sans-serif] flex flex-col lg:flex-row" dir="rtl">
      {/* 1. Independent Dedicated Admin Sidebar */}
      <aside className="w-full lg:w-72 bg-[#102C50] text-white flex flex-col justify-between shrink-0 shadow-2xl z-20">
        <div>
          {/* Admin Header with Logo */}
          <div className="p-6 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <Logo variant="full" theme="dark" size="md" />
              <span className="px-2 py-0.5 rounded-md bg-[#D9AD55]/15 border border-[#D9AD55]/40 text-[#D9AD55] text-[10px] font-black tracking-wide">
                لوحة الإدارة
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              إدارة الصالات والاشتراكات الميدانية • المكلا
            </p>
          </div>

          {/* Admin Navigation Tabs */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'subscriptions'
                  ? 'bg-[#2878B8] text-white shadow-md shadow-[#2878B8]/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4 text-[#D9AD55]" />
                <span>طلبات الاشتراكات</span>
              </div>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#D9AD55] text-slate-900 font-black text-[10px]">
                  {pendingCount} جديد
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('gyms')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'gyms'
                  ? 'bg-[#2878B8] text-white shadow-md shadow-[#2878B8]/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#D9AD55]" />
                <span>صالات المكلا المعتمدة</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">5</span>
            </button>

            <button
              onClick={() => setActiveTab('trainers')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'trainers'
                  ? 'bg-[#2878B8] text-white shadow-md shadow-[#2878B8]/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#D9AD55]" />
                <span>دليل الكباتن والمدربين</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Switch back to Website + Admin Profile */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#0B1E36]">
          {/* Quick Return to Public Website */}
          <Link
            to="/"
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-between transition-all border border-white/10 group"
          >
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4 text-[#D9AD55]" />
              <span>معاينة الموقع كزائر</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </Link>

          {/* Admin Info & Logout */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <div className="min-w-0">
              <p className="font-bold text-white text-xs truncate">{user.name}</p>
              <span className="text-[10px] text-slate-400">مدير المنصة التنفيذي</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
              title="تسجيل الخروج من الإدارة"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Admin Workspace (No Public Website Navbar, No Public Website Footer) */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Admin Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D9AD55] animate-pulse" />
            <h2 className="font-black text-slate-900 text-sm sm:text-base">
              {activeTab === 'subscriptions' && 'إدارة طلبات الاشتراكات والحجوزات الميدانية'}
              {activeTab === 'gyms' && 'صالات ونوادي المكلا المعتمدة'}
              {activeTab === 'trainers' && 'إدارة واعتماد كباتن اللياقة بالمكلا'}
              {activeTab === 'database' && 'حالة الباك إند وتكامل Supabase'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>فتح الموقع العام</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;


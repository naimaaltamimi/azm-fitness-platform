import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { MEALS_DATA } from '../../data/mealsData';
import {
  Search,
  X,
  Dumbbell,
  UserCheck,
  UtensilsCrossed,
  Calculator,
  Compass,
  ArrowRight,
  MapPin,
  Flame
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const gyms = useMemo(() => storageService.getGyms(), [isOpen]);
  const trainers = useMemo(() => storageService.getTrainers(), [isOpen]);

  // Static site pages
  const quickPages = [
    { title: 'حاسبة السعرات الحرارية BMR/TDEE', path: '/calculator', type: 'tool', hint: 'أداة تقدير الاحتياج اليومي' },
    { title: 'دليل أندية وصالات المكلا', path: '/gyms', type: 'page', hint: 'استكشاف الأندية بحسب الأحياء' },
    { title: 'دليل الكباتن والمدربين المعتمدين', path: '/trainers', type: 'page', hint: 'كباتن لياقة وتأهيل بدني' },
    { title: 'مكتبة الوجبات والتغذية الساحلية', path: '/meals', type: 'page', hint: 'وصفات صحية بسعرات محسوبة' },
    { title: 'خطة التغذية المتوازنة', path: '/nutrition-plan', type: 'page', hint: 'جداول وجبات متكاملة' },
    { title: 'من نحن - منصة عزم', path: '/about', type: 'page', hint: 'رؤية وأهداف المنصة بالمكلا' }
  ];

  // Filtered results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { gyms: [], trainers: [], meals: [], pages: [] };

    const matchingGyms = gyms
      .filter(
        (g) =>
          g.nameAr.toLowerCase().includes(q) ||
          g.nameEn.toLowerCase().includes(q) ||
          g.neighborhood.toLowerCase().includes(q) ||
          (g.shortDescription && g.shortDescription.toLowerCase().includes(q))
      )
      .slice(0, 4);

    const matchingTrainers = trainers
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.specialty.toLowerCase().includes(q) ||
          t.neighborhood.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const matchingMeals = MEALS_DATA.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.dietaryTags.some((tag) => tag.toLowerCase().includes(q))
    ).slice(0, 3);

    const matchingPages = quickPages.filter(
      (p) => p.title.toLowerCase().includes(q) || p.hint.toLowerCase().includes(q)
    );

    return {
      gyms: matchingGyms,
      trainers: matchingTrainers,
      meals: matchingMeals,
      pages: matchingPages
    };
  }, [query, gyms, trainers]);

  const totalResults =
    results.gyms.length + results.trainers.length + results.meals.length + results.pages.length;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 font-['Cairo',sans-serif]" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAE5DA] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0EBE3] bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#D97241] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن صالة (مثل: فيت إكس، الشرج، فوة)، كابتن، وجبة، أو أداة..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-[#1F2722] placeholder:text-[#7D9683]/70 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#7D9683] bg-white border border-[#EAE5DA] rounded-md shadow-xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            /* Suggested / Quick shortcuts when query is empty */
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#7D9683] block px-2">
                روابط سريعة مقترحة:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPages.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => handleSelect(page.path)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FAF8F5] text-right border border-transparent hover:border-[#EAE5DA] transition-all group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#FDF6F2] text-[#D97241] flex items-center justify-center shrink-0">
                      {page.type === 'tool' ? <Calculator className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1F2722] group-hover:text-[#D97241] truncate">
                        {page.title}
                      </p>
                      <p className="text-[10px] text-[#7D9683] truncate">{page.hint}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            /* No results */
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#1F2722]">لا توجد نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs text-[#7D9683]">
                جرب البحث بكلمات أخرى مثل اسم حي (الشرج، خلف، فوة) أو اسم كابتن أو صالة رياضية.
              </p>
            </div>
          ) : (
            /* Search Results */
            <div className="space-y-4">
              {/* Gyms Results */}
              {results.gyms.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-[#D97241] flex items-center gap-1.5 px-2">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>الصالات الرياضية ({results.gyms.length})</span>
                  </span>
                  <div className="space-y-1">
                    {results.gyms.map((gym) => (
                      <button
                        key={gym.id}
                        onClick={() => handleSelect(`/gyms/${gym.slug || gym.id}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EAE5DA] transition-all text-right group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={gym.coverImage}
                            alt={gym.nameAr}
                            className="w-10 h-10 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#1F2722] group-hover:text-[#D97241] truncate">
                              {gym.nameAr}
                            </p>
                            <p className="text-[11px] text-[#7D9683] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#D97241]" />
                              <span>{gym.neighborhood}</span>
                              <span className="mx-1">•</span>
                              <span className="font-mono text-slate-600">
                                تبدأ من {gym.pricingPlans?.[0]?.priceYer?.toLocaleString() || '15,000'} ر.ي
                              </span>
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#D97241] rotate-180 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trainers Results */}
              {results.trainers.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-[#7D9683] flex items-center gap-1.5 px-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#D97241]" />
                    <span>الكباتن والمدربون المعتمدون ({results.trainers.length})</span>
                  </span>
                  <div className="space-y-1">
                    {results.trainers.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect(`/trainers`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EAE5DA] transition-all text-right group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={t.avatarUrl}
                            alt={t.name}
                            className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#1F2722] group-hover:text-[#D97241] truncate">
                              {t.name}
                            </p>
                            <p className="text-[11px] text-[#7D9683] truncate">
                              {t.specialty} • المكلا ({t.neighborhood})
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#D97241] rotate-180 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Meals Results */}
              {results.meals.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-amber-700 flex items-center gap-1.5 px-2">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                    <span>الوجبات الصحية الساحلية ({results.meals.length})</span>
                  </span>
                  <div className="space-y-1">
                    {results.meals.map((meal) => (
                      <button
                        key={meal.id}
                        onClick={() => handleSelect(`/meals/${meal.id}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EAE5DA] transition-all text-right group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={meal.imageUrl}
                            alt={meal.title}
                            className="w-10 h-10 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#1F2722] group-hover:text-[#D97241] truncate">
                              {meal.title}
                            </p>
                            <p className="text-[11px] text-[#7D9683] flex items-center gap-2">
                              <span className="font-mono text-amber-700 font-bold">{meal.calories} سعرة</span>
                              <span>•</span>
                              <span>{meal.protein}g بروتين</span>
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#D97241] rotate-180 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages & Tools Results */}
              {results.pages.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-slate-600 flex items-center gap-1.5 px-2">
                    <Compass className="w-3.5 h-3.5 text-[#D97241]" />
                    <span>الصفحات والأدوات ({results.pages.length})</span>
                  </span>
                  <div className="space-y-1">
                    {results.pages.map((p) => (
                      <button
                        key={p.path}
                        onClick={() => handleSelect(p.path)}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EAE5DA] transition-all text-right group"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#1F2722] group-hover:text-[#D97241] truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-[#7D9683] truncate">{p.hint}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#D97241] rotate-180 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-[#F0EBE3] bg-[#FAF8F5] flex items-center justify-between text-[11px] text-[#7D9683]">
          <span>منظومة عزم الرقمية • المكلا، ساحل حضرموت</span>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 font-bold"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

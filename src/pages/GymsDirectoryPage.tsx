import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { GymCard } from '../components/gyms/GymCard';
import { EmptyState } from '../components/common/EmptyState';
import { Search, MapPin, Dumbbell } from 'lucide-react';

export const GymsDirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const nParam = searchParams.get('neighborhood') || 'all';

  const [searchQuery, setSearchQuery] = useState(qParam);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(nParam);

  // Sync state if searchParams change
  useEffect(() => {
    if (qParam !== searchQuery) setSearchQuery(qParam);
    if (nParam !== selectedNeighborhood) setSelectedNeighborhood(nParam);
  }, [qParam, nParam]);

  const neighborhoods = ['all', 'الشرج', 'فوة المتضررين', 'ديس المكلا'];

  const filteredGyms = useMemo(() => {
    return MUKALLA_GYMS.filter((gym) => {
      const matchSearch =
        gym.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchNeighborhood =
        selectedNeighborhood === 'all' ||
        gym.neighborhood.includes(selectedNeighborhood);

      return matchSearch && matchNeighborhood;
    });
  }, [searchQuery, selectedNeighborhood]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-l from-brand-blue-900 to-brand-dark-900 text-white rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-500/20 text-brand-blue-300 text-xs font-bold border border-brand-blue-400/30">
            <MapPin className="w-3.5 h-3.5 text-brand-green-400" />
            <span>حضرموت - ساحل المكلا</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            دليل صالات ونوادي المكلا الرياضية
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            استعرض الصالات الرياضية المعتمدة في مدينة المكلا بصورها وتجهيزاتها الواقعية، مع مواعيد العمل وخيارات الاشتراك المباشرة.
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الصالة أو الميزة (حديد، سير، كارديو)..."
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

          {/* Neighborhood Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 ml-2 hidden sm:inline">الحي:</span>
            {neighborhoods.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNeighborhood(n)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedNeighborhood === n
                    ? 'bg-brand-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {n === 'all' ? 'جميع أحياء المكلا' : n}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Reset */}
        {(searchQuery || selectedNeighborhood !== 'all') && (
          <div className="flex items-center justify-end text-xs text-slate-500 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedNeighborhood('all');
              }}
              className="text-brand-blue-600 font-bold hover:underline"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Gyms Grid or Empty State */}
      {filteredGyms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Dumbbell}
          title="لم نجد صالة تطابق بحثك"
          description={`لا توجد صالة رياضية تطابق معايير البحث الحالية في "${selectedNeighborhood === 'all' ? 'المكلا' : selectedNeighborhood}". جرب البحث بكلمات أخرى أو اختر جميع الأحياء.`}
          actionText="عرض جميع صالات المكلا"
          onActionClick={() => {
            setSearchQuery('');
            setSelectedNeighborhood('all');
          }}
        />
      )}
    </div>
  );
};


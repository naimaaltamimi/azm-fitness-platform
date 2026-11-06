import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MUKALLA_GYMS } from '../data/mukallaGymsData';
import { GymCard } from '../components/gyms/GymCard';
import { EmptyState } from '../components/common/EmptyState';
import { Search, MapPin, Dumbbell, ShieldCheck } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-['Cairo',sans-serif]" dir="rtl">
      
      {/* Page Header (Warm Deep Charcoal Luxury Banner) */}
      <div className="bg-[#1F2722] text-white rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-xl border border-[#2D3831]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E49C7A] text-xs font-bold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D97241]" />
            <span>فحص وتوثيق ميداني 2026 • ساحل المكلا</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            دليل صالات ونوادي المكلا المعتمدة
          </h1>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-medium">
            استعرض الصالات الرياضية في المكلا بالصور الواقعية، خطوط الأجهزة المتوفرة، مواعيد فترات الرجال والنساء، والاشتراكات المعتمدة بالريال اليمني.
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#F0EBE3] shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الصالة أو الميزة (حديد، سير، كارديو)..."
              className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722]"
            />
            <Search className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
          </div>

          {/* Neighborhood Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-black text-[#536559] ml-1 hidden sm:inline">أحياء المكلا:</span>
            {neighborhoods.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNeighborhood(n)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedNeighborhood === n
                    ? 'bg-[#D97241] text-white shadow-md'
                    : 'bg-[#FAF8F5] text-[#536559] hover:bg-[#FDF6F2] hover:text-[#D97241] border border-[#F0EBE3]'
                }`}
              >
                {n === 'all' ? 'جميع أحياء المكلا' : n}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Reset */}
        {(searchQuery || selectedNeighborhood !== 'all') && (
          <div className="flex items-center justify-end text-xs text-[#536559] pt-3 border-t border-[#F0EBE3]">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedNeighborhood('all');
              }}
              className="text-[#D97241] font-bold hover:underline"
            >
              إعادة ضبط معايير البحث
            </button>
          </div>
        )}
      </div>

      {/* Gyms Grid or Empty State */}
      {filteredGyms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

export default GymsDirectoryPage;

import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Trainer } from '../types';
import { TrainerCard } from '../components/trainers/TrainerCard';
import { TrainerApplyModal } from '../components/trainers/TrainerApplyModal';
import { EmptyState } from '../components/common/EmptyState';
import { UserCheck, Search, PlusCircle, ShieldCheck } from 'lucide-react';

export const TrainersDirectoryPage: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const loadTrainers = () => {
    setTrainers(storageService.getTrainers());
  };

  useEffect(() => {
    loadTrainers();
    window.addEventListener('azm_storage_update', loadTrainers);
    return () => window.removeEventListener('azm_storage_update', loadTrainers);
  }, []);

  const filteredTrainers = trainers.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchNeighborhood =
      selectedNeighborhood === 'all' || t.neighborhood.includes(selectedNeighborhood);

    const matchGender =
      selectedGender === 'all' || t.gender === selectedGender;

    return matchSearch && matchNeighborhood && matchGender;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-['Cairo',sans-serif]" dir="rtl">
      
      {/* Banner */}
      <div className="bg-[#1F2722] text-white rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-xl border border-[#2D3831] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E49C7A] text-xs font-bold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D97241]" />
            <span>توثيق واعتماد معايير التدريب بالمكلا 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            دليل الكباتن والمدربين المعتمدين
          </h1>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-medium">
            حرصاً على المصداقية الميدانية: نعرض فقط المدربين الحقيقيين المعتمدين في صالات المكلا مع تفاصيل خبراتهم وشهاداتهم، مع إمكانية انضمام الكباتن المؤهلين.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="w-full sm:w-auto shrink-0 px-8 py-3.5 rounded-2xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-sm shadow-xl shadow-[#D97241]/25 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <PlusCircle className="w-5 h-5" />
          <span>تسجيل كابتن معتمد</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#F0EBE3] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو التخصص..."
            className="w-full pl-4 pr-11 py-3 rounded-2xl border border-[#F0EBE3] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D97241] text-xs sm:text-sm font-semibold text-[#1F2722]"
          />
          <Search className="w-4 h-4 text-[#7D9683] absolute right-4 top-3.5" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Gender Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] rounded-2xl border border-[#F0EBE3]">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGender === 'all'
                  ? 'bg-[#1F2722] text-white shadow-sm'
                  : 'text-[#536559] hover:text-[#1F2722]'
              }`}
            >
              الجميع
            </button>
            <button
              onClick={() => setSelectedGender('male')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGender === 'male'
                  ? 'bg-[#1F2722] text-white shadow-sm'
                  : 'text-[#536559] hover:text-[#1F2722]'
              }`}
            >
              رجال
            </button>
            <button
              onClick={() => setSelectedGender('female')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGender === 'female'
                  ? 'bg-[#1F2722] text-white shadow-sm'
                  : 'text-[#536559] hover:text-[#1F2722]'
              }`}
            >
              سيدات
            </button>
          </div>

          {/* Neighborhood Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'الشرج', 'فوة المتضررين', 'ديس المكلا'].map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNeighborhood(n)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedNeighborhood === n
                    ? 'bg-[#D97241] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#536559] hover:bg-[#FDF6F2] hover:text-[#D97241] border border-[#F0EBE3]'
                }`}
              >
                {n === 'all' ? 'جميع المناطق' : n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers Grid or Clean Empty State */}
      {filteredTrainers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTrainers.map((t) => (
            <TrainerCard key={t.id} trainer={t} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={UserCheck}
          title="لا يوجد مدربون مسجلون في هذا التصنيف حالياً"
          description="حرصاً على الشفافية الميدانية في المكلا، لا نعرض مدربين وهميين. إذا كنت مدرباً معتمداً في صالات المكلا، يمكنك تسجيل ملفك لتوثيقه الآن والظهور للمتدربين."
          actionText="تسجيل كابتن معتمد بالمكلا"
          onActionClick={() => setIsApplyModalOpen(true)}
        />
      )}

      {/* Application Modal */}
      <TrainerApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSuccess={loadTrainers}
      />
    </div>
  );
};

export default TrainersDirectoryPage;

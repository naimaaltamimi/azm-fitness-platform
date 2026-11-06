import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Trainer } from '../types';
import { TrainerCard } from '../components/trainers/TrainerCard';
import { TrainerApplyModal } from '../components/trainers/TrainerApplyModal';
import { EmptyState } from '../components/common/EmptyState';
import { UserCheck, Search, PlusCircle, ShieldCheck, Dumbbell } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-brand-blue-900 via-brand-dark-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D9AD55] text-xs font-bold border border-[#D9AD55]/40 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>توثيق واعتماد معايير التدريب بالمكلا</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            دليل الكباتن والمدربين المعتمدين
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            وفقاً لسياسة منصة عزم الميدانية: نعرض فقط المدربين الحقيقيين المعتمدين والممارسين في صالات المكلا بدون أي أسماء وهمية، مع فتح باب التسجيل للكباتن المؤهلين.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-2xl bg-[#2878B8] hover:bg-[#1f639a] text-white font-bold text-sm shadow-lg shadow-[#2878B8]/30 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          <PlusCircle className="w-5 h-5" />
          <span>تسجيل كابتن معتمد</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو التخصص..."
            className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 text-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Gender Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedGender === 'all'
                  ? 'bg-white text-brand-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الجميع
            </button>
            <button
              onClick={() => setSelectedGender('male')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedGender === 'male'
                  ? 'bg-white text-brand-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              رجال
            </button>
            <button
              onClick={() => setSelectedGender('female')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedGender === 'female'
                  ? 'bg-white text-brand-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              سيدات
            </button>
          </div>

          {/* Neighborhood Filter */}
          <div className="flex flex-wrap items-center gap-1">
            {['all', 'الشرج', 'فوة المتضررين', 'ديس المكلا'].map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNeighborhood(n)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedNeighborhood === n
                    ? 'bg-brand-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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


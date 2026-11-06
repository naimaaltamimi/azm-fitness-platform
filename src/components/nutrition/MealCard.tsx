import React from 'react';
import { Link } from 'react-router-dom';
import { Meal } from '../../types';
import { Flame, Clock, Beef, ChevronLeft } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const categoryNames: Record<Meal['category'], string> = {
    breakfast: 'فطور صحي',
    lunch: 'غداء رياضي',
    dinner: 'عشاء خفيف',
    snack: 'وجبة خفيفة',
    pre_workout: 'قبل التمرين',
    post_workout: 'بعد التمرين'
  };

  return (
    <div className="group bg-white rounded-3xl border border-[#F0EBE3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_-10px_rgba(217,114,65,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full font-['Cairo',sans-serif]">
      {/* Photo with Badges */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
        <img
          src={meal.imageUrl}
          alt={meal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#1F2722] shadow-sm">
          {categoryNames[meal.category]}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F2722]/85 backdrop-blur-md text-xs text-white font-bold">
          <Clock className="w-3.5 h-3.5 text-[#E49C7A]" />
          <span>{meal.prepTimeMinutes} دقيقة</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-black text-[#1F2722] text-base sm:text-lg leading-snug group-hover:text-[#D97241] transition-colors mb-2">
            {meal.title}
          </h3>
          <p className="text-[#536559] text-xs sm:text-sm line-clamp-2 leading-relaxed font-medium">
            {meal.description}
          </p>
        </div>

        {/* Nutritional Highlights */}
        <div className="pt-3 border-t border-[#F0EBE3] space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center py-2.5 px-3 bg-[#FAF8F5] rounded-2xl border border-[#F0EBE3]">
            <div>
              <span className="text-[11px] text-[#536559] font-bold block">سعرات</span>
              <span className="text-sm sm:text-base font-black text-[#D97241] flex items-center justify-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 text-[#D97241] fill-[#D97241]/20" />
                {meal.calories}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#536559] font-bold block">بروتين</span>
              <span className="text-sm sm:text-base font-black text-[#7D9683] flex items-center justify-center gap-0.5 font-mono">
                <Beef className="w-3.5 h-3.5" />
                {meal.protein}g
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#536559] font-bold block">كارب</span>
              <span className="text-sm sm:text-base font-black text-[#1F2722] font-mono">{meal.carbs}g</span>
            </div>
          </div>

          <Link
            to={`/meals/${meal.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#FDF6F2] text-[#1F2722] hover:text-[#D97241] font-black text-xs sm:text-sm transition-all border border-[#F0EBE3] min-h-[44px] group"
          >
            <span>عرض المكونات والوصفة</span>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

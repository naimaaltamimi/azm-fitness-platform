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
    <div className="group card-sheikha overflow-hidden flex flex-col h-full">
      {/* Photo with Badges */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
        <img
          src={meal.imageUrl}
          alt={meal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow-sm">
          {categoryNames[meal.category]}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-xs text-white font-medium">
          <Clock className="w-3.5 h-3.5 text-brand-green-400" />
          <span>{meal.prepTimeMinutes} دقيقة</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-brand-blue-600 transition-colors mb-2">
            {meal.title}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {meal.description}
          </p>
        </div>

        {/* Nutritional Highlights */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center py-2 px-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">سعرات</span>
              <span className="text-sm sm:text-base font-black text-amber-600 flex items-center justify-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                {meal.calories}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">بروتين</span>
              <span className="text-sm sm:text-base font-black text-brand-blue-600 flex items-center justify-center gap-0.5">
                <Beef className="w-3.5 h-3.5" />
                {meal.protein}g
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">كارب</span>
              <span className="text-sm sm:text-base font-black text-brand-green-600">{meal.carbs}g</span>
            </div>
          </div>

          <Link
            to={`/meals/${meal.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-brand-blue-50 text-slate-800 hover:text-brand-blue-700 font-bold text-xs sm:text-sm transition-colors border border-slate-200/70 min-h-[44px] group"
          >
            <span>عرض المكونات والوصفة</span>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

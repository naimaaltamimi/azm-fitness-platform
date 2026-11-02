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
    <div className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Photo */}
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
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs text-white font-medium">
          <Clock className="w-3.5 h-3.5 text-brand-green-400" />
          <span>{meal.prepTimeMinutes} دقيقة</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-blue-600 transition-colors mb-2">
            {meal.title}
          </h3>
          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
            {meal.description}
          </p>
        </div>

        {/* Nutritional Highlights */}
        <div className="pt-3 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-2 text-center py-2 px-3 bg-slate-50 rounded-2xl">
            <div>
              <span className="text-[10px] text-slate-500 block">سعرات</span>
              <span className="text-sm font-black text-amber-600 flex items-center justify-center gap-0.5">
                <Flame className="w-3.5 h-3.5" />
                {meal.calories}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">بروتين</span>
              <span className="text-sm font-black text-brand-blue-600 flex items-center justify-center gap-0.5">
                <Beef className="w-3.5 h-3.5" />
                {meal.protein}g
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">كارب</span>
              <span className="text-sm font-black text-brand-green-600">{meal.carbs}g</span>
            </div>
          </div>

          <Link
            to={`/meals/${meal.id}`}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-brand-blue-50 text-slate-700 hover:text-brand-blue-700 font-bold text-xs transition-colors"
          >
            <span>عرض المكونات وطريقة التحضير</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};


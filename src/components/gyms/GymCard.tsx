import React from 'react';
import { Link } from 'react-router-dom';
import { Gym } from '../../types';
import { MapPin, CheckCircle, ArrowLeft, Clock } from 'lucide-react';

interface GymCardProps {
  gym: Gym;
}

export const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  return (
    <div className="group card-sheikha overflow-hidden flex flex-col h-full">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={gym.coverImage}
          alt={gym.nameAr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/20 to-transparent" />

        {/* Neighborhood Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-blue-800 text-xs font-bold shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-brand-blue-600" />
          <span>المكلا - {gym.neighborhood}</span>
        </div>

        {/* Verified Badge */}
        {gym.isVerified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-green-500/95 backdrop-blur-md text-white text-xs font-bold shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>صالة موثقة</span>
          </div>
        )}

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-3 right-3 left-3 text-white">
          <h3 className="text-xl font-extrabold drop-shadow-md text-white group-hover:text-brand-blue-300 transition-colors">
            {gym.nameAr}
          </h3>
          <p className="text-xs text-slate-300 font-mono mt-0.5">{gym.nameEn}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-3.5">
            {gym.shortDescription}
          </p>

          {/* Key Features Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {gym.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg"
              >
                ✓ {feat}
              </span>
            ))}
          </div>

          {/* Working Hours Info */}
          {gym.workingHours.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <Clock className="w-3.5 h-3.5 text-brand-blue-500" />
              <span>{gym.workingHours[0].period}: {gym.workingHours[0].hours}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2.5">
          <Link
            to={`/gyms/${gym.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-blue-700 hover:border-brand-blue-300 hover:bg-brand-blue-50/60 font-bold text-xs sm:text-sm transition-all text-center min-h-[44px]"
          >
            <span>التفاصيل والصور</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <Link
            to={`/gyms/${gym.slug}/subscribe`}
            className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-brand-blue-600/20 active:scale-95 text-center min-h-[44px]"
          >
            طلب اشتراك
          </Link>
        </div>
      </div>
    </div>
  );
};

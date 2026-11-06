import React from 'react';
import { Link } from 'react-router-dom';
import { Gym } from '../../types';
import { MapPin, CheckCircle2, ArrowLeft, Clock } from 'lucide-react';

interface GymCardProps {
  gym: Gym;
}

export const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  return (
    <div className="group bg-white rounded-3xl border border-[#F0EBE3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_-10px_rgba(217,114,65,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full font-['Cairo',sans-serif]">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={gym.coverImage}
          alt={gym.nameAr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Neighborhood Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1F2722] text-xs font-bold shadow-md">
          <MapPin className="w-3.5 h-3.5 text-[#D97241]" />
          <span>المكلا - {gym.neighborhood}</span>
        </div>

        {/* Verified Badge */}
        {gym.isVerified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#7D9683]/95 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>موثقة ميدانياً</span>
          </div>
        )}

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-3 right-3 left-3 text-white">
          <h3 className="text-xl font-black drop-shadow-md text-white group-hover:text-amber-200 transition-colors">
            {gym.nameAr}
          </h3>
          <p className="text-xs text-white/70 font-mono mt-0.5">{gym.nameEn}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-[#536559] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3.5 font-medium">
            {gym.shortDescription}
          </p>

          {/* Key Features Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {gym.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-bold px-2.5 py-1 bg-[#FAF8F5] text-[#1F2722] border border-[#F0EBE3] rounded-xl"
              >
                ✓ {feat}
              </span>
            ))}
          </div>

          {/* Working Hours Info */}
          {gym.workingHours.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-[#536559] pt-3 border-t border-[#F0EBE3]">
              <Clock className="w-3.5 h-3.5 text-[#D97241]" />
              <span className="font-semibold">{gym.workingHours[0].period}: {gym.workingHours[0].hours}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2.5">
          <Link
            to={`/gyms/${gym.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[#F0EBE3] text-[#1F2722] hover:text-[#D97241] hover:border-[#D97241]/40 hover:bg-[#FAF8F5] font-bold text-xs sm:text-sm transition-all text-center min-h-[44px]"
          >
            <span>التفاصيل والصور</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <Link
            to={`/gyms/${gym.slug}/subscribe`}
            className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#D97241]/25 active:scale-95 text-center min-h-[44px]"
          >
            طلب اشتراك
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GymCard;

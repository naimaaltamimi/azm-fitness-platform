import React from 'react';
import { Link } from 'react-router-dom';
import { Trainer } from '../../types';
import { MapPin, Award, CheckCircle2, Calendar, ArrowLeft } from 'lucide-react';

interface TrainerCardProps {
  trainer: Trainer;
  onBookClick?: (trainer: Trainer) => void;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <div className="bg-white rounded-3xl border border-[#F0EBE3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_-10px_rgba(217,114,65,0.15)] hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col justify-between h-full font-['Cairo',sans-serif]">
      <div className="space-y-4">
        {/* Header with Avatar & Badge */}
        <div className="flex items-start gap-4">
          <img
            src={trainer.avatarUrl}
            alt={trainer.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#7D9683]/20 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-[#1F2722] text-base sm:text-lg truncate">{trainer.name}</h3>
              {trainer.isVerified && (
                <span title="كابتن معتمد">
                  <CheckCircle2 className="w-4 h-4 text-[#7D9683] shrink-0" />
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#D97241] mt-0.5">{trainer.specialty}</p>
            <div className="flex items-center gap-2 text-xs text-[#536559] mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#7D9683]" />
                <span>المكلا - {trainer.neighborhood}</span>
              </span>
              {trainer.gender === 'female' && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">
                  فترة نسائية
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[#536559] text-xs leading-relaxed line-clamp-3 font-medium">
          {trainer.bio}
        </p>

        {/* Affiliation / Badges */}
        {trainer.activeGymAffiliation && (
          <div className="text-[11px] font-semibold bg-[#FAF8F5] border border-[#F0EBE3] rounded-2xl px-3.5 py-2 text-[#1F2722] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D97241]" />
            <span>كابتن معتمد لدى: <strong className="text-[#1F2722]">{trainer.activeGymAffiliation}</strong></span>
          </div>
        )}

        {/* Certifications preview */}
        <div className="flex flex-wrap gap-1.5">
          {trainer.certifications.map((cert, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#E5ECE7] text-[#617C69] px-2.5 py-1 rounded-xl"
            >
              <Award className="w-3 h-3 text-[#617C69]" />
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-[#F0EBE3] flex items-center gap-2.5">
        <Link
          to={`/trainers/${trainer.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-[#F0EBE3] text-[#1F2722] hover:text-[#D97241] hover:border-[#D97241]/40 hover:bg-[#FAF8F5] font-bold text-xs transition-colors min-h-[42px]"
        >
          <span>الملف والشهادات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={`/trainers/${trainer.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#D97241] hover:bg-[#C75F2F] text-white font-bold text-xs transition-all shadow-md shadow-[#D97241]/20 active:scale-95 min-h-[42px]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>حجز تدريب</span>
        </Link>
      </div>
    </div>
  );
};

export default TrainerCard;

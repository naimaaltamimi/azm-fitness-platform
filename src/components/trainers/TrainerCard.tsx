import React from 'react';
import { Link } from 'react-router-dom';
import { Trainer } from '../../types';
import { MapPin, Award, CheckCircle, Calendar, ArrowLeft, Instagram } from 'lucide-react';

interface TrainerCardProps {
  trainer: Trainer;
  onBookClick?: (trainer: Trainer) => void;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <div className="card-sheikha p-6 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header with Avatar & Badge */}
        <div className="flex items-start gap-4">
          <img
            src={trainer.avatarUrl}
            alt={trainer.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-blue-500/20 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">{trainer.name}</h3>
              {trainer.isVerified && (
                <span title="مدرب موثق">
                  <CheckCircle className="w-4 h-4 text-brand-green-500 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-brand-blue-600 mt-0.5">{trainer.specialty}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
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
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
          {trainer.bio}
        </p>

        {/* Instagram Pill Badge if available */}
        {trainer.instagramUsername && (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 font-mono">
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span>@{trainer.instagramUsername}</span>
          </div>
        )}

        {/* Affiliation / Badges */}
        {trainer.activeGymAffiliation && (
          <div className="text-[11px] font-medium bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-green-500" />
            <span>مدرب معتمد لدى: <strong className="text-slate-900">{trainer.activeGymAffiliation}</strong></span>
          </div>
        )}

        {/* Certifications preview */}
        <div className="flex flex-wrap gap-1.5">
          {trainer.certifications.map((cert, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[10px] font-semibold bg-brand-blue-50 text-brand-blue-700 px-2.5 py-1 rounded-lg"
            >
              <Award className="w-3 h-3 text-brand-blue-500" />
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
        <Link
          to={`/trainers/${trainer.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-blue-700 hover:border-brand-blue-300 hover:bg-brand-blue-50 font-bold text-xs transition-colors min-h-[42px]"
        >
          <span>الملف والشهادات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={`/trainers/${trainer.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-brand-blue-600/20 active:scale-95 min-h-[42px]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>حجز استشارة</span>
        </Link>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Instagram, ExternalLink, Play, AlertCircle } from 'lucide-react';

interface InstagramEmbedCardProps {
  postUrl: string;
  caption?: string;
  thumbnailUrl?: string;
}

export const InstagramEmbedCard: React.FC<InstagramEmbedCardProps> = ({
  postUrl,
  caption,
  thumbnailUrl,
}) => {
  const [loadError, setLoadError] = useState(false);

  // Extract clean post/reel ID or shortcode if possible
  const getEmbedUrl = (url: string) => {
    try {
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      return `${cleanUrl}/embed/captioned/`;
    } catch {
      return url;
    }
  };

  return (
    <div className="card-sheikha overflow-hidden flex flex-col justify-between h-full group">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Instagram className="w-4 h-4" />
          </div>
          <span>منشور معتمد على Instagram</span>
        </div>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-brand-blue-600 hover:text-brand-blue-700 font-semibold inline-flex items-center gap-1 group/link"
        >
          <span>مشاهدة بالأصل</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-x-0.5" />
        </a>
      </div>

      {/* Media or Embed Container */}
      <div className="relative aspect-[4/5] sm:aspect-square bg-slate-900 overflow-hidden flex items-center justify-center">
        {!loadError ? (
          <iframe
            src={getEmbedUrl(postUrl)}
            className="w-full h-full border-0"
            title="Instagram Official Embed"
            allowTransparency={true}
            allow="encrypted-media"
            onError={() => setLoadError(true)}
          />
        ) : (
          <div className="p-6 text-center text-white space-y-3">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="Instagram preview"
                className="w-full h-full object-cover absolute inset-0 opacity-60"
              />
            ) : null}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                <Play className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-bold text-slate-200">
                محتوى تفاعلي من Instagram
              </p>
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow hover:bg-slate-100 transition-colors"
              >
                <span>فتح المنشور في تطبيق Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Caption & Attribution Footer */}
      {caption && (
        <div className="p-4 bg-white text-right">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default InstagramEmbedCard;


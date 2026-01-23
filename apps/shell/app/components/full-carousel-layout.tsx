import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FullCarouselItem {
  id?: number | string;
  bgGradient: string;
  badge?: { display: boolean; icon: string; text: string; position?: string };
  title: { display: boolean; fontSize: string; alignment?: string; text: string; position?: string };
  subtitle: { display: boolean; fontSize: string; alignment?: string; text: string; position?: string };
  description: { display: boolean; fontSize: string; alignment?: string; text: string; position?: string };
  primaryButton: { display: boolean; url: string; style: string; label: string; position?: string };
  secondaryButton: { display: boolean; url: string; style: string; label: string; position?: string };
  emoji: { display: boolean; emoji1: string; emoji2: string; emoji3?: string; position?: string; layout?: string };
}

interface FullCarouselConfig {
  fixedHeight: number | string;
}

interface FullCarouselProps {
  items?: FullCarouselItem[];
  config?: FullCarouselConfig;
}

export const FullCarousel = ({ items, config }: FullCarouselProps) => {
  const [idx, setIdx] = useState(0);
  if (!items || !config) {
    return null;
  }
  const item = items[idx];
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ minHeight: config.fixedHeight }}>
      <div className="w-full flex items-center justify-center px-8 rounded-2xl" style={{ background: item.bgGradient, minHeight: config.fixedHeight, color: '#fff' }}>
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-8">
          <div className="flex-1">
            {item.badge?.display && (
              <div className="inline-flex items-center gap-2 mb-3 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="text-lg">{item.badge.icon}</span>
                <span className="text-xs font-bold">{item.badge.text}</span>
              </div>
            )}
            {item.title.display && (
              <h1 className={`${item.title.fontSize} font-bold mb-2 ${item.title.alignment}`}>{item.title.text}</h1>
            )}
            {item.subtitle.display && (
              <p className={`${item.subtitle.fontSize} font-semibold mb-2 ${item.subtitle.alignment}`}>{item.subtitle.text}</p>
            )}
            {item.description.display && (
              <p className={`${item.description.fontSize} mb-5 opacity-90 ${item.description.alignment}`}>{item.description.text}</p>
            )}
            <div className="flex gap-3">
              {item.primaryButton.display && (
                <a href={item.primaryButton.url} className={`font-bold px-8 py-3 rounded-lg hover:opacity-80 text-sm ${item.primaryButton.style}`}>
                  {item.primaryButton.label}
                </a>
              )}
              {item.secondaryButton.display && (
                <a href={item.secondaryButton.url} className={`font-bold px-8 py-3 rounded-lg hover:opacity-80 text-sm ${item.secondaryButton.style}`}>
                  {item.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          {item.emoji?.display && (
            <div className="flex-1 text-center">
              <div className="text-8xl">{item.emoji.emoji1}</div>
              <div className="text-6xl opacity-60 ml-16">{item.emoji.emoji2}</div>
              <div className="text-6xl opacity-40 ml-32">{item.emoji.emoji3}</div>
            </div>
          )}
        </div>
      </div>
      <button onClick={() => setIdx((p) => (p - 1 + items.length) % items.length)} className="absolute -left-8 md:left-6 lg:left-12 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 p-3 rounded-full z-20 shadow-lg transition-all hover:scale-110">
        <ChevronLeft size={32} color="black" />
      </button>
      <button onClick={() => setIdx((p) => (p + 1) % items.length)} className="absolute -right-8 md:right-6 lg:right-12 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 p-3 rounded-full z-20 shadow-lg transition-all hover:scale-110">
        <ChevronRight size={32} color="black" />
      </button>
      <div className="flex justify-center gap-3 absolute bottom-4 left-0 right-0 z-20">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`transition ${i === idx ? 'w-10 h-3 bg-white rounded-full' : 'w-3 h-3 bg-white bg-opacity-50 rounded-full'}`} />
        ))}
      </div>
    </div>
  );
};
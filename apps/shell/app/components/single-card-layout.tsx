import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id?: number | string;
  bgGradient: string;
  badge?: { display: boolean; icon: string; text: string; position?: string };
  title: { display: boolean; fontSize: string; text: string; position?: string; alignment?: string };
  subtitle: { display: boolean; fontSize: string; text: string; position?: string; alignment?: string };
  description: { display: boolean; fontSize: string; text: string; position?: string; alignment?: string };
  primaryButton: { display: boolean; url: string; style: string; label: string; position?: string };
  secondaryButton: { display: boolean; url: string; style: string; label: string; position?: string };
  emoji: { display: boolean; emoji1: string; emoji2: string; emoji3?: string; position?: string; layout?: string };
}

interface Carousel {
  items: CarouselItem[];
}

interface Card {
  bgGradient: string;
  badge: { display: boolean; icon: string; text: string };
  emoji: { display: boolean; emoji1: string };
  title: { display: boolean; fontSize: string; text: string };
  subtitle: { display: boolean; fontSize: string; text: string };
  description: { display: boolean; fontSize: string; text: string };
  primaryButton: { display: boolean; url: string; style: string; label: string };
  secondaryButton: { display: boolean; url: string; style: string; label: string };
}

interface Config {
  fixedHeight: string | number;
  carouselWidth: number;
  cardStackWidth: number;
}

interface SingleCardLayoutProps {
  carousel?: Carousel;
  singleCard?: Card;
  config?: Config;
}

export const SingleCardLayout = ({ carousel, singleCard, config }: SingleCardLayoutProps) => {
  const [idx, setIdx] = useState(0);
  if (!carousel || !singleCard || !config) {
    return null;
  }
  const item = carousel.items[idx];
  return (
    <div className="flex w-full rounded-2xl overflow-hidden" style={{ minHeight: config.fixedHeight }}>
      <div className="relative overflow-hidden flex items-center justify-center rounded-l-2xl" style={{ width: config.carouselWidth + '%', background: item.bgGradient, minHeight: config.fixedHeight }}>
        <div className="px-12 z-10 text-center md:text-left w-full">
          {item.badge?.display && <div className="inline-flex items-center gap-2 mb-4 bg-white bg-opacity-20 px-4 py-2 rounded-full"><span className="text-xl">{item.badge.icon}</span><span className="text-sm font-bold">{item.badge.text}</span></div>}
          {item.title.display && <h1 className={`${item.title.fontSize} font-bold mb-4`} style={{ color: '#fff' }}>{item.title.text}</h1>}
          {item.subtitle.display && <p className={`${item.subtitle.fontSize} font-semibold mb-3`} style={{ color: '#fff' }}>{item.subtitle.text}</p>}
          {item.description.display && <p className={`${item.description.fontSize} mb-8 opacity-90`} style={{ color: '#fff' }}>{item.description.text}</p>}
          <div className="flex gap-4">
            {item.primaryButton.display && <a href={item.primaryButton.url} className={`font-bold px-8 py-3 rounded-lg hover:opacity-80 inline-block ${item.primaryButton.style}`}>{item.primaryButton.label}</a>}
            {item.secondaryButton.display && <a href={item.secondaryButton.url} className={`font-bold px-8 py-3 rounded-lg hover:opacity-80 inline-block ${item.secondaryButton.style}`}>{item.secondaryButton.label}</a>}
          </div>
        </div>
        {item.emoji?.display && <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-4 text-7xl opacity-80"><div>{item.emoji.emoji1}</div><div className="opacity-60">{item.emoji.emoji2}</div></div>}
        <button onClick={() => setIdx((p) => (p - 1 + carousel.items.length) % carousel.items.length)} className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full z-20 shadow-lg transition-all hover:scale-110"><ChevronLeft size={28} color="black" /></button>
        <button onClick={() => setIdx((p) => (p + 1) % carousel.items.length)} className="hidden md:block absolute right-1/4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full z-20 shadow-lg transition-all hover:scale-110"><ChevronRight size={28} color="black" /></button>
      </div>
      <div className="flex items-center justify-center p-6 rounded-r-2xl" style={{ width: config.cardStackWidth + '%', background: singleCard.bgGradient, minHeight: config.fixedHeight }}>
        <div className="text-center text-white">
          {singleCard.badge?.display && <div className="inline-flex items-center gap-2 mb-3 bg-white bg-opacity-20 px-3 py-1 rounded-full"><span className="text-lg">{singleCard.badge.icon}</span><span className="text-xs font-bold">{singleCard.badge.text}</span></div>}
          {singleCard.emoji?.display && <div className="text-6xl mb-3">{singleCard.emoji.emoji1}</div>}
          {singleCard.title.display && <h2 className={`${singleCard.title.fontSize} font-bold mb-2`}>{singleCard.title.text}</h2>}
          {singleCard.subtitle.display && <p className={`${singleCard.subtitle.fontSize} font-semibold mb-2 opacity-90`}>{singleCard.subtitle.text}</p>}
          {singleCard.description.display && <p className={`${singleCard.description.fontSize} mb-4 opacity-80`}>{singleCard.description.text}</p>}
          <div className="flex flex-col gap-2">
            {singleCard.primaryButton.display && <a href={singleCard.primaryButton.url} className={`font-bold px-6 py-2 rounded-lg hover:opacity-80 inline-block ${singleCard.primaryButton.style}`}>{singleCard.primaryButton.label}</a>}
            {singleCard.secondaryButton.display && <a href={singleCard.secondaryButton.url} className={`font-bold px-6 py-2 rounded-lg hover:opacity-80 inline-block ${singleCard.secondaryButton.style}`}>{singleCard.secondaryButton.label}</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

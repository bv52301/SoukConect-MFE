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
  emoji: { display: boolean; emoji1: string; emoji2: string; emoji3?: string; position?: string; layout?: string };
}

interface Carousel {
  items: CarouselItem[];
}

interface SidebarItem {
  icon: string;
  label: string;
  url: string;
}

interface Sidebar {
  icon: string;
  title: string;
  bgColor: string;
  items: SidebarItem[];
}

interface Config {
  fixedHeight: string | number;
  leftWidth: number;
  rightWidth: number;
  carouselWidth: number;
}

interface DualSidebarCarouselProps {
  carousel?: Carousel;
  leftSidebar?: Sidebar;
  rightSidebar?: Sidebar;
  config?: Config;
}

export const DualSidebarCarousel = ({ carousel, leftSidebar, rightSidebar, config }: DualSidebarCarouselProps) => {
  const [idx, setIdx] = useState(0);
  if (!carousel || !leftSidebar || !rightSidebar || !config) {
    return null;
  }
  const item = carousel.items[idx];
  return (
    <div className="flex w-full rounded-2xl overflow-hidden" style={{ minHeight: config.fixedHeight }}>
      <div className="flex flex-col items-center justify-center p-4 rounded-l-2xl" style={{ width: config.leftWidth + '%', backgroundColor: leftSidebar.bgColor, minHeight: config.fixedHeight }}>
        <div className="text-center text-white">
          <div className="text-4xl mb-2">{leftSidebar.icon}</div>
          <h2 className="text-lg font-bold mb-4">{leftSidebar.title}</h2>
          <div className="space-y-3">
            {leftSidebar.items.map((itm, i) => (
              <a key={i} href={itm.url} className="flex items-center justify-center gap-2 hover:opacity-80 text-xs">
                <span className="text-xl">{itm.icon}</span>
                <span className="font-semibold">{itm.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden flex items-center justify-center" style={{ width: config.carouselWidth + '%', background: item.bgGradient, minHeight: config.fixedHeight }}>
        <div className="px-8 z-10 text-center w-full">
          {item.badge?.display && <div className="inline-flex items-center gap-2 mb-3 bg-white bg-opacity-20 px-3 py-1 rounded-full"><span className="text-lg">{item.badge.icon}</span><span className="text-xs font-bold">{item.badge.text}</span></div>}
          {item.title.display && <h1 className={`${item.title.fontSize} font-bold mb-3`} style={{ color: '#fff' }}>{item.title.text}</h1>}
          {item.subtitle.display && <p className={`${item.subtitle.fontSize} font-semibold mb-2`} style={{ color: '#fff' }}>{item.subtitle.text}</p>}
          {item.description.display && <p className={`${item.description.fontSize} mb-4 opacity-90`} style={{ color: '#fff' }}>{item.description.text}</p>}
          {item.primaryButton.display && <a href={item.primaryButton.url} className={`font-bold px-8 py-2 rounded-lg hover:opacity-80 inline-block ${item.primaryButton.style}`}>{item.primaryButton.label}</a>}
        </div>
        {item.emoji?.display && <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-4 text-6xl opacity-80"><div>{item.emoji.emoji1}</div><div className="opacity-60">{item.emoji.emoji2}</div></div>}
        <button onClick={() => setIdx((p) => (p - 1 + carousel.items.length) % carousel.items.length)} className="hidden md:block absolute left-1/4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full z-20 shadow-lg transition-all hover:scale-110"><ChevronLeft size={24} color="black" /></button>
        <button onClick={() => setIdx((p) => (p + 1) % carousel.items.length)} className="hidden md:block absolute right-1/4 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full z-20 shadow-lg transition-all hover:scale-110"><ChevronRight size={24} color="black" /></button>
      </div>
      <div className="flex flex-col items-center justify-center p-4 rounded-r-2xl" style={{ width: config.rightWidth + '%', backgroundColor: rightSidebar.bgColor, minHeight: config.fixedHeight }}>
        <div className="text-center text-white">
          <div className="text-4xl mb-2">{rightSidebar.icon}</div>
          <h2 className="text-lg font-bold mb-4">{rightSidebar.title}</h2>
          <div className="space-y-3">
            {rightSidebar.items.map((itm, i) => (
              <a key={i} href={itm.url} className="flex items-center justify-center gap-2 hover:opacity-80 text-xs">
                <span className="text-xl">{itm.icon}</span>
                <span className="font-semibold">{itm.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
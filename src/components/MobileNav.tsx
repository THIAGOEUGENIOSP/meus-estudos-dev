import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileNavProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function MobileNav({ sections, activeSection, onNavigate }: MobileNavProps) {
  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const prev = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const next = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => prev && onNavigate(prev.id)} disabled={!prev} className={`flex items-center gap-1 text-sm font-medium ${prev ? 'text-emerald-600' : 'text-gray-300 cursor-not-allowed'}`}>
          <ChevronLeft className="w-4 h-4" />
          <span className="max-w-[100px] truncate">{prev?.title || ''}</span>
        </button>
        <span className="text-xs text-gray-400">{currentIndex + 1} / {sections.length}</span>
        <button onClick={() => next && onNavigate(next.id)} disabled={!next} className={`flex items-center gap-1 text-sm font-medium ${next ? 'text-emerald-600' : 'text-gray-300 cursor-not-allowed'}`}>
          <span className="max-w-[100px] truncate">{next?.title || ''}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}

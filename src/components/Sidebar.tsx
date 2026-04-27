import { BookOpen, Menu, X } from 'lucide-react';

interface SidebarItem {
  id: string;
  title: string;
}

interface SectionGroup {
  label: string;
  items: SidebarItem[];
}

interface SidebarProps {
  groupedSections: SectionGroup[];
  activeSection: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const groupColors: Record<string, string> = {
  HTML: 'text-orange-500',
  CSS: 'text-sky-500',
  JavaScript: 'text-amber-500',
  React: 'text-cyan-500',
  TypeScript: 'text-blue-400',
  'Next.js': 'text-slate-400',
  'Node.js': 'text-lime-500',
  SQL: 'text-violet-500',
  Git: 'text-rose-500',
  Deploy: 'text-green-500',
  Docker: 'text-blue-500',
  'Segurança': 'text-red-500',
};

const groupBorders: Record<string, string> = {
  HTML: 'border-orange-500',
  CSS: 'border-sky-500',
  JavaScript: 'border-amber-500',
  React: 'border-cyan-500',
  TypeScript: 'border-blue-400',
  'Next.js': 'border-slate-400',
  'Node.js': 'border-lime-500',
  SQL: 'border-violet-500',
  Git: 'border-rose-500',
  Deploy: 'border-green-500',
  Docker: 'border-blue-500',
  'Segurança': 'border-red-500',
};

export default function Sidebar({ groupedSections, activeSection, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-lg text-gray-900 dark:text-slate-100">Guia Web</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>
        <nav className="p-4 space-y-6">
          {groupedSections.map((group) => (
            <div key={group.label}>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${groupColors[group.label] || 'text-gray-500'} border-l-2 pl-2 ${groupBorders[group.label] || 'border-gray-300'}`}>
                {group.label}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => { onNavigate(item.id); onClose(); }} className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${activeSection === item.id ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium' : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'}`}>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

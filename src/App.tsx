import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Menu, X, Search, Sun, Moon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import Section9 from './sections/Section9';
import Section10 from './sections/Section10';
import Section11 from './sections/Section11';
import Section12 from './sections/Section12';
import Section13 from './sections/Section13';
import Section14 from './sections/Section14';
import Section15 from './sections/Section15';
import Section16 from './sections/Section16';
import Section17 from './sections/Section17';
import Section18 from './sections/Section18';
import Section19 from './sections/Section19';
import Section20 from './sections/Section20';
import Section21 from './sections/Section21';
import Section22 from './sections/Section22';
import Section23 from './sections/Section23';
import Section24 from './sections/Section24';
import Section25 from './sections/Section25';
import Section26 from './sections/Section26';
import Section27 from './sections/Section27';
import Section28 from './sections/Section28';
import Section29 from './sections/Section29';
import Section30 from './sections/Section30';
import Section31 from './sections/Section31';
import Section32 from './sections/Section32';
import Section33 from './sections/Section33';
import Section34 from './sections/Section34';
import Section35 from './sections/Section35';
import Section36 from './sections/Section36';
import Section37 from './sections/Section37';
import Section38 from './sections/Section38';
import Section39 from './sections/Section39';
import Section40 from './sections/Section40';
import Section41 from './sections/Section41';
import Section42 from './sections/Section42';
import Section43 from './sections/Section43';
import Section44 from './sections/Section44';
import Section45 from './sections/Section45';
import Section46 from './sections/Section46';

const sections = [
  { id: 'hero', title: 'Inicio', icon: '🏠', group: '' },
  // HTML
  { id: 'section-1', title: '1. Estrutura Base', icon: '🏗️', group: 'HTML' },
  { id: 'section-2', title: '2. Texto e Conteudo', icon: '📝', group: 'HTML' },
  { id: 'section-3', title: '3. Links e Navegacao', icon: '🔗', group: 'HTML' },
  { id: 'section-4', title: '4. Imagens e Midia', icon: '🖼️', group: 'HTML' },
  { id: 'section-5', title: '5. Listas', icon: '📋', group: 'HTML' },
  { id: 'section-6', title: '6. Tabelas', icon: '📊', group: 'HTML' },
  { id: 'section-7', title: '7. Formularios', icon: '📋', group: 'HTML' },
  { id: 'section-8', title: '8. Semantica e Layout', icon: '📐', group: 'HTML' },
  { id: 'section-9', title: '9. Atributos Globais', icon: '⚙️', group: 'HTML' },
  { id: 'section-10', title: '10. Classes e IDs', icon: '🏷️', group: 'HTML' },
  { id: 'section-11', title: '11. SEO e Acessibilidade', icon: '🔍', group: 'HTML' },
  { id: 'section-12', title: '12. Projeto Final', icon: '🚀', group: 'HTML' },
  // CSS
  { id: 'section-13', title: '13. Fundamentos', icon: '🎨', group: 'CSS' },
  { id: 'section-14', title: '14. Box Model', icon: '📦', group: 'CSS' },
  { id: 'section-15', title: '15. Flexbox', icon: '↔️', group: 'CSS' },
  { id: 'section-16', title: '16. Grid', icon: '🔲', group: 'CSS' },
  { id: 'section-17', title: '17. Responsivo e Animacoes', icon: '📱', group: 'CSS' },
  // JavaScript
  { id: 'section-18', title: '18. Fundamentos', icon: '⚡', group: 'JavaScript' },
  { id: 'section-19', title: '19. Estruturas', icon: '🔄', group: 'JavaScript' },
  { id: 'section-20', title: '20. Funcoes e DOM', icon: '🎯', group: 'JavaScript' },
  { id: 'section-21', title: '21. Assincrono', icon: '⏳', group: 'JavaScript' },
  { id: 'section-22', title: '22. ES6+ e Modulos', icon: '🧩', group: 'JavaScript' },
  // React
  { id: 'section-23', title: '23. Fundamentos', icon: '⚛️', group: 'React' },
  { id: 'section-24', title: '24. Props e State', icon: '📡', group: 'React' },
  { id: 'section-25', title: '25. Hooks', icon: '🪝', group: 'React' },
  { id: 'section-26', title: '26. Projeto Pratico', icon: '🛠️', group: 'React' },
  // TypeScript
  { id: 'section-27', title: '27. Fundamentos', icon: '🔷', group: 'TypeScript' },
  { id: 'section-28', title: '28. Avancado', icon: '🔶', group: 'TypeScript' },
  { id: 'section-29', title: '29. Projeto Pratico', icon: '🛠️', group: 'TypeScript' },
  // Next.js
  { id: 'section-30', title: '30. Fundamentos e Routing', icon: '▲', group: 'Next.js' },
  { id: 'section-31', title: '31. Data Fetching e API', icon: '🔄', group: 'Next.js' },
  { id: 'section-32', title: '32. Projeto Pratico', icon: '🛠️', group: 'Next.js' },
  // Node.js
  { id: 'section-33', title: '33. Fundamentos', icon: '🟢', group: 'Node.js' },
  { id: 'section-34', title: '34. Express e APIs', icon: '🌐', group: 'Node.js' },
  { id: 'section-35', title: '35. Projeto Pratico', icon: '🛠️', group: 'Node.js' },
  // Extras
  { id: 'section-36', title: 'Tabela-Resumo', icon: '📑', group: 'Extras' },
  { id: 'section-37', title: 'Glossario', icon: '📖', group: 'Extras' },
  { id: 'section-38', title: 'Quiz', icon: '🧠', group: 'Extras' },
  // SQL
  { id: 'section-39', title: '39. SQL Fundamentos', icon: '🗄️', group: 'SQL' },
  { id: 'section-40', title: '40. SQL JOINs e Prisma', icon: '🔗', group: 'SQL' },
  { id: 'section-41', title: '41. SQL Projeto Pratico', icon: '🛠️', group: 'SQL' },
  // Git
  { id: 'section-42', title: '42. Git Fundamentos', icon: '🌿', group: 'Git' },
  { id: 'section-43', title: '43. Git Workflow + CI', icon: '🔄', group: 'Git' },
  // Deploy
  { id: 'section-44', title: '44. Deploy e Hospedagem', icon: '🚀', group: 'Deploy' },
  // Docker
  { id: 'section-45', title: '45. Docker', icon: '🐳', group: 'Docker' },
  // Segurança
  { id: 'section-46', title: '46. Seguranca Web', icon: '🔒', group: 'Segurança' },
];

const sectionComponents: Record<string, React.FC> = {
  'section-1': Section1, 'section-2': Section2, 'section-3': Section3,
  'section-4': Section4, 'section-5': Section5, 'section-6': Section6,
  'section-7': Section7, 'section-8': Section8, 'section-9': Section9,
  'section-10': Section10, 'section-11': Section11, 'section-12': Section12,
  'section-13': Section13, 'section-14': Section14, 'section-15': Section15,
  'section-16': Section16, 'section-17': Section17, 'section-18': Section18,
  'section-19': Section19, 'section-20': Section20, 'section-21': Section21,
  'section-22': Section22, 'section-23': Section23, 'section-24': Section24,
  'section-25': Section25, 'section-26': Section26, 'section-27': Section27,
  'section-28': Section28, 'section-29': Section29, 'section-30': Section30,
  'section-31': Section31, 'section-32': Section32, 'section-33': Section33,
  'section-34': Section34, 'section-35': Section35, 'section-36': Section36,
  'section-37': Section37, 'section-38': Section38,
  'section-39': Section39, 'section-40': Section40, 'section-41': Section41,
  'section-42': Section42, 'section-43': Section43, 'section-44': Section44,
  'section-45': Section45, 'section-46': Section46,
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleScroll = useCallback(() => {
    const els = sections.map(s => ({ id: s.id, el: document.getElementById(s.id) })).filter(s => s.el);
    for (let i = els.length - 1; i >= 0; i--) {
      if (els[i].el && els[i].el!.getBoundingClientRect().top <= 120) {
        setActiveSection(els[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  };

  const filteredSections = searchQuery
    ? sections.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : sections;

  const groupedSections: { label: string; items: typeof sections }[] = [];
  let currentGroup: string | null = null;
  for (const s of filteredSections) {
    const group = s.group || '';
    if (group !== currentGroup) {
      currentGroup = group;
      groupedSections.push({ label: group, items: [s] });
    } else {
      groupedSections[groupedSections.length - 1].items.push(s);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Menu">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 hidden sm:block">Guia Completo Web</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar secao..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none w-56 transition-all" />
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">7 tecnologias</span>
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
              aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <Sidebar groupedSections={groupedSections} activeSection={activeSection} onNavigate={scrollToSection} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileNav sections={sections} activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="lg:ml-72 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div id="hero"><Hero onNavigate={scrollToSection} /></div>
          {sections.filter(s => s.id !== 'hero').map(s => {
            const Component = sectionComponents[s.id];
            if (!Component) return null;
            return <div key={s.id} id={s.id} className="pt-4"><Component /></div>;
          })}
          <footer className="mt-16 py-8 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>Guia Completo de Desenvolvimento Web — 7 Tecnologias, 35 Secoes</p>
            <p className="mt-1">Criado com dedicacao para quem esta comecando na web.</p>
          </footer>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;

import { ArrowDown, Zap, Target, GraduationCap } from 'lucide-react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

const techBadges = [
  { name: 'HTML', color: 'bg-orange-100 text-orange-700 border-orange-300', id: 'section-1' },
  { name: 'CSS', color: 'bg-sky-100 text-sky-700 border-sky-300', id: 'section-13' },
  { name: 'JavaScript', color: 'bg-amber-100 text-amber-700 border-amber-300', id: 'section-18' },
  { name: 'React', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', id: 'section-23' },
  { name: 'TypeScript', color: 'bg-blue-100 text-blue-700 border-blue-300', id: 'section-27' },
  { name: 'Next.js', color: 'bg-slate-100 text-slate-700 border-slate-300', id: 'section-30' },
  { name: 'Node.js', color: 'bg-lime-100 text-lime-700 border-lime-300', id: 'section-33' },
];

const stats = [
  { label: 'Seções', value: '36', icon: GraduationCap },
  { label: 'Exemplos', value: '200+', icon: Zap },
  { label: 'Projetos', value: '7', icon: Target },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Domine o Desenvolvimento Web Completo</h1>
        <p className="text-emerald-100 text-lg mb-8">Aprenda 7 tecnologias essenciais para se tornar um desenvolvedor web completo, do HTML ao Node.js</p>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {techBadges.map((t) => (
            <button key={t.name} onClick={() => onNavigate(t.id)} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${t.color} transition-transform hover:scale-105`}>
              {t.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur rounded-lg p-4">
              <s.icon className="w-5 h-5 mx-auto mb-1" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-emerald-200">{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={() => onNavigate('section-1')} className="mt-10 inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors">
          Começar <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

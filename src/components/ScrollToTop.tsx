import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-20 right-6 z-30 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors lg:bottom-6" aria-label="Voltar ao topo">
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

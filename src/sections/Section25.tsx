import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section25() {
  return (
    <div>
      <SectionHeader number={25} title='React: Hooks' subtitle='useEffect, useRef, useMemo, useCallback, useContext, regras dos hooks e custom hooks' />
      <Diagram title='Ciclo de Vida dos Hooks & Padrao Custom Hook'>
{`CICLO DE VIDA COM useEffect:

  Montagem        Atualizacao        Desmontagem
  (mount)         (update)           (unmount)
     |                |                  |
  useEffect       deps mudaram?     cleanup roda
  roda            |         |        antes do
     |           SIM        NAO      proximo effect
  cleanup=[]]     |          |       |
     v        effect roda  pula   cleanup roda
              cleanup=[]]  |       |   |
                                 DOM limpo

REGRA: cleanup SEMPRE roda antes
do proximo effect e na desmontagem

PADRAO CUSTOM HOOK:

  function useXxx() {     Componente A
    useState  ----------> | usa useXxx()
    useEffect ----------> | estado compartilhado
    return [val, fn]        |
  }                        v
                         Componente B
                           | usa useXxx()
                           | mesmo padrao`}
      </Diagram>
      <TopicCard
        title='useEffect: Cleanup e Dependency Array'
        definition='useEffect e como um assistente que trabalha apos a entrega — roda depois da renderizacao. O cleanup e como limpar a mesa antes da proxima refeicao. O dependency array e a lista de compras — so vai ao mercado quando algo muda.'
        whenToUse={['useEffect para side effects: fetch, timers, subscriptions', 'Cleanup para remover listeners, limpar timers', 'Deps vazios [] para rodar so na montagem']}
        whenNotToUse={['useEffect para calcular estado derivado — use variavel', 'useEffect sem deps para tudo — causa loops', 'Esquecer cleanup — vaza memoria e listeners']}
        code={`import { useEffect, useState } from 'react';

function Timer() {
  const [seg, setSeg] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeg(s => s + 1);
    }, 1000);

    // CLEANUP: limpa ao desmontar
    // ou antes do proximo effect
    return () => clearInterval(id);
  }, []); // deps vazios = so Montagem

  return <p>{seg}s</p>;
}

// Deps explicados:
// useEffect(fn)       -- toda renderizacao
// useEffect(fn, [])   -- so montagem
// useEffect(fn, [a])  -- quando a muda

// CUIDADO: objeto/array nos deps
// Cria ref nova toda vez = loop!
// Solucao: useMemo ou.primitive`}
        result={`0s
1s
2s
3s...`}
        errors={['React Hook useEffect missing dependency — aviso de deps incompletos', 'Infinite loop — deps causam re-render infinito', 'Stale closure — effect captura valor antigo sem ref']}
        tips={['Sempre limpe efeitos: return () => limpeza', 'Use ESLint react-hooks/exhaustive-deps', 'Objetos/arrays nos deps criam loop — use useMemo']}
        checklist={['Cleanup retorna funcao no useEffect?', 'Deps estao completos?', 'Evitou objetos/arrays diretos nos deps?']}
      >
        <p className='text-sm text-gray-600'>Analogia: useEffect e como ir ao mercado depois de arrumar a casa — so vai depois (pos-render). Cleanup e como lavar a louca antes de cozinhar de novo. Deps e a lista de compras — so volta quando um item acabou.</p>
      </TopicCard>
      <TopicCard
        title='useRef, useMemo e useCallback'
        definition='useRef e como uma caixa que nao causa re-render — guarda qualquer coisa. useMemo e como uma calculadora com memoria — so recalcula se a entrada mudar. useCallback e como um cartao de visitas fixo — a mesma funcao enquanto deps nao mudam.'
        whenToUse={['useRef para acessar DOM ou guardar valor mutavel sem render', 'useMemo para calculos pesados que dependem de deps', 'useCallback para passar funcoes estaveis a filhos memoizados']}
        whenNotToUse={['useRef para estado que deve causar re-render — use useState', 'useMemo para calculos simples — custo da memoizacao > calculo', 'useCallback sem filho memoizado — desnecessario']}
        code={`import { useRef, useMemo, useCallback } from 'react';

function Exemplo({ items, filtro }) {
  // useRef: referencia DOM
  const inputRef = useRef(null);
  const focus = () => inputRef.current?.focus();

  // useRef: valor mutavel SEM re-render
  const renderCount = useRef(0);
  renderCount.current++; // nao causa re-render!

  // useMemo: memoiza calculo pesado
  const filtrados = useMemo(() => {
    return items.filter(i => i.includes(filtro));
  }, [items, filtro]); // so refaz se items ou filtro mudam

  // useCallback: memoiza funcao
  const handleClick = useCallback(() => {
    console.log('clicou', filtro);
  }, [filtro]); // mesma ref enquanto filtro nao muda

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>OK</button>
      <p>Renderizou: {renderCount.current}x</p>
    </div>
  );
}`}
        result={`Renderizou: 1x
Renderizou: 2x  (soquando items/filtro mudam)`}
        errors={['React Hook useRef cannot be read during render — .current em render inicial', 'useMemo sem deps — calcula toda vez', 'useCallback sem deps — funcao nunca atualiza']}
        tips={['useRef.current e leitura na renderizacao — escreva em effects', 'useMemo tem custo — use so para calculos caros', 'useCallback faz sentido com React.memo nos filhos']}
        checklist={['useRef para valores que nao causam re-render?', 'useMemo so para calculos caros?', 'useCallback com React.memo no filho?']}
      >
        <p className='text-sm text-gray-600'>Analogia: useRef e como uma gaveta secreta — voce guarda coisas la, mas nao avisa ninguem. useMemo e como a memoria da calculadora — guarda o resultado ate a entrada mudar. useCallback e como um passe — mesmo passe enquanto nao mudar o plano.</p>
      </TopicCard>
      <TopicCard
        title='useContext e Regras dos Hooks'
        definition='useContext e como um alto-falante — emite informacao para todos na sala sem passar de ouvido em ouvido. Regras dos hooks: so no topo, so em componentes, so em custom hooks. Custom hooks e como criar sua propria ferramenta reutilizavel.'
        whenToUse={['useContext para dados globais: tema, auth, idioma', 'Custom hooks para extrair logica reutilizavel', 'Regras: hooks no topo, sem condicionais']}
        whenNotToUse={['useContext para dados que mudam muito — causa re-render em todos', 'Hooks dentro de if/for/loop — quebra a ordem', 'Custom hook sem hook interno — e so uma funcao comum']}
        code={`import { createContext, useContext, useState } from 'react';

// 1. Criar contexto
const TemaContext = createContext('claro');

// 2. Provedor no topo
function App() {
  const [tema, setTema] = useState('claro');
  return (
    <TemaContext.Provider value={'{'} tema, setTema {'}'}>
      <Toolbar />
    </TemaContext.Provider>
  );
}

// 3. Consumir em qualquer filho
function Toolbar() {
  const { tema, setTema } = useContext(TemaContext);
  return (
    <button onClick={() => setTema(tema === 'claro' ? 'escuro' : 'claro')}>
      Tema: {tema}
    </button>
  );
}

// REGRAS DOS HOOKS:
// 1. So no topo da funcao — sem if/loop
// 2. So em componentes ou custom hooks
// 3. Ordem fixa entre renders

// Custom hook: useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({'{'} w: 0, h: 0 {'}'});
  useEffect(() => {
    const handler = () =>
      setSize({'{'} w: innerWidth, h: innerHeight {'}'});
    window.addEventListener('resize', handler);
    return () => removeEventListener('resize', handler);
  }, []);
  return size; // { w, h }
}`}
        result={`Tema: claro
Tema: escuro
Window: { w: 1440, h: 900 }`}
        errors={['Render more hooks than during previous render — hook dentro de if', 'Cannot read property of null — contexto sem Provider', 'useContext sem Provider — valor default indefinido']}
        tips={['Crie contexto em arquivo separado para exportar', 'Provider envolve so o necessario — nao o App inteiro', 'Custom hook sempre comeca com &quot;use&quot; — convencao']}
        checklist={['Hooks no topo, sem condicionais?', 'Context envolve os consumidores?', 'Custom hook comeca com &quot;use&quot; e usa hooks internos?']}
      >
        <p className='text-sm text-gray-600'>Analogia: useContext e como radio da empresa — transmite para todos sem precisar repetir. Regras dos hooks sao como fila — todo mundo na ordem, sem furar. Custom hook e como fazer sua propria ferramenta: nao existe? Crie!</p>
      </TopicCard>
    </div>
  );
}

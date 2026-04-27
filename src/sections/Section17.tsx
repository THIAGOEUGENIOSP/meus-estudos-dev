import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section17() {
  return (
    <div>
      <SectionHeader
        number={17}
        title="CSS: Responsivo e Animacoes"
        subtitle="Media queries, mobile-first, breakpoints, transitions, transforms e animations"
      />

      <Diagram title="Mobile-First - Fluxo">
{`Mobile-First (base = mobile, expande)

  320px         768px          1200px
+------+    +----------+    +------------+
| 1col | -> |  2 col   | -> |  3 col     |
| menu |    | sidebar  |    | sidebar    |
| full |    | + main   |    | + main +   |
|      |    |          |    | aside      |
+------+    +----------+    +------------+

  CSS base = mobile
  @media (min-width: 768px)  = tablet
  @media (min-width: 1200px) = desktop

Desktop-First (ERRADO - base pesada):

  @media (max-width: 768px) = mobile
  -> Mobile herda CSS pesado e sobrescreve`}
      </Diagram>

      <Diagram title="Transition vs Animation">
{`TRANSITION (transicao automatica)
  estado A --[hover]--> estado B
  [=====>]  (uma vez, inicio->fim)
  Volta ao sair do hover

ANIMATION (@keyframes)
  estado A -> estado B -> estado C -> A
  [=>][=>][=>][=>]  (repete ou nao)
  Controla cada frame intermediario

  transition: property duration timing delay
  animation: name duration timing delay iteration direction`}
      </Diagram>

      <TopicCard
        title="Media Queries e Mobile-First"
        definition="Media queries aplicam estilos condicionais baseados no tamanho da tela. Mobile-first significa escrever o CSS base para mobile e adicionar estilos para telas maiores. E como construir uma casa: comece pelo essencial (mobile) e adicione quartos (desktop)."
        whenToUse={['Adaptar layout para diferentes telas', 'Ocultar/mostrar elementos por breakpoint', 'Ajustar tamanhos de fonte e espacamento']}
        whenNotToUse={['Media queries para cada pixel (use minmax/clamp)', 'Desktop-first (max-width) - mais dificil de manter']}
        code={`/* Base: mobile (sem media query) */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n/* Tablet */\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr;\n    padding: 2rem;\n  }\n}\n\n/* Desktop */\n@media (min-width: 1200px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n}`}
        result="1 coluna no mobile, 2 no tablet, 3 no desktop - tudo a partir do CSS base"
        errors={["! Usar max-width (desktop-first) gera CSS mais complexo e conflitante", "! Esquecer a viewport: <meta name='viewport' content='width=device-width'> no HTML"]}
        tips={["Breakpoints comuns: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)", "Use em/rem em vez de px para respeitar zoom do usuario"]}
        checklist={["CSS base e mobile (sem @media)", "min-width para expandir (mobile-first)", "Breakpoints consistentes no projeto"]}
      >
        <p className="text-sm text-gray-600">Analogia: Mobile-first e como fazer uma mochila - comece com o essencial e adicione compartimentos conforme precisa.</p>
      </TopicCard>

      <TopicCard
        title="Breakpoints e Estrategias"
        definition="Breakpoints sao os pontos de quebra onde o layout muda. Regra de ouro: crie breakpoints baseados no CONTEUDO, nao em dispositivos. Quando o layout quebra, ali e o breakpoint."
        whenToUse={['Quando o layout visualmente quebra em certo tamanho', 'Seguir convencoes do framework (Tailwind, Bootstrap)']}
        whenNotToUse={['Breakpoints para cada dispositivo existente (infinitos!)', 'Mais de 4-5 breakpoints (complexidade excessiva)']}
        code={`/* Breakpoints comuns (mobile-first) */\n/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px */\n\n/* Container responsivo */\n.container {\n  width: 100%;\n  padding: 1rem;\n}\n@media (min-width: 768px) {\n  .container { max-width: 720px; margin: 0 auto; }\n}\n@media (min-width: 1024px) {\n  .container { max-width: 960px; }\n}\n@media (min-width: 1280px) {\n  .container { max-width: 1200px; }\n}`}
        result="Container que cresce ate o max-width de cada breakpoint, centralizado"
        errors={["! Nao testar entre breakpoints (conteudo pode quebrar em 900px, 1100px...)", "! Fixar font-size em px nos breakpoints (nao escala com zoom)"]}
        tips={["Deixe o conteudo guiar os breakpoints, nao os dispositivos", "Teste redimensionando a janela devagar - o que quebra, vira breakpoint"]}
        checklist={["Breakpoints baseados no conteudo", "Mobile-first com min-width", "Testado em tamanhos intermediarios"]}
      />

      <TopicCard
        title="Transition"
        definition="Transition cria animacoes suaves entre dois estados (ex: normal e hover). E como uma porta automatica: voce empurra e ela abre suavemente, solta e volta devagar. So precisa de ponto A e ponto B."
        whenToUse={['Hover em botoes e links', 'Mostrar/esconder elementos suavemente', 'Qualquer mudanca de estado visual (cor, tamanho, posicao)']}
        whenNotToUse={['Animacoes complexas com multiplos passos (use animation)', '! Transicoes em scroll (performance ruim - use transform)']}
        code={`.button {\n  background: #10b981;\n  color: white;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  transition: background 0.3s ease, transform 0.2s ease;\n}\n\n.button:hover {\n  background: #059669;\n  transform: translateY(-2px);\n}\n\n/* Fade in/out */\n.modal {\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.modal.active {\n  opacity: 1;\n}`}
        result="Botao escurece e sobe 2px ao hover; modal aparece/desaparece suavemente"
        errors={["! Transicionar width/height/padding causa reflow (lento) - use transform/scale", "! Esquecer transition no estado base - so no hover nao funciona"]}
        tips={["transition: all 0.3s e preguicoso - liste propriedades especificas", "ease-out para entradas, ease-in para saidas", "transform e opacity sao as unicas propriedades aceleradas por GPU"]}
        checklist={["Apenas transform e opacity nas transicoes", "Transition no estado base, nao so no hover", "Duracao entre 0.15s e 0.5s"]}
      />

      <TopicCard
        title="Transform"
        definition="Transform move, gira, escala ou inclina elementos sem afetar o layout ao redor. E como mover um objeto numa mesa sem empurrar os outros - o espaco original e preservado."
        whenToUse={['translate para mover (sem reflow!)', 'scale para crescer/diminuir', 'rotate para girar', 'Movimentos performaticos (GPU acelerado)']}
        whenNotToUse={['Para posicao real no layout (transform e visual, nao altera o fluxo)']}
        code={`/* Mover */\n.card:hover {\n  transform: translateY(-4px);\n}\n\n/* Escalar */\n.avatar:hover {\n  transform: scale(1.1);\n}\n\n/* Girar */\n.icon {\n  transform: rotate(45deg);\n}\n\n/* Combinar transforms */\n.button:hover {\n  transform: translateY(-2px) scale(1.02);\n}\n\n/* Transform origin (ponto de rotacao) */\n.pivot {\n  transform-origin: top left;\n  transform: rotate(15deg);\n}`}
        result="Card sobe ao hover, avatar cresce, icone gira 45graus, botao sobe e escala"
        errors={["! Esquecer transform-origin muda o resultado da rotacao", "! Aplicar transition em top/left em vez de transform (reflow!)"]}
        tips={["Sempre use transform em vez de top/left para animacoes", "scale(1) e o tamanho normal - scale(0) faz sumir"]}
        checklist={["transform em vez de top/left para animacoes", "transform-origin definido quando necessario", "Combinacoes de transform sem reflow"]}
      />

      <TopicCard
        title="Animation e @keyframes"
        definition="Animations definem animacoes com multiplos frames usando @keyframes. Diferente de transition, nao precisa de dois estados - pode ser automatica, repetir, e ter quantos passos quiser. E como um roteiro de cinema: cada frame e dirigido."
        whenToUse={['Animacoes que se repetem ou sao automaticas', 'Sequencias com mais de 2 estados', 'Loading spinners, pulse effects, entrances']}
        whenNotToUse={['Para simples hover (transition e mais simples)', 'Animacoes que atrapalham a leitura ou causam enjoo']}
        code={`@keyframes pulse {\n  0%   { opacity: 1; transform: scale(1); }\n  50%  { opacity: 0.7; transform: scale(0.95); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n.notification {\n  animation: pulse 2s ease-in-out infinite;\n}\n\n/* Slide in */\n@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  to   { transform: translateX(0); opacity: 1; }\n}\n\n.card {\n  animation: slideIn 0.5s ease-out forwards;\n}\n\n/* Respeitar preferencia de motion */\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}`}
        result="Notificacao pulsando infinitamente; card entra deslizando pela esquerda"
        errors={["! Esquecer forwards faz a animacao voltar ao estado inicial", "! Animar propriedades caras (width, height, top) causa jank - use transform e opacity"]}
        tips={["prefers-reduced-motion e essencial para acessibilidade", "forwards mantem o estado final; both faz ida e volta", "animation-fill-mode: forwards para manter o estado final"]}
        checklist={["@keyframes definidos antes do uso", "prefers-reduced-motion respeitado", "Apenas transform e opacity animados"]}
      >
        <p className="text-sm text-gray-600">Analogia: @keyframes e como um roteiro de cinema - voce escreve cada cena e o navegador direciona.</p>
      </TopicCard>

      <TopicCard
        title="Hover, Focus e Estados Interativos"
        definition="Estados interativos respondem as acoes do usuario: hover (mouse em cima), focus (elemento selecionado), active (clicando). E como um botao de elevador: ele responde ao toque, ao hover e ao foco."
        whenToUse={['hover para feedback visual em botoes e links', 'focus-visible para navegacao por teclado', 'active para press-feedback']}
        whenNotToUse={['hover como unica forma de acessar funcionalidade (touch nao tem hover)', 'Estilos criticos de hover em touch devices']}
        code={`.btn {\n  background: #3b82f6;\n  color: white;\n  transition: all 0.2s ease;\n}\n\n.btn:hover {\n  background: #2563eb;\n  transform: translateY(-1px);\n}\n\n.btn:focus-visible {\n  outline: 3px solid #3b82f6;\n  outline-offset: 2px;\n}\n\n.btn:active {\n  transform: translateY(0);\n  background: #1d4ed8;\n}\n\n/* Ordem correta: LVHA */\n/* :link -> :visited -> :hover -> :active */`}
        result="Botao com feedback em cada estado: hover sobe, focus mostra outline, active afunda"
        errors={["! Ordem LVHA errada faz estilos se sobreporem incorretamente", "! :focus sem :focus-visible mostra outline ao clicar (incorreto visualmente)"]}
        tips={["Use focus-visible em vez de focus - so aparece com teclado", "hover em mobile nao funciona - garanta que funcionalidade nao dependa de hover"]}
        checklist={["hover com feedback visual suave", "focus-visible para acessibilidade", "Ordem LVHA respeitada", "mobile nao depende de hover"]}
      />
    </div>
  );
}

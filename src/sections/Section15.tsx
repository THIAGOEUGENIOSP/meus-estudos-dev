import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section15() {
  return (
    <div>
      <SectionHeader
        number={15}
        title="CSS: Flexbox"
        subtitle="Layout flexivel unidimensional com alinhamento preciso"
      />

      <Diagram title="Flexbox - Eixos">
{`flex-direction: row (padrao)

  main axis (horizontal)  ---->
  +-------+-------+-------+
  | item1 | item2 | item3 |
  +-------+-------+-------+
    cross axis (vertical) ||
                          ||

flex-direction: column

  main axis (vertical) ||
  +-------+             ||
  | item1 |             \\/
  +-------+
  | item2 |
  +-------+
  | item3 |
  +-------+

justify-content = main axis
align-items     = cross axis`}
      </Diagram>

      <Diagram title="justify-content - Valores">
{`justify-content (eixo principal - row: horizontal)

flex-start:  [1][2][3]
flex-end:           [1][2][3]
center:       [1][2][3]
space-between:[1]   [2]   [3]
space-around: [1]  [2]  [3]
space-evenly:  [1] [2] [3]

align-items (eixo cruzado - row: vertical)

stretch:     |xxxxxxx|  (enche a altura)
flex-start: 顶部对齐
center:      居中对齐
flex-end:    底部对齐`}
      </Diagram>

      <TopicCard
        title="display: flex"
        definition="Flexbox transforma o container em um layout flexivel. Pense como uma esteira: os itens se organizam em uma direcao e voce controla como se distribuem e se alinham. E a ferramenta ideal para layouts em uma direcao."
        whenToUse={['Alinhar itens em linha ou coluna', 'Distribuir espaco entre elementos', 'Centralizar conteudo verticalmente', 'Criar navbars, card rows, formularios']}
        whenNotToUse={['Layouts bidimensionais (use Grid)', 'Precisar de alinhamento em duas direcoes simultaneamente']}
        code={`.container {\n  display: flex;\n  flex-direction: row;  /* ou column */\n  justify-content: center; /* eixo principal */\n  align-items: center;    /* eixo cruzado */\n  gap: 1rem;             /* espaco entre itens */\n}\n\n/* Centralizar perfeitamente */\n.centered {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}`}
        result="Itens centralizados horizontal e verticalmente no container"
        errors={["! Esquecer display: flex no container - os itens nao se flexionam sozinhos", "! Confundir justify-content (main) com align-items (cross)"]}
        tips={["gap substitui margin entre itens flex - mais limpo e sem colapso", "flex-direction muda qual eixo e principal e qual e cruzado"]}
        checklist={["Container com display: flex", "Direcao definida (row ou column)", "Alinhamento nos dois eixos"]}
      >
        <p className="text-sm text-gray-600">Analogia: Flexbox e como organizar livros em uma prateleira - voce escolhe a ordem, o espaco entre eles e se ficam encostados na borda.</p>
      </TopicCard>

      <TopicCard
        title="justify-content, align-items, flex-wrap, gap"
        definition="justify-content distribui itens no eixo principal. align-items alinha no eixo cruzado. flex-wrap permite que os itens quebrem para a proxima linha. gap e o espacamento limpo entre itens, sem margin hack."
        whenToUse={['center para centralizar', 'space-between para distribuir com espaco nas bordas', 'flex-wrap: wrap para responsividade', 'gap para espacamento uniforme']}
        whenNotToUse={['space-around quando precisa de espaco igual nas bordas (use space-evenly)', 'flex-wrap: nowrap com muitos itens (overflow)']}
        code={`.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  justify-content: flex-start;\n}`}
        result="Navbar com logo a esquerda e links a direita; tags quebram linha se necessario"
        errors={["! gap NAO funciona sem display: flex/grid", "! flex-wrap: wrap sem gap = itens colados na quebra"]}
        tips={["gap aceita 2 valores: gap: 1rem 2rem (linha coluna)", "Use align-content (multilinha) ao inves de align-items quando tem flex-wrap"]}
        checklist={["justify-content + align-items definidos", "flex-wrap: wrap para responsividade", "gap usado em vez de margin"]}
      />

      <TopicCard
        title="flex-grow, flex-shrink, flex-basis"
        definition="flex-grow define se o item cresce alem do necessario. flex-shrink se ele encolhe. flex-basis e o tamanho inicial antes de crescer/encolher. E como dividir uma pizza: quem tem grow maior ganha mais fatias."
        whenToUse={['flex-grow: 1 para itens que devem expandir igualmente', 'flex: 0 0 auto para itens com tamanho fixo', 'flex-basis para definir tamanho padrao']}
        whenNotToUse={['flex-grow sem limites quando precisa de tamanho maximo', 'flex-shrink: 0 em layouts que precisam ser responsivos']}
        code={`/* Itens expandem igualmente */\n.item {\n  flex: 1; /* grows:1, shrink:1, basis:0 */\n}\n\n/* Sidebar fixa + conteudo expande */\n.sidebar { flex: 0 0 250px; }\n.content { flex: 1; }\n\n/* Shorthand detallado */\n.item {\n  flex-grow: 2;    /* cresce 2x mais */\n  flex-shrink: 1;  /* encolhe normalmente */\n  flex-basis: auto; /* tamanho natural */\n}`}
        result="Sidebar fixa em 250px, conteudo ocupa o restante"
        errors={["! flex: 1 NAO e o mesmo que flex: 1 1 0% em todos os navegadores", "! Esquecer flex-shrink: 0 faz itens sumirem em telas pequenas"]}
        tips={["flex: 1 e o atalho mais usado (cresce igual aos outros)", "Use flex: 0 0 auto para itens de tamanho fixo como icones"]}
        checklist={["flex-grow/shrink/basis definidos", "flex shorthand usado quando possivel", "Itens com tamanho fixo tem flex-shrink: 0"]}
      />

      <TopicCard
        title="order e align-self"
        definition="order muda a ordem visual sem alterar o HTML. align-self sobrescreve align-items para UM item especifico. E como pular na fila (order) ou se destacar da turma (align-self)."
        whenToUse={['order para reordenar visualmente em breakpoints', 'align-self para um item que precisa de alinhamento diferente']}
        whenNotToUse={['order para trocar ordem semantica (screen readers leem o HTML, nao o CSS)', 'align-self em todos os itens (use align-items no container)']}
        code={`.container {\n  display: flex;\n  align-items: center;\n}\n\n.icon {\n  align-self: flex-start; /* sobrescreve center */\n}\n\n/* Mobile: logo embaixo */\n@media (max-width: 768px) {\n  .logo { order: 3; }\n  .nav { order: 1; }\n  .menu { order: 2; }\n}`}
        result="Icone alinhado ao topo; no mobile, logo vai para baixo sem mudar HTML"
        errors={["! order NAO muda a ordem do DOM - tab e leitores de tela seguem o HTML", "! align-self sem display: flex no pai nao faz nada"]}
        tips={["Mudar order no CSS e util para responsividade, mas a ordem semantica deve estar correta no HTML", "Valores de order: padrao e 0. Itens com order menor aparecem primeiro"]}
        checklist={["Order usada so para reordenacao visual responsiva", "align-self usado pontualmente, nao em massa", "Ordem semantica do HTML correta"]}
      />
    </div>
  );
}

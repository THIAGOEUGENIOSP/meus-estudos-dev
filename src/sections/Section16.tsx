import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section16() {
  return (
    <div>
      <SectionHeader
        number={16}
        title="CSS: Grid"
        subtitle="Layout bidimensional com linhas e colunas nomeadas"
      />

      <Diagram title="Grid - Linhas Numeradas">
{`grid-template-columns: 1fr 2fr 1fr

  1fr        2fr        1fr
|------|------------|------|
|      |            |      | linha 1
|  A   |     B      |  C   |
|      |            |      | linha 2
|------|------------|------|

  col1   col2         col3
  -1     -2            -3  (contagem reversa)

  grid-column: 1 / 3  = do inicio ate coluna 3
  grid-row: 1 / -1    = do topo ate o fim`}
      </Diagram>

      <Diagram title="auto-fill vs auto-fit">
{`minmax(200px, 1fr) com auto-fill (300px container):

|200px|200px| vazio | vazio |  = 4 tracks, 2 visiveis

minmax(200px, 1fr) com auto-fit (300px container):

|---------|---------|        = 2 tracks, expandem
  (colapsam vazios e expandem)

auto-fill: cria tracks vazios (preserva colunas)
auto-fit:  colapsa vazios (expande os cheios)`}
      </Diagram>

      <TopicCard
        title="display: grid e grid-template-columns/rows"
        definition="Grid cria um layout bidimensional com linhas e colunas. Pense como uma planilha: voce define colunas e linhas, e coloca cada celula onde quer. Diferente do Flexbox, Grid controla AMBOS os eixos simultaneamente."
        whenToUse={['Layouts de pagina completos (header/sidebar/main/footer)', 'Galerias de imagens com tamanhos uniformes', 'Qualquer layout que precise de linhas E colunas']}
        whenNotToUse={['Alinhar itens em uma unica direcao (use Flexbox)', 'Espacamento simples entre poucos itens']}
        code={`.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 1rem;\n  min-height: 100vh;\n}\n\n/* 3 colunas iguais */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n}`}
        result="Layout de 3 colunas (1:2:1), 3 filas, com espacamento de 1rem"
        errors={["! Esquecer display: grid - os filhos nao se gridificam sozinhos", "! Usar fr em grid-template-rows sem altura definida (fr precisa de referencia)"]}
        tips={["fr e a unidade fracional do Grid - 1fr 2fr = 1:2 de espaco", "Use repeat() para colunas repetidas: repeat(4, 1fr)"]}
        checklist={["display: grid no container", "Colunas e/ou linhas definidas", "gap para espacamento"]}
      >
        <p className="text-sm text-gray-600">Analogia: Grid e como uma estante com prateleiras e divisoes - voce decide quantas colunas e quantas fileiras, e coloca cada item no lugar certo.</p>
      </TopicCard>

      <TopicCard
        title="fr unit, gap, minmax, auto-fill/auto-fit"
        definition="fr e a unidade fracional do Grid (como fatias de pizza). gap e o espaco entre celulas. minmax define um intervalo de tamanho. auto-fill cria quantas colunas couberem; auto-fit faz o mesmo mas colapsa as vazias."
        whenToUse={['fr para colunas proporcionais', 'minmax para responsividade sem media queries', 'auto-fit para grids que se adaptam sozinhos']}
        whenNotToUse={['fr com valores absolutos sem necessidade', 'auto-fill quando quer que colunas se expandam (use auto-fit)']}
        code={`/* Responsivo sem media query! */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n\n/* Sidebar fixa + conteudo flexivel */\n.layout {\n  display: grid;\n  grid-template-columns: 250px minmax(0, 1fr);\n  gap: 2rem;\n}`}
        result="Grid responsivo: min 250px por coluna, expande para preencher. Sidebar fixa."
        errors={["! minmax(250px, 1fr) sem auto-fit/fill = coluna fixa de 250px", "! minmax(0, 1fr) != 1fr - o 0 impede que conteudo estoure a coluna"]}
        tips={["repeat(auto-fit, minmax(250px, 1fr)) e o template responsivo mais poderoso", "Use minmax(0, 1fr) em vez de 1fr para evitar overflow de conteudo"]}
        checklist={["fr para proporcoes, px para limites", "minmax usado para responsividade", "auto-fit preferido sobre auto-fill"]}
      />

      <TopicCard
        title="grid-area, grid-column, grid-row"
        definition="grid-column e grid-row posicionam um item em colunas/linhas especificas. grid-area e o atalho que combina ambos. E como dar coordenadas: &quot;este item vai da coluna 1 a 3, da linha 1 a 2&quot;."
        whenToUse={['Posicionar itens em areas especificas do grid', 'Criar layouts de pagina com areas nomeadas', 'Fazer itens ocuparem multiplas celulas']}
        whenNotToUse={['Posicionar cada item manualmente em grids grandes (use areas nomeadas)', 'grid-area sem definir grid-template-areas']}
        code={`.layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    'header header'\n    'sidebar main'\n    'footer footer';\n  gap: 1rem;\n  min-height: 100vh;\n}\n\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main   { grid-area: main; }\n.footer { grid-area: footer; }`}
        result="Layout completo: header e footer atravessam tudo, sidebar a esquerda, main a direita"
        errors={["! grid-column: 1 / 3 vai ATE a linha 3 (nao e a coluna 3!)", "! grid-template-areas exige areas retangulares - sem formato L"]}
        tips={["grid-column: 1 / -1 espalha o item por todas as colunas", "Areas nomeadas tornam o CSS legivel como um mapa"]}
        checklist={["Areas nomeadas para layouts complexos", "grid-column/row para posicionamento preciso", "1 / -1 para espalhar por todo o grid"]}
      >
        <p className="text-sm text-gray-600">Analogia: grid-template-areas e como desenhar o mapa da casa no papel milimetrado - cada quarto tem seu lugar.</p>
      </TopicCard>

      <TopicCard
        title="place-items e atalhos de alinhamento"
        definition="place-items alinha todos os itens no centro de suas celulas de uma vez. E o atalho para align-items + justify-items. Existe tambem place-content (align-content + justify-content) e place-self (align-self + justify-self)."
        whenToUse={['place-items: center para centralizar tudo no grid', 'place-self para alinhar apenas um item']}
        whenNotToUse={['place-items quando itens precisam de alinhamentos diferentes (use align-items/justify-items separados)']}
        code={`.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  place-items: center; /* align + justify */\n  gap: 1rem;\n}\n\n/* Um item diferente */\n.featured {\n  place-self: start end; /* topo + direita */\n}`}
        result="Todos os itens centralizados nas celulas; featured no canto superior direito"
        errors={["! place-items so funciona em Grid (Flexbox nao tem justify-items)", "! Confundir place-items com place-content - items alinha itens, content alinha o conteudo"]}
        tips={["place-items: center e o atalho mais util do Grid", "place-self: center e perfeito para centralizar um unico item"]}
        checklist={["place-items usado para alinhamento uniforme", "place-self para itens especificos", "Nao confundir items vs content"]}
      />
    </div>
  );
}

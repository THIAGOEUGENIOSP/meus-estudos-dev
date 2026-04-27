import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section13() {
  return (
    <div>
      <SectionHeader
        number={13}
        title="CSS: Fundamentos"
        subtitle="Seletores, propriedades, valores, cascata, especificidade, heranca e unidades"
      />

      <Diagram title="Especificidade - Prioridade">
{`+------------------------------------------+
|  PRIORIDADE (menor -> maior)             |
+------------------------------------------+
|  1. Elemento    (h1, p, div)     0,0,0,1 |
|  2. Classe      (.card)         0,0,1,0 |
|  3. ID          (#header)       0,1,0,0 |
|  4. Inline      (style='')      1,0,0,0 |
|  5. !important                  GANHA!  |
+------------------------------------------+
  Exemplo: #header .nav li > .active
           0,1,2,2 = 1 ID + 2 classes + 2 elem`}
      </Diagram>

      <Diagram title="Unidades - Comparacao">
{`+----------+----------+---------------------------+
| Unidade  | Tipo     | Quando usar               |
+----------+----------+---------------------------+
| px       | Fixa     | Bordas, icones            |
| rem      | Relativa | Fontes, espacamentos      |
| em       | Relativa | Padding/margin relativos  |
| vw       | Viewport | Largura responsiva        |
| vh       | Viewport | Altura de tela cheia      |
| %        | Relativa | Layouts fluidos           |
+----------+----------+---------------------------+
  1rem = 16px (padrao do navegador)
  1em  = tamanho do pai (herdado)`}
      </Diagram>

      <TopicCard
        title="Seletores CSS"
        definition="Seletores sao os 'enderecos' que dizem ao navegador qual elemento estilizar. Pense como um CEP: voce precisa do endereco certo para entregar a carta."
        whenToUse={['Selecionar elementos especificos para estilizar', 'Aplicar estilos a grupos de elementos com classe', 'Mirar em um unico elemento com ID']}
        whenNotToUse={['Nao use IDs para estilos reutilizaveis', 'Evite seletores muito longos (mais de 3 niveis)']}
        code={`/* Seletor de elemento */\nh1 { color: navy; }\n\n/* Seletor de classe */\n.card { padding: 1rem; }\n\n/* Seletor de ID */\n#header { background: teal; }\n\n/* Seletor de atributo */\ninput[type='email'] { border: 2px solid blue; }`}
        result="h1 fica azul-marinho, .card ganha padding, #header fica com fundo teal"
        errors={["! Seletores de ID tem especificidade alta - prefira classes", "! Evite #id para estilos - reserve para JS"]}
        tips={["Classes sao como etiquetas: voce pode colar varias no mesmo elemento", "Use BEM para nomear classes: .card__title, .card--active"]}
        checklist={["Seletores sao claros e legiveis", "Nenhuma regra !important", "Classes em vez de IDs para estilizacao"]}
      >
        <p className="text-sm text-gray-600">Analogia: seletores sao como filtros de busca - quanto mais especifico, menos resultados encontra.</p>
      </TopicCard>

      <TopicCard
        title="Propriedades e Valores"
        definition="Propriedades sao as 'caracteristicas' que voce quer alterar (cor, tamanho, margem). Valores sao o que voce define para cada propriedade. E como escolher a cor e o tamanho da roupa."
        whenToUse={['Definir cor, tamanho, espacamento', 'Controlar layout e posicao', 'Adicionar efeitos visuais']}
        whenNotToUse={['Nao invente propriedades que nao existem', 'Nao use valores incompativeis com a propriedade']}
        code={`/* Propriedade: valor; */\n.box {\n  color: #333;            /* cor do texto */\n  background-color: white; /* cor de fundo */\n  font-size: 1.25rem;    /* tamanho da fonte */\n  margin: 0 auto;        /* centralizar */\n  border-radius: 8px;    /* cantos arredondados */\n}`}
        result="Caixa com texto cinza, fundo branco, fonte 20px, centralizada e cantos arredondados"
        errors={["! color !== background-color (um e texto, outro e fundo)", "! margin: auto so funciona com largura definida"]}
        tips={["Shorthands como margin: 1rem 2rem (vertical horizontal) economizam linhas", "Use variaveis CSS: --cor-principal: #10b981"]}
        checklist={["Cada propriedade termina com ponto-e-virgula", "Valores sao validos para a propriedade", "Shorthands usados onde possivel"]}
      >
        <p className="text-sm text-gray-600">Analogia: propriedade e a pergunta, valor e a resposta. &quot;Cor?&quot; - &quot;Azul.&quot;</p>
      </TopicCard>

      <TopicCard
        title="Cascata e Heranca"
        definition="Cascata e o sistema de resolucao de conflitos: a ultima regra ganha, a mais especifica ganha, !important sempre ganha. Heranca e quando elementos filhos copiam estilos do pai, como filho que herda o sobrenome da familia."
        whenToUse={['Organizar estilos em ordem logica', 'Aproveitar heranca para nao repetir codigo', 'Resolver conflitos com especificidade']}
        whenNotToUse={['Nao use !important para resolver tudo', 'Nao dependa de ordem para estilos criticos']}
        code={`/* Cascata: a ultima regra ganha */\np { color: blue; }\np { color: green; } /* ganha! */\n\n/* Heranca: font-size passa pro filho */\n.container {\n  font-size: 1.125rem; /* filhos herdam */\n  color: #333;          /* filhos herdam */\n}\n\n/* Quebrando heranca */\n.container p { color: red; }`}
        result="O p final fica verde; filhos de .container herdam font-size e color"
        errors={["! !important vira vicio - evite ao maximo", "! Nem toda propriedade herda (margin, border, padding NAO herdam)"]}
        tips={["Propriedades que herdam: color, font-*, line-height, text-align", "Use inherit para forcar heranca: border: inherit"]}
        checklist={["Estilos organizados do geral pro especifico", "Nenhum !important desnecessario", "Heranca aproveitada para evitar repeticao"]}
      />

      <TopicCard
        title="Unidades: px, rem, em, vw, vh, %"
        definition="Unidades definem os tamanhos. px e fixo (como uma regua rigida). rem e relativo a raiz (como uma medida padrao). em e relativo ao pai (como crescer proporcionalmente). vw/vh sao relativos a tela (como uma janela que se adapta)."
        whenToUse={['rem para fontes e espacamentos (escalavel)', 'px para bordas e detalhes fixos', 'vw/vh para hero sections e telas cheias', '% para layouts fluidos']}
        whenNotToUse={['px para fontes principais (nao escala com zoom)', 'vw para texto em telas muito grandes ou muito pequenas']}
        code={`html { font-size: 1rem; } /* 16px padrao */\n\nh1 {\n  font-size: 2rem;    /* 32px = 2x16 */\n  margin-bottom: 1rem;\n}\n\n.hero {\n  width: 100vw;        /* 100% da largura da tela */\n  height: 80vh;       /* 80% da altura da tela */\n}\n\n.button {\n  padding: 0.5em 1em; /* relativo ao font-size do botao */\n  border: 2px solid teal; /* fixo: borda nao escala */\n}`}
        result="h1 com 32px, hero ocupando tela toda, botao com padding proporcional"
        errors={["! 1em no body = 1rem, mas 1em num h1 e diferente!", "! 100vw pode causar scroll horizontal (conta a scrollbar)"]}
        tips={["Configure html{font-size: 62.5%} para que 1rem = 10px (facil matematica)", "use clamp() para limitar tamanho: font-size: clamp(1rem, 2vw, 1.5rem)"]}
        checklist={["Fontes usam rem", "Bordas e detalhes usam px", "Layouts fluidos usam % ou vw"]}
      />
    </div>
  );
}

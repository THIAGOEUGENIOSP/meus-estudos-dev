import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section2() {
  return (
    <div>
      <SectionHeader number={2} title="HTML: Texto e Conteudo" subtitle="Tags que dao forma ao texto — de titulos a citacoes, e a diferenca crucial entre semantica e visual" />

      <TopicCard
        title="Titulos h1 a h6"
        definition="Tags de cabecalho hierarquicas. h1 e o titulo principal, h6 o menos importante. Sao como os capitulos e subcapitulos de um livro."
        whenToUse={['h1 para titulo principal da pagina (apenas 1!)', 'h2 para secoes principais', 'h3-h6 para subsecoes progressivas']}
        whenNotToUse={['Nao pule niveis (h1 para h3)', 'Nao use para estilizar — use CSS para tamanho', 'Nao use mais de um h1 por pagina']}
        code={'<h1>Titulo Principal</h1>\n<h2>Capitulo 1</h2>\n<h3>Secao 1.1</h3>\n<h4>Detalhe 1.1.1</h4>'}
        result="Hierarquia visual e semantica clara de titulos"
        errors={['Usar h1 para estilizar texto grande — prejudica SEO', 'Pular de h2 para h4 — quebra hierarquia para leitores de tela']}
        tips={['Imagine os titulos como o indice de um livro: cada nivel e um subcapitulo.']}
        checklist={['Apenas 1 h1 por pagina', 'Hierarquia sem pulos', 'Ordem logica: h1 > h2 > h3']}
      >
        Os titulos sao como um indice de livro: h1 e o titulo da capa, h2 sao os capitulos, h3 as secoes. Nunca pule niveis — o leitor de tela segue essa hierarquia como um mapa.
      </TopicCard>

      <TopicCard
        title="Paragrafos, quebras e linhas"
        definition="p para paragrafos, br para quebra de linha, hr para separacao tematica."
        whenToUse={['p para blocos de texto', 'br para quebra dentro de um paragrafo (ex: endereco)', 'hr para mudanca de tema']}
        whenNotToUse={['Nao use br para criar espacamento — use CSS margin', 'Nao use br entre paragrafos — use p separado', 'Nao use hr como decoracao — use CSS border']}
        code={'<p>Primeiro paragrafo de texto.</p>\n<p>Rua Exemplo, 123<br>Sao Paulo - SP<br>CEP 01001-000</p>\n<hr>\n<p>Novo tema apos a separacao.</p>'}
        result="Paragrafos com quebras organizadas e separacao tematica"
        errors={['Usar multiplos br para espacar — gera codigo sujo', 'Esquecer de fechar </p>']}
        tips={['br e como Enter no teclado; p e como um paragrafo novo.']}
        checklist={['p para blocos de texto', 'br apenas para quebra dentro de linha', 'hr para separacao de conteudo']}
      />

      <TopicCard
        title="Negrito e italico: semantico vs visual"
        definition="strong/em tem significado semantico; b/i sao apenas visuais. E como a diferenca entre gritar (strong) e falar alto (b)."
        whenToUse={['strong para importancia semantica', 'em para enfase (leitor muda tom)', 'b para destaque visual sem importancia', 'i para texto em italico sem enfase']}
        whenNotToUse={['Nao use strong so para deixar negrito — use CSS', 'Nao use b quando o conteudo e importante — use strong']}
        code={'<p><strong>Atencao:</strong> nao delete este arquivo.</p>\n<p>Eu <em>realmente</em> preciso disso.</p>\n<p>Produto <b>novinho</b> na prateleira.</p>\n<p>Nome cientifico: <i>Homo sapiens</i></p>'}
        result="Strong e lido com enfase pelo leitor de tela; b e apenas visual"
        errors={['Usar b no lugar de strong — perde semantica e acessibilidade']}
        tips={['Leitores de tela mudam o tom para strong e em. b e i nao causam mudanca.']}
        checklist={['strong para importancia real', 'em para enfase real', 'b/i so para visual']}
      />

      <Diagram title="Semantica vs Visual — Qual usar?">
{`+-------------------+-------------------+
|  SEMANTICO        |  VISUAL           |
|  (significado)    |  (aparencia)      |
+-------------------+-------------------+
|  <strong>        |  <b>             |
|  = importante!    |  = so negrito     |
|                   |                   |
|  <em>            |  <i>             |
|  = enfase!       |  = so italico     |
|                   |                   |
|  <mark>          |  <span+CSS>      |
|  = destacado!    |  = so cor         |
+-------------------+-------------------+
  Leitor de tela     Leitor de tela
  ENTENDE            NAO percebe`}
      </Diagram>

      <TopicCard
        title="Marcacao especial: mark, small, sup, sub, code, pre"
        definition="Tags para texto com significado especial: realce, pequeno, sobrescrito, subscrito, codigo e pre-formatado."
        whenToUse={['mark para texto destacado (resultados de busca)', 'small para texto secundario (footer)', 'sup para exponentes (x2)', 'sub para formulas (H2O)', 'code para codigo inline', 'pre para blocos de codigo com formatacao']}
        whenNotToUse={['Nao use mark como destaque decorativo — use CSS', 'Nao use pre para texto normal — respeita espacos e quebras']}
        code={'<p>Resultado: <mark>50 pontos</mark> de 100</p>\n<p><small>Termos de uso aplicaveis</small></p>\n<p>x<sup>2</sup> + y<sup>2</sup></p>\n<p>H<sub>2</sub>O</p>\n<p>Use <code>console.log()</code> para debug.</p>\n<pre>linha 1\n  linha 2 indentada</pre>'}
        result="Texto com significado semantico especial preservado"
        errors={['Usar pre sem escapar < e > — o navegador interpreta como tags']}
        tips={['code e inline (como uma palavra); pre e bloco (como um paragrafo de codigo).']}
        checklist={['mark para destaque de conteudo', 'small para secundario', 'sup/sub para notacao', 'code inline, pre bloco']}
      />

      <TopicCard
        title="Citacoes: blockquote, q e cite"
        definition="blockquote para citacoes longas, q para citacoes curtas inline, cite para referencia da fonte."
        whenToUse={['blockquote para citacoes de paragrafos', 'q para citacoes curtas dentro de texto', 'cite para titulo de obra ou autor']}
        whenNotToUse={['Nao use blockquote para indentar texto — use CSS', 'Nao use q como aspas decorativas — use aspas reais ou CSS']}
        code={'<blockquote cite="https://exemplo.com">\n  <p>A simplesza e a sofisticacao definitiva.</p>\n  <footer>— <cite>Leonardo da Vinci</cite></footer>\n</blockquote>\n<p>Ele disse: <q>Nao e suficiente.</q></p>'}
        result="Citacoes com atribuicao semantica correta"
        errors={['Usar blockquote so para indentar — abuso semantico']}
        tips={['blockquote pode conter p dentro; cite referencia a obra, nao a pessoa.']}
        checklist={['blockquote para citacoes longas', 'q para curtas inline', 'cite para referencia']}
      />
    </div>
  );
}

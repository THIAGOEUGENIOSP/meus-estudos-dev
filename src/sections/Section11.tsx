import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section11() {
  return (
    <div>
      <SectionHeader number={11} title="HTML: SEO e Acessibilidade" subtitle="HTML que funciona para todos — robos de busca e pessoas com deficiencia" />

      <Diagram title="SEO + Acessibilidade: Intersecao">
{`+------------------+------------------+
|  SEO             |  ACESSIBILIDADE  |
|  (Google le)     |  (Pessoas leem)  |
+------------------+------------------+
|  title unico     |  title unico     |
|  h1 claro        |  h1 claro        |
|  meta desc       |  aria-label       |
|  alt em img      |  alt em img       |
|  lang correto    |  lang correto    |
|  headings hierarq|  headings hierarq |
|  links descritivos| links descritivos|
+------------------+------------------+
|  INTERSECAO: 80% coincide!          |
|  Bom SEO = Boa a11y (quase sempre)  |
+--------------------------------------+
  Diferenca: meta description (so SEO)
  Diferenca: aria-label (so a11y)`}
      </Diagram>

      <TopicCard
        title="Hierarquia de headings"
        definition="Um h1 por pagina, seguido de h2, h3... sem pular. E como o indice de um livro — busca e leitores de tela dependem dele."
        whenToUse={['h1: titulo principal (1 por pagina!)', 'h2: secoes principais', 'h3: subsecoes', 'h4-h6: detalhes']}
        whenNotToUse={['Nao pule niveis (h1 > h3)', 'Nao use h1 para estilizar', 'Nao use multiplos h1']}
        code={'<h1>Agencia Criativa</h1>\n\n<h2>Servicos</h2>\n  <h3>Web Design</h3>\n  <h3>SEO</h3>\n\n<h2>Sobre nos</h2>\n  <h3>Nossa historia</h3>\n  <h3>Equipe</h3>'}
        result="Hierarquia logica e naveavel por leitores de tela"
        errors={['Pular de h1 para h3 — leitor de tela perde a estrutura', 'Usar h1 para estilizar — SEO penaliza', 'Multiplos h1 — Google nao sabe qual e o principal']}
        tips={['Ferramenta: Heading Map (extensao) mostra a hierarquia como um indice de livro.']}
        checklist={['1 h1 por pagina', 'Sem pulos de nivel', 'Hierarquia logica', 'Todos os headings tem conteudo']}
      />

      <TopicCard
        title="lang, alt e label — Acessibilidade essencial"
        definition="lang define o idioma, alt descreve imagens, label associa rotulos a campos. Sem esses, o conteudo e opaco para quem precisa."
        whenToUse={['lang no html para idioma principal', 'lang em trechos em outro idioma', 'alt em TODAS as imagens', 'label em TODOS os inputs']}
        whenNotToUse={['Nao omita alt — nunca', 'Nao use alt="imagem" — e inutil', 'Nao use label vazio — precisa descrever o campo']}
        code={'<html lang="pt-BR">\n  <p>O termo <span lang="en">responsive</span> e comum.</p>\n  <img src="equipe.jpg" alt="Equipe da agencia em reuniao">\n  <label for="nome">Nome completo:</label>\n  <input type="text" id="nome">'}
        result="Idioma correto, imagem descrita, campo rotulado"
        errors={['Sem lang — leitor de tela le portugues com sotaque ingles', 'Sem alt — leitor le o nome do arquivo', 'Sem label — leitor anuncia &quot;campo de texto&quot; sem contexto']}
        tips={['alt e como descrever uma foto pelo telefone — seja especifico e conciso.']}
        checklist={['lang no html', 'alt em todas as imagens', 'label em todos os inputs', 'for/id vinculados']}
      />

      <TopicCard
        title="Landmarks — Regioes da pagina"
        definition="Landmarks sao as regioes semânticas: header, main, footer, nav, aside. Leitores de tela pulam entre elas como capitulos."
        whenToUse={['header para cabecalho', 'main para conteudo principal', 'nav para navegacao', 'footer para rodape', 'aside para complementar']}
        whenNotToUse={['Nao use div quando landmark existe', 'Nao use role="main" se <main> ja existe — redundante', 'Nao crie landmarks sem conteudo relacionado']}
        code={'<header>cabecalho</header>\n<nav aria-label="Principal">menu</nav>\n<main>conteudo</main>\n<aside>relacionado</aside>\n<footer>rodape</footer>'}
        result="5 landmarks acessiveis via atalhos de leitor de tela"
        errors={['Usar div#main em vez de <main> — leitor nao reconhece como landmark', 'Multiplos nav sem aria-label — nao distinguiveis']}
        tips={['Landmarks sao como capitulos de um audiolivro — permitem pular direto ao que importa.']}
        checklist={['Landmarks nativas em vez de div', 'aria-label em navs multiplas', 'main e unico']}
      />

      <TopicCard
        title="Meta description e conteudo significativo"
        definition="meta description resume a pagina para buscadores; conteudo significativo e texto real em vez de so imagens."
        whenToUse={['meta description: 150-160 caracteres, resumo unico', 'Textos reais em vez de imagens com texto', 'Links descritivos em vez de &quot;clique aqui&quot;']}
        whenNotToUse={['Nao repita a mesma description em todas as paginas', 'Nao use imagem para texto — use HTML real', 'Nao use &quot;clique aqui&quot; ou &quot;leia mais&quot; sem contexto']}
        code={'<meta name="description" content="Agencia criativa especializada em web design, SEO e marketing digital. Solicite um orcamento.">\n\n<!-- RUIM -->\n<a href="sobre.html">Clique aqui</a>\n\n<!-- BOM -->\n<a href="sobre.html">Conheca nossa historia</a>'}
        result="Description aparece no Google; link descritivo ajuda SEO e a11y"
        errors={['Description generica — Google ignora e pega texto da pagina', 'Link &quot;clique aqui&quot; — fora de contexto em leitor de tela que lista links']}
        tips={['Leitores de tela podem listar todos os links da pagina. &quot;Clique aqui&quot; 10 vezes = 10 links sem sentido.']}
        checklist={['meta description unica por pagina', '150-160 caracteres', 'Texto real, nao imagens', 'Links descritivos']}
      />
    </div>
  );
}

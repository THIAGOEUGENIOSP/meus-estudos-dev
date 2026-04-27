import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section8() {
  return (
    <div>
      <SectionHeader number={8} title="HTML: Semantica e Layout" subtitle="Tags que dao significado a estrutura — e por que div e span sao o ultimo recurso" />

      <Diagram title="Estrutura semantica de uma pagina">
{`+----------------------------------------------+
|  <header>                                    |
|    logo + nav                                |
+----------------------------------------------+
|  <main>                                      |
|  +----------------------------------------+  |
|  |  <article>                             |  |
|  |    <h2>Titulo do artigo</h2>           |  |
|  |    <p>Conteudo...</p>                  |  |
|  |    <section>Comentarios</section>      |  |
|  +----------------------------------------+  |
|  +----------+  +----------------------------+ |
|  | <aside>  |  | <section>                  | |
|  | sidebar  |  | conteudo relacionado       | |
|  +----------+  +----------------------------+ |
+----------------------------------------------+
|  <footer>                                    |
|    copyright + links                         |
+----------------------------------------------+`}
      </Diagram>

      <TopicCard
        title="header, main, footer"
        definition="header para cabecalho, main para conteudo principal (unico!), footer para rodape. Sao como comeco, miolo e fim de uma carta."
        whenToUse={['header: logo, nav, titulo da pagina', 'main: conteudo unico da pagina (1 por pagina!)', 'footer: copyright, links, contato']}
        whenNotToUse={['Nao use main mais de uma vez por pagina', 'Nao coloque main dentro de article/section', 'Nao use header para qualquer titulo — so para cabecalhos']}
        code={'<header>\n  <h1>Meu Blog</h1>\n  <nav>...</nav>\n</header>\n<main>\n  <article>\n    <h2>Post do blog</h2>\n    <p>Conteudo principal...</p>\n  </article>\n</main>\n<footer>\n  <p>2024 Meu Blog. Todos os direitos reservados.</p>\n</footer>'}
        result="Estrutura semantica com landmarks acessiveis"
        errors={['Multiplos main — invalido e confunde leitores de tela', 'Main dentro de article — semantica incorreta']}
        tips={['Leitores de tela usam header/main/footer como &quot;atalhos&quot; — sao as landmarks da pagina.']}
        checklist={['Apenas 1 main por pagina', 'header com cabecalho', 'footer com rodape']}
      />

      <TopicCard
        title="section, article, aside"
        definition="section para secoes genericas, article para conteudo independente, aside para conteudo lateral. Cada um com significado distinto."
        whenToUse={['section: grupo tematico com heading', 'article: conteudo autossuficiente (post, noticia)', 'aside: sidebar, conteudo complementar']}
        whenNotToUse={['Nao use section sem heading — melhor usar div', 'Nao use article para conteudo dependente da pagina', 'Nao use aside para conteudo principal']}
        code={'<main>\n  <article>\n    <h2>Como aprender HTML</h2>\n    <p>Artigo completo e autossuficiente...</p>\n  </article>\n  <section>\n    <h2>Comentarios</h2>\n    <!-- comentarios -->\n  </section>\n  <aside>\n    <h3>Artigos relacionados</h2>\n    <!-- links -->\n  </aside>\n</main>'}
        result="Estrutura com artigo independente, secao e conteudo lateral"
        errors={['section sem heading — leitor de tela anuncia secao sem titulo', 'article para conteudo que nao faz sentido isolado']}
        tips={['section = divisao tematica; article = poderia ser um RSS feed; aside = complementar.']}
        checklist={['section sempre com heading', 'article autossuficiente', 'aside para complementar']}
      />

      <TopicCard
        title="div e span — Genericos de ultimo recurso"
        definition="div (bloco) e span (inline) nao tem significado semantico. Use-os so quando nenhuma tag semantica se aplica."
        whenToUse={['Container para estilizacao CSS sem significado semantico', 'Agrupar elementos para layout', 'span para estilizar trecho inline']}
        whenNotToUse={['Nao use div quando header/main/footer/section se aplicam', 'Nao use span para texto que poderia ter tag semantica', 'Nao abuse — divitis e um code smell']}
        code={'<div class="grid-container">\n  <div class="card">...</div>\n  <div class="card">...</div>\n</div>\n\n<p>Preco: <span class="destaque">R$ 99</span></p>'}
        result="Layout organizado sem semantica falsa"
        errors={['Usar div para tudo — &quot;divitis&quot; torna a pagina opaca para leitores de tela', 'Usar div no lugar de section — perde semantica']}
        tips={['Pense: &quot;Existe uma tag que descreve o que isso e?&quot; Se sim, use-a. Se nao, div ou span.']}
        checklist={['Semantica antes de div/span', 'div para bloco, span para inline', 'Evitar divitis']}
      />

      <TopicCard
        title="details e summary — Conteudo expandivel"
        definition="details cria uma secao expandivel; summary e o titulo visivel. Funciona como um acordeao sem JavaScript."
        whenToUse={['FAQ com perguntas/respostas', 'Conteudo complementar que pode ser ocultado', 'Detalhes tecnicos opcionais']}
        whenNotToUse={['Nao use para esconder conteudo essencial — tudo importante deve estar visivel', 'Nao use para navegacao — nav e melhor']}
        code={'<details>\n  <summary>Como funciona o HTML?</summary>\n  <p>HTML e uma linguagem de marcacao que estrutura\n  o conteudo de paginas web usando tags.</p>\n</details>\n\n<details open>\n  <summary>Ja aberto por padrao</summary>\n  <p>Este conteudo aparece visivel inicialmente.</p>\n</details>'}
        result="Secao clicavel que expande/recolhe sem JS"
        errors={['Details sem summary — navegador cria &quot;Details&quot; como titulo', 'Usar para esconder conteudo crucial — acessibilidade ruim']}
        tips={['open faz o details comecar aberto. Ideal para FAQ com resposta importante visivel.']}
        checklist={['summary como primeiro filho', 'Conteudo dentro de details', 'Nao esconder conteudo essencial']}
      />
    </div>
  );
}

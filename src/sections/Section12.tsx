import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import CodeBlock from '../components/CodeBlock';

export default function Section12() {
  const projectCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agencia Digital Criativa | Web Design e SEO</title>
  <meta name="description" content="Agencia criativa especializada em web design, SEO e marketing digital. Transformamos ideas em resultados.">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- HEADER + NAV -->
  <header>
    <h1>Agencia Criativa</h1>
    <nav aria-label="Menu principal">
      <a href="#sobre">Sobre</a>
      <a href="#servicos">Servicos</a>
      <a href="#precos">Precos</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>

  <!-- SECAO SOBRE -->
  <main>
    <section id="sobre">
      <h2>Sobre nos</h2>
      <p>Somos uma agencia digital com <strong>10 anos</strong> de experiencia em transformar ideias em resultados digitais.</p>
      <figure>
        <img src="equipe.jpg" alt="Equipe da agencia colaborando em um escritorio moderno" loading="lazy" width="800" height="400">
        <figcaption>Nossa equipe em acao</figcaption>
      </figure>
    </section>

    <!-- SERVICOS - CARDS -->
    <section id="servicos">
      <h2>Nossos servicos</h2>
      <div class="cards">
        <article class="card">
          <h3>Web Design</h3>
          <p>Sites modernos e responsivos que encantam seus clientes.</p>
        </article>
        <article class="card">
          <h3>SEO</h3>
          <p>Seu site nas primeiras posicoes do Google.</p>
        </article>
        <article class="card">
          <h3>Marketing Digital</h3>
          <p>Estrategias que geram leads e vendas.</p>
        </article>
      </div>
    </section>

    <!-- TABELA DE PRECOS -->
    <section id="precos">
      <h2>Tabela de precos</h2>
      <table>
        <caption>Planos e precos mensais</caption>
        <thead>
          <tr>
            <th scope="col">Plano</th>
            <th scope="col">Web Design</th>
            <th scope="col">SEO</th>
            <th scope="col">Preco</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Basico</th>
            <td>Sim</td>
            <td>Nao</td>
            <td>R$ 1.500</td>
          </tr>
          <tr>
            <th scope="row">Profissional</th>
            <td>Sim</td>
            <td>Sim</td>
            <td>R$ 3.000</td>
          </tr>
          <tr>
            <th scope="row">Premium</th>
            <td>Sim</td>
            <td>Sim</td>
            <td>R$ 5.000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Todos os planos incluem suporte</td>
            <td>24h</td>
          </tr>
        </tfoot>
      </table>
    </section>

    <!-- FORMULARIO DE CONTATO -->
    <section id="contato">
      <h2>Entre em contato</h2>
      <form action="/api/contato" method="POST">
        <fieldset>
          <legend>Dados pessoais</legend>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required>
          <label for="email">E-mail:</label>
          <input type="email" id="email" name="email" required>
        </fieldset>
        <fieldset>
          <legend>Sua mensagem</legend>
          <label for="assunto">Assunto:</label>
          <select id="assunto" name="assunto">
            <option value="">Selecione</option>
            <option value="orcamento">Orcamento</option>
            <option value="duvida">Duvida</option>
          </select>
          <label for="msg">Mensagem:</label>
          <textarea id="msg" name="msg" rows="4"></textarea>
          <label>
            <input type="checkbox" name="termos" required>
            Aceito os termos
          </label>
        </fieldset>
        <button type="submit">Enviar mensagem</button>
      </form>
    </section>
  </main>

  <!-- FOOTER -->
  <footer>
    <p><small>2024 Agencia Criativa. Todos os direitos reservados.</small></p>
    <nav aria-label="Links do rodape">
      <a href="#sobre">Sobre</a>
      <a href="#contato">Contato</a>
    </nav>
  </footer>

</body>
</html>`;

  return (
    <div>
      <SectionHeader number={12} title="HTML: Projeto Final" subtitle="Site completo de agencia digital — tudo que aprendemos em um so arquivo" />

      <TopicCard
        title="Projeto: Agencia Digital Criativa"
        definition="Um site completo que aplica todas as tags, atributos e boas praticas das 11 secoes anteriores."
        whenToUse={['Como referencia para projetos reais', 'Como base para expandir com CSS e JS', 'Como checklist de boas praticas HTML']}
        whenNotToUse={['Nao copie cegamente — adapte ao seu projeto', 'Nao e template final — precisa de CSS e JS']}
        tips={['Cada secao do projeto corresponde a um topico estudado.']}
        checklist={['DOCTYPE e lang', 'meta charset, viewport, title, description', 'header + nav com aria-label', 'section com id para ancoras', 'article nos cards', 'table com caption, thead, scope', 'form com fieldset, legend, label', 'footer com small']}
      >
        Este projeto une tudo que aprendemos: estrutura base, semantica, links, imagens, tabelas, formularios e acessibilidade.
      </TopicCard>

      <CodeBlock code={projectCode} language="html" title="index.html — Projeto completo de agencia digital" />

      <TopicCard
        title="Explicacao linha por linha"
        definition="Cada parte do projeto e uma aplicacao direta dos conceitos estudados."
        code={'<!DOCTYPE html>          → Secao 1: Declaracao HTML5\n<html lang="pt-BR">     → Secao 1: Idioma + a11y\n<meta charset="UTF-8">  → Secao 1: Codificacao\n<meta viewport>         → Secao 1: Responsividade\n<title>                 → Secao 1 + 11: SEO + aba\n<meta description>      → Secao 11: SEO\n<header>                → Secao 8: Semantica\n<nav aria-label>         → Secao 3 + 11: Nav + a11y\n<section id="sobre">    → Secao 3 + 8: Ancora + semantica\n<strong>                → Secao 2: Semantico vs visual\n<figure> + <img alt>   → Secao 4: Imagem acessivel\n<article>              → Secao 8: Conteudo independente\n<table> + caption      → Secao 6: Tabela semantica\nscope="col/row"         → Secao 6: Acessibilidade\n<form> + method         → Secao 7: Formulario\n<fieldset> + <legend>  → Secao 7: Agrupamento\n<label for> + <input>   → Secao 7: Rotulo + campo\n<select> + <textarea>   → Secao 7: Selecao + texto\n<button type=submit>    → Secao 7: Acao\n<footer> + <small>      → Secao 2 + 8: Semantica'}
        result="Mapeamento completo de cada linha ao conceito estudado"
        checklist={['Todas as 11 secoes aplicadas', 'Semantica consistente', 'Acessibilidade em cada elemento']}
      />

      <TopicCard
        title="Contagem de tags utilizadas"
        definition="Resumo de todas as tags HTML usadas no projeto final."
        code={'ESTRUTURA:    4  (DOCTYPE, html, head, body)\nMETADADOS:    5  (meta x3, title, link)\nSEMANTICAS:   8  (header, main, footer, section x3, article x3, nav x2)\nTEXTO:        5  (h1, h2, h3, p, strong, small)\nIMAGEM:       3  (img, figure, figcaption)\nTABELA:       7  (table, caption, thead, tbody, tfoot, tr, th, td)\nFORMULARIO:   9  (form, fieldset, legend, label, input, select, option, textarea, button)\nTOTAL:       ~41 tags distintas\n\nATRIBUTOS: lang, charset, name, content, href, rel,\n  src, alt, loading, width, height, id, for, type,\n  name, required, rows, scope, colspan, action,\n  method, aria-label'}
        result="41 tags HTML e ~22 atributos utilizados"
        tips={['Este projeto usa quase todas as tags estudadas. Adicione more como details/summary para expandir!']}
        checklist={['Todas as tags estudadas presentes', 'Atributos corretos', 'Projeto funcional e acessivel']}
      />
    </div>
  );
}

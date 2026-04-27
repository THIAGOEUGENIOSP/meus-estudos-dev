import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';

export default function Section3() {
  return (
    <div>
      <SectionHeader number={3} title="HTML: Links e Navegacao" subtitle="Como conectar paginas e criar navegacao acessivel — a essencia da web" />

      <TopicCard
        title="Tag a — Links com href"
        definition="O elemento ancora (a) cria links para outras paginas, arquivos, emails ou telefones. E como uma porta entre paginas."
        whenToUse={['Navegar para outra pagina', 'Link para download', 'Link para email ou telefone', 'Link para secao na mesma pagina']}
        whenNotToUse={['Nao use a sem href — se nao navega, use button', 'Nao envolva secoes inteiras em um link', 'Nao use JavaScript:void() no href']}
        code={'<a href="https://exemplo.com">Visite o site</a>\n<a href="/sobre">Pagina sobre</a>\n<a href="mailto:contato@site.com">Email</a>\n<a href="tel:+5511999990000">Ligar</a>\n<a href="/arquivo.pdf" download>Baixar PDF</a>'}
        result="Links clicaveis que abrem destino, email ou telefone"
        errors={['Usar <a> sem href — vira texto normal, nao link', 'Colocar div dentro de a — bloco dentro de inline', 'Usar javascript:void(0) — anti-padrao, use button']}
        tips={['Se o clique executa uma acao (nao navega), use <button>, nao <a>.']}
        checklist={['href presente e valido', 'Texto do link descritivo (nao &quot;clique aqui&quot;)', 'mailto: para email, tel: para telefone']}
      >
        O link e o que torna a web uma teia. Sem links, cada pagina seria uma ilha isolada. O atributo href e o endereco de destino — como o CEP em uma carta.
      </TopicCard>

      <TopicCard
        title="Atributos target e rel"
        definition="target define onde o link abre; rel descreve a relacao entre a pagina atual e o destino. Crucial para seguranca."
        whenToUse={['target="_blank" para abrir em nova aba', 'rel="noopener noreferrer" SEMPRE com _blank', 'rel="noopener" impede window.opener', 'rel="noreferrer" oculta a origem']}
        whenNotToUse={['Nao use target="_blank" sem rel="noopener noreferrer"', 'Nao use _blank para navegacao interna — confunde o usuario']}
        code={'<a href="https://site-externo.com"\n   target="_blank"\n   rel="noopener noreferrer">\n  Site externo (nova aba)\n</a>'}
        result="Link abre em nova aba sem vulnerabilidade de window.opener"
        errors={['_blank sem rel="noopener noreferrer" — vulnerabilidade de seguranca! A pagina destino pode acessar window.opener.']}
        tips={['noopener noreferrer nao e opcional — e obrigatorio com _blank. Pense como fechar a porta ao sair de casa.']}
        checklist={['target="_blank" sempre com rel="noopener noreferrer"', 'Links externos identificam nova aba', 'Links internos nao usam _blank']}
      >
        Abrir link em nova aba sem rel="noopener noreferrer" e como deixar a porta aberta ao sair: o site de destino pode acessar informacoes da sua pagina via window.opener. Sempre feche essa porta.
      </TopicCard>

      <TopicCard
        title="Links internos — Ancoras com #id"
        definition="Links para secoes dentro da mesma pagina usando # seguido do id do elemento. Como um indice de livro que salta ao capitulo."
        whenToUse={['Menu de navegacao dentro da pagina', 'Ir para secao especifica', 'FAQ com saltos para respostas']}
        whenNotToUse={['Nao abuse em paginas curtas — scroll natural basta', 'Nao use para esconder conteudo — use detalhes/summary']}
        code={'<nav>\n  <a href="#sobre">Sobre</a>\n  <a href="#servicos">Servicos</a>\n  <a href="#contato">Contato</a>\n</nav>\n\n<section id="sobre">\n  <h2>Sobre nos</h2>\n</section>\n<section id="servicos">\n  <h2>Servicos</h2>\n</section>\n<section id="contato">\n  <h2>Contato</h2>\n</section>'}
        result="Clique no link salta para a secao correspondente"
        errors={['Esquecer o id no destino — link nao funciona', 'Usar id duplicado — navegador vai ao primeiro apenas']}
        tips={['Adicione scroll-behavior: smooth no CSS para rolagem suave.']}
        checklist={['id no destino existe e e unico', 'href="#id" corresponde ao id', 'IDs nao duplicados']}
      >
        Ancoras internas sao como marcadores de livro: permitem saltar direto ao que importa. O id e o &quot;endereço&quot; da secao; o href="#id" e o bilhete que diz &quot;va ate la&quot;.
      </TopicCard>

      <TopicCard
        title="Nav com aria-label"
        definition="O elemento nav indica um bloco de navegacao. aria-label ajuda leitores de tela a identificar o proposito quando ha mais de um nav."
        whenToUse={['Menu principal do site', 'Breadcrumbs', 'Paginacao', 'Qualquer grupo de links de navegacao']}
        whenNotToUse={['Nao envolva links soltos em nav — nav e para blocos de navegacao', 'Nao use nav para links no conteudo (ex: texto com links)']}
        code={'<nav aria-label="Menu principal">\n  <a href="/">Inicio</a>\n  <a href="/sobre">Sobre</a>\n  <a href="/contato">Contato</a>\n</nav>\n\n<nav aria-label="Breadcrumbs">\n  <a href="/">Inicio</a> /\n  <a href="/produtos">Produtos</a> /\n  <span>Atual</span>\n</nav>'}
        result="Dois navs distinguiveis por leitores de tela"
        errors={['Multiplos nav sem aria-label — leitor de tela lista todos como &quot;navegacao&quot; sem distinguir']}
        tips={['Se so ha um nav, aria-label e opcional. Com dois ou mais, obrigatorio.']}
        checklist={['nav envolve grupo de links de navegacao', 'aria-label quando ha mais de um nav', 'Texto do link descritivo']}
      >
        Nav e como a placa de um corredor: diz &quot;por aqui estao os links de navegacao&quot;. Quando ha varios corredores, aria-label e como colocar nome em cada: &quot;Menu principal&quot;, &quot;Breadcrumbs&quot;, &quot;Paginacao&quot;.
      </TopicCard>
    </div>
  );
}

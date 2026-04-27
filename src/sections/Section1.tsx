import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section1() {
  return (
    <div>
      <SectionHeader number={1} title="HTML: Estrutura Base" subtitle="O alicerce de toda pagina web — DOCTYPE, head, body e a arvore DOM" />

      <Diagram title="Arvore DOM — Estrutura de um documento HTML">
{`html
 |- head
 |   |- meta charset
 |   |- meta viewport
 |   |- title
 |   |- meta description
 |   |- link (CSS)
 |   |- script (JS)
 |
 |- body
     |- header
     |- main
     |- footer`}
      </Diagram>

      <TopicCard
        title="Declaracao DOCTYPE"
        definition="Informa ao navegador qual versao do HTML esta sendo usada. E como o cabeçalho de uma carta oficial."
        whenToUse={['Sempre na primeira linha de qualquer documento HTML', 'Todo arquivo .html deve comecar com DOCTYPE']}
        whenNotToUse={['Nunca omita — sem ele o navegador entra em modo quirks']}
        code={'<!DOCTYPE html>\n<!-- Diz ao navegador: uso HTML5 -->'}
        result="Navegador renderiza em modo padrao (standards mode)"
        errors={['Escrever DOCTYPE em minusculo ou com espacos errados — deve ser <!DOCTYPE html> exatamente']}
        tips={['DOCTYPE nao e uma tag, e uma declaracao. Nao tem fechamento.']}
        checklist={['Arquivo comeca com <!DOCTYPE html>', 'Nao ha espacos antes do DOCTYPE']}
      >
        Pense no DOCTYPE como o selo de autenticidade de um documento. Sem ele, o navegador &quot;adivinha&quot; como renderizar a pagina — e isso causa bugs visuais.
      </TopicCard>

      <TopicCard
        title="Elemento html e atributo lang"
        definition="O elemento raiz que envolve todo o conteudo. lang define o idioma principal da pagina."
        whenToUse={['Envolver todo o conteudo do documento', 'Definir lang para acessibilidade e SEO']}
        whenNotToUse={['Nao coloque conteudo fora de <html>', 'Nao use lang errado — inconsistencia prejudica leitores de tela']}
        code={'<html lang="pt-BR">\n  <!-- todo conteudo aqui -->\n</html>'}
        result="Navegador e leitores de tela identificam o idioma como portugues brasileiro"
        errors={['Esquecer o atributo lang — leitores de tela leem com pronuncia errada', "Usar lang='en' em pagina em portugues"]}
        tips={['Use pt-BR para portugues brasileiro, pt-PT para portugues de Portugal.']}
        checklist={['<html lang="pt-BR"> presente', 'Fecha com </html>']}
      >
        O elemento html e como a capa de um livro: tudo que importa esta dentro dele. O atributo lang e como o idioma impresso na capa — diz ao leitor (e ao navegador) como interpretar o conteudo.
      </TopicCard>

      <TopicCard
        title="Head — Meta, Title, Link e Script"
        definition="Metadados da pagina: charset, viewport, titulo, descricao, CSS e JS. Nada aparece visualmente, mas tudo e essencial."
        whenToUse={['Definir codificacao e responsividade', 'Titulo da aba do navegador', 'Vincular CSS e JavaScript']}
        whenNotToUse={['Nao coloque conteudo visivel no head — ele e invisivel para o usuario']}
        code={'<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Minha Pagina</title>\n  <meta name="description" content="Descricao da pagina">\n  <link rel="stylesheet" href="estilo.css">\n  <script src="app.js" defer></script>\n</head>'}
        result="Aba mostra titulo, pagina usa UTF-8, e responsiva e carrega CSS/JS"
        errors={['Esquecer charset — acentos quebram', 'Omitir viewport — mobile nao escala', 'Title vazio — aba aparece sem nome']}
        tips={['defer no script garante que o JS roda apos o HTML ser parseado.']}
        checklist={['charset UTF-8 presente', 'viewport definido', 'Title preenchido com texto descritivo', 'CSS vinculado', 'JS com defer ou no final do body']}
      >
        O head e como os documentos de um aviao antes do voo: o passageiro nao ve, mas sem eles o voo nao acontece. Meta charset garante que acentos funcionem, viewport faz a pagina se adaptar ao celular, e title e o nome na aba.
      </TopicCard>

      <TopicCard
        title="Body e estrutura completa"
        definition="Onde todo o conteudo visivel da pagina mora. Textos, imagens, formularios — tudo vai no body."
        whenToUse={['Todo conteudo que o usuario deve ver', 'Elementos semanticos como header, main, footer']}
        whenNotToUse={['Nao coloque meta informacoes no body — elas pertencem ao head']}
        code={'<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Site Completo</title>\n</head>\n<body>\n  <h1>Ola, mundo!</h1>\n  <p>Conteudo visivel aqui.</p>\n</body>\n</html>'}
        result="Pagina funcional com estrutura completa HTML5"
        errors={['Esquecer </body> ou </html> — causa renderizacao imprevisivel']}
        tips={['O body e o &quot;palco&quot; do teatro — o head e nos bastidores.']}
        checklist={['Body abre e fecha corretamente', 'Conteudo visivel dentro do body', 'HTML abre e fecha corretamente']}
      >
        Se o head e nos bastidores, o body e o palco. Tudo que o publico ve acontece aqui. A estrutura completa (DOCTYPE + html + head + body) e o minimo absoluto para qualquer pagina.
      </TopicCard>

      <Diagram title="Head vs Body — O que vai onde?">
{`+-----------------------------------+
|  HEAD (bastidores)                |
|  - charset, viewport             |
|  - title, description            |
|  - link CSS, script JS           |
|  NENHUM conteudo visivel!        |
+-----------------------------------+
|  BODY (palco)                    |
|  - h1, p, img, form             |
|  - header, main, footer         |
|  TUDO que o usuario VE!          |
+-----------------------------------+`}
      </Diagram>
    </div>
  );
}

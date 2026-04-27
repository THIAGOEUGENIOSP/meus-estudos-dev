import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section6() {
  return (
    <div>
      <SectionHeader number={6} title="HTML: Tabelas" subtitle="Dados tabulares com semantica correta — e por que tabelas para layout sao proibidas" />

      <Diagram title="Estrutura de uma tabela HTML">
{`table
 |- caption (titulo da tabela)
 |- thead
 |   |- tr
 |       |- th (coluna 1)
 |       |- th (coluna 2)
 |- tbody
 |   |- tr
 |       |- td (dado 1)
 |       |- td (dado 2)
 |- tfoot
     |- tr
         |- td (rodape 1)
         |- td (rodape 2)`}
      </Diagram>

      <TopicCard
        title="table, thead, tbody, tfoot, tr, th, td"
        definition="Estrutura completa de tabela: table e o container, thead/tbody/tfoot dividem secoes, tr e linha, th e cabecalho, td e dado."
        whenToUse={['Dados tabulares reais: precos, horarios, comparacoes', 'Cabecalhos com th no thead', 'Dados no tbody', 'Totais no tfoot']}
        whenNotToUse={['NUNCA para layout de pagina — use CSS Grid/Flexbox', 'Nao para posicionar imagens ou formularios', 'Nao para criar colunas decorativas']}
        code={'<table>\n  <caption>Preco dos produtos</caption>\n  <thead>\n    <tr>\n      <th>Produto</th>\n      <th>Preco</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Notebook</td>\n      <td>R$ 3.500</td>\n    </tr>\n    <tr>\n      <td>Mouse</td>\n      <td>R$ 80</td>\n    </tr>\n  </tbody>\n</table>'}
        result="Tabela com cabecalho e dados organizados"
        errors={['Usar tabela para layout — prejudica acessibilidade, SEO e responsividade', 'Esquecer thead/tbody — navegador cria tbody implicito', 'Usar td no lugar de th no cabecalho — perde semantica']}
        tips={['Se voce consegue desenhar os dados em um Excel, e tabela. Se nao, nao e.']}
        checklist={['table envolve tudo', 'caption presente', 'thead com th', 'tbody com td', 'th para cabecalhos, td para dados']}
      >
        Tabela e como uma planilha: linhas e colunas com dados. thead e o cabecalho fixo, tbody os dados, tfoot os totais. Cada tr e uma linha, th e coluna de cabecalho, td e celula de dado.
      </TopicCard>

      <TopicCard
        title="caption — Titulo da tabela"
        definition="caption e o titulo da tabela, vai logo apos a abertura de table. E como o titulo de um grafico."
        whenToUse={['Toda tabela deve ter caption — obrigatorio para acessibilidade', 'Descreve o conteudo da tabela']}
        whenNotToUse={['Nao use figcaption em tabelas — use caption', 'Nao coloque caption fora do table']}
        code={'<table>\n  <caption>Horario de onibus — Linha 123</caption>\n  <thead>...</thead>\n  <tbody>...</tbody>\n</table>'}
        result="Tabela com titulo semantico vinculado"
        errors={['Omitir caption — leitor de tela anuncia &quot;tabela&quot; sem contexto']}
        tips={['caption e obrigatorio. Sem ele, o usuario nao sabe do que a tabela trata.']}
        checklist={['caption logo apos <table>', 'Texto descritivo', 'Nao usar legenda alternativa']}
      />

      <TopicCard
        title="scope — Associando cabecalhos a dados"
        definition="scope define se th se refere a coluna (col) ou linha (row). Essencial para leitores de tela associarem cabecalhos a dados."
        whenToUse={['scope="col" em cabecalhos de coluna', 'scope="row" em cabecalhos de linha', 'Tabelas complexas com cabecalhos mistos']}
        whenNotToUse={['Nao em th autoexplicativos simples — mas e boa pratica sempre', 'Nao use scope em td — so em th']}
        code={'<thead>\n  <tr>\n    <th scope="col">Nome</th>\n    <th scope="col">Idade</th>\n    <th scope="col">Cidade</th>\n  </tr>\n</thead>\n<tbody>\n  <tr>\n    <th scope="row">Ana</th>\n    <td>28</td>\n    <td>SP</td>\n  </tr>\n</tbody>'}
        result="Leitor de tela anuncia: &quot;Ana, Idade 28, Cidade SP&quot;"
        errors={['Omitir scope em tabelas complexas — leitor de tela perde associacao']}
        tips={['Em tabelas simples, scope e opcional mas recomendado. Em complexas, obrigatorio.']}
        checklist={['scope="col" nos cabecalhos de coluna', 'scope="row" em cabecalhos de linha', 'Consistencia em toda tabela']}
      />

      <TopicCard
        title="colspan e rowspan — Mesclando celulas"
        definition="colspan expande uma celula por multiplas colunas; rowspan por multiplas linhas. Como mesclar celulas no Excel."
        whenToUse={['Cabecalhos que cobrem multiplas colunas', 'Celulas de totais que abrangem colunas', 'Layouts de dados que precisam de mesclagem']}
        whenNotToUse={['Nao use para layout — so para dados tabulares reais', 'Nao abuse — dificulta acessibilidade']}
        code={'<table>\n  <thead>\n    <tr>\n      <th colspan="2">Nome Completo</th>\n      <th>Idade</th>\n    </tr>\n    <tr>\n      <th>Nome</th>\n      <th>Sobrenome</th>\n      <th>Idade</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Ana</td>\n      <td>Silva</td>\n      <td rowspan="2">28</td>\n    </tr>\n    <tr>\n      <td>Bia</td>\n      <td>Santos</td>\n    </tr>\n  </tbody>\n</table>'}
        result="Cabecalho mesclado em 2 colunas; idade mesclada em 2 linhas"
        errors={['colspan/rowspan com valor errado — desalinha a tabela inteira', 'Esquecer de ajustar as demais tr — causa colunas deformadas']}
        tips={['Ao usar colspan=2, a linha precisa ter 2 celulas a menos. Conte as colunas!']}
        checklist={['Valor de colspan/rowspan correto', 'Demais tr ajustadas', 'Tabela permanece alinhada']}
      />

      <Diagram title="TABELA PARA LAYOUT = PROIBIDO!">
{`+======================================+
|  NAO FAZER:                          |
|  +-------+-------+                   |
|  | menu  |conteudo|  = tabela layout |
|  +-------+-------+                   |
|  Problemas:                          |
|  - Leitor de tela le como dados      |
|  - Responsividade impossivel         |
|  - SEO prejudicado                  |
|  - Codigo verboso e fragil           |
+======================================+
|  FAZER:                              |
|  <div class="flex">                  |
|    <nav>menu</nav>                   |
|    <main>conteudo</main>             |
|  </div>                              |
|  Vantagens: semantica, flex, acces.  |
+======================================+`}
      </Diagram>
    </div>
  );
}

import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';

export default function Section5() {
  return (
    <div>
      <SectionHeader number={5} title="HTML: Listas" subtitle="Listas ordenadas, nao ordenadas e de definicao — organizando informacoes em sequencia" />

      <TopicCard
        title="Lista nao ordenada — ul, li"
        definition="Cria uma lista com itens sem ordem especifica (bolinhas). E como uma lista de compras — a ordem nao importa."
        whenToUse={['Itens sem sequencia logica', 'Menu de navegacao', 'Lista de caracteristicas', 'Tags ou categorias']}
        whenNotToUse={['Quando a ordem importa — use ol', 'Nao use para layout — use CSS flex/grid']}
        code={'<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>'}
        result="Lista com bolinhas: HTML, CSS, JavaScript"
        errors={['Colocar conteudo direto em ul sem li — invalido', 'Esquecer de fechar </li>']}
        tips={['ul so aceita li como filho direto. Qualquer outro conteudo vai dentro do li.']}
        checklist={['ul envolve os itens', 'li para cada item', 'Conteudo sempre dentro de li']}
      >
        A lista nao ordenada e como uma lista de compras: voce nao precisa comprar leite antes de pao — a ordem nao importa. Cada item e um li dentro de um ul.
      </TopicCard>

      <TopicCard
        title="Lista ordenada — ol, li e tipos"
        definition="Lista com ordem relevante (numeros, letras, romanos). E como uma receita — cada passo importa na sequencia."
        whenToUse={['Passos de um tutorial', 'Rankings ou classificacoes', 'Instrucoes sequenciais']}
        whenNotToUse={['Quando a ordem nao importa — use ul', 'Nao use so para numerar visualmente — use CSS counter']}
        code={'<ol>\n  <li>Abra o editor</li>\n  <li>Escreva o codigo</li>\n  <li>Salve o arquivo</li>\n</ol>\n\n<ol type="A">\n  <li>Opcao A</li>\n  <li>Opcao B</li>\n</ol>\n\n<ol type="I" start="5">\n  <li>Item V</li>\n  <li>Item VI</li>\n</ol>'}
        result="Lista numerada (1,2,3), com letras (A,B) ou romanos (V,VI)"
        errors={['Usar ol para itens sem ordem — semantica errada', 'Usar @value em li sem necessidade — confusa']}
        tips={['type="1" numeros, "A" letras maiusculas, "a" minusculas, "I" romanos. start define o numero inicial.']}
        checklist={['ol para sequencia logica', 'type correto se diferente de numeros', 'start valido', 'li para cada item']}
      />

      <TopicCard
        title="Lista de definicao — dl, dt, dd"
        definition="Lista de termos e definicoes. dt e o termo, dd e a descricao. E como um dicionario."
        whenToUse={['Glossarios', 'FAQ com pergunta/resposta', 'Metadados (chave-valor)']}
        whenNotToUse={['Nao use para listas simples — ul e mais simples', 'Nao use para tabelas — use table']}
        code={'<dl>\n  <dt>HTML</dt>\n  <dd>Linguagem de marcacao para paginas web</dd>\n\n  <dt>CSS</dt>\n  <dd>Linguagem de estilizacao visual</dd>\n\n  <dt>JS</dt>\n  <dd>Linguagem de programacao para interatividade</dd>\n</dl>'}
        result="Termos com suas definicoes indentadas"
        errors={['Colocar dd sem dt — perde o par semantico', 'Misturar dt e dd sem logica — confuso']}
        tips={['Um dt pode ter multiplos dd. E um dd pode estar sozinho, mas semanticamente ruim.']}
        checklist={['dl envolve pares dt+dd', 'dt antes de dd', 'Termos e definicoes coerentes']}
      />

      <TopicCard
        title="Aninhamento de listas"
        definition="Listas dentro de listas criam hierarquia. A lista interna deve ficar dentro de um li da lista externa."
        whenToUse={['Menus com submenus', 'Topicos e subtopicos', 'Categorias e subcategorias']}
        whenNotToUse={['Nao aninhe mais de 3 niveis — dificulta leitura', 'Nao coloque ul/ol direto em ul — filho de ul e li']}
        code={'<ul>\n  <li>Front-end\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>JavaScript</li>\n    </ul>\n  </li>\n  <li>Back-end\n    <ul>\n      <li>Node.js</li>\n      <li>Python</li>\n    </ul>\n  </li>\n</ul>'}
        result="Lista com subitens indentados em hierarquia"
        errors={['Colocar ul/ol diretamente dentro de ul — INVALIDO! Deve ficar dentro de um li', 'Aninhar demais — leitores de tela se perdem']}
        tips={['A lista interna e sempre filha de um li, nunca da lista externa diretamente.']}
        checklist={['Lista interna dentro de li', 'Maximo 3 niveis de profundidade', 'Fechar todas as tags corretamente']}
      />

      <TopicCard
        title="Tipos de ol — Atributo type"
        definition="O atributo type muda o estilo do marcador: numeros, letras ou romanos. start define o inicio da contagem."
        whenToUse={['type="1" para numeros (padrao)', 'type="A" para letras maiusculas', 'type="a" para letras minusculas', 'type="I" para romanos maiusculos', 'type="i" para romanos minusculos']}
        whenNotToUse={['Nao mude type so por estetica — use CSS list-style-type', 'Nao use start negativo — invalido']}
        code={'<ol type="A" start="3">\n  <li>Item C</li>\n  <li>Item D</li>\n</ol>\n\n<!-- CSS alternativa (melhor pratica) -->\n<ol style="list-style-type: lower-roman">\n  <li>Item i</li>\n  <li>Item ii</li>\n</ol>'}
        result="Lista comecando em C: C, D ou i, ii"
        errors={['Usar type para estilizar — prefira CSS list-style-type para separar visual de semantica']}
        tips={['Prefira CSS para estilizar marcadores. type e semantico; CSS e visual.']}
        checklist={['type compativel com o conteudo', 'start correto', 'Considerar CSS como alternativa visual']}
      />
    </div>
  );
}

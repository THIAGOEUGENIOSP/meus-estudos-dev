import SectionHeader from '../components/SectionHeader';

const termos = [
  { termo: 'DOM', def: 'Document Object Model - representacao em arvore da estrutura HTML que o JavaScript manipula para alterar conteudo, estilo e estrutura da pagina.' },
  { termo: 'Semantica', def: 'Uso de tags HTML que descrevem o significado do conteudo (ex: &lt;article&gt;, &lt;nav&gt;, &lt;header&gt;), melhorando acessibilidade e SEO.' },
  { termo: 'SSR', def: 'Server-Side Rendering - tecnica onde o servidor gera o HTML completo a cada requisicao, enviando pagina pronta ao navegador.' },
  { termo: 'SSG', def: 'Static Site Generation - paginas geradas no momento do build, servindo arquivos HTML estaticos com alta performance.' },
  { termo: 'CSR', def: 'Client-Side Rendering - o navegador baixa JavaScript e renderiza a pagina no cliente, tipico de SPAs em React.' },
  { termo: 'ISR', def: 'Incremental Static Regeneration - revalidacao de paginas estaticas em segundo plano sem rebuild completo.' },
  { termo: 'Hook', def: 'Funcoes especiais do React (useState, useEffect, etc.) que permitem usar estado e outros recursos em componentes funcionais.' },
  { termo: 'Middleware', def: 'Funcao que intercepta requisicoes/respostas em Express ou Next.js, podendo modificar, autenticar ou registrar dados antes de chegar ao destino.' },
  { termo: 'Promise', def: 'Objeto que representa a conclusao ou falha futura de uma operacao assincrona, permitindo encadear .then() e .catch().' },
  { termo: 'Component', def: 'Bloco reutilizavel de UI em React que recebe props, gerencia estado e renderiza JSX. Pode ser funcional ou de classe.' },
  { termo: 'Generics', def: 'Recurso do TypeScript que permite criar tipos parametrizados, tornando funcoes e interfaces reutilizaveis para diferentes tipos de dados.' },
  { termo: 'Route', def: 'Caminho de URL mapeado a uma pagina ou API. No Next.js, cada arquivo em pages/ vira uma rota automaticamente.' },
  { termo: 'Event Loop', def: 'Mecanismo do Node.js que gerencia o processamento assincrono, verificando a fila de callbacks e executando-os quando a pilha de chamadas esta vazia.' },
  { termo: 'State', def: 'Dados internos de um componente React que, ao mudar, disparam nova renderizacao. Gerenciado com useState ou useReducer.' },
  { termo: 'Props', def: 'Propriedades passadas de um componente pai para filho em React. Sao Somente leitura e permitem comunicacao descendente.' },
  { termo: 'Re-render', def: 'Processo de nova renderizacao de um componente React quando seu estado ou props mudam, atualizando o DOM virtual e o real.' },
  { termo: 'Virtual DOM', def: 'Representacao leve do DOM real em memoria. React compara versoes anteriores e novas (diffing) e aplica apenas mudancas minimas no DOM.' },
  { termo: 'Type Inference', def: 'Capacidade do TypeScript de deduzir automaticamente o tipo de uma variavel sem anotacao explicita, baseada no valor atribuido.' },
  { termo: 'Union Type', def: 'Tipo que aceita dois ou mais tipos diferentes, usando o operador |. Permite modelar valores que podem vir de formas variadas.' },
  { termo: 'API Route', def: 'Endpoint de API criado dentro do projeto Next.js em pages/api/, permitindo construir back-end sem servidor separado.' },
  { termo: 'Hydration', def: 'Processo onde o React anexa ouvintes de eventos ao HTML estatico enviado pelo servidor, tornando a pagina interativa no cliente.' },
  { termo: 'Responsive Design', def: 'Abordagem de design que adapta o layout a diferentes tamanhos de tela usando media queries, flexbox, grid e unidades relativas.' },
  { termo: 'REST', def: 'Representational State Transfer - padrao arquitetural para APIs que usa metodos HTTP (GET, POST, PUT, DELETE) em recursos identificados por URLs.' },
  { termo: 'CRUD', def: 'Create, Read, Update, Delete - as quatro operacoes basicas de persistencia de dados em uma aplicacao.' },
  { termo: 'CORS', def: 'Cross-Origin Resource Sharing - mecanismo de seguranca que controla quais dominios podem acessar recursos de outro dominio no navegador.' },
  { termo: 'JWT', def: 'JSON Web Token - formato compacto e seguro para transmitir informacoes entre partes como objeto JSON, usado em autenticacao.' },
  { termo: 'Bundle', def: 'Arquivo otimizado gerado pelo bundler (Webpack, Vite) que combina multiplos modulos em um ou poucos arquivos para o navegador.' },
  { termo: 'Tree Shaking', def: 'Tecnica de otimizacao que remove codigo nao utilizado do bundle final, reduzindo o tamanho do arquivo enviado ao cliente.' },
  { termo: 'Closure', def: 'Funcao que lembra do escopo lexico onde foi criada, mesmo quando executada fora dele. Base para patterns como factory e hooks.' },
  { termo: 'Scope', def: 'Contexto onde variaveis e funcoes sao acessiveis. Pode ser global, de funcao ou de bloco (let/const). Var tem escopo de funcao.' },
  { termo: 'Hoisting', def: 'Comportamento do JavaScript que eleva declaracoes de var e funcoes para o topo do escopo, permitindo uso antes da declaracao.' },
  { termo: 'Async/Await', def: 'Syntax sugar sobre Promises que permite escrever codigo assincrono com aparencia sincrona, melhorando legibilidade.' },
  { termo: 'NPM', def: 'Node Package Manager - gerenciador de pacotes do ecossistema Node.js, com registro publico de milhares de bibliotecas reutilizaveis.' },
];

export default function Section37() {
  return (
    <div>
      <SectionHeader
        number={37}
        title='Glossario'
        subtitle='Dicionario com os termos tecnicos mais importantes de HTML, CSS, JavaScript, React, TypeScript, Next.js e Node.js'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {termos.map((t, i) => (
          <div key={i} className='bg-white rounded-xl shadow-sm border border-gray-200 p-5'>
            <h3 className='text-lg font-bold text-emerald-700 mb-2'>{t.termo}</h3>
            <p className='text-gray-700 text-sm leading-relaxed'>{t.def}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

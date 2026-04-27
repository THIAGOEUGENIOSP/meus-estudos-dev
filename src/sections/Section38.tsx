import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Questao {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

const questoes: Questao[] = [
  {
    pergunta: 'Qual tag HTML e usada para criar um conteudo semanticamente autonomo e reutilizavel?',
    opcoes: ['&lt;div&gt;', '&lt;article&gt;', '&lt;span&gt;', '&lt;section&gt;'],
    correta: 1,
    explicacao: 'A tag &lt;article&gt; representa um conteudo autonomo que faz sentido por si so, como um post ou comentario. &lt;section&gt; e para agrupamento tematico e &lt;div&gt; e generico.',
  },
  {
    pergunta: 'Qual propriedade CSS cria um layout bidimensional em grade?',
    opcoes: ['display: flex', 'display: grid', 'display: block', 'display: inline'],
    correta: 1,
    explicacao: 'display: grid cria layouts bidimensionais com linhas e colunas. Flexbox (display: flex) e unidimensional.',
  },
  {
    pergunta: 'Qual metodo de array JavaScript retorna um novo array apenas com os itens que satisfazem uma condicao?',
    opcoes: ['map()', 'reduce()', 'filter()', 'find()'],
    correta: 2,
    explicacao: 'filter() retorna todos os itens que passam no teste. find() retorna apenas o primeiro. map() transforma e reduce() agrega.',
  },
  {
    pergunta: 'O que a keyword "await" faz dentro de uma funcao async?',
    opcoes: [
      'Pausa a execucao ate a Promise ser resolvida',
      'Cancela a Promise em execucao',
      'Cria uma nova thread separada',
      'Converte a funcao para sincrona bloqueante',
    ],
    correta: 0,
    explicacao: 'await pausa a execucao da funcao async ate a Promise ser resolvida, sem bloquear a thread principal do JavaScript.',
  },
  {
    pergunta: 'Qual hook React e usado para executar efeitos colaterais como buscas de API?',
    opcoes: ['useState', 'useMemo', 'useEffect', 'useRef'],
    correta: 2,
    explicacao: 'useEffect executa efeitos colaterais apos a renderizacao, como chamadas de API, subscriptions ou manipulacao do DOM.',
  },
  {
    pergunta: 'O que acontece se voce alterar props diretamente em um componente React?',
    opcoes: [
      'O componente re-renderiza automaticamente',
      'O React lanca um erro',
      'Nada, props sao mutaveis',
      'As props mudam mas nao causam re-render',
    ],
    correta: 1,
    explicacao: 'Props sao read-only no React. Tentar modifica-las diretamente causa erro. Para mudar dados, use estado local ou callbacks para o pai.',
  },
  {
    pergunta: 'O que e um Generic no TypeScript?',
    opcoes: [
      'Um tipo que so aceita strings',
      'Um tipo parametrizado que permite reutilizar logica com diferentes tipos',
      'Um modificador de acesso para propriedades',
      'Uma funcao que retorna sempre any',
    ],
    correta: 1,
    explicacao: 'Generics permitem criar funcoes, interfaces e classes que funcionam com multiplos tipos, mantendo a seguranca de tipos.',
  },
  {
    pergunta: 'Qual e a diferenca entre "type" e "interface" no TypeScript?',
    opcoes: [
      'type nao pode ser exportado',
      'interface suporta declaracao merging, type nao',
      'type e so para primitivos',
      'Nenhuma, sao identicos',
    ],
    correta: 1,
    explicacao: 'Interfaces suportam declaration merging (mesmo nome se combinam), enquanto type aliases nao. Types sao mais flexiveis para unions e tuplas.',
  },
  {
    pergunta: 'Qual funcao do Next.js gera paginas estaticas no momento do build?',
    opcoes: ['getServerSideProps', 'getStaticProps', 'getInitialProps', 'useRouter'],
    correta: 1,
    explicacao: 'getStaticProps gera HTML estatico no build time. getServerSideProps gera no servidor a cada request.',
  },
  {
    pergunta: 'O que o componente Link do Next.js faz diferente de uma tag &lt;a&gt; comum?',
    opcoes: [
      'Nada, e apenas um alias',
      'Permite navegacao client-side sem recarregar a pagina inteira',
      'Sempre faz SSR da pagina destino',
      'So funciona com rotas de API',
    ],
    correta: 1,
    explicacao: 'Link do Next.js faz prefetch e navegacao client-side, recarregando apenas o conteudo que mudou sem full page reload.',
  },
  {
    pergunta: 'Qual metodo do Express adiciona um middleware na pilha de requisicoes?',
    opcoes: ['app.get()', 'app.post()', 'app.use()', 'app.route()'],
    correta: 2,
    explicacao: 'app.use() registra middleware que executa para todas as requisicoes que casam com o caminho. app.get/post definem rotas especificas.',
  },
  {
    pergunta: 'O que e o Event Loop no Node.js?',
    opcoes: [
      'Um loop for que repete operacoes',
      'O mecanismo que gerencia callbacks assincronos verificando a fila de tarefas',
      'Uma funcao para criar eventos personalizados',
      'O gerenciador de pacotes do Node.js',
    ],
    correta: 1,
    explicacao: 'O Event Loop verifica continuamente a fila de callbacks e os executa quando a call stack esta vazia, permitindo concorrencia sem threads.',
  },
  {
    pergunta: 'Qual media query aplica estilos apenas em telas com largura maxima de 768px?',
    opcoes: [
      '@media (min-width: 768px)',
      '@media (max-width: 768px)',
      '@media (width: 768px)',
      '@media screen and (768px)',
    ],
    correta: 1,
    explicacao: 'max-width: 768px seleciona telas com largura ate 768px, ideal para estilos mobile. min-width seleciona telas a partir desse tamanho.',
  },
  {
    pergunta: 'Qual e a funcao do metodo hydrate no contexto do Next.js?',
    opcoes: [
      'Limpar o cache do navegador',
      'Anexar ouvintes de eventos ao HTML estatico enviado pelo servidor',
      'Converter JSX em HTML puro',
      'Fazer o build do projeto',
    ],
    correta: 1,
    explicacao: 'Hydration e o processo onde React transforma HTML estatico em uma SPA interativa, anexando event listeners sem re-renderizar o conteudo.',
  },
  {
    pergunta: 'O que e CORS e por que ele existe?',
    opcoes: [
      'Um framework CSS para estilos rapidos',
      'Um mecanismo de seguranca que controla requisicoes entre dominios diferentes',
      'Um padrao de roteamento do Next.js',
      'Um formato de dados para APIs',
    ],
    correta: 1,
    explicacao: 'CORS (Cross-Origin Resource Sharing) protege o navegador de fazer requisicoes nao autorizadas a dominios diferentes do da pagina atual.',
  },
];

export default function Section38() {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [enviado, setEnviado] = useState(false);

  const selecionar = (questaoIdx: number, opcaoIdx: number) => {
    if (enviado) return;
    setRespostas((prev) => ({ ...prev, [questaoIdx]: opcaoIdx }));
  };

  const acertos = questoes.filter((q, i) => respostas[i] === q.correta).length;

  const resetar = () => {
    setRespostas({});
    setEnviado(false);
  };

  return (
    <div>
      <SectionHeader
        number={38}
        title='Quiz Final'
        subtitle='Teste seus conhecimentos nas 7 tecnologias com 15 questoes interativas'
      />

      <div className='space-y-6'>
        {questoes.map((q, qi) => {
          const respondida = respostas[qi] !== undefined;
          const acertou = respostas[qi] === q.correta;

          return (
            <div key={qi} className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <p className='text-gray-900 font-semibold mb-4'>
                <span className='text-emerald-600 mr-2'>{qi + 1}.</span>
                {q.pergunta}
              </p>

              <div className='space-y-2'>
                {q.opcoes.map((op, oi) => {
                  const selecionada = respostas[qi] === oi;
                  const eCorreta = oi === q.correta;
                  let estilo = 'border-gray-200 bg-white hover:border-emerald-300';
                  if (selecionada && !enviado) estilo = 'border-emerald-500 bg-emerald-50';
                  if (enviado && eCorreta) estilo = 'border-emerald-500 bg-emerald-50';
                  if (enviado && selecionada && !eCorreta) estilo = 'border-red-500 bg-red-50';

                  return (
                    <button
                      key={oi}
                      onClick={() => selecionar(qi, oi)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${estilo}`}
                    >
                      <span className='font-medium mr-2'>
                        {String.fromCharCode(65 + oi)})
                      </span>
                      {op}
                      {enviado && eCorreta && (
                        <CheckCircle className='inline ml-2 w-4 h-4 text-emerald-600' />
                      )}
                      {enviado && selecionada && !eCorreta && (
                        <XCircle className='inline ml-2 w-4 h-4 text-red-600' />
                      )}
                    </button>
                  );
                })}
              </div>

              {enviado && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${acertou ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                  <span className='font-bold'>{acertou ? 'Correto! ' : 'Incorreto. '}</span>
                  {q.explicacao}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className='mt-8 flex flex-col items-center gap-4'>
        {!enviado ? (
          <button
            onClick={() => setEnviado(true)}
            disabled={Object.keys(respostas).length < questoes.length}
            className='px-8 py-3 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
          >
            Verificar Respostas
          </button>
        ) : (
          <>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center'>
              <Trophy className='w-12 h-12 text-amber-500 mx-auto mb-2' />
              <p className='text-2xl font-extrabold text-gray-900'>
                {acertos} de {questoes.length}
              </p>
              <p className='text-gray-500 mt-1'>
                {acertos === questoes.length
                  ? 'Perfeito! Voce dominou todas as 7 tecnologias!'
                  : acertos >= questoes.length * 0.7
                  ? 'Muito bem! Voce tem um otimo dominio!'
                  : acertos >= questoes.length * 0.5
                  ? 'Bom trabalho! Revise os pontos que errou.'
                  : 'Continue estudando! Revise as secoes do guia.'}
              </p>
            </div>

            <button
              onClick={resetar}
              className='flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors'
            >
              <RotateCcw className='w-4 h-4' />
              Refazer Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

import SectionHeader from '../components/SectionHeader';

export default function Section36() {
  const rows = [
    { item: '&lt;html&gt;', tech: 'HTML', uso: 'Elemento raiz de toda pagina web', ex: '&lt;html lang="pt-BR"&gt;' },
    { item: '&lt;head&gt;', tech: 'HTML', uso: 'Metadados, titulo, links CSS e JS', ex: '&lt;head&gt;&lt;title&gt;Minha Pagina&lt;/title&gt;&lt;/head&gt;' },
    { item: '&lt;body&gt;', tech: 'HTML', uso: 'Conteudo visivel da pagina', ex: '&lt;body&gt;...&lt;/body&gt;' },
    { item: '&lt;div&gt;', tech: 'HTML', uso: 'Container generico de bloco', ex: '&lt;div class="card"&gt;...&lt;/div&gt;' },
    { item: '&lt;section&gt;', tech: 'HTML', uso: 'Secao tematica semantica', ex: '&lt;section&gt;&lt;h2&gt;Sobre&lt;/h2&gt;...&lt;/section&gt;' },
    { item: '&lt;article&gt;', tech: 'HTML', uso: 'Conteudo autonomo e reutilizavel', ex: '&lt;article&gt;...&lt;/article&gt;' },
    { item: '&lt;form&gt;', tech: 'HTML', uso: 'Formulario para entrada de dados', ex: '&lt;form action="/api" method="POST"&gt;' },
    { item: '&lt;img&gt;', tech: 'HTML', uso: 'Insere imagem na pagina', ex: '&lt;img src="logo.png" alt="Logo"&gt;' },
    { item: '&lt;a&gt;', tech: 'HTML', uso: 'Hiperlink para navegacao', ex: '&lt;a href="/sobre"&gt;Sobre&lt;/a&gt;' },
    { item: 'color', tech: 'CSS', uso: 'Define a cor do texto', ex: 'color: #333;' },
    { item: 'background', tech: 'CSS', uso: 'Fundo de elemento (cor, imagem, gradiente)', ex: 'background: linear-gradient(to right, #0f0, #0ff);' },
    { item: 'display', tech: 'CSS', uso: 'Controla o tipo de caixa de renderizacao', ex: 'display: flex;' },
    { item: 'flexbox', tech: 'CSS', uso: 'Layout unidimensional flexivel', ex: 'display: flex; justify-content: center;' },
    { item: 'grid', tech: 'CSS', uso: 'Layout bidimensional em grade', ex: 'display: grid; grid-template-columns: 1fr 2fr;' },
    { item: 'position', tech: 'CSS', uso: 'Posicionamento do elemento', ex: 'position: absolute; top: 10px;' },
    { item: 'media queries', tech: 'CSS', uso: 'Estilos responsivos por tamanho de tela', ex: '@media (max-width: 768px) { ... }' },
    { item: 'transition', tech: 'CSS', uso: 'Animacao suave entre estados', ex: 'transition: all 0.3s ease;' },
    { item: 'box-shadow', tech: 'CSS', uso: 'Sombra ao redor do elemento', ex: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);' },
    { item: 'let/const', tech: 'JavaScript', uso: 'Declaracao de variaveis com escopo de bloco', ex: 'const nome = "Ana";' },
    { item: 'arrow function', tech: 'JavaScript', uso: 'Funcao anonima com sintaxe curta', ex: 'const soma = (a, b) =&gt; a + b;' },
    { item: 'Promise', tech: 'JavaScript', uso: 'Representa valor futuro (assincrono)', ex: 'fetch(url).then(r =&gt; r.json())' },
    { item: 'async/await', tech: 'JavaScript', uso: 'Sintaxe para Promises mais legivel', ex: 'const dados = await fetch(url);' },
    { item: 'Array.map()', tech: 'JavaScript', uso: 'Transforma cada item do array', ex: '[1,2,3].map(n =&gt; n * 2)' },
    { item: 'Array.filter()', tech: 'JavaScript', uso: 'Filtra itens do array por condicao', ex: '[1,2,3].filter(n =&gt; n &gt; 1)' },
    { item: 'Array.reduce()', tech: 'JavaScript', uso: 'Reduz array a um unico valor', ex: '[1,2,3].reduce((acc, n) =&gt; acc + n, 0)' },
    { item: 'Array.find()', tech: 'JavaScript', uso: 'Encontra primeiro item que satisfaz condicao', ex: 'users.find(u =&gt; u.id === 5)' },
    { item: 'Destructuring', tech: 'JavaScript', uso: 'Extrai valores de objetos/arrays', ex: 'const { nome, idade } = pessoa;' },
    { item: 'Spread operator', tech: 'JavaScript', uso: 'Espalha elementos de um iteravel', ex: 'const novo = [...arr, 4];' },
    { item: 'useState', tech: 'React', uso: 'Estado local em componentes funcionais', ex: 'const [count, setCount] = useState(0);' },
    { item: 'useEffect', tech: 'React', uso: 'Efeito colateral (fetch, timers, etc.)', ex: 'useEffect(() =&gt; { fetch(path) }, []);' },
    { item: 'useRef', tech: 'React', uso: 'Referencia mutavel que nao causa re-render', ex: 'const ref = useRef(null);' },
    { item: 'Props', tech: 'React', uso: 'Dados passados de pai para filho', ex: '&lt;Card titulo="Oi" /&gt;' },
    { item: 'Component', tech: 'React', uso: 'Bloco reutilizavel de UI', ex: 'function Card({ titulo }): JSX' },
    { item: 'JSX', tech: 'React', uso: 'Sintaxe XML-like para descrever UI', ex: 'return &lt;h1&gt;{titulo}&lt;/h1&gt;;' },
    { item: 'Context API', tech: 'React', uso: 'Estado global sem prop drilling', ex: 'const ctx = useContext(ThemeContext);' },
    { item: 'useMemo', tech: 'React', uso: 'Memoiza valor calculado para performance', ex: 'const val = useMemo(() =&gt; calc(a), [a]);' },
    { item: 'useCallback', tech: 'React', uso: 'Memoiza funcao para evitar re-criacao', ex: 'const fn = useCallback(() =&gt; {}, [dep]);' },
    { item: 'type', tech: 'TypeScript', uso: 'Define alias para tipo ou formato', ex: 'type User = { name: string; age: number };' },
    { item: 'interface', tech: 'TypeScript', uso: 'Contrato de formato de objeto', ex: 'interface User { name: string }' },
    { item: 'Generics', tech: 'TypeScript', uso: 'Tipos parametrizados reutilizaveis', ex: 'function id&lt;T&gt;(arg: T): T' },
    { item: 'enum', tech: 'TypeScript', uso: 'Conjunto nomeado de constantes', ex: 'enum Role { Admin, User }' },
    { item: 'Union type', tech: 'TypeScript', uso: 'Tipo que aceita multiplas opcoes', ex: 'type Status = &apos;ativo&apos; | &apos;inativo&apos;;' },
    { item: 'Type assertion', tech: 'TypeScript', uso: 'Assertion manual do tipo', ex: 'const el = input as HTMLInputElement;' },
    { item: 'Utility Types', tech: 'TypeScript', uso: 'Tipos auxiliares (Partial, Pick, Omit)', ex: 'type PartialUser = Partial&lt;User&gt;;' },
    { item: 'Record', tech: 'TypeScript', uso: 'Tipo objeto com chaves e valores tipados', ex: 'Record&lt;string, number&gt;' },
    { item: 'Readonly', tech: 'TypeScript', uso: 'Impede mutacao de propriedades', ex: 'Readonly&lt;{ name: string }&gt;' },
    { item: 'getServerSideProps', tech: 'Next.js', uso: 'SSR: busca dados no servidor a cada request', ex: 'export async function getServerSideProps() {...}' },
    { item: 'getStaticProps', tech: 'Next.js', uso: 'SSG: gera pagina estatica no build', ex: 'export async function getStaticProps() {...}' },
    { item: 'useRouter', tech: 'Next.js', uso: 'Acesso a rota e parametros da URL', ex: 'const router = useRouter();' },
    { item: 'Link', tech: 'Next.js', uso: 'Navegacao client-side entre paginas', ex: '&lt;Link href="/sobre"&gt;Sobre&lt;/Link&gt;' },
    { item: 'Image', tech: 'Next.js', uso: 'Otimizacao automatica de imagens', ex: '&lt;Image src="/img.jpg" width={500} height={300} /&gt;' },
    { item: 'API Routes', tech: 'Next.js', uso: 'Endpoints de API no proprio projeto', ex: 'export default function handler(req, res) {...}' },
    { item: 'Dynamic Routes', tech: 'Next.js', uso: 'Rotas com parametros dinamicos', ex: 'pages/posts/[id].tsx' },
    { item: '_app.tsx', tech: 'Next.js', uso: 'Componente raiz para layout global', ex: 'function MyApp({ Component, pageProps }): JSX' },
    { item: 'require', tech: 'Node.js', uso: 'Importa modulo (CommonJS)', ex: 'const fs = require(&apos;fs&apos;);' },
    { item: 'module.exports', tech: 'Node.js', uso: 'Exporta modulo (CommonJS)', ex: 'module.exports = { soma };' },
    { item: 'express()', tech: 'Node.js', uso: 'Cria aplicacao Express', ex: 'const app = express();' },
    { item: 'app.get()', tech: 'Node.js', uso: 'Define rota HTTP GET', ex: 'app.get(&apos;/api/users&apos;, handler);' },
    { item: 'app.use()', tech: 'Node.js', uso: 'Aplica middleware na pilha', ex: 'app.use(express.json());' },
    { item: 'app.listen()', tech: 'Node.js', uso: 'Inicia servidor em porta', ex: 'app.listen(3000);' },
    { item: 'Event Loop', tech: 'Node.js', uso: 'Loop que gerencia operacoes assincronas', ex: 'process.nextTick(() =&gt; {});' },
    { item: 'Buffer', tech: 'Node.js', uso: 'Armazena dados binarios brutos', ex: 'Buffer.from(&apos;hello&apos;);' },
    { item: 'fs', tech: 'Node.js', uso: 'Modulo para operacoes de sistema de arquivos', ex: 'fs.readFile(&apos;data.txt&apos;, &apos;utf8&apos;);' },
  ];

  return (
    <div>
      <SectionHeader
        number={36}
        title='Tabela-Resumo'
        subtitle='Referencia rapida dos itens mais importantes das 7 tecnologias: HTML, CSS, JavaScript, React, TypeScript, Next.js e Node.js'
      />

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto'>
        <table className='w-full min-w-[700px] text-sm'>
          <thead>
            <tr className='border-b-2 border-emerald-500 text-left'>
              <th className='py-3 px-3 font-bold text-emerald-700'>Item</th>
              <th className='py-3 px-3 font-bold text-emerald-700'>Tecnologia</th>
              <th className='py-3 px-3 font-bold text-emerald-700'>Para que serve</th>
              <th className='py-3 px-3 font-bold text-emerald-700'>Exemplo rapido</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className='border-b border-gray-100 hover:bg-emerald-50 transition-colors'>
                <td className='py-2 px-3 font-mono text-emerald-800 whitespace-nowrap'>{r.item}</td>
                <td className='py-2 px-3'>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    r.tech === 'HTML' ? 'bg-orange-100 text-orange-700' :
                    r.tech === 'CSS' ? 'bg-blue-100 text-blue-700' :
                    r.tech === 'JavaScript' ? 'bg-yellow-100 text-yellow-700' :
                    r.tech === 'React' ? 'bg-cyan-100 text-cyan-700' :
                    r.tech === 'TypeScript' ? 'bg-indigo-100 text-indigo-700' :
                    r.tech === 'Next.js' ? 'bg-gray-100 text-gray-800' :
                    'bg-green-100 text-green-700'
                  }`}>{r.tech}</span>
                </td>
                <td className='py-2 px-3 text-gray-700'>{r.uso}</td>
                <td className='py-2 px-3 font-mono text-xs text-gray-600 whitespace-nowrap'>{r.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

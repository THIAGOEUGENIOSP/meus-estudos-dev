import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section29() {
  return (
    <div>
      <SectionHeader number={29} title='TypeScript: Projeto Pratico' subtitle='tsconfig.json, tipos para API, enums, const assertions e sistema de tipos para e-commerce' />
      <Diagram title='Arquitetura de Tipos do E-Commerce'>
{`ARQUITETURA DE TIPOS - E-COMMERCE:

  Produto (base)              Carrinho                Checkout
  +------------+           +--------------+         +-------------+
  | id         |           | itens[]      |         | pedido      |
  | nome       |<----------+ quantidade   |         | pagamento   |
  | preco      |           | produto      |         | endereco    |
  | categoria  |           +------+-------+         +------+------+
  | estoque    |                  |                        |
  +------+-----+                  |                        |
         |                        v                        v
  ProdutoFisico           CarrinhoItem             Pedido
  ProdutoDigital          +-----------------+      +-------------+
  peso, dimensoes         | produto: Produto |    | id          |
         |                | qtd: number     |    | itens       |
         v                | subtotal()      |    | total       |
  Categoria               +-----------------+    | status      |
  +----------+                                   +-------------+
  | id       |                                         |
  | nome     |                                         v
  | slug     |                                  StatusPedido
  +----------+                                  'novo' | 'pago' |
                                                'enviado' | 'entregue'

FLUXO: Produto -> adiciona Carrinho -> Checkout -> Pedido`}
      </Diagram>
      <TopicCard
        title='tsconfig.json e Tipos para API Responses'
        definition='tsconfig.json e como a planta da casa — define as regras de construcao. Tipos para API responses sao como etiquetas nas encomendas — cada resposta tem o formato garantido. Sem tipos, API e como caixa sem etiqueta: voce nunca sabe o que vem dentro.'
        whenToUse={['strict: true em todo projeto — protecao maxima', 'Tipos para cada resposta de API — GET, POST, PUT', 'types separados para resposta e payload de requisicao']}
        whenNotToUse={['noImplicitAny: false — desativa protecao fundamental', 'any na resposta da API — perde todo o beneficio', 'tsconfig com target muito antigo — perde recursos']}
        code={`// tsconfig.json essencial
// {
//   'compilerOptions': {
//     'target': 'ES2020',
//     'module': 'ESNext',
//     'strict': true,
//     'noImplicitAny': true,
//     'strictNullChecks': true,
//     'outDir': './dist',
//     'rootDir': './src',
//     'baseUrl': './src',
//     'paths': {'@/*': ['./*']}
//   },
//   'include': ['src/**/*'],
//   'exclude': ['node_modules', 'dist']
// }

// Tipos para API
interface ApiResposta<T> {
  dados: T;
  status: number;
  mensagem: string;
}

interface ProdutoApi {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

type RespostaProdutos = ApiResposta<ProdutoApi[]>;
type RespostaProduto = ApiResposta<ProdutoApi>;

// Uso com fetch tipado
async function buscarProdutos(): Promise<RespostaProdutos> {
  const res = await fetch('/api/produtos');
  return res.json(); // TS verifica o formato!
}`}
        result={`RespostaProdutos = {
  dados: [{ id: 1, nome: 'Camiseta', preco: 49.90, estoque: 10 }],
  status: 200,
  mensagem: 'OK'
}`}
        errors={["Property 'dados' does not exist — tipo da resposta nao definido", "Object is possibly null — strictNullChecks ativo", "noImplicitAny — variavel sem tipo em strict mode"]}
        tips={['strict: true ativa todas as verificacoes de uma vez', 'Crie tipos para cada endpoint — nunca confie no any', 'ApiResposta<T> e generico — reutilize para qualquer endpoint']}
        checklist={['strict: true no tsconfig?', 'Tipos para cada resposta de API?', 'noImplicitAny ativo?']}
      >
        <p className='text-sm text-gray-600'>Analogia: tsconfig.json e como a planta do predio — define as regras da obra. Tipos de API sao como etiquetas de correio: sem elas, voce abre a caixa e nao sabe o que veio. strict: true e como construir com cinto de seguranca: chato no inicio, salva no final.</p>
      </TopicCard>
      <TopicCard
        title='Enums e Const Assertions'
        definition='Enums sao como cards de um jogo — cada valor tem nome e numero. Const assertions sao como lacrar um documento — fica imutavel e literal. Prefira const assertions a enums: mais leves, mais previsíveis, sem surpresas em runtime.'
        whenToUse={['Const assertion (as const) para valores fixos imutaveis', 'Objeto const para mapas de valores quando precisa de runtime', 'String enum so quando precisa de iteracao ou reverse mapping']}
        whenNotToUse={['Numeric enum — reverse mapping confuso e bug-prone', 'Const enum com isolatedModules — problema de compilacao', 'Enum para dois valores — use literal type direto']}
        code={`// CONST ASSERTION: imutavel e literal
const CATEGORIAS = {
  eletronicos: 'eletronicos',
  roupas: 'roupas',
  livros: 'livros',
} as const;

// Tipo deriva do objeto!
type Categoria = typeof CATEGORIAS[keyof typeof CATEGORIAS];
// 'eletronicos' | 'roupas' | 'livros'

// Acesso seguro
function filtrar(cat: Categoria) {
  // so aceita os 3 valores
}
filtrar(CATEGORIAS.eletronicos); // OK
// filtrar('brinquedos'); // ERRO!

// ENUM (quando necessario)
enum StatusPedido {
  Novo = 'NOVO',
  Pago = 'PAGO',
  Enviado = 'ENVIADO',
  Entregue = 'ENTREGUE',
}

// PREFERENCIA: const assertion > string enum
// Razao: mais simples, sem runtime surprise,
// funciona com isolatedModules`}
        result={`Categoria = 'eletronicos' | 'roupas' | 'livros'
StatusPedido.Novo = 'NOVO'
CATEGORIAS.eletronicos = 'eletronicos'`}
        errors={["Cannot assign to 'eletronicos' — as const e imutavel", "Const enum inlining issue — evitar com isolatedModules", "Assignment to readonly — propriedade e so-leitura"]}
        tips={['as const + typeof + keyof e a combinacao sagrada do TS', 'Derive tipos do objeto const — nao duplique strings', 'String enums se precisar; nunca numeric enums']}
        checklist={['Usou as const em vez de enum?', 'Tipo derivado do objeto com typeof/keyof?', 'Evitou numeric enums?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Enums sao como crachas numerados — cada pessoa tem seu numero. Const assertions sao como lacrar um contrato — nao muda mais. Prefira as const: e como escrever na pedra em vez de papel — imutavel e claro.</p>
      </TopicCard>
      <CodeBlock
        title='Projeto: Sistema de Tipos para E-Commerce'
        language='typescript'
        code={`// === SISTEMA DE TIPOS: E-COMMERCE ===

// 1. Base: Produto com discriminated union
type Categoria = 'eletronicos' | 'roupas' | 'livros';

interface ProdutoBase {
  id: number;
  nome: string;
  preco: number;
  categoria: Categoria;
  estoque: number;
}

interface ProdutoFisico extends ProdutoBase {
  tipo: 'fisico';
  peso: number;
  dimensoes: { largura: number; altura: number; };
}

interface ProdutoDigital extends ProdutoBase {
  tipo: 'digital';
  tamanhoMB: number;
  urlDownload: string;
}

type Produto = ProdutoFisico | ProdutoDigital;

// 2. Carrinho com generics
interface CarrinhoItem<T extends Produto = Produto> {
  produto: T;
  quantidade: number;
}

interface Carrinho<T extends Produto = Produto> {
  itens: CarrinhoItem<T>[];
  adicionar(produto: T, qtd: number): void;
  remover(produtoId: number): void;
  total(): number;
}

// 3. Checkout e Pedido
type DadosPagamento = {
  metodo: 'cartao' | 'pix' | 'boleto';
  parcelas?: number;
};

type Endereco = {
  cep: string; rua: string; numero: number;
  cidade: string; estado: string;
};

type DadosCheckout = {
  pagamento: DadosPagamento;
  endereco: Endereco;
  cupom?: string;
};

// 4. Status com const assertion
const STATUS_PEDIDO = {
  novo: 'NOVO',
  pago: 'PAGO',
  enviado: 'ENVIADO',
  entregue: 'ENTREGUE',
  cancelado: 'CANCELADO',
} as const;

type StatusPedido =
  typeof STATUS_PEDIDO[keyof typeof STATUS_PEDIDO];

interface Pedido {
  id: number;
  itens: CarrinhoItem[];
  total: number;
  status: StatusPedido;
  dados: DadosCheckout;
  criadoEm: Date;
}

// 5. Type guards e narrowing
function eFisico(p: Produto): p is ProdutoFisico {
  return p.tipo === 'fisico';
}

function calcularFrete(produto: Produto): number {
  if (eFisico(produto)) return produto.peso * 5;
  return 0; // digital: sem frete
}

// 6. API tipada
interface ApiResposta<T> {
  dados: T; status: number; mensagem: string;
}

async function buscarProdutos(): Promise<ApiResposta<Produto[]>> {
  const res = await fetch('/api/produtos');
  return res.json();
}

// 7. Checkout
function checkout(
  carrinho: Carrinho,
  dados: DadosCheckout
): Pedido {
  const total = carrinho.total();
  return {
    id: Date.now(),
    itens: carrinho.itens,
    total: dados.cupom ? total * 0.9 : total,
    status: STATUS_PEDIDO.novo,
    dados,
    criadoEm: new Date(),
  };
}`}
      />
      <TopicCard
        title='Projeto: Pontos-Chave do Sistema de Tipos'
        definition='O sistema de tipos para e-commerce une tudo que aprendemos: generics para flexibilidade, discriminated unions para variacoes, utility types para composicao, const assertions para imutabilidade, e type guards para seguranca. E como montar um quebra-cabeca: cada peca encaixa.'
        whenToUse={['Discriminated union para ProdutoFisico vs ProdutoDigital', 'Generics para Carrinho funcionar com qualquer Produto', 'Utility types (Pick/Omit/Partial) para composicao sem repeticao', 'as const para status imutaveis e derivados']}
        whenNotToUse={['any em qualquer lugar do sistema — quebra a cadeia', 'Tipo duplicado — derive com Pick/Omit/typeof', 'Enum numerico para status — use const assertion']}
        code={`// PONTO-CHAVE 1: Discriminated Union
// ProdutoFisico e ProdutoDigital compartilham
// campo 'tipo' como discriminador
// TS faz narrowing automatico!

// PONTO-CHAVE 2: Generics no Carrinho
// Carrinho<T extends Produto> funciona com
// qualquer subtipo de Produto

// PONTO-CHAVE 3: Utility Types
// DadosCheckout = Pick + Omit + composicao
// Nao repita campos — derive dos tipos base

// PONTO-CHAVE 4: Const Assertion
// STATUS_PEDIDO as const gera tipos literais
// typeof + keyof deriva a union automaticamente

// PONTO-CHAVE 5: Type Guards
// eFisico() retorna p is ProdutoFisico
// TS confia no guard e faz narrowing

// PONTO-CHAVE 6: ApiResposta<T>
// Generic para tipar qualquer resposta de API
// Nunca use any no fetch — use T!`}
        result={`Pedido = {
  id: 1714000000,
  itens: [{ produto: {...}, quantidade: 2 }],
  total: 89.91,
  status: 'NOVO',
  dados: { pagamento: {...}, endereco: {...} },
  criadoEm: Date
}`}
        errors={["Property 'peso' does not exist on 'ProdutoDigital' — sem narrowing", "Type 'string' is not assignable to 'StatusPedido' — valor fora do const", "Cannot use 'as const' on a let — so funciona com const"]}
        tips={['Comece pelos tipos base — Produto, depois Carrinho, depois Pedido', 'Discriminated union e o padrao-chave do sistema', 'Derive tipos com typeof/keyof — nunca duplique strings']}
        checklist={['Discriminated union com campo tipo?', 'Generics no Carrinho e API?', 'Utility types para composicao sem repeticao?', 'as const para valores imutaveis?', 'Type guards para narrowing seguro?', 'Nenhum any no sistema?']}
      >
        <p className='text-sm text-gray-600'>Analogia: O sistema de tipos e como o projeto de uma cidade — cada tipo e um bairro, cada guard e o pedagio, cada const assertion e uma lei. Generics sao pontes que ligam bairros diferentes. Discriminated unions sao os enderecos — o campo tipo e o CEP que diz exatamente onde voce esta.</p>
      </TopicCard>
    </div>
  );
}

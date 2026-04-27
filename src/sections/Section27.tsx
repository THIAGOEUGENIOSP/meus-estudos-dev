import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section27() {
  return (
    <div>
      <SectionHeader number={27} title='TypeScript: Fundamentos' subtitle='O que e TS, tipos basicos, type vs interface, union/literal types, assertions e tipos especiais' />
      <Diagram title='Hierarquia de Tipos e Fluxo any vs unknown'>
{`HIERARQUIA DE TIPOS:

        unknown (topo — aceita tudo, usa nada)
           |
        any (escape — aceita tudo, usa tudo)
           |
     +-----+-----+
     |           |
  primitivos    object
  string         |
  number     +---+---+
  boolean    |       |
     |     array   tuple
     |       |
  literal   interface/type
  'abc'       |
     |     union (A | B)
     |
  never (fundo — nao aceita nada)

FLUXO any vs unknown:

  any:    let x: any = 'oi'
          x.toUpperCase()  -- OK (perigoso!)
          x.foo()          -- OK (nao verifica!)

  unknown: let y: unknown = 'oi'
          y.toUpperCase()  -- ERRO!
          if (typeof y === 'string')
            y.toUpperCase() -- OK (narrowing!)`}
      </Diagram>
      <TopicCard
        title='O que e TypeScript e Tipos Basicos'
        definition='TypeScript e um superset do JavaScript — como um capacete no motociclista: protege sem mudar a moto. Tipos basicos sao como tamanhos de camisa: cada dado tem o seu. string, number, boolean, array e tuple sao os essenciais.'
        whenToUse={['TS em todo projeto novo — protege erros em tempo de compilacao', 'string para texto, number para numeros, boolean para sim/nao', 'array com tipo[] para listas, tuple para pares fixos']}
        whenNotToUse={['any — desativa a protecao, vira JS sem capacete', 'TS para scripts de uma linha — custo > beneficio', 'tuple para listas variaveis — use array']}
        code={`// Tipos basicos
let nome: string = 'Ana';
let idade: number = 25;
let ativo: boolean = true;

// Array: duas notacoes
let notas: number[] = [8, 9, 7];
let fotos: Array<string> = ['a.jpg'];

// Tuple: comprimento e tipo fixos
let par: [string, number] = ['Ana', 25];
// par[0] sempre string, par[1] sempre number

// Tipos inferidos — TS descobre sozinho
let x = 10;       // number (inferido)
let s = 'hello';  // string (inferido)
// Nao precisa anotar tudo!`}
        result={`nome: Ana
idade: 25
ativo: true
notas: [8, 9, 7]
par: ['Ana', 25]`}
        errors={["Type 'string' is not assignable to type 'number' — tipo errado", "Variable 'x' is used before being assigned — sem inicializacao", "Tuple type has no element at index 2 — acesso fora do tuple"]}
        tips={['Deixe TS inferir quando possivel — menos codigo, mesma seguranca', 'Tuple e como uma ficha: campos fixos em ordem', 'Prefira number[] a Array<number> — mais legivel']}
        checklist={['Tipos basicos declarados corretamente?', 'Arrays com tipo[] em vez de any[]?', 'Tuples so para pares/triplos fixos?']}
      >
        <p className='text-sm text-gray-600'>Analogia: TS e como o autocorrect do celular — ele corrige antes de enviar. Tipos basicos sao como caixas de correio: cada uma so aceita um tipo de carta. Se colocar numero na caixa de cartas, ele avisa.</p>
      </TopicCard>
      <TopicCard
        title='type vs interface, Union e Literal Types'
        definition='type e interface sao como moldes de bolo — definem a forma. type e mais flexivel (uniao, intersecao), interface e mais extensivel (extends). Union types sao como ingressos: aceita A OU B. Literal types sao como CPF: um valor exato.'
        whenToUse={['type para unions, intersecoes e tipos primitivos', 'interface para objetos que serao estendidos', 'union (A | B) para valores mutiplos', "literal ('asc' | 'desc') para valores exatos"]}
        whenNotToUse={['interface para union — nao suporta', 'type para classes que serao implementadas — interface e melhor', 'union ampla demais — vira any disfarçado']}
        code={`// type: flexivel
type Status = 'ativo' | 'inativo' | 'pendente';
type Id = string | number;

type Usuario = {
  nome: string;
  idade: number;
  status: Status;
};

// interface: extensivel
interface Produto {
  nome: string;
  preco: number;
}

interface ProdutoComDesconto extends Produto {
  desconto: number;
}

// Union type: aceita A ou B
function exibir(id: Id): string {
  if (typeof id === 'string') return id.toUpperCase();
  return id.toFixed(2); // number
}

// Literal type: valor exato
type Direcao = 'esquerda' | 'direita';
function mover(dir: Direcao) {
  // so aceita 'esquerda' ou 'direita'
}
mover('esquerda'); // OK
// mover('cima'); // ERRO!`}
        result={`exibir('abc') = 'ABC'
exibir(3.14) = '3.14'`}
        errors={["Type '\"cima\"' is not assignable to type 'Direcao' — literal invalido", "Interface cannot extend union type — use type com &", "Duplicate identifier 'Produto' — interface merge, type nao"]}
        tips={['Use type por padrao — interface so quando precisa de extends', 'Literal types substituem enums simples', 'Union com null (string | null) e o padrao optional']}
        checklist={['type para unions e intersecoes?', 'interface para objetos extensíveis?', 'Literal types para valores exatos?']}
      >
        <p className='text-sm text-gray-600'>Analogia: type e como canivete suico — faz tudo. Interface e como lego — encaixa e expande. Union e como porteiro com lista: aceita A ou B, nada mais. Literal e como senha — so aquele valor exato abre.</p>
      </TopicCard>
      <TopicCard
        title='Type Assertions e Tipos Especiais'
        definition='Type assertion e como trocar de uniforme — voce diz ao TS &quot;confia em mim, sei o tipo&quot;. any e como dirigir sem cinto — nao protege nada. unknown e como caixa forte — precisa provar que tem a chave. never e como buraco negro — nada sai. void e como receber nada de volta.'
        whenToUse={['as Tipo para narrowing quando voce sabe mais que o TS', 'unknown para valores externos (API, input) — obriga verificacao', 'never em switch exhaustivo ou funcao que nunca retorna', 'void para funcoes que nao retornam valor util']}
        whenNotToUse={['as paraconverter tipos incompativeis — use unknown no meio', 'any — desativa tudo, e o escape de emergencia', 'never como retorno quando a funcao pode retornar']}
        code={`// Type assertion: *voce* garante o tipo
const input = document.getElementById('campo') as HTMLInputElement;
input.value = 'ok'; // TS sabe que e HTMLInputElement

// CUIDADO: assertion nao converte em runtime!
const x = 'hello' as number; // ERRO: incompativel
// Para forcar: 'hello' as unknown as number (perigoso!)

// any: desativa verificacao
let flex: any = 42;
flex = 'mudei'; // OK — qualquer coisa
flex.toUpperCase(); // OK — mas pode quebrar!

// unknown: exige verificacao
let seguro: unknown = 42;
// seguro.toFixed(); // ERRO!
if (typeof seguro === 'number') {
  seguro.toFixed(); // OK apos narrowing
}

// never: tipo impossivel
function erro(msg: string): never {
  throw new Error(msg); // nunca retorna
}

// void: retorno ignorado
function log(msg: string): void {
  console.log(msg); // nao retorna nada util
}`}
        result={`input.value = 'ok'
flex = 'mudei' (any)
seguro.toFixed() = '42' (apos narrowing)`}
        errors={["Conversion of type 'string' to type 'number' may be a mistake — assertion perigosa", "Object is of type 'unknown' — precisa de narrowing", "Variable 'x' is used before being assigned — void vs undefined"]}
        tips={['Prefira unknown a any — unknown obriga verificacao', 'Type assertion NAO converte em runtime — so informa o TS', 'never em switch default para garantir cobertura total']}
        checklist={['Usa unknown em vez de any para valores externos?', 'Assertion com as so quando tem certeza?', 'never no default de switch para exaustividade?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Type assertion e como dizer &quot;confia em mim&quot; ao porteiro — ele deixa passar, mas se estiver errado, o problema e seu. any e como dirigir sem cinto: liberdade total, risco total. unknown e como raio-x: so abre depois de verificar. never e como beco sem saida — nada entra e sai.</p>
      </TopicCard>
    </div>
  );
}

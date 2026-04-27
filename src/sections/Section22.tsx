import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section22() {
  return (
    <div>
      <SectionHeader number={22} title='JS: ES6+ e Módulos' subtitle='Destructuring avançado, optional chaining, nullish coalescing, classes, módulos e novas estruturas' />
      <Diagram title='Fluxo de Módulos & Map vs Set vs Object'>
{`FLUXO DE MODULOS:

  math.js          app.js
+------------+   +------------+
| export     |   | import     |
| function   |-->| { soma }   |
| soma()     |   | from       |
|            |   | './math'   |
+------------+   +------------+

  Default:        Named:
  export default  export { a, b }
  import X        import { a, b }

MAP vs SET vs OBJECT:
+----------+----------+----------+
| Feature  | Map      | Set      |
+----------+----------+----------+
| Chave    | qualquer | (nenhuma)|
| Duplicata| sobrescr.| Nao      |
| Ordem    | insercao | insercao|
| Size     | .size    | .size   |
| Iterar   | for..of  | for..of |
+----------+----------+----------+
| Object   | chaves string/Symbol  |
| Ordem     | nao garantida        |
| Tamanho   | Object.keys().len   |
| Iterar    | for..in              |
+----------+----------+----------+`}
      </Diagram>
      <TopicCard
        title='Destructuring Avançado, Optional Chaining e Nullish Coalescing'
        definition='Destructuring avançado desmonta objetos como Lego. Optional chaining (?.) é como perguntar com educação — &quot;existe?&quot; antes de acessar. Nullish coalescing (??) é o &quot;ou&quot; que só ativa com null/undefined — não com 0 ou vazio.'
        whenToUse={['?. para acessar propriedades profundas com segurança', '?? para fallbacks que respeitam 0 e string vazia', 'Destructuring com valores padrão para configs']}
        whenNotToUse={['?. para esconder erros de lógica — undefined pode ser bug', '?? quando quer fallback para valores falsy — use ||', 'Destructuring muito profundo — fica ilegível']}
        code={`// Destructuring com valores padrao
const { tema = 'claro', lang = 'pt' } = config;

// Destructuring aninhado
const { endereco: { cidade } = {} } = usuario;
// se endereco nao existe, NAO quebra

// Optional chaining — acesso seguro
const rua = usuario?.endereco?.rua;
// undefined se qualquer parte for null/undefined

// Optional chaining em funcao
const nome = usuario?.getNome?.();
// undefined se metodo nao existe

// Nullish coalescing — fallback inteligente
const qtd = estoque ?? 10;
// 10 so se estoque for null/undefined
// DIFERENTE de ||: 0 ?? 10 => 0 (nao 10!)

// Combinando os tres
const titulo = dados?.config?.titulo ?? 'Padrao';`}
        result={`'claro'
'pt'
undefined
undefined
0
'Padrao'`}
        errors={['Cannot destructure property of null — sem valor padrão no aninhado', '?. em lado esquerdo de atribuição — não funciona', '?? com || — use ?? para nullish, || para falsy']}
        tips={['?. retorna undefined, não null — consistência', 'Use { prop = default } para proteger destructuring', '?? é mais seguro que || para números (0 é valido!)']}
        checklist={['Usou ?. para acesso profundo?', 'Usou ?? em vez de || para números?', 'Destructuring aninhado tem fallback?']}
      >
        <p className='text-sm text-gray-600'>Analogia: ?. é como bater antes de entrar — se ninguém abre, vai embora sem quebrar a porta. ?? é como pedir um prato — só aceita o da casa se o seu for null.</p>
      </TopicCard>
      <TopicCard
        title='Módulos: import e export'
        definition='Módulos são departamentos de uma empresa — cada um tem sua função e exporta serviços. Named exports são como crachás nomeados, default export é como o chefe — só um por departamento.'
        whenToUse={['Named exports para utilitários múltiplos', 'Default export para o componente/função principal', 'Re-export para agrupar (barrel files)']}
        whenNotToUse={['Misturar named e default sem critério', 'Importar tudo (*) — polui o namespace', 'Circular dependencies — A import B e B import A']}
        code={`// math.js — Named exports
export function soma(a, b) { return a + b; }
export const PI = 3.14;
export function multiplica(a, b) { return a * b; }

// App.js — Named imports
import { soma, PI } from './math.js';
soma(2, 3); // 5

// Alias no import
import { soma as add } from './math.js';

// Default export (UM por arquivo)
// logger.js
export default function logger(msg) {
  console.log('[LOG]', msg);
}

// Import default (sem chaves)
import logger from './logger.js';

// Import tudo como namespace
import * as math from './math.js';
math.soma(1, 2); // 3

// Re-export (barrel)
export { soma, PI } from './math.js';
export { default as logger } from './logger.js';`}
        result={`5
3
[LOG] Olá mundo`}
        errors={['SyntaxError: Unexpected token — módulo sem type="module" no HTML', 'Circular dependency — módulos se importam mutuamente', 'Default import com chaves — pega undefined']}
        tips={['Named = função utilitária, Default = classe/componente principal', 'Um default por arquivo — consistência', 'Barrel files (index.js) agrupam exports de uma pasta']}
        checklist={['Default export é o principal do arquivo?', 'Named exports são utilitários?', 'Evitou circular dependencies?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Named import é como chamar pelo nome — &quot;traga a soma&quot;. Default import é como pedir o chefe — &quot;traga o responsável&quot;. Barrel é como catálogo — um endereço para todos.</p>
      </TopicCard>
      <TopicCard
        title='Classes, Map, Set e Symbol'
        definition='Classes são moldes de biscoito — definem formato e a fábrica (constructor) cria cada biscoito. Map é um dicionário com chaves flexíveis. Set é como uma lista de CPFs — sem duplicatas. Symbol é uma impressão digital — única e inconfundível.'
        whenToUse={['Classes para modelar entidades com estado e comportamento', 'Map para dicionários com chaves não-string', 'Set para coleções sem duplicatas', 'Symbol para chaves de objeto únicas']}
        whenNotToUse={['Classes para objetos simples — prefira objetos literais', 'Map quando chaves são sempre strings — Object basta', 'Set se precisa de valores duplicados', 'Symbol para chaves que precisam ser listadas']}
        code={`// Classe com constructor, metodo e static
class Animal {
  constructor(nome) {
    this.nome = nome;
  }
  falar() {
    return \`\${this.nome} faz ruido\`;
  }
  static criar(nome) {
    return new Animal(nome);
  }
}

// Heranca com extends
class Cachorro extends Animal {
  falar() {
    return \`\${this.nome} late!\`;
  }
}
const rex = new Cachorro('Rex');
rex.falar(); // 'Rex late!'

// Map — chaves flexiveis
const mapa = new Map();
mapa.set('chave', 'valor');
mapa.set(42, 'numero como chave');
mapa.set({ id: 1 }, 'objeto como chave');
mapa.size;   // 3
mapa.get(42); // 'numero como chave'

// Set — sem duplicatas
const nums = new Set([1, 2, 2, 3]);
nums; // Set {1, 2, 3}
nums.has(2); // true
nums.add(4);

// Symbol — chave unica
const id = Symbol('id');
const obj = { [id]: 123, nome: 'Ana' };
obj[id]; // 123
Object.keys(obj); // ['nome'] — Symbol NAO aparece!`}
        result={`'Rex late!'
3
'numero como chave'
Set {1, 2, 3}
true
123
['nome']`}
        errors={['Must call super() in derived constructor — esqueceu super no extends', 'Map.get com chave objeto — usa referência diferente', 'Symbol não aparece em Object.keys — use Object.getOwnPropertySymbols']}
        tips={['super() no constructor da classe filha antes de usar this', 'Map mantém ordem de inserção — Object não', 'Set é ótimo para remover duplicatas: [...new Set(arr)]']}
        checklist={['Usou super() no constructor da subclasse?', 'Map para chaves não-string?', 'Set para remover duplicatas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Classe é molde de biscoito, extends é herança de receita — adiciona cobertura. Map é armário com etiquetas flexíveis. Set é lista VIP — sem repetir convidado. Symbol é tatuagem invisível — existe, mas não aparece no espelho comum.</p>
      </TopicCard>
    </div>
  );
}

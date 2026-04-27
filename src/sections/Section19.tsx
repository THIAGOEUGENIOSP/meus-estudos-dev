import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section19() {
  return (
    <div>
      <SectionHeader number={19} title='JS: Estruturas' subtitle='Controle de fluxo, arrays, objetos, desestruturação e spread/rest' />
      <Diagram title='Metodos de Array (fluxo de dados) & Spread vs Rest'>
{`+--------+    +--------+    +--------+
| Array  |    | Array  |    | Array  |
| orig.  | -> | .map() | -> | novo   |
|        |    |        |    | mesmo  |
|        |    |        |    | tam.   |
+--------+    +--------+    +--------+
  |                            |
  v                            v
+--------+    +--------+    +--------+
| Array  |    | Array  |    | Array  |
| orig.  | -> |.filter | -> | menor  |
|        |    |   ()   |    | ou =   |
+--------+    +--------+    +--------+
  |                            |
  v                            v
+--------+    +--------+    +--------+
| Array  |    | Array  |    | Unico  |
| orig.  | -> |.reduce | -> | valor  |
|        |    |   ()   |    |        |
+--------+    +--------+    +--------+

SPREAD (...) vs REST (...)
+-------------------------------------------+
| SPREAD: EXPANDE um array em elementos     |
| [...arr1, ...arr2] => [1,2,3,4]          |
|                                           |
| REST: AGRUPA elementos em um array        |
| function soma(...nums) => nums = [1,2,3]  |
+-------------------------------------------+`}
      </Diagram>
      <TopicCard
        title='Controle de Fluxo: if/else, switch, loops'
        definition='Desvios e repetições no código. if/else é como uma encruzilhada — escolhe um caminho. switch é como um painel de elevador — cada botão leva a um andar. Loops são esteiras que repetem até parar.'
        whenToUse={['if/else para 2-3 condições', 'switch para muitos casos com mesmo tipo', 'for...of para iterar valores de arrays', 'for...in para iterar chaves de objetos']}
        whenNotToUse={['switch com condições complexas', 'for clássico quando for...ofResolve', 'while sem condição de parada clara — risco de loop infinito']}
        code={`// if / else if / else
let nota = 7;
if (nota >= 9) {
  console.log('Excelente');
} else if (nota >= 7) {
  console.log('Bom');
} else {
  console.log('Precisa melhorar');
}

// switch — compara com ===
let dia = 'seg';
switch (dia) {
  case 'seg': console.log('Inicio'); break;
  case 'sex': console.log('Sextou!'); break;
  default: console.log('Dia normal');
}

// for...of (valores) vs for...in (chaves)
const frutas = ['maca', 'banana'];
for (const fruta of frutas) {
  console.log(fruta); // 'maca', 'banana'
}
for (const indice in frutas) {
  console.log(indice); // '0', '1'
}

// while — cuidado com loop infinito!
let i = 0;
while (i < 3) { i++; }`}
        result={`Bom
Inicio
maca
banana
0
1`}
        errors={['Esqueceu break no switch — executa todos os cases (fall-through)', 'Loop infinito sem condição de saída', "for...in em array retorna índices como strings — use for...of"]}
        tips={['Prefira for...of para arrays, for...in para objetos', 'Nunca esqueça break no switch', 'Use while quando não souber quantas iterações']}
        checklist={['Usou for...of para arrays?', 'Colocou break em cada case do switch?', 'Tem condição de saída no while?']}
      >
        <p className='text-sm text-gray-600'>Analogia: switch sem break é como um escorregador — cai de case em case até o fim!</p>
      </TopicCard>
      <TopicCard
        title='Arrays e seus Métodos'
        definition='Arrays são trens com vagões numerados. Os métodos são máquinas que transformam o trem: map pinta cada vagão, filter remove vagões, reduce funde tudo num único valor.'
        whenToUse={['map para transformar cada item', 'filter para selecionar itens', 'reduce para acumular em um valor', 'find para buscar o primeiro que satisfaz', 'some/every para checagens booleanas']}
        whenNotToUse={['forEach se precisa de resultado novo (use map)', 'splice em conjunto com map/filter (imutabilidade)', 'reduce para operações simples (use map + filter)']}
        code={`const nums = [1, 2, 3, 4, 5];

// map: transforma cada item (retorna novo array)
const dobros = nums.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter: seleciona itens (retorna novo array)
const pares = nums.filter(n => n % 2 === 0);
// [2, 4]

// reduce: acumula em um valor
const soma = nums.reduce((acc, n) => acc + n, 0);
// 15

// find: primeiro que satisfaz
const grande = nums.find(n => n > 3);
// 4

// some: algum satisfaz? / every: todos?
nums.some(n => n > 4);   // true
nums.every(n => n > 0);   // true

// forEach: executa para cada (sem retorno)
nums.forEach(n => console.log(n));`}
        result={`[2, 4, 6, 8, 10]
[2, 4]
15
4
true
true
1 2 3 4 5`}
        errors={['Cannot read property of undefined — find retornou undefined e acessou propriedade', 'forEach não retorna array — não encadeie com map', 'reduce sem valor inicial pode pular primeiro elemento']}
        tips={['Sempre forneça valor inicial ao reduce', 'Encadeie: arr.filter(...).map(...) — lê como português!', 'find retorna undefined se não acha — verifique antes de acessar']}
        checklist={['Usou map/filter ao invés de forEach com push?', 'Passou valor inicial no reduce?', 'Encadeou map e filter em vez de criar variáveis intermediárias?']}
      >
        <p className='text-sm text-gray-600'>Analogia: map = fotocopiadora que transforma cada página. filter = peneira que deixa passar só o que presta. reduce = caldeirão que funde tudo.</p>
      </TopicCard>
      <TopicCard
        title='Objetos, Desestruturação e Spread/Rest'
        definition='Objetos são dicionários — cada propriedade é uma palavra com definição. Desestruturação é abrir a mala e tirar só o que precisa. Spread espalha, Rest junta.'
        whenToUse={['Desestruturação para extrair propriedades', 'Spread para copiar/mergear objetos e arrays', 'Rest params para funções com argumentos variáveis']}
        whenNotToUse={['Spread em objetos muito grandes (performance)', 'Desestruturação profunda — fica ilegível', 'Rest params quando o número de args é fixo']}
        code={`// Objeto basico
const pessoa = {
  nome: 'Ana',
  idade: 25,
  cidade: 'SP'
};

// Desestruturacao — tira da mala
const { nome, idade } = pessoa;
// nome = 'Ana', idade = 25

// Desestruturacao com rename
const { nome: n } = pessoa;
// n = 'Ana'

// Desestruturacao de array (posicional)
const cores = ['verde', 'azul', 'roxo'];
const [primeira, , terceira] = cores;
// primeira = 'verde', terceira = 'roxo'

// Spread — espalha elementos
const arr1 = [1, 2];
const arr2 = [3, 4];
const junto = [...arr1, ...arr2]; // [1,2,3,4]

// Spread em objeto (merge)
const extras = { ...pessoa, ativo: true };

// Rest params — agrupa os sobrantes
function soma(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
soma(1, 2, 3); // 6`}
        result={`'Ana'
25
'Verde'
'roxo'
[1, 2, 3, 4]
{nome: 'Ana', idade: 25, cidade: 'SP', ativo: true}
6`}
        errors={['Cannot destructure property of undefined — objeto não existe', 'Spread com propriedades repetidas: a última vence', 'Rest param deve ser o último parâmetro']}
        tips={['Desestruturação em parâmetros de função: function f({ nome }) { }', 'Spread é cópia rasa — objetos internos são compartilhados', 'Use { ...defaults, ...config } para configurar com defaults']}
        checklist={['Usou desestruturação em vez de objeto.prop?', 'Usou spread em vez de Object.assign?', 'Rest param é o último da lista?']}
      >
        <p className='text-sm text-gray-600'>Analogia: ... é como manteiga — espalha (spread) quando está fora da função, junta (rest) quando está dentro como parâmetro.</p>
      </TopicCard>
    </div>
  );
}

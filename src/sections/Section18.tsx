import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section18() {
  return (
    <div>
      <SectionHeader number={18} title='JS: Fundamentos' subtitle='Variáveis, tipos, operadores, strings e conceitos essenciais do JavaScript' />
      <Diagram title='var vs let vs const & Tipos Primitivos'>
{`+-----------+----------+---------+----------+
| Palavra   | Escopo   | Reatri- | Hoisting |
| -chave    |          | buivel  |          |
+-----------+----------+---------+----------+
| var       | funcao   | Sim     | Sim*     |
| let       | bloco    | Sim     | Nao**    |
| const     | bloco    | Nao***  | Nao**    |
+-----------+----------+---------+----------+
*  hoisted com undefined (TDZ nao existe)
** hoisted mas fica na Temporal Dead Zone
*** a referencia nao reatribui, mas objetos
    mutaveis podem ter propriedades alteradas

+-------------------+---------------------+
| Tipo Primitivo    | Exemplo             |
+-------------------+---------------------+
| string            | 'hello'             |
| number            | 42, 3.14, NaN      |
| boolean           | true / false        |
| undefined         | declarada sem valor |
| null              | intencionalmente    |
|                   | vazio               |
| symbol            | Symbol('id')        |
| bigint            | 9007199254740991n   |
+-------------------+---------------------+`}
      </Diagram>
      <TopicCard
        title='Variáveis: let, const e var'
        definition='Caixas que armazenam dados. Pense como gavetas: var é uma gaveta velha e empoeirada, let é uma gaveta moderna que você pode trocar o conteúdo, e const é uma vitrine — o conteúdo não muda.'
        whenToUse={['let para valores que mudam (contadores, acumuladores)', 'const para valores fixos (configurações, referências)', 'Evite var — só em código legado']}
        whenNotToUse={['const se o valor precisa ser reatribuído', 'let para valores que nunca mudam', 'var em código novo']}
        code={`// const = vitrine, let = gaveta, var = gaveta velha
const PI = 3.14159;       // nunca muda
let contador = 0;         // vai mudar
contador = contador + 1;  // ok, let reatribui

// var: escopo de funcao, vaza pra fora
if (true) {
  var x = 10;  // vaza pra fora do if!
}
console.log(x); // 10 — surpresa!

// const com objeto: referencia fixa, conteudo mutavel
const frutas = ['maca'];
frutas.push('banana');  // ok, muta o array
// frutas = ['pera'];   // Erro! reatribui referencia`}
        result={`3.14159
11
10
['maca', 'banana']`}
        errors={['TypeError: Assignment to constant variable — tentou reatribuir uma const', 'ReferenceError: x is not defined — usou let/const antes de declarar (TDZ)']}
        tips={['Sempre prefira const. Mude para let só quando necessário.', 'var ignora blocos — prefira let com escopo de bloco.', 'const não significa imutável para objetos/arrays!']}
        checklist={['Usou const por padrão?', 'Evitou var?', 'Sabe que const objeto é mutável?']}
      >
        <p className='text-sm text-gray-600'>Analogia: var é como uma varanda aberta — qualquer um acessa. let/const são quartos com porta — só quem está dentro do bloco acessa.</p>
      </TopicCard>
      <TopicCard
        title='Tipos Primitivos e Conversão'
        definition='Os tijolos do JavaScript. Primitivos são valores imutáveis que não são objetos. Conversão de tipos é como traduzir idiomas — às vezes automático (coerção), às vezes manual (explícita).'
        whenToUse={['typeof para verificar o tipo', 'Number(), String(), Boolean() para conversão explícita', 'Coerção implícita em operações numéricas']}
        whenNotToUse={['== sem saber a coerção (prefira ===)', 'Number(undefined) retorna NaN', 'Boolean com objetos sempre é true']}
        code={`// Tipos primitivos
let nome = 'Ana';      // string
let idade = 25;        // number
let ativo = true;      // boolean
let vazio;             // undefined
let nada = null;       // null (intencional)

// Conversao explicita (segura)
Number('42')   // 42
String(42)     // '42'
Boolean(0)     // false
Boolean('')    // false

// Coersao implicita (cuidado!)
'5' + 3        // '53' (concatena!)
'5' - 3        // 2   (converte p/ number)
'5' == 5       // true  (coersao!)
'5' === 5      // false (sem coersao)

// Truthy e Falsy
Boolean(0)      // false
Boolean('')     // false
Boolean(null)   // false
Boolean([])     // true! array vazio é truthy`}
        result={`42
'42'
false
'53'
2
true
false
false
false
false
true`}
        errors={['NaN === NaN retorna false — use Number.isNaN()', "TypeError: Cannot read property of null — verifique antes de acessar", "'5' + 3 vira '53' — confusão de tipos"]}
        tips={['Sempre use === em vez de ==', 'Truthy: qualquer valor que não seja falsy. Falsy: 0, "", null, undefined, NaN, false', 'null == undefined é true, mas null === undefined é false']}
        checklist={['Usou === em vez de ==?', 'Verificou se o valor não é null/undefined antes de acessar?', 'Entende a diferença entre null e undefined?']}
      >
        <p className='text-sm text-gray-600'>Falsos famosos: 0, &quot;&quot;, null, undefined, NaN, false. Todo o resto é truthy — até [] e {}!</p>
      </TopicCard>
      <TopicCard
        title='Operadores e Strings'
        definition='Operadores são verbos da linguagem — comparam, calculam e logam. Strings são textos com superpoderes: template literals permitem interpolar variáveis como mágica.'
        whenToUse={['Template literals para textos com variáveis', 'Operadores lógicos para condições compostas', 'Operador ternário para decisões simples']}
        whenNotToUse={['Operador ternário aninhado — fica ilegível', '+ para concatenar strings (use template literals)', '! em dupla negação desnecessária']}
        code={`// Operadores aritmeticos
10 % 3      // 1 (modulo/resto)
2 ** 3      // 8 (potencia)

// Comparacao
===  // igual estrito (tipo e valor)
!==  // diferente estrito
>   <  >=  <=

// Logicos
&&  // E: ambos verdadeiros
||  // OU: pelo menos um
!   // NAO: inverte

// Operador ternario
let status = idade >= 18 ? 'adulto' : 'menor';

// Template literals
let msg = \`Ola, \${nome}! Voce tem \${idade} anos.\`;

// Metodos de string
'hello'.toUpperCase()     // 'HELLO'
'banana'.includes('nan')  // true
'  espaco  '.trim()       // 'espaco'
'abc'.split('')           // ['a','b','c']`}
        result={`1
8
adulto
Ola, Ana! Voce tem 25 anos.
HELLO
true
espaco
['a','b','c']`}
        errors={['Cannot read property of undefined — encadeie com ?. (optional chaining)', 'Unexpected token — crase fechada antes da hora no template literal']}
        tips={['Use template literals (crase) em vez de concatenar com +', '|| retorna o primeiro truthy, ?? retorna o primeiro definido (não-nullish)', 'O ternário é um if/else de uma linha — não aninhe!']}
        checklist={['Usou template literals em vez de concatenação?', 'Usou === em vez de ==?', 'Sabe a diferença entre || e ?? para fallbacks?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Operadores lógicos são como portas — && é porta AND (ambas abertas), || é porta OR (uma basta). Template literals são como formulários pré-preenchidos.</p>
      </TopicCard>
    </div>
  );
}

import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section20() {
  return (
    <div>
      <SectionHeader number={20} title='JS: Funções e DOM' subtitle='Funções declaradas, arrow, closures, this e manipulação do DOM' />
      <Diagram title='Árvore DOM & Fluxo de Eventos'>
{`       document
          |
       <html>
       /     \\
   <head>   <body>
               |
            <div>
           /     \\
        <p>     <button>
                   |
               "Clique!"

FLUXO DE EVENTOS:
+---------------------------+
| 1. CAPTURING (descendo)   |
|    document -> html ->    |
|    body -> div -> button  |
|                           |
| 2. TARGET (no alvo)       |
|    button dispara evento  |
|                           |
| 3. BUBBLING (subindo)     |
|    button -> div -> body  |
|    -> html -> document    |
+---------------------------+

Event Delegation:
Um listener no ancestral
captura eventos dos filhos
via event.target`}
      </Diagram>
      <TopicCard
        title='Funções: Declaradas, Expressas e Arrow'
        definition='Funções são receitas de bolo — declaradas, expressas ou arrow. Declaradas são levantadas (hoisting), expressas não. Arrow é compacta e não tem this próprio.'
        whenToUse={['Declarada quando precisa de hoisting', 'Arrow para callbacks e métodos curtos', 'Expressa quando quer atribuir a variável']}
        whenNotToUse={['Arrow como método de objeto — this não funciona', 'Arrow quando precisa de arguments', 'Declarada dentro de condicionais (confuso)']}
        code={`// Declarada — hoisted!
saudacao(); // funciona!
function saudacao() {
  return 'Ola!';
}

// Expressa — NAO hoisted
// soma(); // Erro!
const soma = function(a, b) {
  return a + b;
};

// Arrow — sintaxe curta, sem this proprio
const dobro = (n) => n * 2;
// retorno implicito quando tem 1 linha

// Arrow com corpo
const saudar = (nome) => {
  const msg = \`Ola, \${nome}!\`;
  return msg;
};

// CUIDADO: Arrow como metodo
const obj = {
  nome: 'Ana',
  // ERRADO: this nao é obj
  falar: () => this.nome,
  // CERTO: function tradicional
  falarCerto() { return this.nome; }
};`}
        result={`'Ola!'
[Function: soma]
4
'Ola, Ana!'
undefined
'Ana'`}
        errors={['TypeError: soma is not a function — chamou expressa antes de definir', "Arrow this é undefined — não aponta para o objeto", 'Arguments is not defined — arrow não tem arguments']}
        tips={['Arrow funciona como método rápido, mas não como método de objeto com this', 'Use arrow em callbacks: arr.map(n => n * 2)', 'Declarada sofre hoisting — pode chamar antes de definir']}
        checklist={['Sabe quando Arrow perde o this?', 'Não está chamando expressa antes de declarar?', 'Usa arrow em callbacks?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Declarada = funcionário que já está no cargo (hoisting). Expressa = contratado na hora. Arrow = freelancer — não tem vínculo (this) com a empresa.</p>
      </TopicCard>
      <TopicCard
        title='Escopo, Closures, this e bind'
        definition='Escopo é vizinhança — onde a variável mora. Closure é uma geladeira que guarda comida (variáveis) mesmo depois da festa (função) acabar. this é quem chama a função — bind amarra quem é.'
        whenToUse={['Closure para encapsulamento e fábricas', 'bind para fixar this em callbacks', 'call/apply para emprestar métodos']}
        whenNotToUse={['Closure variáveis que mudam — pode pegar valor final', 'bind em arrow — já é fixo', 'this em arrow — não funciona']}
        code={`// Closure: funcao lembra do escopo
function criarContador() {
  let count = 0; // privada!
  return {
    incrementar() { return ++count; },
    atual() { return count; }
  };
}
const c = criarContador();
c.incrementar(); // 1
c.incrementar(); // 2
c.atual();       // 2

// this: depende de QUEM chama
const pessoa = {
  nome: 'Ana',
  saudar() { return \`Ola, \${this.nome}\`; }
};
pessoa.saudar(); // 'Ola, Ana'

// this perdido em callback
const fn = pessoa.saudar;
fn(); // undefined — this perdido!

// bind: amarra o this
const fnBind = pessoa.saudar.bind(pessoa);
fnBind(); // 'Ola, Ana'

// call e apply: chama com this temporario
function apresentar(cidade) {
  return \`\${this.nome} de \${cidade}\`;
}
apresentar.call(pessoa, 'SP');   // 'Ana de SP'
apresentar.apply(pessoa, ['RJ']); // 'Ana de RJ'`}
        result={`1
2
2
'Ola, Ana'
undefined
'Ola, Ana'
'Ana de SP'
'Ana de RJ'`}
        errors={['this é undefined em strict mode solto', 'Closure captura referência, não valor — loop clássico', 'Cannot read property of undefined — this perdido em callback']}
        tips={['Closure é como uma mochila — a função leva variáveis do escopo onde nasceu', 'bind retorna nova função — não modifica a original', 'apply recebe array de argumentos, call recebe lista']}
        checklist={['Entendeu que closure preserva variáveis?', 'Sabe quando this se perde?', 'Usou bind para corrigir this em callbacks?']}
      >
        <p className='text-sm text-gray-600'>Analogia: this é como &quot;eu&quot; — muda dependendo de quem fala. bind é como gravar o nome — &quot;eu SEMPRE sou Ana&quot;.</p>
      </TopicCard>
      <TopicCard
        title='DOM: Seleção, Manipulação e Eventos'
        definition='DOM é a representação do HTML como árvore de objetos. Selecionar é apontar para um nó, manipular é alterar, e eventos são gatilhos — como campainhas que tocam quando algo acontece.'
        whenToUse={['querySelector para seleção CSS-like', 'addEventListener para eventos (nunca onclick no HTML)', 'Event delegation para muitos filhos dinâmicos']}
        whenNotToUse={['innerHTML com dados do usuário (XSS!)', 'getElementById quando precisa de CSS complexo', 'Muitos listeners individuais — use delegation']}
        code={`// Selecao
const btn = document.querySelector('#meu-btn');
const itens = document.querySelectorAll('.item');

// Manipulacao
const div = document.createElement('div');
div.textContent = 'Novo conteudo';     // seguro!
div.classList.add('ativo');
div.classList.toggle('destaque');
document.body.appendChild(div);

// innerHTML — CUIDADO com XSS
// div.innerHTML = inputDoUsuario; // PERIGOSO!
div.textContent = inputDoUsuario;      // SEGURO

// Eventos
btn.addEventListener('click', (e) => {
  console.log('Clicou!', e.target);
});

// Event Delegation — 1 listener, muitos alvos
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('feito');
  }
});

// Remover listener
function handleClick() { /* ... */ }
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick);`}
        result={`<div class="ativo destaque">Novo conteudo</div>
Clicou! <button id="meu-btn">
<li class="feito">Item 1</li>`}
        errors={['Cannot read property of null — seletor não achou elemento', 'innerHTML com input do usuário = vulnerabilidade XSS', 'addEventListener com arrow não pode ser removido (referência anônima)']}
        tips={['Sempre prefira textContent a innerHTML para dados do usuário', 'Event delegation: 1 listener no pai em vez de N nos filhos', 'Guarde referência da função para poder remover o listener']}
        checklist={['Usou textContent em vez de innerHTML?', 'Usou delegation para listas dinâmicas?', 'Verificou se o elemento existe antes de manipular?']}
      >
        <p className='text-sm text-gray-600'>Analogia: querySelector é como buscar alguém pelo nome na lista de presença. Event delegation é como um porteiro — um só vigia a porta, não precisa de um por morador.</p>
      </TopicCard>
    </div>
  );
}

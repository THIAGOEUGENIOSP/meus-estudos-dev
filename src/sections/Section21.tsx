import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section21() {
  return (
    <div>
      <SectionHeader number={21} title='JS: Assíncrono' subtitle='Callbacks, Promises, async/await, fetch e o event loop' />
      <Diagram title='Estados de Promise & Event Loop'>
{`PROMISE — Maquina de estados:

  pending  ---- resolve() --> fulfilled
    |                         |
    |                         v
    +---- reject() -----> rejected

  .then()  -> encadeia fulfilled
  .catch() -> captura rejected
  .finally() -> executa sempre

EVENT LOOP — O maestro:

+-------------------+     +------------+
| Call Stack        |     | Microqueue |
| (pilha de exec.)  |<----| (Promises) |
+-------------------+     +------------+
        ^
        |                    +------------+
        +--------------------| Macroqueue |
                             | (setTimeout|
                             |  callbacks)|
                             +------------+

Ordem: Sync > Micro > Macro
1. Call Stack esvazia
2. Microqueue promessas rodam
3. Uma macrotarefa roda
4. Volta ao passo 1`}
      </Diagram>
      <TopicCard
        title='Callbacks e Promises'
        definition='Callback é como deixar seu telefone — &quot;te ligo quando pronto&quot;. Promise é como um pedido no restaurante — recebe uma comanda (pending), depois fica pronto (fulfilled) ou queimou (rejected).'
        whenToUse={['Promise para operações assíncronas', 'then/catch para encadear resultados', 'finally para limpeza (fechar loading, etc)']}
        whenNotToUse={['Callback hell — promises aninhadas sem encadeamento', 'Callbacks para lógica sequencial complexa', 'Promise sem catch — erros silenciosos']}
        code={`// Callback classico
function buscarDados(callback) {
  setTimeout(() => {
    callback({ nome: 'Ana' });
  }, 1000);
}

// Callback hell — EVITE!
buscarDados((user) => {
  buscarPedidos(user.nome, (pedidos) => {
    buscarDetalhes(pedidos[0], (detalhe) => {
      // piramide da morte!
    });
  });
});

// Promise — encadeamento limpo
function buscarDadosPromise() {
  return new Promise((resolve, reject) => {
    const sucesso = true;
    setTimeout(() => {
      if (sucesso) resolve({ nome: 'Ana' });
      else reject(new Error('Falhou!'));
    }, 1000);
  });
}

// Encadeando then/catch/finally
buscarDadosPromise()
  .then(user => user.nome)
  .then(nome => nome.toUpperCase())
  .catch(err => console.error(err))
  .finally(() => console.log('Terminou!'));`}
        result={`ANNA
Terminou!`}
        errors={['Unhandled rejection — Promise sem catch', 'Callback hell — pirâmide de callbacks aninhados', 'Esquecer return no then — encadeamento quebra']}
        tips={['Sempre adicione .catch() — rejeição sem handler é erro silencioso', 'Retorne no then para encadear: .then(x => x.nome) não .then(x => { x.nome })', 'finally não recebe argumento — só limpa']}
        checklist={['Tem .catch() em toda Promise?', 'Retorna valores no .then() para encadear?', 'Evitou callback hell?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Callback hell é como passar o telefone de pessoa em pessoa — ninguém entende a cadeia. Promise encadeada é como fila organizada — cada then sabe o que fazer.</p>
      </TopicCard>
      <TopicCard
        title='async/await, fetch e try/catch'
        definition='async/await é açúcar sintático sobre Promises — escreve assíncrono como se fosse síncrono. fetch é o carteiro que busca dados na internet. try/catch é o cinto de segurança — captura erros antes de explodir.'
        whenToUse={['async/await para código assíncrono sequencial', 'fetch para chamadas HTTP', 'try/catch para capturar erros de await']}
        whenNotToUse={['await fora de função async', 'fetch sem verificar response.ok', 'try/catch sem finally para limpeza']}
        code={`// async/await — le como sincrono
async function buscarUsuario() {
  try {
    const resposta = await fetch('/api/user');
    if (!resposta.ok) {
      throw new Error(\`HTTP \${resposta.status}\`);
    }
    const user = await resposta.json();
    return user;
  } catch (err) {
    console.error('Erro:', err.message);
  } finally {
    console.log('Limpeza feita');
  }
}

// fetch com POST
async function criarUsuario(dados) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  return res.json();
}

// Paralelo com Promise.all
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);`}
        result={`{ nome: 'Ana' }
Limpeza
[users, posts]`}
        errors={['await is only valid in async function — esqueceu async', 'fetch não rejeita em status 404/500 — verifique ok!', 'UnhandledPromiseRejection — await sem try/catch']}
        tips={['Sempre verifique resposta.ok — fetch não rejeita em HTTP errors', 'Use Promise.all quando requests são independentes', 'finally para esconder spinners, fechar conexões, etc.']}
        checklist={['Função tem async antes?', 'Verificou resposta.ok do fetch?', 'Envelopou await em try/catch?']}
      >
        <p className='text-sm text-gray-600'>Analogia: await é como &quot;aguarde na fila&quot; — pausa até a resposta. fetch é como ir ao correio buscar encomenda. try/catch é como capacete — protege quando cai.</p>
      </TopicCard>
      <TopicCard
        title='Promise.all, allSettled e race'
        definition='Métodos estáticos para combinar Promises. Promise.all é como um grupo — todos precisam terminar. allSettled é como uma assembleia — todos falam, mesmo quem errou. race é como corrida — o primeiro ganha.'
        whenToUse={['Promise.all para requests independentes em paralelo', 'allSettled quando quer resultado de todos, mesmo rejeitados', 'race para timeout ou primeiro-que-chegar']}
        whenNotToUse={['Promise.all quando um erro cancela todos — use allSettled', 'race sem tratamento de erro — o perdedor vira rejeição', 'all para requests que dependem uns dos outros']}
        code={`// Promise.all — todos devem resolver
const r1 = fetch('/api/users').then(r => r.json());
const r2 = fetch('/api/posts').then(r => r.json());
const [users, posts] = await Promise.all([r1, r2]);
// Se UM falhar, TODOS falham!

// Promise.allSettled — resultado de todos
const resultados = await Promise.allSettled([
  fetch('/api/a').then(r => r.json()),
  fetch('/api/b').then(r => r.json()),
  fetch('/api/c').then(r => r.json())
]);
resultados.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error('Falhou:', r.reason);
});

// Promise.race — o primeiro vence
const timeout = new Promise((_, rej) =>
  setTimeout(() => rej(new Error('Timeout!')), 3000)
);
const dados = await Promise.race([
  fetch('/api/rapido').then(r => r.json()),
  timeout
]);
// Se fetch demorar > 3s, timeout vence`}
        result={`// all: [{users}, {posts}]
// allSettled: [{status:'fulfilled', value:...}, ...]
// race: o primeiro que resolver`}
        errors={['Promise.all rejeita se qualquer uma rejeitar — todas perdem', 'race com reject primeiro — trata como erro', 'allSettled value é {status, value/reason} — não o dado direto']}
        tips={['all = interseção — todos devem dar certo', 'allSettled = união — quer saber de todos', 'race = corrida — o mais rápido (ou devolve, ou rejeita)']}
        checklist={['Usou all para requests independentes?', 'Precisa de allSettled para tolerar falhas?', 'race com timeout para evitar espera infinita?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Promise.all é como fazer um churrasco — todos chegam junto ou ninguém come. allSettled é como entregar encomendas — anota quem recebeu e quem não estava. race é como quem buzina primeiro no farol.</p>
      </TopicCard>
    </div>
  );
}

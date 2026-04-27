import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section26() {
  return (
    <div>
      <SectionHeader number={26} title='React: Projeto Pratico' subtitle='Listas e keys, formularios controlados, renderizacao condicional e todo app completo' />
      <Diagram title='Arquitetura do Todo App'>
{`ARQUITETURA TODO APP:

  <App> estado: {todos, filtro, texto}
    |
    +-- <TodoForm>          (adiciona)
    |     props: onAdiciona
    |     state: texto (local)
    |
    +-- <TodoFilter>        (filtra)
    |     props: filtro, onFiltra
    |
    +-- <TodoList>           (lista)
          props: todos, filtro, onRemove, onToggle
          |
          +-- <TodoItem key={id}>  (item)
                props: todo, onRemove, onToggle

FLUXO:
  Digita --> TodoForm chama onAdiciona
  App atualiza estado --> re-render
  TodoList filtra e mapeia --> TodoItem renderiza
  Clica remove --> TodoItem chama onRemove
  App atualiza estado --> re-render`}
      </Diagram>
      <TopicCard
        title='Listas, Keys e Renderizacao Condicional'
        definition='Listas em React usam map — como etiquetar cada caixa numa prateleira. Keys sao os codigos de barras — unicas e estaveis. Renderizacao condicional e como porter — mostra ou esconde baseado na condicao.'
        whenToUse={['key com id unico e estavel de cada item', 'map para renderizar listas de componentes', 'Ternario ou && para renderizacao condicional']}
        whenNotToUse={['index como key em listas que reordenam ou adicionam', 'key duplicada — React nao distingue os itens', '&& com numero 0 — renderiza &quot;0&quot; na tela']}
        code={`// Listas com map e key
function Lista({ itens }) {
  return (
    <ul>
      {itens.map(item => (
        <li key={item.id}>{item.nome}</li>
      ))}
    </ul>
  );
}

// Renderizacao condicional: ternario
function Mensagem({ logado }) {
  return logado
    ? <p>Bem-vindo!</p>
    : <p>Faca login</p>;
}

// Renderizacao condicional: &&
function Alerta({ erro }) {
  return erro && <p className='erro'>{erro}</p>;
}

// CUIDADO: 0 && <p>Nao aparece</p>
// renderiza "0" na tela! Use ternario:
// {qtd > 0 ? <p>{qtd} itens</p> : null}`}
        result={`- Ana
- Beto
- Cara

Bem-vindo!
Erro: campo obrigatorio`}
        errors={['Each child in a list should have a unique key — esqueceu key', 'Key must be unique — chaves duplicadas na lista', '0 rendered when using && — use ternario ou !!valor']}
        tips={['Use id do banco como key — nunca index em listas dinamicas', 'Ternario para um ou outro, && para mostrar ou nada', 'key e prop especial — nao chega no componente']}
        checklist={['Cada item da lista tem key unica?', 'key e id estavel, nao index?', 'Renderizacao condicional sem && com falsy?']}
      >
        <p className='text-sm text-gray-600'>Analogia: key e como codigo de barras — cada produto tem um, e se mover de prateleira o React sabe qual e. Renderizacao condicional e como porteiro de balada — so entra quem tem o convite.</p>
      </TopicCard>
      <TopicCard
        title='Formularios Controlados'
        definition='Formulario controlado e como um escrivao — o React controla cada letra digitada. O estado e a unica fonte de verdade — o input e so o espelho do estado.'
        whenToUse={['Formularios controlados para validacao em tempo real', 'Cada input com seu estado para logica complexa', 'onChange para capturar cada mudanca']}
        whenNotToUse={['Formularios nao controlados para casos simples — useRef basta', 'Muitos states soltos — considere useReducer', 'Validacao somento no submit — use controlado para tempo real']}
        code={`import { useState } from 'react';

function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // nao recarrega pagina
    console.log({ nome, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder='Nome'
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type='email'
        placeholder='Email'
      />
      <button type='submit'>Enviar</button>
    </form>
  );
}`}
        result={`{ nome: 'Ana', email: 'ana@email.com' }`}
        errors={['e.preventDefault() faltando — pagina recarrega', 'input sem onChange — campo fica travado', 'value sem onChange — React warning de uncontrolled']}
        tips={['e.preventDefault() sempre no onSubmit do form', 'Um estado por input ou objeto com useReducer', "type='submit' no botao ativa o onSubmit do form"]}
        checklist={['e.preventDefault() no onSubmit?', 'Cada input tem value e onChange?', 'Estado e a unica fonte de verdade?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Formulario controlado e como ditado — o React dita cada letra e o input so obedece. O estado e o mestre, o input e o espelho.</p>
      </TopicCard>
      <CodeBlock
        title='TodoApp.jsx — Projeto Completo'
        language='jsx'
        code={`import { useState } from 'react';

// TIPO: { id: number, texto: string, feito: boolean }
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [texto, setTexto] = useState('');
  const [filtro, setFiltro] = useState('todos');

  // Adicionar
  const adicionar = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), texto: texto.trim(), feito: false }
    ]);
    setTexto('');
  };

  // Alternar feito
  const toggle = (id) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, feito: !t.feito } : t
      )
    );
  };

  // Remover
  const remover = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Filtrar
  const filtrados = todos.filter(t => {
    if (filtro === 'feitos') return t.feito;
    if (filtro === 'pendentes') return !t.feito;
    return true; // 'todos'
  });

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={adicionar}>
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder='Nova tarefa...'
        />
        <button type='submit'>Adicionar</button>
      </form>
      <div>
        {['todos', 'feitos', 'pendentes'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            style={{
              fontWeight: filtro === f ? 'bold' : 'normal'
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <ul>
        {filtrados.map(t => (
          <li key={t.id}>
            <span
              onClick={() => toggle(t.id)}
              style={{
                textDecoration:
                  t.feito ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {t.texto}
            </span>
            <button onClick={() => remover(t.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
      <p>{todos.filter(t => !t.feito).length} pendentes</p>
    </div>
  );
}

export default TodoApp;`}
      />
      <TopicCard
        title='Projeto: Todo App — Pontos-Chave'
        definition='O Todo App e o bom dia da React — todo mundo ja fez. Mas a licao esta nos detalhes: keys estaveis, estado derivado para filtro, imutabilidade no estado, e composicao de conceitos simples.'
        whenToUse={['Date.now() para IDs simples em projetos de estudo', 'Spread (...prev) para imutabilidade no estado', 'Estado derivado para filtro — sem state extra']}
        whenNotToUse={['Date.now() em producao — use UUID', 'Mutar array com push/splice — use map/filter', 'Estado duplicado para filtro — calcule de todos']}
        code={`// PONTO-CHAVE 1: Imutabilidade
// ERRADO: todos.push(novo) — muta o array!
// CERTO: [...todos, novo] — cria novo array

// PONTO-CHAVE 2: Keys estaveis
// ERRADO: key={index} — quebra ao remover
// CERTO: key={todo.id} — estavel e unico

// PONTO-CHAVE 3: Estado derivado
// ERRADO: const [filtrados, setFiltrados] = useState([])
// CERTO: const filtrados = todos.filter(...)
// Nao duplique estado — derive!

// PONTO-CHAVE 4: Spread no toggle
// ERRADO: todo.feito = !todo.feito (muta!)
// CERTO: { ...todo, feito: !todo.feito }

// PONTO-CHAVE 5: e.preventDefault()
// Sem isso, o form recarrega a pagina`}
        result={`Todo App
[x] Estudar React
[x] Fazer todo app
[ ] Deploy
1 pendentes`}
        errors={['Cannot read property of undefined — filter em estado nulo', 'setState com mutacao — React nao detecta a mudanca', 'Key warning — array vazio sem key no map']}
        tips={['Comece simples: adicionar e listar. Depois filtre e delete.', 'Use React DevTools para inspecionar estado e props', 'Refatore: extraia TodoItem e TodoFilter como componentes']}
        checklist={['Imutabilidade: sempre spread/map/filter?', 'Keys: id estavel em cada item?', 'Estado derivado: filtro sem state duplicado?', 'preventDefault no form?', 'Spread no toggle: {...todo, feito: !todo.feito}?']}
      >
        <p className='text-sm text-gray-600'>Analogia: O Todo App e como aprender a cozinhar — a receita e simples, mas a tecnica se aplica a todos os pratos. Imutabilidade e como nao rasurar: escreva novo, nao apague o velho. Keys sao como RG — cada tarefa tem o seu.</p>
      </TopicCard>
    </div>
  );
}

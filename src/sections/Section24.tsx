import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section24() {
  return (
    <div>
      <SectionHeader number={24} title='React: Props e State' subtitle='Props leitura-only, children, propTypes, useState, estado derivado, lifting state up, fluxo unidirecional' />
      <Diagram title='Fluxo Unidirecional & Props vs State'>
{`FLUXO DE DADOS UNIDIRECIONAL:

  <Pai> estado: {dados}
    |  props: {dados, onMuda}
    v
  <Filho> recebe props
    |  chama onMuda(dadosNovos)
    v
  <Pai> atualiza estado
    |  re-renderiza Filho
    v
  <Filho> recebe novas props

PROPS vs STATE:

  +------------+------------------+
  | Props      | State            |
  +------------+------------------+
  | Leitura    | Leitura/escrita  |
  | Pai passa  | Componente dono  |
  | Imutavel   | Mutavel (set)    |
  | Como arg   | Como memoria     |
  +------------+------------------+

  LIFTING STATE UP:
  <Avo>
    <Pai1 state={x} />  <Pai2 onSet={setX} />
  </Avo>
  Pai1 le, Pai2 escreve, Avo coordena`}
      </Diagram>
      <TopicCard
        title='Props: Leitura-Only, Children e PropTypes'
        definition='Props sao como encomendas — quem recebe nao pode alterar, so abrir e usar. Children e o conteudo entre as tags — como o recheio de um sanduiche. PropTypes valida o tipo de cada prop — como conferencia de nota fiscal.'
        whenToUse={['Props para passar dados do pai para o filho', 'Children para componentes container/wrapper', 'PropTypes para documentar e validar props em desenvolvimento']}
        whenNotToUse={['Modificar props recebidas — crie estado local', 'Children quando o componente sempre tem conteudo fixo', 'PropTypes em producao — use TypeScript no lugar']}
        code={`// Props = argumentos do componente
function Cartao({ titulo, descricao }) {
  return (
    <div className='cartao'>
      <h2>{titulo}</h2>
      <p>{descricao}</p>
    </div>
  );
}
// Uso: <Cartao titulo='React' descricao='Biblioteca' />

// Children = conteudo entre as tags
function Moldura({ children }) {
  return (
    <div className='borda'>
      {children}
    </div>
  );
}
// Uso: <Moldura><p>Conteudo aqui</p></Moldura>

// PropTypes = validacao
import PropTypes from 'prop-types';
Cartao.propTypes = {
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string,
  onClick: PropTypes.func,
};`}
        result={`<div class="cartao">
  <h2>React</h2>
  <p>Biblioteca</p>
</div>`}
        errors={['Cannot assign to read only property — tentou mutar uma prop', 'Failed prop type — prop errada passada ao componente', 'children is not a function — usou children como callback errado']}
        tips={['Props sao leitura-only — nunca modifique diretamente', 'Use spread de props com cuidado: {"{...props}"}', 'DefaultProps ou valores default no destructuring']}
        checklist={['Componente so le props, nunca modifica?', 'Usou children para conteudo flexivel?', 'PropTypes definidos para props importantes?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Props sao como cartas seladas — voce le, mas nao altera. Children e como o recheio do lanche — o pao (Moldura) e fixo, o recheio muda. PropTypes e como o fiscal — garante que o que chegou e o que esperava.</p>
      </TopicCard>
      <TopicCard
        title='useState e Estado Derivado'
        definition='useState e como uma gaveta com memoria — voce guarda um valor e pode atualizar. Estado derivado e como calcular o troco — nao guarda, so calcula a partir do que ja tem.'
        whenToUse={['useState para valores que mudam e causam re-render', 'Estado derivado para valores calculados de estado existente', 'Setter com funcao para atualizar baseado no valor anterior']}
        whenNotToUse={['useState para valores que nao causam re-render', 'Duplicar props em estado — use a prop diretamente', 'Estado derivado copiado em state — calcule na hora']}
        code={`// useState: guarda e atualiza
import { useState } from 'react';

function Contador() {
  const [contagem, setContagem] = useState(0);

  // Setter com funcao (seguro)
  const incrementar = () => {
    setContagem(prev => prev + 1);
  };

  // Estado derivado: NAO crie state para isso!
  const ehPar = contagem % 2 === 0;
  // Use a variavel direto, sem setState

  return (
    <div>
      <p>{contagem} - {ehPar ? 'par' : 'impar'}</p>
      <button onClick={incrementar}>+1</button>
    </div>
  );
}

// ERRADO: duplicar prop em estado
// function Item({ nome }) {
//   const [n, setN] = useState(nome); // NAO!
// }
// CERTO: use a prop direto
function Item({ nome }) {
  return <p>{nome}</p>; // SIM!
}`}
        result={`3 - impar
0 - par
5 - impar`}
        errors={['Too many re-renders — setState dentro do corpo do componente', 'Stale state — setter sem funcao em updates consecutivos', 'State não atualiza — mutou estado em vez de substituir']}
        tips={['Setter com funcao (prev => novo) para updates consecutivos', 'Nunca duplique props em estado — use a prop', 'Estado derivado = variavel comum, sem useState']}
        checklist={['Usou funcao no setter para updates consecutivos?', 'Nao duplicou props em estado?', 'Estado derivado e variavel, nao state?']}
      >
        <p className='text-sm text-gray-600'>Analogia: useState e como uma lousa magica — escreve, apaga, reescreve. Estado derivado e como calcular o troco: se voce tem R$10 e gasta R$3, o troco e R$7 — nao precisa guardar o troco, so calcular.</p>
      </TopicCard>
      <TopicCard
        title='Lifting State Up e Fluxo Unidirecional'
        definition='Lifting state up e como colocar o telefone na sala de estar — todo mundo ouve. Quando dois irmaos precisam do mesmo dado, o estado sobe para o pai. Fluxo unidirecional: dados descem como props, acoes sobem como callbacks.'
        whenToUse={['Lifting state quando irmaos compartilham dados', 'Callback props para filho comunicar com pai', 'Estado no componente ancestral comum mais proximo']}
        whenNotToUse={['Lifting state muito alto — contexto global para tudo', 'Callback hell — muitas funcoes encadeadas', 'Estado no pai quando so um filho usa']}
        code={`// Lifting state up: estado no pai
function App() {
  const [temperatura, setTemperatura] = useState(25);

  return (
    <div>
      <Celsius temp={temperatura} onMuda={setTemperatura} />
      <Fahrenheit temp={temperatura} onMuda={setTemperatura} />
    </div>
  );
}

// Filho le e notifica mudanca
function Celsius({ temp, onMuda }) {
  return (
    <input
      value={temp}
      onChange={e => onMuda(Number(e.target.value))}
    />
  );
}

// Irmao recebe mesma temperatura
function Fahrenheit({ temp }) {
  const f = (temp * 9/5) + 32;
  return <p>{f} F</p>;
}`}
        result={`25 C => 77 F
30 C => 86 F`}
        errors={['Component nao re-renderiza — estado no lugar errado', 'Undefined callback — esqueceu de passar onMuda como prop', 'Maximum update depth — callback causa loop infinito']}
        tips={['Estado no ancestral comum mais proximo — nao no App para tudo', 'Nomeie callbacks como onXxx — onMuda, onClick, onDelete', 'Props descem, callbacks sobem — regra de ouro']}
        checklist={['Estado no componente ancestral comum?', 'Irmaos compartilham dados via pai?', 'Callbacks seguem padrao onXxx?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Lifting state up e como o telefone fixo na sala — quando dois irmaos precisam ouvir a mesma ligacao, colocam o telefone no lugar comum. Dados descem como presentes, acoes sobem como pedidos.</p>
      </TopicCard>
    </div>
  );
}

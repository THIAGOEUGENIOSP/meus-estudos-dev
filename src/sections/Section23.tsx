import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section23() {
  return (
    <div>
      <SectionHeader number={23} title='React: Fundamentos' subtitle='O que e React, JSX, componentes funcionais, renderizacao, Vite e estrutura de projeto' />
      <Diagram title='Arvore de Componentes & Fluxo de Renderizacao'>
{`ARVORE DE COMPONENTES:

        <App>
       /      \\
  <Header>   <Main>
              /    \\
       <List>   <Form>
        /  \\
    <Item> <Item>

FLUXO DE RENDERIZACAO:

  Estado muda --> React compara VDOM
                     |
              VDOM diferente?
                /        \\
              SIM         NAO
               |           |
          Re-render     Nada faz
               |
          Atualiza DOM real


  JSX  -->  babel  -->  React.createElement()
                |
          JS puro no bundle`}
      </Diagram>
      <TopicCard
        title='O que e React e JSX'
        definition='React e uma biblioteca declarativa — voce descreve o QUER, nao COMO fazer. JSX e HTML dentro do JS — como escrever a interface e a logica no mesmo lugar, mas o navegador so entende JS, entao Babel traduz.'
        whenToUse={['React para interfaces interativas e dinamicas', 'JSX para escrever UI de forma declarativa', 'Vite para setup rapido com HMR (hot reload)']}
        whenNotToUse={['React para sites estaticos simples — HTML puro basta', 'JSX sem transpiler — o navegador nao entende', 'Vite para apps legados com Webpack complexo']}
        code={`// JSX = HTML dentro do JS (nao e string!)
const elemento = <h1>Ola, React!</h1>;

// JSX traduzido pelo Babel:
// React.createElement('h1', null, 'Ola, React!')

// Regras do JSX:
// 1. Um elemento raiz por retorno
// 2. Use {} para expressoes JS
// 3. className em vez de class
// 4. self-closing tags: <img />, <br />
// 5. style recebe objeto: style={'{{'} color: 'red {'}}'}

const nome = 'Maria';
const el = <p className='saudacao'>Ola, {nome}!</p>;`}
        result={`<p class="saudacao">Ola, Maria!</p>`}
        errors={['Adjacent JSX elements must be wrapped — falta fragmento ou wrapper', 'class em vez de className — React nao usa class', 'style como string — deve ser objeto {{ }}']}
        tips={['Fragmeneto <>...</> agrupa sem criar div extra', 'JSX nao permite if/for — use ternario e map', 'Sempre feche tags: <img />, <input />']}
        checklist={['Usou className em vez de class?', 'Um elemento raiz ou fragmento?', 'Estilo e objeto com camelCase?']}
      >
        <p className='text-sm text-gray-600'>Analogia: React e como um tradutor — voce escreve em JSX (mistura de HTML e JS), e ele traduz para JS puro. Declarativo e como pedir pizza: &quot;quero margherita&quot;, nao &quot;pegue farinha, molho...&quot;.</p>
      </TopicCard>
      <TopicCard
        title='Componentes Funcionais e Renderizacao'
        definition='Componente funcional e uma funcao que retorna JSX — como uma fabrica de UI. Toda vez que os dados mudam, o componente re-renderiza. React compara o virtual DOM e so atualiza o que mudou.'
        whenToUse={['Componentes para pedacos reutilizaveis de UI', 'PascalCase para nomes de componentes', 'Composicao de componentes pequenos em componentes maiores']}
        whenNotToUse={['Componente gigante — divida em menores', 'Arrow function sem retorno explicito confuso', 'Componente que faz tudo — separe responsabilidades']}
        code={`// Componente funcional = funcao que retorna JSX
function Saudacao({ nome }) {
  return <h1>Ola, {nome}!</h1>;
}

// Arrow function tambem funciona
const Despedida = ({ nome }) => (
  <h2>Ate logo, {nome}!</h2>
);

// Uso: <Saudacao nome='Ana' />
// Renderizacao: React chama a funcao
// Toda vez que props ou estado mudam,
// React re-renderiza o componente

// App compoe varios componentes
function App() {
  return (
    <div>
      <Saudacao nome='Ana' />
      <Despedida nome='Beto' />
    </div>
  );
}`}
        result={`Ola, Ana!
Ate logo, Beto!`}
        errors={['Component names must start with uppercase — miniscula vira HTML', 'Return sem JSX — componente precisa retornar algo', 'Esqueceu return em componente multi-linha']}
        tips={['Um componente, uma responsabilidade', 'Comece simples, refatore quando crescer', 'Props sao como argumentos de funcao — so leitura']}
        checklist={['Nome do componente em PascalCase?', 'Componente retorna JSX?', 'Componente faz uma coisa so?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Componente e como um Lego — cada pea tem forma propria, e junto criam algo maior. Renderizar e como montar: toda vez que muda uma pea, remonta so o trecho afetado.</p>
      </TopicCard>
      <TopicCard
        title='Vite Setup e Estrutura de Projeto'
        definition='Vite e o motor de arranque — rapido, leve, com HMR instantaneo. Cria o projeto em segundos, e a estrutura separa componentes, assets e paginas como gavetas organizadas.'
        whenToUse={['Vite para novos projetos React', 'Estrutura por tipo (components/, hooks/) para projetos pequenos', 'Estrutura por feature para projetos grandes']}
        whenNotToUse={['Vite para projetos que precisam de Webpack avancado', 'Tudo em um arquivo — divida e conquiste', 'Componentes na raiz de src/ — organize em pastas']}
        code={`// Criar projeto com Vite
// npm create vite@latest meu-app -- --template react
// cd meu-app && npm install && npm run dev

// Estrutura recomendada:
// src/
//   components/   -- pecas reutilizaveis
//     Button.jsx
//     Card.jsx
//   sections/     -- secoes da pagina
//   hooks/         -- custom hooks
//   assets/        -- imagens, estilos
//   App.jsx        -- componente raiz
//   main.jsx       -- ponto de entrada

// main.jsx: ponto de entrada
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(
  document.getElementById('root')
).render(<App />);`}
        result={`VITE v5.x  ready in 200ms
➜  Local: http://localhost:5173/
➜  HMR: instant update`}
        errors={['Cannot find module — caminho relativo sem ./', 'Unexpected token — JSX em arquivo .js — use .jsx', 'ERR_MODULE_NOT_FOUND — esqueceu npm install']}
        tips={['Sempre use .jsx para arquivos com JSX', 'Barrel files (index.js) para facilitar imports', 'main.jsx e a porta de entrada — nunca mova']}
        checklist={['Arquivos JSX com extensao .jsx?', 'Imports com caminhos relativos corretos?', 'Componentes organizados em pastas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Vite e como um motor eletrico — liga instantaneo, sem enrolacao. A estrutura de projeto e como uma oficina organizada: cada ferramenta no seu lugar, cada componente na sua gaveta.</p>
      </TopicCard>
    </div>
  );
}

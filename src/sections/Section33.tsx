import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section33() {
  return (
    <div>
      <SectionHeader number={33} title='Node.js: Fundamentos' subtitle='Runtime V8, npm/yarn/pnpm, package.json, require vs import, modulos nativos, EventEmitter, streams e process.env' />
      <Diagram title='Node.js Event Loop'>
{`EVENT LOOP - O CORACAO DO NODE.JS:

  [Codigo JS] --> [Call Stack] --> [Event Loop]
                                       |
                    +------------------+------------------+
                    |                  |                  |
              timers          poll (I/O)        check (setImmed)
             setTimeout       filesystem          setImmediate
             setInterval      network             |
                                 |               |
                          [Callback Queue]        |
                                 |               |
                    +------------+------------+   |
                    |            |            |   |
                 microtask   microtask     callback
                  Promise     Promise        |
                    |            |            |
                    v            v            v
                EXECUTA ANTES DO PROXIMO LOOP

  REGRA: Node.js NAO e multinucleado por padrao!
  Uma thread = um loop = muitos callbacks`}
      </Diagram>
      <Diagram title='Estrutura de Modulos'>
{`MODULOS NODE.JS:

  [App] --> [require/import] --> [Modulo]
                                     |
                  +------------------+------------------+
                  |                  |                  |
              Nativos           NPM/Third-party     Locais
              fs, path,          express, lodash     ./meuModulo.js
              http, os,          mongoose, cors       ./utils.js
              crypto, events     dotenv, jwt
              stream, process

  package.json (mapa do projeto)
    |- name, version
    |- scripts (npm start, npm dev)
    |- dependencies (producao)
    |- devDependencies (desenvolvimento)
    |- engines (node >= 18)`}
      </Diagram>
      <TopicCard
        title='Node.js e o Runtime V8'
        definition='Node.js e como um motor eletrico que substitui o motor a combustao — pega a mesma estrada (JavaScript) mas com mais eficiencia. Ele usa o V8 (motor do Chrome) fora do navegador para executar JS no servidor. Em vez de criar uma thread por requisicao, ele usa um unico loop de eventos que atende milhoes de callbacks levezinhos.'
        whenToUse={['APIs REST e GraphQL que precisam de alta concorrencia', 'Aplicacoes real-time com WebSocket (chat, notificacoes)', 'Microservicos leves e rapidos de subir', 'Scripts de automacao e tooling (build, deploy)']}
        whenNotToUse={['Processamento pesado de CPU (IA, video encoding) — bloqueia o loop', 'Sistemas que precisam de multinucleo nativo — use worker threads', 'Aplicacoes CPU-bound intensivas — prefira Go, Rust ou Python', 'Bancos relacionais gigantes sem ORM — complexidade cresce']}
        code={`// Verificando a versao do Node
// node -v  --> v20.11.0

// Primeiro servidor HTTP nativo
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Ola do Node.js!');
});
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Versao com ESM (import)
import { createServer } from 'http';
const server = createServer((req, res) => {
  res.end('Ola com ESM!');
});
server.listen(3000);`}
        result={`Servidor rodando na porta 3000
Acesse http://localhost:3000 --> Ola do Node.js!`}
        errors={['ReferenceError: require is not defined — use type: commonjs no package.json', "Cannot use import statement — adicione 'type': 'module' ao package.json", 'EADDRINUSE — porta ja em uso, mate o processo com kill']}
        tips={['Node 18+ LTS e a versao recomendada para producao', 'Use nvm para gerenciar multiplas versoes do Node', 'require e CommonJS; import e ESM — escolha um e seja consistente', 'node --watch app.js reinicia automaticamente (Node 18+)']}
        checklist={['Node.js LTS instalado?', 'nvm configurado para trocar versoes?', 'package.json inicializado?', 'Servidor HTTP basico funciona?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Node.js e como um garcom de restaurante — ele nao cozinha, mas anota pedidos e distribui para a cozinha (sistema operacional). Enquanto a cozinha prepara, ele ja atende outros clientes. Quando o prato fica pronto, o garcom entrega. Isso permite que um unico garcom atenda centenas de mesas.</p>
      </TopicCard>
      <TopicCard
        title='npm, yarn, pnpm e package.json'
        definition='npm e como o mercado de aplicativos do celular — voce instala, atualiza e gerencia pacotes. yarn e pnpm sao alternativas mais rapidas. O package.json e como a lista de ingredientes da receita — diz exatamente do que o projeto precisa para funcionar.'
        whenToUse={['npm init -y para criar package.json rapidamente', 'npm install pacote para adicionar dependencias', 'npm install -D pacote para dependencias de desenvolvimento', 'npm run script para executar scripts customizados']}
        whenNotToUse={['npm install -g para tudo — global polui o sistema', 'npm sem package-lock.json — versoes inconsistentes', 'commitar node_modules — adicione ao .gitignore', 'npm install em producao — use npm ci para instalacao limpa']}
        code={`// package.json - o coracao do projeto
{
  "name": "meu-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch app.js",
    "start": "node app.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}

// Comandos essenciais
// npm init -y               --> cria package.json
// npm install express        --> adiciona a dependencies
// npm install -D nodemon     --> adiciona a devDependencies
// npm ci                    --> instala limpo do lockfile
// npm outdated              --> verifica atualizacoes
// npm audit                  --> verifica vulnerabilidades`}
        result={`node_modules/ criado com dependencias
package-lock.json gerado automaticamente
npm run dev --> executa node --watch app.js`}
        errors={['npm ERR! code ERESOLVE — conflito de versoes, tente npm install --legacy-peer-deps', 'Cannot find module — pacote nao instalado, rode npm install', 'EACCES permission denied — nunca use sudo npm install, corriga as permissoes']}
        tips={['pnpm e ate 2x mais rapido e usa menos disco com symlinks', 'npm ci e mais seguro que npm install em CI/CD', 'Sempre commite o package-lock.json', 'Use npx para executar pacotes sem instalar globalmente']}
        checklist={['package.json com name, version, scripts?', 'dependencies vs devDependencies separados?', 'package-lock.json commitado?', '.gitignore com node_modules?']}
      >
        <p className='text-sm text-gray-600'>Analogia: package.json e como a lista de compras do supermercado — sem ela, voce esquece ingredientes. dependencies sao os ingredientes da receita; devDependencies sao as ferramentas da cozinha (forno, batedeira) — necessarias para cozinhar, mas nao servem no prato.</p>
      </TopicCard>
      <TopicCard
        title='Modulos Nativos, EventEmitter, Streams e process.env'
        definition='Modulos nativos sao como os orgaos vitais do Node — vm, fs, path, http, crypto, stream. EventEmitter e como o sistema nervoso — emite e escuta sinais. Streams sao como uma esteira de fabrica — processam dados em pedacos sem carregar tudo na memoria. process.env e como o painel de controle — variaveis de ambiente configuram o app sem mudar codigo.'
        whenToUse={['fs para ler/escrever arquivos (sempre async!)', 'path para montar caminhos multiplataforma', 'EventEmitter para eventos customizados dentro do app', 'streams para arquivos grandes, uploads, processamento em pipeline']}
        whenNotToUse={['fs.readFileSync em servidor — bloqueia o event loop', 'path com concatenacao manual — use path.join()', 'EventEmitter para fluxo de dados — use streams', 'process.env sem validacao — use dotenv e zod']}
        code={`// fs - filesystem (sempre async!)
import { readFile, writeFile } from 'fs/promises';
const dados = await readFile('./dados.json', 'utf-8');
await writeFile('./saida.json', dados);

// path - caminhos multiplataforma
import { join, dirname } from 'path';
const caminho = join(import.meta.dirname, 'dados.json');

// EventEmitter - padrao observer
import { EventEmitter } from 'events';
const emissor = new EventEmitter();
emissor.on('login', (user) => console.log(user + ' logou'));
emissor.emit('login', 'Ana');

// Streams - processar dados em pedacos
import { createReadStream } from 'fs';
import { createGzip } from 'zlib';
createReadStream('grande.txt')
  .pipe(createGzip())
  .pipe(createWriteStream('grande.txt.gz'));

// process.env - variaveis de ambiente
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;`}
        result={`fs: conteudo de dados.json lido com sucesso
path: /home/user/projeto/dados.json
EventEmitter: Ana logou
Stream: grande.txt.gz criado sem carregar tudo na memoria`}
        errors={['ENOENT: no such file — caminho errado, use path.join()', 'EMFILE: too many open files — use streams ao inves de ler tudo', 'process.env.XYZ undefined — variavel nao configurada no .env']}
        tips={['fs/promises e a versao async moderna — evite callbacks', 'stream.pipe() encadeia transformacoes como canos de agua', 'process.env + dotenv para variaveis locais de desenvolvimento', 'EventEmitter tem maxListeners — aumente com emitter.setMaxListeners()']}
        checklist={['fs/promises ao inves de fs sync?', 'path.join() para montar caminhos?', 'Streams para arquivos grandes?', 'process.env com fallback (|| valor)?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Streams sao como assistir um video no YouTube — voce nao baixa o video inteiro antes de assistir, vai recebendo pedacos e assistindo em tempo real. EventEmitter e como um sistema de alerta — o alarme dispara (emit) e os guardas reagem (on). process.env e como o termostato do ar-condicionado — voce ajusta sem abrir a maquina.</p>
      </TopicCard>
    </div>
  );
}

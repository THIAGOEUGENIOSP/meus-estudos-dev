import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section35() {
  return (
    <div>
      <SectionHeader number={35} title='Node.js: Projeto Pratico' subtitle='API REST de tarefas com Express, CRUD completo, validacao, middleware JWT, SQLite e documentacao' />
      <Diagram title='Fluxo de Request na API'>
{`FLUXO DE UMA REQUISICAO:

  [Cliente] --> [Express App]
                    |
                    v
            [Middleware Logger]
                    |
                    v
            [Middleware CORS]
                    |
                    v
            [express.json()]
                    |
                    v
            [Rota: /api/tarefas]
                    |
              +-----+------+
              |            |
           Publico      Com JWT
              |            |
              v            v
         [Controller] [Middleware Auth]
              |            |
              v            v
         [Model/DB]   [Controller]
              |            |
              v            v
         [Response]   [Model/DB]
                           |
                           v
                      [Response]

  CODIGOS HTTP:
  200 OK | 201 Created | 204 No Content
  400 Bad Request | 401 Unauthorized
  404 Not Found | 500 Internal Error`}
      </Diagram>
      <Diagram title='Estrutura do Projeto'>
{`PROJETO: API REST DE TAREFAS

  api-tarefas/
    |-- src/
    |     |-- app.js            (setup Express + middlewares)
    |     |-- server.js         (ponto de entrada)
    |     |-- db.js             (conexao SQLite)
    |     |-- routes/
    |     |     |-- auth.js     (login, registro)
    |     |     |-- tarefas.js  (CRUD de tarefas)
    |     |-- controllers/
    |     |     |-- authController.js
    |     |     |-- tarefaController.js
    |     |-- middlewares/
    |     |     |-- authMiddleware.js  (JWT)
    |     |     |-- errorHandler.js
    |     |-- models/
    |     |     |-- Tarefa.js   (schema + metodos)
    |     |     |-- Usuario.js
    |     |-- validators/
    |           |-- tarefaValidator.js
    |-- package.json
    |-- .env
    |-- .gitignore`}
      </Diagram>
      <CodeBlock
        title='Projeto: API REST de Tarefas com Express + JWT + SQLite'
        language='javascript'
        code={`// === API REST DE TAREFAS - CODIGO COMPLETO ===

// 1. src/db.js - Conexao SQLite
import Database from 'better-sqlite3';
const db = new Database('./tarefas.db');
db.pragma('journal_mode = WAL');

// Cria tabelas se nao existem
db.exec(\`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    feita INTEGER DEFAULT 0,
    usuario_id INTEGER REFERENCES usuarios(id)
  );
\`);
export default db;

// 2. src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token ausente' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: 'Token invalido' });
  }
}

// 3. src/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

export function registrar(req, res) {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha obrigatorios' });
  }
  const hash = bcrypt.hashSync(senha, 10);
  try {
    const result = db.prepare(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)'
    ).run(email, hash);
    res.status(201).json({ id: result.lastInsertRowid, email });
  } catch {
    res.status(400).json({ erro: 'Email ja existe' });
  }
}

export function login(req, res) {
  const { email, senha } = req.body;
  const user = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ erro: 'Credenciais invalidas' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.json({ token });
}

// 4. src/controllers/tarefaController.js
import db from '../db.js';

export function listar(req, res) {
  const tarefas = db.prepare(
    'SELECT * FROM tarefas WHERE usuario_id = ?'
  ).all(req.user.id);
  res.json(tarefas);
}

export function criar(req, res) {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: 'Titulo obrigatorio' });
  const result = db.prepare(
    'INSERT INTO tarefas (titulo, usuario_id) VALUES (?, ?)'
  ).run(titulo, req.user.id);
  res.status(201).json({ id: result.lastInsertRowid, titulo, feita: 0 });
}

export function atualizar(req, res) {
  const { titulo, feita } = req.body;
  const tarefa = db.prepare(
    'SELECT * FROM tarefas WHERE id = ? AND usuario_id = ?'
  ).get(req.params.id, req.user.id);
  if (!tarefa) return res.status(404).json({ erro: 'Nao encontrada' });
  db.prepare(
    'UPDATE tarefas SET titulo = COALESCE(?, titulo), feita = COALESCE(?, feita) WHERE id = ?'
  ).run(titulo ?? null, feita ?? null, req.params.id);
  res.json({ mensagem: 'Atualizada' });
}

export function deletar(req, res) {
  const result = db.prepare(
    'DELETE FROM tarefas WHERE id = ? AND usuario_id = ?'
  ).run(req.params.id, req.user.id);
  if (!result.changes) return res.status(404).json({ erro: 'Nao encontrada' });
  res.status(204).end();
}

// 5. src/routes/auth.js + tarefas.js
import { Router } from 'express';
import { registrar, login } from '../controllers/authController.js';
const authRouter = Router();
authRouter.post('/registrar', registrar);
authRouter.post('/login', login);

import { listar, criar, atualizar, deletar } from '../controllers/tarefaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const tarefaRouter = Router();
tarefaRouter.use(authMiddleware); // protege todas as rotas
tarefaRouter.get('/', listar);
tarefaRouter.post('/', criar);
tarefaRouter.put('/:id', atualizar);
tarefaRouter.delete('/:id', deletar);

// 6. src/app.js - Setup Express
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.js';
import tarefaRouter from './routes/tarefas.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/tarefas', tarefaRouter);
app.use((err, req, res, next) => {
  res.status(500).json({ erro: err.message });
});
export default app;

// 7. src/server.js - Ponto de entrada
import app from './app.js';
app.listen(process.env.PORT || 3000, () => {
  console.log('API rodando na porta ' + (process.env.PORT || 3000));
});`}
      />
      <TopicCard
        title='Pontos-Chave do Projeto'
        definition='Este projeto une tudo que aprendemos sobre Node.js e Express: CRUD com status codes corretos, JWT para autenticacao, SQLite para persistencia, MVC para organizacao, validacao de entrada e tratamento de erros. E como montar um carro — cada peca tem seu lugar e funcao.'
        whenToUse={['better-sqlite3 para projetos pequenos/medios (ate ~100k users)', 'JWT para autenticacao stateless (APIs REST)', 'bcrypt para hash de senhas — nunca armazene senhas em texto plano', 'dotenv para variaveis de ambiente em desenvolvimento']}
        whenNotToUse={['better-sqlite3 para alta concorrencia de escrita — use PostgreSQL', 'JWT para sessoes que precisam ser revogadas — use sessions', 'bcrypt Sync em servidor — bloqueia o event loop', 'armazenar dados sensiveis no JWT — qualquer um pode decodificar']}
        code={`// PONTO-CHAVE 1: JWT para autenticacao
// Token = credencial do usuario
// Cada request envia no header: Authorization: Bearer <token>
// Middleware verifica e anexa req.user

// PONTO-CHAVE 2: better-sqlite3 e sincrono
// Nao bloqueia o event loop significativamente
// Mais simples que async para queries curtas

// PONTO-CHAVE 3: Validacao antes de processar
// if (!titulo) return res.status(400).json(...)
// Valide entrada, nao confie no cliente

// PONTO-CHAVE 4: COALESCE no SQL
// COALESCE(?, titulo) = usa o novo valor ou mantem o antigo
// Permite atualizacao parcial (PATCH/PUT)

// PONTO-CHAVE 5: Error handler por ultimo
// app.use((err, req, res, next) => ...)
// Captura todos os erros nao tratados`}
        result={`POST /api/auth/registrar --> 201 + usuario criado
POST /api/auth/login --> 200 + token JWT
GET /api/tarefas --> 200 + lista do usuario
POST /api/tarefas --> 201 + tarefa criada
PUT /api/tarefas/1 --> 200 + atualizada
DELETE /api/tarefas/1 --> 204 No Content`}
        errors={['jwt.verify sem try/catch — token expirado causa crash', 'bcrypt.compareSync em rota de login — bloqueia em hash lento', 'db.prepare().run() sem try/catch — UNIQUE constraint falha', 'req.user undefined — esqueceu authMiddleware na rota']}
        tips={['better-sqlite3 e sincrono mas rapido — ideal para SQLite', 'JWT_SECRET deve ser longo e aleatorio em producao', 'Use .env para segredos — nunca commite senhas', 'Teste com curl ou Insomnia antes de integrar o frontend']}
        checklist={['JWT funcional com login e registro?', 'Senha com hash bcrypt?', 'CRUD completo de tarefas?', 'Validacao de entrada nos controllers?', 'Error handler centralizado?', 'Rotas protegidas com authMiddleware?', '.env com JWT_SECRET?', 'SQLite criando tabelas automaticamente?']}
      >
        <p className='text-sm text-gray-600'>Analogia: A API e como um banco — o JWT e como o cartao do banco: identifica voce sem precisar do gerente toda hora. O authMiddleware e como o caixa eletronico que checa o cartao antes de liberar o saque. O SQLite e como o cofre: guarda tudo com seguranca. E o error handler e como o gerente que resolve qualquer problema que os caixas nao conseguem.</p>
      </TopicCard>
    </div>
  );
}

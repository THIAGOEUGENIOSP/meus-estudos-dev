import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section34() {
  return (
    <div>
      <SectionHeader number={34} title='Node.js: Express e APIs' subtitle='Express basico, rotas HTTP, middleware, CORS, tratamento de erros e estrutura MVC' />
      <Diagram title='Express Middleware Chain'>
{`MIDDLEWARE CHAIN - A CORRENTE DE PRODUCAO:

  [Request] --> [mid1: log] --> [mid2: auth] --> [mid3: parse]
                    |                |                |
                    v                v                v
                next()           next()           next()
                                                      |
                                                      v
                                              [Rota: GET /api/users]
                                                      |
                                                      v
                                              [Response]

  FLUXO DE ERRO:
  [Request] --> [mid1: log] --> [mid2: auth]
                                     |
                                 err! (next(err))
                                     |
                                     v
                              [mid4: errorHandler]
                              (4 parametros: err, req, res, next)

  DICIONARIO:
  next()      --> passa para o proximo
  next(err)   --> pula para o error handler
  res.send()  --> encerra a cadeia (resposta)`}
      </Diagram>
      <Diagram title='Estrutura MVC no Express'>
{`MVC - MODELO, VISAO, CONTROLADOR:

  [Cliente] --> [Router] --> [Controller] --> [Model]
                   |              |                |
              GET /users    listaUsuarios()    User.find()
                   |              |                |
                   |              v                v
                   |        [Regra de negocio]  [Database]
                   |              |                |
                   |              v                |
                   |        [View/JSON]  <---------+
                   |              |
                   v              v
              [Response JSON]

  ESTRUTURA DE PASTAS:
  src/
    |-- controllers/   (logica das rotas)
    |-- models/        (schema do banco)
    |-- routes/        (definicao de rotas)
    |-- middlewares/   (auth, log, error)
    |-- app.js         (setup do Express)
    |-- server.js      (ponto de entrada)`}
      </Diagram>
      <TopicCard
        title='Express Basico e Rotas HTTP'
        definition='Express e como um maestro de orquestra — ele coordena quem entra, quando e em que ordem. Cada rota e uma partitura diferente: GET le dados, POST cria, PUT atualiza tudo, DELETE remove. Juntos, formam o CRUD — as quatro operacoes basicas de qualquer API.'
        whenToUse={['Express para APIs REST rapidas e simples', 'GET para buscar dados, POST para criar, PUT para atualizar, DELETE para remover', 'express.Router() para agrupar rotas por recurso', 'Rotas com parametros: /users/:id para recursos especificos']}
        whenNotToUse={['Express para renderizar HTML — use Next.js ou EJS', 'POST para buscas sem efeitos colaterais — use GET', 'PUT para atualizacao parcial — use PATCH', 'Express sem helmet em producao — seguranca basica faltando']}
        code={`import express from 'express';
const app = express();
app.use(express.json()); // parse de JSON no body

// ROTAS CRUD
app.get('/tarefas', (req, res) => {
  res.json(tarefas); // lista todas
});

app.get('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === +req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Nao encontrado' });
  res.json(tarefa);
});

app.post('/tarefas', (req, res) => {
  const nova = { id: Date.now(), ...req.body };
  tarefas.push(nova);
  res.status(201).json(nova); // 201 = Created
});

app.put('/tarefas/:id', (req, res) => {
  const idx = tarefas.findIndex(t => t.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ erro: 'Nao encontrado' });
  tarefas[idx] = { ...tarefas[idx], ...req.body };
  res.json(tarefas[idx]);
});

app.delete('/tarefas/:id', (req, res) => {
  tarefas = tarefas.filter(t => t.id !== +req.params.id);
  res.status(204).end(); // 204 = No Content
});

app.listen(3000);`}
        result={`GET /tarefas --> [lista de tarefas]
POST /tarefas --> 201 + nova tarefa
PUT /tarefas/1 --> tarefa atualizada
DELETE /tarefas/1 --> 204 No Content`}
        errors={['Cannot POST /tarefas — esqueceu app.use(express.json())', 'Cannot read property of undefined — req.body vazio sem parser', '404 em rota que existe — ordem das rotas importa, :id antes de /nova']}
        tips={['Sempre app.use(express.json()) antes das rotas', 'Use status codes corretos: 200, 201, 204, 400, 404, 500', 'express.Router() isola rotas em arquivos separados', 'req.params sao strings — use Number() ou + para converter']}
        checklist={['express.json() configurado?', 'Rotas CRUD completas?', 'Status codes corretos?', 'Tratamento de nao encontrado (404)?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Express e como o gerente de um restaurante — ele recebe o pedido (request), manda para a cozinha certa (rota), e devolve o prato (response). Cada rota e como um cardapio diferente: GET e olhar o cardapio, POST e fazer pedido, PUT e pedir para refazer, DELETE e cancelar.</p>
      </TopicCard>
      <TopicCard
        title='Middleware: req, res, next'
        definition='Middleware e como a esteira de seguranca do aeroporto — cada request passa por uma serie de verificacoes antes de chegar ao destino. Um middleware pode logar, autenticar, transformar dados ou ate bloquear. Se algo falha, ele manda o request direto para a sala de erros. Se tudo esta ok, next() manda para o proximo.'
        whenToUse={['app.use(express.json()) para parsear body', 'Middleware de log para registrar toda request', 'Middleware de autenticacao com JWT', 'app.use(cors()) para permitir requisicoes cross-origin']}
        whenNotToUse={['Middleware pesado que bloqueia o event loop', 'Middleware de autenticacao em rotas publicas', 'Esquecer next() — request trava para sempre', 'Middleware de erro sem 4 parametros — nao e reconhecido']}
        code={`// Middleware de log
function logger(req, res, next) {
  console.log(req.method + ' ' + req.url + ' - ' + new Date().toISOString());
  next(); // SEMPRE chame next()!
}
app.use(logger);

// Middleware de autenticacao
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ erro: 'Token ausente' });
  try {
    req.user = verificarToken(token); // anexa dados no req
    next(); // autenticado, segue!
  } catch (err) {
    next(err); // erro, vai para error handler
  }
}
app.use('/api/admin', auth); // so em /api/admin

// CORS - Cross-Origin Resource Sharing
import cors from 'cors';
app.use(cors({ origin: 'https://meusite.com' }));

// Middleware de erro (4 parametros OBRIGATORIOS)
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno' });
}
app.use(errorHandler); // sempre por ultimo!`}
        result={`logger: GET /api/users - 2024-01-15T10:30:00Z
auth: token validado, req.user = { id: 1, nome: 'Ana' }
CORS: permite requisicoes de https://meusite.com
errorHandler: 500 Erro interno`}
        errors={['next() esquecido — request fica pendente para sempre', 'Error handler com 3 parametros — Express nao reconhece, precisa de 4', 'CORS bloqueando frontend — configure origin corretamente', 'Middleware na ordem errada — logger apos rotas nao funciona']}
        tips={['Middlewares rodam na ordem em que sao declarados', 'Error handler DEVE ter 4 parametros: (err, req, res, next)', 'Use app.use(cors()) antes das rotas', 'Anexe dados no req (req.user, req.tenant) para compartilhar entre middlewares']}
        checklist={['next() chamado em todo middleware?', 'Error handler com 4 parametros por ultimo?', 'CORS configurado para o dominio certo?', 'express.json() antes das rotas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Middleware e como a esteira de checagem do aeroporto — primeiro o detector de metal (log), depois a verificacao de documento (auth), depois o raio-X (parse). Se algo falha, voce e encaminhado para a sala de inspecao (error handler). Se passa, segue para o voo (rota). next() e como o selo de aprovacao no passaporte.</p>
      </TopicCard>
      <TopicCard
        title='Tratamento de Erros e Estrutura MVC'
        definition='Tratamento de erros e como o cinto de seguranca — voce nao planeja bater, mas quando acontece, salva vidas. A estrutura MVC e como a organizacao de uma cozinha profissional: Model sao os ingredientes (dados), Controller e o chef (logica), e as rotas sao os garcons (que levam o pedido e trazem o prato). Separar responsabilidades evita caos.'
        whenToUse={['Error handler centralizado com app.use() por ultimo', 'try/catch em cada controller para capturar erros do banco', 'Classes de erro customizadas (AppError, NotFoundError)', 'MVC para projetos com mais de 5 rotas']}
        whenNotToUse={['try/catch no middleware sem next(err) — erro nao e propagado', 'Uma pasta so com tudo junto — a partir de 5 rotas, ja vira confusao', 'console.log(err) sem response — cliente fica esperando eternamente', 'MVC para apps de 3 rotas — complexidade desnecessaria']}
        code={`// Classe de erro customizada
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Controller com try/catch
async function listaTarefas(req, res, next) {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (err) {
    next(new AppError('Erro ao buscar tarefas', 500));
  }
}

// Error handler centralizado (ULTIMO middleware!)
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    erro: err.message,
    status: status,
  });
});

// MVC: routes/tarefas.js
import { Router } from 'express';
import { listaTarefas, criaTarefa } from '../controllers/tarefas.js';
const router = Router();
router.get('/', listaTarefas);
router.post('/', criaTarefa);
export default router;`}
        result={`AppError: Erro ao buscar tarefas (500)
Error handler: { erro: 'Erro ao buscar tarefas', status: 500 }
MVC: rotas separadas, controllers separados`}
        errors={['Error handler antes das rotas — nunca e chamado', 'next(err) sem error handler — erro fica sem resposta', 'throw sem try/catch em async — UnhandledPromiseRejection', 'export default esquecido no router — module not found']}
        tips={['Sempre coloque o error handler por ultimo no Express', 'Classes de erro customizadas evitam if/else nos controllers', 'No MVC, o Model NAO sabe sobre HTTP; o Controller NAO sabe sobre DB', 'express-async-errors elimina try/catch em controllers async']}
        checklist={['Error handler centralizado por ultimo?', 'try/catch em controllers async?', 'next(err) para propagar erros?', 'Rotas separadas em Router?']}
      >
        <p className='text-sm text-gray-600'>Analogia: MVC e como um restaurante bem organizado: o Model e a despensa (ingredientes/dados), o Controller e o chef que decide o que fazer com os ingredientes, as rotas sao os garcons que levam o pedido e trazem o prato. Se o chef cozinha na sala dos clientes, vira bagunca. Cada um no seu lugar.</p>
      </TopicCard>
    </div>
  );
}

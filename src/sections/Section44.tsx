import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section44() {
  return (
    <div>
      <SectionHeader number={44} title='Deploy e Hospedagem' subtitle='Vercel, Railway, Render e variaveis de ambiente em producao' />

      <Diagram title='Pipeline Completo de Deploy'>
{`PIPELINE: DO CODIGO AO AR

  Developer    GitHub         CI/CD          Producao
     |            |              |               |
     |-- push --> |              |               |
     |            |-- trigger -> |               |
     |            |              |-- npm test    |
     |            |              |-- npm build   |
     |            |              |-- se ok:      |
     |            |              |-- deploy ---> |
     |            |              |               |-- Health check
     |            |              |               |-- Routing ativo
     |            |              |               |-- Old version off
     |            |              | ok (verde)    |
     |<---------- notificacao ---|               |

FRONTENDS:                BACKENDS:              BANCOS:
  Vercel (Next/React)       Railway (Node/Python)  Railway Postgres
  Netlify (sites estaticos) Render (Node/Docker)   Supabase (Postgres)
  GitHub Pages (estatico)   Fly.io (Docker)        PlanetScale (MySQL)
  Cloudflare Pages          Heroku (legado)        MongoDB Atlas`}
      </Diagram>

      <TopicCard
        title='Vercel — Deploy de Frontend'
        definition='Vercel e a plataforma de deploy mais facil para projetos Next.js, React e outros frontends. Conecte seu repositorio GitHub e o deploy acontece automaticamente em cada push. Voce ganha CDN global, HTTPS automatico, preview de cada PR e dominio personalizado gratuitamente.'
        whenToUse={['Next.js — criado pela mesma empresa, integracao perfeita', 'React, Vue, Svelte — projetos frontend em geral', 'Fullstack com API Routes do Next.js', 'Precisar de preview URL por branch/PR', 'Deploy simples sem configuracao de servidor']}
        whenNotToUse={['Backend Node.js standalone (use Railway/Render)', 'Apps que precisam rodar em background (cron, workers)', 'Muita computacao servidor (use servicos especializados)']}
        code={`# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (na pasta do projeto)
vercel

# 4. Deploy de producao
vercel --prod

# Ou via GitHub (recomendado):
# vercel.com -> Import Git Repository -> autorizar GitHub

# vercel.json — configuracoes do projeto
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://meu-backend.railway.app/:path*"
    }
  ]
}

# Variaveis de ambiente no Vercel Dashboard:
# Settings -> Environment Variables
# NEXT_PUBLIC_API_URL = https://api.meusite.com  (exposta no browser)
# DATABASE_URL = postgresql://...                (so no servidor)
# JWT_SECRET = super-secreto-123                (so no servidor)`}
        result={`Deploy feito em 45s
URL: https://meu-projeto.vercel.app
Preview PR#23: https://meu-projeto-git-feature-login-empresa.vercel.app
Custom domain: https://meusite.com (configurado)`}
        errors={['Build failed — cheque o log de build no dashboard do Vercel', 'Environment variable undefined em producao — adicione no dashboard, nao so no .env', '.env nao vai para o Vercel — use o dashboard ou vercel env add']}
        tips={['NEXT_PUBLIC_ prefix expoe a variavel no browser — cuidado com segredos', 'vercel env pull baixa as env de producao para .env.local', 'Vercel Analytics integrado — monitoramento de performance', 'Edge Functions rodam na borda da CDN — ultra rapido para APIs simples']}
        checklist={['vercel.json configurado?', 'Variaveis de ambiente todas no dashboard?', 'Dominio customizado configurado?', 'Preview de PR funcionando?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Vercel e como um servico de entrega automatica — voce embalou o produto (commit), entregou ao deposito (push), e o servico de entrega (Vercel) distribui para o mundo inteiro em segundos, com rastreamento em tempo real.</p>
      </TopicCard>

      <TopicCard
        title='Railway — Deploy de Backend + Banco'
        definition='Railway e a plataforma mais simples para hospedar seus backends Node.js, Python, junto com banco de dados PostgreSQL. Tudo num lugar so, sem gerenciar servidores. Ideal para APIs, microservicos e aplicacoes full-stack. Tem plano gratuito generoso e cobra apenas pelo que usa.'
        whenToUse={['Backend Node.js/Express/NestJS', 'APIs com banco de dados PostgreSQL', 'Jobs em background (workers, cron)', 'Multiplos servicos que se comunicam', 'Migrando do Heroku']}
        whenNotToUse={['Sites estaticos (use Vercel/Netlify)', 'Apps com muito trafego e necessidade de escala horizontal complexa']}
        code={`# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Criar projeto novo
railway init

# 4. Adicionar banco de dados PostgreSQL
railway add postgresql
# Railway cria automaticamente DATABASE_URL na env

# 5. Deploy
railway up

# railway.toml — configuracoes
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

# Procfile (alternativa simples)
web: node dist/index.js
worker: node dist/worker.js

# Variaveis de ambiente
railway variables set JWT_SECRET="meu-segredo"
railway variables set NODE_ENV="production"

# Ver logs em tempo real
railway logs

# Conectar ao banco local (tunnel)
railway connect postgresql

# Rodar migracao Prisma em producao
railway run npx prisma migrate deploy

# Exemplo de health check no Express
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})`}
        result={`Servico deployado: https://meu-backend.up.railway.app
PostgreSQL: railway.internal:5432/railway
Health check: OK
Memoria: 128MB / 512MB`}
        errors={['Exit code 1 no build — cheque o Procfile e o build command', 'PORT hard-coded — use process.env.PORT (Railway injeta a porta)', 'Migration nao rodou — execute railway run npx prisma migrate deploy']}
        tips={['Railway gera DATABASE_URL automaticamente — use direto no Prisma', 'Sleeping em inatividade no plano gratuito — configure healthcheck para manter acordado', 'Private networking entre servicos: meu-backend.railway.internal', 'railway logs --tail para logs em tempo real no terminal']}
        checklist={['PORT usando process.env.PORT?', 'DATABASE_URL configurada no Railway?', 'Health check endpoint criado?', 'Migracoes rodando no deploy?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Railway e como um condominio para seus servicos — voce aluga um apartamento (servico), pode adicionar uma vaga de garagem (banco de dados), e o condominio cuida da luz, agua e seguranca (servidores, SSL, rede).</p>
      </TopicCard>

      <CodeBlock
        title='Variaveis de Ambiente — Boas Praticas'
        language='bash'
        code={`# .env — arquivo LOCAL (NUNCA commitar no git)
DATABASE_URL="postgresql://user:senha@localhost:5432/meu_banco"
JWT_SECRET="dev-secret-nao-usar-producao"
NODE_ENV="development"
PORT=3000

# Variaveis de build (Next.js) — acessiveis no browser
NEXT_PUBLIC_API_URL="https://api.meusite.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# .env.example — COMMITAR no git (sem valores reais)
# Template para outros devs
DATABASE_URL="postgresql://user:senha@host:5432/banco"
JWT_SECRET="gere-com-openssl-rand-base64-32"
NODE_ENV="development"
PORT=3000
NEXT_PUBLIC_API_URL="http://localhost:3000"

# .gitignore — garantir que .env nao vai para o git
.env
.env.local
.env.production
.env*.local
# NAO ignorar:
# .env.example

# Validar variaveis de ambiente na inicializacao
# src/config.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
})

function validateEnv() {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error('Variaveis de ambiente invalidas:')
    console.error(parsed.error.flatten().fieldErrors)
    process.exit(1)  // Falha rapida — melhor que crash em runtime
  }
  return parsed.data
}

export const env = validateEnv()

# Uso:
import { env } from './config'
const conn = new Pool({ connectionString: env.DATABASE_URL })`}
      />

      <Diagram title='Estrategia de Ambientes'>
{`AMBIENTES DE UMA APLICACAO PROFISSIONAL:

  .env.development        .env.test           PRODUCAO (dashboard)
  +-----------------+   +-----------------+  +---------------------+
  | DATABASE_URL    |   | DATABASE_URL    |  | DATABASE_URL        |
  | =localhost      |   | =localhost/test |  | =postgresql://...   |
  |                 |   |                 |  | (banco real, nuvem) |
  | JWT_SECRET      |   | JWT_SECRET      |  | JWT_SECRET          |
  | =dev-secret     |   | =test-secret    |  | =64-chars-random    |
  |                 |   |                 |  |                     |
  | NODE_ENV=dev    |   | NODE_ENV=test   |  | NODE_ENV=production |
  +-----------------+   +-----------------+  +---------------------+
         |                     |                       |
     npm run dev          npm test               npm start
     (exploracao)         (CI/CD)               (usuarios reais)

NUNCA:
  x Commitar .env com valores reais
  x Usar segredo de dev em producao
  x Hard-codar URL ou chave no codigo
  x Logar variaveis de ambiente`}
      </Diagram>
    </div>
  );
}

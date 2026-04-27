import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section45() {
  return (
    <div>
      <SectionHeader number={45} title='Docker: Fundamentos' subtitle='Containers, imagens, Dockerfile e docker-compose para desenvolvimento e producao' />

      <Diagram title='Container vs Maquina Virtual'>
{`MAQUINA VIRTUAL:
+----------------------------------+
|  App A  |  App B  |  App C       |
+----------------------------------+
| Node 16 | Python  | Node 20      |   <- runtimes separados
+----------------------------------+
|    OS completo para cada VM      |   <- pesado, GBs cada
+----------------------------------+
|         Hypervisor               |
+----------------------------------+
|         Hardware (Host)          |
+----------------------------------+

CONTAINERS (Docker):
+----------------------------------+
| [App A]  | [App B]  | [App C]    |   <- containers isolados
| Node 16  | Python   | Node 20    |   <- cada um com sua env
+----------------------------------+
|         Docker Engine            |   <- compartilha o kernel
+----------------------------------+
|         SO do Host               |
+----------------------------------+
|         Hardware (Host)          |
+----------------------------------+

CONTAINER: processo isolado, inicia em segundos, MBs
VM:        sistema completo, inicia em minutos, GBs

PROBLEMAS QUE DOCKER RESOLVE:
  "Funciona na minha maquina" -> Funciona igual em TODO lugar
  "Versao diferente do Node"  -> Cada projeto tem sua versao
  "Configurar ambiente novo"  -> docker compose up (1 comando)`}
      </Diagram>

      <TopicCard
        title='Imagem vs Container'
        definition='Imagem e o "molde" — um arquivo imutavel com tudo que o app precisa (SO base, runtime, dependencias, codigo). Container e o "objeto criado" — uma instancia rodando de uma imagem. Voce pode criar dezenas de containers a partir de uma imagem. Imagem = classe, Container = objeto (assim como em OOP).'
        whenToUse={['docker pull ubuntu:22.04 — baixar imagem do Docker Hub', 'docker run — criar e iniciar um container', 'docker build — criar sua propria imagem via Dockerfile', 'docker ps — listar containers rodando', 'docker stop / rm — parar e remover containers']}
        whenNotToUse={['Nao edite arquivos DENTRO do container — eles somem no restart (use volumes)', 'Nao guarde dados no container — use volumes para persistencia']}
        code={`# Comandos essenciais Docker

# IMAGENS
docker images                         # listar imagens locais
docker pull node:20-alpine            # baixar imagem do Docker Hub
docker rmi node:20-alpine             # remover imagem local
docker image prune                    # limpar imagens nao usadas

# CONTAINERS
docker run node:20-alpine node -e "console.log('ola')"
# run = pull (se nao tiver) + create + start

docker run -it node:20-alpine sh      # terminal interativo
docker run -d nginx                   # -d = background (detached)
docker run -p 3000:3000 minha-api     # -p host:container
docker run -e NODE_ENV=prod minha-api # variavel de ambiente
docker run -v /host/data:/app/data minha-api  # volume

docker ps                             # containers rodando
docker ps -a                          # todos (inclusive parados)
docker logs meu-container             # ver logs
docker logs -f meu-container          # seguir logs em tempo real
docker exec -it meu-container sh      # entrar em container rodando
docker stop meu-container             # parar (graceful)
docker kill meu-container             # forcar parada
docker rm meu-container               # remover container parado

# INSPECAO
docker inspect meu-container          # detalhes completos (JSON)
docker stats                          # uso de CPU/memoria em tempo real`}
        result={`docker ps
CONTAINER ID   IMAGE         COMMAND       STATUS        PORTS
a3f4b2c1d0e9   minha-api     "node app"    Up 5 minutes  0.0.0.0:3000->3000/tcp
b5e6f7a8b9c0   postgres:16   "docker-e…"  Up 5 minutes  5432/tcp`}
        errors={['Port already in use — mude a porta host: -p 3001:3000', 'No such container — container foi removido (docker ps -a para ver todos)', 'Permission denied — use sudo no Linux ou adicione usuario ao grupo docker']}
        tips={['alpine images sao muito menores: node:20-alpine vs node:20 (170MB vs 1.1GB)', 'docker system prune -a limpa tudo nao usado (cuidado)', 'docker cp container:/app/arquivo.txt . copia arquivo do container', 'Ctrl+P Ctrl+Q sai do container sem parar (modo detached)']}
        checklist={['Entendeu diferenca entre imagem e container?', 'Sabe fazer port mapping?', 'Sabe entrar dentro de um container rodando?', 'Usa volumes para dados persistentes?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Imagem e como uma receita de bolo — voce pode fazer varios bolos (containers) identicos a partir dela. Se um bolo estragou (container com problema), jogue fora e faca outro fresco com a mesma receita. A receita nao muda.</p>
      </TopicCard>

      <CodeBlock
        title='Dockerfile — Criando Sua Propria Imagem'
        language='dockerfile'
        code={`# Dockerfile para API Node.js/Express + TypeScript

# --- STAGE 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependencias PRIMEIRO (cache do Docker)
COPY package.json package-lock.json ./
RUN npm ci                            # instalacao limpa e deterministica

# Copiar e compilar TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npm run build                     # gera dist/

# --- STAGE 2: Producao ---
FROM node:20-alpine AS production

WORKDIR /app

# Apenas dependencias de producao
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiar apenas o build (sem codigo fonte TypeScript)
COPY --from=builder /app/dist ./dist

# Seguranca: nao rodar como root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Documenta a porta (nao abre automaticamente)
EXPOSE 3000

# Variavel para o Express saber que esta em producao
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "dist/index.js"]

# .dockerignore — nao copiar para a imagem
# node_modules
# .env
# .env.*
# dist
# .git
# *.log
# coverage
# README.md

# Construir e rodar
# docker build -t minha-api:1.0 .
# docker run -p 3000:3000 --env-file .env minha-api:1.0`}
      />

      <TopicCard
        title='Docker Compose — Orquestrar Multiplos Servicos'
        definition='Docker Compose permite definir um ambiente multi-container (app + banco + cache + etc) num unico arquivo YAML. Com um comando voce sobe tudo, com outro para tudo. Perfeito para desenvolvimento local onde voce precisar de Postgres, Redis e outros servicos sem instalar nada na maquina.'
        whenToUse={['Ambiente de desenvolvimento com multiplos servicos', 'App + Banco + Cache + Worker rodando juntos', 'Reproducir ambiente de producao localmente', 'CI/CD que precisa de banco real nos testes']}
        whenNotToUse={['Producao em escala (use Kubernetes ou Railway/ECS)', 'App simples sem dependencias externas']}
        code={`# docker-compose.yml — ambiente completo de desenvolvimento

version: '3.9'

services:
  # --- SEU BACKEND ---
  api:
    build:
      context: .
      target: builder          # usa o stage builder do Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://devuser:devpass@postgres:5432/devdb
      REDIS_URL: redis://redis:6379
    volumes:
      - ./src:/app/src          # hot reload: mudancas refletem na hora
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    command: npm run dev        # sobrescreve CMD do Dockerfile

  # --- POSTGRESQL ---
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpass
      POSTGRES_DB: devdb
    ports:
      - "5432:5432"             # acesso via localhost:5432 no host
    volumes:
      - postgres_data:/var/lib/postgresql/data  # dados persistidos
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser -d devdb"]
      interval: 5s
      timeout: 5s
      retries: 5

  # --- REDIS ---
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # --- PGADMIN (opcional - interface web pro banco) ---
  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: dev@dev.com
      PGADMIN_DEFAULT_PASSWORD: dev
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  postgres_data:               # volume nomeado = persiste entre restarts

# COMANDOS ESSENCIAIS:
# docker compose up              # sobe tudo (foreground)
# docker compose up -d           # sobe tudo em background
# docker compose up --build      # rebuild antes de subir
# docker compose down            # para e remove containers
# docker compose down -v         # tambem remove volumes (apaga banco!)
# docker compose logs -f api     # logs de um servico
# docker compose exec api sh     # entrar no container da api
# docker compose ps              # status dos servicos`}
        result={`docker compose up -d
[+] Running 4/4
  Container projeto-postgres-1  Healthy
  Container projeto-redis-1     Started
  Container projeto-api-1       Started
  Container projeto-pgadmin-1   Started

API: http://localhost:3000
PgAdmin: http://localhost:5050`}
        errors={['port is already allocated — algo na sua maquina usa essa porta, mude o port mapping', 'depends_on nao garante que o servico esta pronto — use healthcheck', 'volume nao deletado com down — use down -v para apagar dados (cuidado)']}
        tips={['Nao commite senhas reais no docker-compose.yml — use variaveis ${VAR} do .env', 'docker compose exec postgres psql -U devuser -d devdb para acessar o banco', 'watch mode: docker compose up --watch (experimental, hot-reload)', 'docker compose config valida o arquivo sem subir nada']}
        checklist={['Banco com volume para persistencia?', 'healthcheck no banco para depends_on funcionar?', 'Senhas via variaveis de ambiente (nao hard-coded)?', '.dockerignore criado?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Docker Compose e como o garcom de um restaurante que monta toda a mesa de uma vez — traz o prato principal (API), as bebidas (banco), as sobremesas (cache) e organiza tudo na ordem certa. Sem ele, voce teria que chamar cada coisa separadamente.</p>
      </TopicCard>
    </div>
  );
}

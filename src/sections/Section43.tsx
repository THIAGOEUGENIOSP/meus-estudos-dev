import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section43() {
  return (
    <div>
      <SectionHeader number={43} title='Git: GitHub Flow e CI/CD' subtitle='Pull Requests, code review, GitHub Actions, testes automaticos e deploy continuo' />

      <Diagram title='GitHub Flow'>
{`GITHUB FLOW - O FLUXO PROFISSIONAL:

  main (producao)
    |
    +-- git switch -c feature/nova-funcionalidade
    |         |
    |     commits...
    |         |
    |    git push origin feature/nova-funcionalidade
    |         |
    |    [Abrir Pull Request no GitHub]
    |         |
    |    [Code Review por colega]
    |         |
    |    [CI: testes automaticos rodam]
    |         |
    |    [Aprovado] --> git merge (squash ou merge commit)
    |         |
    |    [Delete branch]
    |         |
    +----------> main (atualizado, auto-deploy)

  REGRAS DO GITHUB FLOW:
  1. main sempre esta pronta para deploy
  2. todo trabalho em branch separada
  3. PR para revisao antes de merge
  4. CI deve passar antes de merge
  5. Deploy automatico apos merge na main`}
      </Diagram>

      <TopicCard
        title='Pull Requests e Code Review'
        definition='Pull Request (PR) e um pedido para mesclar sua branch na main. E o momento de revisao do codigo — um colega (ou voce mesmo no futuro) vai olhar linha por linha. Boas PRs sao pequenas, focadas e bem descritas. Code Review evita bugs, compartilha conhecimento e melhora a qualidade do codigo.'
        whenToUse={['PR para TODA mudanca de codigo — ate pequenas', 'Descricao detalhada: o que faz, por que, como testar', 'PRs pequenas (< 400 linhas) — mais faceis de revisar', 'Draft PR para feedback antecipado antes de terminar']}
        whenNotToUse={['PR com 50 arquivos e 2000 linhas — impossivel revisar bem', 'Merge sem revisao em producao', 'PR sem contexto na descricao', 'Responder a review sem explicacao']}
        code={`# Fluxo completo de PR

# 1. Criar branch
git switch -c feature/adicionar-busca

# 2. Desenvolver e commitar
git add .
git commit -m "feat: implementa busca por titulo"
git commit -m "test: adiciona testes da busca"
git commit -m "docs: documenta endpoint de busca"

# 3. Atualizar com main antes de abrir PR
git fetch origin
git rebase origin/main

# 4. Push e abrir PR
git push origin feature/adicionar-busca
# GitHub: New Pull Request

# Template de descricao de PR:
## O que essa PR faz?
# Adiciona endpoint GET /artigos?q=termo para busca por titulo e conteudo.

## Como testar?
# 1. npm run dev
# 2. GET /artigos?q=javascript
# 3. Retorna artigos com "javascript" no titulo ou conteudo

## Checklist
# - [x] Testes unitarios passando
# - [x] Sem console.log deixado
# - [x] Variavel de ambiente documentada no .env.example

# Apos aprovacao:
git switch main
git pull
git branch -d feature/adicionar-busca`}
        result={`PR aberta: feature/adicionar-busca -> main
CI passou: 42 testes ok
Revisor aprovou com 2 sugestoes
Sugestoes atendidas
LGTM (Looks Good To Me)
Merge realizado: squash commit`}
        errors={['Merge conflict na PR — rebase na main antes de pedir review', 'CI failing — corrija os testes antes de pedir merge', 'PR muito grande — divida em PRs menores por contexto']}
        tips={['Squash merge: junta todos os commits da PR em um so na main', 'Linked issues: "Closes #42" na descricao fecha a issue automaticamente', 'CODEOWNERS define quem deve revisar cada parte do codigo', 'GitHub sugere revisores com base no historico']}
        checklist={['Branch atualizada com main antes do PR?', 'Descricao explicando o que, por que e como testar?', 'CI passando?', 'Review solicitada ao colega certo?']}
      >
        <p className='text-sm text-gray-600'>Analogia: PR e como entregar um relatorio para o chefe antes de publicar. Voce escreve (commits), entrega para revisao (PR), o chefe lê (code review), pode pedir ajustes (comentarios), e quando aprova, publica (merge). O CI e como o corretor ortografico automatico que roda antes da revisao humana.</p>
      </TopicCard>

      <CodeBlock
        title='GitHub Actions — CI/CD Automatico'
        language='yaml'
        code={`# .github/workflows/ci.yml
# Roda em todo push e PR para main

name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # JOB 1: Testes e lint
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do codigo
        uses: actions/checkout@v4

      - name: Instalar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci         # mais rapido e seguro que npm install

      - name: Rodar lint
        run: npm run lint

      - name: Rodar testes
        run: npm test
        env:
          DATABASE_URL: \${{ secrets.TEST_DATABASE_URL }}
          JWT_SECRET: \${{ secrets.JWT_SECRET }}

      - name: Build de producao
        run: npm run build

  # JOB 2: Deploy (so na main apos testes)
  deploy:
    needs: test             # so roda se o job test passar
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'   # so na main
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy no Railway
        uses: railwayapp/railway-action@v1
        with:
          service: 'meu-backend'
        env:
          RAILWAY_TOKEN: \${{ secrets.RAILWAY_TOKEN }}

# .github/workflows/pr-check.yml
# Verifica o tamanho da PR
name: PR Size Check
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Checar tamanho do PR
        uses: codelytv/pr-size-labeler@v1
        with:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          xs_max_size: 10
          s_max_size: 100
          m_max_size: 400
          l_max_size: 800`}
      />

      <TopicCard
        title='Conventional Commits e Semantic Release'
        definition='Conventional Commits e uma convencao de mensagens de commit que serve de linguagem universal entre devs. Com ela, ferramentas como semantic-release conseguem gerar CHANGELOGs automaticos e versionar o projeto automaticamente seguindo SemVer (x.y.z).'
        whenToUse={['feat: nova funcionalidade', 'fix: correcao de bug', 'chore: tarefas sem impacto no usuario (deps, config)', 'docs: apenas documentacao', 'refactor: refatoracao sem novo comportamento', 'BREAKING CHANGE: mudanca incompativel com versao anterior']}
        whenNotToUse={['fix: wip, fix, stuff, ajuste — mensagens que nao dizem nada', 'Multiplos contextos no mesmo commit — separe em commits menores']}
        code={`# Exemplos de Conventional Commits
git commit -m "feat: adiciona autenticacao com Google OAuth"
git commit -m "fix: corrige vazamento de token no log"
git commit -m "docs: adiciona exemplos no README"
git commit -m "refactor: extrai validacao para funcao separada"
git commit -m "test: adiciona testes de integracao para /auth"
git commit -m "chore: atualiza dependencias de seguranca"

# Breaking change (gera major version: 2.0.0)
git commit -m "feat!: muda formato da resposta da API

BREAKING CHANGE: campo 'userId' renomeado para 'id'"

# Escopo opcional
git commit -m "feat(auth): adiciona refresh token"
git commit -m "fix(api): corrige status code no erro 404"

# Com commitizen (interativo)
# npm install -g commitizen
# npx cz  -- abre wizard de commit

# Gerar CHANGELOG automatico
# npm install --save-dev @commitlint/cli @commitlint/config-conventional
# Adiciona hook no .husky/commit-msg:
# npx --no -- commitlint --edit \${1}`}
        result={`CHANGELOG.md gerado automaticamente:
## [2.1.0] - 2024-01-15
### Features
- auth: adiciona autenticacao com Google OAuth
- feat: nova busca full-text

## [2.0.0] - 2024-01-10
### BREAKING CHANGES
- api: campo userId renomeado para id`}
        errors={['commit-msg hook rejeitando — mensagem fora do padrao convencional', 'BREAKING CHANGE sem corpo do commit — adicione no corpo apos linha em branco']}
        tips={['Commitlint + Husky garante o padrao automaticamente no pre-commit', 'git log --oneline fica muito mais legivel com conventional commits', 'Ferramentas como `release-it` automatizam o versionamento', 'type(scope): description — scope e opcional mas ajuda muito']}
        checklist={['Padrao de commits definido para o projeto?', 'Commitlint configurado?', 'CI verificando padrao de commits?', 'CHANGELOG sendo gerado?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Conventional Commits e como usar etiquetas padronizadas nas caixas de mudanca. Em vez de "arrumei coisa", voce escreve "fix(checkout): corrige calculo de frete". Qualquer pessoa que chegar depois entende o que mudou, onde e por que — sem precisar abrir o codigo.</p>
      </TopicCard>
    </div>
  );
}

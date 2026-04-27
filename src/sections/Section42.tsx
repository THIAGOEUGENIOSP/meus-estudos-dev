import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section42() {
  return (
    <div>
      <SectionHeader number={42} title='Git: Fundamentos' subtitle='Repositório, commits, branches, merge, rebase, resolucao de conflitos e .gitignore' />

      <Diagram title='Estados de um arquivo no Git'>
{`CICLO DE VIDA DOS ARQUIVOS:

  [Untracked]  -- git add -->  [Staged]  -- git commit -->  [Committed]
       ^                           |                              |
       |                           |                              |
       +--- git rm --cached ---+   |                              |
       |                           v                              |
       +--- git restore -------  [Modified]  <-- (editar) -------+

  AREAS DO GIT:
  Working Tree    = seus arquivos no disco (o que voce ve)
  Staging Area    = "foto pronta para commitar" (git add)
  Repository      = historico de commits (.git/)
  Remote          = copia no servidor (GitHub, GitLab)

  FLUXO BASICO:
  editar --> git add --> git commit --> git push

  ESTADOS:
  ? = Untracked (novo, git nao conhece)
  M = Modified  (git conhece, mas mudou)
  A = Added     (no staging, pronto para commit)
  U = Conflict  (merge com conflito)`}
      </Diagram>

      <TopicCard
        title='Comandos Essenciais do Git'
        definition='Git e um sistema de controle de versao que funciona como um historico fotografico do seu projeto. Cada commit e uma foto do estado dos arquivos naquele momento. Voce pode voltar a qualquer foto, comparar fotos ou criar linhas do tempo alternativas (branches).'
        whenToUse={['git init para comecar um repositorio local', 'git add . para adicionar todos os arquivos ao staging', 'git commit -m "mensagem clara" para salvar o estado', 'git log para ver o historico de commits']}
        whenNotToUse={['git commit -m "fix" — mensagens vagas nao explicam nada para o futuro', 'git add . sem verificar o que esta sendo adicionado', 'Commitar senhas, .env ou node_modules — use .gitignore', 'git push --force sem aviso — reescreve historico publico']}
        code={`# Configuracao inicial (uma vez por maquina)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git config --global core.editor "code --wait"  # VSCode

# Iniciar e primeiro commit
git init
git add .
git commit -m "feat: pagina inicial do projeto"

# Ver status e historico
git status          # arquivos modificados/staged
git log             # historico completo
git log --oneline   # historico resumido
git diff            # ver o que mudou (unstaged)
git diff --staged   # ver o que esta no staging

# Desfazer coisas
git restore arquivo.js       # desfaz mudancas no arquivo
git restore --staged arquivo.js  # remove do staging
git commit --amend -m "nova mensagem"  # corrige ultimo commit

# .gitignore (crie na raiz do projeto)
# node_modules/
# .env
# dist/
# .DS_Store
# *.log

# Ver o que esta sendo ignorado
git check-ignore -v arquivo

# Conectar ao GitHub
git remote add origin https://github.com/user/repo.git
git branch -M main
git push -u origin main  # primeiro push
git push                  # pushes seguintes`}
        result={`git status:
  Changes to be committed:
    new file: index.html
  Changes not staged:
    modified: style.css

git log --oneline:
  a1b2c3d feat: pagina inicial
  e4f5g6h chore: setup do projeto`}
        errors={['fatal: not a git repository — voce esta fora da pasta do projeto', 'nothing to commit — nenhum arquivo foi adicionado com git add', 'rejected (non-fast-forward) — historico local divergiu, faca git pull primeiro']}
        tips={['Commits pequenos e frequentes sao melhores que commits gigantes', 'Prefixos de mensagem: feat, fix, docs, style, refactor, test, chore', 'git stash salva o trabalho incompleto sem commitar', 'git log --graph --oneline visualiza branches visualmente']}
        checklist={['Nome e email configurados?', '.gitignore com node_modules e .env?', 'Commits com mensagens descritivas?', 'Repositorio remoto conectado?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Git e como o "Ctrl+Z" com memoria permanente e ramificacoes. Cada commit e um save do jogo — voce pode sempre voltar. O staging e como uma bandeja: voce vai colocando o que quer salvar antes de apertar o botao.</p>
      </TopicCard>

      <TopicCard
        title='Branches, Merge e Rebase'
        definition='Branch e uma linha do tempo alternativa do projeto. Voce cria uma branch para desenvolver uma funcionalidade sem afetar o codigo principal (main). Depois de pronto, voce une as linhas com merge ou rebase. Merge preserva todo o historico. Rebase reescreve o historico deixando-o linear.'
        whenToUse={['Uma branch por funcionalidade: feature/login, fix/bug-pagamento', 'git merge para unir branches com historico preservado', 'git rebase para historico linear antes de abrir PR', 'git cherry-pick para trazer um commit especifico de outra branch']}
        whenNotToUse={['git rebase em branches compartilhadas — reescreve historico publico', 'Trabalhar direto na main — sem branch, sem revisao', 'Merge de branches com 200+ commits — dificil revisar', 'git push --force apos rebase em branch com outros colaboradores']}
        code={`# Criar e mudar para nova branch
git checkout -b feature/sistema-login
# ou (Git moderno):
git switch -c feature/sistema-login

# Ver branches
git branch          # branches locais
git branch -r       # branches remotas
git branch -a       # todas

# Trabalhar na branch
git add .
git commit -m "feat: tela de login criada"
git push origin feature/sistema-login

# Merge: une na main preservando historico
git switch main
git merge feature/sistema-login
git push

# Rebase: reaplica commits sobre a main (historico linear)
git switch feature/sistema-login
git rebase main           # reaplica commits da feature sobre a main

# Resolver conflito de merge:
# 1. Git marca os conflitos no arquivo:
# <<<<<<< HEAD         (seu codigo)
# sua versao
# =======
# versao deles
# >>>>>>> feature/login (codigo do merge)
# 2. Edite o arquivo, escolha o que manter
# 3. git add arquivo.js
# 4. git commit (para merge) ou git rebase --continue (para rebase)

# Deletar branch apos merge
git branch -d feature/sistema-login        # local
git push origin --delete feature/sistema-login  # remota`}
        result={`git switch -c feature/login -> Switched to new branch
git merge feature/login   -> Fast-forward ou Merge commit
git log --oneline --graph:
  * a1b2c3 feat: login
  * d4e5f6 feat: tela de login
  |/
  * g7h8i9 chore: setup`}
        errors={['CONFLICT (content): Merge conflict in app.js — edite o arquivo e resolva', 'error: cannot merge — uncommitted changes, faca commit ou stash antes', 'Your branch is behind origin/main — faca git pull antes de push']}
        tips={['git stash antes de mudar de branch com trabalho incompleto', 'Rebase reescreve hash dos commits — nunca em branches publicas', 'git merge --no-ff forca um merge commit mesmo em fast-forward', 'VSCode tem interface grafica excelente para resolver conflitos']}
        checklist={['Branch criada para cada funcionalidade?', 'Merge ou rebase feito na main?', 'Branch deletada apos merge?', 'Conflitos resolvidos corretamente?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Branch e como uma copia paralela do livro onde voce escreve um capitulo novo sem sujar o original. Merge e grampear o capitulo no lugar certo. Rebase e como reescrever o capitulo como se ele sempre tivesse sido escrito depois do ultimo capitulo do original.</p>
      </TopicCard>
    </div>
  );
}

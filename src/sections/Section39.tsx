import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section39() {
  return (
    <div>
      <SectionHeader number={39} title='SQL: Fundamentos' subtitle='Bancos relacionais, SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY e tipos de dados' />

      <Diagram title='Estrutura de um Banco Relacional'>
{`BANCO RELACIONAL - TABELAS E RELACIONAMENTOS:

  Banco: loja
    |
    +-- Tabela: usuarios
    |     id | nome       | email              | criado_em
    |     -- | ---------- | ------------------ | ----------
    |      1 | Ana Silva  | ana@email.com      | 2024-01-01
    |      2 | Bruno Lima | bruno@email.com    | 2024-01-02
    |
    +-- Tabela: produtos
    |     id | nome       | preco  | estoque
    |     -- | ---------- | ------ | -------
    |      1 | Camiseta   | 49.90  | 100
    |      2 | Calca      | 89.90  | 50
    |
    +-- Tabela: pedidos
          id | usuario_id | produto_id | qtd
          -- | ---------- | ---------- | ---
           1 |          1 |          1 |   2   <-- Ana comprou 2 camisetas
           2 |          2 |          2 |   1   <-- Bruno comprou 1 calca

  CHAVES:
  PRIMARY KEY  = identificador unico da linha (id)
  FOREIGN KEY  = referencia a outra tabela (usuario_id -> usuarios.id)
  UNIQUE       = valor nao pode repetir (email)`}
      </Diagram>

      <TopicCard
        title='SELECT — Buscando Dados'
        definition='SELECT e o comando mais usado em SQL — e como uma busca no Google para o banco de dados. Voce diz o que quer (colunas), de onde (tabela) e com quais filtros (WHERE). O banco encontra e te devolve.'
        whenToUse={['SELECT * para listar tudo durante desenvolvimento', 'SELECT col1, col2 em producao — nunca traga colunas desnecessarias', 'WHERE para filtrar resultados especificos', 'ORDER BY para classificar e LIMIT para paginar']}
        whenNotToUse={['SELECT * em tabelas grandes de producao — mata performance', 'SELECT sem WHERE para deletar/atualizar — perigoso demais']}
        code={`-- Buscar todas as colunas de usuarios
SELECT * FROM usuarios;

-- Buscar colunas especificas
SELECT id, nome, email FROM usuarios;

-- Filtrar com WHERE
SELECT * FROM produtos WHERE preco < 50.00;
SELECT * FROM usuarios WHERE nome = 'Ana Silva';

-- Multiplos filtros
SELECT * FROM produtos
WHERE preco > 30 AND estoque > 0;

SELECT * FROM produtos
WHERE nome = 'Camiseta' OR nome = 'Calca';

-- Ordenar resultados
SELECT * FROM produtos ORDER BY preco ASC;   -- crescente
SELECT * FROM produtos ORDER BY preco DESC;  -- decrescente

-- Limitar resultados (paginacao)
SELECT * FROM produtos LIMIT 10;
SELECT * FROM produtos LIMIT 10 OFFSET 20;  -- pagina 3

-- Busca parcial com LIKE
SELECT * FROM usuarios WHERE nome LIKE 'Ana%';  -- começa com Ana
SELECT * FROM usuarios WHERE email LIKE '%@gmail.com';

-- Valores em lista com IN
SELECT * FROM produtos WHERE id IN (1, 2, 5);`}
        result={`SELECT * FROM usuarios:
id | nome       | email
 1 | Ana Silva  | ana@email.com
 2 | Bruno Lima | bruno@email.com

SELECT * FROM produtos WHERE preco < 50:
id | nome      | preco
 1 | Camiseta  | 49.90`}
        errors={['column "nome" does not exist — nome da coluna errado, verifique o schema', 'table "usuario" does not exist — nome da tabela errado', 'syntax error at or near "WHERE" — falta espaco ou palavra errada']}
        tips={['Use EXPLAIN antes de SELECT para ver o plano de execucao', 'LIKE com % no inicio (\'%termo\') nao usa index — evite', 'Sempre use aliases descritivos: AS nome_cliente', 'NULL nao e igual a nada — use IS NULL, nao = NULL']}
        checklist={['SELECT funciona sem WHERE?', 'Filtros com WHERE testados?', 'ORDER BY e LIMIT funcionando?', 'LIKE para busca parcial?']}
      >
        <p className='text-sm text-gray-600'>Analogia: SELECT e como preencher um formulario de pesquisa — voce escolhe o que quer ver (colunas), onde buscar (FROM tabela) e os filtros (WHERE). O banco e o atendente que vai la buscar exatamente o que voce pediu.</p>
      </TopicCard>

      <TopicCard
        title='INSERT, UPDATE e DELETE — Modificando Dados'
        definition='INSERT adiciona linhas novas, UPDATE modifica linhas existentes e DELETE remove. Os tres comandos exigem cuidado: UPDATE e DELETE sem WHERE alteram TODAS as linhas da tabela — e um dos erros mais comuns e devastadores em banco de dados.'
        whenToUse={['INSERT para criar novos registros', 'UPDATE com WHERE para atualizar registros especificos', 'DELETE com WHERE para remover registros especificos', 'Sempre use transacoes para operacoes criticas']}
        whenNotToUse={['UPDATE sem WHERE — alterar todas as linhas e quase sempre um erro', 'DELETE sem WHERE — apagar a tabela inteira', 'INSERT sem listar colunas — se o schema mudar, quebra tudo']}
        code={`-- INSERT - adicionar dados
INSERT INTO usuarios (nome, email) VALUES ('Carlos', 'carlos@email.com');

-- Inserir varios de uma vez
INSERT INTO produtos (nome, preco, estoque) VALUES
  ('Tenis', 149.90, 30),
  ('Meia', 12.90, 200),
  ('Bone', 39.90, 80);

-- UPDATE - atualizar dados (SEMPRE com WHERE!)
UPDATE produtos SET preco = 45.90 WHERE id = 1;

-- Atualizar multiplas colunas
UPDATE produtos
SET preco = 44.90, estoque = 90
WHERE id = 1;

-- UPDATE com calculo
UPDATE produtos SET estoque = estoque - 1 WHERE id = 1;

-- DELETE - remover dados (SEMPRE com WHERE!)
DELETE FROM usuarios WHERE id = 3;
DELETE FROM produtos WHERE estoque = 0;

-- CUIDADO: sem WHERE apaga TUDO
-- DELETE FROM usuarios;  --> APAGA TODOS OS USUARIOS!
-- UPDATE produtos SET preco = 0; --> ZERA TODOS OS PRECOS!

-- Usando transacao para seguranca
BEGIN;
  UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
  UPDATE contas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;
-- se algo falhar antes do COMMIT: ROLLBACK;`}
        result={`INSERT: 1 linha inserida
UPDATE: 1 linha atualizada
DELETE: 1 linha removida

Transacao:
BEGIN OK -> UPDATE conta 1 OK -> UPDATE conta 2 OK -> COMMIT OK
Ambas as operacoes confirmadas atomicamente`}
        errors={['violates foreign key constraint — nao pode inserir usuario_id que nao existe em usuarios', 'duplicate key value violates unique constraint — email ja existe', 'UPDATE sem WHERE — sem mensagem de erro, mas altera TODAS as linhas!']}
        tips={['Antes de DELETE/UPDATE sem WHERE: SELECT primeiro para ver o que sera afetado', 'Use transacoes (BEGIN/COMMIT) para operacoes que dependem uma da outra', 'RETURNING * (PostgreSQL) devolve a linha inserida/atualizada', 'Faça backup antes de migrations que alteram dados existentes']}
        checklist={['INSERT com colunas explicitadas?', 'UPDATE sempre com WHERE testado?', 'DELETE sempre com WHERE testado?', 'Transacoes para operacoes criticas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: INSERT e como preencher um formulario novo. UPDATE e como editar um formulario existente. DELETE e como rasgar o formulario. A diferenca crucial: sem WHERE, voce edita ou rasga TODOS os formularios da pasta ao mesmo tempo.</p>
      </TopicCard>

      <TopicCard
        title='Tipos de Dados e Constraints'
        definition='Tipos de dados definem o que cada coluna pode armazenar. Constraints sao regras que o banco garante automaticamente — como um fiscal que nao deixa dado invalido entrar. Juntos, garantem a integridade dos dados sem precisar validar tudo no codigo.'
        whenToUse={['NOT NULL para colunas obrigatorias', 'UNIQUE para emails, CPF, usernames', 'DEFAULT para valores padrao (created_at, status)', 'CHECK para validar intervalos (preco > 0)']}
        whenNotToUse={['TEXT para tudo — perde validacao e performance', 'Sem constraints — depender so do frontend para validar e inseguro', 'FLOAT para dinheiro — use NUMERIC/DECIMAL para evitar arredondamento']}
        code={`-- Criando tabela com tipos e constraints
CREATE TABLE produtos (
  id         SERIAL PRIMARY KEY,         -- auto-incremento (PostgreSQL)
  nome       VARCHAR(100) NOT NULL,      -- texto ate 100 chars, obrigatorio
  descricao  TEXT,                       -- texto longo, opcional
  preco      NUMERIC(10, 2) NOT NULL,    -- decimal, 2 casas (dinheiro)
  estoque    INTEGER DEFAULT 0,          -- inteiro com valor padrao
  ativo      BOOLEAN DEFAULT true,       -- verdadeiro/falso
  criado_em  TIMESTAMP DEFAULT NOW(),    -- data/hora automatica
  CONSTRAINT preco_positivo CHECK (preco > 0),
  CONSTRAINT estoque_valido CHECK (estoque >= 0)
);

-- SQLite (mais simples)
CREATE TABLE usuarios (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nome      TEXT NOT NULL,
  email     TEXT NOT NULL UNIQUE,
  senha     TEXT NOT NULL,
  criado_em TEXT DEFAULT (datetime('now'))
);

-- Tipos mais comuns
-- INTEGER / BIGINT   → numeros inteiros
-- NUMERIC(p,s)       → decimal exato (use para dinheiro)
-- VARCHAR(n)         → texto com limite
-- TEXT               → texto sem limite
-- BOOLEAN            → true/false
-- DATE               → 2024-01-15
-- TIMESTAMP          → 2024-01-15 10:30:00
-- UUID               → id unico universal`}
        result={`CREATE TABLE executado com sucesso
Constraints ativas:
- id: PRIMARY KEY (unico + not null)
- nome: NOT NULL (sempre obrigatorio)
- preco: CHECK (nao aceita preco <= 0)
- email: UNIQUE (nao aceita duplicatas)`}
        errors={['value too long for type character varying(100) — texto maior que o limite', 'invalid input syntax for type numeric — texto onde espera numero', 'null value in column "nome" — campo NOT NULL sem valor']}
        tips={['Use SERIAL ou AUTOINCREMENT para IDs — nunca gere IDs manualmente', 'NUMERIC(10,2) para dinheiro, nao FLOAT (evita 0.1 + 0.2 = 0.30000000004)', 'Timestamps em UTC no banco — converta no frontend conforme timezone', 'UUID como PK dificulta enumeracao de IDs por atacantes']}
        checklist={['PRIMARY KEY em toda tabela?', 'NOT NULL nas colunas obrigatorias?', 'UNIQUE no email/username?', 'NUMERIC para valores monetarios?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Tipos de dados e constraints sao como os campos de um formulario oficial — o campo CPF so aceita numeros, o campo data so aceita datas validas, o campo email precisa ser preenchido. O banco faz esse fiscal automaticamente, sem precisar de codigo extra.</p>
      </TopicCard>
    </div>
  );
}

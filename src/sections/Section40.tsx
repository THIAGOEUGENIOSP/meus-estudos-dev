import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section40() {
  return (
    <div>
      <SectionHeader number={40} title='SQL: JOINs e Agregacao' subtitle='INNER JOIN, LEFT JOIN, GROUP BY, HAVING, subconsultas, indices e o ORM Prisma' />

      <Diagram title='Tipos de JOIN'>
{`JOINS - COMBINANDO TABELAS:

  usuarios          pedidos
  id | nome         id | usuario_id | produto_id
   1 | Ana           1 |          1 |          1
   2 | Bruno         2 |          1 |          2
   3 | Carlos        3 |          2 |          1
                                        (Carlos nao tem pedido)

  INNER JOIN (so os que casam nos dois lados):
    Ana   -> pedido 1, pedido 2
    Bruno -> pedido 3
    Carlos -> NAO APARECE (nao tem pedido)

  LEFT JOIN (todos da esquerda, mesmo sem par):
    Ana    -> pedido 1, pedido 2
    Bruno  -> pedido 3
    Carlos -> NULL (sem pedido, mas aparece)

  RIGHT JOIN (todos da direita, mesmo sem par):
    pedido 1 -> Ana
    pedido 2 -> Ana
    pedido 3 -> Bruno

  FULL OUTER JOIN (todos dos dois lados):
    Ana    + pedidos
    Bruno  + pedidos
    Carlos + NULL`}
      </Diagram>

      <TopicCard
        title='JOINs — Unindo Tabelas'
        definition='JOIN e como juntar duas planilhas pelo campo em comum. INNER JOIN retorna so as linhas que se casam nos dois lados. LEFT JOIN retorna tudo da tabela da esquerda, com ou sem par na direita. 90% dos casos do dia a dia usam um desses dois.'
        whenToUse={['INNER JOIN para buscar dados relacionados que devem existir nos dois lados', 'LEFT JOIN para listar registros mesmo sem relacao (ex: usuarios sem pedidos)', 'Alias (AS u, AS p) para nomes curtos em queries longas', 'JOINs multiplos para combinar 3+ tabelas']}
        whenNotToUse={['JOINs em tabelas sem index nas colunas de relacao — performance ruim', 'Mais de 5 JOINs na mesma query — considere desnormalizar ou usar views', 'JOIN sem ON — gera produto cartesiano: M*N linhas']}
        code={`-- INNER JOIN: usuarios com seus pedidos
SELECT
  u.nome,
  p.id AS pedido_id,
  pr.nome AS produto,
  pr.preco
FROM pedidos p
  INNER JOIN usuarios u  ON p.usuario_id = u.id
  INNER JOIN produtos pr ON p.produto_id = pr.id;

-- LEFT JOIN: todos os usuarios, mesmo sem pedido
SELECT
  u.nome,
  COUNT(p.id) AS total_pedidos
FROM usuarios u
  LEFT JOIN pedidos p ON p.usuario_id = u.id
GROUP BY u.id, u.nome;

-- Resultado:
-- Ana    -> 2 pedidos
-- Bruno  -> 1 pedido
-- Carlos -> 0 pedidos  (aparece por causa do LEFT JOIN)

-- JOIN com alias e filtro
SELECT u.nome, pr.nome AS produto, pr.preco
FROM pedidos p
  JOIN usuarios u  ON p.usuario_id = u.id
  JOIN produtos pr ON p.produto_id = pr.id
WHERE pr.preco > 50
ORDER BY pr.preco DESC;`}
        result={`nome      | pedido_id | produto   | preco
--------- | --------- | --------- | ------
Ana Silva |         1 | Camiseta  | 49.90
Ana Silva |         2 | Calca     | 89.90
Bruno     |         3 | Camiseta  | 49.90`}
        errors={['ambiguous column name "id" — use alias: u.id, p.id', 'ON clause missing — JOIN sem ON gera produto cartesiano', 'column "u.nome" must appear in GROUP BY — adicione ao GROUP BY']}
        tips={['Index nas colunas usadas em JOIN (FK) e obrigatorio para performance', 'Prefira JOIN explicito (INNER JOIN) ao implicito (FROM a, b WHERE)', 'Use EXPLAIN ANALYZE para ver se o banco esta usando index', 'Alias curtos (u, p, pr) tornam queries longas mais legiveis']}
        checklist={['ON correto em cada JOIN?', 'Alias definidos para evitar ambiguidade?', 'Colunas de FK com index?', 'EXPLAIN usado para verificar performance?']}
      >
        <p className='text-sm text-gray-600'>Analogia: INNER JOIN e como a intersecao de dois circulos de Venn — so o que esta nos dois ao mesmo tempo. LEFT JOIN e como pegar o circulo inteiro da esquerda mais o que coincidir com a direita.</p>
      </TopicCard>

      <TopicCard
        title='GROUP BY, HAVING e Funcoes de Agregacao'
        definition='Funcoes de agregacao (COUNT, SUM, AVG, MIN, MAX) calculam valores sobre grupos de linhas. GROUP BY agrupa as linhas. HAVING filtra os grupos (como WHERE, mas para grupos). Juntos, permitem relatorios e estatisticas direto no banco — muito mais eficiente do que trazer tudo pro codigo.'
        whenToUse={['COUNT(*) para contar registros', 'SUM para totalizadores financeiros', 'GROUP BY para agrupar por categoria', 'HAVING para filtrar grupos (ex: clientes com mais de 5 pedidos)']}
        whenNotToUse={['HAVING quando pode usar WHERE — WHERE e mais rapido (filtra antes de agrupar)', 'Agregar no codigo quando o banco pode fazer — desperdicao de memoria e rede', 'GROUP BY sem index nas colunas agrupadas em tabelas grandes']}
        code={`-- COUNT: contar registros
SELECT COUNT(*) AS total FROM usuarios;
SELECT COUNT(DISTINCT email) AS emails_unicos FROM usuarios;

-- SUM e AVG: totais e medias
SELECT
  SUM(preco * qtd) AS receita_total,
  AVG(preco)       AS ticket_medio,
  MIN(preco)      AS menor_preco,
  MAX(preco)      AS maior_preco
FROM pedidos p
  JOIN produtos pr ON p.produto_id = pr.id;

-- GROUP BY: agrupar por categoria
SELECT
  u.nome,
  COUNT(p.id)          AS total_pedidos,
  SUM(pr.preco * p.qtd) AS valor_total
FROM pedidos p
  JOIN usuarios u  ON p.usuario_id = u.id
  JOIN produtos pr ON p.produto_id = pr.id
GROUP BY u.id, u.nome
ORDER BY valor_total DESC;

-- HAVING: filtrar grupos (pos-agrupamento)
SELECT
  usuario_id,
  COUNT(*) AS total_pedidos
FROM pedidos
GROUP BY usuario_id
HAVING COUNT(*) > 2;   -- so usuarios com mais de 2 pedidos

-- WHERE filtra antes do GROUP, HAVING filtra depois
SELECT categoria, COUNT(*), AVG(preco)
FROM produtos
WHERE ativo = true           -- filtra linhas ANTES de agrupar
GROUP BY categoria
HAVING AVG(preco) > 50;      -- filtra grupos DEPOIS de agrupar`}
        result={`nome      | total_pedidos | valor_total
--------- | ------------- | -----------
Ana Silva |             2 |      139.80
Bruno     |             1 |       49.90

HAVING COUNT(*) > 2:
usuario_id=1 tem 3 pedidos -> aparece
usuario_id=2 tem 1 pedido  -> NAO aparece`}
        errors={['column must appear in GROUP BY — qualquer coluna no SELECT que nao e agregacao precisa estar no GROUP BY', 'HAVING sem GROUP BY — sem sentido, use WHERE', 'aggregate function not allowed in WHERE — use HAVING para filtrar agregacoes']}
        tips={['Filtre com WHERE antes do GROUP BY sempre que possivel — e mais eficiente', 'COUNT(*) conta todas as linhas; COUNT(coluna) ignora NULLs', 'ROLLUP e CUBE geram subtotais automaticamente', 'Window Functions (ROW_NUMBER, LAG) sao mais poderosas que GROUP BY para analytics']}
        checklist={['COUNT, SUM, AVG funcionando?', 'GROUP BY com todas as colunas nao-agregadas?', 'HAVING para filtrar grupos (nao WHERE)?', 'ORDER BY no resultado final?']}
      >
        <p className='text-sm text-gray-600'>Analogia: GROUP BY e como separar uma pilha de notas fiscais por loja. COUNT e contar quantas tem em cada pilha, SUM e somar os valores de cada pilha. HAVING e como dizer: "me mostre so as pilhas com mais de 10 notas".</p>
      </TopicCard>

      <TopicCard
        title='Prisma ORM — SQL com TypeScript'
        definition='Prisma e um ORM que gera um cliente TypeScript tipado para o seu banco de dados. Em vez de escrever SQL na mao, voce usa metodos JavaScript com autocompletar e verificacao de tipos. O schema.prisma e a fonte da verdade: descreve as tabelas e o Prisma gera o cliente, as migrations e os tipos.'
        whenToUse={['Projetos Node.js/TypeScript que precisam de banco relacional', 'Quando voce quer type-safety nas queries (zero erros de typo)', 'Migrations automaticas com controle de versao', 'Prisma Studio para inspecionar dados graficamente']}
        whenNotToUse={['Queries muito complexas com JOINs de 5+ tabelas — use SQL bruto ($queryRaw)', 'Projetos que precisam de max performance em queries especificas', 'Banco de dados que o Prisma nao suporta (Oracle, DB2)']}
        code={`// 1. Instalacao
// npm install prisma @prisma/client
// npx prisma init

// 2. prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // ou "sqlite", "mysql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int       @id @default(autoincrement())
  nome      String
  email     String    @unique
  criado_em DateTime  @default(now())
  pedidos   Pedido[]  // relacao 1:N
}

model Produto {
  id       Int      @id @default(autoincrement())
  nome     String
  preco    Decimal  @db.Decimal(10, 2)
  estoque  Int      @default(0)
  pedidos  Pedido[]
}

model Pedido {
  id          Int      @id @default(autoincrement())
  qtd         Int
  usuario     Usuario  @relation(fields: [usuarioId], references: [id])
  usuarioId   Int
  produto     Produto  @relation(fields: [produtoId], references: [id])
  produtoId   Int
  criado_em   DateTime @default(now())
}

// 3. Rodar migration
// npx prisma migrate dev --name init
// npx prisma generate  (gera o client)

// 4. Usando o Prisma Client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
const usuario = await prisma.usuario.create({
  data: { nome: 'Ana', email: 'ana@email.com' }
});

// READ com JOIN (include)
const usuarios = await prisma.usuario.findMany({
  include: { pedidos: { include: { produto: true } } }
});

// READ com filtros
const caros = await prisma.produto.findMany({
  where: { preco: { gt: 50 } },
  orderBy: { preco: 'desc' },
  take: 10,  // LIMIT
});

// UPDATE
await prisma.produto.update({
  where: { id: 1 },
  data: { preco: 45.90, estoque: { decrement: 1 } }
});

// DELETE
await prisma.usuario.delete({ where: { id: 3 } });

// SQL bruto para queries complexas
const resultado = await prisma.$queryRaw\`
  SELECT u.nome, COUNT(p.id) as total
  FROM usuarios u
  LEFT JOIN pedidos p ON p.usuario_id = u.id
  GROUP BY u.id
\`;`}
        result={`Migration criada: 20240115_init
Prisma Client gerado com tipos TypeScript

const usuarios = await prisma.usuario.findMany(...)
usuarios[0].nome        -> string (tipado!)
usuarios[0].pedidos[0].produto.preco -> Decimal (tipado!)`}
        errors={['Environment variable not found: DATABASE_URL — configure o .env', 'Migration failed — verifique se o banco esta rodando', 'Unknown field "nomee" — typo no campo, Prisma pega em compile time!']}
        tips={['npx prisma studio abre interface grafica do banco no browser', 'prisma.$transaction([]) para operacoes atomicas', 'Gere o client apos cada mudanca no schema: npx prisma generate', 'Use select: { campo: true } para trazer so colunas necessarias']}
        checklist={['DATABASE_URL no .env?', 'npx prisma migrate dev rodado?', 'npx prisma generate rodado?', 'PrismaClient instanciado uma so vez (singleton)?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Prisma e como um tradutor automatico com dicionario — voce escreve em JavaScript/TypeScript, ele traduz para SQL correto. E como o Google Tradutor, mas com verificacao ortografica em tempo real: se voce errar o nome de um campo, ele ja sublinha antes de rodar.</p>
      </TopicCard>
    </div>
  );
}

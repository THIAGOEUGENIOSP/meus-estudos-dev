import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section41() {
  return (
    <div>
      <SectionHeader number={41} title='SQL: Projeto Pratico' subtitle='Blog completo com PostgreSQL + Prisma: schema, migrations, CRUD de posts, comentarios e autenticacao' />

      <Diagram title='Schema do Blog'>
{`BANCO DO BLOG - RELACIONAMENTOS:

  Usuario (1) ----< Artigo (N)
                       |
                    (1)|
                       |
                    Comentario (N) >---- (1) Usuario

  TABELAS:
  usuarios
    id, nome, email, senha_hash, avatar, criado_em

  artigos
    id, titulo, slug, conteudo, publicado, autor_id, criado_em

  comentarios
    id, texto, artigo_id, autor_id, criado_em

  tags
    id, nome, slug

  artigo_tags (N:N)
    artigo_id, tag_id

  INDICES:
  artigos.slug         -> UNIQUE (URL amigavel)
  artigos.autor_id     -> INDEX (queries por autor)
  comentarios.artigo_id-> INDEX (carregar comentarios)`}
      </Diagram>

      <Diagram title='Fluxo de Queries do Blog'>
{`FLUXO DE QUERIES:

  GET /artigos
    SELECT a.*, u.nome AS autor, COUNT(c.id) AS total_comentarios
    FROM artigos a
    JOIN usuarios u ON a.autor_id = u.id
    LEFT JOIN comentarios c ON c.artigo_id = a.id
    WHERE a.publicado = true
    GROUP BY a.id, u.nome
    ORDER BY a.criado_em DESC
    LIMIT 10;

  GET /artigos/:slug
    SELECT a.*, u.nome, u.avatar
    FROM artigos a JOIN usuarios u ON a.autor_id = u.id
    WHERE a.slug = $1 AND a.publicado = true;

    + SELECT c.*, u.nome FROM comentarios c
      JOIN usuarios u ON c.autor_id = u.id
      WHERE c.artigo_id = $2
      ORDER BY c.criado_em ASC;

  POST /artigos
    INSERT INTO artigos (titulo, slug, conteudo, autor_id)
    VALUES ($1, $2, $3, $4) RETURNING *;`}
      </Diagram>

      <CodeBlock
        title='Schema Prisma Completo do Blog'
        language='typescript'
        code={`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id          Int          @id @default(autoincrement())
  nome        String
  email       String       @unique
  senhaHash   String       @map("senha_hash")
  avatar      String?
  criadoEm   DateTime     @default(now()) @map("criado_em")
  artigos     Artigo[]
  comentarios Comentario[]
  @@map("usuarios")
}

model Artigo {
  id          Int          @id @default(autoincrement())
  titulo      String
  slug        String       @unique
  conteudo    String
  publicado   Boolean      @default(false)
  criadoEm   DateTime     @default(now()) @map("criado_em")
  autor       Usuario      @relation(fields: [autorId], references: [id])
  autorId     Int          @map("autor_id")
  comentarios Comentario[]
  tags        ArtigoTag[]
  @@index([autorId])
  @@map("artigos")
}

model Comentario {
  id       Int      @id @default(autoincrement())
  texto    String
  criadoEm DateTime @default(now()) @map("criado_em")
  artigo   Artigo   @relation(fields: [artigoId], references: [id], onDelete: Cascade)
  artigoId Int      @map("artigo_id")
  autor    Usuario  @relation(fields: [autorId], references: [id])
  autorId  Int      @map("autor_id")
  @@index([artigoId])
  @@map("comentarios")
}

model Tag {
  id      Int        @id @default(autoincrement())
  nome    String     @unique
  slug    String     @unique
  artigos ArtigoTag[]
  @@map("tags")
}

model ArtigoTag {
  artigo   Artigo @relation(fields: [artigoId], references: [id])
  artigoId Int    @map("artigo_id")
  tag      Tag    @relation(fields: [tagId], references: [id])
  tagId    Int    @map("tag_id")
  @@id([artigoId, tagId])
  @@map("artigo_tags")
}`}
      />

      <CodeBlock
        title='Queries e Controllers do Blog'
        language='typescript'
        code={`import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// ── Listar artigos publicados com autor e contagem de comentarios ──
export async function listarArtigos(req: Request, res: Response) {
  const pagina = Number(req.query.pagina) || 1;
  const porPagina = 10;

  const [artigos, total] = await prisma.$transaction([
    prisma.artigo.findMany({
      where: { publicado: true },
      include: {
        autor: { select: { nome: true, avatar: true } },
        _count: { select: { comentarios: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { criadoEm: 'desc' },
      take: porPagina,
      skip: (pagina - 1) * porPagina,
    }),
    prisma.artigo.count({ where: { publicado: true } }),
  ]);

  res.json({
    artigos,
    paginacao: {
      total,
      pagina,
      totalPaginas: Math.ceil(total / porPagina),
    },
  });
}

// ── Buscar artigo por slug com comentarios ──
export async function buscarArtigo(req: Request, res: Response) {
  const artigo = await prisma.artigo.findUnique({
    where: { slug: req.params.slug, publicado: true },
    include: {
      autor: { select: { nome: true, avatar: true } },
      comentarios: {
        include: { autor: { select: { nome: true } } },
        orderBy: { criadoEm: 'asc' },
      },
      tags: { include: { tag: true } },
    },
  });
  if (!artigo) return res.status(404).json({ erro: 'Artigo nao encontrado' });
  res.json(artigo);
}

// ── Criar artigo (usuario autenticado) ──
export async function criarArtigo(req: Request, res: Response) {
  const { titulo, conteudo, tags, publicado } = req.body;

  // Gerar slug unico
  const slugBase = titulo.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = slugBase + '-' + Date.now();

  const artigo = await prisma.artigo.create({
    data: {
      titulo,
      slug,
      conteudo,
      publicado: publicado ?? false,
      autorId: req.user.id,
      tags: {
        create: tags?.map((tagId: number) => ({ tagId })) ?? [],
      },
    },
    include: { tags: { include: { tag: true } } },
  });
  res.status(201).json(artigo);
}

// ── Busca full-text (PostgreSQL) ──
export async function buscarTexto(req: Request, res: Response) {
  const { q } = req.query;
  const artigos = await prisma.$queryRaw\`
    SELECT id, titulo, slug,
      ts_headline('portuguese', conteudo, plainto_tsquery('portuguese', \${q})) AS trecho
    FROM artigos
    WHERE publicado = true
      AND to_tsvector('portuguese', titulo || ' ' || conteudo)
          @@ plainto_tsquery('portuguese', \${q})
    ORDER BY ts_rank(
      to_tsvector('portuguese', titulo || ' ' || conteudo),
      plainto_tsquery('portuguese', \${q})
    ) DESC
    LIMIT 20
  \`;
  res.json(artigos);
}

// ── Estatisticas gerais (raw SQL com agregacao) ──
export async function stats(_req: Request, res: Response) {
  const dados = await prisma.$queryRaw\`
    SELECT
      COUNT(DISTINCT a.id)    AS total_artigos,
      COUNT(DISTINCT u.id)    AS total_autores,
      COUNT(DISTINCT c.id)    AS total_comentarios,
      AVG(LENGTH(a.conteudo)) AS media_chars_artigo
    FROM artigos a
    JOIN usuarios u ON a.autor_id = u.id
    LEFT JOIN comentarios c ON c.artigo_id = a.id
    WHERE a.publicado = true
  \`;
  res.json(dados[0]);
}`}
      />

      <TopicCard
        title='Pontos-Chave do Projeto'
        definition='Este projeto aplica SQL + Prisma em um cenario real: paginacao, busca full-text, relacoes N:N (artigos-tags), transacoes e raw SQL para queries que o ORM nao suporta. Cada escolha tem um motivo tecnico.'
        whenToUse={['prisma.$transaction para garantir atomicidade (contar + listar juntos)', '_count do Prisma para contagens sem LEFT JOIN manual', 'Raw SQL ($queryRaw) para full-text search e queries muito especificas', 'onDelete: Cascade para remover comentarios ao deletar artigo']}
        whenNotToUse={['findMany sem paginacao em tabelas grandes — vai travar', 'slug gerado so pelo titulo — pode colidir', 'SQL interpolado manualmente — risco de SQL Injection (use prisma.$queryRaw com template literals)']}
        code={`// Paginacao correta
const [items, total] = await prisma.$transaction([
  prisma.artigo.findMany({ take: 10, skip: (page-1)*10 }),
  prisma.artigo.count(),
]);

// N:N com create ninh connectOrCreate
await prisma.artigo.create({
  data: {
    tags: {
      connectOrCreate: [
        { where: { nome: 'javascript' }, create: { nome: 'javascript', slug: 'js' } }
      ]
    }
  }
});`}
        errors={['SQL Injection — NUNCA interpolacao manual em $queryRaw, use template literal', 'N+1 queries — sem include, cada artigo faz query separada para autor', 'Transacao sem $transaction — duas queries separadas podem ter dados inconsistentes']}
        tips={['Prisma Accelerate adiciona connection pooling e cache — essencial em producao', 'INDEX em colunas de busca frequente: slug, autorId, artigoId', 'EXPLAIN ANALYZE na query mais lenta para identificar gargalos', 'npx prisma studio para inspecionar dados em desenvolvimento']}
        checklist={['Paginacao implementada?', 'Indices nas FK e colunas de busca?', 'Transacao para operacoes multiplas?', 'Cascade delete configurado?', 'Raw SQL usando template literals (nao interpolacao)?']}
      >
        <p className='text-sm text-gray-600'>Analogia: O blog e como uma revista online — o banco e o arquivo fisico com todas as materias e fotos, o Prisma e o bibliotecario que sabe exatamente onde achar cada coisa, as queries sao os pedidos do jornalista, e o index e o indice do arquivo — sem ele, o bibliotecario tem que ler cada pagina para encontrar o que voce quer.</p>
      </TopicCard>
    </div>
  );
}

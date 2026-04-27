import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section31() {
  return (
    <div>
      <SectionHeader number={31} title='Next.js: Data Fetching e API' subtitle='Server vs Client Components, fetch no servidor, Server Actions, API Routes, middleware, cookies e revalidacao' />
      <Diagram title='Server Component vs Client Component'>
{`SERVER COMPONENT (padrao no App Router):
  [Requisicao] --> [Servidor renderiza] --> [HTML estatico] --> [Browser]
                    |- fetch direto          |- sem JavaScript
                    |- acesso a DB           |- leve, rapido
                    |- SEM estado            |- SEO perfeito
                    |- SEM interatividade

CLIENT COMPONENT (use client):
  [Browser] --> [Baixa JS] --> [React hidrata] --> [Interativo]
                |- useState, useEffect       |- onClick, onChange
                |- hooks de navegador        |- animacoes
                |- COM estado                |- COM interatividade
                |- SEM acesso a DB direto

FLUXO MISTO:
  Server Component (layout, dados)
       |
       +-- Client Component (botao, formulario)
              |
              +-- Server Action (mutacao no servidor)`}
      </Diagram>
      <Diagram title='Server Action - Fluxo Completo'>
{`FORMULARIO COM SERVER ACTION:

  [Usuario clica Submit]
         |
         v
  [Client Component envia formData]
         |
         v
  [Server Action executa no servidor]
    |- valida dados
    |- salva no banco
    |- revalida cache
         |
         v
  [Router.refresh() atualiza UI]
         |
         v
  [Usuario ve resultado atualizado]

NENHUM API Route necessaria!
O formulario vai direto ao servidor.`}
      </Diagram>
      <TopicCard
        title='Server Components vs Client Components'
        definition={"Server Components sao como os funcionarios da cozinha — trabalham nos bastidores, preparam tudo, mas o cliente nunca ve. Client Components sao como os garcons — interagem com o cliente, recebem pedidos, respondem a cliques. O App Router usa Server Components por padrao. Adicione 'use client' so onde precisar de interatividade."}
        whenToUse={['Server Component para buscar dados, acessar DB, SEO', 'Client Component para onClick, useState, useEffect, hooks', 'Mistura: Server Component pai + Client Component filho', 'Server Component para layout; Client Component para formularios']}
        whenNotToUse={['Client Component para dados estaticos — desperdicio de JS', 'Server Component para formularios interativos — nao funciona', 'useState em Server Component — erro de compilacao', 'useEffect em Server Component — so funciona no cliente']}
        code={`// Server Component (PADRAO - sem use client)
// app/blog/page.tsx
async function BlogPage() {
  // fetch direto no servidor! Sem useEffect!
  const posts = await fetch('https://api.exemplo.com/posts', {
    cache: 'no-store', // SSR: sempre fresco
    // next: { revalidate: 60 }, // ISR: revalida a 60s
  }).then(r => r.json());

  return (
    <div>
      {posts.map(p => <article key={p.id}>{p.titulo}</article>)}
      <FormularioComentario /> {/* Client Component */}
    </div>
  );
}

// Client Component
// app/components/FormularioComentario.tsx
'use client'; // OBRIGATORIO!
import { useState } from 'react';
export default function FormularioComentario() {
  const [texto, setTexto] = useState('');
  return (
    <form>
      <input value={texto} onChange={e => setTexto(e.target.value)} />
      <button type='submit'>Comentar</button>
    </form>
  );
}`}
        result={`BlogPage: renderiza no servidor com dados frescos
FormularioComentario: renderiza no cliente com estado`}
        errors={["useState em Server Component — 'use client' necessario", "fetch com cache: 'force-cache' padrao no App Router", 'Cannot read property de undefined — dados assincronos no cliente sem useEffect']}
        tips={["Server Component e o padrao — adicione 'use client' so quando necessario", "Mova 'use client' para o componente mais baixo possivel", 'Passar funcoes de servidor como prop para Client Component nao funciona — use Server Actions']}
        checklist={['Server Components para buscar dados?', "Client Components so com 'use client'?", 'Nenhum useState/useEffect em Server Component?', 'Componentes interativos isolados no nivel mais baixo?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Server Components sao a cozinha do restaurante — preparam tudo nos bastidores, o cliente so ve o prato pronto. Client Components sao o garcom — interage, anota pedidos, responde a sinais. O App Router manda tudo pela cozinha primeiro; so chama o garcom quando precisa de interacao.</p>
      </TopicCard>
      <TopicCard
        title='Server Actions e API Routes'
        definition='Server Actions sao como um telefone direto entre o garcom e a cozinha — o pedido vai reto, sem fila. API Routes sao como o cardapio digital — endpoints REST que qualquer cliente pode chamar. Server Actions substituem API Routes para mutacoes do formulario. API Routes ainda existem para webhooks e integracoes externas.'
        whenToUse={['Server Actions para formularios e mutacoes (criar, atualizar, deletar)', 'API Routes para webhooks, integracoes externas, CRON', 'Server Actions com revalidatePath para atualizar cache', 'API Routes quando precisa de resposta JSON para terceiros']}
        whenNotToUse={['Server Actions para APIs publicas — use API Routes', 'API Routes para formularios simples — Server Actions sao mais diretos', "Server Action sem 'use server' — obrigatorio", 'API Route para mutacoes internas — Server Actions sao mais simples']}
        code={`// Server Action (app/actions.ts)
'use server'; // OBRIGATORIO no topo do arquivo!
import { revalidatePath } from 'next/cache';

export async function criarPost(formData) {
  const titulo = formData.get('titulo');
  const conteudo = formData.get('conteudo');

  await db.post.create({ data: { titulo, conteudo } });
  revalidatePath('/blog'); // atualiza cache!
}

// Uso no formulario
import { criarPost } from './actions';
function NovoPost() {
  return (
    <form action={criarPost}>
      <input name='titulo' required />
      <textarea name='conteudo' required />
      <button type='submit'>Publicar</button>
    </form>
  );
}

// API Route (app/api/hello/route.ts)
export async function GET(request) {
  return Response.json({ mensagem: 'Hello API!' });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ criado: true, dados: body });
}`}
        result={`Server Action: formulario salva e revalida cache automaticamente
API Route GET: { mensagem: 'Hello API!' }
API Route POST: { criado: true, dados: {...} }`}
        errors={["Server Action sem 'use server' — nao e reconhecido", 'form action sem FormData — use name nos inputs', 'API Route sem return Response — precisa retornar Response']}
        tips={['Server Actions eliminam a necessidade de API Routes para formularios', 'revalidatePath atualiza o cache sem recarregar a pagina', 'API Routes usam Web Response API — Response.json() nativo', 'Combine Server Actions com useOptimistic para UX instantanea']}
        checklist={["Server Actions com 'use server' no topo?", 'form action aponta para a Server Action?', 'revalidatePath apos mutacao?', 'API Routes para integracoes externas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Server Actions sao como o interfone entre mesa e cozinha — o pedido vai direto, sem garcom intermediario. API Routes sao como o delivery — qualquer pessoa pode ligar e pedir. Para formularios internos, interfone. Para webhooks e delivery, API Routes.</p>
      </TopicCard>
      <TopicCard
        title='Middleware, Cookies e Revalidacao'
        definition='Middleware e como o seguranca na porta do restaurante — roda antes de cada request e decide quem entra e para onde vai. Cookies sao como o cartao fidelidade — identificam o cliente entre visitas. Revalidacao e como trocar o cardapio — atualiza os dados sem refazer tudo. Use middleware para autenticacao, redirects e logs.'
        whenToUse={['Middleware para autenticacao e protecao de rotas', 'Middleware para redirects baseados em regiao ou idioma', 'Cookies para sessao do usuario e preferencias', 'revalidatePath/revalidateTag para atualizar cache apos mutacoes']}
        whenNotToUse={['Middleware para logica pesada — atrasa toda request', 'Cookies para dados grandes — use banco de dados', 'revalidatePath sem necessidade — invalida cache inteiro', 'Middleware para fetch de dados — use Server Component']}
        code={`// middleware.ts (na raiz do projeto!)
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
  const token = request.cookies.get('auth-token');

  // Protege rotas privadas
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Adiciona header customizado
  const response = NextResponse.next();
  response.headers.set('x-middleware', 'ativo');
  return response;
}

// Configura quais rotas usam middleware
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};

// Lendo cookies no Server Component
import { cookies } from 'next/headers';
async function PaginaProtegida() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  if (!token) return <p>Nao autorizado</p>;
  return <p>Conteudo protegido</p>;
}

// Revalidacao apos mutacao
import { revalidatePath, revalidateTag } from 'next/cache';
'use server';
export async function atualizarPost(formData) {
  await db.post.update({ where: { id: 1 }, data: {...} });
  revalidatePath('/blog');       // revalida rota
  revalidateTag('posts');        // revalida por tag
}`}
        result={`Middleware: redireciona /admin sem token para /login
Cookies: le auth-token no Server Component
Revalidacao: atualiza cache de /blog e tag 'posts'`}
        errors={['middleware.ts fora da raiz — precisa estar na raiz ou src/', 'cookies() sem await — retorna Promise no App Router', 'matcher com sintaxe invalida — use glob patterns']}
        tips={['Middleware roda antes de cada request — mantenha leve', 'cookies() e async no App Router — sempre use await', 'revalidateTag e mais granular que revalidatePath', 'Combine middleware com cookies para autenticacao robusta']}
        checklist={['middleware.ts na raiz do projeto?', 'Matcher configurado para rotas certas?', 'cookies() com await?', 'revalidatePath ou revalidateTag apos mutacoes?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Middleware e como o porteiro do predio — verifica quem entra e para onde vai. Cookies sao como o cracha de visitante — identifica quem voltou. Revalidacao e como trocar o cardapio impresso — em vez de reimprimir tudo, voce so substitui a pagina que mudou.</p>
      </TopicCard>
    </div>
  );
}

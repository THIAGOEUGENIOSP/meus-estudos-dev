import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section30() {
  return (
    <div>
      <SectionHeader number={30} title='Next.js: Fundamentos e Routing' subtitle='Framework React full-stack, SSR vs SSG vs ISR vs CSR, App Router, layouts, paginas, rotas dinamicas e navegacao' />
      <Diagram title='SSR vs SSG - Fluxo de Renderizacao'>
{`SSR (Server-Side Rendering):
  Requisicao --> Servidor renderiza --> HTML --> Cliente
  [Usuario] --GET--> [Next.js Server] --render()--> [HTML] --> [Browser]
  Cada requisicao = nova renderizacao (sempre fresco)

SSG (Static Site Generation):
  Build time --> Gera HTML estatico --> CDN --> Cliente
  [npm run build] --gera--> [HTML estatico] --serve--> [CDN] --> [Browser]
  Gera uma vez, serve milhoes (rapido, mas estatico)

ISR (Incremental Static Regeneration):
  HTML estatico + revalidacao periodica
  [CDN] --serve--> [Browser]
     |
     +-- timeout (revalidate: 60) --> [Regera no background]
  Melhor dos dois: rapido + atualizado

CSR (Client-Side Rendering):
  [Browser] --baixa JS--> [React hidrata] --> [Conteudo]
  SEO ruim, primeiro load lento`}
      </Diagram>
      <Diagram title='App Router - Estrutura de Arquivos'>
{`app/
  layout.tsx          <-- Layout raiz (obrigatorio)
  page.tsx            <-- Pagina raiz: /
  loading.tsx         <-- Suspense fallback
  error.tsx           <-- Error boundary
  not-found.tsx       <-- 404 customizado
  blog/
    layout.tsx        <-- Layout do blog
    page.tsx          <-- /blog
    [slug]/
      page.tsx        <-- /blog/meu-post (rota dinamica)
    [id]/
      page.tsx        <-- /blog/123 (rota dinamica)
  (marketing)/
    layout.tsx        <-- Layout do grupo
    sobre/
      page.tsx        <-- /sobre (grupo nao vira URL)
  api/
    hello/
      route.ts        <-- API Route: /api/hello

middleware.ts         <-- Roda antes de cada request`}
      </Diagram>
      <TopicCard
        title='O que e Next.js e Modos de Renderizacao'
        definition='Next.js e como uma cozinha industrial equipada — em vez de montar tudo do zero (React puro), voce tem forno, geladeira e fogao prontos. SSR renderiza no servidor como um chef que prepara o prato na hora. SSG e como um buffet — tudo pronto antes do cliente chegar. ISR e o buffet que repoe automaticamente. CSR e pedir para o cliente cozinhar.'
        whenToUse={['SSR para paginas com dados que mudam a cada request (painel, feed)', 'SSG para conteudo estatico (blog, landing page, docs)', 'ISR para conteudo que atualiza mas nao a cada segundo', 'CSR para areas privadas onde SEO nao importa']}
        whenNotToUse={['SSR para conteudo estatico — desperdicio de servidor', 'SSG para dados em tempo real — fica desatualizado', 'CSR para paginas publicas — SEO e indexacao ruins', 'ISR com revalidate muito baixo — vira SSR disfarçado']}
        code={`// next.config.js - configuracao basica
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
// export default nextConfig;

// Pagina SSG (Static Site Generation)
export default function BlogIndex({ posts }) {
  return posts.map(p => <article key={p.id}>{p.titulo}</article>);
}

// Gera HTML estatico no build
export async function getStaticProps() {
  const posts = await fetch('https://api.blog.com/posts');
  return { props: { posts: await posts.json() } };
}

// ISR: revalida a cada 60 segundos
export async function getStaticProps() {
  const posts = await fetch('https://api.blog.com/posts');
  return {
    props: { posts: await posts.json() },
    revalidate: 60, // ISR aqui!
  };
}`}
        result={`SSG: HTML gerado no build, servido pela CDN
ISR: HTML estatico + regeneracao a cada 60s
SSR: HTML gerado a cada request no servidor`}
        errors={['getStaticProps em page.tsx com App Router — nao existe mais', 'revalidate: 0 — desativa ISR, vira SSR', 'Error: Hybrid mode — conflito de export async functions']}
        tips={['App Router usa export const revalidate no lugar de getStaticProps', 'SSG e o padrao em Server Components sem fetch dinamico', 'ISR e SSG com revalidacao — melhor custo-beneficio para blogs']}
        checklist={['Definiu o modo de renderizacao de cada pagina?', 'SSG para conteudo estatico?', 'ISR para conteudo que atualiza periodicamente?', 'SSR so para dados em tempo real?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Next.js e como comprar um apartamento mobiliado — voce ja tem a estrutura pronta. SSR e o chef que cozinha na hora, SSG e o buffet pronto, ISR e o buffet que repoe sozinho, CSR e o apartamento vazio onde voce cozinha.</p>
      </TopicCard>
      <TopicCard
        title='App Router: layout.tsx, page.tsx e Rotas Dinamicas'
        definition={'O App Router e como o sistema de endereco de um predio — cada pasta e um andar, layout.tsx e o hall de entrada do andar, page.tsx e o apartamento. Rotas dinamicas com [id] sao como apartamentos numerados — o mesmo layout, conteudo diferente. Route groups com (nome) sao como alas do predio — agrupam sem aparecer no endereco.'}
        whenToUse={['layout.tsx para elementos compartilhados (nav, footer)', 'page.tsx para conteudo unico de cada rota', '[id] ou [slug] para rotas dinamicas (blog, produtos)', 'Route groups (auth) para layouts sem afetar URL']}
        whenNotToUse={['layout.tsx para dados que mudam por pagina — use page.tsx', 'page.tsx sem layout.tsx raiz — obrigatorio ter', 'Rotas dinamicas sem generateStaticParams em SSG — gera 404', 'Route groups para URLs diferentes — eles nao criam segmento']}
        code={`// app/layout.tsx - Layout raiz (OBRIGATORIO)
export default function RootLayout({ children }) {
  return (
    <html lang='pt-BR'>
      <body>
        <nav>Meu App</nav>
        {children}
      </body>
    </html>
  );
}

// app/page.tsx - Pagina raiz /
export default function Home() {
  return <h1>Bem-vindo!</h1>;
}

// app/blog/[slug]/page.tsx - Rota dinamica
export default function PostPage({ params }) {
  // params.slug = valor da URL
  return <h1>Post: {params.slug}</h1>;
}

// Gera paginas estaticas no build
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

// app/(marketing)/sobre/page.tsx
// Route group: URL e /sobre (nao /marketing/sobre)
export default function Sobre() {
  return <h1>Sobre nos</h1>;
}`}
        result={`/ -> Home
/blog/meu-post -> PostPage com params.slug='meu-post'
/sobre -> Sobre (route group nao aparece na URL)`}
        errors={['layout.tsx sem html e body — erro de hidratacao', 'params.slug undefined — esqueceu generateStaticParams em SSG', 'Route group sem parenteses — vira segmento de URL']}
        tips={['Layout preserva estado entre navegacoes — nao recarrega', 'page.tsx e o unico componente que renderiza conteudo novo', 'generateStaticParams() gera todas as rotas dinamicas no build', 'Route groups organizam codigo sem mudar a URL']}
        checklist={['Layout raiz com html e body?', 'page.tsx em cada rota?', 'generateStaticParams para rotas dinamicas em SSG?', 'Route groups com parenteses?']}
      >
        <p className='text-sm text-gray-600'>Analogia: O App Router e como um shopping — layout.tsx e a estrutura do predio (escadas, elevadores), page.tsx e cada loja, rotas dinamicas sao lojas de franquia (mesmo layout, produtos diferentes), route groups sao as alas (norte/sul) que organizam mas nao mudam o endereco.</p>
      </TopicCard>
      <TopicCard
        title='loading.tsx, error.tsx e Navegacao Link/useRouter'
        definition={'loading.tsx e como a tela de carregamento do elevador — mostra enquanto sobe. error.tsx e o plano de emergencia — quando algo da errado, mostra a saida. Link e a porta automatica entre salas — navega sem recarregar. useRouter e o controle remoto — navega programaticamente.'}
        whenToUse={['loading.tsx para feedback visual durante carregamento', 'error.tsx para capturar erros e mostrar fallback', 'Link para toda navegacao interna — nunca <a> para rotas internas', 'useRouter para redirecionamentos apos acoes (login, submit)']}
        whenNotToUse={['loading.tsx com dados pesados — prefira Suspense granular', 'error.tsx para erros globais — use error_global.tsx', '<a> para rotas internas — recarrega a pagina toda', 'useRouter no Server Component — so funciona no Client']}
        code={`// app/blog/loading.tsx - Suspense automatico
export default function Loading() {
  return <p>Carregando posts...</p>;
}

// app/blog/error.tsx - Error boundary
// DEVE ser Client Component!
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Algo deu errado!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
}

// Navegacao com Link
import Link from 'next/link';
<Link href='/blog'>Blog</Link>
<Link href={'/blog/' + post.slug}>Ler mais</Link>

// Navegacao programatica com useRouter
'use client';
import { useRouter } from 'next/navigation';
function LoginForm() {
  const router = useRouter();
  async function login(e) {
    e.preventDefault();
    await fazerLogin();
    router.push('/dashboard'); // redireciona
    router.refresh(); // revalida dados
  }
  return <form onSubmit={login}>...</form>;
}`}
        result={`loading.tsx: mostra "Carregando..." enquanto page carrega
error.tsx: mostra mensagem + botao "Tentar novamente"
Link: navegacao instantanea sem reload
useRouter: redireciona apos login`}
        errors={["error.tsx sem 'use client' — error boundary precisa de Client Component", "useRouter em Server Component — so funciona com 'use client'", 'Link com href externo sem target — use <a> para externos']}
        tips={['loading.tsx e auto-envolvido em Suspense pelo Next.js', 'error.tsx recebe reset() para tentar novamente', 'Link prefetcha a pagina ao entrar no viewport — navegacao instantanea', 'router.refresh() revalida sem perder estado do cliente']}
        checklist={["loading.tsx em rotas com dados?", "error.tsx com 'use client' e reset?", 'Link para toda navegacao interna?', 'useRouter apenas em Client Components?']}
      >
        <p className='text-sm text-gray-600'>Analogia: loading.tsx e como a tela do elevador que diz "subindo..." — acalma o usuario. error.tsx e o extintor de incendio — ninguem quer usar, mas salva quando precisa. Link e a porta automatica — voce nem percebe que mudou de sala. useRouter e o interfone — voce aperta e alguem te leva ao destino.</p>
      </TopicCard>
    </div>
  );
}

import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';
import CodeBlock from '../components/CodeBlock';

export default function Section32() {
  return (
    <div>
      <SectionHeader number={32} title='Next.js: Projeto Pratico' subtitle='Estrutura de projeto, SEO com metadata, imagens com next/image, fontes com next/font, blog com paginas dinamicas, layout compartilhado e busca' />
      <Diagram title='Arquitetura do Blog Next.js'>
{`BLOG NEXT.JS - ARQUITETURA:

  [Usuario] --> [Middleware] --> [App Router]
                                   |
                     +-------------+-------------+
                     |             |             |
                  layout.tsx    /blog        /blog/[slug]
                  (nav+footer)  (lista)      (post individual)
                     |             |             |
                     |      Server Component   Server Component
                     |      busca posts        busca post por slug
                     |             |             |
                     |      +------+             +------+
                     |      | Busca             | MDX/Content
                     |      | Client Comp       | renderizado
                     v      v                   v
                LAYOUT COMPARTILHADO
                +--------------------+
                | Header com busca   |
                | children (pagina)  |
                | Footer             |
                +--------------------+

  DADOS: posts.json ou CMS externo
  SEO: metadata export em cada page.tsx
  IMAGENS: next/image com otimizacao automatica
  FONTES: next/font com self-hosting`}
      </Diagram>
      <TopicCard
        title='SEO com metadata e Recursos Nativos'
        definition='metadata e como o cartao de visitas do seu site — diz ao Google quem voce e e do que trata. next/image e como ter um fotografo particular — otimiza, redimensiona e entrega no formato certo. next/font e como uma tipografia sob medida — carrega fontes sem layout shift. Sem esses recursos, o site e como uma loja sem placa.'
        whenToUse={['export const metadata para SEO de cada pagina', 'next/image para TODAS as imagens — otimizacao automatica', 'next/font para fontes customizadas — sem layout shift', 'generateMetadata para SEO dinamico (blog posts, produtos)']}
        whenNotToUse={['img HTML puro — perde otimizacao, lazy loading, WebP', 'Google Fonts via link — causa layout shift e CORS', 'metadata fixo em paginas dinamicas — use generateMetadata', 'next/image sem width/height — obrigatorio para imagens externas']}
        code={`// SEO com metadata (app/blog/page.tsx)
export const metadata = {
  title: 'Meu Blog',
  description: 'Blog sobre Next.js e desenvolvimento web',
  openGraph: {
    title: 'Meu Blog',
    description: 'Blog sobre Next.js',
    type: 'website',
  },
};

// SEO dinamico (app/blog/[slug]/page.tsx)
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.titulo,
    description: post.resumo,
  };
}

// next/image — otimizacao automatica
import Image from 'next/image';
<Image
  src='/hero.jpg'
  alt='Banner do blog'
  width={1200}
  height={600}
  priority // carrega acima do fold primeiro
/>

// next/font — sem layout shift
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
// <html className={inter.className}>

// Imagem externa com remotePatterns
// next.config.js:
// const nextConfig = {
//   images: {
//     remotePatterns: [{
//       protocol: 'https',
//       hostname: 'cdn.exemplo.com',
//     }],
//   },
// };`}
        result={`metadata: <title>Meu Blog</title> no <head>
next/image: WebP automatico, lazy loading, sizes
next/font: fonte carregada sem flash de texto`}
        errors={['next/image sem width/height em imagem externa — erro de build', 'Imagem externa sem remotePatterns — 403 Forbidden', 'metadata em Client Component — so funciona em Server Component']}
        tips={['generateMetadata e async — pode buscar dados do CMS', 'priority pula lazy loading — use so para imagens acima do fold', 'next/font elimina layout shift CLS — core web vital', 'openGraph melhora compartilhamento em redes sociais']}
        checklist={['metadata ou generateMetadata em cada pagina?', 'next/image para todas as imagens?', 'next/font para fontes customizadas?', 'remotePatterns para imagens externas?']}
      >
        <p className='text-sm text-gray-600'>Analogia: metadata e como a fachada e placa da loja — sem ela, ninguem sabe que voce existe. next/image e como ter um fotografo profissional que ja entrega no tamanho certo e formato ideal. next/font e como mandar fazer a letra da placa — sem atraso e sem borrão.</p>
      </TopicCard>
      <CodeBlock
        title='Projeto: Blog com Paginas Dinamicas, Layout Compartilhado e Busca'
        language='typescript'
        code={`// === BLOG NEXT.JS - CODIGO COMPLETO ===

// 1. app/layout.tsx — Layout raiz compartilhado
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DevBlog',
  description: 'Blog sobre desenvolvimento web',
};

export default function RootLayout({ children }) {
  return (
    <html lang='pt-BR' className={inter.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// 2. app/blog/page.tsx — Lista de posts
export const revalidate = 60; // ISR: revalida a 60s

async function getPosts() {
  const res = await fetch('https://api.exemplo.com/posts', {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section>
      <h1>Blog</h1>
      {posts.map(p => (
        <article key={p.id}>
          <h2>{p.titulo}</h2>
          <p>{p.resumo}</p>
          <a href={'/blog/' + p.slug}>Ler mais</a>
        </article>
      ))}
    </section>
  );
}

// 3. app/blog/[slug]/page.tsx — Post individual
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.titulo, description: post.resumo };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  const res = await fetch(
    'https://api.exemplo.com/posts/' + slug
  );
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.titulo}</h1>
      <Image
        src={post.imagem}
        alt={post.titulo}
        width={800}
        height={400}
      />
      <div dangerouslySetInnerHTML={{ __html: post.conteudo }} />
    </article>
  );
}

// 4. BlogPage com busca (Client Component)
'use client';
import { useState } from 'react';

export default function BlogComBusca({ posts }) {
  const [busca, setBusca] = useState('');
  const filtrados = posts.filter(p =>
    p.titulo.toLowerCase().includes(busca.toLowerCase())
  );
  return (
    <section>
      <input
        placeholder='Buscar posts...'
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      {filtrados.map(p => (
        <article key={p.id}>
          <h2>{p.titulo}</h2>
          <p>{p.resumo}</p>
        </article>
      ))}
    </section>
  );
}`}
      />
      <TopicCard
        title='Projeto: Pontos-Chave do Blog Next.js'
        definition='O blog une tudo que aprendemos: Server Components para buscar dados, rotas dinamicas para cada post, metadata para SEO, next/image para otimizacao, ISR para contedo atualizado, e Client Components para busca. Cada peca tem seu lugar — como um relogio suico.'
        whenToUse={['Server Components para buscar posts no servidor', 'generateStaticParams para gerar paginas estaticas no build', 'generateMetadata para SEO dinamico por post', 'Client Component para busca com estado local']}
        whenNotToUse={['Client Component para buscar posts — use Server Component', 'img HTML puro — sempre next/image', 'metadata fixo em posts dinamicos — use generateMetadata', 'getServerSideProps — nao existe no App Router']}
        code={`// PONTO-CHAVE 1: ISR com revalidate
// export const revalidate = 60;
// Atualiza posts a cada 60s sem rebuild

// PONTO-CHAVE 2: Rotas dinamicas com [slug]
// generateStaticParams gera todas as paginas no build
// Posts novos serao gerados on-demand (fallback)

// PONTO-CHAVE 3: Layout compartilhado
// Header e Footer no layout.tsx = nao recarregam
// Preserva estado entre navegacoes

// PONTO-CHAVE 4: SEO com generateMetadata
// Cada post tem title e description unicos
// openGraph para compartilhamento em redes

// PONTO-CHAVE 5: Busca no cliente
// 'use client' + useState para filtro local
// Nao precisa de API para busca em dados ja carregados`}
        result={`Blog: lista com ISR a 60s
Post: pagina estatica gerada no build
SEO: title e description unicos por post
Busca: filtro instantaneo no cliente`}
        errors={['params.slug undefined — esqueceu generateStaticParams', 'Image sem width/height — erro de build', "Busca em Server Component — useState nao funciona sem 'use client'"]}
        tips={['Combine ISR + generateStaticParams para performance maxima', 'Layout compartilhado nao recarrega — coloque Header/Footer la', 'Busca local e mais rapida que API — filtre dados ja carregados', 'priority no next/image da imagem do post hero']}
        checklist={['ISR com revalidate nas paginas do blog?', 'generateStaticParams para rotas [slug]?', 'generateMetadata para SEO dinamico?', 'next/image para todas as imagens?', 'next/font para fontes?', 'Layout compartilhado com Header/Footer?', 'Busca com Client Component isolado?']}
      >
        <p className='text-sm text-gray-600'>Analogia: O blog e como uma revista — Server Components sao a redacao que prepara as materias, rotas dinamicas sao as paginas numeradas, metadata e a capa e o indice, next/image e a impressao de alta qualidade, ISR e a nova edicao que sai sem reimprimir tudo, e a busca e o indice remissivo no final da revista.</p>
      </TopicCard>
    </div>
  );
}

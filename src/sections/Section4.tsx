import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section4() {
  return (
    <div>
      <SectionHeader number={4} title="HTML: Imagens e Midia" subtitle="Como exibir imagens, video e audio de forma acessivel e performatica" />

      <TopicCard
        title="Tag img — src, alt, loading, width, height"
        definition="Insere imagens na pagina. src aponta para o arquivo, alt descreve para acessibilidade, loading controla o carregamento."
        whenToUse={['Exibir fotos, icones, ilustracoes', 'Imagens com significado semantico', 'Imagens decorativas (alt vazio)']}
        whenNotToUse={['Nao use img para videos — use video', 'Nao use img para icones interativos — use SVG inline', 'Nao omita alt — e obrigatorio']}
        code={'<img\n  src="gato.jpg"\n  alt="Gato laranja dormindo no sofa"\n  loading="lazy"\n  width="600"\n  height="400"\n>'}
        result="Imagem carregada com atraso (lazy), acessivel e sem layout shift"
        errors={['Omitir alt — leitor de tela le o nome do arquivo', 'Deixar alt vazio em imagem significativa — perde contexto', 'Nao definir width/height — causa layout shift (CLS)']}
        tips={['loading="lazy" so carrega quando a imagem entra na viewport — economiza banda.']}
        checklist={['alt presente e descritivo', 'loading="lazy" para imagens fora da dobra', 'width e height definidos', 'src aponta para arquivo valido']}
      >
        A imagem e como uma janela: src e o que voce ve, alt e a descricao para quem nao pode ver pela janela. Sem alt, e como uma janela sem legenda.
      </TopicCard>

      <Diagram title="Boas praticas de alt — Quando usar o que?">
{`+-----------------------------+---------------------------+
|  IMAGEM COM SIGNIFICADO     |  IMAGEM DECORATIVA       |
|  alt="Gato dormindo"       |  alt=""                  |
|  (descreve o conteudo)     |  (vazio = ignorar)       |
+-----------------------------+---------------------------+
|  IMAGEM COM ACAO           |  IMAGEM COM TEXTO        |
|  alt="Buscar" (botao)      |  alt="Logo Empresa"     |
|  (descreve a funcao)       |  (nao repetir o texto)   |
+-----------------------------+---------------------------+
  NUNCA: alt="imagem"   NUNCA: alt="foto1.jpg"
  NUNCA: sem alt        NUNCA: alt com 300 palavras`}
      </Diagram>

      <TopicCard
        title="Figure e Figcaption"
        definition="figure envolve midia com legenda; figcaption descreve o conteudo. Sao como moldura e plaquinha de um quadro."
        whenToUse={['Imagem com legenda obrigatoria', 'Grafico ou diagrama com descricao', 'Codigo com titulo']}
        whenNotToUse={['Nao use figure para imagens sem legenda — img so basta', 'Nao use figcaption sem conteudo util']}
        code={'<figure>\n  <img src="grafico.jpg" alt="Grafico de vendas 2024">\n  <figcaption>Figura 1: Vendas cresceram 40% em 2024.</figcaption>\n</figure>'}
        result="Imagem com legenda semantica vinculada"
        errors={['Colocar legenda fora do figure — perde a vinculacao semantica']}
        tips={['figcaption pode ir antes ou depois da img — o navegador entende ambos.']}
        checklist={['figure envolve img + figcaption', 'figcaption descritivo e util', 'alt na img mesmo com figcaption']}
      />

      <TopicCard
        title="Video e Audio"
        definition="Exibe video e audio com controles nativos. Suporta multiplos formatos via source e legendas via track."
        whenToUse={['Videos com controles nativos', 'Audio como podcasts ou musicas', 'Multiplos formatos para compatibilidade']}
        whenNotToUse={['Nao use video para GIFs curtos — use img ou video autoplay muted loop', 'Nao use audio sem controle — irrita o usuario']}
        code={'<video controls width="640" height="360" poster="capa.jpg">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  <track kind="subtitles" src="legenda.vtt" srclang="pt" label="Portugues">\n  Seu navegador nao suporta video.\n</video>\n\n<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n  <source src="audio.ogg" type="audio/ogg">\n  Seu navegador nao suporta audio.\n</audio>'}
        result="Video com controles, capa, legendas e fallback; audio com controles"
        errors={['Esquecer controls — usuario nao pode pausar', 'Nao fornecer poster — tela preta antes do play', 'Sem track — video sem acessibilidade para surdos']}
        tips={['poster e como a capa de um DVD — da contexto antes do play.', 'source permite oferecer mp4 e webm: o navegador escolhe o melhor.']}
        checklist={['controls presente', 'poster no video', 'source com type', 'track para acessibilidade', 'Texto de fallback']}
      />

      <TopicCard
        title="Source e Track"
        definition="source fornece multiplos formatos de midia; track adiciona legendas, descricoes e capitulos."
        whenToUse={['Multiplos formatos (mp4+webm, mp3+ogg)', 'Legendas (subtitles), descricoes (descriptions)']}
        whenNotToUse={['Nao use source sem type — navegador nao sabe qual escolher', 'Nao use track sem srclang e label']}
        code={'<track kind="subtitles" src="pt.vtt" srclang="pt" label="Portugues">\n<track kind="captions" src="pt-cap.vtt" srclang="pt" label="PT - Legendas">\n<track kind="descriptions" src="pt-desc.vtt" srclang="pt" label="PT - Descricoes">'}
        result="Video com multiplas opcoes de legenda acessiveis"
        errors={['Usar kind errado — subtitles e para idioma, captions para surdos', 'Esquecer srclang — legenda nao se vincula ao idioma']}
        tips={['subtitles = traducao; captions = inclui efeitos sonoros para surdos.']}
        checklist={['source com type declarado', 'track com kind, srclang e label', 'Arquivo VTT formatado corretamente']}
      />
    </div>
  );
}

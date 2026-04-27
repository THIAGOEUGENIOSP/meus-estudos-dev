import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section14() {
  return (
    <div>
      <SectionHeader
        number={14}
        title="CSS: Box Model"
        subtitle="Margin, border, padding, content, box-sizing e display"
      />

      <Diagram title="Box Model - Camadas">
{`+=============================================+
|                  MARGIN                     |
|  +-----------------------------------------+|
|  |                BORDER                    ||
|  |  +-------------------------------------+||
|  |  |              PADDING                |||
|  |  |  +-------------------------------+ |||
|  |  |  |          CONTENT              | |||
|  |  |  |   (texto, imagem, etc)        | |||
|  |  |  +-------------------------------+ |||
|  |  +-------------------------------------+||
|  +-----------------------------------------+|
+=============================================+

  Largura total = margin + border + padding + content
  Com box-sizing: border-box -> border e padding
  estao DENTRO do width informado!`}
      </Diagram>

      <Diagram title="Display - Comparacao">
{`+------------------+--------------------+------------------+
| block            | inline             | inline-block     |
+------------------+--------------------+------------------+
| Ocupa linha toda | Fica na mesma linha| Mesma linha +    |
| width/height OK  | width/height IGNORA| width/height OK  |
| margin/padding   | margin/padding     | margin/padding   |
| 4 lados          | horizontal somente | 4 lados          |
+------------------+--------------------+------------------+
  Exemplos: div, p    Exemplos: span, a   Exemplos: img, btn`}
      </Diagram>

      <TopicCard
        title="Box Model: Margin, Border, Padding, Content"
        definition="Todo elemento HTML e uma caixa. Content e o conteudo, padding e o acolchoamento interno, border e a borda, margin e o espaco externo. E como uma caixa de presente: o presente e o content, o papel enche o padding, a fita e a border e o espaco na prateleira e a margin."
        whenToUse={['margin para separar elementos entre si', 'padding para espaco interno (entre conteudo e borda)', 'border para contornos visuais']}
        whenNotToUse={['margin para espaco interno (use padding)', 'padding para separar elementos (use margin)']}
        code={`.card {\n  content: /* texto/imagem aqui */\n  padding: 1.5rem;      /* espaco interno */\n  border: 2px solid #ddd; /* borda */\n  margin: 1rem auto;    /* centralizar horizontalmente */\n}\n\n/* Colapso de margem vertical */\nh1 { margin-bottom: 1rem; }\np  { margin-top: 1rem; }    /* total = 1rem, nao 2rem! */`}
        result="Card com espaco interno de 24px, borda cinza, centralizado. Margens verticais de h1 e p colapsam para 1rem."
        errors={["! Margens verticais colapsam entre elementos irmãos - a maior vence", "! padding aumenta o tamanho total SEM box-sizing: border-box"]}
        tips={["Use margin-top ou margin-bottom, nunca ambos para evitar colapso", "Use * { box-sizing: border-box } como reset global"]}
        checklist={["box-sizing: border-box aplicado globalmente", "margin para separacao entre elementos", "padding para espaco interno"]}
      >
        <p className="text-sm text-gray-600">Analogia: margin e o espaco entre cadeiras, padding e o acolchoado do assento.</p>
      </TopicCard>

      <TopicCard
        title="box-sizing: border-box"
        definition="O box-sizing define como o width/height e calculado. Com border-box, padding e border ficam DENTRO do tamanho que voce definiu. E como prometer &quot;essa caixa tem 200px&quot; e o navegador respeitar isso, incluindo borda e padding."
        whenToUse={['Sempre! border-box deve ser o padrao do seu projeto', 'Layouts com larguras controladas', 'Grids e colunas com tamanhos fixos']}
        whenNotToUse={['content-box so se precisar que width seja apenas o conteudo (raro)']}
        code={`/* Reset global - coloque no inicio do CSS */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Com border-box */\n.card {\n  width: 300px;     /* total = 300px! */\n  padding: 1rem;   /* ja incluido */\n  border: 2px solid; /* ja incluido */\n}\n\n/* Sem border-box (content-box) */\n.card-old {\n  width: 300px;     /* conteudo = 300px */\n  padding: 1rem;   /* total = 300 + 16 + 16 = 332px */\n}`}
        result="Com border-box: card tem exatamente 300px. Sem: card vaza para 332px."
        errors={["! Esquecer o reset global de box-sizing e a causa numero 1 de layouts quebrados"]}
        tips={["Use o seletor universal * para aplicar border-box a tudo", "Inclua ::before e ::after no reset"]}
        checklist={["Reset de box-sizing no inicio do CSS", "Todos os elementos com border-box", "Larguras previsiveis sem calculo manual"]}
      />

      <TopicCard
        title="Display: block, inline, inline-block, none"
        definition="Display define como o elemento se comporta no fluxo. block e um bloco que ocupa a linha toda (como uma parede). inline e um treco que flui no texto (como uma palavra). inline-block e o hibrido: fica na linha MAS aceita width/height. none faz desaparecer."
        whenToUse={['block para secoes, containers, paragrafos', 'inline para textos, links, spans', 'inline-block para botoes, badges', 'none para esconder elementos condicionalmente']}
        whenNotToUse={['none para conteudo que precisa ser acessivel (use sr-only)', 'block em elementos que deveriam ficar na mesma linha']}
        code={`/* block: ocupa a linha toda */\ndiv, p, h1, section { display: block; }\n\n/* inline: fica no texto */\nspan, a, strong { display: inline; }\n\n/* inline-block: na linha + aceita tamanho */\n.badge {\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n}\n\n/* none: remove do layout e da tela */\n.modal-hidden { display: none; }`}
        result="divs em linhas separadas, spans no meio do texto, badges na linha com tamanho custom, modal escondido"
        errors={["! display: none remove do layout (nao ocupa espaco) - visibility: hidden esconde mas mantem espaco", "! width/height em inline NAO funciona!"]}
        tips={["display: none vs visibility: hidden vs opacity: 0 - cada um tem efeito diferente na acessibilidade e layout", "Elementos inline nao aceitam margin-top/bottom"]}
        checklist={["Display correto para cada elemento", "inline-block quando precisa de tamanho na linha", "none para esconder, nao opacity: 0 para layout"]}
      >
        <p className="text-sm text-gray-600">Analogia: block = pessoa em pe no corredor, inline = pessoa sentada no banco, inline-block = pessoa sentada mas com espaco reservado.</p>
      </TopicCard>

      <TopicCard
        title="Outline"
        definition="Outline e uma borda visual que NAO faz parte do box model - nao ocupa espaco. E como uma aura ao redor do elemento, visivel mas sem empurrar nada."
        whenToUse={['Estados de foco em inputs e botoes', 'Debug visual de elementos (outline: 1px solid red)']}
        whenNotToUse={['Como substituto de border (outline nao tem radius)', 'Para designs decorativos (nao e tao controlavel)']}
        code={`/* Foco acessivel */\nbutton:focus-visible {\n  outline: 3px solid #10b981;\n  outline-offset: 2px; /* espaco entre outline e borda */\n}\n\n/* Remover outline sem quebrar acessibilidade */\nbutton:focus:not(:focus-visible) {\n  outline: none;\n}`}
        result="Botao com outline verde ao focar pelo teclado, sem outline ao clicar"
        errors={["! outline: none sem focus-visible quebra acessibilidade para teclado"]}
        tips={["Use outline-offset para afastar o outline do elemento", "Nunca remova outline sem oferecer alternativa acessivel"]}
        checklist={["Outline visivel em estados de foco", "focus-visible para navegacao por teclado", "outline-offset para melhor contraste"]}
      />
    </div>
  );
}

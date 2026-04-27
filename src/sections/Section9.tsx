import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';

export default function Section9() {
  return (
    <div>
      <SectionHeader number={9} title="HTML: Atributos Globais" subtitle="Atributos que funcionam em qualquer elemento — de class e id ate aria-* e data-*" />

      <TopicCard
        title="class e id"
        definition="class para agrupar elementos (CSS/JS), id para identificar unicamente. E como sobrenome (class) e CPF (id)."
        whenToUse={['class para estilizar grupos de elementos', 'id para elemento unico (ancora, label, JS)']}
        whenNotToUse={['Nao use id para CSS reutilizavel — class e melhor', 'Nao repita id — e invalido e quebra JS', 'Nao use id comecando com numero — invalido em CSS']}
        code={'<h1 class="titulo-principal">Blog</h1>\n<p class="destaque texto-centro">Texto</p>\n\n<section id="contato">Ancora</section>\n<label for="nome">Nome</label>\n<input id="nome" type="text">'}
        result="Class para grupos, id para unicos"
        errors={['ID duplicado — invalido e quebra label, CSS e JS', 'ID comecando com numero — CSS nao seleciona']}
        tips={['Um elemento pode ter varias classes (espaco separado), so um id.']}
        checklist={['class para grupos', 'id unico na pagina', 'id semeca com letra', 'sem IDs duplicados']}
      />

      <TopicCard
        title="style — Estilo inline"
        definition="Aplica CSS direto no elemento. Funciona, mas e como escrever no envelope em vez de usar formulario — desorganizado."
        whenToUse={['Prototipagem rapida', 'Estilo dinamico via JavaScript', 'Teste rapido de um valor']}
        whenNotToUse={['Nao use em producao — use classes CSS', 'Nao repetir o mesmo estilo em varios elementos', 'Nao misturar style com classes conflitantes']}
        code={'<p style="color: red; font-weight: bold;">Texto emergency</p>\n\n<!-- MELHOR: usar classe -->\n<p class="erro">Texto com classe CSS</p>'}
        result="Estilo aplicado, mas codigo dificil de manter"
        errors={['Abusar de style — impossivel de manter e sem cache', 'Usar !important em style — caos de especificidade']}
        tips={['style inline tem a maior especificidade — sobrescreve tudo exceto !important. Evite.']}
        checklist={['Evitar em producao', 'Preferir classes CSS', 'Usar so para prototipagem ou JS dinamico']}
      />

      <TopicCard
        title="data-* — Atributos personalizados"
        definition="data-* armazena dados customizados no elemento. E como uma etiqueta invisivel colada no HTML."
        whenToUse={['Passar dados para JavaScript', 'Configuracoes de componentes', 'Valores que o CSS pode acessar via attr()']}
        whenNotToUse={['Nao para dados sensiveis — sao visiveis no HTML', 'Nao substitua banco de dados — e so para dados simples', 'Nao use nomes com letras maiusculas — data-* e minusculo']}
        code={'<div data-user-id="42" data-role="admin">\n  Ana Silva\n</div>\n\n<button\n  data-action="delete"\n  data-item-id="15">\n  Excluir\n</button>'}
        result="Dados acessiveis via JS: element.dataset.userId"
        errors={['Usar data-* para segredos — qualquer pessoa ve no codigo-fonte', 'data com maiusculas — dataset normaliza para minusculas']}
        tips={['No JS, dataset.userId le data-user-id. Hifens viram camelCase.']}
        checklist={['Nome minusculo', 'Valores simples', 'Nao para dados sensiveis', 'Acessar via dataset']}
      />

      <TopicCard
        title="title — Tooltip de informacao"
        definition="title mostra um tooltip ao passar o mouse. E como um post-it colado no elemento."
        whenToUse={['Informacao extra opcional', 'Abreviacoes com significado', 'Texto completo de campo truncado']}
        whenNotToUse={['Nao para informacao essencial — nao e acessivel em mobile', 'Nao para substituir label em formularios', 'Nao abuse — tooltips longos sao irritantes']}
        code={'<abbr title="HyperText Markup Language">HTML</abbr>\n<span title="Texto completo que aparece truncado na tela">Texto muito longo que...</span>'}
        result="Tooltip aparece ao passar o mouse"
        errors={['Usar title para informacao critica — inacessivel em touch e screen readers inconsistente']}
        tips={['Em abbr, title e excelente. Em outros elementos, prefira tooltips customizados.']}
        checklist={['title util e conciso', 'Nao essencial para uso', 'Funciona bem em abbr']}
      />

      <TopicCard
        title="hidden, tabindex, contenteditable, draggable"
        definition="Atributos de estado e interacao: hidden oculta, tabindex controla foco, contenteditable permite edicao, draggable permite arrastar."
        whenToUse={['hidden para ocultar semantico (nao renderiza)', 'tabindex="0" para tornar elemento focavel', 'contenteditable para editores simples', 'draggable para drag-and-drop']}
        whenNotToUse={['Nao use hidden para ocultar visual — use CSS display:none', 'Nao use tabindex positivo — quebra ordem natural', 'Nao use contenteditable em producao sem sanitizacao']}
        code={'<div hidden>Conteudo oculto semantico</div>\n\n<div tabindex="0" role="button">Focavel via Tab</div>\n\n<div contenteditable="true">Texto editavel</div>\n\n<div draggable="true">Arraste-me</div>'}
        result="Elementos com estados interativos especificos"
        errors={['tabindex > 0 — causa confusao na ordem de tabulacao', 'contenteditable sem sanitizacao — risco XSS', 'hidden com display:block — conflito']}
        tips={['tabindex="0" adiciona ao fluxo natural; tabindex="-1" focavel so via JS; tabindex positivo evite!']}
        checklist={['hidden para ocultar semantico', 'tabindex="0" ou "-1" apenas', 'contenteditable com sanitizacao', 'draggable com eventos JS']}
      />

      <TopicCard
        title="aria-* — Introducao a acessibilidade"
        definition="Atributos ARIA complementam a semantica quando o HTML nao basta. Sao como legendas em audio para os &quot;cegos&quot; da semantica."
        whenToUse={['aria-label para rotular elementos sem texto', 'aria-labelledby para referenciar outro elemento como rotulo', 'aria-hidden para ocultar de leitores de tela', 'role para definir proposito semantico']}
        whenNotToUse={['Nao use ARIA quando HTML semantico basta — regra 1!', 'Nao invente roles — use os padroes WAI-ARIA', 'Nao use aria-hidden em elementos focaveis — conflito']}
        code={'<button aria-label="Fechar" onclick="fechar()">X</button>\n\n<div role="alert" aria-live="assertive">\n  Formulario enviado com sucesso!\n</div>\n\n<nav aria-label="Menu principal">...</nav>'}
        result="Elementos acessiveis mesmo sem texto visivel"
        errors={['Usar ARIA em vez de HTML semantico — primeira regra: nao use ARIA se HTML nativo resolve', 'aria-hidden=true em botao — usuario navega ate ele mas leitor nao le']}
        tips={['Regra de ouro: &quot;Nenhuma ARIA e melhor que ARIA errada.&quot; Primeiro use HTML semantico.']}
        checklist={['HTML semantico antes de ARIA', 'aria-label quando falta texto', 'aria-live para conteudo dinamico', 'Nunca aria-hidden em focavel']}
      />
    </div>
  );
}

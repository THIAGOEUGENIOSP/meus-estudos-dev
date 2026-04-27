import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section10() {
  return (
    <div>
      <SectionHeader number={10} title="HTML: Classes e IDs" subtitle="Como organizar CSS e JS com classes e IDs — e por que BEM pode salvar sua vida" />

      <Diagram title="class vs id — Comparacao visual">
{`+-------------------------+-------------------------+
|  CLASS (.classe)        |  ID (#identificador)   |
+-------------------------+-------------------------+
|  Reutilizavel           |  Unico na pagina        |
|  Multiplos por elemento |  Um por elemento        |
|  .card, .btn, .titulo   |  #contato, #modal      |
|  CSS: .classe { }       |  CSS: #id { }          |
|  JS: querySelectorAll   |  JS: getElementById     |
|  Especificidade: 0-1-0  |  Especificidade: 1-0-0 |
+-------------------------+-------------------------+
|  COMO: Sobrenome        |  COMO: CPF             |
|  &quot;Sou da familia Silva&quot; |  &quot;Sou o unico 123&quot;     |
+-------------------------+-------------------------+`}
      </Diagram>

      <TopicCard
        title="Diferenca fundamental: class vs id"
        definition="class identifica grupos de elementos; id identifica um elemento unico. Class e sobrenome, id e CPF."
        whenToUse={['class: estilizar multiplos elementos iguais', 'id: ancoras, vinculo label-input, JS getElementById', 'class: qualquer reutilizacao CSS', 'id: quando precisa ser absolutamente unico']}
        whenNotToUse={['Nao use id para CSS reutilizavel — especificidade alta e inflexivel', 'Nao repita id — e invalido e quebra tudo', 'Nao use class quando precisa de ancora interna — use id']}
        code={'<!-- CLASS: multiplos elementos -->\n<div class="card">Card 1</div>\n<div class="card">Card 2</div>\n<div class="card">Card 3</div>\n\n<!-- ID: unico -->\n<section id="precos">Secao precos</section>\n<a href="#precos">Ir para precos</a>'}
        result="3 cards com mesmo estilo; 1 ancora unica para navegacao"
        errors={['Usar id para estilizar multiplos — nao funciona, id e unico', 'Duplicar id — HTML invalido, JS e CSS quebram']}
        tips={['No CSS, prefira .classe. #id tem especificidade alta e dificulta manutencao.']}
        checklist={['class para grupos', 'id para unicos', 'sem IDs duplicados', 'CSS com classes preferencialmente']}
      />

      <TopicCard
        title="Nomenclatura BEM"
        definition="BEM = Block, Element, Modifier. Metodologia que cria classes previsiveis: .bloco__elemento--modificador."
        whenToUse={['Projetos grandes com CSS escalavel', 'Componentes reutilizaveis', 'Equipes com multiplos devs']}
        whenNotToUse={['Projetos tiny com 1 pagina — BEM e exagero', 'Se a equipe nao conhece — padronize antes']}
        code={'<div class="card">\n  <h2 class="card__titulo">Produto</h2>\n  <p class="card__descricao">Texto aqui</p>\n  <button class="card__botao card__botao--destaque">\n    Comprar\n  </button>\n</div>\n\n<!-- Block: card -->\n<!-- Element: card__titulo -->\n<!-- Modifier: card__botao--destaque -->'}
        result="Classes claras, sem conflito, sem aninhamento profundo"
        errors={['card__titulo__span — nao aninhe elementos! BEM e flat', 'card--destaque__titulo — modificador no bloco, nao no elemento aninhado']}
        tips={['BEM e flat: bloco__elemento. Nunca __elemento__subelemento. Use blocos novos.']}
        checklist={['Block: entidade independente', 'Element: parte do bloco (__)', 'Modifier: variacao (--)', 'Flat: sem aninhamento']}
      />

      <TopicCard
        title="kebab-case — Padrao de nomenclatura"
        definition="Nomes com letras minusculas separadas por hifen: minha-classe, btn-primario. E o padrao mais comum em CSS."
        whenToUse={['Nomes de classes em CSS', 'Atributos data-*', 'IDs em HTML']}
        whenNotToUse={['Nao misture estilos: minhaClasse e minha-classe no mesmo projeto', 'Nao use camelCase em CSS — nao e natural', 'Nao use underscore em CSS — reserve para BEM']}
        code={'<!-- kebab-case: padrao HTML/CSS -->\n<div class="card-destaque">...</div>\n<button class="btn-primario">OK</button>\n<section id="secao-sobre">...</section>\n\n<!-- BEM com kebab-case -->\n<div class="form-cadastro__campo--obrigatorio">...</div>'}
        result="Nomes consistentes e legiveis em todo o projeto"
        errors={['Misturar camelCase e kebab-case — inconsistencia visual e mental', 'Usar espacos ou acentos em nomes — invalido']}
        tips={['Escolha um padrao e mantenha. kebab-case e o mais comum; BEM usa kebab-case nos blocos.']}
        checklist={['Minusculas com hifens', 'Consistente no projeto', 'Sem camelCase em CSS', 'Sem acentos ou espacos']}
      />

      <TopicCard
        title="Uso com CSS e JS"
        definition="Classes para estilizar, IDs para identificar. JS pode usar ambos, mas separar interesses e boa pratica."
        whenToUse={['CSS: use classes principalmente', 'JS: use id para selecao rapida ou data-* para comportamento', 'Separe: classe para estilo, data-* para logica JS']}
        whenNotToUse={['Nao use a mesma classe para CSS e JS — muda o estilo e quebra o JS', 'Nao dependa de id para CSS — especificidade alta dificulta override']}
        code={'<!-- RUIM: mesma classe para CSS e JS -->\n<button class="close-modal" onclick="fechar()">X</button>\n\n<!-- BOM: separado -->\n<button class="btn btn--fechar"\n  data-action="close-modal">X</button>\n\n<!-- CSS: .btn--fechar -->\n<!-- JS: [data-action="close-modal"] -->'}
        result="Separacao clara: CSS em classes, JS em data-* ou id"
        errors={['Usar classe CSS no JS — mudar o nome quebra CSS e JS', 'Remover classe que o JS depende — bug silencioso']}
        tips={['Convencao: js-* para JS, is-* para estados, data-* para dados. CSS nunca usa js-*.']}
        checklist={['CSS com classes', 'JS com data-* ou id', 'Nao compartilhar classe entre CSS e JS', 'Convencao documentada']}
      />
    </div>
  );
}

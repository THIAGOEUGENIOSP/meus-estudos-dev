import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section7() {
  return (
    <div>
      <SectionHeader number={7} title="HTML: Formularios" subtitle="Coletando dados do usuario com acessibilidade — do input ao fieldset" />

      <Diagram title="Anatomia de um formulario">
{`form (action + method)
 |- fieldset
 |   |- legend (titulo do grupo)
 |   |- label (rotulo)
 |   |   |- input (campo)
 |   |- label
 |       |- select
 |           |- option
 |- fieldset
 |   |- legend
 |   |- label + textarea
 |- button (submit)`}
      </Diagram>

      <TopicCard
        title="form — Container do formulario"
        definition="form agrupa campos de entrada com acao e metodo. E como o envelope que carrega os dados ao servidor."
        whenToUse={['Envio de dados ao servidor', 'Qualquer coleta de dados do usuario']}
        whenNotToUse={['Nao aninhe form dentro de form — invalido', 'Nao use form para filtro simples — pode usar sem form']}
        code={'<form action="/api/contato" method="POST">\n  <!-- campos aqui -->\n  <button type="submit">Enviar</button>\n</form>'}
        result="Dados enviados via POST para /api/contato"
        errors={['Aninhar forms — invalido e causa comportamento errado', 'Usar GET para dados sensiveis — fica na URL']}
        tips={['POST para dados sensiveis/longos; GET para buscas (parametros na URL).']}
        checklist={['action definida', 'method correto (GET/POST)', 'Nao aninhar forms', 'button type submit']}
      />

      <TopicCard
        title="label e input — Rotulo e campo"
        definition="label associa um texto ao input via for/id. Sem label, o leitor de tela nao sabe o que o campo pede."
        whenToUse={['Sempre! Todo input deve ter label', 'for no label + id no input = vinculo semantico']}
        whenNotToUse={['Nao use placeholder como label — desaparece ao digitar', 'Nao omita label — e obrigatorio para acessibilidade']}
        code={'<label for="nome">Nome completo:</label>\n<input type="text" id="nome" name="nome" required>\n\n<label for="email">E-mail:</label>\n<input type="email" id="email" name="email" required>\n\n<label for="senha">Senha:</label>\n<input type="password" id="senha" name="senha" minlength="8">'}
        result="Campos com rotulos acessiveis e validacao nativa"
        errors={['Input sem label — leitor de tela anuncia &quot;campo de texto&quot; sem contexto', 'for diferente de id — label nao vincula', 'Usar placeholder como label — desaparece ao digitar']}
        tips={['Clicar no label foca o input — area de clique maior em mobile.']}
        checklist={['Todo input com label', 'for do label = id do input', 'name para envio ao servidor', 'required quando obrigatorio']}
      />

      <TopicCard
        title="Tipos de input — text, email, password, number, date, file"
        definition="type define o tipo de dado esperado, ativa validacao nativa e modifica o teclado virtual em mobile."
        whenToUse={['type="email" para e-mails (valida @)', 'type="password" para senhas (oculta)', 'type="number" para numeros (setas)', 'type="date" para datas (calendario)', 'type="file" para upload de arquivos']}
        whenNotToUse={['Nao use type="number" para CEP/telefone — use type="tel" ou text com pattern', 'Nao use type="password" para dados nao sensiveis']}
        code={'<label for="nasc">Nascimento:</label>\n<input type="date" id="nasc" name="nasc">\n\n<label for="foto">Foto:</label>\n<input type="file" id="foto" name="foto" accept="image/*">\n\n<label for="idade">Idade:</label>\n<input type="number" id="idade" name="idade" min="0" max="150">'}
        result="Campos com validacao nativa e controles visuais especificos"
        errors={['Usar type="text" para email — perde validacao e teclado mobile', 'Esquecer accept no file — aceita qualquer tipo']}
        tips={['O type muda o teclado do celular: email mostra @, tel mostra teclado numerico.']}
        checklist={['type correto para cada dado', 'min/max em number', 'accept em file', 'validacao nativa aproveitada']}
      />

      <TopicCard
        title="radio e checkbox — Escolha unica e multipla"
        definition="radio para escolha unica (mesmo name), checkbox para multiplas. Sao como perguntas de unica e multipla escolha."
        whenToUse={['radio: uma unica opcao (ex: genero, metodo de pagamento)', 'checkbox: multiplas opcoes (ex: hobbies, termos)', 'Mesmo name em radios do mesmo grupo']}
        whenNotToUse={['Nao use radio para multiplas respostas — use checkbox', 'Nao use checkbox para resposta unica — use radio']}
        code={'<fieldset>\n  <legend>Contato preferido:</legend>\n  <label><input type="radio" name="contato" value="email"> E-mail</label>\n  <label><input type="radio" name="contato" value="tel"> Telefone</label>\n</fieldset>\n\n<label><input type="checkbox" name="termos" value="sim" required> Aceito os termos</label>'}
        result="Radio: uma escolha; Checkbox: multiplas ou aceitacao"
        errors={['Radios com names diferentes — podem selecionar todos', 'Esquecer value — formulario envia &quot;on&quot; em vez do dado']}
        tips={['Radios com mesmo name = grupo exclusivo. Checkbox com same name = array.']}
        checklist={['radio: mesmo name = grupo', 'radio: value diferente em cada', 'checkbox: value significativo']}
      />

      <TopicCard
        title="textarea, select e button"
        definition="textarea para texto longo, select para lista dropdown, button para acao. Cada um com proposito unico."
        whenToUse={['textarea para mensagens, comentarios', 'select para lista de opcoes pre-definidas', 'button type="submit" para enviar formulario']}
        whenNotToUse={['Nao use input text para textos longos — use textarea', 'Nao use select com menos de 3 opcoes — use radio', 'Nao use input type="submit" — button e mais flexivel']}
        code={'<label for="msg">Mensagem:</label>\n<textarea id="msg" name="msg" rows="4" cols="50"></textarea>\n\n<label for="cidade">Cidade:</label>\n<select id="cidade" name="cidade">\n  <option value="">Selecione</option>\n  <option value="sp">Sao Paulo</option>\n  <option value="rj">Rio de Janeiro</option>\n</select>\n\n<button type="submit">Enviar</button>\n<button type="reset">Limpar</button>'}
        result="Campo de texto, dropdown e botoes de acao"
        errors={['Textarea sem rows — altura imprevisivel', 'Select sem option com value vazio — nao permite &quot;nao selecionar&quot;']}
        tips={['button pode conter HTML (icones, spans); input submit nao.']}
        checklist={['textarea com rows/cols ou CSS', 'select com option default', 'button type definido']}
      />

      <TopicCard
        title="Atributos de validacao: name, id, required, disabled, readonly, min, max, pattern, autocomplete"
        definition="Atributos que controlam validacao, estado e comportamento dos campos. E como as regras de um formulario impresso."
        whenToUse={['required para campos obrigatorios', 'pattern para formato especifico (CPF, CEP)', 'min/max para limites numericos', 'autocomplete para preenchimento automatico']}
        whenNotToUse={['Nao use disabled para campos nao enviados — use readonly se precisa enviar', 'Nao abuse de pattern — regex complexo bloqueia usuarios']}
        code={'<label for="cpf">CPF:</label>\n<input type="text" id="cpf" name="cpf"\n  pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"\n  placeholder="000.000.000-00"\n  required\n  autocomplete="off">\n\n<label for="qtd">Quantidade:</label>\n<input type="number" id="qtd" name="qtd" min="1" max="99" value="1">'}
        result="CPF com formato obrigatorio; quantidade entre 1 e 99"
        errors={['Pattern com regex errado — bloqueia entrada valida', 'disabled nao envia o campo — use readonly se precisa enviar']}
        tips={['autocomplete="name", "email", "tel" ajudam o navegador a preencher automaticamente.']}
        checklist={['required nos campos obrigatorios', 'pattern valido para formato', 'min/max em campos numericos', 'autocomplete configurado']}
      />

      <TopicCard
        title="fieldset e legend — Agrupando campos"
        definition="fieldset agrupa campos relacionados; legend e o titulo do grupo. Essencial para formularios com multiplas secoes."
        whenToUse={['Grupos de campos (endereco, dados pessoais)', 'Radios com mesmo proposito', 'Formularios com secoes distintas']}
        whenNotToUse={['Nao use fieldset para agrupar um unico campo — desnecessario', 'Nao use sem legend — fieldset sem titulo e incompleto']}
        code={'<fieldset>\n  <legend>Endereco de entrega</legend>\n  <label for="rua">Rua:</label>\n  <input type="text" id="rua" name="rua">\n  <label for="cep">CEP:</label>\n  <input type="text" id="cep" name="cep">\n</fieldset>\n\n<fieldset>\n  <legend>Dados de pagamento</legend>\n  <!-- campos de pagamento -->\n</fieldset>'}
        result="Grupos semantico com titulos acessiveis"
        errors={['Fieldset sem legend — leitor de tela anuncia grupo sem titulo', 'Mais de uma legend por fieldset — invalido']}
        tips={['Legend e como o titulo de uma secao do formulario impresso. Sem ele, o leitor de tela nao sabe o que o grupo significa.']}
        checklist={['fieldset agrupa campos relacionados', 'legend como primeiro filho', 'Um legend por fieldset']}
      />
    </div>
  );
}

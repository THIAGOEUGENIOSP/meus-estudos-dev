import SectionHeader from '../components/SectionHeader';
import TopicCard from '../components/TopicCard';
import Diagram from '../components/Diagram';

export default function Section28() {
  return (
    <div>
      <SectionHeader number={28} title='TypeScript: Avancado' subtitle='Generics, mapped/conditional types, utility types, type guards e narrowing' />
      <Diagram title='Fluxo de Generics e Narrowing de Discriminated Union'>
{`FLUXO DE GENERICS:

  function identidade<T>(valor: T): T
                        |
        +-------+-------+
        |       |       |
  T=string  T=number  T=Usuario
        |       |       |
  retorna   retorna   retorna
  string    number    Usuario

  GENERICS COM CONSTRAINTS:
  function busca<T extends { id: number }>(item: T): T
         T TEM que ter { id: number }
         + pode ter mais campos

NARROWING DISCRIMINATED UNION:

  type Forma = { tipo: 'circulo'; raio: number }
             | { tipo: 'quadrado'; lado: number }

  function area(f: Forma) {
    if (f.tipo === 'circulo') {
      // TS sabe: f.raio existe! (narrowing)
      return Math.PI * f.raio ** 2;
    }
    // TS sabe: so pode ser quadrado
    return f.lado ** 2;
  }
  campo 'tipo' e o discriminador`}
      </Diagram>
      <TopicCard
        title='Generics com Constraints e keyof'
        definition='Generics sao como caixas de correio com nome — voce define o formato depois. Constraints (extends) sao como regras de condominio: T pode ser qualquer coisa, mas precisa ter o minimo. keyof e como o chaveiro — entrega so as chaves do objeto.'
        whenToUse={['Generics para funcoes/classes que funcionam com varios tipos', 'extends para garantir que T tem certo campo', 'keyof para acessar propriedades de forma segura', 'Multiplos generics: <T, K extends keyof T>']}
        whenNotToUse={['Generic para um tipo so — nao precisa', 'Constraint tao ampla que vira any — sem restricao', 'keyof em objetos unknown — use tipo explicito']}
        code={`// Generic basico: T e qualquer tipo
function identidade<T>(valor: T): T {
  return valor;
}
identidade<string>('oi');   // retorna string
identidade(42);             // T inferido = number

// Constraint: T precisa ter { id }
function busca<T extends { id: number }>(itens: T[], id: number): T | undefined {
  return itens.find(i => i.id === id);
}

// keyof: pega as chaves de T
function prop<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave]; // retorno tem o tipo correto
}

const user = { nome: 'Ana', idade: 25 };
prop(user, 'nome');  // string
prop(user, 'idade'); // number
// prop(user, 'email'); // ERRO! 'email' nao e chave

// Generic em interface
interface Repositorio<T> {
  listar(): T[];
  buscar(id: number): T;
  salvar(item: T): void;
}`}
        result={`identidade('oi') = 'oi'
busca([{id: 1, nome: 'Ana'}], 1) = { id: 1, nome: 'Ana' }
prop(user, 'nome') = 'Ana'`}
        errors={["Type 'string' is not assignable to type 'number' — constraint violada", "Argument of type '\"email\"' is not assignable to keyof — chave invalida", 'Type parameter has a circular constraint — extends circular']}
        tips={['Deixe TS inferir o generic quando possivel', 'Constraint extends e como contrato minimo — T precisa cumprir', 'keyof + T[K] e a combinacao mais poderosa para acesso seguro']}
        checklist={['Generic necessario ou tipo fixo basta?', 'Constraint esta clara com extends?', 'keyof garante acesso seguro as propriedades?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Generics sao como moldes de sorvete — o formato e fixo, o sabor voce escolhe depois. Constraint e como dizer &quot;precisa ter pelo menos chocolate&quot; — pode ter mais, nao menos. keyof e como o chaveiro: so entrega as chaves que existem.</p>
      </TopicCard>
      <TopicCard
        title='Mapped Types, Conditional Types e Utility Types'
        definition='Mapped types sao como copiadora com filtro — percorre cada chave e transforma. Conditional types sao como semaforo: se A extende B, tipo X, senao Y. Utility types sao ferramentas prontas — como kit de chaveiro: Partial, Required, Pick, Omit, Record, Exclude, Extract.'
        whenToUse={['Mapped types para transformar todas as propriedades de um tipo', 'Conditional types para logica de tipos depende de condicao', 'Partial para formularios, Required para validacao', 'Pick/Omit para subconjuntos, Record para dicionarios']}
        whenNotToUse={['Mapped types para tipos simples — direto e melhor', 'Conditional types sem extends — nao faz sentido', 'Partial para dados obrigatórios — use Required']}
        code={`// MAPPED TYPE: percorre cada chave
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// CONDITIONAL TYPE: se, senao
type EString<T> = T extends string ? 'sim' : 'nao';
type A = EString<string>;  // 'sim'
type B = EString<number>;  // 'nao'

// UTILITY TYPES PRONTAS:
interface User {
  nome: string;
  idade: number;
  email: string;
}

// Partial: tudo opcional
type UserParcial = Partial<User>;
// { nome?: string; idade?: number; email?: string }

// Required: tudo obrigatorio
type UserCompleto = Required<UserParcial>;

// Pick: seleciona chaves
type UserBasico = Pick<User, 'nome' | 'idade'>;
// { nome: string; idade: number }

// Omit: remove chaves
type UserSemEmail = Omit<User, 'email'>;

// Record: dicionario
type Cache = Record<string, User>;

// Exclude / Extract: em union types
type Status = 'ativo' | 'inativo' | 'pendente';
type Ativo = Extract<Status, 'ativo'>;  // 'ativo'
type NaoPendente = Exclude<Status, 'pendente'>; // 'ativo' | 'inativo'`}
        result={`UserParcial: { nome?: string; idade?: number; email?: string }
UserBasico: { nome: string; idade: number }
Cache: { [key: string]: User }`}
        errors={["Type 'K' is not assignable — keyof sem constraint", "Cannot find name 'T' — tipo nao definido", "Pick sem chave existente — erro de constraint"]}
        tips={['Combine utility types: Omit<Partial<User>, "email">', 'Record<string, T> e perfeito para cache/dicionarios', 'Mapped types podem adicionar readonly, opcional, etc.']}
        checklist={['Mapped type percorre keyof T?', 'Conditional usa extends como condicao?', 'Usou utility types prontas antes de reinventar?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Mapped types sao como estampa de camiseta — aplica o mesmo padrao em cada parte. Conditional types sao como semaforo: verde siga, vermelho pare. Utility types sao como kit de ferramentas — nao reinvente a chave de fenda, use a que ja existe.</p>
      </TopicCard>
      <TopicCard
        title='Type Guards e Narrowing'
        definition='Type guards sao como detectores de metal — identificam o tipo antes de deixar passar. Narrowing e como afinar o foco da camera: quanto mais informacao, mais preciso o tipo. Discriminated unions usam um campo comum para identificar o tipo.'
        whenToUse={['typeof para primitivos, instanceof para classes', 'in para verificar propriedade no objeto', 'Discriminated union com campo tipo/literal para narrowing', 'Type predicate (e Tipo) para guards customizados']}
        whenNotToUse={['typeof para null — retorna object, use === null', 'instanceof para tipos primitivos — nao funciona', 'Type assertion em vez de guard — perde seguranca']}
        code={`// TYPEOF: primitivos
function dobro(x: string | number) {
  if (typeof x === 'string') {
    return x.length; // TS sabe: string
  }
  return x * 2; // TS sabe: number
}

// INSTANCEOF: classes
function formatar(data: Date | string) {
  if (data instanceof Date) {
    return data.toISOString(); // Date
  }
  return data.toUpperCase(); // string
}

// IN: verifica propriedade
type Ave = { voar: () => void };
type Peixe = { nadar: () => void };
function mover(animal: Ave | Peixe) {
  if ('voar' in animal) {
    animal.voar(); // Ave
  } else {
    animal.nadar(); // Peixe
  }
}

// DISCRIMINATED UNION: campo tipo
type Resposta = { status: 'ok'; dados: string }
               | { status: 'erro'; msg: string };

function tratar(res: Resposta) {
  if (res.status === 'ok') {
    console.log(res.dados);  // TS sabe: dados existe
  } else {
    console.log(res.msg);    // TS sabe: msg existe
  }
}

// TYPE PREDICATE: guard customizado
function eString(val: unknown): val is string {
  return typeof val === 'string';
}
if (eString(x)) { x.toUpperCase(); } // OK`}
        result={`dobro('abc') = 3
dobro(5) = 10
tratar({ status: 'ok', dados: 'sucesso' }) = 'sucesso'`}
        errors={["Property 'dados' does not exist on type 'erro' — sem narrowing", "'null' is not assignable — typeof null e 'object'", 'Type predicate retorna boolean — use val is Tipo']}
        tips={['Discriminated union e o padrao mais seguro para variacoes', 'typeof null retorna object — sempre compare com === null', 'Type predicates sao poderosos mas cuidado: TS confia em voce']}
        checklist={['typeof para primitivos?', 'in para propriedades de objeto?', 'Discriminated union com campo literal?']}
      >
        <p className='text-sm text-gray-600'>Analogia: Type guards sao como detector de metal no aeroporto — so passa quem for do tipo certo. Narrowing e como zoom da camera: cada verificacao estreita o tipo. Discriminated union e como cracha com setor — o campo tipo diz exatamente quem e.</p>
      </TopicCard>
    </div>
  );
}

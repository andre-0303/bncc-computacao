# Arquitetura

O sistema é uma única aplicação Next.js 16 (App Router) que renderiza as páginas no servidor e fala diretamente com um Postgres na Neon. Não há API REST separada: as páginas consultam o banco em Server Components e as mutações acontecem em Server Actions.

## Estrutura de pastas

```
app/                      Rotas (App Router)
  page.tsx                /                      escolha entre "Entrar como aluno" e "Sou professor"
  entrar/                 /entrar                login do aluno (só o código de acesso)
  aluno/layout.tsx        protege todas as rotas /aluno/* (requireStudent)
  aluno/page.tsx          /aluno                 habilidades agrupadas por eixo, progresso, atalho "Revisar erros"
  aluno/[skill]/          /aluno/ef09co01        lições de uma habilidade
  aluno/[skill]/[lesson]/ /aluno/ef09co01/ef09co01-l1   explicação, "Não entendi" e exercícios
  aluno/revisar/          /aluno/revisar         questões cuja última tentativa foi erro
  professor/login/        /professor/login       login e cadastro do professor
  professor/page.tsx      /professor             lista de turmas e criação de turma
  professor/turma/[id]/   /professor/turma/:id   cadastro de alunos, tabela aluno × habilidade, novo código, remover
  professor/turma/[id]/cartoes/  /professor/turma/:id/cartoes  cartões com o código de acesso, para imprimir
components/               Componentes de interface (quiz, markdown, formulários), components/professor (cadastro de alunos, ações por aluno, impressão) e components/ui (shadcn)
content/                  Conteúdo pedagógico em TypeScript (uma habilidade por arquivo)
lib/
  auth.ts                 sessões, requireStudent/requireTeacher
  secrets.ts              hash de senha (scrypt) e geração do código de acesso (só node:crypto)
  access-code.ts          normalizar e formatar o código de acesso (funções puras)
  actions.ts              todas as Server Actions (veja a lista abaixo)
  queries.ts              consultas de leitura (progresso, erros, relatório da turma)
  db/schema.ts            schema do banco (Drizzle)
  db/index.ts             cliente Drizzle (drizzle-orm/neon-http)
scripts/create-teacher.ts cria um professor direto no banco (pnpm teacher:create)
drizzle.config.ts         configuração do drizzle-kit (usado pelo pnpm db:push)
```

A interface está em redesenho, então os detalhes visuais de `app/` e `components/` podem mudar. Esta documentação descreve as telas pela função, não pela aparência.

## Server Actions

Todas ficam em `lib/actions.ts`:

| Action | Quem usa | O que faz |
| --- | --- | --- |
| `studentLogin` | aluno | entra com o código de acesso pessoal |
| `teacherLogin` | professor | entra com e-mail e senha |
| `logout` | os dois | apaga a sessão e o cookie |
| `createClass` | professor | cria uma turma (só o nome) |
| `addStudents` | professor | cadastra alunos numa turma, um nome por linha, e gera o código de cada um |
| `newStudentCode` | professor | troca o código de um aluno e derruba as sessões abertas dele |
| `renameStudent` | professor | corrige o nome do aluno, sem mudar código nem progresso |
| `removeStudent` | professor | apaga um aluno e todo o progresso dele |
| `answerQuestion` | aluno | corrige uma resposta, grava a tentativa e atualiza a conclusão da lição |

Não existe action de cadastro de professor: professores são criados pelo script `pnpm teacher:create`. Detalhes em [Autenticação](autenticacao.md).

## Fluxo de uma requisição

Exemplo: o aluno abre uma lição e responde uma questão.

1. `app/aluno/layout.tsx` chama `requireStudent()`, que lê o cookie `session`, busca a sessão válida no banco e redireciona para `/entrar` se não houver aluno logado.
2. `app/aluno/[skill]/[lesson]/page.tsx` encontra a habilidade e a lição em `content/` (sem banco) e renderiza a explicação em markdown. As questões passam por `toPublic()`, que remove `answer` e `why`: **o gabarito nunca chega ao navegador**.
3. O componente cliente `Quiz` mostra uma questão por vez. Ao clicar em "Verificar", chama a Server Action `answerQuestion(questionId, índice)`.
   O `Quiz` congela a lista de questões quando é montado, para que uma atualização da página no meio do exercício não troque as questões.
4. No servidor, `answerQuestion` confere o aluno de novo (`requireStudent`), corrige com `isCorrect`, grava uma linha em `attempts` e recalcula a lição: se todas as questões já foram respondidas e a última tentativa de pelo menos 60% delas é acerto, grava (ou atualiza com a melhor nota) `lesson_completions`. Devolve se acertou, o texto da alternativa certa, a justificativa e o estado da lição (`score`, `total`, `passed`, `needed`). Detalhes em [Banco de dados](banco-de-dados.md#como-o-progresso-é-calculado).
5. Não existe action separada para concluir a lição: a conclusão acontece dentro de `answerQuestion`, por isso respostas dadas em "Revisar erros" também podem concluir uma lição.

O fluxo do professor é análogo: `requireTeacher()` protege as páginas e as actions, e toda consulta a uma turma filtra por `teacherId`, de modo que um professor não vê nem altera turmas de outro.

## Decisões de projeto

**Conteúdo no código, não no banco.** As lições ficam em `content/*.ts`. Assim o conteúdo é versionado no git junto com o código, revisado em pull request, validado por testes (`pnpm test`) e tipado pelo TypeScript. Não é preciso painel de edição nem migração de dados para corrigir um texto. O banco guarda apenas quem respondeu o quê, referenciando lições e questões pelo `id`. Por isso os ids são permanentes; veja [Conteúdo](conteudo.md).

**Correção no servidor.** O navegador só recebe enunciado e alternativas. Mesmo que o aluno inspecione a página, não encontra a resposta.

**Sem `cacheComponents`.** O recurso de cache de componentes do Next.js 16 não está habilitado em `next.config.ts`. Praticamente toda página depende do usuário logado (cookie de sessão) e mostra dados pessoais de progresso, então não há o que cachear entre usuários. Após mutações, as actions do professor chamam `revalidatePath` para atualizar as páginas afetadas. `answerQuestion` não chama, de propósito: re-renderizar a rota no meio do quiz desmontaria o exercício em andamento (em "Revisar erros", por exemplo). Como as páginas do aluno são dinâmicas, a próxima navegação já busca os dados novos.

**Sem biblioteca de autenticação.** O modelo de login é simples (um código de acesso pessoal para alunos, e-mail + senha para professores), e cabe em poucas linhas com `node:crypto` e uma tabela de sessões. Detalhes em [Autenticação](autenticacao.md).

**`lib/secrets.ts` separado de `lib/access-code.ts`.** O que precisa de `node:crypto` (hash de senha e geração do código) fica em `lib/secrets.ts`, que não usa o alias `@/` para poder ser importado também pelo script `scripts/create-teacher.ts`, executado direto pelo Node. Normalizar e formatar o código (`K7XQ-2MPA`) são funções puras, usadas tanto no servidor quanto em componentes do navegador; por isso ficam em `lib/access-code.ts`, que não arrasta `node:crypto` para o bundle do cliente.

**Apenas múltipla escolha.** Questões abertas foram removidas porque a correção automática gerava falsos erros (por exemplo, "8km" contra "8").

## Leia também

- [Banco de dados](banco-de-dados.md)
- [Autenticação](autenticacao.md)
- [Conteúdo](conteudo.md)

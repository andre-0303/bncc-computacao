# Banco de dados

Postgres na Neon, acessado com Drizzle ORM pelo driver HTTP (`drizzle-orm/neon-http`). O schema está em `lib/db/schema.ts`. Os nomes em TypeScript são camelCase e no banco viram snake_case (`casing: "snake_case"` no cliente e no `drizzle.config.ts`).

## Tabelas

| Tabela | Para que serve | Colunas principais |
| --- | --- | --- |
| `teachers` | Professores | `id`, `email` (único), `name`, `password_hash`, `created_at` |
| `classes` | Turmas | `id`, `teacher_id` → teachers, `name`, `created_at` |
| `students` | Alunos | `id`, `class_id` → classes, `name`, `access_code` (único), `created_at` |
| `sessions` | Sessões de login | `token` (chave), `teacher_id` ou `student_id`, `expires_at` |
| `attempts` | Cada resposta dada a uma questão | `id`, `student_id`, `skill_code`, `lesson_id`, `question_id`, `correct`, `created_at` |
| `lesson_completions` | Lições concluídas | chave (`student_id`, `lesson_id`), `score`, `completed_at` |

Detalhes importantes:

- Professores são criados pelo script `pnpm teacher:create`, não pela interface. `password_hash` guarda o hash scrypt da senha.
- Alunos são cadastrados pelo professor na página da turma. `students.name` é o nome que o professor digitou (não precisa ser único; dois "João" na mesma turma são alunos diferentes). `students.access_code` é o código de acesso de 8 caracteres, sem traço e em maiúsculas, **em texto puro** e único em todo o banco. Ele é a credencial do aluno; veja [Autenticação](autenticacao.md#aluno-código-de-acesso-pessoal).
- Turmas não têm mais código: o aluno entra pelo código pessoal, não pelo da turma.
- Sessões vencidas são apagadas a cada novo login (`createSession` em `lib/auth.ts`).
- `sessions` tem `teacher_id` **ou** `student_id` preenchido, nunca os dois.
- `attempts` e `lesson_completions` guardam os ids de habilidade, lição e questão como texto. Eles apontam para o conteúdo em `content/`, não para outras tabelas. `attempts.skill_code` é gravado junto para facilitar o agrupamento por habilidade.
- `attempts` tem índice em (`student_id`, `question_id`, `created_at`), que atende às consultas de "última tentativa".

## Relacionamentos

```
teachers 1──N classes 1──N students 1──N attempts
                                     1──N lesson_completions
teachers 1──N sessions N──1 students
```

Todas as chaves estrangeiras usam `ON DELETE CASCADE`: apagar um professor apaga suas turmas, alunos, tentativas e sessões. Pela interface, só é possível apagar alunos (botão **Remover** no painel da turma, que apaga também as sessões, tentativas e conclusões dele). Turmas e professores só podem ser apagados direto no banco.

## Como o progresso é calculado

O aluno pode responder a mesma questão várias vezes (refazendo a lição ou em "Revisar erros"). Cada resposta vira uma linha nova em `attempts`; nada é sobrescrito. A conclusão de lição e a revisão de erros usam a **última tentativa de cada questão** (`SELECT DISTINCT ON (question_id) ... ORDER BY question_id, created_at DESC`). Assim, quem errou e depois acertou deixa de contar como erro. O relatório do professor é a exceção: usa a primeira tentativa (veja abaixo).

- **Lição concluída:** existe linha em `lesson_completions` para o par aluno/lição. A cada resposta, `answerQuestion` (em `lib/actions.ts`) recalcula a lição a que a questão pertence, olhando a última tentativa de cada questão **atual** da lição. A lição é concluída quando todas as questões já foram respondidas **e** os acertos chegam a `passingScore(total)`, ou seja, 60% arredondado para cima (`content/index.ts`). Numa lição de 4 questões, são 3 acertos; numa de 5, também 3.
  - Acertos feitos em "Revisar erros" contam: se o aluno ficou abaixo de 60% e depois corrige questões na revisão, a lição passa a ser concluída.
  - Uma lição concluída nunca volta a ficar pendente, mesmo que o aluno refaça e erre.
  - `answerQuestion` devolve ao quiz `lesson: { score, total, passed, needed }`, usado na tela de resultado. Abaixo de 60%, a tela mostra "Faltou pouco" com o botão "Tentar de novo".
- **Nota da lição (`score`):** número de questões da lição cuja última tentativa foi acerto. Guarda sempre a **melhor** nota (`greatest` entre a gravada e a nova). A trilha do aluno mostra "Concluída com X de N acertos".
- **Revisar erros:** questões cuja última tentativa foi erro (`wrongQuestionIds` em `lib/queries.ts`).
- **Conteúdo removido não conta.** As consultas de `lib/queries.ts` só consideram tentativas de questões que ainda existem em `content/` e conclusões de lições que ainda existem. Isso vale para o painel do professor, para a revisão e para o mapa do aluno. As linhas antigas continuam no banco, só são ignoradas.
- **Painel do professor** (`classReport` em `lib/queries.ts`), por aluno e habilidade:
  - lições concluídas / total de lições da habilidade;
  - % de acerto = questões com **primeira** tentativa correta ÷ questões já respondidas daquela habilidade (depois de errar o aluno vê a resposta certa, então a última tentativa não mede aprendizado). Questões nunca respondidas não entram na conta; sem respostas, aparece "–".
  - A linha "Turma" aplica a mesma conta a todas as respostas da turma, e a habilidade com menor % é destacada como a que mais precisa ser retomada.

## Criando e alterando tabelas

```bash
pnpm db:push
```

Numa instalação nova, `pnpm db:push` cria todas as tabelas e basta. Depois, crie o primeiro professor com `pnpm teacher:create "Nome" email@escola.br`.

O `drizzle-kit push` compara `lib/db/schema.ts` com o banco apontado por `DATABASE_URL` (lido do `.env`) e aplica as diferenças. É prático no início, mas não deixa histórico. Um próximo passo recomendado, antes de ter dados reais importantes, é passar a usar migrações versionadas (`drizzle-kit generate` + `drizzle-kit migrate`) e commitar a pasta de migrações.

### Instalações da versão com apelido e PIN

Versões anteriores usavam código da turma, apelido e PIN. Um banco criado nessa versão **não** é convertido pelo `db:push`, porque é preciso gerar dados (um código para cada aluno). Há duas saídas:

- começar com um banco novo e rodar `pnpm db:push`; ou
- migrar à mão, com SQL: renomear `students.nickname` para `name`; adicionar `students.access_code`, preencher um código único de 8 caracteres (alfabeto de `lib/secrets.ts`) para cada aluno e torná-lo `NOT NULL` e único; remover `students.pin_hash`, `students.failed_logins`, `students.locked_until` e `classes.code`, além do índice único antigo de apelido por turma. Faça backup antes.

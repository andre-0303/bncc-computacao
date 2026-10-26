# Autenticação

Não há biblioteca de autenticação. O código está dividido assim:

- `lib/auth.ts`: sessões (`createSession`, `destroySession`) e as funções `requireStudent` e `requireTeacher`.
- `lib/secrets.ts`: hash de senha (`hashSecret`, `verifySecret`) e geração do código de acesso do aluno (`newAccessCode`). Usa só `node:crypto`, sem imports com `@/`, porque também é usado pelo script `scripts/create-teacher.ts`.
- `lib/access-code.ts`: funções puras para normalizar e formatar o código de acesso. Não usa nada do servidor, então pode ser importado tanto nas actions quanto em componentes do navegador.
- `lib/actions.ts`: as ações de login e de gestão de alunos.

## Sessões

- No login é gerado um token aleatório de 32 bytes, gravado na tabela `sessions` com validade de **30 dias**.
- Antes de gravar a sessão nova, `createSession` apaga todas as sessões vencidas. Assim a tabela não cresce sem limite e não é preciso agendar limpeza (cron).
- O token vai num cookie `session` com `httpOnly`, `sameSite=lax`, `path=/` e `secure` em produção.
- A cada requisição, `getSession` busca o token no banco e só aceita sessões não expiradas. O resultado é memoizado por requisição com `cache` do React.
- `requireStudent()` redireciona para `/entrar` e `requireTeacher()` redireciona para `/professor/login` quando não há usuário do tipo certo. Eles são chamados nos layouts/páginas **e** dentro de cada Server Action que precisa de usuário, porque uma action pode ser chamada diretamente, sem passar pela página.
- "Sair" (`logout`) apaga a sessão do banco e o cookie.

## Aluno: código de acesso pessoal

O aluno não escolhe usuário nem senha. Quem cadastra os alunos é o professor, na página da turma, e cada aluno recebe um **código de acesso pessoal de 8 caracteres**. O aluno entra em `/entrar` digitando só esse código.

### Cadastro pelo professor

`addStudents` recebe uma lista de nomes, um por linha (dá para colar a lista de chamada):

- espaços extras são removidos e espaços repetidos viram um só; linhas vazias são ignoradas;
- no máximo **60 alunos por envio** e **60 caracteres por nome**;
- para cada nome é gerado um código com `newAccessCode`. Se um código colidir com outro já existente (o que é raríssimo), só os alunos afetados ganham um código novo, em até 3 tentativas.

O nome serve para o professor reconhecer o aluno no painel e nos cartões. O aluno nunca digita o próprio nome.

### O código

- 8 caracteres do alfabeto `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, sem 0, O, 1 e I, para não haver confusão ao ler ou ditar. São 32^8, cerca de **1 trilhão de combinações**.
- É gerado com `randomInt` do `node:crypto`.
- Aparece em dois blocos, como `K7XQ-2MPA` (`formatAccessCode`).
- Na entrada, `normalizeAccessCode` passa tudo para maiúsculas e remove traço, espaços e outros símbolos. Ou seja, `k7xq 2mpa` e `K7XQ-2MPA` funcionam igual.
- É guardado em **texto puro** na coluna `students.access_code`, de propósito: o professor precisa consultá-lo para imprimir os cartões ou reentregar a um aluno que perdeu. Um hash impediria isso. O custo é que quem tiver acesso ao banco vê os códigos; o banco já guarda todo o progresso dos alunos, então ele precisa ser protegido de qualquer forma.

### Login (`studentLogin`)

1. Normaliza o código digitado. Se não tiver 8 caracteres, mostra um erro com o formato esperado.
2. Procura o aluno pelo código. Se não encontrar, mostra "Código não encontrado. Confira com seu professor."
3. Se encontrar, cria a sessão e leva para `/aluno`.

Em caso de erro, o formulário mantém o que foi digitado (veja [Formulários](#formulários)).

### Gerar novo código e remover aluno

Na linha de cada aluno, no painel da turma:

- **Gerar novo código** (`newStudentCode`): troca o código do aluno. O código antigo para de funcionar na hora, e **todas as sessões abertas do aluno são apagadas**, então quem estava logado com o código antigo é desconectado. O novo código aparece numa notificação na tela do professor e também na tabela. O progresso é mantido. Use quando um código vazar ou for perdido.
- **Remover** (`removeStudent`): depois de uma confirmação, apaga o aluno, as sessões, as tentativas e as lições concluídas dele (por `ON DELETE CASCADE`). Não há como desfazer.

As duas actions só agem sobre alunos de turmas do professor logado.

### Cartões para imprimir

A página `/professor/turma/[id]/cartoes` mostra um cartão recortável por aluno, com nome, turma, código de acesso e o endereço do site (lido do cabeçalho `Host` da requisição). O botão de imprimir usa a impressão do navegador; o restante da página fica oculto na impressão.

## Professor

- **Não existe cadastro pela interface.** Isso evita que qualquer pessoa com acesso ao site crie uma conta de professor por conta própria. A página `/professor/login` só tem e-mail e senha, e orienta quem não tem acesso a falar com quem administra o sistema.
- **Criação de conta:** quem administra o sistema roda, numa máquina com o `.env` apontando para o banco certo:

  ```bash
  pnpm teacher:create "Nome do Professor" email@escola.br
  ```

  O script (`scripts/create-teacher.ts`) gera uma senha aleatória (12 bytes em base64url, 16 caracteres), grava o hash scrypt dela e mostra a senha **uma única vez** no terminal. Entregue a senha ao professor por um canal seguro. O e-mail é guardado em minúsculas. Se já existir um professor com o mesmo e-mail, o script não altera nada e termina com erro.
- **Login** (`teacherLogin`): e-mail e senha. A mensagem de erro não diz se o e-mail existe.

### Senhas

A senha do professor usa `scrypt` do `node:crypto`, com salt aleatório de 16 bytes e chave de 64 bytes. O valor gravado em `teachers.password_hash` tem o formato `salt:hash` (em hexadecimal). A comparação usa `timingSafeEqual`.

Não há tela para trocar nem recuperar senha, e o `teacher:create` não altera contas existentes. Hoje, definir uma senha nova exige atualizar `password_hash` direto no banco. Uma forma de gerar o hash, na raiz do projeto:

```bash
node --input-type=module -e 'import { hashSecret } from "./lib/secrets.ts"; console.log(await hashSecret("SENHA-NOVA"))'
```

Depois, grave o resultado com `UPDATE teachers SET password_hash = '<hash>' WHERE email = 'email@escola.br';` (pelo console SQL da Neon, por exemplo). Apagar a linha do professor e criá-lo de novo **não** é uma alternativa: por causa do `ON DELETE CASCADE`, isso apagaria também as turmas, os alunos e todo o progresso deles.

## Formulários

Depois que uma Server Action roda, o React limpa o formulário. Para que ninguém precise redigitar tudo após um erro, as actions de login devolvem em `FormState.fields` o que foi digitado (o código do aluno; o e-mail do professor, nunca a senha), e os campos usam esse valor como `defaultValue`.

## Notas de segurança e limitações

- **Sem limite de tentativas** no login do aluno nem no do professor. No caso do aluno, o espaço de cerca de 1 trilhão de códigos torna adivinhar um código inviável na prática, mesmo sem limite. No caso do professor, a proteção depende da senha; a senha gerada pelo script é longa e aleatória, mas, se o sistema ficar exposto em escala, vale adicionar limitação por IP ou por conta. Os dois pontos estão marcados no código.
- **Código do aluno é a única credencial.** Quem tiver o cartão de um colega entra como ele. Oriente os alunos a não mostrar o código e use "Gerar novo código" quando houver suspeita.
- **Códigos em texto puro no banco**, como explicado acima.
- **Sem troca ou recuperação de senha de professor** pela interface.
- Server Actions do Next.js já verificam a origem da requisição, o que protege contra CSRF nos formulários.

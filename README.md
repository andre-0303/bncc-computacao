# Computação 9º ano

Sistema web de microaprendizagem de Computação para alunos do 9º ano do Ensino Fundamental, baseado na **BNCC Computação** (o complemento da BNCC que tornou o ensino de Computação obrigatório nas escolas). Ele complementa a aula do professor, sem substituí-la.

O escopo são as 10 habilidades do 9º ano, **EF09CO01 a EF09CO10**. Cada habilidade tem de 2 a 3 microlições de cerca de 5 minutos, com explicação curta, uma explicação alternativa ("Não entendi") e exercícios de múltipla escolha com correção imediata e justificativa.

- **Aluno:** entra só com um código de acesso pessoal de 8 caracteres (como `K7XQ-2MPA`), entregue pelo professor. Não há e-mail nem senha.
- **Professor:** recebe a conta de quem administra o sistema (não há cadastro pelo site), cria turmas, cadastra os alunos colando a lista de nomes, imprime cartões com os códigos de acesso e acompanha o progresso de cada aluno por habilidade.

Uma lição conta como concluída quando o aluno responde todas as questões e acerta pelo menos 60% delas (acertos feitos depois, em "Revisar erros", também valem).

Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui (sobre `@base-ui/react`), Postgres na Neon com Drizzle ORM. Gerenciador de pacotes: pnpm.

## Como rodar

Pré-requisitos: Node.js 22.18 ou mais recente (o `pnpm test` roda TypeScript direto no Node, sem compilação), pnpm e um banco Postgres na [Neon](https://neon.tech) (o plano gratuito basta).

```bash
pnpm install
cp .env.example .env   # preencha DATABASE_URL com a string de conexão da Neon
pnpm db:push           # cria as tabelas no banco
pnpm teacher:create "Seu Nome" voce@escola.br   # cria o primeiro professor e mostra a senha uma vez
pnpm dev               # http://localhost:3000
```

Para testar: entre em `/professor/login` com o e-mail e a senha mostrada pelo `teacher:create`, crie uma turma e cadastre alguns alunos (um nome por linha). Copie o código de acesso de um deles e, em outra janela anônima, entre como aluno em `/entrar` com esse código.

Já tinha uma instalação da versão com apelido e PIN? O `db:push` não converte esses dados; veja [Banco de dados](docs/banco-de-dados.md#instalações-da-versão-com-apelido-e-pin).

## Scripts

| Comando | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento. |
| `pnpm build` / `pnpm start` | Build de produção e servidor de produção. |
| `pnpm lint` | ESLint. |
| `pnpm test` | Valida o conteúdo das lições (ids, gabaritos, as 10 habilidades). |
| `pnpm db:push` | Aplica o schema de `lib/db/schema.ts` no banco (drizzle-kit push). |
| `pnpm teacher:create "Nome" email` | Cria um professor no banco do `.env`, com senha aleatória mostrada uma única vez. |

## Documentação

- [Arquitetura](docs/arquitetura.md): visão geral, pastas, fluxo de uma requisição e decisões de projeto.
- [Banco de dados](docs/banco-de-dados.md): tabelas, relacionamentos e como o progresso é calculado.
- [Autenticação](docs/autenticacao.md): código de acesso do aluno, criação de professores, sessões e notas de segurança.
- [Conteúdo](docs/conteudo.md): como escrever e editar lições e questões.
- [Habilidades da BNCC](docs/bncc.md): mapa das habilidades EF09CO01 a EF09CO10 e das lições de cada uma.
- [Guia do professor](docs/guia-do-professor.md): uso do sistema em sala, sem termos técnicos.
- [Deploy](docs/deploy.md): publicação na Vercel com banco na Neon.

## Limitações conhecidas

- O conteúdo das lições foi escrito com auxílio de IA e **deve ser revisado por um professor de Computação** antes de ser usado com alunos.
- Os logins de aluno e de professor não têm limite de tentativas. Para o aluno, o espaço de cerca de 1 trilhão de códigos torna adivinhar inviável na prática; para o professor, a proteção é a senha longa gerada pelo script.
- O código de acesso é a única credencial do aluno: quem tiver o cartão de um colega entra como ele (o professor pode gerar um código novo).
- Não há troca nem recuperação de senha de professor pela interface; uma senha nova exige atualizar o banco à mão (veja [Autenticação](docs/autenticacao.md#senhas)).
- Ainda não há gamificação, outras séries nem recursos de IA.

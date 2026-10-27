# Deploy (Vercel + Neon)

O caminho mais simples é hospedar o app na Vercel e o banco na Neon. Os dois têm planos gratuitos suficientes para uma escola.

## 1. Banco na Neon

1. Crie um projeto em [neon.tech](https://neon.tech). Escolha a região mais próxima da região das funções da Vercel (por exemplo, São Paulo, se disponível nas duas) para reduzir a latência.
2. Copie a string de conexão (formato `postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require`).
3. Na sua máquina, coloque essa string no `.env` como `DATABASE_URL` e crie as tabelas:

   ```bash
   pnpm db:push
   ```

   O `drizzle-kit` lê o `DATABASE_URL` do `.env` automaticamente. Use um banco (ou branch da Neon) separado para desenvolvimento e outro para produção.
4. Crie o primeiro professor, ainda com o `.env` apontando para o banco de **produção**:

   ```bash
   pnpm teacher:create "Nome do Professor" email@escola.br
   ```

   O script mostra a senha gerada uma única vez; copie e entregue ao professor por um canal seguro. Repita para cada professor. Não existe cadastro de professor pelo site. Depois, volte o `.env` para o banco de desenvolvimento, para não alterar a produção por engano.

Também é possível usar a integração da Neon no Marketplace da Vercel, que cria o banco e já preenche a variável de ambiente no projeto.

## 2. App na Vercel

1. Importe o repositório na Vercel. O framework (Next.js) e o pnpm são detectados automaticamente pelo `pnpm-lock.yaml`.
2. Em **Settings → Environment Variables**, defina:

   | Variável | Valor |
   | --- | --- |
   | `DATABASE_URL` | String de conexão da Neon de produção |

   É a única variável necessária. Não há chave secreta de sessão: os tokens de sessão ficam no banco.
3. Faça o deploy. Em produção, o cookie de sessão é marcado como `secure` (só HTTPS), o que a Vercel já oferece.

## Atualizações

- **Mudou só código ou conteúdo** (`content/`): basta fazer o deploy. Rode `pnpm test` antes; não renomeie ids em uso (veja [Conteúdo](conteudo.md)).
- **Mudou o schema** (`lib/db/schema.ts`): rode `pnpm db:push` apontando para o banco de produção **antes** do deploy do código que depende da mudança. O `push` pode pedir confirmação quando a mudança apagaria dados (remover coluna, por exemplo); leia com atenção.

**Instalações da versão com apelido e PIN:** a troca para o código de acesso pessoal muda a tabela `students` e remove o código da turma. O `db:push` sozinho não converte esses dados: é preciso migrar à mão ou começar com um banco novo. Veja [Banco de dados](banco-de-dados.md#instalações-da-versão-com-apelido-e-pin).

Com dados reais de alunos, o recomendado é trocar o `push` por migrações versionadas (`drizzle-kit generate` para gerar o SQL, revisar, commitar e `drizzle-kit migrate` para aplicar). Veja [Banco de dados](banco-de-dados.md).

## Checklist antes de usar com alunos

- Dados fictícios de `lib/privacy.ts` trocados pelos reais (escola, encarregado) e `demo: false`. Veja [Privacidade](privacidade.md).
- Conteúdo revisado por um professor de Computação.
- `DATABASE_URL` de produção diferente da de desenvolvimento.
- Primeiro professor criado com `pnpm teacher:create` no banco de produção.
- Backups/restauração da Neon conhecidos (a Neon permite restaurar o banco para um ponto no tempo, dentro do período do plano).
- Ciência das limitações em [Autenticação](autenticacao.md#notas-de-segurança-e-limitações), em especial a falta de limite de tentativas nos logins e o fato de o código do aluno ser a única credencial dele.

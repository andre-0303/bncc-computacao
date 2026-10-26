# Computação 9º ano

Microaprendizagem de Computação (BNCC, habilidades EF09CO01–EF09CO10) para complementar a aula do professor.

## Rodar

```bash
cp .env.example .env   # coloque a DATABASE_URL do Neon
pnpm install
pnpm db:push           # cria/atualiza as tabelas
pnpm dev
```

- `pnpm test`: valida o conteúdo (ids únicos, gabaritos, todas as habilidades presentes).
- Professor: `/professor/login` cria conta e turma, e recebe um código de 6 letras.
- Aluno: `/entrar` com código da turma + apelido + PIN de 4 números.

## Conteúdo

Fica em `content/efXXcoYY.ts`, um arquivo por habilidade (não fica no banco). Para editar uma lição, edite o arquivo e rode `pnpm test`.
Não mude o `id` de lições/questões já usadas: o progresso dos alunos é salvo por esse id.

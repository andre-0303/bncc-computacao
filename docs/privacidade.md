# Privacidade (LGPD) e cookies

O sistema trata dados de adolescentes (~14 anos), então vale a LGPD inteira e, em especial, o art. 14 (melhor interesse do adolescente). Papéis: a **escola/professor é a controladora**; quem mantém o sistema é a **operadora**.

## Dados de demonstração

Hoje o projeto é de portfólio: `lib/privacy.ts` (objeto `PRIVACY`) traz valores fictícios (Escola Exemplo, e-mails `@exemplo.com`) e `demo: true`, que mostra um aviso de demonstração no topo de `/privacidade`. Para usar com alunos de verdade, troque `school`, `schoolContact`, `operator`, `dpoName` e `dpoEmail` pelos dados reais, confira `dbRegion` e mude `demo` para `false`.

Atualize também `lastUpdated` sempre que mudar o texto da política (`app/privacidade/page.tsx`).

A política explica as duas bases legais possíveis (escola pública: art. 7º, III; particular: art. 7º, IX). Se a escola preferir citar só uma, edite a seção "Por que guardamos". Recomenda-se que o jurídico/encarregado da escola revise o texto.

## O que o produto oferece

| Direito / obrigação | Onde |
| --- | --- |
| Política de privacidade e cookies | `/privacidade` (link no rodapé de todas as páginas e no login do aluno) |
| Acesso do aluno aos próprios dados | `/aluno/meus-dados` (link "Meus dados" no fim do mapa) |
| Correção | professor renomeia o aluno na turma |
| Cópia/portabilidade | botão de download por aluno → `GET /professor/aluno/:id/dados` (JSON; o código de acesso fica de fora por ser credencial) |
| Eliminação de um aluno | botão Remover (`removeStudent`) |
| Eliminação da turma inteira | "Apagar turma" no fim da página da turma (`removeClass`) |
| Retenção | `pnpm data:purge` (abaixo) |

Toda remoção usa o `ON DELETE CASCADE` do schema: apagar aluno ou turma apaga sessões, tentativas e conclusões. Export e remoções checam que a turma é do professor logado, como as outras actions.

Pedidos de professores (acesso, correção, exclusão da conta) são atendidos à mão, no banco, por quem opera o sistema.

## Cookies

Um único cookie, `session` (`lib/auth.ts`, nome e duração em `lib/privacy.ts`): `httpOnly`, `sameSite=lax`, `secure` em produção; para aluno é cookie de sessão do navegador (some ao fechar) com no máximo 12 horas no banco, para professor dura 30 dias; contém só um token aleatório. É estritamente necessário, então **não há banner de consentimento** (LGPD + guia de cookies da ANPD). Não há analytics, anúncios nem requisições a terceiros no navegador: as fontes do `next/font/google` são baixadas no build e servidas pelo próprio site. Se um dia entrar analytics ou outro cookie não essencial, aí sim é preciso consentimento e atualizar a tabela da política.

## Retenção

Política: os dados ficam enquanto a turma é usada; o professor deve apagar a turma no fim do ano letivo. Como rede de segurança, turmas criadas há mais de `PRIVACY.retentionMonths` (12) meses e sem nenhuma resposta de aluno nesse período são apagadas por:

```bash
pnpm data:purge          # só lista o que seria apagado
pnpm data:purge --apply  # apaga de verdade
```

Usa o banco do `.env`. Não há agendamento: rode manualmente (por exemplo, no início de cada ano letivo) ou configure um cron. Backups da Neon (restauração para um ponto no tempo) expiram sozinhos conforme o plano.

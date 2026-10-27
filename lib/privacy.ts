// Dados da política de privacidade. Valores fictícios de demonstração (projeto de portfólio):
// troque pelos dados reais da escola antes de usar com alunos (veja docs/privacidade.md).
// Sem "server-only" nem alias "@/": também é importado por scripts/purge-inactive.ts.
export const PRIVACY = {
  /** false quando a escola preencher os dados reais: some o aviso de demonstração. */
  demo: true,
  school: "Escola Exemplo",
  schoolContact: "secretaria@exemplo.com",
  operator: "Equipe do projeto",
  dpoName: "Encarregado de Dados (fictício)",
  dpoEmail: "privacidade@exemplo.com",
  dbRegion: "São Paulo, Brasil (AWS sa-east-1)",
  lastUpdated: "27 de outubro de 2026",
  /** Turmas sem nenhuma resposta de aluno por esse tempo são apagadas pelo pnpm data:purge. */
  retentionMonths: 12,
};

/** Nome do cookie de sessão (lib/auth.ts). Único cookie do sistema. */
export const SESSION_COOKIE = "session";
export const TEACHER_SESSION_DAYS = 30;
/** Alunos usam computadores compartilhados: cookie de sessão do navegador e no máximo 12 horas no banco. */
export const STUDENT_SESSION_HOURS = 12;

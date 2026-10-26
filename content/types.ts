// Só múltipla escolha: resposta aberta gerava falso erro ("8km", "7, 9", acentos).
export type Question = {
  id: string;
  prompt: string;
  options: string[];
  /** índice da opção correta em options */
  answer: number;
  why: string;
};

export type Lesson = {
  id: string;
  title: string;
  /** markdown */
  explanation: string;
  /** markdown: explicação alternativa para o botão "Não entendi" */
  simpler: string;
  questions: Question[];
};

export type Axis = "PC" | "MD" | "CD";

export type Skill = {
  code: string;
  axis: Axis;
  title: string;
  /** texto oficial da habilidade na BNCC Computação */
  bnccText: string;
  lessons: Lesson[];
};

/** Versão enviada ao navegador: sem gabarito. */
export type PublicQuestion = Omit<Question, "answer" | "why">;

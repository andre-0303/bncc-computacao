// Funções puras do código de acesso: usadas no servidor e no navegador.

/** Aceita o código com ou sem traço/espaços, em qualquer caixa. */
export const normalizeAccessCode = (input: string) => input.toUpperCase().replace(/[^A-Z0-9]/g, "");

/** Exibição em dois blocos, mais fácil de ditar e digitar: K7XQ-2MPA */
export const formatAccessCode = (code: string) => `${code.slice(0, 4)}-${code.slice(4)}`;

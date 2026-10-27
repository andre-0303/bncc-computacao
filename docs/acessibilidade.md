# Acessibilidade

Meta: WCAG 2.2 nível AA, seguindo também as recomendações do eMAG (Modelo de Acessibilidade em Governo Eletrônico) quando custam pouco. O app é usado no celular e projetado em sala, então contraste e teclado valem para todos.

## O que está garantido

- **Idioma e títulos**: `lang="pt-BR"`; cada página tem título próprio no formato `Página | Computação 9º ano` (lição, habilidade, turma etc.).
- **Atalho para o conteúdo**: o primeiro Tab mostra "Pular para o conteúdo", que leva ao `<main id="conteudo">` (recomendação do eMAG).
- **Teclado**: tudo funciona sem mouse, com foco visível (contorno azul). O foco não fica escondido sob o cabeçalho fixo do aluno nem sob o painel de resposta do exercício (`scroll-padding` em `app/globals.css`).
- **Exercícios** (`components/quiz.tsx`):
  - alternativas são rádios nativos dentro de um `fieldset`: Tab entra no grupo, setas trocam a escolha;
  - atalhos 1-4 / A-D e Enter funcionam só com o foco dentro do exercício (WCAG 2.1.4);
  - a cada questão o foco vai para o enunciado, que começa com "Questão N de M";
  - ao verificar, o foco vai para Continuar, e o leitor de tela lê o resultado e a explicação (`aria-describedby`);
  - certo e errado aparecem com ícone e texto, não só com cor.
- **Formulários**: rótulos ligados aos campos; em erro, o campo recebe `aria-invalid`, a mensagem é anunciada (`role="alert"`) e ligada ao campo por `aria-describedby`; nos logins o foco volta para o campo.
- **Contraste**: textos com pelo menos 4,5:1, bordas de campos e ícones com pelo menos 3:1. As cores dos eixos, de acerto e de erro foram escurecidas para o texto branco passar.
- **Relatório da turma**: cada célula mostra o percentual em texto, além da cor; células vazias são lidas como "sem respostas". A tabela rola na horizontal no celular e pode ser rolada pelo teclado.
- **Movimento reduzido**: com "reduzir movimento" ligado no sistema, animações e a barra de leitura da lição são desligadas.
- **Zoom e celular**: sem rolagem horizontal a 320px de largura (zoom de 400% num monitor de 1280px), exceto a tabela do relatório, que é uma tabela de dados em duas dimensões.
- **Áreas de toque** de pelo menos 24×24px.

## Limitações conhecidas

- Os pedidos de confirmação do professor (renomear, remover aluno, gerar novo código) usam `prompt`/`confirm` do navegador: são acessíveis, mas o visual depende do navegador.
- O mapa da página inicial é uma imagem com descrição em texto; não é navegável estação por estação.
- Só há tema claro (o app é pensado para projeção).

Problemas de acessibilidade podem ser relatados ao professor ou a quem administra o sistema na escola.

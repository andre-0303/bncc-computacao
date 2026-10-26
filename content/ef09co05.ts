import type { Skill } from "./types.ts";

export const ef09co05: Skill = {
  code: "EF09CO05",
  axis: "MD",
  title: "Criptografia",
  bnccText: "Analisar técnicas de criptografia para armazenamento e transmissão de dados.",
  lessons: [
    {
      id: "ef09co05-l1",
      title: "O que é criptografia",
      explanation: `**Criptografia** é transformar uma mensagem para que só quem tem a "chave" consiga entender.

A mensagem original se chama **texto claro**. Depois de embaralhada, vira **texto cifrado**. Transformar o texto claro em cifrado é **cifrar** (ou criptografar); fazer o caminho de volta é **decifrar**.

Isso é antigo: generais romanos já escondiam ordens de guerra assim. Na Segunda Guerra Mundial, a máquina alemã **Enigma** cifrava mensagens militares, e quebrar esse código ajudou os Aliados a vencer.

Hoje você usa criptografia o tempo todo sem perceber:

- quando o cadeado aparece no navegador (**https**);
- nas mensagens do WhatsApp (criptografia de ponta a ponta);
- quando paga algo com cartão ou Pix.`,
      simpler: `Pense num bilhete que você passa na sala de aula. Se o professor pegar, lê tudo.

Agora imagine que você e seu amigo combinaram trocar cada letra pela seguinte do alfabeto: **OI** vira **PJ**. Se o professor pegar o bilhete, só vê "PJ" e não entende nada. Seu amigo, que sabe o combinado, volta cada letra uma posição e lê **OI**.

O combinado secreto é a **chave**. Isso é criptografia.`,
      questions: [
        {
          id: "ef09co05-l1-q1",
          prompt: "Qual é o objetivo principal da criptografia?",
          options: [
            "Deixar o arquivo menor para ocupar menos espaço",
            "Fazer com que só quem tem a chave consiga entender a mensagem",
            "Enviar a mensagem mais rápido pela internet",
            "Apagar a mensagem depois de lida",
          ],
          answer: 1,
          why: "Criptografia protege o conteúdo: sem a chave, a mensagem fica ilegível. Diminuir o tamanho é compactação, outra coisa.",
        },
        {
          id: "ef09co05-l1-q2",
          prompt: "A mensagem depois de embaralhada pela criptografia se chama:",
          options: ["Texto claro", "Texto cifrado", "Senha", "Metadado"],
          answer: 1,
          why: "Texto claro é a mensagem original; texto cifrado é a versão embaralhada.",
        },
        {
          id: "ef09co05-l1-q3",
          prompt: "Verdadeiro ou falso: o cadeado e o \"https\" no navegador indicam que os dados trocados com o site são criptografados.",
          options: ["Verdadeiro", "Falso"],
          answer: 0,
          why: "O https cifra o caminho entre você e o site. Atenção: isso não garante que o site seja confiável, só que ninguém no meio do caminho lê os dados.",
        },
        {
          id: "ef09co05-l1-q4",
          prompt: "Em qual dessas situações a criptografia é MAIS importante?",
          options: [
            "Ver a previsão do tempo",
            "Assistir a um vídeo público",
            "Digitar a senha do banco num aplicativo",
            "Ler uma notícia num jornal online",
          ],
          answer: 2,
          why: "Senhas e dados bancários são sigilosos: se alguém interceptar, pode roubar sua conta. Por isso eles sempre trafegam cifrados.",
        },
      ],
    },
    {
      id: "ef09co05-l2",
      title: "Cifra de César",
      explanation: `A **cifra de César** é uma das mais antigas. Júlio César trocava cada letra por outra **3 posições à frente** no alfabeto:

- A → D, B → E, C → F, D → G ...
- ... X → A, Y → B, Z → C

Quando chega no fim do alfabeto, **dá a volta**: X vira A, Y vira B, Z vira C.

Exemplo com deslocamento 3: **CASA** vira **FDVD**.

Para decifrar, faz o contrário: anda 3 posições **para trás**.

O número de posições (aqui, 3) é a **chave**. Quem sabe a chave decifra rapidinho.`,
      simpler: `Escreva o alfabeto numa fita e cole as pontas formando um círculo. Agora, para cada letra da mensagem, ande 3 casinhas para a frente no círculo e anote a letra onde parou.

- A → anda 3 → **D**
- B → anda 3 → **E**
- Z → anda 3 (dá a volta) → **C**

Para ler a mensagem secreta, ande 3 casinhas **para trás**.`,
      questions: [
        {
          id: "ef09co05-l2-q1",
          prompt: "Use a cifra de César com deslocamento 3 para cifrar a palavra: SOL",
          options: ["VRO", "PLI", "TPM", "SOL"],
          answer: 0,
          why: "S→V, O→R, L→O. Cada letra anda 3 posições para a frente.",
        },
        {
          id: "ef09co05-l2-q2",
          prompt: "Decifre esta mensagem feita com César deslocamento 3: GDGRV",
          options: ["DADOS", "JGJUY", "DADOR", "FCFQU"],
          answer: 0,
          why: "Voltando 3 posições: G→D, D→A, G→D, R→O, V→S. Resultado: DADOS.",
        },
        {
          id: "ef09co05-l2-q3",
          prompt: "Com deslocamento 3, a letra Y vira:",
          options: ["B", "Z", "A", "C"],
          answer: 0,
          why: "Y → Z → A → B. Depois do Z, o alfabeto dá a volta e recomeça no A.",
        },
        {
          id: "ef09co05-l2-q4",
          prompt: "Na cifra de César, o que é a chave?",
          options: [
            "A primeira letra da mensagem",
            "O número de posições que cada letra é deslocada",
            "O nome de quem enviou",
            "O alfabeto inteiro",
          ],
          answer: 1,
          why: "A chave é o deslocamento. Sabendo esse número, dá para cifrar e decifrar.",
        },
        {
          id: "ef09co05-l2-q5",
          prompt: "Desafio: esta mensagem usou deslocamento 1. Decifre: CJU",
          options: ["BIT", "DKV", "ZGR", "BYTE"],
          answer: 0,
          why: "Voltando 1 posição: C→B, J→I, U→T. BIT é a menor unidade de informação do computador.",
        },
      ],
    },
    {
      id: "ef09co05-l3",
      title: "Por que César não protege seu banco",
      explanation: `A cifra de César é fácil de quebrar: só existem **25 deslocamentos possíveis**. Um computador testa todos em menos de um segundo. Tentar todas as chaves assim se chama **ataque de força bruta**.

Por isso a criptografia moderna usa chaves **enormes**. Algumas chaves usadas em bancos são números com centenas de dígitos. Testar todas as possibilidades levaria mais tempo do que a idade do universo, mesmo com os computadores mais rápidos.

Outra ideia moderna é ter **duas chaves**: uma **pública**, que qualquer um pode usar para cifrar uma mensagem para você, e uma **privada**, que só você tem e é a única que decifra. É assim que o navegador combina um segredo com o site do banco sem que ninguém no caminho descubra.

Resumo: a criptografia protege dados **guardados** (no celular, no servidor) e dados **em trânsito** (viajando pela internet).`,
      simpler: `Imagine um cadeado de mala com só **um** número (0 a 9). Qualquer pessoa abre testando os 10 números. Esse é o problema da cifra de César: poucas chaves.

Agora imagine um cadeado com **100 números** em sequência. Mesmo testando um por segundo, você morreria de velhice antes de abrir. É assim a criptografia moderna: tantas chaves que testar todas é impossível na prática.`,
      questions: [
        {
          id: "ef09co05-l3-q1",
          prompt: "Por que a cifra de César é considerada insegura hoje?",
          options: [
            "Porque só funciona em português",
            "Porque tem poucas chaves possíveis e dá para testar todas rapidamente",
            "Porque deixa a mensagem muito grande",
            "Porque precisa de internet",
          ],
          answer: 1,
          why: "São só 25 deslocamentos. Testar todos (força bruta) é instantâneo para um computador.",
        },
        {
          id: "ef09co05-l3-q2",
          prompt: "O que é um ataque de força bruta?",
          options: [
            "Quebrar o computador da vítima",
            "Testar todas as chaves possíveis até achar a certa",
            "Enviar muitos e-mails de propaganda",
            "Desligar a internet de alguém",
          ],
          answer: 1,
          why: "Força bruta é tentativa e erro com todas as chaves. Por isso chaves longas são mais seguras.",
        },
        {
          id: "ef09co05-l3-q3",
          prompt: "Na criptografia com chave pública e chave privada, qual chave você deve guardar em segredo?",
          options: ["A chave pública", "A chave privada", "As duas", "Nenhuma"],
          answer: 1,
          why: "A pública pode ser distribuída para qualquer um cifrar mensagens para você. Só a privada decifra, então ela é o segredo.",
        },
        {
          id: "ef09co05-l3-q4",
          prompt: "Um aplicativo guarda as fotos do seu celular cifradas. Isso protege os dados:",
          options: ["Em trânsito", "Armazenados", "Nenhum dos dois", "Só quando o celular está desligado"],
          answer: 1,
          why: "Dados guardados no aparelho ou num servidor são dados armazenados. Dados viajando pela rede são dados em trânsito.",
        },
      ],
    },
  ],
};

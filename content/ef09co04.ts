import type { Skill } from "./types.ts";

export const ef09co04: Skill = {
  code: "EF09CO04",
  axis: "MD",
  title: "Malwares e ataques",
  bnccText: "Compreender o funcionamento de malwares e outros ataques cibernéticos.",
  lessons: [
    {
      id: "ef09co04-l1",
      title: "Tipos de malware",
      explanation: `**Malware** (de *malicious software*) é um programa feito para causar dano: roubar dados, espionar, travar o aparelho. Os tipos são definidos por **como entram** e **o que fazem**:

- **Vírus**: se gruda em outro arquivo ou programa e se ativa quando ele é aberto.
- **Worm** (verme): se espalha **sozinho** pela rede, de computador em computador, sem ninguém abrir nada.
- **Cavalo de Troia** (*trojan*): se disfarça de algo útil ou divertido (um jogo grátis, por exemplo) e, escondido, faz o mal.
- **Spyware**: espiona o que você digita, acessa e fala.
- **Ransomware**: **sequestra** seus arquivos, criptografando-os, e cobra um resgate para devolver.

Um pouco de história: o **Brain** (1986) foi um dos primeiros vírus de PC, e o **Worm Morris** (1988) derrubou boa parte da internet da época.`,
      simpler: `Pense nos malwares como tipos de "invasores":

- **Vírus**: pega carona num arquivo, como um carrapato num cachorro.
- **Worm**: se espalha sozinho, como uma gripe numa sala fechada.
- **Cavalo de Troia**: um presente bonito com um ladrão escondido dentro.
- **Spyware**: um espião olhando por cima do seu ombro.
- **Ransomware**: um sequestrador que tranca suas coisas e pede dinheiro pela chave.`,
      questions: [
        {
          id: "ef09co04-l1-q1",
          prompt: "Seus arquivos ficaram trancados e aparece uma mensagem pedindo pagamento para liberá-los. Que malware é esse?",
          options: ["Spyware", "Worm", "Ransomware", "Vírus de boot"],
          answer: 2,
          why: "Ransomware criptografa os arquivos e pede resgate (ransom, em inglês).",
        },
        {
          id: "ef09co04-l1-q2",
          prompt: "Você baixa um \"jogo pago de graça\" de um site estranho. O jogo funciona, mas rouba suas senhas em segredo. Isso é um:",
          options: ["Cavalo de Troia", "Worm", "Antivírus", "Firewall"],
          answer: 0,
          why: "Cavalo de Troia se disfarça de algo desejável para que você mesmo o instale.",
        },
        {
          id: "ef09co04-l1-q3",
          prompt: "Qual malware se espalha sozinho pela rede, sem precisar que alguém abra um arquivo?",
          options: ["Vírus", "Worm", "Cavalo de Troia", "Spyware"],
          answer: 1,
          why: "O worm se copia de computador em computador explorando falhas da rede. O vírus precisa que um arquivo infectado seja aberto.",
        },
        {
          id: "ef09co04-l1-q4",
          prompt: "Um programa que registra tudo o que você digita e manda para outra pessoa é um:",
          options: ["Spyware", "Ransomware", "Worm", "Backup"],
          answer: 0,
          why: "Spyware espiona. Os que gravam teclas digitadas também são chamados de keyloggers.",
        },
      ],
    },
    {
      id: "ef09co04-l2",
      title: "Como eles entram e como se proteger",
      explanation: `Malwares costumam entrar por:

- **Anexos e links** em e-mails e mensagens.
- **Pendrives** de origem desconhecida.
- **Programas e jogos piratas** ou de sites não oficiais.
- **Sistemas desatualizados**, com falhas conhecidas.

Muitos ataques usam **engenharia social**: enganar a pessoa em vez do computador. O exemplo clássico é o **phishing**, uma mensagem falsa ("você ganhou um prêmio!", "sua conta será bloqueada") que leva a um site falso para roubar senha.

Como se proteger:

- Mantenha sistema e apps **atualizados**.
- Baixe apps só de **lojas oficiais**.
- **Desconfie** de mensagens urgentes ou boas demais.
- Ative a **verificação em duas etapas**.
- Faça **backup** dos arquivos importantes.`,
      simpler: `Pense na sua casa:

- **Atualizar o sistema** é consertar a fechadura quebrada.
- **Não clicar em link estranho** é não abrir a porta para desconhecido.
- **Verificação em duas etapas** é ter duas fechaduras: mesmo que roubem uma chave (a senha), ainda falta a outra.
- **Backup** é ter cópia das coisas importantes em outro lugar: se algo acontecer, você não perde tudo.`,
      questions: [
        {
          id: "ef09co04-l2-q1",
          prompt: "Qual é a melhor defesa para não perder seus arquivos num ataque de ransomware?",
          options: ["Ter backup atualizado", "Mudar o papel de parede", "Usar senha curta", "Desligar o monitor"],
          answer: 0,
          why: "Com backup, você recupera os arquivos sem pagar resgate.",
        },
        {
          id: "ef09co04-l2-q2",
          prompt: "Chega uma mensagem: \"Sua conta será bloqueada em 1 hora! Clique aqui e confirme sua senha.\" Isso provavelmente é:",
          options: ["Um aviso oficial", "Phishing", "Uma atualização", "Um backup"],
          answer: 1,
          why: "Urgência + pedido de senha + link são sinais clássicos de phishing. Serviços sérios não pedem sua senha por mensagem.",
        },
        {
          id: "ef09co04-l2-q3",
          prompt: "Por que é importante instalar as atualizações do sistema?",
          options: [
            "Só para ganhar emojis novos",
            "Porque elas corrigem falhas de segurança que malwares exploram",
            "Porque deixam o celular mais pesado",
            "Não é importante",
          ],
          answer: 1,
          why: "Muitas atualizações fecham brechas já conhecidas pelos atacantes.",
        },
        {
          id: "ef09co04-l2-q4",
          prompt: "Verdadeiro ou falso: só computadores pegam malware, celulares não.",
          options: ["Verdadeiro", "Falso"],
          answer: 1,
          why: "Celulares também são alvo, principalmente por apps de fora da loja oficial e links em mensagens.",
        },
      ],
    },
  ],
};

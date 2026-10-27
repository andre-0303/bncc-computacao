import type { Metadata } from "next";
import { Brand } from "@/components/brand";
import { PRIVACY, SESSION_COOKIE, STUDENT_SESSION_HOURS, TEACHER_SESSION_DAYS } from "@/lib/privacy";

export const metadata: Metadata = { title: "Privacidade e cookies" };

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      <h2 className="text-xl font-extrabold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

const P = PRIVACY;

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <Brand />
        </div>
      </header>
      <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 space-y-10 px-4 py-10 leading-relaxed [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
        <div className="space-y-3">
          {P.demo && (
            <p className="rounded-xl border-2 border-ink bg-warn-soft p-4 text-sm">
              <strong>Projeto de demonstração.</strong> Escola, contatos e encarregado são fictícios. A política mostra
              como o sistema trataria os dados numa escola real.
            </p>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Privacidade e cookies</h1>
          <p className="text-lg text-muted-foreground">
            Este texto explica, sem complicação, quais dados o site guarda sobre você, por que guarda e o que você pode
            pedir. Ele segue a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
          </p>
          <p className="text-sm text-muted-foreground">Última atualização: {P.lastUpdated}.</p>
        </div>

        <Section title="Resumo rápido">
          <ul>
            <li>O site serve para você revisar Computação. Ele complementa a aula do seu professor.</li>
            <li>Guardamos só o necessário: seu nome, sua turma, seu código de acesso e suas respostas aos exercícios.</li>
            <li>Não pedimos e-mail, telefone, foto nem endereço. Não tem propaganda nem rastreamento.</li>
            <li>Só seu professor (e a escola) vê o seu progresso. Ninguém vende seus dados.</li>
            <li>Você pode pedir para ver, corrigir ou apagar seus dados.</li>
          </ul>
        </Section>

        <Section title="Quem cuida dos seus dados">
          <p>
            <strong>{P.school}</strong> é a <strong>controladora</strong>: é a escola, por meio do seu professor, que
            decide usar o site, cadastra os alunos e acompanha o progresso. Contato da escola: {P.schoolContact}.
          </p>
          <p>
            <strong>{P.operator}</strong> mantém o sistema funcionando e atua como <strong>operador</strong>: trata os
            dados só para fazer o site funcionar, seguindo as instruções da escola.
          </p>
          <p>
            <strong>Encarregado de dados (DPO):</strong> {P.dpoName}, pelo e-mail {P.dpoEmail}. É com essa pessoa que
            você, sua família ou a ANPD podem falar sobre privacidade.
          </p>
        </Section>

        <Section title="Quais dados guardamos">
          <p className="font-bold">Sobre você, aluno:</p>
          <ul>
            <li>seu nome, como o professor digitou;</li>
            <li>a turma em que você está;</li>
            <li>seu código de acesso pessoal (é a sua &quot;senha&quot;);</li>
            <li>cada resposta que você dá: qual questão, se acertou ou errou, e quando;</li>
            <li>as lições que você concluiu e a nota de cada uma;</li>
            <li>enquanto você está logado, uma sessão (veja &quot;Cookies&quot; abaixo).</li>
          </ul>
          <p className="font-bold">Sobre o professor:</p>
          <ul>
            <li>nome, e-mail e a senha guardada de forma embaralhada (hash), que nem nós conseguimos ler;</li>
            <li>os nomes das turmas que criou.</li>
          </ul>
          <p>
            Não coletamos e-mail, telefone, foto, endereço, localização, dados de saúde ou qualquer dado sensível de
            alunos. O site não usa ferramentas de análise (analytics), anúncios nem redes sociais.
          </p>
        </Section>

        <Section title="Por que guardamos (base legal)">
          <p>Usamos seus dados só para:</p>
          <ul>
            <li>deixar você entrar com seu código;</li>
            <li>corrigir os exercícios e lembrar o que você já fez e o que precisa revisar;</li>
            <li>mostrar ao seu professor em que a turma vai bem e o que vale retomar em aula.</li>
          </ul>
          <p>
            Não precisamos do seu consentimento para isso porque é parte da atividade de ensino da escola. Em escola
            pública, a base legal é a <strong>execução de políticas públicas</strong> de educação (LGPD, art. 7º, III).
            Em escola particular, é o <strong>legítimo interesse</strong> da escola em acompanhar a aprendizagem (art.
            7º, IX), sempre limitado ao que é necessário. A ANPD admite essas bases para dados de crianças e
            adolescentes, desde que o melhor interesse deles venha em primeiro lugar (Enunciado CD/ANPD nº 1/2023).
            Escolhemos essas bases porque o site é uma ferramenta da aula, não algo opcional à parte: depender de
            consentimento deixaria de fora alunos que precisam acompanhar a turma.
          </p>
        </Section>

        <Section title="Dados de adolescentes">
          <p>
            Quase todos os usuários têm cerca de 14 anos. Por isso seguimos o art. 14 da LGPD, que manda tratar dados
            de crianças e adolescentes sempre no <strong>melhor interesse</strong> deles. Na prática:
          </p>
          <ul>
            <li>coletamos o mínimo possível e nada além do que o ensino precisa;</li>
            <li>não há perfil público, chat, ranking entre colegas nem contato com estranhos;</li>
            <li>não usamos seus dados para propaganda, venda ou para criar perfis de comportamento;</li>
            <li>as regras estão escritas aqui de um jeito fácil de entender, para você e sua família.</li>
          </ul>
        </Section>

        <Section title="Por quanto tempo guardamos">
          <ul>
            <li>
              Seus dados ficam guardados enquanto você usa o site com a sua turma. O professor pode apagar um aluno ou a
              turma inteira a qualquer momento, e aí tudo é apagado na hora.
            </li>
            <li>
              Turmas sem nenhuma atividade por {P.retentionMonths} meses são apagadas, com todos os dados dos alunos.
            </li>
            <li>
              A sessão de login do aluno dura até {STUDENT_SESSION_HOURS} horas, ou até você fechar o navegador ou clicar
              em Sair. A do professor dura até {TEACHER_SESSION_DAYS} dias, ou até clicar em Sair.
            </li>
            <li>Cópias de segurança do banco são apagadas automaticamente pelo provedor depois de alguns dias.</li>
          </ul>
        </Section>

        <Section title="Com quem compartilhamos">
          <p>
            Não vendemos nem compartilhamos seus dados com ninguém para outros fins. Só usamos empresas de
            infraestrutura, que guardam os dados ou fazem o site funcionar e não podem usá-los para mais nada:
          </p>
          <ul>
            <li>
              <strong>Neon</strong>: banco de dados (região: {P.dbRegion});
            </li>
            <li>
              <strong>Vercel</strong>: hospedagem do site. Como todo servidor, registra dados técnicos de acesso (como o
              endereço IP) por pouco tempo, para segurança.
            </li>
          </ul>
          <p>
            Esses serviços podem ficar fora do Brasil. Nesse caso, a transferência segue o art. 33 da LGPD, com
            cláusulas contratuais de proteção de dados. Também podemos ter que entregar dados se uma lei ou um juiz
            mandar.
          </p>
        </Section>

        <Section title="Como protegemos">
          <ul>
            <li>conexão sempre criptografada (HTTPS) e banco de dados com acesso restrito;</li>
            <li>cada professor só vê e altera as próprias turmas;</li>
            <li>senhas de professor guardadas com hash; o gabarito nunca vai para o seu navegador;</li>
            <li>o professor pode trocar seu código na hora se ele vazar, e quem usava o código antigo é desconectado.</li>
          </ul>
          <p>Se acontecer um incidente de segurança que possa te afetar, a escola e a ANPD serão avisadas.</p>
        </Section>

        <Section title="Seus direitos">
          <p>Pela LGPD (art. 18), você ou seu responsável podem pedir, de graça:</p>
          <ul>
            <li>confirmação de que guardamos dados seus e acesso a eles;</li>
            <li>correção de dados errados (por exemplo, seu nome escrito errado);</li>
            <li>uma cópia dos seus dados em arquivo (portabilidade);</li>
            <li>apagamento dos dados, ou que sejam anonimizados ou bloqueados se forem desnecessários;</li>
            <li>informação sobre com quem os dados são compartilhados;</li>
            <li>revisão de decisões tomadas só por computador (aqui, só a correção automática dos exercícios);</li>
            <li>reclamar na Autoridade Nacional de Proteção de Dados (ANPD), em gov.br/anpd.</li>
          </ul>
          <p>
            <strong>Como pedir:</strong> o jeito mais rápido é falar com seu professor, que pode corrigir seu nome,
            baixar uma cópia dos seus dados ou apagá-los direto no site. Você também pode escrever para o encarregado (
            {P.dpoEmail}) ou para a escola. Responderemos em até 15 dias. Logado, você vê o que guardamos sobre você em{" "}
            <strong>Meus dados</strong>, no seu mapa.
          </p>
        </Section>

        <Section id="cookies" title="Cookies">
          <p>
            Cookie é um pequeno arquivo que o site guarda no seu navegador. Usamos <strong>um único cookie</strong>, que
            é estritamente necessário: sem ele, você teria que digitar o código a cada página. Por isso ele não precisa
            de consentimento e não há aviso de cookies. Não usamos cookies de propaganda, de análise ou de outras
            empresas, e as fontes do site são servidas pelo próprio site.
          </p>
          <div className="overflow-x-auto rounded-2xl border bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th scope="col" className="p-3">Nome</th>
                  <th scope="col" className="p-3">Para que serve</th>
                  <th scope="col" className="p-3">Duração</th>
                  <th scope="col" className="p-3">De quem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-mono">{SESSION_COOKIE}</td>
                  <td className="p-3">Manter você logado. Guarda só um número aleatório, não seu nome nem seu código.</td>
                  <td className="p-3">
                    Aluno: até fechar o navegador (no máximo {STUDENT_SESSION_HOURS} horas). Professor: até{" "}
                    {TEACHER_SESSION_DAYS} dias. Ou até você sair
                  </td>
                  <td className="p-3">Do próprio site</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Mudanças nesta política">
          <p>
            Se mudarmos algo importante, a data no início desta página muda e a escola avisa os professores, que avisam
            as turmas. Se a mudança precisar do seu consentimento, vamos pedir antes.
          </p>
        </Section>
      </main>
    </>
  );
}

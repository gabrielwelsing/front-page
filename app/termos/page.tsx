export const metadata = {
  title: "Termos de Uso — SUP-IA",
  description: "Termos de Uso da plataforma SUP-IA",
}

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-sm text-blue-600 hover:underline mb-8 inline-block">← Voltar para o início</a>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Termos de Uso</h1>
        <p className="text-sm text-slate-500 mb-10">Última atualização: abril de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar ou utilizar a plataforma SUP-IA, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize a plataforma.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Descrição do Serviço</h2>
            <p>A SUP-IA é uma plataforma SaaS de automação voltada para projetos de redes elétricas de média e baixa tensão. Os serviços incluem módulos de contagem, numeração de postes, gestão de Notas de Serviço, conversão de imagens, integração com Google Earth e automação de caderneta topográfica.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Cadastro e Conta</h2>
            <p>Para utilizar a plataforma, é necessário criar uma conta com informações verdadeiras e atualizadas. O usuário é responsável pela confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Uso Permitido</h2>
            <p>O uso da plataforma é permitido exclusivamente para fins profissionais e corporativos relacionados à engenharia elétrica, topografia e gestão de projetos. É vedado:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Compartilhar credenciais de acesso com terceiros não autorizados;</li>
              <li>Utilizar a plataforma para fins ilícitos ou que violem direitos de terceiros;</li>
              <li>Realizar engenharia reversa, descompilar ou tentar extrair o código-fonte da plataforma;</li>
              <li>Automatizar o acesso à plataforma sem autorização prévia por escrito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Planos e Pagamento</h2>
            <p>A SUP-IA oferece planos de assinatura mensal e anual. Os valores e condições estão disponíveis na página de preços. O não pagamento poderá resultar na suspensão do acesso. Não há reembolso de valores já pagos, salvo disposição legal em contrário.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Propriedade Intelectual</h2>
            <p>Todos os direitos sobre a plataforma, seus módulos, interfaces, algoritmos e conteúdos pertencem exclusivamente à SUP-IA. O uso da plataforma não transfere ao usuário qualquer direito de propriedade intelectual.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Disponibilidade do Serviço</h2>
            <p>A SUP-IA empenha-se em manter a plataforma disponível 24 horas por dia, 7 dias por semana, mas não garante disponibilidade ininterrupta. Manutenções programadas serão comunicadas com antecedência sempre que possível.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Limitação de Responsabilidade</h2>
            <p>A SUP-IA não se responsabiliza por danos indiretos, incidentais ou consequentes decorrentes do uso ou impossibilidade de uso da plataforma. A responsabilidade total da SUP-IA fica limitada ao valor pago pelo usuário nos últimos 3 meses.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Cancelamento</h2>
            <p>O usuário pode cancelar sua assinatura a qualquer momento pelo painel de controle ou entrando em contato com <a href="mailto:adm@sup-ia.com" className="text-blue-600 hover:underline">adm@sup-ia.com</a>. O acesso permanece ativo até o fim do período já pago.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Alterações nos Termos</h2>
            <p>A SUP-IA reserva-se o direito de modificar estes termos a qualquer momento. Alterações relevantes serão comunicadas por e-mail ou notificação na plataforma. O uso continuado após as alterações implica na aceitação dos novos termos.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contato</h2>
            <p>Dúvidas sobre estes Termos de Uso podem ser enviadas para <a href="mailto:adm@sup-ia.com" className="text-blue-600 hover:underline">adm@sup-ia.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  )
}

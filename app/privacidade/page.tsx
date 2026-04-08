export const metadata = {
  title: "Política de Privacidade — SUP-IA",
  description: "Política de Privacidade da plataforma SUP-IA",
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-sm text-blue-600 hover:underline mb-8 inline-block">← Voltar para o início</a>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Política de Privacidade</h1>
        <p className="text-sm text-slate-500 mb-10">Última atualização: abril de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Quem Somos</h2>
            <p>A SUP-IA é uma plataforma de automação para projetos de engenharia elétrica e topografia. Esta política descreve como coletamos, utilizamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Dados que Coletamos</h2>
            <p>Coletamos os seguintes dados para prestação do serviço:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Dados de cadastro:</strong> nome, e-mail, empresa e cargo;</li>
              <li><strong>Dados de uso:</strong> módulos acessados, arquivos processados (não armazenamos o conteúdo dos arquivos após o processamento), logs de acesso;</li>
              <li><strong>Dados de pagamento:</strong> gerenciados por processadores de pagamento terceiros; não armazenamos dados de cartão;</li>
              <li><strong>Cookies e dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Como Utilizamos os Dados</h2>
            <p>Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Prestar e melhorar os serviços da plataforma;</li>
              <li>Gerenciar sua conta e assinatura;</li>
              <li>Enviar comunicações sobre o serviço, atualizações e suporte;</li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Gerar estatísticas de uso anonimizadas para melhoria do produto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Compartilhamento de Dados</h2>
            <p>Não vendemos seus dados pessoais. Podemos compartilhá-los apenas com:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Processadores de pagamento para efetuar cobranças;</li>
              <li>Provedores de infraestrutura de nuvem (servidores);</li>
              <li>Autoridades competentes quando exigido por lei.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Armazenamento e Segurança</h2>
            <p>Seus dados são armazenados em servidores seguros com criptografia em trânsito (HTTPS) e em repouso. Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou divulgação indevida.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Retenção de Dados</h2>
            <p>Mantemos seus dados pelo tempo necessário para prestação do serviço e cumprimento de obrigações legais. Após o cancelamento da conta, os dados são excluídos em até 90 dias, salvo obrigação legal de retenção por prazo maior.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Seus Direitos (LGPD)</h2>
            <p>Como titular dos dados, você tem direito a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Confirmar a existência e acessar seus dados;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação dos dados;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <p className="mt-3">Para exercer esses direitos, entre em contato: <a href="mailto:adm@sup-ia.com" className="text-blue-600 hover:underline">adm@sup-ia.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Cookies</h2>
            <p>Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos (anonimizados) para entender o uso do sistema. Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar o funcionamento de algumas funcionalidades.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Alterações nesta Política</h2>
            <p>Podemos atualizar esta política periodicamente. Comunicaremos alterações relevantes por e-mail ou notificação na plataforma. Recomendamos revisar esta página regularmente.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Contato</h2>
            <p>Para dúvidas, solicitações ou reclamações relacionadas à privacidade dos seus dados, entre em contato: <a href="mailto:adm@sup-ia.com" className="text-blue-600 hover:underline">adm@sup-ia.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  )
}

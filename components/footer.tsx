import Image from "next/image"

export function Footer() {
  return (
    <footer id="contato" className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo-supia-crop.png"
                alt="SUP-IA Logo"
                width={100}
                height={35}
                style={{ width: 'auto', height: '36px' }}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Inteligência Aliada à Energia. Automação 100% online para projetos de redes elétricas de média e baixa tensão.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              <li>
                <a href="#modulos" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Módulos
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Preços
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20teste%20da%20SUP-IA." target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Agendar Teste
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:adm@sup-ia.com?subject=Suporte%20SUP-IA" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Suporte
                </a>
              </li>
              <li>
                <a href="mailto:adm@sup-ia.com?subject=Interesse%20nos%20Planos%20SUP-IA" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Vendas
                </a>
              </li>
              <li>
                <a href="mailto:adm@sup-ia.com?subject=Agendar%20Teste%20SUP-IA" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Agendar Teste
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SUP-IA. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="/termos" className="text-slate-500 hover:text-white transition-colors text-sm">
              Termos de Uso
            </a>
            <a href="/privacidade" className="text-slate-500 hover:text-white transition-colors text-sm">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

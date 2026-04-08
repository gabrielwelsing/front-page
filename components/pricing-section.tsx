"use client"

import { useState } from "react"
import { Check, Sparkles } from "lucide-react"

const WHATSAPP_NUMBER = "5511999999999" // TODO: trocar pelo número real

function whatsappLink(plan: string) {
  const msg = encodeURIComponent(`Olá! Tenho interesse no plano ${plan} da SUP-IA. Gostaria de saber mais.`)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [enterpriseUsers, setEnterpriseUsers] = useState("10")

  const individualMonthly = "217,90"
  const individualAnnual = "197,90"
  const individualAnnualTotal = "2.374,80"

  const enterprisePrices: Record<string, { month: string; annual: string; annualTotal: string }> = {
    "10": { month: "1.697,00", annual: "1.497,00", annualTotal: "17.964,00" },
    "20": { month: "2.897,00", annual: "2.497,00", annualTotal: "29.964,00" },
    "50": { month: "5.997,00", annual: "4.997,00", annualTotal: "59.964,00" },
    "100+": { month: "", annual: "", annualTotal: "" },
  }

  const currentEnterprise = enterprisePrices[enterpriseUsers]
  const isSobConsulta = enterpriseUsers === "100+"
  const entPriceDisplay = isAnnual ? currentEnterprise.annual : currentEnterprise.month

  const savingsPercent = "~12%"

  return (
    <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl"></div>

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Planos e Preços
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Escolha o plano ideal para alavancar a engenharia da sua empresa.
          </p>

          {/* Toggle Mensal/Anual */}
          <div className="flex items-center justify-center mt-8 gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Mensal</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Alternar entre plano mensal e anual"
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Anual <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-0.5 rounded-full ml-1">Economize {savingsPercent}</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Individual */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative group">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Individual</h3>
              <p className="text-slate-500 text-sm">Para profissionais autônomos e projetistas.</p>
            </div>

            <div className="mb-2 flex items-baseline text-slate-900">
              <span className="text-2xl font-bold">R$</span>
              <span className="text-5xl font-extrabold tracking-tight ms-1">
                {isAnnual ? individualAnnual : individualMonthly}
              </span>
              <span className="text-slate-500 ml-2 font-medium">/mês</span>
            </div>
            {isAnnual && (
              <p className="text-xs text-slate-500 mb-6">
                Faturado R$ {individualAnnualTotal} anualmente.
              </p>
            )}
            {!isAnnual && <div className="mb-6" />}

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>1 Licença de usuário</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>Acesso Completo Earth (Exportação KML)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>Contagem + Numeração de Postes</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>Gestão de NS (Kanban Engenharia)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>Suporte via Email Brasileiro</span>
              </li>
            </ul>

            <a
              href={whatsappLink("Individual " + (isAnnual ? "Anual" : "Mensal"))}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 px-4 rounded-xl font-bold transition-all text-center text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/50 hover:border-blue-300"
            >
              Assinar Individual
            </a>
          </div>

          {/* Plano Empresarial */}
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-lg relative transform md:-translate-y-4 group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Recomendado
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Empresarial</h3>
              <p className="text-slate-500 text-sm">Escalável para Concessionárias e Terceirizadas.</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tamanho da Equipe</label>
              <div className="flex gap-2">
                {["10", "20", "50", "100+"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setEnterpriseUsers(size)}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md border transition-all ${
                      enterpriseUsers === size
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2 flex items-baseline text-slate-900">
              {isSobConsulta ? (
                <span className="text-3xl font-extrabold tracking-tight">Sob Consulta</span>
              ) : (
                <>
                  <span className="text-2xl font-bold">R$</span>
                  <span className="text-5xl font-extrabold tracking-tight ms-1">{entPriceDisplay}</span>
                  <span className="text-slate-500 ml-2 font-medium">/mês</span>
                </>
              )}
            </div>
            {isAnnual && !isSobConsulta && (
              <p className="text-xs text-slate-500 mb-6">
                Faturado R$ {currentEnterprise.annualTotal} anualmente.
              </p>
            )}
            {(!isAnnual || isSobConsulta) && <div className="mb-6" />}

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="font-semibold">Painel de Gestão de Usuários</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Todos os módulos inclusos</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Relatórios consolidados da equipe</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>API e NS Única Compartilhada</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Suporte Prioritário (WhatsApp)</span>
              </li>
            </ul>

            <a
              href={whatsappLink("Empresarial " + enterpriseUsers + " usuários")}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 px-4 rounded-xl font-bold transition-all text-center text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow"
            >
              {isSobConsulta ? "Falar com Consultor" : "Assinar Empresarial"}
            </a>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            ✅ Fácil adaptação com a sua empresa · Gestão personalizável · Programa facilmente personalizável ao seu fluxo
          </p>
        </div>
      </div>
    </section>
  )
}

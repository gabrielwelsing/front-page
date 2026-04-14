"use client"

import { useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { LeadCaptureModal } from "@/components/lead-capture-modal"


const NS_PRICE_MONTHLY = 40 // R$ por usuário/mês
const NS_DISCOUNT = 0.12

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [enterpriseUsers, setEnterpriseUsers] = useState("10")
  const [withNS, setWithNS] = useState(true)

  // Lead Capture Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPlan, setModalPlan] = useState({ name: "", price: "", cycle: "" })

  function openLeadModal(name: string, price: string, cycle: string) {
    setModalPlan({ name, price, cycle })
    setModalOpen(true)
  }

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

  const nsUsers = isSobConsulta ? 0 : parseInt(enterpriseUsers)
  const nsMonthlyAdd = nsUsers * NS_PRICE_MONTHLY
  const nsAnnualAdd = nsUsers * NS_PRICE_MONTHLY * (1 - NS_DISCOUNT)

  function addNS(base: string): string {
    if (!withNS || isSobConsulta) return base
    const baseNum = parseFloat(base.replace(/\./g, "").replace(",", "."))
    const add = isAnnual ? nsAnnualAdd : nsMonthlyAdd
    return formatBRL(baseNum + add)
  }

  function annualTotalWithNS(base: string): string {
    if (!withNS || isSobConsulta) return base
    const baseNum = parseFloat(base.replace(/\./g, "").replace(",", "."))
    return formatBRL(baseNum + nsAnnualAdd * 12)
  }

  const entPriceDisplay = addNS(isAnnual ? currentEnterprise.annual : currentEnterprise.month)
  const entAnnualTotal = annualTotalWithNS(currentEnterprise.annualTotal)

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
            Escolha o plano ideal para alavancar a produtividade da sua empresa.
          </p>

          {/* Toggle Mensal/Anual */}
          <div className="flex items-center justify-center mt-8 gap-3">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Mensal</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isAnnual
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 focus-visible:ring-amber-400 shadow-md shadow-amber-200/50'
                  : 'bg-blue-600 focus-visible:ring-blue-500'
              }`}
              role="switch"
              aria-checked={isAnnual}
              aria-label="Alternar entre plano mensal e anual"
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-amber-700' : 'text-slate-400'}`}>
              Anual <span className={`font-bold text-xs px-2 py-0.5 rounded-full ml-1 transition-all duration-300 ${isAnnual ? 'text-amber-700 bg-amber-100 border border-amber-200' : 'text-green-600 bg-green-100'}`}>Economize {savingsPercent}</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Plano Individual */}
          <div className={`rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all duration-500 relative group flex flex-col ${isAnnual ? "bg-amber-50/50 border-amber-300 shadow-amber-100/60" : "bg-white border-slate-200"}`}>
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

            <ul className="space-y-4 mb-8 flex-1">
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
                <span>Suporte via E-mail em Português</span>
              </li>
            </ul>

            <button
              onClick={() =>
                openLeadModal(
                  "Individual",
                  `R$ ${isAnnual ? individualAnnual : individualMonthly}/mês`,
                  isAnnual ? "Anual" : "Mensal"
                )
              }
              className={`block w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-500 text-center cursor-pointer mt-auto ${isAnnual ? "text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 hover:border-amber-400" : "text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/50 hover:border-blue-300"}`}
            >
              Assinar Individual
            </button>
          </div>

          {/* Plano Empresarial */}
          <div className={`rounded-2xl p-8 border-2 shadow-lg relative group flex flex-col transition-all duration-500 ${isAnnual ? "bg-amber-50/50 border-amber-400 shadow-amber-200/40" : "bg-white border-blue-600"}`}>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-500 ${isAnnual ? "bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md shadow-amber-200/50" : "bg-blue-600"}`}>
              <Sparkles className="w-3 h-3" />
              Recomendado
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Empresarial</h3>
              <p className="text-slate-500 text-sm">Escalável para Concessionárias, Terceirizadas e Empresas de Gestão.</p>
            </div>

            {/* Toggle Gestão de NS */}
            <div className={`flex items-center justify-between rounded-xl px-4 py-3 mb-4 transition-all duration-500 ${isAnnual ? "bg-amber-100/70 border border-amber-300/60" : "bg-indigo-50 border border-indigo-200/60"}`}>
              <div>
                <p className="text-sm font-semibold text-slate-800">+ Módulo Gestão de NS</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isSobConsulta
                    ? "Sob consulta"
                    : isAnnual
                    ? `+R$ ${formatBRL(nsAnnualAdd)}/mês por equipe (anual)`
                    : `+R$ ${formatBRL(nsMonthlyAdd)}/mês por equipe`}
                </p>
              </div>
              <button
                onClick={() => setWithNS(!withNS)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${withNS ? "bg-indigo-600" : "bg-slate-300"}`}
                role="switch"
                aria-checked={withNS}
                aria-label="Adicionar módulo Gestão de NS"
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${withNS ? "translate-x-8" : "translate-x-1"}`} />
              </button>
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
                Faturado R$ {entAnnualTotal} anualmente.
              </p>
            )}
            {(!isAnnual || isSobConsulta) && <div className="mb-6" />}

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-700">
                <Check className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${isAnnual ? "text-amber-500" : "text-blue-600"}`} />
                <span className="font-semibold">Painel de Gestão de Usuários</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${isAnnual ? "text-amber-500" : "text-blue-600"}`} />
                <span>Todos os módulos inclusos</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${isAnnual ? "text-amber-500" : "text-blue-600"}`} />
                <span>Relatórios consolidados da equipe</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${isAnnual ? "text-amber-500" : "text-blue-600"}`} />
                <span>API e NS Única Compartilhada</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <Check className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${isAnnual ? "text-amber-500" : "text-blue-600"}`} />
                <span>Suporte Prioritário (WhatsApp)</span>
              </li>
            </ul>

            <button
              onClick={() => {
                const planLabel = `Empresarial ${enterpriseUsers} usuários${withNS ? " + Gestão de NS" : ""}`
                const priceLabel = isSobConsulta
                  ? "Sob Consulta"
                  : `R$ ${entPriceDisplay}/mês`
                openLeadModal(
                  planLabel,
                  priceLabel,
                  isAnnual ? "Anual" : "Mensal"
                )
              }}
              className={`block w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-500 text-center text-white shadow-sm hover:shadow cursor-pointer mt-auto ${isAnnual ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-amber-200/50" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isSobConsulta ? "Falar com Consultor" : "Assinar Empresarial"}
            </button>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            ✅ Fácil adaptação à sua empresa · Plataforma flexível · Configure do seu jeito · Cresce junto com seu time
          </p>
        </div>

        {/* Lead Capture Modal */}
        <LeadCaptureModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          planName={modalPlan.name}
          planPrice={modalPlan.price}
          planCycle={modalPlan.cycle}
        />
      </div>
    </section>
  )
}

"use client"

import { Globe, FileText, Image as ImageIcon, ScanLine, ClipboardList, BookOpen } from "lucide-react"

const modules = [
  {
    icon: Globe,
    name: "🌲 Earth — Ambiental e Impedimentos",
    description: "Extrai coordenadas UTM de PDFs de projetos ambientais, marca no mapa e exporta KML. 60% mais rápido que o processo manual.",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    borderColor: "border-teal-200/60",
    tag: "Topografia"
  },
  {
    icon: ScanLine,
    name: "📊 Contagem de Croqui",
    description: "Carregue o PDF do croqui, clique nos postes e obtenha a contagem total automaticamente. Elimina recontagens manuais. Mais utilizado pelo levantamento de campo.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200/60",
    tag: "Quantitativo"
  },
  {
    icon: FileText,
    name: "🔢 Numeração de Postes",
    description: "Numere postes sequencialmente direto no PDF com um clique. Exporta planilha pronta para aprovação. Mais utilizado pelo projeto.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200/60",
    tag: "Projeto"
  },
  {
    icon: ImageIcon,
    name: "📸 Conversor de Fotos",
    description: "Arraste fotos de campo e gere relatórios PDF formatados em lote. Padrão de entrega da concessionária.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200/60",
    tag: "Relatórios"
  },
  {
    icon: ClipboardList,
    name: "📋 Gestão de NS",
    description: "Kanban especializado em engenharia elétrica. Acompanhe Notas de Serviço do recebimento à aprovação com status da concessionária.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200/60",
    tag: "Gestão"
  },
  {
    icon: BookOpen,
    name: "📓 Automação de Caderneta",
    description: "Monta e lança a caderneta topográfica automaticamente. Integra os dados de campo, gera a caderneta completa e efetua o lançamento sem intervenção manual.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    borderColor: "border-violet-200/60",
    tag: "Topografia"
  }
]

export function ModulesSection() {
  return (
    <section id="modulos" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Módulos da Plataforma
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Cada módulo resolve um gargalo real do dia a dia da engenharia de redes elétricas.
          </p>
        </div>

        {/* Grid: 3 colunas no desktop, 2 no tablet, 1 no mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-7 border ${module.borderColor} shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden`}
            >
              {/* Tag */}
              <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider ${module.iconColor} ${module.color} px-2 py-0.5 rounded-full`}>
                {module.tag}
              </span>

              <div className="flex flex-col">
                <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <module.icon className={`w-7 h-7 ${module.iconColor}`} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                  {module.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de preço */}
        <div className="text-center mt-10">
          <p className="text-sm text-slate-500">
            Módulos de automação inclusos em qualquer plano · Gestão de NS disponível como add-on no Empresarial · <a href="#pricing" className="text-blue-600 font-medium hover:underline">Ver preços →</a>
          </p>
        </div>
      </div>
    </section>
  )
}

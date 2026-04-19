"use client"

import { useState } from "react"
import { Globe, FileText, Image as ImageIcon, ScanLine, ClipboardList, BookOpen, Play, X } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"

const modules = [
  {
    icon: Globe,
    name: "🌲 Earth — Ambiental e Impedimentos",
    description: "Extrai coordenadas UTM de PDFs de projetos ambientais, marca no mapa e exporta KML. 60% mais rápido que o processo manual.",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    borderColor: "border-teal-200/60",
    previewColor: "from-teal-400 to-teal-600",
    previewLabel: "Earth — Mapa + KML",
    tag: "Topografia",
    videoUrl: "https://res.cloudinary.com/djhrj6zy1/video/upload/v1776626520/demo_ambiental_a2qjaz.mp4"
  },
  {
    icon: ScanLine,
    name: "📊 Contagem de Croqui",
    description: "Carregue o PDF do croqui, clique nos postes e obtenha a contagem total automaticamente. Elimina recontagens manuais. Mais utilizado pelo levantamento de campo.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200/60",
    previewColor: "from-amber-400 to-amber-600",
    previewLabel: "Contagem em PDF",
    tag: "Quantitativo",
    videoUrl: "https://res.cloudinary.com/djhrj6zy1/video/upload/v1776627951/demo_contagem_croqui_yu43lp.mp4"
  },
  {
    icon: FileText,
    name: "🔢 Numeração de Postes",
    description: "Numere postes sequencialmente direto no PDF com um clique. Exporta planilha pronta para aprovação. Mais utilizado pelo projeto.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200/60",
    previewColor: "from-blue-400 to-blue-600",
    previewLabel: "Numeração Automática",
    tag: "Projeto"
  },
  {
    icon: ImageIcon,
    name: "📸 Conversor de Fotos",
    description: "Arraste fotos de campo e gere relatórios PDF formatados em lote. Padrão de entrega da concessionária.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200/60",
    previewColor: "from-green-400 to-green-600",
    previewLabel: "Relatório de Fotos",
    tag: "Relatórios",
    videoUrl: "https://res.cloudinary.com/djhrj6zy1/video/upload/v1776621201/demo_conversao_imagens_cmio60.mp4"
  },
  {
    icon: ClipboardList,
    name: "📋 Gestão de NS",
    description: "Kanban especializado em engenharia elétrica. Acompanhe Notas de Serviço do recebimento à aprovação com status da concessionária.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200/60",
    previewColor: "from-indigo-400 to-indigo-600",
    previewLabel: "Kanban de NS",
    tag: "Gestão",
    videoUrl: "https://res.cloudinary.com/djhrj6zy1/video/upload/v1776627718/demo_gestao_bb1oai.mp4"
  },
  {
    icon: BookOpen,
    name: "📓 Automação de Caderneta",
    description: "Monta e lança a caderneta topográfica automaticamente. Integra os dados de campo, gera a caderneta completa e efetua o lançamento sem intervenção manual.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    borderColor: "border-violet-200/60",
    previewColor: "from-violet-400 to-violet-600",
    previewLabel: "Caderneta Automática",
    tag: "Topografia",
    videoUrl: "https://res.cloudinary.com/djhrj6zy1/video/upload/v1776624416/demo_prordr_lrk69o.mp4"
  }
]

export function ModulesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <AnimateIn key={index} delay={index * 80}>
              <div
                className="relative h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card principal */}
                <div
                  className={`bg-white rounded-2xl p-7 border ${module.borderColor} shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden h-full`}
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

                    {/* Hint de preview */}
                    <div className={`mt-4 flex items-center gap-1.5 text-xs font-medium transition-opacity duration-200 ${hoveredIndex === index ? "opacity-0" : "opacity-60"} ${module.iconColor}`}>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Passe o mouse para ver demo</span>
                    </div>
                  </div>
                </div>

                {/* Preview de vídeo — aparece no hover */}
                <div
                  className={`absolute -top-2 z-50 w-[420px] transition-all duration-300 pointer-events-none ${
                    index % 3 === 0 ? "left-2" :
                    index % 3 === 2 ? "right-2" :
                    "left-1/2 -translate-x-1/2"
                  } ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-[calc(-100%-8px)] scale-100"
                      : "opacity-0 translate-y-[calc(-100%+8px)] scale-95"
                  }`}
                >
                  {/* Seta apontando para baixo */}
                  <div className="flex justify-center mb-0">
                    <div className="w-3 h-3 bg-slate-900 rotate-45 translate-y-1.5 rounded-sm" />
                  </div>

                  {/* Caixa do preview */}
                  <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/40 border border-slate-700/50">
                    {/* Área do vídeo */}
                    <div className={`relative w-full aspect-video bg-gradient-to-br ${module.previewColor} flex items-center justify-center overflow-hidden`}>
                      {module.videoUrl ? (
                        <video
                          src={module.videoUrl}
                          className="absolute inset-0 w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <>
                          {/* Simulação de interface do produto */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="h-6 bg-white/30 mx-3 mt-3 rounded" />
                            <div className="flex gap-1.5 mx-3 mt-2">
                              <div className="h-16 flex-1 bg-white/20 rounded" />
                              <div className="h-16 flex-1 bg-white/20 rounded" />
                              <div className="h-16 flex-1 bg-white/20 rounded" />
                            </div>
                            <div className="h-4 bg-white/20 mx-3 mt-2 rounded w-2/3" />
                            <div className="h-4 bg-white/20 mx-3 mt-1.5 rounded w-1/2" />
                          </div>
                          <div className="relative w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                          </div>
                          <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Em breve
                          </div>
                        </>
                      )}
                    </div>

                    {/* Rodapé da caixa */}
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-white text-xs font-bold">{module.previewLabel}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">Demo • ~30 segundos</p>
                      </div>
                      <div className={`w-7 h-7 rounded-lg ${module.color} flex items-center justify-center`}>
                        <module.icon className={`w-4 h-4 ${module.iconColor}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
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

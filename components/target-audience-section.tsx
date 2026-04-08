import { Building2, Lightbulb, Factory, LayoutDashboard } from "lucide-react"

const audiences = [
  {
    icon: Building2,
    title: "Empresas Terceirizadas",
    description: "Terceirizadas da Concessionária de Energia que executam projetos de redes",
    color: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Lightbulb,
    title: "Empresas de Projeto",
    description: "Escritórios especializados em projetos elétricos e topografia",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Factory,
    title: "Concessionárias de Energia",
    description: "Distribuidoras que buscam otimizar processos internos",
    color: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: LayoutDashboard,
    title: "Empresas de Gestão de Projetos",
    description: "Gerencie projetos com Kanban integrado a aplicativos de mensagem. Gráfico de Gantt em breve.",
    color: "bg-violet-50",
    iconColor: "text-violet-600"
  }
]

export function TargetAudienceSection() {
  return (
    <section id="para-quem" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Para Quem É a SUP-IA?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Desenvolvido para profissionais e empresas de gestão e do setor elétrico
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 ${audience.color} rounded-xl flex items-center justify-center mb-6`}>
                <audience.icon className={`w-7 h-7 ${audience.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {audience.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Cloud, Shield, Download, Link, Database, Globe } from "lucide-react"

const features = [
  {
    icon: Cloud,
    title: "100% Online",
    description: "Acesse de qualquer lugar, a qualquer momento. Basta um navegador.",
    color: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Segurança de Dados",
    description: "Seus projetos protegidos com criptografia de ponta a ponta.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Download,
    title: "Sem Instalação",
    description: "Não precisa baixar nem instalar nada. Comece a usar imediatamente.",
    color: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    icon: Link,
    title: "Integração Total",
    description: "Módulos integrados para seu projeto.",
    color: "bg-violet-50",
    iconColor: "text-violet-600"
  },
  {
    icon: Database,
    title: "Histórico em Nuvem",
    description: "Todos os seus projetos salvos e organizados na nuvem.",
    color: "bg-rose-50",
    iconColor: "text-rose-600"
  },
  {
    icon: Globe,
    title: "Interface PT-BR",
    description: "Interface 100% em português com suporte brasileiro dedicado.",
    color: "bg-cyan-50",
    iconColor: "text-cyan-600"
  }
]

export function FeaturesSection() {
  return (
    <section id="diferenciais" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <span className="text-sm font-medium text-emerald-700">
              Diferenciais
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Por Que Escolher a SUP-IA?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Uma plataforma completa pensada para simplificar sua rotina e aumentar sua produtividade
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md hover:border-slate-300/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

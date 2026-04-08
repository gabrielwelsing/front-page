import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">

          {/* Logo em destaque */}
          <div className="flex justify-center mb-10">
            <Image
              src="/logo-supia-crop.png"
              alt="SUP-IA"
              width={320}
              height={120}
              style={{ width: 'auto', height: '120px' }}
              priority
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-blue-700">
              Plataforma 100% Online
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 text-balance">
            Inteligência Artificial Aumentando <span className="text-primary">Sua Produtividade</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            Inteligência Aliada à Energia. Automação 100% online para projetos de redes elétricas de média e baixa tensão. Ferramentas que apoiam a gestão e facilitam a produtividade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-blue-600 text-white px-8 py-6 text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              asChild
            >
              <a href="#modulos">
                Conhecer Módulos
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base rounded-xl border-slate-300 hover:bg-slate-50 text-slate-700"
              asChild
            >
              <a href="mailto:adm@sup-ia.com?subject=Agendar%20Teste%20SUP-IA" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                Agendar Teste
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>100% Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Interface em PT-BR</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span>Dados em Nuvem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Orbs decorativos de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-16 left-1/4 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl animate-float-slow" />
        <div className="absolute top-32 right-1/4 w-56 h-56 rounded-full bg-teal-400/10 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 left-1/2 w-96 h-40 rounded-full bg-indigo-300/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">

          {/* Logo em destaque — entrada imediata */}
          <div
            className="flex justify-center mb-10 opacity-0 translate-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.05s_forwards]"
            style={{ animation: "fadeSlideUp 0.6s ease-out 0.05s forwards" }}
          >
            <Image
              src="/logo-supia-crop.png"
              alt="SUP-IA"
              width={320}
              height={120}
              style={{ width: "auto", height: "180px" }}
              priority
            />
          </div>

          {/* Badge com ponto pulsante + foguete animado */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 opacity-0"
            style={{ animation: "fadeSlideUp 0.6s ease-out 0.15s forwards" }}
          >
            {/* Ponto ao vivo */}
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm font-medium text-blue-700">
              Plataforma 100% Online
            </span>
            {/* Foguete animado */}
            <span className="animate-float text-base select-none" aria-hidden>🚀</span>
          </div>

          {/* H1 */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 text-balance opacity-0"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.25s forwards" }}
          >
            Inteligência Artificial Aumentando{" "}
            <span className="text-primary">Sua Produtividade</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty opacity-0"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.35s forwards" }}
          >
            Inteligência Aliada à Energia. Automação 100% online para projetos
            de redes elétricas de média e baixa tensão. Ferramentas que apoiam a
            gestão e facilitam a produtividade.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.45s forwards" }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-blue-600 text-white px-8 py-6 text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
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
              className="px-8 py-6 text-base rounded-xl border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 hover:-translate-y-0.5 transition-all"
              asChild
            >
              <a
                href="mailto:adm@sup-ia.com?subject=Agendar%20Teste%20SUP-IA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="w-4 h-4 mr-2" />
                Agendar Teste
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-16 pt-10 border-t border-slate-200 opacity-0"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.58s forwards" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>100% Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Interface em PT-BR</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Dados em Nuvem</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-700">Melhore 10–35% sua produtividade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe local (evita dependência extra) */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  )
}

"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Send, ArrowRight, ArrowLeft } from "lucide-react"

interface LeadCaptureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  planPrice: string
  planCycle: string
}

// ── Mask helpers ──────────────────────────────────────────────────────────────

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

function maskCNPJ(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 14)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length <= 12)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

function maskCEP(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

// ── Validation helpers ────────────────────────────────────────────────────────

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10
}

function isValidCPF(value: string): boolean {
  return value.replace(/\D/g, "").length === 11
}

function isValidCNPJ(value: string): boolean {
  return value.replace(/\D/g, "").length === 14
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidCEP(value: string): boolean {
  return value.replace(/\D/g, "").length === 8
}

// ── Greeting helper ───────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "Bom dia"
  if (hour >= 12 && hour < 18) return "Boa tarde"
  return "Boa noite"
}

// ── UF options ────────────────────────────────────────────────────────────────

const UF_OPTIONS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
]

// ── Component ─────────────────────────────────────────────────────────────────

export function LeadCaptureModal({
  open,
  onOpenChange,
  planName,
  planPrice,
  planCycle,
}: LeadCaptureModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Step 1: Contact data
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  // Step 2: NF data
  const [tipoPessoa, setTipoPessoa] = useState<"pj" | "pf">("pj")
  const [razaoSocial, setRazaoSocial] = useState("")
  const [documento, setDocumento] = useState("")
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")

  const [enviando, setEnviando] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const resetForm = useCallback(() => {
    setStep(1)
    setNome("")
    setEmail("")
    setWhatsapp("")
    setTipoPessoa("pj")
    setRazaoSocial("")
    setDocumento("")
    setCep("")
    setRua("")
    setNumero("")
    setComplemento("")
    setBairro("")
    setCidade("")
    setUf("")
    setErrors({})
    setEnviando(false)
  }, [])

  function handleOpenChange(value: boolean) {
    if (!value) resetForm()
    onOpenChange(value)
  }

  // Reset document when switching type
  function handleTipoPessoaChange(tipo: "pj" | "pf") {
    setTipoPessoa(tipo)
    setDocumento("")
    setRazaoSocial("")
    setErrors({})
  }

  // ── Step 1 validation ───────────────────────────────────────────────────

  function validateStep1(): boolean {
    const newErrors: Record<string, string> = {}
    if (!nome.trim()) newErrors.nome = "Informe seu nome"
    if (!email.trim() || !isValidEmail(email))
      newErrors.email = "Informe um e-mail válido"
    if (!isValidPhone(whatsapp))
      newErrors.whatsapp = "Informe um WhatsApp válido"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNextStep() {
    if (!validateStep1()) return
    setErrors({})
    setStep(2)
  }

  // ── Step 2 validation ───────────────────────────────────────────────────

  function validateStep2(): boolean {
    const newErrors: Record<string, string> = {}

    if (tipoPessoa === "pj") {
      if (!razaoSocial.trim()) newErrors.razaoSocial = "Informe a Razão Social"
      if (!isValidCNPJ(documento)) newErrors.documento = "Informe um CNPJ válido"
    } else {
      if (!razaoSocial.trim()) newErrors.razaoSocial = "Informe seu nome completo"
      if (!isValidCPF(documento)) newErrors.documento = "Informe um CPF válido"
    }

    if (!isValidCEP(cep)) newErrors.cep = "Informe um CEP válido"
    if (!rua.trim()) newErrors.rua = "Informe a rua"
    if (!numero.trim()) newErrors.numero = "Informe o número"
    if (!bairro.trim()) newErrors.bairro = "Informe o bairro"
    if (!cidade.trim()) newErrors.cidade = "Informe a cidade"
    if (!uf) newErrors.uf = "Selecione o estado"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Submit ──────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateStep2()) return

    setEnviando(true)

    const greeting = getGreeting()
    const endereco = `${rua}, ${numero}${complemento ? ` - ${complemento}` : ""}, ${bairro}, ${cidade}/${uf} — CEP ${cep}`
    const docLabel = tipoPessoa === "pj" ? "CNPJ" : "CPF"
    const nomeLabel = tipoPessoa === "pj" ? "Razão Social" : "Nome Completo (NF)"

    const subject = encodeURIComponent(
      `Nova Solicitação de Assinatura — ${planName} (${planCycle})`
    )
    const body = encodeURIComponent(
      [
        `${greeting}, ${nome.trim().split(" ")[0]}!`,
        ``,
        `Recebemos sua solicitação de assinatura da plataforma SUP-IA.`,
        `Enviaremos o contrato para avaliação e assinatura assim que possível.`,
        ``,
        `Seguem os dados informados:`,
        ``,
        `══════════════════════════════════════`,
        `  DADOS DE CONTATO`,
        `══════════════════════════════════════`,
        `Nome: ${nome.trim()}`,
        `E-mail: ${email.trim()}`,
        `WhatsApp: ${whatsapp}`,
        ``,
        `══════════════════════════════════════`,
        `  DADOS PARA NOTA FISCAL`,
        `══════════════════════════════════════`,
        `Tipo: Pessoa ${tipoPessoa === "pj" ? "Jurídica" : "Física"}`,
        `${nomeLabel}: ${razaoSocial.trim()}`,
        `${docLabel}: ${documento}`,
        `Endereço: ${endereco}`,
        ``,
        `══════════════════════════════════════`,
        `  PLANO SOLICITADO`,
        `══════════════════════════════════════`,
        `Plano: ${planName}`,
        `Ciclo: ${planCycle}`,
        `Valor: ${planPrice}`,
        ``,
        `---`,
        `Nossa equipe entrará em contato via WhatsApp e e-mail`,
        `antes de proceder com qualquer pagamento.`,
        ``,
        `Enviado automaticamente pela Landing Page SUP-IA`,
      ].join("\n")
    )

    window.open(
      `mailto:adm@sup-ia.com?subject=${subject}&body=${body}`,
      "_self"
    )

    setTimeout(() => {
      setEnviando(false)
      setStep(3)
    }, 600)
  }

  const planDisplay = `${planName} — ${planCycle}`

  // ── CEP auto-fill via ViaCEP ────────────────────────────────────────────

  async function handleCepBlur() {
    const digits = cep.replace(/\D/g, "")
    if (digits.length !== 8) return
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()
      if (data.erro) return
      if (data.logradouro) setRua(data.logradouro)
      if (data.bairro) setBairro(data.bairro)
      if (data.localidade) setCidade(data.localidade)
      if (data.uf) setUf(data.uf)
    } catch {
      // silent fail — user can fill manually
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* ── Step 3: Success ── */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Solicitação recebida!
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                Enviaremos o <strong className="text-slate-700">contrato para avaliação e assinatura</strong> assim
                que possível. Nossa equipe entrará em contato via{" "}
                <strong className="text-slate-700">WhatsApp</strong> e{" "}
                <strong className="text-slate-700">e-mail</strong> antes de
                proceder com qualquer pagamento.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg px-4 py-3 w-full">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-1">
                Plano Solicitado
              </p>
              <p className="text-sm font-medium text-slate-700">
                {planDisplay}
              </p>
              <p className="text-sm font-bold text-blue-600">{planPrice}</p>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              className="w-full mt-2"
            >
              Fechar
            </Button>
          </div>
        )}

        {/* ── Step 1: Contact Data ── */}
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                Solicitar Assinatura
              </DialogTitle>
              <DialogDescription>
                Informe seus dados de contato para iniciar a assinatura do plano{" "}
                <strong className="text-slate-700">{planName}</strong>.
              </DialogDescription>
            </DialogHeader>

            {/* Plan badge */}
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
              <div>
                <p className="text-xs text-blue-500 uppercase font-semibold tracking-wider">
                  Plano Selecionado
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {planDisplay}
                </p>
              </div>
              <p className="text-lg font-extrabold text-blue-600">
                {planPrice}
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-blue-600" />
              <div className="flex-1 h-1.5 rounded-full bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium ml-1">
                1 de 2
              </span>
            </div>

            <div className="space-y-4">
              {/* Nome */}
              <div className="space-y-1.5">
                <Label htmlFor="lead-nome">Nome Completo</Label>
                <Input
                  id="lead-nome"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  aria-invalid={!!errors.nome}
                />
                {errors.nome && (
                  <p className="text-xs text-red-500">{errors.nome}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="lead-email">E-mail</Label>
                <Input
                  id="lead-email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5">
                <Label htmlFor="lead-whatsapp">WhatsApp</Label>
                <Input
                  id="lead-whatsapp"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                  aria-invalid={!!errors.whatsapp}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-red-500">{errors.whatsapp}</p>
                )}
              </div>

              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full py-5 text-base font-bold"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </Button>

              <p className="text-xs text-center text-slate-400">
                Nenhum pagamento será processado agora. Entraremos em contato
                antes.
              </p>
            </div>
          </>
        )}

        {/* ── Step 2: NF Data ── */}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                Dados para Nota Fiscal
              </DialogTitle>
              <DialogDescription>
                Precisamos dessas informações para emissão da NF. Nenhum
                pagamento será processado agora.
              </DialogDescription>
            </DialogHeader>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-blue-600" />
              <div className="flex-1 h-1.5 rounded-full bg-blue-600" />
              <span className="text-xs text-slate-400 font-medium ml-1">
                2 de 2
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* PJ / PF Toggle */}
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleTipoPessoaChange("pj")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                    tipoPessoa === "pj"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Pessoa Jurídica (CNPJ)
                </button>
                <button
                  type="button"
                  onClick={() => handleTipoPessoaChange("pf")}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                    tipoPessoa === "pf"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Pessoa Física (CPF)
                </button>
              </div>

              {/* Razão Social / Nome Completo */}
              <div className="space-y-1.5">
                <Label htmlFor="lead-razao">
                  {tipoPessoa === "pj" ? "Razão Social" : "Nome Completo"}
                </Label>
                <Input
                  id="lead-razao"
                  placeholder={
                    tipoPessoa === "pj"
                      ? "Nome registrado da empresa"
                      : "Seu nome completo conforme documento"
                  }
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  aria-invalid={!!errors.razaoSocial}
                />
                {errors.razaoSocial && (
                  <p className="text-xs text-red-500">{errors.razaoSocial}</p>
                )}
              </div>

              {/* CNPJ or CPF */}
              <div className="space-y-1.5">
                <Label htmlFor="lead-documento">
                  {tipoPessoa === "pj" ? "CNPJ" : "CPF"}
                </Label>
                <Input
                  id="lead-documento"
                  placeholder={
                    tipoPessoa === "pj"
                      ? "00.000.000/0000-00"
                      : "000.000.000-00"
                  }
                  value={documento}
                  onChange={(e) =>
                    setDocumento(
                      tipoPessoa === "pj"
                        ? maskCNPJ(e.target.value)
                        : maskCPF(e.target.value)
                    )
                  }
                  aria-invalid={!!errors.documento}
                />
                {errors.documento && (
                  <p className="text-xs text-red-500">{errors.documento}</p>
                )}
              </div>

              {/* CEP + UF */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-cep">CEP</Label>
                  <Input
                    id="lead-cep"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(maskCEP(e.target.value))}
                    onBlur={handleCepBlur}
                    aria-invalid={!!errors.cep}
                  />
                  {errors.cep && (
                    <p className="text-xs text-red-500">{errors.cep}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-uf">Estado</Label>
                  <select
                    id="lead-uf"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    aria-invalid={!!errors.uf}
                  >
                    <option value="">UF</option>
                    {UF_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.uf && (
                    <p className="text-xs text-red-500">{errors.uf}</p>
                  )}
                </div>
              </div>

              {/* Rua + Número */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="lead-rua">Rua</Label>
                  <Input
                    id="lead-rua"
                    placeholder="Logradouro"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    aria-invalid={!!errors.rua}
                  />
                  {errors.rua && (
                    <p className="text-xs text-red-500">{errors.rua}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-numero">Nº</Label>
                  <Input
                    id="lead-numero"
                    placeholder="Nº"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    aria-invalid={!!errors.numero}
                  />
                  {errors.numero && (
                    <p className="text-xs text-red-500">{errors.numero}</p>
                  )}
                </div>
              </div>

              {/* Complemento + Bairro */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-complemento">
                    Complemento{" "}
                    <span className="text-slate-400 font-normal">
                      (opcional)
                    </span>
                  </Label>
                  <Input
                    id="lead-complemento"
                    placeholder="Sala, Andar..."
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-bairro">Bairro</Label>
                  <Input
                    id="lead-bairro"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    aria-invalid={!!errors.bairro}
                  />
                  {errors.bairro && (
                    <p className="text-xs text-red-500">{errors.bairro}</p>
                  )}
                </div>
              </div>

              {/* Cidade */}
              <div className="space-y-1.5">
                <Label htmlFor="lead-cidade">Cidade</Label>
                <Input
                  id="lead-cidade"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  aria-invalid={!!errors.cidade}
                />
                {errors.cidade && (
                  <p className="text-xs text-red-500">{errors.cidade}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setErrors({})
                    setStep(1)
                  }}
                  className="py-5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-5 text-base font-bold"
                  disabled={enviando}
                >
                  {enviando ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Solicitação
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-slate-400">
                Nenhum pagamento será processado agora. Entraremos em contato
                via WhatsApp e e-mail antes de qualquer cobrança. Ao enviar,
                você concorda com nossos{" "}
                <a
                  href="/termos"
                  className="underline hover:text-slate-600"
                >
                  Termos de Uso
                </a>
                .
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

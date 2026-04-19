import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const {
      nome,
      email,
      whatsapp,
      tipoPessoa,
      razaoSocial,
      documento,
      endereco,
      plano,
      ciclo,
      valor,
    } = body

    const nomeNF = tipoPessoa === "pj" ? razaoSocial : nome
    const docLabel = tipoPessoa === "pj" ? "CNPJ" : "CPF"
    const nomeLabel = tipoPessoa === "pj" ? "Razão Social" : "Nome (NF)"

    const { error } = await resend.emails.send({
      from: "SUP-IA Landing <onboarding@resend.dev>",
      to: ["adm@sup-ia.com"],
      replyTo: email,
      subject: `Nova Solicitação de Assinatura — ${plano} (${ciclo})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
          <div style="background: #3b82f6; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nova Solicitação de Assinatura</h1>
            <p style="color: #bfdbfe; margin: 4px 0 0; font-size: 14px;">${plano} — ${ciclo}</p>
          </div>

          <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td colspan="2" style="padding: 8px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 2px solid #e2e8f0;">DADOS DE CONTATO</td></tr>
              <tr><td style="padding: 10px 0 4px; font-size: 13px; color: #64748b; width: 140px;">Nome</td><td style="padding: 10px 0 4px; font-size: 14px; font-weight: 600;">${nome}</td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">E-mail</td><td style="padding: 4px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">WhatsApp</td><td style="padding: 4px 0; font-size: 14px;"><a href="https://wa.me/55${whatsapp.replace(/\D/g, '')}" style="color: #22c55e;">${whatsapp}</a></td></tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td colspan="2" style="padding: 8px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 2px solid #e2e8f0;">DADOS PARA NOTA FISCAL</td></tr>
              <tr><td style="padding: 10px 0 4px; font-size: 13px; color: #64748b; width: 140px;">Tipo</td><td style="padding: 10px 0 4px; font-size: 14px; font-weight: 600;">Pessoa ${tipoPessoa === "pj" ? "Jurídica" : "Física"}</td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">${nomeLabel}</td><td style="padding: 4px 0; font-size: 14px;">${nomeNF}</td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">${docLabel}</td><td style="padding: 4px 0; font-size: 14px;">${documento}</td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">Endereço</td><td style="padding: 4px 0; font-size: 14px;">${endereco}</td></tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr><td colspan="2" style="padding: 8px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 2px solid #e2e8f0;">PLANO SOLICITADO</td></tr>
              <tr><td style="padding: 10px 0 4px; font-size: 13px; color: #64748b; width: 140px;">Plano</td><td style="padding: 10px 0 4px; font-size: 14px; font-weight: 700; color: #3b82f6;">${plano}</td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">Ciclo</td><td style="padding: 4px 0; font-size: 14px;">${ciclo}</td></tr>
              <tr><td style="padding: 4px 0; font-size: 13px; color: #64748b;">Valor</td><td style="padding: 4px 0; font-size: 14px; font-weight: 700;">${valor}</td></tr>
            </table>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; font-size: 13px; color: #1e40af;">
              💡 Responda diretamente neste e-mail ou entre em contato via WhatsApp: <a href="https://wa.me/55${whatsapp.replace(/\D/g, '')}" style="color: #1e40af; font-weight: 600;">${whatsapp}</a>
            </div>

            <p style="margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center;">
              Enviado automaticamente pela Landing Page SUP-IA · sup-ia.com
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Falha ao enviar e-mail" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("send-email error:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

// ── Config ────────────────────────────────────────────────────────────────────

const CONTRATADA = {
  nome: "SUP-IA",
  razao: "YURI FERNANDES DE OLIVEIRA CONSULTORIA EM TECNOLOGIA DA INFORMAÇÃO LTDA",
  cnpj: "66.111.383/0001-83",
  endereco:
    "Rua Rio Grande do Norte, nº 1435, Sala 708, bairro Savassi, Belo Horizonte - MG, CEP 30.130-138",
  pix_cnpj: "66.111.383/0001-83",
  banco: "077 (Banco Inter)",
  agencia: "0001",
  conta: "0526200251",
  favorecido:
    "Yuri Fernandes de Oliveira Consultoria em Tecnologia da Informacao Ltda.",
}

const MESES = [
  "",
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

function dataPorExtenso(): string {
  const now = new Date()
  return `Belo Horizonte - MG, ${String(now.getDate()).padStart(2, "0")} de ${MESES[now.getMonth() + 1]} de ${now.getFullYear()}.`
}

function numPorExtenso(n: number): string {
  const map: Record<number, string> = {
    1: "um",
    2: "dois",
    3: "três",
    5: "cinco",
    10: "dez",
    15: "quinze",
    20: "vinte",
    25: "vinte e cinco",
    30: "trinta",
    40: "quarenta",
    50: "cinquenta",
    60: "sessenta",
    100: "cem",
  }
  return map[n] || String(n)
}

// ── API Route ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      tipoPessoa,
      razaoSocial,
      documento,
      endereco,
      telefone,
      plano,
      ciclo,
      valor,
      modulos = "Gestão de NS, Numerar Poste, Integração Google Earth, Conversor de Imagens, Contagem de Postes",
      numUsuarios = 1,
    } = body

    const docLabel = tipoPessoa === "pj" ? "CNPJ" : "CPF"
    const tipoLabel =
      tipoPessoa === "pj"
        ? "pessoa jurídica de direito privado"
        : "pessoa física"

    const modulosList = modulos
      .split(",")
      .map((m: string, i: number) => `   ${String.fromCharCode(97 + i)}) ${m.trim()}`)
      .join("\n")

    const cicloTexto =
      ciclo === "Mensal"
        ? "mensalmente, com vencimento no dia 15 de cada mês"
        : "anualmente, em parcela única ou conforme acordado entre as partes"

    // Build the contract text
    const sections = [
      {
        text: "CONTRATO DE LICENCIAMENTO DE SOFTWARE\nE PRESTAÇÃO DE SERVIÇOS",
        isTitle: true,
      },
      {
        text: `Pelo presente instrumento particular, as partes abaixo qualificadas celebram entre si este Contrato de Licenciamento de Uso de Software, que se regerá pelas seguintes cláusulas e condições:`,
      },
      { text: "CONTRATADA:", isHeading: true },
      {
        text: `${CONTRATADA.nome} (nome empresarial: ${CONTRATADA.razao}), pessoa jurídica de direito privado, inscrita no CNPJ sob o nº ${CONTRATADA.cnpj}, com sede na ${CONTRATADA.endereco}, neste ato representada na forma de seu Contrato Social.`,
      },
      { text: "CONTRATANTE:", isHeading: true },
      {
        text: `${razaoSocial.toUpperCase()}, ${tipoLabel}, inscrita no ${docLabel} sob o nº ${documento}, com sede em ${endereco}, telefone: ${telefone}, neste ato representada por seu representante legal.`,
      },
      { text: "CLÁUSULA PRIMEIRA — DO OBJETO", isHeading: true },
      {
        text: `O presente contrato tem como objeto a concessão de licença de uso temporária, não exclusiva e intransferível, da plataforma de software denominada "Workspace", desenvolvida e hospedada pela SUP-IA.`,
      },
      {
        text: `Parágrafo único: A licença contratada contempla exclusivamente o acesso e uso dos seguintes módulos do sistema:\n${modulosList}`,
      },
      {
        text: "CLÁUSULA SEGUNDA — DOS VALORES E CONDIÇÕES DE PAGAMENTO",
        isHeading: true,
      },
      {
        text: `Pela licença de uso e serviços de suporte atrelados aos módulos descritos na Cláusula Primeira, a CONTRATANTE pagará à SUP-IA o valor ${ciclo.toLowerCase()} de ${valor}, conforme o plano "${plano} (${ciclo})" vigente à data de assinatura deste instrumento.`,
      },
      {
        text: `Parágrafo Primeiro: Os pagamentos deverão ser realizados ${cicloTexto}.`,
      },
      {
        text: `Parágrafo Terceiro: Os pagamentos deverão ser efetuados via PIX ou transferência bancária conforme os dados abaixo:\n\n   Chave PIX (CNPJ): ${CONTRATADA.pix_cnpj}\n   Banco: ${CONTRATADA.banco}\n   Agência: ${CONTRATADA.agencia}\n   Conta Corrente: ${CONTRATADA.conta}\n   Favorecido: ${CONTRATADA.favorecido}`,
      },
      { text: "CLÁUSULA TERCEIRA — DA VIGÊNCIA", isHeading: true },
      {
        text: `Este contrato entra em vigor na data de sua assinatura e terá validade de 12 (doze) meses, podendo ser renovado automaticamente por iguais períodos, caso não haja manifestação em contrário de nenhuma das partes com antecedência mínima de 30 (trinta) dias do vencimento.`,
      },
      {
        text: "CLÁUSULA QUARTA — DO SUPORTE E ASSISTÊNCIA BÁSICA (SLA)",
        isHeading: true,
      },
      {
        text: `A SUP-IA compromete-se a fornecer assistência técnica básica para a correção de falhas e esclarecimento de dúvidas relacionadas ao uso dos módulos contratados.`,
      },
      {
        text: `Parágrafo Primeiro: O suporte será prestado de segunda a sexta-feira, em horário comercial (das 09h às 18h), através de e-mail ou sistema interno de chamados.`,
      },
      {
        text: `Parágrafo Segundo: A SUP-IA garantirá uma disponibilidade (uptime) da plataforma de 99% ao mês. Manutenções programadas deverão ser comunicadas com 48 horas de antecedência.`,
      },
      {
        text: "CLÁUSULA QUINTA — DAS OBRIGAÇÕES DA CONTRATADA",
        isHeading: true,
      },
      {
        text: `Além de conceder a licença de uso e o suporte previstos, cabe à SUP-IA:\n\n   I - Manter o sigilo e a segurança dos dados inseridos pela CONTRATANTE na plataforma.\n   II - Realizar rotinas de backup das informações alocadas nos servidores.\n   III - Corrigir eventuais falhas de programação que impeçam o uso regular da plataforma no menor tempo hábil possível.`,
      },
      {
        text: "CLÁUSULA SEXTA — DAS OBRIGAÇÕES DA CONTRATANTE",
        isHeading: true,
      },
      {
        text: `É de inteira responsabilidade da CONTRATANTE:\n\n   I - Efetuar o pagamento das mensalidades nas datas aprazadas.\n   II - Fornecer os dados técnicos e as informações necessárias para a correta utilização dos módulos operacionais.\n   III - Não ceder, sublicenciar, vender, dar em locação ou garantia, nem tentar fazer engenharia reversa de qualquer parte da plataforma fornecida pela SUP-IA.`,
      },
      {
        text: "CLÁUSULA SÉTIMA — DA PROPRIEDADE INTELECTUAL",
        isHeading: true,
      },
      {
        text: `Todos os direitos autorais, códigos-fonte e marcas associadas ao "Workspace" são de propriedade exclusiva e inalienável da SUP-IA. O presente contrato concede apenas o direito de uso, não implicando na transferência de titularidade.`,
      },
      { text: "CLÁUSULA OITAVA — DAS NOTAS FISCAIS", isHeading: true },
      {
        text: `A SUP-IA obriga-se a emitir Nota Fiscal de Serviços Eletrônica (NFS-e) referente à competência do mês vigente antes do recebimento de cada parcela mensal, observadas as seguintes condições:\n\n   I - A Nota Fiscal deverá ser emitida até o dia 10 (dez) de cada mês, antecedendo o vencimento do pagamento previsto para o dia 15, conforme Cláusula Segunda.\n   II - O documento fiscal deverá discriminar os serviços prestados de forma clara, indicando os módulos licenciados e o período de competência a que se refere.\n   III - A Nota Fiscal deverá ser emitida em conformidade com a legislação municipal vigente do domicílio fiscal da CONTRATADA, com destaque do ISS (Imposto Sobre Serviços) quando aplicável.\n   IV - O envio da Nota Fiscal deverá ser realizado por e-mail ou por meio do sistema interno de comunicação da plataforma, sendo condição necessária para que a CONTRATANTE efetue o pagamento.\n   V - O não envio da Nota Fiscal dentro do prazo estipulado no inciso I desta cláusula autoriza a CONTRATANTE a suspender o pagamento sem que isso configure inadimplência ou incidência de multa, até que o documento seja devidamente enviado.\n   VI - Em caso de cancelamento ou retificação de Nota Fiscal já emitida, a SUP-IA deverá providenciar a emissão do documento substituto no prazo máximo de 3 (três) dias úteis, comunicando a CONTRATANTE imediatamente.`,
      },
      {
        text: `A licença objeto deste contrato autoriza o acesso simultâneo de até ${numUsuarios} (${numPorExtenso(numUsuarios)}) ${numUsuarios === 1 ? "usuário vinculado" : "usuários vinculados"} à CONTRATANTE, sendo vedada a utilização da plataforma por número superior ao aqui estipulado sem prévia contratação de licenças adicionais.`,
      },
      {
        text: `Parágrafo único: Cada usuário deverá ser previamente cadastrado pela CONTRATANTE, sendo de sua exclusiva responsabilidade o controle e a gestão dos acessos, incluindo a revogação.`,
      },
      { text: "CLÁUSULA NONA — DA RESCISÃO", isHeading: true },
      {
        text: `A CONTRATANTE poderá rescindir o presente contrato a qualquer momento, mediante notificação por escrito à CONTRATADA com antecedência mínima de 90 (noventa) dias.`,
      },
      {
        text: `Parágrafo único: Durante o prazo de aviso prévio, a CONTRATANTE permanecerá obrigada ao pagamento das mensalidades vencidas e vincendas até o término do período de aviso, não cabendo qualquer tipo de multa rescisória em decorrência do exercício desse direito.`,
      },
      { text: "CLÁUSULA DÉCIMA — DO FORO", isHeading: true },
      {
        text: `As partes elegem o foro da Comarca de Belo Horizonte, Estado de Minas Gerais, para dirimir quaisquer controvérsias originadas do presente contrato.`,
      },
      { text: dataPorExtenso() },
      { text: "" },
      {
        text: `_______________________________          _______________________________\nSUP-IA (Contratada)                      ${razaoSocial.toUpperCase()} (Contratante)\nCNPJ: ${CONTRATADA.cnpj}                      ${docLabel}: ${documento}`,
      },
    ]

    // ── Build PDF ─────────────────────────────────────────────────────────

    const pdf = await PDFDocument.create()
    const helvetica = await pdf.embedFont(StandardFonts.Helvetica)
    const helveticaBold = await pdf.embedFont(StandardFonts.HelveticaBold)

    const PAGE_W = 595.28
    const PAGE_H = 841.89
    const ML = 72
    const MR = 72
    const MT = 72
    const MB = 72
    const USABLE = PAGE_W - ML - MR

    const BODY_SIZE = 10
    const TITLE_SIZE = 13
    const HEADING_SIZE = 10
    const LINE_H = BODY_SIZE * 1.6

    let page = pdf.addPage([PAGE_W, PAGE_H])
    let y = PAGE_H - MT

    function wrapText(
      text: string,
      font: typeof helvetica,
      size: number,
      maxW: number
    ): string[] {
      const words = text.split(" ")
      const lines: string[] = []
      let current = ""

      for (const word of words) {
        const test = current ? `${current} ${word}` : word
        if (font.widthOfTextAtSize(test, size) > maxW && current) {
          lines.push(current)
          current = word
        } else {
          current = test
        }
      }
      if (current) lines.push(current)
      return lines.length ? lines : [""]
    }

    function drawText(
      text: string,
      font: typeof helvetica,
      size: number,
      lineH: number,
      centered = false
    ) {
      const rawLines = text.split("\n")

      for (const rawLine of rawLines) {
        if (!rawLine.trim()) {
          y -= lineH
          if (y < MB) {
            page = pdf.addPage([PAGE_W, PAGE_H])
            y = PAGE_H - MT
          }
          continue
        }

        const wrapped = wrapText(rawLine, font, size, USABLE)
        for (const line of wrapped) {
          if (y < MB) {
            page = pdf.addPage([PAGE_W, PAGE_H])
            y = PAGE_H - MT
          }

          const x = centered
            ? ML + (USABLE - font.widthOfTextAtSize(line, size)) / 2
            : ML

          page.drawText(line, {
            x,
            y,
            font,
            size,
            color: rgb(0.12, 0.12, 0.12),
          })

          y -= lineH
        }
      }
    }

    for (const section of sections) {
      if (section.isTitle) {
        drawText(section.text, helveticaBold, TITLE_SIZE, TITLE_SIZE * 1.8, true)
        y -= 8
      } else if (section.isHeading) {
        y -= 6
        drawText(section.text, helveticaBold, HEADING_SIZE, LINE_H * 1.2)
      } else {
        drawText(section.text, helvetica, BODY_SIZE, LINE_H)
      }
    }

    const pdfBytes = await pdf.save()

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Contrato_SaaS_SUP-IA_${razaoSocial.replace(/\s+/g, "_").slice(0, 30)}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Erro ao gerar contrato:", error)
    return NextResponse.json(
      { error: "Falha ao gerar contrato" },
      { status: 500 }
    )
  }
}

import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: 'SUP-IA | Inteligência Artificial Aumentando Sua Produtividade',
  description: 'Automação 100% online para projetos de redes elétricas de média e baixa tensão. Software SaaS B2B para engenharia elétrica e topografia.',
  generator: 'SUP-IA',
  keywords: ['engenharia elétrica', 'topografia', 'automação', 'redes elétricas', 'SaaS', 'B2B'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

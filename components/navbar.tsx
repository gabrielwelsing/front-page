"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const HUB_URL = "https://www.hub.sup-ia.com" //

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#modulos", label: "Módulos" },
    { href: "#para-quem", label: "Para Quem" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#pricing", label: "Preços" },
    { href: "#contato", label: "Contato" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="block">
              <Image
                src="/logo-supia-crop.png"
                alt="SUP-IA Logo"
                width={160}
                height={52}
                style={{ width: 'auto', height: '52px' }}
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-blue-600 text-white" asChild>
              <a href={HUB_URL} target="_blank" rel="noopener noreferrer">
                Acessar o Hub
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="w-full bg-primary hover:bg-blue-600 text-white" asChild>
                <a href={HUB_URL} target="_blank" rel="noopener noreferrer">
                  Acessar o Hub
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

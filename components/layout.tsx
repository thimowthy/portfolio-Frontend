import '../pages/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OncoCareSystem',
  description: 'Sistema assistencial para gerenciamento de Neutropenias',
}

export default function Layout({ children }: any) {
  return (
    <main>{children}</main>
  )
}
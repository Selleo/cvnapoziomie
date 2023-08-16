import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cx } from '@/lib/cx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CV na Poziomie',
  description: 'Generuj swoje CV w kilka sekund',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(inter.className, 'bg-slate-950 text-slate-100 p-4') }>{children}</body>
    </html>
  )
}

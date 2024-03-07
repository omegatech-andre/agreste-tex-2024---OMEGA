import type { Metadata } from "next"
import "./styles/globals.scss"

export const metadata: Metadata = {
  title: "Ômega Screen Indústria | Formulário",
  description: "A Ômega Screen está na AgresteTex 2024",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
export const metadata = {
  title: 'Pizzeria Demo',
  description: 'Ordinazioni rapide via WhatsApp',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}

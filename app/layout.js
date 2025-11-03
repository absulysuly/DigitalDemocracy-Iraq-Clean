import './globals.css'

export const metadata = {
  title: 'Hamlet Election Platform',
  description: 'Iraqi Election Platform - Multilingual Civic Engagement',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

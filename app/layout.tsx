import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Baby BOSS",
  description: "Official Baby BOSS",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  generator: "t.me/plebeu",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        {/* Global background image layer */}
        <div aria-hidden="true" className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-DsGBwRy5EOkjjcyXA0Rmo2JXIGjjUz.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundAttachment: 'fixed',
            }}
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {children}
      </body>
    </html>
  )
}

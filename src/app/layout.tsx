import Navbar from "@/components/navbar"
import "./globals.css"

export const metadata = {
  title: 'VolunTrack',
  description: 'Track volunteering impact',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}

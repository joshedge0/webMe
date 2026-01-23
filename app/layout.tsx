import './globals.css'
import { Nunito, Inter, Roboto, Open_Sans, Montserrat, Playfair_Display, Lora } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });


export const metadata = {
  title: 'webMe',
  description: 'Build beautiful websites with drag and drop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${montserrat.variable} ${nunito.variable} ${playfair.variable} ${lora.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
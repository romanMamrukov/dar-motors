import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: 'D.A.R. Motors — Autoserviss & auto tirdzniecība Rīgā',
  description: 'D.A.R. Motors, Hipokrāta iela 2B, Rīga. Autoserviss, evakuatora pakalpojumi, auto noma un atlasītu automašīnu tirdzniecība.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="lv"><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}

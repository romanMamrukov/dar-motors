'use client';
import Link from 'next/link';
import Brand from './Brand';
import { LanguageSwitcher, useI18n } from './LanguageProvider';

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="site-header">
      <div className="shell nav">
        <Link href="/" aria-label="D.A.R. Motors home"><Brand compact /></Link>
        <nav className="main-nav">
          <Link href="/cars">{t.navCars}</Link>
          <Link href="/#service">{t.navService}</Link>
          <Link href="/#contact">{t.navContact}</Link>
          <LanguageSwitcher />
          <Link href="/admin" className="admin-link">{t.admin}</Link>
        </nav>
      </div>
    </header>
  );
}

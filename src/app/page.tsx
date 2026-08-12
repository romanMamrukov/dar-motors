'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import PublicCars from '@/components/PublicCars';
import Brand from '@/components/Brand';
import { useI18n } from '@/components/LanguageProvider';
import { publicAsset } from '@/lib/paths';

const PHONE_DISPLAY = '+371 23 777 728';
const PHONE_HREF = 'tel:+37123777728';
const FB_URL = 'https://www.facebook.com/groups/3036416659834295/';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Hipokr%C4%81ta+iela+2B%2C+R%C4%ABga%2C+LV-1079';

export default function Home() {
  const { t } = useI18n();
  return <>
    <Header />
    <main>
      <section className="hero dar-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="label light-label">{t.eyebrow}</div>
            <h1>{t.heroTitle1}<br/><span>{t.heroTitle2}</span></h1>
            <p className="hero-lead">{t.heroText}</p>
            <div className="hero-actions">
              <Link className="btn brand-btn" href="/cars">{t.viewCars}</Link>
              <a className="btn ghost-btn" href={PHONE_HREF}>{t.call}</a>
            </div>
          </div>
          <div className="hero-brand-card">
            <div className="brand-card-top"><Brand /></div>
            <img src={publicAsset('/brand/dar-signage.png')} alt="D.A.R. Motors autoserviss Hipokrāta iela 2B" />
            <div className="brand-card-caption">Hipokrāta iela 2B · Rīga</div>
          </div>
        </div>
      </section>

      <section className="section shell inventory-section">
        <div className="section-heading"><div><div className="label">{t.currentInventory}</div><h2>{t.carsForSale}</h2></div><span className="demo-chip">{t.demoData}</span></div>
        <PublicCars limit={3}/>
        <div className="section-action"><Link className="text-link" href="/cars">{t.allCars} →</Link></div>
      </section>

      <section id="service" className="section service-band">
        <div className="shell">
          <div className="label light-label">{t.workshopFirst}</div>
          <div className="service-intro"><h2>{t.serviceTitle}</h2><p>{t.serviceIntro}</p></div>
          <div className="service-grid">
            <article><span>01</span><h3>{t.repair}</h3><p>{t.repairText}</p></article>
            <article><span>02</span><h3>{t.towing}</h3><p>{t.towingText}</p></article>
            <article><span>03</span><h3>{t.rentalSales}</h3><p>{t.rentalSalesText}</p></article>
          </div>
        </div>
      </section>

      <section className="section shell why-section">
        <div className="label">{t.why}</div><h2>{t.whyTitle}</h2>
        <div className="reason-list"><div>01 <strong>{t.why1}</strong></div><div>02 <strong>{t.why2}</strong></div><div>03 <strong>{t.why3}</strong></div></div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="shell contact-grid">
          <div>
            <div className="label light-label">{t.location}</div>
            <h2>D.A.R. Motors</h2>
            <p className="contact-address">{t.address}</p>
            <p>{t.legal}</p>
            <p><strong>{t.phone}:</strong> <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
            <div className="contact-actions"><a className="btn brand-btn" href={PHONE_HREF}>{t.call}</a><a className="btn ghost-btn" href={FB_URL} target="_blank" rel="noreferrer">{t.facebook}</a><a className="btn ghost-btn" href={MAP_URL} target="_blank" rel="noreferrer">{t.directions}</a></div>
            <p className="small-note">{t.noGoogle}</p>
          </div>
          <div className="location-image"><img src={publicAsset('/brand/dar-signage.png')} alt="D.A.R. Motors workshop signage" /></div>
        </div>
      </section>
    </main>
  </>;
}

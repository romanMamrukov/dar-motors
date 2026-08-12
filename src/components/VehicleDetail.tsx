'use client';
import { useEffect, useState } from 'react';
import { getVehicles, getLeads, saveLeads } from '@/lib/store';
import { Vehicle } from '@/lib/types';
import { eur, km } from '@/lib/format';
import { publicAsset } from '@/lib/paths';
import Header from './Header';
import { useI18n } from './LanguageProvider';

export default function VehicleDetail() {
  const { t, locale } = useI18n();
  const [v, setV] = useState<Vehicle>(); const [loaded, setLoaded] = useState(false); const [done, setDone] = useState(false);
  useEffect(() => { const slug = new URLSearchParams(window.location.search).get('slug'); setV(getVehicles().find((x) => x.slug === slug)); setLoaded(true); }, []);
  if (!loaded) return null;
  if (!v) return <><Header /><div className="shell section">{t.notFound}</div></>;
  function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const ls = getLeads(); saveLeads([{ id: crypto.randomUUID(), vehicleId: v!.id, customer: String(f.get('name')), phone: String(f.get('phone')), email: String(f.get('email')), message: String(f.get('message')), createdAt: new Date().toISOString().slice(0, 10), status: 'New' }, ...ls]); setDone(true); }
  const statusLabel = v.status === 'Available' ? t.available : v.status === 'Reserved' ? t.reserved : v.status === 'Sold' ? t.sold : t.draft;
  const interestText = locale === 'lv' ? `Mani interesē ${v.manufacturer} ${v.model}.` : locale === 'ru' ? `Меня интересует ${v.manufacturer} ${v.model}.` : `I am interested in the ${v.manufacturer} ${v.model}.`;
  return <><Header/><main className="shell section vehicle-page"><div className="vehicle-hero"><img src={publicAsset(v.images[v.coverIndex]||'/cars/car1.svg')} alt={`${v.manufacturer} ${v.model}`}/><span className={`status ${v.status}`}>{statusLabel}</span></div><div className="vehicle-layout"><div><div className="vehicle-heading"><div><h1>{v.manufacturer} {v.model}</h1><p>{v.generation}</p></div><strong>{eur(v.price)}</strong></div><div className="spec-grid">{[[t.year,v.year],[t.mileage,km(v.mileage)],[t.engine,v.engine],[t.fuel,v.fuel],[t.transmission,v.transmission],[t.power,v.power+' kW'],[t.body,v.bodyType],[t.color,v.color]].map(([a,b])=><div key={String(a)}><div className="label">{a}</div><b>{b}</b></div>)}</div><section className="vehicle-copy"><h2>{t.description}</h2><p>{v.description}</p><h2>{t.equipment}</h2><p>{v.features.join(' · ')}</p><h2>{t.preparation}</h2><p>{v.preparation}</p></section></div><aside id="enquiry"><div className="enquiry-card"><div className="label">D.A.R. Motors</div><h2>{t.askCar}</h2>{done?<p><b>{t.enquiryReceived}</b> {t.enquiryAdmin}</p>:<form onSubmit={submit}><input required className="input" name="name" placeholder={t.name}/><input required className="input" name="phone" placeholder={t.phone}/><input className="input" type="email" name="email" placeholder={t.emailOptional}/><textarea required className="textarea" name="message" defaultValue={interestText}/><button className="btn brand-btn">{t.sendEnquiry}</button></form>}</div></aside></div></main><div className="mobile-cta"><a className="btn secondary" href="tel:+37123777728">{t.call}</a><a className="btn brand-btn" href="#enquiry">{t.enquire}</a></div></>;
}

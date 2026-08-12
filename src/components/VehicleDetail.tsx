'use client';

import { useEffect, useState } from 'react';
import { getVehicles, getLeads, saveLeads } from '@/lib/store';
import { Vehicle } from '@/lib/types';
import { eur, km } from '@/lib/format';
import { publicAsset } from '@/lib/paths';
import Header from './Header';

export default function VehicleDetail() {
  const [v, setV] = useState<Vehicle>();
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('slug');
    setV(getVehicles().find((x) => x.slug === slug));
    setLoaded(true);
  }, []);

  if (!loaded) return null;
  if (!v) return <><Header /><div className="shell section">Vehicle not found.</div></>;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ls = getLeads();
    saveLeads([{
      id: crypto.randomUUID(),
      vehicleId: v!.id,
      customer: String(f.get('name')),
      phone: String(f.get('phone')),
      email: String(f.get('email')),
      message: String(f.get('message')),
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'New',
    }, ...ls]);
    setDone(true);
  }

  return <>
    <Header />
    <main className="shell section">
      <img src={publicAsset(v.images[v.coverIndex] || '/cars/car1.svg')} alt={`${v.manufacturer} ${v.model}`} style={{ width: '100%', maxHeight: 600, objectFit: 'cover', background: '#eee' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(280px,1fr)', gap: 40, marginTop: 30 }}>
        <div>
          <span className={`status ${v.status}`}>{v.status}</span>
          <h1 style={{ fontSize: 46, margin: '10px 0' }}>{v.manufacturer} {v.model}</h1>
          <p style={{ fontSize: 28, fontWeight: 800 }}>{eur(v.price)}</p>
          <div className="grid-cards">
            {[
              ['Year', v.year], ['Mileage', km(v.mileage)], ['Engine', v.engine], ['Fuel', v.fuel],
              ['Transmission', v.transmission], ['Power', v.power + ' kW'], ['Body', v.bodyType], ['Color', v.color],
            ].map(([a, b]) => <div key={a as string} style={{ borderTop: '1px solid #ddd', paddingTop: 10 }}><div className="label">{a}</div><b>{b}</b></div>)}
          </div>
          <h2>Description</h2><p style={{ lineHeight: 1.7 }}>{v.description}</p>
          <h2>Equipment</h2><p>{v.features.join(' · ')}</p>
          <h2>Preparation</h2><p>{v.preparation}</p>
        </div>
        <aside id="enquiry">
          <div style={{ border: '1px solid #ddd', padding: 20, position: 'sticky', top: 20 }}>
            <h2>Ask about this car</h2>
            {done ? <p><b>Enquiry received.</b> It is now visible in the admin demo.</p> :
              <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
                <input required className="input" name="name" placeholder="Name" />
                <input required className="input" name="phone" placeholder="Phone" />
                <input className="input" type="email" name="email" placeholder="Email (optional)" />
                <textarea required className="textarea" name="message" defaultValue={`I am interested in the ${v.manufacturer} ${v.model}.`} />
                <button className="btn">Send enquiry</button>
              </form>}
          </div>
        </aside>
      </div>
    </main>
    <div className="mobile-cta"><a className="btn secondary" href="tel:+37100000000">Call</a><a className="btn" href="#enquiry">Enquire</a></div>
  </>;
}

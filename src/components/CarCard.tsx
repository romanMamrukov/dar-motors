'use client';
import Link from 'next/link';
import { Vehicle } from '@/lib/types';
import { eur, km } from '@/lib/format';
import { publicAsset } from '@/lib/paths';
import { useI18n } from './LanguageProvider';

export default function CarCard({ v }: { v: Vehicle }) {
  const { t } = useI18n();
  const image = v.images[v.coverIndex] || '/cars/car1.svg';
  const statusLabel = v.status === 'Available' ? t.available : v.status === 'Reserved' ? t.reserved : v.status === 'Sold' ? t.sold : t.draft;
  return (
    <Link className="car-card" href={`/car?slug=${encodeURIComponent(v.slug)}`}>
      <div className="car-media"><img src={publicAsset(image)} alt={`${v.manufacturer} ${v.model}`} /><span className={`status ${v.status}`}>{statusLabel}</span></div>
      <div className="car-content">
        <div className="car-title-row"><h3>{v.manufacturer} {v.model}</h3><strong>{eur(v.price)}</strong></div>
        <p>{v.year} · {km(v.mileage)} · {v.fuel} · {v.transmission}</p>
      </div>
    </Link>
  );
}

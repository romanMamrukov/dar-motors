import Link from 'next/link';
import { Vehicle } from '@/lib/types';
import { eur, km } from '@/lib/format';
import { publicAsset } from '@/lib/paths';

export default function CarCard({ v }: { v: Vehicle }) {
  const image = v.images[v.coverIndex] || '/cars/car1.svg';

  return (
    <Link className="car-card" href={`/car?slug=${encodeURIComponent(v.slug)}`}>
      <img src={publicAsset(image)} alt={`${v.manufacturer} ${v.model}`} />
      <div style={{ padding: '16px 2px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ margin: 0 }}>{v.manufacturer} {v.model}</h3>
          <span className={`status ${v.status}`}>{v.status}</span>
        </div>
        <p style={{ color: '#6b7280' }}>{v.year} · {km(v.mileage)} · {v.fuel} · {v.transmission}</p>
        <strong style={{ fontSize: 24 }}>{eur(v.price)}</strong>
      </div>
    </Link>
  );
}

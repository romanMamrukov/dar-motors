'use client';

import { useEffect, useState } from 'react';
import { getVehicles } from '@/lib/store';
import { Vehicle } from '@/lib/types';
import VehicleForm from './VehicleForm';

export default function EditVehicle() {
  const [v, setV] = useState<Vehicle>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    setV(getVehicles().find((x) => x.id === id));
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading…</p>;
  if (!v) return <p>Vehicle not found.</p>;

  return <>
    <div className="label">Inventory</div>
    <h1>Edit {v.manufacturer} {v.model}</h1>
    <VehicleForm initial={v} />
  </>;
}

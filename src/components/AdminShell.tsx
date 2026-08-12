'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const isLoginPage =
    pathname === '/admin/login' ||
    pathname?.endsWith('/admin/login');

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      setAuthenticated(false);
      return;
    }

    try {
      const loggedIn =
        window.sessionStorage.getItem('dar_demo_auth') === '1';

      if (loggedIn) {
        setAuthenticated(true);
        setAuthChecked(true);
        return;
      }

      setAuthChecked(true);
      router.replace('/admin/login');
    } catch {
      setAuthChecked(true);
      router.replace('/admin/login');
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <main className="shell section">
        <p>Loading admin…</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="shell section">
        <p>Redirecting to login…</p>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <h2>D.A.R. Admin</h2>

        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/cars">Vehicles</Link>
        <Link href="/admin/cars/new">Add vehicle</Link>
        <Link href="/admin/leads">Leads</Link>
        <Link href="/">Public site</Link>

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem('dar_demo_auth');
            router.push('/admin/login');
          }}
          style={{
            background: 'none',
            border: 0,
            color: '#ddd',
            padding: 8,
            cursor: 'pointer',
          }}
        >
          Log out
        </button>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
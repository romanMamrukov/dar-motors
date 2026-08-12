'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? '';

  const normalizedPath = pathname.replace(/\/+$/, '');

  const isLoginPage = normalizedPath.endsWith('/admin/login');

  const [authState, setAuthState] = useState<
    'checking' | 'authenticated' | 'unauthenticated'
  >('checking');

  useEffect(() => {
    // Login page must never be protected by AdminShell.
    if (isLoginPage) {
      setAuthState('unauthenticated');
      return;
    }

    const loggedIn =
      window.sessionStorage.getItem('dar_demo_auth') === '1';

    if (loggedIn) {
      setAuthState('authenticated');
      return;
    }

    setAuthState('unauthenticated');

    window.location.replace(
      withBasePath('/admin/login/')
    );
  }, [isLoginPage]);

  // Login is always accessible.
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authState === 'checking') {
    return (
      <main className="shell section">
        <p>Checking admin session…</p>
      </main>
    );
  }

  if (authState === 'unauthenticated') {
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

        <Link href="/admin/">Dashboard</Link>
        <Link href="/admin/cars/">Vehicles</Link>
        <Link href="/admin/cars/new/">Add vehicle</Link>
        <Link href="/admin/leads/">Leads</Link>
        <Link href="/">Public site</Link>

        <button
          type="button"
          onClick={() => {
            window.sessionStorage.removeItem('dar_demo_auth');

            window.location.replace(
              withBasePath('/admin/login/')
            );
          }}
        >
          Log out
        </button>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
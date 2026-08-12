'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    if (
      email === 'demo@darmotors.local' &&
      password === 'demo1234'
    ) {
      sessionStorage.setItem('dar_demo_auth', '1');
      router.replace('/admin');
      return;
    }

    alert('Incorrect demo credentials.');
  }

  return (
    <main
      className="shell section"
      style={{ maxWidth: 520 }}
    >
      <div className="label">D.A.R. Motors</div>

      <h1>Admin login</h1>

      <p>
        Demo credentials:
        <br />
        <b>demo@darmotors.local</b>
        <br />
        <b>demo1234</b>
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: 12,
        }}
      >
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button className="btn" type="submit">
          Log in
        </button>
      </form>

      <p
        style={{
          color: '#6b7280',
          fontSize: 13,
        }}
      >
        Demo authentication is browser-session only.
      </p>
    </main>
  );
}
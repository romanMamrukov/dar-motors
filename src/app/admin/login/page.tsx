'use client';

function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}

export default function LoginPage() {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(
      formData.get('email') || ''
    ).trim();

    const password = String(
      formData.get('password') || ''
    );

    if (
      email === 'demo@darmotors.local' &&
      password === 'demo1234'
    ) {
      window.sessionStorage.setItem(
        'dar_demo_auth',
        '1'
      );

      // Full navigation deliberately used here.
      // This guarantees AdminShell mounts again
      // and reads the new session state.
      window.location.assign(
        withBasePath('/admin/')
      );

      return;
    }

    alert('Incorrect demo credentials.');
  }

  return (
    <main
      className="shell section"
      style={{ maxWidth: 520 }}
    >
      <div className="label">
        D.A.R. Motors
      </div>

      <h1>Admin login</h1>

      <p>
        Demo credentials:
        <br />
        <strong>demo@darmotors.local</strong>
        <br />
        <strong>demo1234</strong>
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
          autoComplete="username"
          required
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button
          className="btn"
          type="submit"
        >
          Log in
        </button>
      </form>

      <p
        style={{
          color: '#6b7280',
          fontSize: 13,
        }}
      >
        Demo authentication is stored only
        in this browser session.
      </p>
    </main>
  );
}
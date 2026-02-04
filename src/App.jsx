export default function App() {
  return (
    <main className="container" style={{ padding: '32px 0' }}>
      <section className="card" style={{ padding: 24 }}>
        <span className="badge">React + Axios + HP API</span>
        <h1 style={{ margin: '12px 0 8px' }}>Enciclopedia Mágica</h1>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)' }}>
          Explora personajes y hechizos con búsqueda, filtros, favoritos y diseño accesible.
        </p>

        <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn" type="button">
            Ver personajes
          </button>
          <button className="btn" type="button">
            Ver hechizos
          </button>
        </div>
      </section>
    </main>
  );
}

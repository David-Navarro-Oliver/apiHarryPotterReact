import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <span className="badge">React + Axios + HP API</span>
      <h1 style={{ margin: '12px 0 8px' }}>Enciclopedia Mágica</h1>
      <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)' }}>
        Explora personajes y hechizos con búsqueda, filtros, favoritos y diseño accesible.
      </p>

      <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link className="btn" to="/characters">
          Ver personajes
        </Link>
        <Link className="btn" to="/spells">
          Ver hechizos
        </Link>
      </div>
    </section>
  );
}

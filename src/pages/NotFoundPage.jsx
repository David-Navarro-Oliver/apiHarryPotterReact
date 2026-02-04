import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="card" style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Página no encontrada</h1>
      <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.72)' }}>
        La ruta no existe.
      </p>
      <div style={{ marginTop: 18 }}>
        <Link className="btn" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

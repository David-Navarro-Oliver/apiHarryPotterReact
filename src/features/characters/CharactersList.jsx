import { Link } from 'react-router-dom';

const ROLE_LABELS = {
  student: 'Estudiante',
  staff: 'Profesor',
  unknown: 'Sin rol',
};

export default function CharactersList({ characters, onToggleFavorite, isFavorite }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 14,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      }}
    >
      {characters.map((c) => {
        const fav = isFavorite ? isFavorite(c.id) : false;
        const roleLabel = ROLE_LABELS[c.role] ?? 'Sin rol';

        return (
          <article key={c.id} className="card" style={{ padding: 14, position: 'relative' }}>
            <button
              type="button"
              className="btn"
              onClick={() => onToggleFavorite?.(c.id)}
              aria-pressed={fav}
              aria-label={fav ? `Quitar ${c.name} de favoritos` : `Añadir ${c.name} a favoritos`}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                padding: '8px 10px',
                borderRadius: 999,
                borderColor: fav ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.12)',
                background: fav ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.06)',
              }}
            >
              {fav ? '★' : '☆'}
            </button>

            <img
              src={c.imageUrl}
              alt={c.name}
              loading="lazy"
              style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 14 }}
            />

            <h2 style={{ margin: '12px 0 6px', fontSize: 18 }}>{c.name}</h2>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {c.house ? <span className="badge">{c.house}</span> : null}
              <span className="badge">{roleLabel}</span>
            </div>

            <div style={{ marginTop: 12 }}>
              <Link className="btn" to={`/characters/${c.id}`}>
                Ver detalle
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

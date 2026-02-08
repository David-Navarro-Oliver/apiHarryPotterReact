import { Link } from 'react-router-dom';
import { applyImageFallback } from '../../utils/imageFallback.js';

const ROLE_LABELS = {
  student: 'Estudiante',
  staff: 'Profesor',
  unknown: 'Sin rol',
};

export default function CharactersList({ characters, onToggleFavorite, isFavorite }) {
  return (
    <div className="cardsGrid">
      {characters.map((c) => {
        const fav = isFavorite ? isFavorite(c.id) : false;
        const roleLabel = ROLE_LABELS[c.role] ?? 'Sin rol';

        return (
          <article key={c.id} className="card characterCard">
            <button
              type="button"
              className="btn favoriteBtn"
              onClick={() => onToggleFavorite?.(c.id)}
              aria-pressed={fav}
              aria-label={fav ? `Quitar ${c.name} de favoritos` : `Añadir ${c.name} de favoritos`}
            >
              {fav ? '★' : '☆'}
            </button>

            <img
              src={c.imageUrl}
              onError={applyImageFallback}
              alt={c.name}
              loading="lazy"
              className="characterImage"
            />

            <div className="characterBody">
              <h2 className="characterName">{c.name}</h2>

              <div className="characterBadges">
                {c.house ? <span className="badge">{c.house}</span> : null}
                <span className="badge">{roleLabel}</span>
              </div>

              <div className="characterActions">
                <Link className="btn" to={`/characters/${c.id}`}>
                  Ver detalle
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

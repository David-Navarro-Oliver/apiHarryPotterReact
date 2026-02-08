import { Link } from 'react-router-dom';
import { applyImageFallback } from '../../utils/imageFallback.js';
import placeholderCharacter from '../../assets/placeholder-character.jpg';

const ROLE_LABELS = {
  student: 'Estudiante',
  staff: 'Profesor',
};

const STATUS_LABELS = {
  alive: 'Vivo',
  dead: 'Muerto',
};

export default function CharactersList({ characters, onToggleFavorite, isFavorite }) {
  return (
    <div className="cardsGrid">
      {characters.map((c) => {
        const fav = isFavorite ? isFavorite(c.id) : false;
        const imageSrc = c.imageUrl ? c.imageUrl : placeholderCharacter;

        const roleLabel = c.role && c.role !== 'unknown' ? ROLE_LABELS[c.role] : '';
        const statusKey = c.alive === true ? 'alive' : c.alive === false ? 'dead' : '';
        const statusLabel = statusKey ? STATUS_LABELS[statusKey] : '';

        return (
          <article key={c.id} className="card characterCard">
            <button
              type="button"
              className={`btn favoriteBtn ${fav ? 'favoriteBtnActive' : ''}`}
              onClick={() => onToggleFavorite?.(c.id)}
              aria-pressed={fav}
              aria-label={fav ? `Quitar ${c.name} de favoritos` : `Añadir ${c.name} de favoritos`}
            >
              {fav ? '★' : '☆'}
            </button>

            <img
              src={imageSrc}
              onError={applyImageFallback}
              alt={c.name}
              loading="lazy"
              className="characterImage"
            />

            <div className="characterBody">
              <div className="characterText">
                <h2 className="characterName">{c.name}</h2>
                {c.school ? <p className="characterSchool">{c.school}</p> : null}

                <div className="characterBadges">
                  {c.house ? <span className="badge">{c.house}</span> : null}
                  {roleLabel ? <span className="badge">{roleLabel}</span> : null}
                  {statusLabel ? <span className="badge">{statusLabel}</span> : null}
                  {c.species ? <span className="badge">{c.species}</span> : null}
                </div>
              </div>

              <div className="characterActions">
                <Link className="btn btnFull" to={`/characters/${c.id}`}>
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

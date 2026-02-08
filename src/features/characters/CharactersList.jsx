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

const GENDER_LABELS = {
  male: 'Hombre',
  female: 'Mujer',
};

const SPECIES_LABELS = {
  human: 'Humano',
  ghost: 'Fantasma',
  'half-giant': 'Medio gigante',
  werewolf: 'Hombre lobo',
  goblin: 'Duende',
  'house-elf': 'Elfo doméstico',
  elf: 'Elfo',
  giant: 'Gigante',
  vampire: 'Vampiro',
  centaur: 'Centauro',
  hippogriff: 'Hipogrifo',
  poltergeist: 'Poltergeist',
};

function toKey(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function getGenderLabel(value) {
  const key = toKey(value);
  return GENDER_LABELS[key] ?? value;
}

function getSpeciesLabel(value) {
  const key = toKey(value);
  return SPECIES_LABELS[key] ?? value;
}

export default function CharactersList({ characters, onToggleFavorite, isFavorite }) {
  return (
    <div className="cardsGrid">
      {characters.map((c) => {
        const fav = isFavorite ? isFavorite(c.id) : false;
        const imageSrc = c.imageUrl ? c.imageUrl : placeholderCharacter;

        const roleLabel = c.role && c.role !== 'unknown' ? ROLE_LABELS[c.role] : '';
        const statusKey = c.alive === true ? 'alive' : c.alive === false ? 'dead' : '';
        const statusLabel = statusKey ? STATUS_LABELS[statusKey] : '';

        const genderLabel = c.gender ? getGenderLabel(c.gender) : '';
        const speciesLabel = c.species ? getSpeciesLabel(c.species) : '';

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
                  {genderLabel ? <span className="badge">{genderLabel}</span> : null}
                  {speciesLabel ? <span className="badge">{speciesLabel}</span> : null}
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

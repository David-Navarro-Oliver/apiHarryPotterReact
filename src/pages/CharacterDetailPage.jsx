import { Link, useParams } from 'react-router-dom';
import useCharacterById from '../features/characters/useCharacterById.js';
import { applyImageFallback } from '../utils/imageFallback.js';
import placeholderCharacter from '../assets/placeholder-character.jpg';

const ROLE_LABELS = {
  student: 'Estudiante',
  staff: 'Profesor',
  unknown: 'Sin rol',
};

const SPECIES_LABELS = {
  human: 'Humano',
  half_giant: 'Semi-gigante',
  werewolf: 'Hombre lobo',
  goblin: 'Duende',
  ghost: 'Fantasma',
  elf: 'Elfo',
  vampire: 'Vampiro',
  centaur: 'Centauro',
  giant: 'Gigante',
  house_elf: 'Elfo doméstico',
};

const GENDER_LABELS = {
  male: 'Masculino',
  female: 'Femenino',
};

function normalizeKey(value) {
  if (!value) return '';
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '_');
}

function labelFrom(map, value) {
  const key = normalizeKey(value);
  return map[key] ?? value;
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export default function CharacterDetailPage() {
  const { id } = useParams();
  const { status, errorMessage, character, toggleFavorite, isFavorite } = useCharacterById(id);

  const fav = character ? isFavorite(character.id) : false;

  if (status === 'loading') {
    return (
      <section className="card stateCard" aria-live="polite">
        Cargando personaje...
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="card stateCard" role="alert">
        <strong>Ha ocurrido un error.</strong>
        <div className="stateMuted">{errorMessage}</div>
        <div className="detailTopActions">
          <Link className="btn" to="/characters">
            Volver a personajes
          </Link>
        </div>
      </section>
    );
  }

  if (!character) {
    return (
      <section className="card stateCard" aria-live="polite">
        <strong>No se encontró el personaje.</strong>
        <div className="detailTopActions">
          <Link className="btn" to="/characters">
            Volver a personajes
          </Link>
        </div>
      </section>
    );
  }

  const imageSrc = character.imageUrl ? character.imageUrl : placeholderCharacter;

  const roleLabel = ROLE_LABELS[character.role] ?? 'Sin rol';
  const speciesLabel = hasText(character.species)
    ? labelFrom(SPECIES_LABELS, character.species)
    : '';
  const genderLabel = hasText(character.gender) ? labelFrom(GENDER_LABELS, character.gender) : '';
  const statusLabel = character.alive === true ? 'Vivo' : character.alive === false ? 'Muerto' : '';

  const infoItems = [
    hasText(character.house) ? { label: 'Casa', value: character.house } : null,
    { label: 'Rol', value: roleLabel },
    hasText(character.school) ? { label: 'Escuela', value: character.school } : null,
    statusLabel ? { label: 'Estado', value: statusLabel } : null,
    speciesLabel ? { label: 'Especie', value: speciesLabel } : null,
    genderLabel ? { label: 'Género', value: genderLabel } : null,
    hasText(character.ancestry) ? { label: 'Linaje', value: character.ancestry } : null,
    hasText(character.patronus) ? { label: 'Patronus', value: character.patronus } : null,
    hasText(character.actor) ? { label: 'Actor/Actriz', value: character.actor } : null,
    hasText(character.dateOfBirth)
      ? { label: 'Fecha de nacimiento', value: character.dateOfBirth }
      : null,
    character.yearOfBirth !== null
      ? { label: 'Año de nacimiento', value: String(character.yearOfBirth) }
      : null,
    hasText(character.eyeColour) ? { label: 'Color de ojos', value: character.eyeColour } : null,
    hasText(character.hairColour) ? { label: 'Color de pelo', value: character.hairColour } : null,
  ].filter(Boolean);

  const wand = character.wand;
  const wandItems = wand
    ? [
        hasText(wand.wood) ? { label: 'Madera', value: wand.wood } : null,
        hasText(wand.core) ? { label: 'Núcleo', value: wand.core } : null,
        wand.length !== null ? { label: 'Longitud', value: `${wand.length}` } : null,
      ].filter(Boolean)
    : [];

  const alternateNames = Array.isArray(character.alternateNames) ? character.alternateNames : [];
  const alternateActors = Array.isArray(character.alternateActors) ? character.alternateActors : [];

  const showAliases = alternateNames.length > 0;
  const showAltActors = alternateActors.length > 0;
  const showWand = wandItems.length > 0;

  return (
    <section className="detailPage">
      <div className="detailTopActions">
        <Link className="btn" to="/characters">
          ← Volver
        </Link>

        <button
          type="button"
          className={`btn ${fav ? 'favoriteBtnActive' : ''}`}
          onClick={() => toggleFavorite(character.id)}
          aria-pressed={fav}
          aria-label={
            fav ? `Quitar ${character.name} de favoritos` : `Añadir ${character.name} a favoritos`
          }
        >
          {fav ? '★ Favorito' : '☆ Añadir a favoritos'}
        </button>
      </div>

      <article className="card detailCard">
        <div className="detailGrid">
          <img
            src={imageSrc}
            onError={applyImageFallback}
            alt={character.name}
            className="detailImage"
          />

          <div className="detailContent">
            <div className="detailHeader">
              <h1 className="detailTitle">{character.name}</h1>
            </div>

            {infoItems.length > 0 ? (
              <section className="detailSection" aria-label="Ficha del personaje">
                <h2 className="detailSectionTitle">Ficha del personaje</h2>
                <dl className="detailInfoGrid">
                  {infoItems.map((item) => (
                    <div key={item.label} className="detailInfoItem">
                      <dt className="detailInfoLabel">{item.label}</dt>
                      <dd className="detailInfoValue">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {showWand ? (
              <section className="detailSection" aria-label="Varita">
                <h2 className="detailSectionTitle">Varita</h2>
                <dl className="detailInfoGrid">
                  {wandItems.map((item) => (
                    <div key={item.label} className="detailInfoItem">
                      <dt className="detailInfoLabel">{item.label}</dt>
                      <dd className="detailInfoValue">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {showAliases ? (
              <section className="detailSection" aria-label="Nombres alternativos">
                <h2 className="detailSectionTitle">Nombres alternativos</h2>
                <div className="detailPills">
                  {alternateNames.map((n) => (
                    <span key={n} className="badge">
                      {n}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {showAltActors ? (
              <section className="detailSection" aria-label="Actores alternativos">
                <h2 className="detailSectionTitle">Actores alternativos</h2>
                <div className="detailPills">
                  {alternateActors.map((n) => (
                    <span key={n} className="badge">
                      {n}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>
    </section>
  );
}

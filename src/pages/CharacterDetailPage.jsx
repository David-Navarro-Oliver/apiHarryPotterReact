import { Link, useParams } from 'react-router-dom';
import useCharacterById from '../features/characters/useCharacterById.js';
import { applyImageFallback } from '../utils/imageFallback.js';

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
  unknown: 'Desconocida',
};

const GENDER_LABELS = {
  male: 'Masculino',
  female: 'Femenino',
  unknown: 'Desconocido',
};

function normalizeKey(value) {
  if (!value) return 'unknown';
  return String(value).trim().toLowerCase().replace(/\s+/g, '_');
}

function labelFrom(map, value, fallback) {
  const key = normalizeKey(value);
  return map[key] ?? fallback;
}

export default function CharacterDetailPage() {
  const { id } = useParams();

  const { status, errorMessage, character, toggleFavorite, isFavorite } = useCharacterById(id);

  const fav = character ? isFavorite(character.id) : false;

  if (status === 'loading') {
    return (
      <section className="card" style={{ padding: 18 }}>
        Cargando personaje...
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="card" style={{ padding: 18 }}>
        <strong>Ha ocurrido un error.</strong>
        <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)' }}>{errorMessage}</div>
        <div style={{ marginTop: 14 }}>
          <Link className="btn" to="/characters">
            Volver a personajes
          </Link>
        </div>
      </section>
    );
  }

  if (!character) {
    return (
      <section className="card" style={{ padding: 18 }}>
        <strong>No se encontró el personaje.</strong>
        <div style={{ marginTop: 14 }}>
          <Link className="btn" to="/characters">
            Volver a personajes
          </Link>
        </div>
      </section>
    );
  }

  const roleLabel = ROLE_LABELS[character.role] ?? 'Sin rol';

  const speciesLabel =
    character.species ? labelFrom(SPECIES_LABELS, character.species, character.species) : null;

  const genderLabel =
    character.gender ? labelFrom(GENDER_LABELS, character.gender, character.gender) : null;

  const statusLabel =
    character.alive === true ? 'Vivo' : character.alive === false ? 'Muerto' : 'Desconocido';

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn" to="/characters">
          ← Volver
        </Link>

        <button
          type="button"
          className="btn"
          onClick={() => toggleFavorite(character.id)}
          aria-pressed={fav}
          aria-label={fav ? `Quitar ${character.name} de favoritos` : `Añadir ${character.name} a favoritos`}
          style={{
            borderColor: fav ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.12)',
            background: fav ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.06)',
          }}
        >
          {fav ? '★ Favorito' : '☆ Añadir a favoritos'}
        </button>
      </div>

      <article className="card" style={{ padding: 18 }}>
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'minmax(220px, 320px) 1fr',
            alignItems: 'start',
          }}
        >
          <img
            src={character.imageUrl}
            onError={applyImageFallback}
            alt={character.name}
            style={{ width: '100%', borderRadius: 16, objectFit: 'cover', aspectRatio: '3 / 4' }}
          />

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>{character.name}</h1>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {character.house ? <span className="badge">{character.house}</span> : null}
              <span className="badge">{roleLabel}</span>
              {speciesLabel ? <span className="badge">{speciesLabel}</span> : null}
              {genderLabel ? <span className="badge">{genderLabel}</span> : null}
              {character.alive === true ? <span className="badge">Vivo</span> : null}
              {character.alive === false ? <span className="badge">Muerto</span> : null}
            </div>

            <div style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
              <div>
                <strong>Casa:</strong> {character.house || 'Desconocida'}
              </div>
              <div>
                <strong>Rol:</strong> {roleLabel}
              </div>
              <div>
                <strong>Especie:</strong> {speciesLabel || 'Desconocida'}
              </div>
              <div>
                <strong>Género:</strong> {genderLabel || 'Desconocido'}
              </div>
              <div>
                <strong>Estado:</strong> {statusLabel}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

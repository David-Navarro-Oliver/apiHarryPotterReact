import { Link, useParams } from 'react-router-dom';
import useCharacterById from '../features/characters/useCharacterById.js';
import { applyImageFallback } from '../utils/imageFallback.js';

const ROLE_LABELS = {
  student: 'Estudiante',
  staff: 'Profesor',
  unknown: 'Sin rol',
};

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
              {character.species ? <span className="badge">{character.species}</span> : null}
              {character.gender ? <span className="badge">{character.gender}</span> : null}
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
                <strong>Especie:</strong> {character.species || 'Desconocida'}
              </div>
              <div>
                <strong>Género:</strong> {character.gender || 'Desconocido'}
              </div>
              <div>
                <strong>Estado:</strong>{' '}
                {character.alive === true ? 'Vivo' : character.alive === false ? 'Muerto' : 'Desconocido'}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

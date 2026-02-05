import CharactersList from '../features/characters/CharactersList.jsx';
import useCharacters from '../features/characters/useCharacters.js';

export default function CharactersPage() {
  const { characters, status, errorMessage, query, setQuery } = useCharacters();

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <header className="card" style={{ padding: 18, display: 'grid', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Personajes</h1>
          <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.72)' }}>
            Explora el universo de Harry Potter.
          </p>
        </div>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>
            Buscar por nombre
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej. Harry, Hermione, Snape..."
            aria-label="Buscar personaje por nombre"
            style={{
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
            }}
          />
        </label>
      </header>

      {status === 'loading' ? (
        <section className="card" style={{ padding: 18 }}>
          Cargando personajes...
        </section>
      ) : null}

      {status === 'error' ? (
        <section className="card" style={{ padding: 18 }}>
          <strong>Ha ocurrido un error.</strong>
          <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.72)' }}>{errorMessage}</div>
        </section>
      ) : null}

      {status === 'success' && characters.length === 0 ? (
        <section className="card" style={{ padding: 18 }}>
          No hay resultados para la búsqueda.
        </section>
      ) : null}

      {status === 'success' && characters.length > 0 ? (
        <CharactersList characters={characters} />
      ) : null}
    </section>
  );
}

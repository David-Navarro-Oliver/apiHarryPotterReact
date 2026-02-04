import CharactersList from '../features/characters/CharactersList.jsx';
import useCharacters from '../features/characters/useCharacters.js';

export default function CharactersPage() {
  const { characters, status, errorMessage } = useCharacters();

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <header className="card" style={{ padding: 18 }}>
        <h1 style={{ margin: 0 }}>Personajes</h1>
        <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.72)' }}>
          Explora el universo de Harry Potter.
        </p>
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
          No hay personajes para mostrar.
        </section>
      ) : null}

      {status === 'success' && characters.length > 0 ? (
        <CharactersList characters={characters} />
      ) : null}
    </section>
  );
}

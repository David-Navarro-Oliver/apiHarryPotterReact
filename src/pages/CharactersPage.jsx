import CharactersList from '../features/characters/CharactersList.jsx';
import useCharacters from '../features/characters/useCharacters.js';

export default function CharactersPage() {
  const {
    characters,
    status,
    errorMessage,
    query,
    setQuery,
    house,
    setHouse,
    availableHouses,
    role,
    setRole,
    alive,
    setAlive,
    gender,
    setGender,
    availableGenders,
    species,
    setSpecies,
    availableSpecies,
    favoritesOnly,
    setFavoritesOnly,
    toggleFavorite,
    isFavorite,
  } = useCharacters();

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <header className="card" style={{ padding: 18, display: 'grid', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Personajes</h1>
          <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.72)' }}>
            Explora el universo de Harry Potter.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 10,
            gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
            alignItems: 'end',
          }}
        >
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

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Casa</span>
            <select
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              aria-label="Filtrar por casa"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <option value="all">Todas</option>
              {availableHouses.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Rol</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Filtrar por rol"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <option value="all">Todos</option>
              <option value="student">Estudiante</option>
              <option value="staff">Profesor / Staff</option>
              <option value="unknown">Sin rol</option>
            </select>
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Estado</span>
            <select
              value={alive}
              onChange={(e) => setAlive(e.target.value)}
              aria-label="Filtrar por estado vivo o muerto"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <option value="all">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
            </select>
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Género</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              aria-label="Filtrar por género"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <option value="all">Todos</option>
              {availableGenders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Especie</span>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              aria-label="Filtrar por especie"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <option value="all">Todas</option>
              {availableSpecies.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 2px' }}>
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(e) => setFavoritesOnly(e.target.checked)}
              aria-label="Mostrar solo favoritos"
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Solo favoritos</span>
          </label>
        </div>
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
          No hay resultados con los filtros actuales.
        </section>
      ) : null}

      {status === 'success' && characters.length > 0 ? (
        <CharactersList
          characters={characters}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ) : null}
    </section>
  );
}

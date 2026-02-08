import CharactersList from '../features/characters/CharactersList.jsx';
import useCharacters from '../features/characters/useCharacters.js';

export default function CharactersPage() {
  const {
    characters,
    totalCount,
    visibleCount,
    canLoadMore,
    loadMore,
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
    <section className="page">
      <header className="card pageHeader">
        <div className="pageHeaderTop">
          <div>
            <h1 className="pageTitle">Personajes</h1>
            <p className="pageSubtitle">Explora el universo de Harry Potter.</p>
          </div>

          {status === 'success' ? (
            <div className="pageMeta">
              Mostrando {Math.min(visibleCount, totalCount)} de {totalCount}
            </div>
          ) : null}
        </div>

        <div className="filtersGrid">
          <label className="field">
            <span className="fieldLabel">Buscar por nombre</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. Harry, Hermione, Snape..."
              aria-label="Buscar personaje por nombre"
              className="control"
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Casa</span>
            <select
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              aria-label="Filtrar por casa"
              className="control"
            >
              <option value="all">Todas</option>
              {availableHouses.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Rol</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Filtrar por rol"
              className="control"
            >
              <option value="all">Todos</option>
              <option value="student">Estudiante</option>
              <option value="staff">Profesor / Staff</option>
              <option value="unknown">Sin rol</option>
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Estado</span>
            <select
              value={alive}
              onChange={(e) => setAlive(e.target.value)}
              aria-label="Filtrar por estado vivo o muerto"
              className="control"
            >
              <option value="all">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Género</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              aria-label="Filtrar por género"
              className="control"
            >
              <option value="all">Todos</option>
              {availableGenders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Especie</span>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              aria-label="Filtrar por especie"
              className="control"
            >
              <option value="all">Todas</option>
              {availableSpecies.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="checkboxField">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(e) => setFavoritesOnly(e.target.checked)}
              aria-label="Mostrar solo favoritos"
              className="checkbox"
            />
            <span className="checkboxLabel">Solo favoritos</span>
          </label>
        </div>
      </header>

      {status === 'loading' ? (
        <section className="card stateCard" aria-live="polite">
          Cargando personajes...
        </section>
      ) : null}

      {status === 'error' ? (
        <section className="card stateCard" role="alert">
          <strong>Ha ocurrido un error.</strong>
          <div className="stateMuted">{errorMessage}</div>
        </section>
      ) : null}

      {status === 'success' && totalCount === 0 ? (
        <section className="card stateCard" aria-live="polite">
          No hay resultados con los filtros actuales.
        </section>
      ) : null}

      {status === 'success' && totalCount > 0 ? (
        <>
          <CharactersList characters={characters} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />

          {canLoadMore ? (
            <div className="loadMoreWrap">
              <button type="button" className="btn loadMoreBtn" onClick={loadMore} aria-label="Cargar más personajes">
                Cargar más
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

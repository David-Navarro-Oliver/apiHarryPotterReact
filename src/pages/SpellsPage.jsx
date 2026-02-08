import SpellsList from '../features/spells/SpellsList.jsx';
import useSpells from '../features/spells/useSpells.js';

export default function SpellsPage() {
  const {
    filtered,
    query,
    setQuery,
    clearQuery,
    canClear,
    status,
    errorMessage,
    totalCount,
    shownCount,
  } = useSpells();

  return (
    <section className="page">
      <header className="card pageHeader">
        <div className="spellsHeaderTop">
          <div>
            <h1 className="pageTitle">Hechizos</h1>
            <p className="pageSubtitle">Busca por nombre y explora el listado completo.</p>
          </div>

          {status === 'success' ? (
            <div className="pageMeta">
              Mostrando {shownCount} de {totalCount}
            </div>
          ) : null}
        </div>

        <div className="spellsControls">
          <label className="field">
            <span className="fieldLabel">Buscar hechizo</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Ej: Accio, Lumos, Expelliarmus..."
              aria-label="Buscar hechizo por nombre o descripción"
              className="control"
            />
          </label>

          <button
            type="button"
            className="btn spellsClearBtn"
            onClick={clearQuery}
            disabled={!canClear}
          >
            Limpiar
          </button>
        </div>

        <div className="spellsStatusLine" aria-live="polite">
          {status === 'loading' ? 'Cargando hechizos…' : null}
          {status === 'error' ? errorMessage : null}
          {status === 'success' && totalCount === 0 ? 'La API no devolvió hechizos.' : null}
          {status === 'success' && totalCount > 0 && shownCount === 0
            ? 'No hay resultados para esa búsqueda.'
            : null}
          {status === 'success' && totalCount > 0 && shownCount > 0
            ? `Mostrando ${shownCount} hechizos.`
            : null}
        </div>
      </header>

      {status === 'loading' ? (
        <section className="card stateCard">
          <div className="spellsSkeleton">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="spellsSkeletonItem" />
            ))}
          </div>
        </section>
      ) : null}

      {status === 'error' ? (
        <section className="card stateCard" role="alert">
          <strong>No se han podido cargar los hechizos.</strong>
          <div className="stateMuted">{errorMessage}</div>
          <div className="spellsErrorActions">
            <button type="button" className="btn" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </section>
      ) : null}

      {status === 'success' && shownCount > 0 ? <SpellsList spells={filtered} /> : null}
    </section>
  );
}

export default function SpellsList({ spells }) {
  return (
    <div className="spellsGrid">
      {spells.map((spell) => {
        const description =
          typeof spell.description === 'string' && spell.description.trim().length > 0
            ? spell.description.trim()
            : '';

        return (
          <article key={spell.id} className="card spellCard">
            <span className="spellLabel">Hechizo</span>
            <h2 className="spellName" title={spell.name}>
              {spell.name}
            </h2>

            {description ? (
              <p className="spellDescription">{description}</p>
            ) : (
              <p className="spellDescription spellDescriptionEmpty">Sin descripción disponible.</p>
            )}
          </article>
        );
      })}
    </div>
  );
}

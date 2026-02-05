import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function SpellsPage() {
  const [spells, setSpells] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        setErrorMsg("");

        const res = await axios.get("https://hp-api.onrender.com/api/spells", {
          timeout: 15000,
        });

        if (cancelled) return;

        const list = Array.isArray(res.data) ? res.data : [];
        const normalized = list
          .map((s) => ({
            id: String(s?.id ?? s?.name ?? Math.random()),
            name: String(s?.name ?? "").trim(),
          }))
          .filter((s) => s.name.length > 0)
          .sort((a, b) => a.name.localeCompare(b.name, "es"));

        setSpells(normalized);
        setStatus("success");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setErrorMsg(
          e?.response?.status
            ? `Error ${e.response.status} al cargar los hechizos.`
            : "No se han podido cargar los hechizos. Revisa tu conexión."
        );
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spells;
    return spells.filter((s) => s.name.toLowerCase().includes(q));
  }, [spells, query]);

  const total = spells.length;
  const shown = filtered.length;

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <header className="card" style={{ padding: 18 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1 }}>Hechizos</h1>
            <span className="badge">{status === "success" ? `${shown} de ${total}` : "HP API"}</span>
          </div>

          <p style={{ margin: 0, color: "var(--muted)" }}>
            Busca por nombre y explora el listado completo.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 10,
              alignItems: "center",
            }}
          >
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Buscar hechizo</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Ej: Accio, Lumos, Expelliarmus..."
                aria-label="Buscar hechizo por nombre"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  outline: "none",
                }}
              />
            </label>

            <button
              type="button"
              className="btn"
              onClick={() => setQuery("")}
              disabled={!query.trim()}
              aria-disabled={!query.trim()}
              style={{
                height: 42,
                opacity: query.trim() ? 1 : 0.6,
                cursor: query.trim() ? "pointer" : "not-allowed",
              }}
            >
              Limpiar
            </button>
          </div>

          <div aria-live="polite" style={{ minHeight: 18, fontSize: 13, color: "var(--muted)" }}>
            {status === "loading" && "Cargando hechizos…"}
            {status === "error" && errorMsg}
            {status === "success" && total === 0 && "La API no devolvió hechizos."}
            {status === "success" && total > 0 && shown === 0 && "No hay resultados para esa búsqueda."}
            {status === "success" && total > 0 && shown > 0 && `Mostrando ${shown} hechizos.`}
          </div>
        </div>
      </header>

      {status === "loading" && (
        <div
          className="card"
          style={{
            padding: 18,
            display: "grid",
            gap: 12,
          }}
        >
          <div style={{ display: "grid", gap: 10 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>No se han podido cargar los hechizos</h2>
            <p style={{ margin: 0, color: "var(--muted)" }}>{errorMsg}</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      )}

      {status === "success" && shown > 0 && (
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {filtered.map((s) => (
            <article
              key={s.id}
              className="card"
              style={{
                padding: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Hechizo</span>
                <strong style={{ fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.name}
                </strong>
              </div>

              <span className="badge" style={{ whiteSpace: "nowrap" }}>
                {s.name.length <= 12 ? "Corto" : s.name.length <= 18 ? "Medio" : "Largo"}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
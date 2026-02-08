import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useCharacters from '../features/characters/useCharacters.js';
import { loadFavorites } from '../utils/storage.js';
import { fetchSpells } from '../services/hpApi.js';

function FeatureCard({ title, text }) {
  return (
    <article className="card" style={{ padding: 16 }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{text}</p>
      </div>
    </article>
  );
}

function StatCard({ label, value }) {
  return (
    <article className="card" style={{ padding: 16 }}>
      <div style={{ display: 'grid', gap: 6 }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</div>
        <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13 }}>{label}</div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const { totalCount: charactersCount, status: charactersStatus } = useCharacters();

  const [spellsCount, setSpellsCount] = useState(null);
  const [spellsStatus, setSpellsStatus] = useState('idle');

  const [favoritesCount, setFavoritesCount] = useState(() => loadFavorites().length);

  const charactersValue =
    charactersStatus === 'success'
      ? String(charactersCount)
      : charactersStatus === 'loading'
        ? '…'
        : '—';

  const spellsValue =
    spellsStatus === 'success' ? String(spellsCount) : spellsStatus === 'loading' ? '…' : '—';

  const favoritesValue = useMemo(() => String(favoritesCount), [favoritesCount]);

  useEffect(() => {
    let isActive = true;

    async function loadSpells() {
      try {
        setSpellsStatus('loading');
        const spells = await fetchSpells();
        if (!isActive) return;
        setSpellsCount(Array.isArray(spells) ? spells.length : 0);
        setSpellsStatus('success');
      } catch {
        if (!isActive) return;
        setSpellsCount(null);
        setSpellsStatus('error');
      }
    }

    loadSpells();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    function refreshFavorites() {
      setFavoritesCount(loadFavorites().length);
    }

    window.addEventListener('focus', refreshFavorites);
    window.addEventListener('storage', refreshFavorites);

    return () => {
      window.removeEventListener('focus', refreshFavorites);
      window.removeEventListener('storage', refreshFavorites);
    };
  }, []);

  return (
    <section style={{ display: 'grid', gap: 18 }}>
      <article className="card" style={{ padding: 24 }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge">React + Axios + HP API</span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: 34, letterSpacing: '-0.02em' }}>
              Enciclopedia Mágica
            </h1>
            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: '70ch',
                lineHeight: 1.7,
              }}
            >
              Explora personajes y hechizos con búsqueda, filtros, favoritos y un diseño accesible.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn" to="/characters">
              Ver personajes
            </Link>
            <Link className="btn" to="/spells">
              Ver hechizos
            </Link>
          </div>
        </div>
      </article>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ margin: '6px 0 0', fontSize: 18 }}>Qué puedes hacer</h2>

        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          <FeatureCard
            title="Búsqueda y filtros"
            text="Encuentra personajes y hechizos fácilmente usando búsquedas claras y filtros rápidos."
          />
          <FeatureCard
            title="Favoritos"
            text="Guarda tus personajes y hechizos favoritos para tenerlos siempre a mano."
          />
          <FeatureCard
            title="Accesible"
            text="Una experiencia cómoda y clara, pensada para todo tipo de usuarios."
          />
          <FeatureCard
            title="Diseño adaptable"
            text="Una interfaz que se adapta de forma natural a cualquier dispositivo."
          />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h2 style={{ margin: '6px 0 0', fontSize: 18 }}>Resumen rápido</h2>

        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          <StatCard label="Personajes disponibles" value={charactersValue} />
          <StatCard label="Hechizos disponibles" value={spellsValue} />
          <StatCard label="Favoritos guardados" value={favoritesValue} />
        </div>
      </section>
    </section>
  );
}

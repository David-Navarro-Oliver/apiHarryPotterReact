import { useEffect, useMemo, useState } from 'react';
import { fetchSpells } from '../../services/hpApi.js';

export default function useSpells() {
  const [spells, setSpells] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isActive = true;

    async function run() {
      try {
        setStatus('loading');
        setErrorMessage('');

        const list = await fetchSpells();

        if (!isActive) return;

        const normalized = Array.isArray(list) ? list : [];
        const sorted = normalized
          .filter((s) => typeof s?.name === 'string' && s.name.trim().length > 0)
          .sort((a, b) => a.name.localeCompare(b.name, 'es'));

        setSpells(sorted);
        setStatus('success');
      } catch (err) {
        if (!isActive) return;

        const msg =
          err && typeof err === 'object' && 'message' in err && typeof err.message === 'string'
            ? err.message
            : 'No se han podido cargar los hechizos. Revisa tu conexión.';

        setStatus('error');
        setErrorMessage(msg);
        setSpells([]);
      }
    }

    run();

    return () => {
      isActive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spells;

    return spells.filter((s) => {
      const name = typeof s?.name === 'string' ? s.name.toLowerCase() : '';
      const desc = typeof s?.description === 'string' ? s.description.toLowerCase() : '';
      return name.includes(q) || desc.includes(q);
    });
  }, [spells, query]);

  const totalCount = spells.length;
  const shownCount = filtered.length;

  const canClear = query.trim().length > 0;

  function clearQuery() {
    setQuery('');
  }

  return {
    spells,
    filtered,
    query,
    setQuery,
    clearQuery,
    canClear,
    status,
    errorMessage,
    totalCount,
    shownCount,
  };
}

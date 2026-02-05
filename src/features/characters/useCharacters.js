import { useEffect, useMemo, useState } from 'react';
import { fetchCharacters } from '../../services/hpApi.js';

export default function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let isActive = true;

    async function load() {
      try {
        setStatus('loading');
        setErrorMessage('');
        const data = await fetchCharacters();
        if (!isActive) return;
        setCharacters(data);
        setStatus('success');
      } catch (error) {
        if (!isActive) return;
        setStatus('error');
        setErrorMessage(error?.message ? String(error.message) : 'Error al cargar personajes');
      }
    }

    load();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredCharacters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return characters;
    return characters.filter((c) => c.name.toLowerCase().includes(q));
  }, [characters, query]);

  return {
    characters: filteredCharacters,
    status,
    errorMessage,
    query,
    setQuery,
  };
}

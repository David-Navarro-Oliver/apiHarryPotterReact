import { useEffect, useMemo, useState } from 'react';
import { fetchCharacters } from '../../services/hpApi.js';

export default function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [house, setHouse] = useState('all');
  const [role, setRole] = useState('all');

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

  const availableHouses = useMemo(() => {
    const houses = new Set();

    characters.forEach((c) => {
      if (c.house) houses.add(c.house);
    });

    return Array.from(houses).sort((a, b) => a.localeCompare(b));
  }, [characters]);

  const filteredCharacters = useMemo(() => {
    const q = query.trim().toLowerCase();

    return characters.filter((c) => {
      const matchesQuery = q ? c.name.toLowerCase().includes(q) : true;
      const matchesHouse = house === 'all' ? true : c.house === house;
      const matchesRole = role === 'all' ? true : c.role === role;

      return matchesQuery && matchesHouse && matchesRole;
    });
  }, [characters, query, house, role]);

  return {
    characters: filteredCharacters,
    status,
    errorMessage,
    query,
    setQuery,
    house,
    setHouse,
    availableHouses,
    role,
    setRole,
  };
}

import { useEffect, useMemo, useState } from 'react';
import { fetchCharacters } from '../../services/hpApi.js';
import { loadFavorites, saveFavorites } from '../../utils/storage.js';

export default function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [house, setHouse] = useState('all');
  const [role, setRole] = useState('all');
  const [alive, setAlive] = useState('all');
  const [gender, setGender] = useState('all');
  const [species, setSpecies] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(() => loadFavorites());

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

  useEffect(() => {
    saveFavorites(favoriteIds);
  }, [favoriteIds]);

  const availableHouses = useMemo(() => {
    const houses = new Set();
    characters.forEach((c) => {
      if (c.house) houses.add(c.house);
    });
    return Array.from(houses).sort((a, b) => a.localeCompare(b));
  }, [characters]);

  const availableGenders = useMemo(() => {
    const genders = new Set();
    characters.forEach((c) => {
      if (c.gender) genders.add(c.gender);
    });
    return Array.from(genders).sort((a, b) => a.localeCompare(b));
  }, [characters]);

  const availableSpecies = useMemo(() => {
    const speciesSet = new Set();
    characters.forEach((c) => {
      if (c.species) speciesSet.add(c.species);
    });
    return Array.from(speciesSet).sort((a, b) => a.localeCompare(b));
  }, [characters]);

  function toggleFavorite(id) {
    const stringId = String(id);
    setFavoriteIds((prev) => {
      if (prev.includes(stringId)) return prev.filter((x) => x !== stringId);
      return [...prev, stringId];
    });
  }

  function isFavorite(id) {
    return favoriteIds.includes(String(id));
  }

  const filteredCharacters = useMemo(() => {
    const q = query.trim().toLowerCase();

    return characters.filter((c) => {
      const matchesQuery = q ? c.name.toLowerCase().includes(q) : true;
      const matchesHouse = house === 'all' ? true : c.house === house;
      const matchesRole = role === 'all' ? true : c.role === role;

      const matchesAlive =
        alive === 'all'
          ? true
          : alive === 'alive'
          ? c.alive === true
          : c.alive === false;

      const matchesGender = gender === 'all' ? true : c.gender === gender;
      const matchesSpecies = species === 'all' ? true : c.species === species;

      const matchesFavorites = favoritesOnly ? isFavorite(c.id) : true;

      return (
        matchesQuery &&
        matchesHouse &&
        matchesRole &&
        matchesAlive &&
        matchesGender &&
        matchesSpecies &&
        matchesFavorites
      );
    });
  }, [characters, query, house, role, alive, gender, species, favoritesOnly, favoriteIds]);

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
  };
}

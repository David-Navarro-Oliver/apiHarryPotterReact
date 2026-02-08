import { useEffect, useState } from 'react';
import { fetchCharacterById } from '../../services/hpApi.js';
import { loadFavorites, saveFavorites } from '../../utils/storage.js';

export default function useCharacterById(characterId) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [character, setCharacter] = useState(null);

  const [favoriteIds, setFavoriteIds] = useState(() => loadFavorites());

  useEffect(() => {
    saveFavorites(favoriteIds);
  }, [favoriteIds]);

  function toggleFavorite(id) {
    const stringId = String(id);
    setFavoriteIds((prev) => (prev.includes(stringId) ? prev.filter((x) => x !== stringId) : [...prev, stringId]));
  }

  function isFavorite(id) {
    return favoriteIds.includes(String(id));
  }

  useEffect(() => {
    let isActive = true;

    async function run() {
      if (!characterId) {
        setStatus('error');
        setErrorMessage('ID no válido.');
        setCharacter(null);
        return;
      }

      setStatus('loading');
      setErrorMessage('');
      setCharacter(null);

      try {
        const fresh = await fetchCharacterById(characterId);

        if (!isActive) return;

        setCharacter(fresh);
        setStatus('success');
      } catch (err) {
        if (!isActive) return;

        const msg =
          err && typeof err === 'object' && 'message' in err && typeof err.message === 'string'
            ? err.message
            : 'No se pudo cargar el personaje.';

        setStatus('error');
        setErrorMessage(msg);
        setCharacter(null);
      }
    }

    run();

    return () => {
      isActive = false;
    };
  }, [characterId]);

  return {
    status,
    errorMessage,
    character,
    toggleFavorite,
    isFavorite,
  };
}

import { useEffect, useMemo, useState } from 'react';
import useCharacters from './useCharacters.js';
import { fetchCharacterById } from '../../services/hpApi.js';

export default function useCharacterById(characterId) {
  const base = useCharacters();

  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [character, setCharacter] = useState(null);

  const cached = useMemo(() => {
    if (!characterId) return null;
    return base.allCharacters.find((c) => String(c.id) === String(characterId)) ?? null;
  }, [base.allCharacters, characterId]);

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

      try {
        if (cached) {
          setCharacter(cached);
          setStatus('success');
        }

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
  }, [characterId, cached]);

  return {
    ...base,
    status,
    errorMessage,
    character,
  };
}

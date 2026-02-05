import { useMemo } from 'react';
import useCharacters from './useCharacters.js';

export default function useCharacterById(characterId) {
  const base = useCharacters();

  const character = useMemo(() => {
    if (!characterId) return null;
    return base.allCharacters.find((c) => String(c.id) === String(characterId)) ?? null;
  }, [base.allCharacters, characterId]);

  return {
    ...base,
    character,
  };
}

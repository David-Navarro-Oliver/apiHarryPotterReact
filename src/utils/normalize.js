const FALLBACK_IMAGE = 'https://via.placeholder.com/600x800.png?text=Enciclopedia+Magica';

export function normalizeCharacter(raw) {
  const id = raw?.id ? String(raw.id) : crypto.randomUUID();

  const name = typeof raw?.name === 'string' ? raw.name.trim() : 'Desconocido';
  const house = typeof raw?.house === 'string' ? raw.house.trim() : '';
  const gender = typeof raw?.gender === 'string' ? raw.gender.trim() : '';
  const species = typeof raw?.species === 'string' ? raw.species.trim() : '';
  const alive = typeof raw?.alive === 'boolean' ? raw.alive : null;

  const hogwartsStudent = Boolean(raw?.hogwartsStudent);
  const hogwartsStaff = Boolean(raw?.hogwartsStaff);

  const role = hogwartsStudent ? 'student' : hogwartsStaff ? 'staff' : 'unknown';

  const imageUrl =
    typeof raw?.image === 'string' && raw.image.trim().length > 0 ? raw.image.trim() : FALLBACK_IMAGE;

  return {
    id,
    name,
    house,
    gender,
    species,
    alive,
    role,
    hogwartsStudent,
    hogwartsStaff,
    imageUrl,
  };
}

export function normalizeSpell(raw) {
  const id = raw?.id ? String(raw.id) : crypto.randomUUID();
  const name = typeof raw?.name === 'string' ? raw.name.trim() : 'Hechizo';
  const description = typeof raw?.description === 'string' ? raw.description.trim() : '';

  return { id, name, description };
}

const FALLBACK_IMAGE = '';

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function cleanNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function cleanArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => cleanString(v))
    .filter((v) => v.length > 0);
}

function cleanBoolean(value) {
  return typeof value === 'boolean' ? value : null;
}

function normalizeWand(rawWand) {
  const wood = cleanString(rawWand?.wood);
  const core = cleanString(rawWand?.core);
  const length = cleanNumber(rawWand?.length);

  const hasAny = wood.length > 0 || core.length > 0 || length !== null;

  return hasAny ? { wood, core, length } : null;
}

export function normalizeCharacter(raw) {
  const id = raw?.id ? String(raw.id) : crypto.randomUUID();

  const name = cleanString(raw?.name) || 'Desconocido';
  const house = cleanString(raw?.house);
  const gender = cleanString(raw?.gender);
  const species = cleanString(raw?.species);
  const alive = cleanBoolean(raw?.alive);

  const hogwartsStudent = Boolean(raw?.hogwartsStudent);
  const hogwartsStaff = Boolean(raw?.hogwartsStaff);

  const role = hogwartsStudent ? 'student' : hogwartsStaff ? 'staff' : 'unknown';
  const school = hogwartsStudent || hogwartsStaff ? 'Hogwarts' : '';

  const imageUrl = cleanString(raw?.image) || FALLBACK_IMAGE;

  const actor = cleanString(raw?.actor);
  const ancestry = cleanString(raw?.ancestry);
  const patronus = cleanString(raw?.patronus);
  const dateOfBirth = cleanString(raw?.dateOfBirth);
  const yearOfBirth = typeof raw?.yearOfBirth === 'number' ? raw.yearOfBirth : null;
  const eyeColour = cleanString(raw?.eyeColour);
  const hairColour = cleanString(raw?.hairColour);

  const alternateNames = cleanArray(raw?.alternate_names);
  const alternateActors = cleanArray(raw?.alternate_actors);

  const wand = normalizeWand(raw?.wand);

  return {
    id,
    name,
    house,
    gender,
    species,
    alive,
    role,
    school,
    hogwartsStudent,
    hogwartsStaff,
    imageUrl,
    actor,
    ancestry,
    patronus,
    dateOfBirth,
    yearOfBirth,
    eyeColour,
    hairColour,
    alternateNames,
    alternateActors,
    wand,
  };
}

export function normalizeSpell(raw) {
  const id = raw?.id ? String(raw.id) : crypto.randomUUID();
  const name = cleanString(raw?.name) || 'Hechizo';
  const description = cleanString(raw?.description);

  return { id, name, description };
}

import { httpClient } from './httpClient.js';
import { normalizeCharacter, normalizeSpell } from '../utils/normalize.js';

export async function fetchCharacters() {
  const { data } = await httpClient.get('/api/characters');
  return Array.isArray(data) ? data.map(normalizeCharacter) : [];
}

export async function fetchCharacterById(id) {
  const { data } = await httpClient.get(`/api/character/${id}`);

  const raw = Array.isArray(data) ? data[0] : data;

  if (!raw || typeof raw !== 'object') {
    throw new Error('No se pudo cargar el personaje.');
  }

  return normalizeCharacter(raw);
}

export async function fetchStudents() {
  const { data } = await httpClient.get('/api/characters/students');
  return Array.isArray(data) ? data.map(normalizeCharacter) : [];
}

export async function fetchStaff() {
  const { data } = await httpClient.get('/api/characters/staff');
  return Array.isArray(data) ? data.map(normalizeCharacter) : [];
}

export async function fetchCharactersByHouse(house) {
  const { data } = await httpClient.get(`/api/characters/house/${house}`);
  return Array.isArray(data) ? data.map(normalizeCharacter) : [];
}

export async function fetchSpells() {
  const { data } = await httpClient.get('/api/spells');
  return Array.isArray(data) ? data.map(normalizeSpell) : [];
}

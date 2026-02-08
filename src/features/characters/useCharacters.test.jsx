import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import useCharacters from './useCharacters.js';

vi.mock('../../services/hpApi.js', () => {
  return {
    fetchCharacters: vi.fn(),
  };
});

import { fetchCharacters } from '../../services/hpApi.js';

function HookHarness() {
  const h = useCharacters();

  return (
    <div>
      <div data-testid="status">{h.status}</div>
      <div data-testid="error">{h.errorMessage}</div>

      <div data-testid="totalCount">{h.totalCount}</div>
      <div data-testid="visibleCount">{h.visibleCount}</div>
      <div data-testid="canLoadMore">{String(h.canLoadMore)}</div>

      <label>
        Query
        <input aria-label="query" value={h.query} onChange={(e) => h.setQuery(e.target.value)} />
      </label>

      <button type="button" onClick={() => h.setHouse('Gryffindor')}>
        setHouseGryffindor
      </button>
      <button type="button" onClick={() => h.setRole('student')}>
        setRoleStudent
      </button>
      <button type="button" onClick={() => h.setAlive('alive')}>
        setAliveAlive
      </button>
      <button type="button" onClick={() => h.setFavoritesOnly(true)}>
        setFavoritesOnly
      </button>

      <button type="button" onClick={h.loadMore} disabled={!h.canLoadMore}>
        loadMore
      </button>

      <ul data-testid="list">
        {h.characters.map((c) => (
          <li key={c.id} data-testid="item">
            <span data-testid={`name-${c.id}`}>{c.name}</span>
            <span data-testid={`fav-${c.id}`}>{String(h.isFavorite(c.id))}</span>
            <button type="button" onClick={() => h.toggleFavorite(c.id)}>
              toggleFav-{c.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const MOCK_CHARACTERS = [
  {
    id: '1',
    name: 'Harry Potter',
    house: 'Gryffindor',
    role: 'student',
    alive: true,
    gender: 'male',
    species: 'human',
  },
  {
    id: '2',
    name: 'Severus Snape',
    house: 'Slytherin',
    role: 'staff',
    alive: false,
    gender: 'male',
    species: 'human',
  },
  {
    id: '3',
    name: 'Hermione Granger',
    house: 'Gryffindor',
    role: 'student',
    alive: true,
    gender: 'female',
    species: 'human',
  },
];

describe('useCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('loads characters and reaches success', async () => {
    fetchCharacters.mockResolvedValueOnce(MOCK_CHARACTERS);

    render(<HookHarness />);

    await waitFor(() => {
      expect(['loading', 'success']).toContain(screen.getByTestId('status').textContent);
    });

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('success');
    });

    expect(screen.getAllByTestId('item')).toHaveLength(3);
    expect(screen.getByTestId('totalCount').textContent).toBe('3');
  });

  it('filters by query + house + role + alive', async () => {
    fetchCharacters.mockResolvedValueOnce(MOCK_CHARACTERS);

    render(<HookHarness />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('success');
    });

    expect(screen.getAllByTestId('item')).toHaveLength(3);

    fireEvent.click(screen.getByText('setHouseGryffindor'));
    await waitFor(() => expect(screen.getAllByTestId('item')).toHaveLength(2));

    fireEvent.click(screen.getByText('setRoleStudent'));
    await waitFor(() => expect(screen.getAllByTestId('item')).toHaveLength(2));

    fireEvent.click(screen.getByText('setAliveAlive'));
    await waitFor(() => expect(screen.getAllByTestId('item')).toHaveLength(2));

    fireEvent.change(screen.getByLabelText('query'), { target: { value: 'her' } });
    await waitFor(() => expect(screen.getAllByTestId('item')).toHaveLength(1));

    expect(screen.getByTestId('name-3').textContent).toBe('Hermione Granger');
  });

  it('favorites persist to localStorage and favoritesOnly filters', async () => {
    fetchCharacters.mockResolvedValueOnce(MOCK_CHARACTERS);

    render(<HookHarness />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('success');
    });

    fireEvent.click(screen.getByText('toggleFav-1'));

    await waitFor(() => {
      expect(screen.getByTestId('fav-1').textContent).toBe('true');
    });

    const stored = JSON.parse(localStorage.getItem('hpFavorites') ?? '[]');
    expect(stored).toEqual(['1']);

    fireEvent.click(screen.getByText('setFavoritesOnly'));
    await waitFor(() => expect(screen.getAllByTestId('item')).toHaveLength(1));
    expect(screen.getByTestId('name-1').textContent).toBe('Harry Potter');
  });

  it('sets error status when API fails', async () => {
    fetchCharacters.mockRejectedValueOnce(new Error('Boom'));

    render(<HookHarness />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('error');
    });

    expect(screen.getByTestId('error').textContent).not.toBe('');
    expect(screen.queryAllByTestId('item')).toHaveLength(0);
  });

  it('loadMore increases visibleCount and canLoadMore changes', async () => {
    const many = Array.from({ length: 25 }).map((_, i) => ({
      id: String(i + 1),
      name: `Character ${i + 1}`,
      house: i % 2 === 0 ? 'Gryffindor' : 'Slytherin',
      role: i % 3 === 0 ? 'student' : 'staff',
      alive: i % 4 !== 0,
      gender: 'male',
      species: 'human',
    }));

    fetchCharacters.mockResolvedValueOnce(many);

    render(<HookHarness />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('success');
    });

    const initialVisible = Number(screen.getByTestId('visibleCount').textContent);
    expect(initialVisible).toBeGreaterThan(0);

    const initialItems = screen.getAllByTestId('item').length;
    expect(initialItems).toBe(initialVisible);

    expect(screen.getByTestId('canLoadMore').textContent).toBe('true');

    fireEvent.click(screen.getByText('loadMore'));

    await waitFor(() => {
      const nextVisible = Number(screen.getByTestId('visibleCount').textContent);
      expect(nextVisible).toBeGreaterThan(initialVisible);
    });

    const nextItems = screen.getAllByTestId('item').length;
    const nextVisible = Number(screen.getByTestId('visibleCount').textContent);
    expect(nextItems).toBe(nextVisible);
  });

  it('rehydrates favorites from localStorage on init', async () => {
    localStorage.setItem('hpFavorites', JSON.stringify(['2']));

    fetchCharacters.mockResolvedValueOnce(MOCK_CHARACTERS);

    render(<HookHarness />);

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('success');
    });

    expect(screen.getByTestId('fav-2').textContent).toBe('true');

    fireEvent.click(screen.getByText('setFavoritesOnly'));
    await waitFor(() => expect(screen.getAllByTestId('item')).toHaveLength(1));

    expect(screen.getByTestId('name-2').textContent).toBe('Severus Snape');
  });
});

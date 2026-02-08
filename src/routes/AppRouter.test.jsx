import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import AppRouter from './AppRouter.jsx';

vi.mock('../layouts/AppLayout.jsx', () => ({
  default: () => (
    <div data-testid="layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('../pages/HomePage.jsx', () => ({
  default: () => <h1>HomePage</h1>,
}));

vi.mock('../pages/CharactersPage.jsx', () => ({
  default: () => <h1>CharactersPage</h1>,
}));

vi.mock('../pages/CharacterDetailPage.jsx', () => ({
  default: () => <h1>CharacterDetailPage</h1>,
}));

vi.mock('../pages/SpellsPage.jsx', () => ({
  default: () => <h1>SpellsPage</h1>,
}));

vi.mock('../pages/NotFoundPage.jsx', () => ({
  default: () => <h1>NotFoundPage</h1>,
}));

function goTo(path) {
  window.history.pushState({}, '', path);
}

describe('AppRouter', () => {
  beforeEach(() => {
    goTo('/');
  });

  it('renders HomePage on "/"', () => {
    goTo('/');
    render(<AppRouter />);
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });

  it('renders CharactersPage on "/characters"', () => {
    goTo('/characters');
    render(<AppRouter />);
    expect(screen.getByText('CharactersPage')).toBeInTheDocument();
  });

  it('renders CharacterDetailPage on "/characters/:id"', () => {
    goTo('/characters/1');
    render(<AppRouter />);
    expect(screen.getByText('CharacterDetailPage')).toBeInTheDocument();
  });

  it('renders SpellsPage on "/spells"', () => {
    goTo('/spells');
    render(<AppRouter />);
    expect(screen.getByText('SpellsPage')).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    goTo('/esto-no-existe');
    render(<AppRouter />);
    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });
});

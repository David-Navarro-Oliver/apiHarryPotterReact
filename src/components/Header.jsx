import { NavLink } from 'react-router-dom';

const linkBaseStyle = {
  padding: '10px 12px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  transition: 'transform 120ms ease, border-color 120ms ease, background 120ms ease',
};

export default function Header() {
  const getLinkStyle = ({ isActive }) => ({
    ...linkBaseStyle,
    borderColor: isActive ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.12)',
    background: isActive ? 'rgba(212,175,55,0.10)' : 'rgba(255,255,255,0.06)',
  });

  return (
    <header style={{ position: 'sticky', top: 0, backdropFilter: 'blur(10px)', zIndex: 10 }}>
      <div
        className="container"
        style={{
          padding: '14px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <a href="/" className="badge" style={{ fontSize: 13 }}>
          Enciclopedia Mágica
        </a>

        <nav
          aria-label="Navegación principal"
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
        >
          <NavLink to="/" style={getLinkStyle}>
            Inicio
          </NavLink>
          <NavLink to="/characters" style={getLinkStyle}>
            Personajes
          </NavLink>
          <NavLink to="/spells" style={getLinkStyle}>
            Hechizos
          </NavLink>
        </nav>
      </div>
      <div
        aria-hidden="true"
        style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)',
        }}
      />
    </header>
  );
}

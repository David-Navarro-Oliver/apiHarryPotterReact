import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="container mainContent">
        <Outlet />
      </main>
    </>
  );
}

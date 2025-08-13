import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '@/services/axios';
import {
  NavbarContainer,
  Logo,
  MenuButton,
  DropdownMenu,
  MenuItem,
  Overlay,
} from '@/styles/navbar.styles';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faCashRegister,
  faBox,
  faCog,
  faRightToBracket,
  faUsers,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const routes = {
  home: '/dashboard',
  sales: '/sales',
  inventory: '/inventory',
  users: '/users',
  reports: '/reports',
  profile: '/profile',
};

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    router.events.on('routeChangeStart', closeMenu);
    return () => router.events.off('routeChangeStart', closeMenu);
  }, [router.events]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get('/users/me', { withCredentials: true });
        setUserRole(res.data.role);
      } catch (err) {
        console.error('Error al obtener rol de usuario:', err);
      }
    };

    fetchUserRole();
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    setTimeout(() => router.push(path), 100);
  };

  const handleLogout = async () => {
    setNotification({ message: 'Cerrando sesión...', type: 'success' });
    setMenuOpen(false);
    try {
      await axios.post('/users/logout', {}, { withCredentials: true });
      setTimeout(() => {
        setNotification({ message: '', type: '' });
        router.push('/login');
      }, 3000);
    } catch (error) {
      setNotification({
        message: error.response?.data?.msg || 'Error al cerrar sesión',
        type: 'error',
      });
    }
  };

  return (
    <>
      <NavbarContainer>
        <Logo>Techno POS</Logo>
        <MenuButton
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-expanded={menuOpen}
          menuOpen={menuOpen}
        >
          <FontAwesomeIcon icon={faBars} />
        </MenuButton>
      </NavbarContainer>
      {menuOpen && (
        <>
          <DropdownMenu role="menu" aria-label="Menú de navegación">
            <MenuItem
              active={router.pathname === routes.home}
              onClick={() => handleNavigate(routes.home)}
            >
              <FontAwesomeIcon icon={faHome} /> <span>Inicio</span>
            </MenuItem>
            <MenuItem
              active={router.pathname === routes.sales}
              onClick={() => handleNavigate(routes.sales)}
            >
              <FontAwesomeIcon icon={faCashRegister} /> <span>Ventas</span>
            </MenuItem>
            <MenuItem
              active={router.pathname === routes.inventory}
              onClick={() => handleNavigate(routes.inventory)}
            >
              <FontAwesomeIcon icon={faBox} /> <span>Inventario</span>
            </MenuItem>
            {userRole && userRole !== 'seller' && (
              <>
                <MenuItem
                  active={router.pathname === routes.users}
                  onClick={() => handleNavigate(routes.users)}
                >
                  <FontAwesomeIcon icon={faUsers} /> <span>Usuarios</span>
                </MenuItem>
                <MenuItem
                  active={router.pathname === routes.reports}
                  onClick={() => handleNavigate(routes.reports)}
                >
                  <FontAwesomeIcon icon={faChartLine} /> <span>Reportes</span>
                </MenuItem>
              </>
            )}

            <MenuItem
              active={router.pathname === routes.profile}
              onClick={() => handleNavigate(routes.profile)}
            >
              <FontAwesomeIcon icon={faCog} /> <span>Configuración de Perfil</span>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightToBracket} /> <span>Cerrar Sesión</span>
            </MenuItem>
          </DropdownMenu>
          <Overlay onClick={() => setMenuOpen(false)} aria-hidden="true" />
        </>
      )}
      <Notification message={notification.message} type={notification.type} />
    </>
  );
}
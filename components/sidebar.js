import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '@/services/axios';
import { 
  SidebarContainer, 
  Title, 
  Separator, 
  MenuItem 
} from '@/styles/sidebar.styles';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCashRegister, faBox, faCog, faRightToBracket, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';

const routes = {
  home: '/dashboard',
  sales: '/sales',
  inventory: '/inventory',
  users: '/users',
  reports: '/reports',
  profile: '/profile',
};

export default function Sidebar() {
  const router = useRouter();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('/users/me', { withCredentials: true });
        setUserRole(res.data.role);
      } catch (error) {
        setUserRole(null);
      }
    };

    fetchUserProfile();
  }, []);

  const navigate = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/users/logout', {}, { withCredentials: true });
      router.push('/login');
    } catch {
      setNotification({ message: 'Error al cerrar sesión', type: 'error' });
    }
  };

  const onLogoutClick = () => {
    setNotification({ message: 'Cerrando sesión...', type: 'success' });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
      handleLogout();
    }, 3000);
  };

  return (
    <>
      <SidebarContainer>
        <Title>Techno POS</Title>
        <Separator />
        <MenuItem active={router.pathname === routes.home} onClick={() => navigate(routes.home)}>
          <FontAwesomeIcon icon={faHome} />
          <span>Inicio</span>
        </MenuItem>
        <Separator />
        <MenuItem active={router.pathname === routes.sales} onClick={() => navigate(routes.sales)}>
          <FontAwesomeIcon icon={faCashRegister} />
          <span>Ventas</span>
        </MenuItem>
        <Separator />
        <MenuItem active={router.pathname === routes.inventory} onClick={() => navigate(routes.inventory)}>
          <FontAwesomeIcon icon={faBox} />
          <span>Inventario</span>
        </MenuItem>
        <Separator />

        {userRole === 'admin' && (
          <>
            <MenuItem active={router.pathname === routes.users} onClick={() => navigate(routes.users)}>
              <FontAwesomeIcon icon={faUsers} />
              <span>Usuarios</span>
            </MenuItem>
            <Separator />
            <MenuItem active={router.pathname === routes.reports} onClick={() => navigate(routes.reports)}>
              <FontAwesomeIcon icon={faChartLine} />
              <span>Reportes</span>
            </MenuItem>
            <Separator />
          </>
        )}

        <MenuItem active={router.pathname === routes.profile} onClick={() => navigate(routes.profile)}>
          <FontAwesomeIcon icon={faCog} />
          <span>Configuración de Perfil</span>
        </MenuItem>
        <Separator />
        <MenuItem onClick={onLogoutClick}>
          <FontAwesomeIcon icon={faRightToBracket} />
          <span>Cerrar Sesión</span>
        </MenuItem>
        <Separator />
      </SidebarContainer>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </>
  );
}
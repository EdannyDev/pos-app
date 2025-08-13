import { useState, useEffect } from 'react';
import axios from '@/services/axios';
import {
  Container,
  Title,
  Form,
  FormGroup,
  PasswordInputWrapper,
  Separator,
  ActionButtons,
  UserRole,
  DescriptionWrapper,
  DescriptionText
} from '@/styles/profile.styles';
import Modal from '@/components/modal';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSave, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get('/users/me', { withCredentials: true });
        setUser(res.data);
        setFormName(res.data.name);
        setFormEmail(res.data.email);
      } catch (error) {
        showNotification(error.response?.data?.msg || 'Error al cargar perfil', 'error');
      }
    }
    fetchProfile();
  }, []);

  const showNotification = (message, type = 'success', duration = 3000, callback) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: 'success' });
      if (callback) callback();
    }, duration);
  };

  const logout = async () => {
    try {
      await axios.post('/users/logout', {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      showNotification('Nombre y correo son obligatorios', 'error');
      return;
    }

    try {
      const payload = { name: formName, email: formEmail };
      const isPasswordChanged = formPassword.trim().length > 0;

      if (isPasswordChanged) payload.password = formPassword;

      await axios.put(`/users/profile/${user._id}`, payload, { withCredentials: true });

      if (isPasswordChanged) {
        showNotification('Contraseña cambiada correctamente. Cerrando sesión...', 'success', 3000, () => {
          logout();
        });
      } else {
        showNotification('Perfil actualizado correctamente');
      }
      setFormPassword('');
      setShowPassword(false);
    } catch (error) {
      showNotification(error.response?.data?.msg || 'Error al actualizar perfil', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/profile/${user._id}`, { withCredentials: true });
      showNotification('Cuenta eliminada correctamente', 'success', 3000, () => {
        window.location.href = '/login';
      });
    } catch (error) {
      showNotification(error.response?.data?.msg || 'Error al eliminar cuenta', 'error');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      <Title>Configuración de Perfil</Title>
      <Notification message={notification.message} type={notification.type} />

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            placeholder="Nombre"
            autoFocus
          />
          <DescriptionWrapper>
            <DescriptionText>Nombre completo para tu perfil.</DescriptionText>
          </DescriptionWrapper>
        </FormGroup>

        <Separator />

        <FormGroup>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            required
            placeholder="Correo electrónico"
          />
          <DescriptionWrapper>
            <DescriptionText>Correo de acceso al sistema POS.</DescriptionText>
          </DescriptionWrapper>
        </FormGroup>

        <Separator />

        <FormGroup>
          <PasswordInputWrapper>
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              placeholder="Nueva contraseña"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-icon"
              title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            />
          </PasswordInputWrapper>
          <DescriptionWrapper>
            <DescriptionText>Crea una nueva contraseña de acceso al sistema.</DescriptionText>
          </DescriptionWrapper>
        </FormGroup>

        {user && (
          <>
            <Separator />
            <FormGroup>
              <UserRole>Rol asignado: <strong>{user.role}</strong></UserRole>
              <DescriptionWrapper>
                <DescriptionText>Rol asignado por el sistema. <span style={{ color: 'red' }}>NO</span> es editable.</DescriptionText>
              </DescriptionWrapper>
            </FormGroup>
          </>
        )}

        <Separator />

        <ActionButtons>
          <button type="submit">
            <FontAwesomeIcon icon={faSave} /> Guardar Cambios
          </button>
          <button type="button" className="delete" onClick={openModal}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar Cuenta
          </button>
        </ActionButtons>
      </Form>

      {isModalOpen && (
        <Modal
          message="¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
          onConfirm={() => {
            handleDelete();
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </Container>
  );
}
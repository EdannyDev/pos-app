import { useState, useEffect } from 'react';
import axios from '@/services/axios';
import {
  UsersContainer,
  Title,
  Table,
  PaginationWrapper,
  PageButton,
  ActionButtons,
  Form,
  FormGroup,
  SearchWrapper,
  SearchInputWrapper,
  TableWrapper,
} from '@/styles/users.styles';
import Modal from '@/components/modal';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function UserManagement() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('seller');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await axios.get('/users/me', { withCredentials: true });
        setUser(resUser.data);

        const resUsers = await axios.get('/users/list', { withCredentials: true });
        setUsers(resUsers.data || []);
      } catch (err) {
        showNotification(err.response?.data?.msg || 'Error al cargar datos', 'error');
      }
    }
    fetchData();
  }, []);

  const showNotification = (message, type = 'success', duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: 'success' }), duration);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormName('');
    setFormEmail('');
    setFormRole('seller');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formRole.trim()) {
      showNotification('Por favor llena todos los campos', 'error');
      return;
    }

    try {
      await axios.put(`/users/update/${editingUser._id}`, 
        { name: formName, email: formEmail, role: formRole },
        { withCredentials: true }
      );
      showNotification('Usuario actualizado correctamente');
      resetForm();
      const resUsers = await axios.get('/users/list', { withCredentials: true });
      setUsers(resUsers.data || []);
    } catch (err) {
      showNotification(err.response?.data?.msg || 'Error al actualizar usuario', 'error');
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setIsModalOpen(false);

    try {
      await axios.delete(`/users/delete/${userToDelete}`, { withCredentials: true });
      showNotification('Usuario eliminado correctamente');
      const resUsers = await axios.get('/users/list', { withCredentials: true });
      setUsers(resUsers.data || []);
      if (editingUser?._id === userToDelete) resetForm();
      setUserToDelete(null);
    } catch (err) {
      showNotification(err.response?.data?.msg || 'Error al eliminar usuario', 'error');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(filterText.toLowerCase()) ||
    u.email.toLowerCase().includes(filterText.toLowerCase()) ||
    u.role.toLowerCase().includes(filterText.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const isAdmin = user?.role === 'admin';

  return (
    <UsersContainer>
      <Title>Gestión de Usuarios</Title>
      <Notification message={notification.message} type={notification.type} />

      {editingUser && (
        <Form onSubmit={handleSubmit}>
          <h2>Editar Usuario</h2>
          <FormGroup>
            <label>Nombre</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              autoFocus
            />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Rol</label>
            <select
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </FormGroup>

          <ActionButtons>
            <button type="submit" disabled={!isAdmin}>Guardar Cambios</button>
            <button type="button" className="cancel" onClick={resetForm} disabled={!isAdmin}>Cancelar</button>
          </ActionButtons>
        </Form>
      )}

      <SearchWrapper>
        <SearchInputWrapper>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchInputWrapper>
      </SearchWrapper>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              {isAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                {isAdmin && (
                  <td>
                    <button className="edit" onClick={() => handleEditClick(u)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete" onClick={() => confirmDelete(u._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {totalPages > 1 && (
        <PaginationWrapper>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
              {page}
            </PageButton>
          ))}
        </PaginationWrapper>
      )}

      {isModalOpen && (
        <Modal
          message="¿Seguro que quieres eliminar este usuario?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </UsersContainer>
  );
}
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '@/services/axios'
import {
  InventoryContainer,
  Title,
  Form,
  FormGroup,
  ActionButtons,
  SearchInputWrapper,
  SearchWrapper,
  TableWrapper,
  Table,
  DescriptionInput,
  DescriptionCell,
  ImageCell,
  ImageThumb,
  PaginationWrapper,
  PageButton,
} from '@/styles/inventory.styles'
import Modal from '@/components/modal'
import Notification from '@/components/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Products() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [formMode, setFormMode] = useState('create');
  const [formId, setFormId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const showNotification = (message, type = 'success', duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: 'success' });
    }, duration);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await axios.get('/users/me', { withCredentials: true });
        setUser(resUser.data);

        const resProducts = await axios.get('/products', { withCredentials: true });
        setProducts(resProducts.data || []);
      } catch (err) {
        showNotification(err.response?.data?.msg || 'Error al cargar datos', 'error');
        if (err.response?.status === 401) {
          setTimeout(() => router.push('/login'), 1500);
        }
      }
    }
    fetchData();
  }, [router]);

  const resetForm = () => {
    setFormMode('create');
    setFormId(null);
    setFormName('');
    setFormDescription('');
    setFormCategory('');
    setFormPrice('');
    setFormStock('');
    setFormImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formName.trim() || !formCategory.trim() || !formPrice || !formStock) {
      showNotification('Por favor llena todos los campos requeridos', 'error');
      return;
    }

    const payload = {
      name: formName.trim(),
      description: formDescription.trim(),
      category: formCategory.trim(),
      price: parseFloat(formPrice),
      stock: parseInt(formStock, 10),
      imageUrl: formImageUrl.trim(),
    };

    try {
      if (formMode === 'create') {
        await axios.post('/products', payload, { withCredentials: true });
        showNotification('Producto creado correctamente', 'success');
      } else if (formMode === 'edit' && formId) {
        await axios.put(`/products/${formId}`, payload, { withCredentials: true });
        showNotification('Producto actualizado correctamente', 'success');
      }
      resetForm();

      const resProducts = await axios.get('/products', { withCredentials: true });
      setProducts(resProducts.data || []);
      setCurrentPage(1);
    } catch (err) {
      showNotification(err.response?.data?.msg || 'Error al guardar producto', 'error');
    }
  };

  const handleEditClick = (product) => {
    setFormMode('edit');
    setFormId(product._id);
    setFormName(product.name);
    setFormDescription(product.description || '');
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormStock(product.stock.toString());
    setFormImageUrl(product.imageUrl || '');
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsModalOpen(false);

    try {
      await axios.delete(`/products/${productToDelete}`, { withCredentials: true });
      showNotification('Producto eliminado correctamente', 'success');

      const resProducts = await axios.get('/products', { withCredentials: true });
      setProducts(resProducts.data || []);

      if (formId === productToDelete) resetForm();
      setProductToDelete(null);

      const filteredAfterDelete = filteredProducts.length - 1;
      const maxPage = Math.ceil(filteredAfterDelete / itemsPerPage) || 1;
      if (currentPage > maxPage) setCurrentPage(maxPage);
    } catch (err) {
      showNotification(err.response?.data?.msg || 'Error al eliminar producto', 'error');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const isAdmin = user?.role === 'admin';

  const filteredProducts = products.filter(product => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      (product.description?.toLowerCase() ?? '').includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.price.toString().includes(term) ||
      product.stock.toString().includes(term)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const maxDescriptionLength = 30;

  return (
    <InventoryContainer>
      <Title>Gestión de Inventario</Title>
      <Notification message={notification.message} type={notification.type} />

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <h2>{formMode === 'create' ? 'Crear Producto' : 'Editar Producto'}</h2>
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
          <label>Descripción</label>
          <DescriptionInput
            rows={3}
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>Categoría</label>
          <input
            type="text"
            value={formCategory}
            onChange={(e) => setFormCategory(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formPrice}
            onChange={(e) => setFormPrice(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Stock</label>
          <input
            type="number"
            min="0"
            value={formStock}
            onChange={(e) => setFormStock(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>URL Imagen</label>
          <input
            type="text"
            value={formImageUrl}
            onChange={(e) => setFormImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </FormGroup>

        <ActionButtons>
          <button type="submit" disabled={!isAdmin}>
            {formMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
          </button>
          {formMode === 'edit' && (
            <button
              type="button"
              className="cancel"
              onClick={resetForm}
              disabled={!isAdmin}
            >
              Cancelar Edición
            </button>
          )}
        </ActionButtons>
      </Form>

      <SearchWrapper>
        <SearchInputWrapper>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </SearchInputWrapper>
      </SearchWrapper>

    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            {isAdmin && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => {
            const shortDescription =
              product.description && product.description.length > maxDescriptionLength
                ? product.description.slice(0, maxDescriptionLength) + '...'
                : product.description || '-';

            return (
              <tr key={product._id}>
                <td>{product.name}</td>
                <DescriptionCell title={product.description || '-'}>
                  {shortDescription}
                </DescriptionCell>
                <td>{product.category}</td>
                <td>${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{product.stock.toLocaleString('en-US')}</td>
                <ImageCell>
                  {product.imageUrl ? (
                    <ImageThumb src={product.imageUrl} alt="img" />
                  ) : (
                    '-'
                  )}
                </ImageCell>
                {isAdmin && (
                  <td>
                    <button className="edit" onClick={() => handleEditClick(product)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete" onClick={() => confirmDelete(product._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
    
      {totalPages > 1 && (
        <PaginationWrapper>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <PageButton
              key={pageNum}
              active={pageNum === currentPage}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </PageButton>
          ))}
        </PaginationWrapper>
      )}

      {isModalOpen && (
        <Modal
          message="¿Seguro que quieres eliminar este producto?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </InventoryContainer>
  );
}
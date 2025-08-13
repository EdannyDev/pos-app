import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '@/services/axios';
import {
  SalesContainer,
  Title,
  Form,
  FormGroup,
  ProductRow,
  AddProductButton,
  ActionButtons,
  SearchInputWrapper,
  SearchWrapper,
  Table,
  PaginationWrapper,
  PageButton,
  TableWrapper,
} from '@/styles/sales.styles';
import Modal from '@/components/modal';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Sales() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [formMode, setFormMode] = useState('create');
  const [formId, setFormId] = useState(null);
  const [formPaymentMethod, setFormPaymentMethod] = useState('efectivo');
  const [formStatus, setFormStatus] = useState('completada');
  const [formProducts, setFormProducts] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
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

        const [resSales, resProducts] = await Promise.all([
          axios.get('/sales', { withCredentials: true }),
          axios.get('/products', { withCredentials: true }),
        ]);

        setSales(resSales.data.sales || []);
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

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, sales, searchTerm]);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...formProducts];
    if (field === 'quantity') {
      const valNum = parseInt(value);
      if (isNaN(valNum) || valNum < 1) return;
      newProducts[index].quantity = valNum;
    } else if (field === 'productId') {
      newProducts[index].productId = value;
    }
    setFormProducts(newProducts);
  };

  const addProductToForm = () => {
    setFormProducts([...formProducts, { productId: '', quantity: 1 }]);
  };

  const removeProductFromForm = (index) => {
    const newProducts = [...formProducts];
    newProducts.splice(index, 1);
    setFormProducts(newProducts);
  };

  const resetForm = () => {
    setFormMode('create');
    setFormId(null);
    setFormPaymentMethod('efectivo');
    setFormStatus('completada');
    setFormProducts([]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    products: formProducts.map(({ productId, quantity }) => ({ productId, quantity })),
    paymentMethod: formPaymentMethod,
  };
  if (formMode === 'edit') payload.status = formStatus;

  try {
    if (formMode === 'create') {
      await axios.post('/sales', payload, { withCredentials: true });
      showNotification('Venta creada correctamente', 'success');
    } else if (formMode === 'edit' && formId) {
      await axios.put(`/sales/${formId}`, payload, { withCredentials: true });
      showNotification('Venta actualizada correctamente', 'success');
    }
    resetForm();
    
    const resSales = await axios.get('/sales', { withCredentials: true });
    setSales(resSales.data.sales || []);

    const resProducts = await axios.get('/products', { withCredentials: true });
    setProducts(resProducts.data || []);
  } catch (err) {
    showNotification(err.response?.data?.msg || 'Error al guardar venta', 'error');
    }
  };

  const handleEditClick = (sale) => {
    setFormMode('edit');
    setFormId(sale._id);
    setFormPaymentMethod(sale.paymentMethod);
    setFormStatus(sale.status);
    setFormProducts(
      (sale.products || []).map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      }))
    );
  };

  const confirmDelete = (id) => {
    setSaleToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
  if (!saleToDelete) return;
  setIsModalOpen(false);

  try {
    await axios.delete(`/sales/${saleToDelete}`);
    showNotification('Venta eliminada correctamente', 'success');
    const resSales = await axios.get('/sales', { withCredentials: true });
    setSales(resSales.data.sales || []);
    const resProducts = await axios.get('/products', { withCredentials: true });
    setProducts(resProducts.data || []);
    if (formId === saleToDelete) resetForm();
    setSaleToDelete(null);
  } catch (err) {
    showNotification(err.response?.data?.msg || 'Error al eliminar la venta', 'error');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSaleToDelete(null);
  };

  const isAdmin = user?.role === 'admin';

  const filteredSales = sales.filter((sale) => {
    const term = searchTerm.toLowerCase();
    const sellerName = sale.seller?.name?.toLowerCase() ?? '';
    const totalStr = sale.total?.toFixed(2) ?? '';
    const paymentMethod = sale.paymentMethod?.toLowerCase() ?? '';
    const status = sale.status?.toLowerCase() ?? '';
    const productsStr = (sale.products || [])
      .map((p) => `${p.name?.toLowerCase() ?? ''} x ${p.quantity}`)
      .join(' ');
    const dateStr = new Date(sale.createdAt).toLocaleString().toLowerCase();

    return (
      sellerName.includes(term) ||
      totalStr.includes(term) ||
      paymentMethod.includes(term) ||
      status.includes(term) ||
      productsStr.includes(term) ||
      dateStr.includes(term)
    );
  });

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <SalesContainer>
      <Title>Gestión de Ventas</Title>
      <Notification message={notification.message} type={notification.type} />

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <h2>Crear Venta</h2>
          <label>Método de pago</label>
          <select
            value={formPaymentMethod}
            onChange={(e) => setFormPaymentMethod(e.target.value)}
            disabled={formMode === 'edit' && !isAdmin}
          >
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </FormGroup>

        {formMode === 'edit' && (
          <FormGroup>
            <label>Estado</label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
              disabled={!isAdmin}
            >
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </FormGroup>
        )}

        <FormGroup>
          <label>Productos</label>
          {formProducts.map((p, i) => {
            const productData = products.find((prod) => prod._id === p.productId) || {};
            return (
              <ProductRow key={i}>
                <select
                  value={p.productId}
                  onChange={(e) => handleProductChange(i, 'productId', e.target.value)}
                >
                  <option value="">Selecciona producto</option>
                  {products.map((prod) => (
                    <option key={prod._id} value={prod._id}>
                      {prod.name} (Stock: {prod.stock.toLocaleString('en-US')})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={p.quantity}
                  onChange={(e) => handleProductChange(i, 'quantity', e.target.value)}
                />
                <span>
                  ${productData.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </span>
                <button type="button" onClick={() => removeProductFromForm(i)}>
                  Eliminar
                </button>
              </ProductRow>
            );
          })}
          <AddProductButton type="button" onClick={addProductToForm}>
            Añadir Producto
          </AddProductButton>
        </FormGroup>

        <ActionButtons>
          <button type="submit">
            {formMode === 'create' ? 'Crear Venta' : 'Guardar Cambios'}
          </button>
          {formMode === 'edit' && (
            <button type="button" className="cancel" onClick={resetForm}>
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
            placeholder="Buscar ventas..."
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
              <th>Vendedor</th>
              <th>Total</th>
              <th>Método Pago</th>
              <th>Estado</th>
              <th>Productos</th>
              <th>Fecha</th>
              {isAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedSales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.seller?.name || 'Desconocido'}</td>
                <td>
                  ${sale.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td>{sale.paymentMethod}</td>
                <td>{sale.status}</td>
                <td>
                  {(sale.products || []).map((p) => (
                    <div key={p.productId}>
                      {p.name} x {p.quantity.toLocaleString('en-US')}
                    </div>
                  ))}
                </td>
                <td>
                  {new Date(sale.createdAt).toLocaleDateString()} -{' '}
                  {new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                {isAdmin && (
                  <td>
                    <button className="edit" onClick={() => handleEditClick(sale)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete" onClick={() => confirmDelete(sale._id)}>
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <PageButton
              key={pageNum}
              isActive={pageNum === currentPage}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </PageButton>
          ))}
        </PaginationWrapper>
      )}

      {isModalOpen && (
        <Modal
          message="¿Seguro que quieres eliminar esta venta? Esto revertirá el stock."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </SalesContainer>
  );
}
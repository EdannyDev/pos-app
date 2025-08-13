import { useState } from 'react'
import axios from '@/services/axios'
import { useRouter } from 'next/router'
import {
  LoginWrapper,
  Form,
  Title,
  InputGroup,
  Input,
  PasswordToggleButton,
  SubmitButton,
  LinksContainer,
  LinkButton,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalButtonGroup,
  ModalButton,
} from '@/styles/login.styles'
import Notification from '@/components/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEye, faEyeSlash, faEnvelope, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotification({ message: '', type: '' })
    try {
      const res = await axios.post('/users/login', { email, password })
      if (res.data.role) {
        setNotification({ message: 'Inicio de sesión exitoso', type: 'success' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      }
    } catch (err) {
      setNotification({
        message: err.response?.data?.msg || 'Error al iniciar sesión',
        type: 'error',
      })
    }
  }

  const handlePasswordReset = async () => {
  setNotification({ message: '', type: '' });
  try {
    const res = await axios.post('/users/temp-password', { email: resetEmail });
    const hasTempPassword = !!res.data.tempPassword;
    setNotification({
      message: hasTempPassword
        ? `Contraseña temporal: ${res.data.tempPassword}`
        : res.data.msg,
      type: 'success',
    });

    if (!hasTempPassword) {
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
    }

    setShowResetModal(false);
    setResetEmail('');
  } catch (err) {
    setNotification({
      message: err.response?.data?.msg || 'Error al generar contraseña temporal',
      type: 'error',
      });
    }
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit} noValidate>
        <Title>Iniciar Sesión</Title>

        <InputGroup>
          <FontAwesomeIcon icon={faEnvelope} />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <FontAwesomeIcon icon={faLock} />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggleButton
            type="button"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </PasswordToggleButton>
        </InputGroup>

        <SubmitButton type="submit">Entrar</SubmitButton>

        <LinksContainer>
          <span>
            ¿No tienes cuenta?{' '}
            <LinkButton type="button" onClick={() => router.push('/register')}>
              Regístrate
            </LinkButton>
          </span>
          <span>
            ¿Olvidaste la contraseña?{' '}
            <LinkButton type="button" onClick={() => setShowResetModal(true)}>
              Restablecer
            </LinkButton>
          </span>
        </LinksContainer>
      </Form>

      {showResetModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Restablecer contraseña</ModalTitle>
            <InputGroup>
              <FontAwesomeIcon icon={faEnvelope} />
              <Input
                modal
                type="email"
                placeholder="Ingresa tu correo"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </InputGroup>
            <ModalButtonGroup>
              <ModalButton cancel onClick={() => setShowResetModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              Cancelar
              </ModalButton>
              <ModalButton onClick={handlePasswordReset}>
                <FontAwesomeIcon icon={faPaperPlane} />
              Enviar
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      <Notification message={notification.message} type={notification.type} />
    </LoginWrapper>
  )
}
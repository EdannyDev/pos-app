import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/services/axios'
import Notification from '@/components/notification'
import {
  RegisterWrapper,
  Form,
  Title,
  InputGroup,
  Input,
  PasswordToggleButton,
  SubmitButton,
  LinksContainer,
  LinkButton
} from '@/styles/register.styles'
import { faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNotification({ message: '', type: '' })

    try {
      await axios.post('/users/register', { name, email, password })
      setNotification({ message: 'Registro exitoso. Redirigiendo...', type: 'success' })
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      setNotification({
        message: err.response?.data?.msg || 'Error al registrarse',
        type: 'error'
      })
    }
  }

  return (
    <RegisterWrapper>
      <Notification message={notification.message} type={notification.type} />

      <Form onSubmit={handleSubmit} noValidate>
        <Title>Crear Cuenta</Title>

        <InputGroup>
          <FontAwesomeIcon icon={faUser} />
          <Input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputGroup>

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
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </PasswordToggleButton>
        </InputGroup>

        <SubmitButton type="submit">Registrarse</SubmitButton>

        <LinksContainer>
          <span>¿Ya tienes cuenta?{' '}
          <LinkButton type="button" onClick={() => router.push('/login')}>
            Inicia sesión
          </LinkButton>
          </span>
        </LinksContainer>
      </Form>
    </RegisterWrapper>
  )
}
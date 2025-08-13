import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '@/services/axios'
import {
  DashboardWrapper,
  DashboardTitle,
  UserInfo,
  InfoItem
} from '@/styles/dashboard.styles'
import Notification from '@/components/notification'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const fechaActual = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/users/me`, { withCredentials: true })
        setUser(res.data)
      } catch (err) {
        setNotification({
          message: err.response?.data?.msg || 'No autorizado. Inicia sesión.',
          type: 'error'
        })
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    }

    fetchUserData()
  }, [router])

  return (
      <DashboardWrapper>
        {notification.message && (
          <Notification message={notification.message} type={notification.type} />
        )}

        <DashboardTitle>Bienvenido al Sistema POS</DashboardTitle>
        <p>{fechaActual}</p>

        {user && (
          <UserInfo>
            <InfoItem><strong>Nombre:</strong> {user.name}</InfoItem>
            <InfoItem><strong>Email:</strong> {user.email}</InfoItem>
            <InfoItem><strong>Rol:</strong> {user.role}</InfoItem>
          </UserInfo>
        )}
      </DashboardWrapper>
  )
}
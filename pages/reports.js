import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/services/axios'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'
import {
  ReportsContainer,
  SectionTitle,
  ChartWrapper,
  TooltipContainer,
  DotCircle,
  HighlightCard,
  Table,
  Title,
  TableWrapper
} from '@/styles/reports.styles'
import Notification from '@/components/notification'

function TooltipStyled({ active, payload, label }) {
  if (active && payload && payload.length) {
    const formattedValue = payload[0].value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return (
      <TooltipContainer>
        <p>{label}</p>
        <p>Total: {formattedValue}</p>
      </TooltipContainer>
    )
  }
  return null
}

export default function Reports() {
  const router = useRouter()
  const [dailySales, setDailySales] = useState([])
  const [monthlySales, setMonthlySales] = useState([])
  const [userSales, setUserSales] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [dailyRes, monthlyRes, userRes, topProductsRes, totalIncomeRes] =
          await Promise.all([
            axios.get('/reports/daily-sales'),
            axios.get('/reports/monthly-sales'),
            axios.get('/reports/user-sales'),
            axios.get('/reports/top-products'),
            axios.get('/reports/total-income')
          ])

        setDailySales(dailyRes.data)
        setMonthlySales(monthlyRes.data)
        setUserSales(userRes.data)
        setTopProducts(topProductsRes.data)
        setTotalIncome(totalIncomeRes.data.total)
      } catch (err) {
        if (err.response?.status === 403) {
          setNotification({
            message: 'No tienes permisos para ver los reportes. Redirigiendo...',
            type: 'error'
          })
        } else {
          setNotification({
            message: 'Error al cargar los reportes.',
            type: 'error'
          })
        }
        console.error('Error fetching reports:', err)
      }
    }

    fetchReports()
  }, [])

  useEffect(() => {
    if (notification.type === 'error' && notification.message.includes('Redirigiendo')) {
      const timer = setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification, router])

  return (
    <ReportsContainer>
      <Title>Reportes</Title>

      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {!notification.message && (
        <>
          <SectionTitle>Ventas Diarias (Últimos 30 días)</SectionTitle>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySales}>
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="_id" stroke="#00ffc3" />
                <YAxis
                  stroke="#00ffc3"
                  tickFormatter={(value) =>
                    value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                  }
                />
                <Tooltip content={<TooltipStyled />} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#00ffc3"
                  strokeWidth={3}
                  dot={<DotCircle />}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <SectionTitle>Ventas Mensuales (Últimos 12 meses)</SectionTitle>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="_id" stroke="#00ffc3" />
                <YAxis
                  stroke="#00ffc3"
                  tickFormatter={(value) =>
                    value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                  }
                />
                <Tooltip content={<TooltipStyled />} />
                <Legend wrapperStyle={{ color: '#00e0ff' }} />
                <Bar dataKey="Total" fill="#00ffc3" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <SectionTitle>Ventas por Usuario</SectionTitle>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Total Ventas</th>
                  <th>Cantidad Ventas</th>
                </tr>
              </thead>
              <tbody>
                {userSales.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      ${user.total.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td>{user.count.toLocaleString('en-US')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>  

          <SectionTitle>Productos Más Vendidos</SectionTitle>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad Vendida</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => (
                  <tr key={idx}>
                    <td>{product.name}</td>
                    <td>{product.quantitySold.toLocaleString('en-US')}</td>
                    <td>
                      ${product.total.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>

          <HighlightCard>
            Ingresos Totales: ${totalIncome.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </HighlightCard>
        </>
      )}
    </ReportsContainer>
  )
}
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
  HighlightCard,
  Table,
  Title,
  TableWrapper
} from '@/styles/reports.styles'
import Notification from '@/components/notification'

function TooltipStyled({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0]?.value
    const formattedValue =
      typeof value === 'number' && !isNaN(value)
        ? value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : value || '-'

    return (
      <TooltipContainer>
        <p>{label}</p>
        <p>Total: {formattedValue}</p>
      </TooltipContainer>
    )
  }
  return null
}

const CustomDot = ({ cx, cy, stroke, fill }) => {
  if (cx === undefined || cy === undefined) return null
  return <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={2} fill={fill} />
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

        const cleanDailySales = Array.isArray(dailyRes.data)
          ? dailyRes.data.map(item => ({
              _id: String(item._id),
              total: typeof item.total === 'number' && !isNaN(item.total) ? item.total : 0,
              count: item.count || 0
            }))
          : []

        const cleanMonthlySales = Array.isArray(monthlyRes.data)
          ? monthlyRes.data.map(item => ({
              _id: String(item._id),
              total: typeof item.total === 'number' && !isNaN(item.total) ? item.total : 0,
              count: item.count || 0
            }))
          : []

        const cleanUserSales = Array.isArray(userRes.data)
          ? userRes.data.map(user => ({
              name: user.name || 'Desconocido',
              email: user.email || 'N/A',
              total: typeof user.total === 'number' && !isNaN(user.total) ? user.total : 0,
              count: user.count || 0
            }))
          : []

        const cleanTopProducts = Array.isArray(topProductsRes.data)
          ? topProductsRes.data.map(product => ({
              name: product.name || 'Sin nombre',
              quantitySold:
                typeof product.quantitySold === 'number' && !isNaN(product.quantitySold)
                  ? product.quantitySold
                  : 0,
              total: typeof product.total === 'number' && !isNaN(product.total) ? product.total : 0
            }))
          : []

        setDailySales(cleanDailySales)
        setMonthlySales(cleanMonthlySales)
        setUserSales(cleanUserSales)
        setTopProducts(cleanTopProducts)
        setTotalIncome(
          typeof totalIncomeRes.data.total === 'number' && !isNaN(totalIncomeRes.data.total)
            ? totalIncomeRes.data.total
            : 0
        )
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
    if (
      notification.type === 'error' &&
      notification.message.includes('Redirigiendo')
    ) {
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
                  dot={<CustomDot />}
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
                <Bar dataKey="total" fill="#00ffc3" />
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
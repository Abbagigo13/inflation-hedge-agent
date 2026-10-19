import type { ReactNode } from 'react'
import DashboardLayout from './components/capitalio/dashboard-layout'
import { AnalyticsPage } from './components/capitalio/analytics-page'
import { DashboardPage } from './components/capitalio/dashboard-page'
import { DashboardNavigationProvider, useDashboardNavigation } from './components/capitalio/navigation'
import { DashboardSkeleton } from './components/capitalio/dashboard-skeleton'
import { useAgent } from './context/AgentContext'

const blankRoutes = new Set([
  '/net-worth',
  '/stocks',
  '/crypto',
  '/real-estate',
  '/fixed-income',
  '/settings',
  '/notifications',
])

function DashboardRoute() {
  const { pathname } = useDashboardNavigation()
  const { isLoading } = useAgent() // Connect the skeleton loader to our Context!

  let content: ReactNode = <DashboardPage />

  if (pathname === '/analytics') {
    content = <AnalyticsPage />
  } else if (blankRoutes.has(pathname)) {
    content = null
  }

  return (
    <DashboardLayout>
      {/* Show the skeleton if loading, otherwise show the actual page */}
      {isLoading ? <DashboardSkeleton /> : content}
    </DashboardLayout>
  )
}

export default function CapitalioDashboardDemo() {
  return (
    <DashboardNavigationProvider>
      <DashboardRoute />
    </DashboardNavigationProvider>
  )
}
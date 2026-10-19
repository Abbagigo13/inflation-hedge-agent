export type PeriodValue = '1M' | '3M' | '6M' | '1Y' | 'ALL'

export const dashboardPeriods = [
  { label: '1 Month', value: '1M' as PeriodValue },
  { label: '3 Months', value: '3M' as PeriodValue },
  { label: '6 Months', value: '6M' as PeriodValue },
  { label: '1 Year', value: '1Y' as PeriodValue },
]

export const defaultDashboardPeriod: PeriodValue = '1M'

export const dashboardTopbarData = {
  lastUpdated: 'Agent ID: 9892',
  currency: 'USD',
  dateRange: 'Live on Celo Mainnet',
}

export function getPageTitle(pathname: string) {
  if (pathname === '/analytics') return 'Agent Analytics'
  return 'Portfolio Overview'
}

const mockData = {
  performance: {
    title: 'Wealth Preservation',
    subtitle: 'wARS vs USDT (Hedged)',
    trend: '+12.5% Protected',
    compareLabel: 'Full Report',
    actionLabel: 'Full Report',
    data: [
      { label: 'Week 1', portfolio: 300, benchmark: 300, balanced: 300, axisLabel: 'W1' },
      { label: 'Week 2', portfolio: 320, benchmark: 280, balanced: 310, axisLabel: 'W2' },
      { label: 'Week 3', portfolio: 350, benchmark: 250, balanced: 330, axisLabel: 'W3' },
      { label: 'Week 4', portfolio: 400, benchmark: 220, balanced: 350, axisLabel: 'W4' },
    ],
    legend: [
      { label: 'Hedged (USDT)', color: 'var(--chart-4)', dataKey: 'portfolio' },
      { label: 'wARS (Unhedged)', color: 'var(--chart-1)', dataKey: 'benchmark' }
    ],
    metrics: [
      { label: 'Inflation Rate', value: '15.2%', change: '+2.1%', tone: 'negative' },
      { label: 'Total Hedged', value: '$8,400', change: '+12%', tone: 'positive' },
      { label: 'Agent Uptime', value: '99.9%', change: 'Stable', tone: 'positive' },
      { label: 'Value Saved', value: '$340', change: '+5%', tone: 'positive' },
    ]
  },
  allocation: {
    title: 'Current Allocation',
    status: 'Hedged',
    centerValue: '2',
    centerLabel: 'Assets',
    items: [
      { label: 'USDT (Textile)', value: '$8,400', percent: 70, color: 'var(--chart-4)' },
      { label: 'wARS (Ripo)', value: '$3,600', percent: 30, color: 'var(--chart-1)' },
    ]
  }
}

export const analyticsDataByPeriod: any = {
  '1M': {
    performance: mockData.performance,
    metrics: [
      { id: 'm1', title: 'Total Protected', value: '$12,450', description: '↑ 5.2% vs last month', color: 'var(--chart-4)', type: 'line', data: [{label: 'A', x: 1, y: 10}, {label: 'B', x: 2, y: 15}, {label: 'C', x: 3, y: 20}] },
      { id: 'm2', title: 'Inflation (wARS)', value: '15.2%', description: 'Trigger > 10%', color: 'var(--chart-1)', type: 'bars', data: [{label: 'A', value: 10}, {label: 'B', value: 20}, {label: 'C', value: 15}] },
      { id: 'm3', title: 'Yield APY', value: '4.5%', description: 'Via Textile FX', color: 'var(--chart-2)', type: 'line', data: [{label: 'A', x: 1, y: 4}, {label: 'B', x: 2, y: 5}] },
    ],
    returns: { title: 'FX Returns', subtitle: 'Slippage saved', status: 'Optimal', series: [{ label: 'Savings', color: 'var(--chart-4)', dataKey: 'v1' }], data: [{ label: 'Mon', v1: 2 }, { label: 'Tue', v1: 3 }, { label: 'Wed', v1: 4 }] },
    income: { title: 'Agent Activity', subtitle: 'Swaps executed', status: 'Active', series: [{ label: 'Swaps', color: 'var(--chart-1)', dataKey: 's1' }], data: [{ label: 'W1', s1: 2 }, { label: 'W2', s1: 5 }, { label: 'W3', s1: 3 }] }
  }
};
analyticsDataByPeriod['3M'] = analyticsDataByPeriod['1M'];
analyticsDataByPeriod['6M'] = analyticsDataByPeriod['1M'];
analyticsDataByPeriod['1Y'] = analyticsDataByPeriod['1M'];
analyticsDataByPeriod['ALL'] = analyticsDataByPeriod['1M'];

export const dashboardSummaryCardsByPeriod: any = {
  '1M': [
    { id: 'net-worth', title: 'Total Protected', value: '$12,450', suffix: 'USDT', color: 'var(--chart-4)', icon: 'wallet', change: { value: '+5.2%', label: 'this month', tone: 'positive' }, chart: { points: [{label: 'A', x: 1, y: 20}, {label: 'B', x: 2, y: 15}, {label: 'C', x: 3, y: 10}] } },
    { id: 'portfolio-return', title: 'Agent Status', value: 'Active', suffix: '', color: 'var(--chart-2)', icon: 'pie', bars: [{label: '1', value: 10}, {label: '2', value: 15}, {label: '3', value: 20}], target: { progress: 80, gained: 'Monitored 24/7', goal: 'Celo Mainnet' } },
    { id: 'asset-classes', title: 'Asset Allocation', value: 'Balanced', suffix: '', color: 'var(--chart-4)', icon: 'shield', allocations: [{label: 'wARS', share: 30, color: 'var(--chart-1)', value: '30%'}, {label: 'USDT', share: 70, color: 'var(--chart-4)', value: '70%'}] },
    { id: 'risk-score', title: 'Inflation Rate', value: '15.2', suffix: '% ARS', color: '#f59e0b', icon: 'trend', change: { value: 'High', label: 'Inflation', tone: 'negative' }, chart: { points: [{label: 'A', x: 1, y: 10}, {label: 'B', x: 2, y: 20}, {label: 'C', x: 3, y: 25}] } },
  ]
};
dashboardSummaryCardsByPeriod['3M'] = dashboardSummaryCardsByPeriod['1M'];
dashboardSummaryCardsByPeriod['6M'] = dashboardSummaryCardsByPeriod['1M'];
dashboardSummaryCardsByPeriod['1Y'] = dashboardSummaryCardsByPeriod['1M'];
dashboardSummaryCardsByPeriod['ALL'] = dashboardSummaryCardsByPeriod['1M'];

export const dashboardDetailByPeriod: any = {
  '1M': {
    performance: mockData.performance,
    allocation: mockData.allocation
  }
};
dashboardDetailByPeriod['3M'] = dashboardDetailByPeriod['1M'];
dashboardDetailByPeriod['6M'] = dashboardDetailByPeriod['1M'];
dashboardDetailByPeriod['1Y'] = dashboardDetailByPeriod['1M'];
dashboardDetailByPeriod['ALL'] = dashboardDetailByPeriod['1M'];

export const dashboardBottomByPeriod: any = {
  '1M': {
    holdings: {
      title: 'Agent Holdings',
      actionLabel: 'View on CeloScan',
      columns: ['No', 'Asset', 'Value', 'Allocation', 'Return', '24H'],
      rows: [
        { no: '1', asset: 'USDT', type: 'Stablecoin (Textile)', logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png', value: '$8,400', allocation: '70.0%', return: '+0.01%', tone: 'positive', day: '+0.01%', dayTone: 'positive' },
        { no: '2', asset: 'wARS', type: 'Ripo wFIAT', logo: 'https://cryptologos.cc/logos/argentine-peso-ars-logo.png', value: '$3,600', allocation: '30.0%', return: '-15.2%', tone: 'negative', day: '-0.5%', dayTone: 'negative' },
      ]
    },
    insights: {
      title: 'Smart Insights',
      status: 'Agent AI',
      items: [
        { title: 'Inflation Alert', description: 'ARS inflation spiked to 15%. Agent executed hedge.', action: 'View TX', icon: 'scale' },
        { title: 'Low Gas', description: 'Agent wallet needs CELO for next swap.', action: 'Top Up', icon: 'reload' },
        { title: 'Identity', description: 'ERC-8004 Identity verified on Celo.', action: 'View Profile', icon: 'taxes' },
      ]
    }
  }
};
dashboardBottomByPeriod['3M'] = dashboardBottomByPeriod['1M'];
dashboardBottomByPeriod['6M'] = dashboardBottomByPeriod['1M'];
dashboardBottomByPeriod['1Y'] = dashboardBottomByPeriod['1M'];
dashboardBottomByPeriod['ALL'] = dashboardBottomByPeriod['1M'];

export const currentUser = {
  name: 'Agent Operator',
  initials: 'AO',
  avatar: 'https://github.com/shadcn.png',
}

import { SidebarHomeActiveIcon, SidebarAnalyticsIcon, SidebarSettingsIcon, SidebarNetWorthIcon } from '../components/capitalio/icons'

export const sidebarSections = {
  main: [
    {
      label: '',
      collapsible: false,
      items: [
        { name: 'Dashboard', href: '/', icon: SidebarHomeActiveIcon },
        { name: 'Analytics', href: '/analytics', icon: SidebarAnalyticsIcon },
        { name: 'Net Worth', href: '/net-worth', icon: SidebarNetWorthIcon },
      ]
    },
    {
      label: 'Celo Network', // Replaced 'Operations'
      collapsible: true,
      defaultOpen: true,
      items: [
        { name: 'wARS (Ripo)', href: '/wars', icon: () => null },
        { name: 'Textile FX', href: '/textile', icon: () => null },
        { name: 'Agent Identity', href: '/identity', icon: () => null },
        { name: 'Transaction Logs', href: '/logs', icon: () => null },
      ]
    },
    {
      label: '',
      collapsible: false,
      items: [
        { name: 'Settings', href: '/settings', icon: SidebarSettingsIcon },
        { name: 'Notifications', href: '/notifications', icon: () => null },
      ]
    }
  ],
  footer: {
    items: []
  }
}
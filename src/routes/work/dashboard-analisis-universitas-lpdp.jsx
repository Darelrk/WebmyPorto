import { createFileRoute } from '@tanstack/react-router'
import WorkShell from '../../components/work/WorkShell'
import { WORK_META } from '../../lib/workmeta'

export const Route = createFileRoute('/work/dashboard-analisis-universitas-lpdp')({
  component: () => <WorkShell meta={WORK_META['Dashboard-Analisis-Universitas-LPDP']} />,
})

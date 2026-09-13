import { createFileRoute } from '@tanstack/react-router'
import WorkShell from '../../components/work/WorkShell'
import { WORK_META } from '../../lib/workmeta'

export const Route = createFileRoute('/work/sleep-health-and-lifestyle-dataset')({
  component: () => <WorkShell meta={WORK_META['Sleep-Health-and-Lifestyle-Dataset']} />,
})

import { createFileRoute } from '@tanstack/react-router'
import WorkShell from '../../components/work/WorkShell'
import { WORK_META } from '../../lib/workmeta'

export const Route = createFileRoute('/work/autonomous-surface-vessel')({
  component: () => <WorkShell meta={WORK_META['autonomous-surface-vessel']} />,
})

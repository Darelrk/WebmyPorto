import { createFileRoute } from '@tanstack/react-router'
import WorkShell from '../../components/work/WorkShell'
import { WORK_META } from '../../lib/workmeta'

export const Route = createFileRoute('/work/credit-gap-forecaster')({
  component: () => <WorkShell meta={WORK_META['credit-gap-forecaster']} />,
})

import { createFileRoute } from '@tanstack/react-router'
import WorkShell from '../../components/work/WorkShell'
import { WORK_META } from '../../lib/workmeta'

export const Route = createFileRoute('/work/mae-hybrid-imputation-study')({
  component: () => <WorkShell meta={WORK_META['mae-hybrid-imputation-study']} />,
})

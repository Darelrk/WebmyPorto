import { createFileRoute } from '@tanstack/react-router'
import CaseStudyContainerPort from '../../components/CaseStudyContainerPort'

export const Route = createFileRoute('/work/containerport-id')({
  component: CaseStudyContainerPort,
})

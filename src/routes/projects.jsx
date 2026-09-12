import { createFileRoute } from '@tanstack/react-router'
import ProjectCatalog from '../components/ProjectCatalog'

export const Route = createFileRoute('/projects')({
  component: ProjectCatalog,
})

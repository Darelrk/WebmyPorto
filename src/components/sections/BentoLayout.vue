<script setup lang="ts">
import HeroCard from '../bento/HeroCard.vue'
import TitleCard from '../bento/TitleCard.vue'
import SocialCard from '../bento/SocialCard.vue'
import AboutCard from '../bento/AboutCard.vue'
import SkillsCard from '../bento/SkillsCard.vue'
import ProjectCard from '../bento/ProjectCard.vue'
import ComparisonChartCard from '../bento/ComparisonChartCard.vue'
import VisualizationCard from '../bento/VisualizationCard.vue'
import CertCard from '../bento/CertCard.vue'
import ExperienceCard from '../bento/ExperienceCard.vue'

// Helper for staggered animation
const getMotion = (index: number) => ({
  initial: { opacity: 0, y: 50 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: index * 100, // Stagger by 100ms per item
      duration: 600,
      type: 'spring',
      stiffness: 50,
      damping: 15 
    } 
  }
})

// Layout configuration for better maintainability
const layoutConfig = [
  { component: HeroCard, class: 'col-span-1 md:col-span-2 lg:row-span-2' },
  { component: TitleCard, class: 'col-span-1 md:col-span-2' },
  { component: SocialCard, class: 'col-span-1' },
  { component: CertCard, class: 'col-span-1' },
  { component: AboutCard, class: 'col-span-1' },
  { component: ProjectCard, props: { projectIndex: 0 }, class: 'col-span-1 md:col-span-2' },
  { component: SkillsCard, class: 'col-span-1' },
  { component: ComparisonChartCard, class: 'col-span-1 md:col-span-2' },
  { component: ProjectCard, props: { projectIndex: 1 }, class: 'col-span-1 md:col-span-2' },
  { component: VisualizationCard, class: 'col-span-1' },
  { component: ExperienceCard, class: 'col-span-1 md:col-span-2 lg:col-span-3' },
]
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 pt-24 pb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <component
        v-for="(item, index) in layoutConfig"
        :is="item.component"
        :key="index"
        v-bind="item.props"
        :class="item.class"
        v-motion="getMotion(index)"
      />
    </div>
  </section>
</template>

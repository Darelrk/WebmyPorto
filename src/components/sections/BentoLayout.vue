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
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 pt-24 pb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Row 1: Hero (2col, 2row) | Title (2col) -->
      <HeroCard 
        class="col-span-1 md:col-span-2 lg:row-span-2" 
        v-motion="getMotion(0)"
      />
      <TitleCard 
        class="col-span-1 md:col-span-2" 
        v-motion="getMotion(1)"
      />

      <!-- Row 2: Social (1col) | Certs (1col) -->
      <SocialCard 
        class="col-span-1" 
        v-motion="getMotion(2)"
      />
      <CertCard 
        class="col-span-1" 
        v-motion="getMotion(3)"
      />

      <!-- Row 3: About | Tabular LLM (2col) | Skills -->
      <AboutCard 
        class="col-span-1" 
        v-motion="getMotion(4)"
      />
      <ProjectCard 
        project-index="0" 
        class="col-span-1 md:col-span-2" 
        v-motion="getMotion(5)"
      />
      <SkillsCard 
        class="col-span-1" 
        v-motion="getMotion(6)"
      />

      <!-- Row 4: Chart (2col) | MAE (2col) -->
      <ComparisonChartCard 
        class="col-span-1 md:col-span-2" 
        v-motion="getMotion(7)"
      />
      <ProjectCard 
        project-index="1" 
        class="col-span-1 md:col-span-2" 
        v-motion="getMotion(8)"
      />

      <!-- Row 5: Viz (1col) + Experience (3col) -->
      <VisualizationCard 
        class="col-span-1" 
        v-motion="getMotion(9)"
      />
      <ExperienceCard 
        class="col-span-1 md:col-span-2 lg:col-span-3" 
        v-motion="getMotion(10)"
      />
    </div>
  </section>
</template>

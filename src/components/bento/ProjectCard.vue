<script setup lang="ts">
import { computed } from 'vue'
import { projects, type Project } from '../../data/portfolio'
import { ExternalLink, Github } from 'lucide-vue-next'

const props = defineProps<{
  projectIndex: string
}>()

const project = computed(() => (projects[Number(props.projectIndex)] || projects[0]) as Project)
</script>

<template>
  <div
    v-if="project"
    id="projects"
    class="bento-card group p-6 flex flex-col justify-between cursor-pointer"
    v-motion
    :initial="{ opacity: 0, scale: 0.95 }"
    :enter="{ opacity: 1, scale: 1, transition: { delay: 300, duration: 600 } }"
  >
    <!-- Category Badge -->
    <div class="flex items-center justify-between mb-4">
      <span class="glass-badge" style="border-color: rgba(220, 38, 38, 0.3); color: var(--accent-light)">
        {{ project.category }}
      </span>
      <span
        v-if="project.featured"
        class="text-xs px-3 py-1 font-semibold rounded-full"
        style="background: linear-gradient(135deg, var(--accent-dark), var(--accent-mid)); color: var(--accent-light)"
      >
        FEATURED
      </span>
    </div>

    <!-- Title & Desc -->
    <div class="flex-1">
      <h3 class="text-xl font-bold mb-2">
        {{ project.title }}
      </h3>
      <p class="text-sm leading-relaxed" style="color: var(--text-secondary)">
        {{ project.description }}
      </p>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mt-4 mb-4">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="text-xs px-2 py-1 rounded-md"
        style="
          border: 1px solid var(--border);
          color: var(--text-secondary);
        "
      >
        {{ tag }}
      </span>
    </div>

    <!-- Links -->
    <div class="flex gap-3 pt-4" style="border-top: 1px solid var(--border)">
      <a
        :href="project.github"
        target="_blank"
        class="glass-btn text-sm !py-2 !px-3"
      >
        <Github :size="14" /> Code
      </a>
      <a
        v-if="project.demo"
        :href="project.demo"
        target="_blank"
        class="glass-btn text-sm !py-2 !px-3"
      >
        <ExternalLink :size="14" /> Demo
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { skills } from '../../data/portfolio'
</script>

<template>
  <div
    class="bento-card p-6 flex flex-col"
    v-motion
    :initial="{ opacity: 0, x: 30 }"
    :enter="{ opacity: 1, x: 0, transition: { delay: 500, duration: 600 } }"
  >
    <h3
      class="text-xs uppercase tracking-widest mb-4"
      style="color: var(--accent)"
    >
      Tech Stack
    </h3>

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="skill in skills.hard"
        :key="skill.name"
        class="glass-badge"
      >
        {{ skill.name }}
      </span>
    </div>

    <div class="mt-auto pt-4" style="border-top: 1px solid var(--border)">
      <h4
        class="text-xs uppercase tracking-widest mb-2"
        style="color: var(--text-secondary)"
      >
        Soft Skills
      </h4>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="skill in skills.soft"
          :key="skill"
          class="text-xs px-2 py-1"
          style="color: var(--text-secondary)"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>

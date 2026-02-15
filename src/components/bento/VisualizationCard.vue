<script setup lang="ts">
import { projects } from '../../data/portfolio'
import { BarChart3, ExternalLink } from 'lucide-vue-next'

const lpdp = projects.find((p) => p.category === 'visualization')!
</script>

<template>
  <div
    class="bento-card p-6 flex flex-col justify-between"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 600 } }"
  >
    <div>
      <div class="flex items-center gap-2 mb-3">
        <BarChart3 :size="16" style="color: var(--accent)" />
        <span class="text-xs uppercase tracking-widest" style="color: var(--accent)">
          Viz
        </span>
      </div>

      <!-- Mini chart bars -->
      <div class="flex items-end gap-1 h-16 mb-3">
        <div
          v-for="(h, i) in [40, 65, 30, 80, 55, 90, 45, 70]"
          :key="i"
          class="flex-1 rounded-t-sm transition-all duration-300"
          :style="{
            height: h + '%',
            background: i % 2 === 0
              ? 'linear-gradient(to top, var(--accent-dark), var(--accent))'
              : 'rgba(255,255,255,0.06)',
          }"
        />
      </div>

      <p class="text-xs font-bold" style="font-family: 'Space Grotesk', sans-serif">
        {{ lpdp.title }}
      </p>
    </div>

    <a
      :href="lpdp.github"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-1 text-xs mt-3 transition-colors hover:text-[var(--accent-light)]"
      style="color: var(--text-secondary)"
    >
      <ExternalLink :size="12" /> View →
    </a>
  </div>
</template>

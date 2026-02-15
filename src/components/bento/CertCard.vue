<script setup lang="ts">
import { certifications } from '../../data/portfolio'
import { Award } from 'lucide-vue-next'
</script>

<template>
  <div
    class="bento-card p-6 flex flex-col overflow-hidden"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 700, duration: 600 } }"
  >
    <div class="flex items-center gap-2 mb-4">
      <Award :size="16" style="color: var(--accent-light)" />
      <span class="text-xs uppercase tracking-widest" style="color: var(--accent-light)">
        Certs
      </span>
    </div>

    <!-- Marquee -->
    <div class="marquee flex-1 flex items-center">
      <div class="marquee-inner gap-8">
        <template v-for="_ in 2" :key="_">
          <span
            v-for="cert in certifications"
            :key="cert.title"
            class="text-sm font-bold whitespace-nowrap px-4"
            style="font-family: 'Space Grotesk', sans-serif"
          >
            {{ cert.title }} · {{ cert.year }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

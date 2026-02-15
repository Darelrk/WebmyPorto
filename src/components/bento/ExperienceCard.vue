<script setup lang="ts">
import { experiences } from '../../data/portfolio'
import { Briefcase, Code2, Users } from 'lucide-vue-next'

const typeIcons = {
  intern: Briefcase,
  freelance: Code2,
  organization: Users,
} as const
</script>

<template>
  <div
    id="experience"
    class="bento-card p-6"
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 800, duration: 600 } }"
  >
    <h3
      class="text-xs uppercase tracking-widest mb-6"
      style="color: var(--accent)"
    >
      Experience
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="exp in experiences"
        :key="exp.role"
        class="p-4 rounded-xl transition-all hover:bg-[rgba(220,38,38,0.05)]"
        style="border: 1px solid var(--border)"
      >
        <div class="flex items-center gap-2 mb-2">
          <component :is="typeIcons[exp.type]" :size="14" style="color: var(--accent)" />
          <span class="text-xs uppercase" style="color: var(--text-secondary)">
            {{ exp.period }}
          </span>
        </div>
        <h4 class="text-sm font-bold mb-1">{{ exp.role }}</h4>
        <p class="text-xs mb-3" style="color: var(--text-secondary)">
          {{ exp.company }}
        </p>
        <ul class="space-y-1">
          <li
            v-for="(desc, i) in exp.description"
            :key="i"
            class="text-xs leading-relaxed"
            style="color: var(--text-secondary)"
          >
            → {{ desc }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

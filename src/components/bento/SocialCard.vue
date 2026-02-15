<script setup lang="ts">
import { profile } from '../../data/portfolio'
import { Github, Linkedin, BookOpen } from 'lucide-vue-next'
</script>

<template>
  <div
    class="bento-card flex items-center justify-center gap-4 p-6"
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 600 } }"
  >
    <a
      :href="profile.links.github"
      target="_blank"
      rel="noopener noreferrer"
      class="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-[rgba(220,38,38,0.15)] hover:text-[var(--accent-light)] hover:shadow-[0_0_20px_var(--accent-glow)]"
      style="border: 1px solid var(--border-hover); color: var(--text-secondary)"
      aria-label="GitHub"
    >
      <Github :size="20" />
    </a>
    <a
      :href="profile.links.linkedin"
      target="_blank"
      rel="noopener noreferrer"
      class="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-[rgba(220,38,38,0.15)] hover:text-[var(--accent-light)] hover:shadow-[0_0_20px_var(--accent-glow)]"
      style="border: 1px solid var(--border-hover); color: var(--text-secondary)"
      aria-label="LinkedIn"
    >
      <Linkedin :size="20" />
    </a>
    <a
      :href="profile.links.medium"
      target="_blank"
      rel="noopener noreferrer"
      class="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-[rgba(220,38,38,0.15)] hover:text-[var(--accent-light)] hover:shadow-[0_0_20px_var(--accent-glow)]"
      style="border: 1px solid var(--border-hover); color: var(--text-secondary)"
      aria-label="Medium"
    >
      <BookOpen :size="20" />
    </a>
  </div>
</template>

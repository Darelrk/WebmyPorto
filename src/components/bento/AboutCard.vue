<script setup lang="ts">
import { profile } from '../../data/portfolio'
</script>

<template>
  <div
    id="about"
    class="bento-card p-6 flex flex-col justify-between"
    v-motion
    :initial="{ opacity: 0, x: -30 }"
    :enter="{ opacity: 1, x: 0, transition: { delay: 400, duration: 600 } }"
  >
    <div>
      <h3
        class="text-xs uppercase tracking-widest mb-4"
        style="color: var(--accent-light)"
      >
        About
      </h3>
      <p class="text-sm leading-relaxed" style="color: var(--text-secondary)">
        {{ profile.bio }}
      </p>
    </div>

    <div class="mt-6 pt-4" style="border-top: 1px solid var(--border)">
      <p class="text-xs" style="color: var(--text-secondary)">
        🎓 {{ profile.university }}
      </p>
      <p class="text-xs mt-1" style="color: var(--text-secondary)">
        📊 {{ profile.degree }} · GPA {{ profile.gpa }}
      </p>
    </div>
  </div>
</template>

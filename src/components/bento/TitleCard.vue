<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const roles = ['Data Scientist', 'Data Analyst', 'ML Enthusiast', 'Problem Solver']
const currentRole = ref(0)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    currentRole.value = (currentRole.value + 1) % roles.length
  }, 2500)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div
    class="bento-card flex items-center justify-center p-6"
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
  >
    <div class="text-center">
      <p class="text-xs tracking-widest mb-2 uppercase" style="color: var(--text-secondary)">
        Current Role
      </p>
      <Transition name="fade" mode="out-in">
        <h2
          :key="currentRole"
          class="text-2xl md:text-3xl font-bold"
          style="font-family: 'Space Grotesk', sans-serif"
        >
          {{ roles[currentRole] }}
          <span class="animate-pulse" style="color: var(--accent)">_</span>
        </h2>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

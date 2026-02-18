<script setup lang="ts">
import { useMouse, useThrottleFn } from '@vueuse/core'
import { ref, watch, onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import BentoLayout from './components/sections/BentoLayout.vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import MobileDock from './components/layout/MobileDock.vue'

// Initialize theme on app mount
const themeStore = useThemeStore()

// Global mouse tracking for spotlight effect with throttling for performance
const { x, y } = useMouse()
const cardElements = ref<NodeListOf<HTMLElement> | null>(null)

onMounted(() => {
  themeStore.init()
  // Cache the cards once to avoid repeated DOM queries in the mouse watcher
  cardElements.value = document.querySelectorAll('.bento-card') as NodeListOf<HTMLElement>
})

const updateSpotlight = useThrottleFn(() => {
  if (!cardElements.value) return
  
  // Update CSS variables for all cached bento cards
  cardElements.value.forEach((card: HTMLElement) => {
    const rect = card.getBoundingClientRect()
    // Calculate mouse position relative to the card
    const cardX = x.value - rect.left
    const cardY = y.value - rect.top

    card.style.setProperty('--mouse-x', `${cardX}px`)
    card.style.setProperty('--mouse-y', `${cardY}px`)
  })
}, 16) // ~60fps throttle

// Watch mouse position changes
watch([x, y], updateSpotlight, { flush: 'post' }) // Use 'post' to ensure DOM is ready if needed
</script>

<template>
  <div class="min-h-screen relative font-sans overflow-hidden flex flex-col" style="background-color: var(--bg); color: var(--text-primary);">
    <!-- Ambient Background -->
    <div class="ambient-bg" />

    <!-- Navigation -->
    <Header />

    <main class="flex-grow relative z-10 w-full">
      <BentoLayout />
    </main>

    <Footer />
    
    <!-- Mobile Dock -->
    <MobileDock class="md:hidden" />
  </div>
</template>

<style>
/* Global resets if needed */
body {
  margin: 0;
  background-color: var(--bg);
}
</style>

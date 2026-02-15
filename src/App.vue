<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { watchEffect, onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import BentoLayout from './components/sections/BentoLayout.vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import MobileDock from './components/layout/MobileDock.vue'

// Initialize theme on app mount
const themeStore = useThemeStore()
onMounted(() => themeStore.init())

// Global mouse tracking for spotlight effect
const { x, y } = useMouse()

watchEffect(() => {
  // Update CSS variables for all bento cards
  const cards = document.querySelectorAll('.bento-card') as NodeListOf<HTMLElement>
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    // Calculate mouse position relative to the card
    const cardX = x.value - rect.left
    const cardY = y.value - rect.top
    
    card.style.setProperty('--mouse-x', `${cardX}px`)
    card.style.setProperty('--mouse-y', `${cardY}px`)
  })
})
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

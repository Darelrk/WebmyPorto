<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { watchEffect } from 'vue'
import BentoLayout from './components/sections/BentoLayout.vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import MobileDock from './components/layout/MobileDock.vue'

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
  <div class="min-h-screen relative font-sans text-gray-100 bg-black overflow-hidden flex flex-col">
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
  background-color: #000; /* Fallback */
}
</style>

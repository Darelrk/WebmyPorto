<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { profile } from '../../data/portfolio'

// Typewriter Logic
const displayedText = ref('\u200B') // Zero-width space to render cursor immediately
const fullText = "I'm " + profile.name.split(' ')[0]
const typingSpeed = 100 // ms per char

const startTyping = () => {
  let i = 0
  const interval = setInterval(() => {
    if (i < fullText.length) {
      if (i === 0) displayedText.value = '' // Clear zero-width space
      displayedText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(interval)
    }
  }, typingSpeed)
}

onMounted(() => {
  // Delay start slightly to sync with entrance animation
  setTimeout(startTyping, 100)
})
</script>

<template>
  <div
    id="hero"
    class="bento-card flex flex-col justify-end p-8 min-h-[320px]"
  >
    <!-- Initials avatar -->
    <div
      class="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center text-2xl font-bold transition-transform duration-500 hover:scale-110"
      style="
        background: linear-gradient(135deg, var(--accent-dark), var(--accent-mid));
        border: 1px solid rgba(220, 38, 38, 0.3);
        box-shadow: 0 0 30px var(--accent-glow);
      "
    >
      DR
    </div>

    <p
      class="text-sm mb-2 tracking-wide font-mono"
      style="color: var(--accent-light)"
    >
      Hello world_
    </p>
    
    <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-3">
      {{ displayedText }}<span class="typewriter-cursor"></span>
      <span style="color: var(--accent)">.</span>
    </h1>
    
    <p class="text-base" style="color: var(--text-secondary)">
      {{ profile.tagline }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-3 px-4' : 'py-5 px-6'"
  >
    <div
      class="max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-500"
      :class="scrolled ? 'py-3 rounded-2xl' : 'py-0'"
      :style="scrolled
        ? 'background: rgba(52, 50, 49, 0.4); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid var(--border); box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(220,38,38,0.05);'
        : 'background: transparent; border: none;'
      "
    >
      <!-- Logo -->
      <a href="#" class="group flex items-center gap-0.5 relative">
        <span
          class="text-xl font-bold tracking-tight transition-all duration-300 group-hover:tracking-wider"
          style="font-family: 'Space Grotesk', sans-serif"
        >DR</span>
        <span
          class="text-xl font-bold transition-all duration-300 group-hover:scale-150"
          style="color: var(--accent)"
        >.</span>
        <span
          class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          style="background: var(--accent); box-shadow: 0 0 12px var(--accent-glow);"
        />
      </a>

      <!-- CTA Only -->
      <button
        class="px-5 py-2 text-sm rounded-lg transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_var(--accent-glow)] hover:scale-105 active:scale-95"
        style="
          background: linear-gradient(135deg, var(--accent-dark), var(--accent-mid));
          border: 1px solid rgba(220, 38, 38, 0.3);
          color: var(--accent-light);
          font-family: 'Inter', sans-serif;
        "
        @click="scrollTo('#contact')"
      >
        Hire Me
      </button>
    </div>
  </header>
</template>

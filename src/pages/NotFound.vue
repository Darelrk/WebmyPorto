<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6">
    <h1
      class="glitch text-6xl md:text-8xl font-bold mb-4 text-center"
      data-text="404"
      style="font-family: 'Space Grotesk', sans-serif"
    >
      404
    </h1>
    <p
      class="text-lg mb-8 uppercase tracking-widest"
      style="color: var(--accent)"
    >
      Data Corrupted
    </p>
    <p class="text-sm mb-8" style="color: var(--text-secondary)">
      The page you're looking for does not exist in this dataset.
    </p>
    <router-link to="/" class="glass-btn">
      ← Return to Base
    </router-link>
  </div>
</template>

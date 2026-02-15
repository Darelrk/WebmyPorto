<script setup lang="ts">
import { Home, FolderGit2, User, Mail } from 'lucide-vue-next'

const dockItems = [
  { icon: Home, label: 'Home', href: '#hero' },
  { icon: User, label: 'About', href: '#about' },
  { icon: FolderGit2, label: 'Work', href: '#projects' },
  { icon: Mail, label: 'Contact', href: '#contact' },
]

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 md:hidden"
    style="
      border: 1px solid var(--border);
      background: var(--dock-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    "
  >
    <button
      v-for="item in dockItems"
      :key="item.label"
      class="flex flex-col items-center gap-1 transition-colors hover:text-[var(--accent-light)]"
      style="color: var(--text-secondary)"
      :aria-label="`Navigate to ${item.label}`"
      @click="scrollTo(item.href)"
    >
      <component :is="item.icon" :size="20" />
      <span class="text-[10px] tracking-wider" style="font-family: 'Inter', sans-serif">
        {{ item.label }}
      </span>
    </button>
  </nav>
</template>

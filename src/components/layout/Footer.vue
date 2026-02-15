<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { profile } from '../../data/portfolio'
import { Github, Linkedin, Mail, ArrowUp, BookOpen } from 'lucide-vue-next'

const footerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const dividerActive = ref(false)
const sweepActive = ref(false)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          dividerActive.value = true
          // Delay sweep so heading animates in first
          setTimeout(() => {
            sweepActive.value = true
          }, 600)
          observer.disconnect()
        }
      })
    },
    { threshold: 0.15 }
  )

  if (footerRef.value) {
    observer.observe(footerRef.value)
  }
})

const socialLinks = [
  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
  { href: profile.links.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
  { href: profile.links.github, icon: Github, label: 'GitHub', external: true },
  { href: profile.links.medium, icon: BookOpen, label: 'Medium', external: true },
]
</script>

<template>
  <footer
    id="contact"
    ref="footerRef"
    class="px-6 py-20 footer-divider"
    :class="{ 'animate-divider': dividerActive }"
  >
    <!-- CTA -->
    <div
      class="max-w-2xl mx-auto text-center mb-12 transition-all duration-700 ease-out"
      :style="{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }"
    >
      <h2
        class="text-4xl md:text-5xl font-bold mb-4"
        :class="{ 'gradient-sweep-text': true, 'animate-sweep': sweepActive }"
      >
        Let's Connect<span style="color: var(--accent); -webkit-text-fill-color: var(--accent)">.</span>
      </h2>
      <p
        class="text-base transition-all duration-700 delay-200 ease-out"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
          color: 'var(--text-secondary)',
        }"
      >
        Open for collaboration in data science, analysis, and machine learning projects.
      </p>
    </div>

    <!-- Links (Staggered) -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <a
        v-for="(link, index) in socialLinks"
        :key="link.label"
        :href="link.href"
        :target="link.external ? '_blank' : undefined"
        class="glass-btn transition-all duration-500 ease-out"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: `${400 + index * 100}ms`,
        }"
      >
        <component :is="link.icon" :size="18" />
        {{ link.label }}
      </a>
    </div>

    <!-- Bottom -->
    <div
      class="flex items-center justify-between max-w-4xl mx-auto pt-8 transition-all duration-700 ease-out"
      :style="{
        opacity: isVisible ? 1 : 0,
        borderTop: '1px solid var(--border)',
        transitionDelay: '800ms',
      }"
    >
      <p class="text-xs" style="color: var(--text-secondary)">
        © {{ new Date().getFullYear() }} {{ profile.name }}
      </p>
      <button
        class="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:bg-[rgba(220,38,38,0.15)]"
        :class="{ 'btn-pulse': isVisible }"
        style="border: 1px solid var(--border-hover); color: var(--text-secondary)"
        @click="scrollTop"
        aria-label="Back to top"
      >
        <ArrowUp :size="16" />
      </button>
    </div>
  </footer>
</template>

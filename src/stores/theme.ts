import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref(true)

    /**
     * Initialize theme from localStorage or system preference.
     */
    function init() {
        const saved = localStorage.getItem('theme')
        if (saved) {
            isDark.value = saved === 'dark'
        } else {
            // Default to dark (Crimson Smooth)
            isDark.value = true
        }
        applyTheme()
    }

    /**
     * Toggle between dark and light themes.
     */
    function toggle() {
        isDark.value = !isDark.value
        applyTheme()
    }

    /**
     * Apply the current theme to the DOM and persist to localStorage.
     */
    function applyTheme() {
        const root = document.documentElement
        if (isDark.value) {
            root.classList.remove('light')
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            root.classList.add('light')
            localStorage.setItem('theme', 'light')
        }
    }

    // Watch for changes
    watch(isDark, () => applyTheme())

    return { isDark, init, toggle }
})

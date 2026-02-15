<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface BarData {
  label: string
  value: number
  displayValue: string
  isHighlight: boolean
}

const bars: BarData[] = [
  { label: 'GReaT', value: 93.53, displayValue: '93.53%', isHighlight: true },
  { label: 'SDG-3k', value: 87.67, displayValue: '87.67%', isHighlight: false },
  { label: 'CTGAN-3k', value: 82.83, displayValue: '82.83%', isHighlight: false },
  { label: 'Original', value: 87.46, displayValue: '87.46%', isHighlight: false },
]

const baseline = 87.46
const minVal = 78
const maxVal = 96

function scaleHeight(val: number): number {
  return ((val - minVal) / (maxVal - minVal)) * 100
}

const baselinePos = scaleHeight(baseline)
const animated = ref(false)

onMounted(() => {
  setTimeout(() => (animated.value = true), 400)
})
</script>

<template>
  <div
    class="bento-card p-6 flex flex-col"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 600 } }"
    role="img"
    aria-label="Bar chart comparing synthetic data quality across frameworks"
  >
    <!-- Title -->
    <div class="mb-4">
      <h3 class="text-xs uppercase tracking-widest mb-1" style="color: var(--accent)">
        Research Results
      </h3>
      <p class="text-sm font-bold" style="font-family: 'Space Grotesk', sans-serif">
        Synthetic Data Quality — XGBoost (3K Samples)
      </p>
    </div>

    <!-- Chart Area -->
    <div class="flex-1 relative flex items-end gap-3 pt-6 pb-8 px-2 min-h-[180px]">
      <!-- Baseline dashed line -->
      <div
        class="absolute left-0 right-0 flex items-center z-10"
        :style="{ bottom: baselinePos + '%' }"
      >
        <div class="flex-1 border-t-2 border-dashed" style="border-color: var(--accent); opacity: 0.5" />
        <span
          class="text-[10px] ml-2 whitespace-nowrap px-1 rounded"
          style="color: var(--accent-light); background: var(--bg)"
        >
          Original ({{ baseline }}%)
        </span>
      </div>

      <!-- Bars -->
      <div
        v-for="bar in bars"
        :key="bar.label"
        class="flex-1 flex flex-col items-center gap-1"
      >
        <!-- Value label -->
        <span
          class="text-[11px] font-bold transition-all duration-700"
          :style="{
            color: bar.isHighlight ? 'var(--accent-light)' : 'var(--text-secondary)',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(8px)',
          }"
        >
          {{ bar.displayValue }}
        </span>

        <!-- Bar -->
        <div class="w-full relative" style="height: 140px">
          <div
            class="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-1000 ease-out"
            :style="{
              height: animated ? scaleHeight(bar.value) + '%' : '0%',
              background: bar.isHighlight
                ? 'linear-gradient(to top, var(--accent-dark), var(--accent))'
                : 'linear-gradient(to top, rgba(255,255,255,0.03), rgba(255,255,255,0.12))',
              border: bar.isHighlight ? '1px solid rgba(220, 38, 38, 0.4)' : '1px solid var(--border)',
              boxShadow: bar.isHighlight ? '0 0 20px var(--accent-glow)' : 'none',
            }"
          />
        </div>

        <!-- Label -->
        <span
          class="text-[10px] mt-1 tracking-wide"
          :style="{ color: bar.isHighlight ? 'var(--accent-light)' : 'var(--text-secondary)' }"
        >
          {{ bar.label }}
        </span>
      </div>
    </div>

    <!-- Subtitle -->
    <p class="text-[10px] text-center" style="color: var(--text-secondary)">
      Framework · Accuracy
    </p>
  </div>
</template>

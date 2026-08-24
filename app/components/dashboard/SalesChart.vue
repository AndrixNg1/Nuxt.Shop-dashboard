<script setup lang="ts">
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const gridColor = computed(() => isDark.value ? '#303044' : '#f0f0f5')
const labelColor = computed(() => isDark.value ? '#8e8ea4' : '#a7a8b5')

const chartData = computed(() => ({
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [{
    data: [1450, 1900, 1550, 2300, 2050, 2780, 2500],
    borderColor: '#7658ef',
    backgroundColor: 'rgba(118, 88, 239, .16)',
    fill: true,
    tension: .42,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: '#7658ef',
    pointHoverBorderColor: isDark.value ? '#20202d' : '#fff',
    pointHoverBorderWidth: 3
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1300, easing: 'easeOutQuart' as const },
  interaction: { intersect: false, mode: 'index' as const },
  plugins: { legend: { display: false }, tooltip: { backgroundColor: isDark.value ? '#29293a' : '#20202d', padding: 10, displayColors: false, callbacks: { label: (context: { parsed: { y: number | null } }) => `${(context.parsed.y ?? 0).toLocaleString('fr-FR')} €` } } },
  scales: { x: { grid: { display: false }, ticks: { color: labelColor.value, font: { size: 10 } } }, y: { min: 0, max: 3000, ticks: { stepSize: 1000, color: labelColor.value, font: { size: 10 }, callback: (value: string | number) => value === 0 ? '0' : `${Number(value) / 1000}k` }, grid: { color: gridColor.value } } }
}))
</script>

<template>
  <div class="chart chart--animated">
    <ClientOnly>
      <Line :data="chartData" :options="chartOptions" />
    </ClientOnly>
  </div>
</template>

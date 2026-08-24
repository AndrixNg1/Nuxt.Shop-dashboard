import { computed, ref } from 'vue'
import type { AnalyticsPeriod, AnalyticsSummary } from '~/types/analytics'

const periodOptions: { label: string; value: AnalyticsPeriod }[] = [
  { label: "Aujourd'hui", value: 'today' }, { label: '7 derniers jours', value: '7d' }, { label: '30 derniers jours', value: '30d' }, { label: 'Cette année', value: 'year' }
]
const periodData: Record<AnalyticsPeriod, { labels: string[]; revenue: number[]; orders: number[]; products: number[] }> = {
  today: { labels: ['00h', '04h', '08h', '12h', '16h', '20h', '23h'], revenue: [120, 50, 400, 800, 1200, 1500, 1100], orders: [1, 0, 4, 8, 12, 15, 11], products: [2, 0, 8, 16, 24, 30, 22] },
  '7d': { labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], revenue: [1200, 1900, 1500, 2200, 1800, 2500, 3100], orders: [12, 19, 15, 22, 18, 25, 31], products: [24, 38, 30, 44, 36, 50, 62] },
  '30d': { labels: Array.from({ length: 30 }, (_, index) => `${index + 1} Août`), revenue: [1200, 1500, 1800, 1400, 2100, 2300, 1900, 2500, 2700, 2200, 2800, 3000, 2600, 3100, 2900, 3300, 2800, 3500, 3200, 3600, 3400, 3800, 3500, 3900, 3700, 4100, 3800, 4300, 4000, 4500], orders: [12, 15, 18, 14, 21, 23, 19, 25, 27, 22, 28, 30, 26, 31, 29, 33, 28, 35, 32, 36, 34, 38, 35, 39, 37, 41, 38, 43, 40, 45], products: [24, 30, 36, 28, 42, 46, 38, 50, 54, 44, 56, 60, 52, 62, 58, 66, 56, 70, 64, 72, 68, 76, 70, 78, 74, 82, 76, 86, 80, 90] },
  year: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'], revenue: [12000, 15000, 14000, 18000, 22000, 24000, 21000, 25000, 28000, 27000, 32000, 45000], orders: [120, 150, 140, 180, 220, 240, 210, 250, 280, 270, 320, 450], products: [240, 300, 280, 360, 440, 480, 420, 500, 560, 540, 640, 900] }
}

export function useAnalyticsData() {
  const selectedPeriod = ref<AnalyticsPeriod>('30d')
  const summary: AnalyticsSummary = { revenue: '45 231,00 €', revenueGrowth: '+12,5%', orders: 1248, ordersGrowth: '+8,2%', conversion: '3,24%', conversionGrowth: '+1,1%', aov: '36,24 €', aovGrowth: '-0,5%' }
  const data = computed(() => periodData[selectedPeriod.value])
  const selectedPeriodLabel = computed(() => periodOptions.find(period => period.value === selectedPeriod.value)?.label ?? '30 derniers jours')
  return { periodOptions, selectedPeriod, selectedPeriodLabel, summary, data }
}

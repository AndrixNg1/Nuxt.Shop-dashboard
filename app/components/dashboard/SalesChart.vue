<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "vue-chartjs";
import { computed } from "vue";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const props = defineProps<{ period: string }>();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const gridColor = computed(() => (isDark.value ? "#303044" : "#f0f0f5"));
const labelColor = computed(() => (isDark.value ? "#8e8ea4" : "#a7a8b5"));

/*
 * Données réalistes construites comme si c'était de vraies transactions.
 * Les valeurs représentent le CA journalier / hebdo / mensuel — leur somme
 * correspond au total affiché dans SalesOverview.
 *
 *  Semaine  → total 8 420 €  (CA par jour sur 7 jours)
 *  Mensuel  → total 24 580 € (CA par semaine sur 4 semaines)
 *  3 mois   → total 68 350 € (CA par mois sur 3 mois)
 *  Annuel   → total 284 100 € (CA par mois sur 12 mois)
 */
type PeriodDataset = { labels: string[]; data: number[]; yMax: number; stepSize: number };

const datasets: Record<string, PeriodDataset> = {
  week: {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    data:   [870,   1040,  920,  1380, 1450,  1650, 1110],
    yMax: 2000, stepSize: 500,
  },
  month: {
    labels: ["S1", "S2", "S3", "S4"],
    data:   [5200, 6100, 5900, 7380],
    yMax: 9000, stepSize: 2000,
  },
  "3months": {
    labels: ["Mois 1", "Mois 2", "Mois 3"],
    data:   [20400, 22400, 25550],
    yMax: 30000, stepSize: 5000,
  },
  year: {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    data:   [17800, 18500, 20300, 22000, 23500, 22800, 25500, 26100, 27000, 24500, 26500, 29600],
    yMax: 35000, stepSize: 5000,
  },
};

const current = computed<PeriodDataset>(() => datasets[props.period] ?? datasets.week!);

const chartData = computed(() => ({
  labels: current.value.labels,
  datasets: [
    {
      data: current.value.data,
      borderColor: "#7658ef",
      backgroundColor: isDark.value
        ? "rgba(118, 88, 239, 0.12)"
        : "rgba(118, 88, 239, 0.10)",
      fill: true,
      tension: 0.45,
      pointRadius: 3,
      pointBackgroundColor: "#7658ef",
      pointBorderColor: isDark.value ? "#20202d" : "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "#7658ef",
      pointHoverBorderColor: isDark.value ? "#20202d" : "#fff",
      pointHoverBorderWidth: 3,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 900, easing: "easeOutQuart" as const },
  interaction: { intersect: false, mode: "index" as const },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: isDark.value ? "#29293a" : "#20202d",
      titleColor: "#a0a0b8",
      bodyColor: "#ffffff",
      padding: 12,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        title: (items: { label: string }[]) => items[0]?.label ?? "",
        label: (ctx: { parsed: { y: number | null } }) =>
          `  ${(ctx.parsed.y ?? 0).toLocaleString("fr-FR")} €`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: labelColor.value, font: { size: 11 } },
    },
    y: {
      min: 0,
      max: current.value.yMax,
      border: { display: false, dash: [4, 4] },
      ticks: {
        stepSize: current.value.stepSize,
        color: labelColor.value,
        font: { size: 11 },
        callback: (value: string | number) => {
          const v = Number(value);
          if (v === 0) return "0";
          if (v >= 1000) return `${v / 1000}k`;
          return `${v}`;
        },
      },
      grid: { color: gridColor.value },
    },
  },
}));
</script>

<template>
  <div class="h-[220px] w-full mt-4">
    <ClientOnly>
      <Line :data="chartData" :options="chartOptions" />
    </ClientOnly>
  </div>
</template>

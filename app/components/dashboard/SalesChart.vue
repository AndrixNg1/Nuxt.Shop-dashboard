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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

const props = defineProps({
  period: {
    type: String,
    default: "week",
  },
});

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const gridColor = computed(() => (isDark.value ? "#303044" : "#f0f0f5"));
const labelColor = computed(() => (isDark.value ? "#8e8ea4" : "#a7a8b5"));

const chartData = computed(() => {
  let labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  let data = [1200, 950, 1400, 1100, 1350, 1600, 820]; // Somme = 8 420 €

  if (props.period === "month") {
    labels = ["S1", "S2", "S3", "S4"];
    data = [5800, 6200, 5200, 7380]; // Somme = 24 580 €
  } else if (props.period === "3months") {
    labels = ["Mois 1", "Mois 2", "Mois 3"];
    data = [21000, 22500, 24850]; // Somme = 68 350 €
  } else if (props.period === "year") {
    labels = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];
    data = [
      19000, 18500, 21000, 22500, 24000, 23500, 26000, 25500, 27000, 24500,
      25000, 27600,
    ]; // Somme = 284 100 €
  }

  return {
    labels,
    datasets: [
      {
        data,
        borderColor: "#7658ef",
        backgroundColor: "rgba(118, 88, 239, .16)",
        fill: true,
        tension: 0.42,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#7658ef",
        pointHoverBorderColor: isDark.value ? "#20202d" : "#fff",
        pointHoverBorderWidth: 3,
      },
    ],
  };
});

const chartOptions = computed(() => {
  let max = 3000;
  let stepSize = 1000;

  if (props.period === "month") {
    max = 10000;
    stepSize = 2500;
  } else if (props.period === "3months") {
    max = 30000;
    stepSize = 10000;
  } else if (props.period === "year") {
    max = 50000;
    stepSize = 10000;
  }

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1300, easing: "easeOutQuart" as const },
    interaction: { intersect: false, mode: "index" as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark.value ? "#29293a" : "#20202d",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: { parsed: { y: number | null } }) =>
            `${(context.parsed.y ?? 0).toLocaleString("fr-FR")} €`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: labelColor.value, font: { size: 10 } },
      },
      y: {
        min: 0,
        max,
        ticks: {
          stepSize,
          color: labelColor.value,
          font: { size: 10 },
          callback: (value: string | number) =>
            value === 0 ? "0" : `${Number(value) / 1000}k`,
        },
        grid: { color: gridColor.value },
      },
    },
  };
});
</script>

<template>
  <div class="h-[250px] w-full relative mt-4">
    <ClientOnly>
      <Line :data="chartData" :options="chartOptions" />
    </ClientOnly>
  </div>
</template>

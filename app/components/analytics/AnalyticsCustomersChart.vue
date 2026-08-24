<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  labels: string[];
  data: number[];
}>();

const chartData = computed<ChartData<'bar'>>(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        label: "Dépenses (€)",
        data: props.data,
        backgroundColor: '#10b981', // emerald-500
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<'bar'>>(() => {
  return {
    indexAxis: 'y', // This makes it horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.x !== null) {
              label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(context.parsed.x);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9ca3af',
          font: { family: 'Inter, sans-serif', size: 12 },
          callback: function(value) { return value + ' €'; }
        }
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: '#6b7280', // gray-500
          font: { family: 'Inter, sans-serif', size: 12, weight: 'bold' }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };
});
</script>

<template>
  <div class="relative w-full h-[300px]">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

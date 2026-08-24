<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps<{
  labels: string[];
  data: number[];
}>();

const chartData = computed<ChartData<'line'>>(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        label: "Chiffre d'affaires (€)",
        data: props.data,
        borderColor: '#9333ea', // purple-600
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#9333ea',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<'line'>>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)', // gray-900
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb', // gray-200
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#9ca3af', // gray-400
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)', // gray-400 with opacity
          drawBorder: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          callback: function(value) {
            return value + ' €';
          }
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
  <div class="relative w-full h-[300px] sm:h-[400px]">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

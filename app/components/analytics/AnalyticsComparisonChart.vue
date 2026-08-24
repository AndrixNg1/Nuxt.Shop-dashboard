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
  ordersData: number[];
  productsData: number[];
}>();

const chartData = computed<ChartData<'bar'>>(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        label: "Commandes",
        data: props.ordersData,
        backgroundColor: '#0ea5e9',
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
      {
        label: "Produits vendus",
        data: props.productsData,
        backgroundColor: '#f59e0b',
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };
});

const chartOptions = computed<ChartOptions<'bar'>>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
          boxWidth: 8,
          font: { family: 'Inter, sans-serif', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: '#9ca3af',
          font: { family: 'Inter, sans-serif', size: 12 }
        }
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9ca3af',
          font: { family: 'Inter, sans-serif', size: 12 }
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

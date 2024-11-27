<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const totalSales = ref(null);

const fetchTotalSales = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/total_sales`);
    totalSales.value = response.data; 
    console.log("Total Sales:", response.data);
  } catch (error) {
    console.error("Error fetching total sales:", error);
  }
};

onMounted(fetchTotalSales);

const cards = [
  { title: "Total Sales", icon: "💵" },
  { title: "Orders", value: "345", icon: "📦" },
  { title: "Customers", value: "1,234", icon: "👥" },
  { title: "Revenue", value: "$23,456", icon: "📈" },
];
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="p-4 bg-white shadow rounded-lg flex items-center space-x-4"
    >
      <div class="text-3xl">{{ card.icon }}</div>
      <div>
        <h3 class="text-xl font-semibold">{{ card.title }}</h3>
        <p class="text-gray-600">
          {{ card.title === "Total Sales" ? (totalSales ?? "Loading...") : card.value }}
        </p>
      </div>
    </div>
  </div>
</template>


<style>
</style>

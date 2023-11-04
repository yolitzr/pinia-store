<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./store/ProductStore";

// Import an store from pinia
// import { storeToRefs } from "pinia";
// const { products, getFetchProducts } = storeToRefs(useProductStore())

const productStore = useProductStore()

// Get Data from api
productStore.getFetchProducts()
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product" />
    </ul>
  </div>
</template>

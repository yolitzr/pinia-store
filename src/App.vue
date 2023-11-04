<script setup>

import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./store/ProductStore";
import { useCartStore } from "./store/CartStore";

// Import an store from pinia
// import { storeToRefs } from "pinia";
// const { products, getFetchProducts } = storeToRefs(useProductStore())

const productStore = useProductStore()
const cartStore = useCartStore()

// Get Data from api
productStore.getFetchProducts()

// I can use this function or I can use the action function
// const addToCart = (count, product) => {
//   count = parseInt(count)

//   // One mutation to add one o more registrations to cart
//   cartStore.$patch(state => {
//     for (let index = 0; index < count; index++) {
//       state.items.push(product)
//     }
//   })
// }

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.redo">Redo</AppButton>

      <AppButton class="ml-2" @click="cartStore.undo">Undo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItemsToCart($event, product)" />
    </ul>
  </div>
</template>

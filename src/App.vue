<template>
  <RouterView />
  <Loading :show="blockLoading.length >= 1"></Loading>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Loading from './components/Loading.vue';
import { useUIStore } from './stores';
import {computed} from 'vue'

let uiStore = useUIStore()
let blockLoading = computed(() => uiStore.blockLoading)
</script>

<style scoped></style>

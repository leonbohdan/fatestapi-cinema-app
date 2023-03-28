<script setup>
import BaseTabs from '@/components/base/BaseTabs.vue';
import { useMoviesStore } from '@/stores/moviesStore.js';

const moviesStore = useMoviesStore();
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-container class="d-flex align-center">
          <v-toolbar-title>Cinema App</v-toolbar-title>
        </v-container>
      </v-app-bar>

      <v-main style="min-height: 100vh;">
        <v-container>
          <BaseTabs/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

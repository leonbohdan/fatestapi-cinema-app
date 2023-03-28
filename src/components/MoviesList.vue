<script setup>
import { ref, watch } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { useMoviesStore } from '@/stores/moviesStore.js';
import BaseSearch from '@/components/base/BaseSearch.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';
import { MOVIE_CONSTANTS_CONFIG } from '@/constants/movie.constants.js';

const moviesStore = useMoviesStore();

moviesStore.getMoviesList();

const search = ref('');

watch(search, (value) => {
  moviesStore.setMoviesParams({ name: value });
});

watch(
  moviesStore.$state.moviesParams,
  () => moviesStore.getMoviesList(),
  { deep: true },
);

const isShowDialog = ref(false);
const chosenMovie = ref({});

const headers = ref([
  {
    key: 'name',
    title: 'Name',
    sortable: false,
    filterable: true,
  }, {
    key: 'genre',
    title: 'Genre',
    align: 'center',
    sortable: false,
  },{
    key: 'image',
    title: 'Image',
    align: 'center',
    sortable: false,
  },{
    key: 'actions',
    title: 'Actions',
    align: 'center',
    sortable: false,
  },
]);

const handleClickRow = async ({ target }, { item }) => {
  chosenMovie.value = item.raw;
  isShowDialog.value = true;
};
</script>

<template>
  <v-card
    :loading="moviesStore.moviesLoading"
    border
  >
    <v-expand-transition>
      <v-row dense align="center">
        <v-col cols="5" class="pa-4 mr-auto">
          <BaseSearch
            v-model="search"
          />
        </v-col>

        <v-col cols="5" class="pa-4">
          <v-select
            chips
            density="compact"
            variant="outlined"
            clearable
            hide-details
            placeholder="Select genre"
            :items="['e', 'd']"
          />
        </v-col>
      </v-row>
    </v-expand-transition>

    <VDataTable
      :items-per-page="50"
      :headers="headers"
      :items="moviesStore.movies"
      :search="search"
      item-value="id"
      @click:row="handleClickRow"
    >
      <template #item.genre="{ item }">
        <v-chip>
          {{ MOVIE_CONSTANTS_CONFIG[item.props.title.genre].text }}
        </v-chip>
      </template>

      <template #item.image="{ item }">
        <v-avatar>
          <v-img
            :src="item.props.title.image"
            cover
          />
        </v-avatar>
      </template>

      <template #item.actions>
        <v-icon
          size="small"
          class="me-2"
        >
          mdi-pencil
        </v-icon>

        <v-icon
          size="small"
        >
          mdi-delete
        </v-icon>
      </template>
    </VDataTable>
  </v-card>

  <BaseDialog
    v-model="isShowDialog"
    :title="chosenMovie.name"
  >
    <v-row>
      <v-col cols="6">
        <v-img :src="chosenMovie.image" :lazy-src="chosenMovie.image" min-height="400px" class="mb-2"/>

        <div v-html="chosenMovie.description"/>
      </v-col>

      <v-col cols="6" class="p-0">
        <div class="pl-2" v-html="chosenMovie.additional"/>
      </v-col>
    </v-row>
  </BaseDialog>
</template>

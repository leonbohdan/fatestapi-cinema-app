<script setup>
import { ref, watch } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { useMoviesStore } from '@/stores/moviesStore.js';
import BaseSearch from '@/components/base/BaseSearch.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';
import { MOVIE_GENRES_FILTER, MOVIE_CONSTANTS_CONFIG } from '@/constants/movie.constants.js';

const moviesStore = useMoviesStore();

moviesStore.getMoviesList();

const genre = ref(null);

watch(genre, (value) => {
  moviesStore.setMoviesParams({ genres: value });
});

const search = ref('');

watch(search, (value) => {
  moviesStore.setMoviesParams({ name: value });
});

watch(
  () => moviesStore.moviesParams,
  () => moviesStore.getMoviesList(),
  { deep: true },
);

const isShowMovieInfo = ref(false);
const isShowMovieSessions = ref(false);
const chosenMovie = ref({});
const chosenMovieSessions = ref({});

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

const showMovieInfo = async (raw) => {
  chosenMovie.value = raw;

  chosenMovieSessions.value = await moviesStore.getMovieShow(raw.id);

  isShowMovieInfo.value = true;
};

const showMovieSessins = async (raw) => {
  chosenMovie.value = raw;

  // await moviesStore.getMovieShow(raw.id);
  //
  isShowMovieSessions.value = true;
};

const bookTicket = async (raw) => {
  console.log('bookTicket', raw);
  // isShowDialog.value = true;
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
            v-model="genre"
            density="compact"
            variant="outlined"
            clearable
            hide-details
            label="Select genre"
            :items="MOVIE_GENRES_FILTER"
            @click:clear="genre = null"
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
    >
      <template #item.name="{ item }">
        <span v-html="item.props.title.name"/>
      </template>

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

      <template #item.actions="{ item }">
        <v-btn
          icon
          size="small"
          elevation="0"
          @click="showMovieInfo(item.props.title)"
        >
          <v-icon icon="mdi-information-outline"/>
        </v-btn>

        <v-btn
          icon
          size="small"
          elevation="0"
          @click="showMovieSessins(item.props.title)"
        >
          <v-icon icon="mdi-filmstrip"/>
        </v-btn>

        <!--        <v-btn-->
        <!--          icon-->
        <!--          size="small"-->
        <!--          elevation="0"-->
        <!--          @click="bookTicket(item.props.title)"-->
        <!--        >-->
        <!--          <v-icon icon="mdi-ticket-confirmation"/>-->
        <!--        </v-btn>-->
      </template>
    </VDataTable>
  </v-card>

  <BaseDialog
    v-model="isShowMovieInfo"
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

    <div class="d-flex align-center justify-center my-4">
      <v-chip text="Sessions" color="primary"/>
    </div>

    <v-row>
      <v-col cols="12">
        {{ chosenMovieSessions }}
      </v-col>
    </v-row>
  </BaseDialog>

  <BaseDialog
    v-model="isShowMovieSessions"
    :title="chosenMovie.name"
  >
    <v-row>
      <v-col cols="6">
        <!--        <v-img :src="chosenMovie.image" :lazy-src="chosenMovie.image" min-height="400px" class="mb-2"/>-->

        <!--        <div v-html="chosenMovie.description"/>-->
        {{ moviesStore.movieShows }}
      </v-col>

      <v-col cols="6" class="p-0">
        <!--        <div class="pl-2" v-html="chosenMovie.additional"/>-->
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        col
      </v-col>
    </v-row>
  </BaseDialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useConfirmDialog } from '@vueuse/core';
import { VDataTable } from 'vuetify/labs/components';
import { useMoviesStore } from '@/stores/moviesStore.js';
import BaseSearch from '@/components/base/BaseSearch.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';
import { MOVIE_GENRES_FILTER, MOVIE_CONSTANTS_CONFIG } from '@/constants/movie.constants.js';

const {
  isRevealed,
  reveal,
  confirm,
} = useConfirmDialog();

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
const isBookTicket = ref(false);

const chosenMovie = ref({});
const chosenMovieSessions = ref({});
const freeMovieSessions = ref({});
const movieParams = ref({
  movie_id: null,
  showdate: '',
  daytime: '',
  seat: '',
  row: '',
});

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

  movieParams.value.movie_id = raw.id;

  const sessions = await moviesStore.getMovieShow(raw.id);

  chosenMovieSessions.value = Object.values(sessions)[0];

  isShowMovieInfo.value = true;
};

const handleChosenSession = async (showdate, daytime) => {
  isShowMovieInfo.value = false;

  movieParams.value.showdate = showdate;
  movieParams.value.daytime = daytime;

  await moviesStore.setPlacesParams({
    movie_id: chosenMovie.value.id,
    showdate,
    daytime,
  });

  freeMovieSessions.value = await moviesStore.checkFree();
  
  isShowMovieSessions.value = true;
};

const bookTicket = async (seat, row) => {
  movieParams.value.row = row;
  movieParams.value.seat = seat;

  const { data, isCanceled } = await reveal();

  if (!isCanceled) {
    await moviesStore.setBookPlaceParams({
      movie_id: chosenMovie.value.id,
      seat,
      row,
      showdate: movieParams.value.showdate,
      daytime: movieParams.value.daytime,
    });

    const ticket = await moviesStore.bookPlaceTicket();

    console.log('ticket', ticket);

    isBookTicket.value = true;

    setTimeout(() => {
      isBookTicket.value = false;
    }, 2000);

    isShowMovieSessions.value = false;
    handleCloseDialog();
  }
};

const handleCloseDialog = () => {
  chosenMovie.value = {};
  chosenMovieSessions.value = {};
  freeMovieSessions.value = {};
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
      </template>
    </VDataTable>
  </v-card>

  <BaseDialog
    v-model="isShowMovieInfo"
    :title="chosenMovie.name"
    @close-dialog="handleCloseDialog"
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
        <v-list class="pt-0">
          <v-list-item
            v-for="(session, i) in chosenMovieSessions"
            :key="i"
            class="px-0"
          >
            <template #title>
              <span>
                Date: <b>{{ session.showdate }}</b>
              </span>
            </template>

            <template #subtitle>
              <v-chip-group class="flex align-center justify-space-between">
                <v-chip
                  v-for="(time, index) in session.daytime.split(';')"
                  :key="index"
                  :text="time"
                  class="mr-1 mt-1"
                  @click="handleChosenSession(session.showdate, time)"
                />
              </v-chip-group>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </BaseDialog>

  <BaseDialog
    v-model="isShowMovieSessions"
    :title="chosenMovie.name"
    @close-dialog="handleCloseDialog"
  >
    <v-row>
      <v-col cols="12">
        <v-list class="pt-0">
          <v-list-item
            v-for="([{ row }, seats], i) in freeMovieSessions"
            :key="i"
            class="px-0"
          >
            <template #title>
              <span>
                Row: <b>{{ row }}</b>
              </span>
            </template>

            <template #subtitle>
              <v-chip-group class="flex align-center justify-space-between">
                <v-chip
                  v-for="({ seat, is_free }, index) in seats"
                  :key="index"
                  :disabled="!is_free"
                  :class="['mr-1 mt-1', is_free ? 'bg-success' : 'bg-error']"
                  @click="bookTicket(seat, row)"
                >
                  <template #default>
                    <span>
                      {{ seat }}
                    </span>
                  </template>
                </v-chip>
              </v-chip-group>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </BaseDialog>

  <v-alert
    v-if="isBookTicket"
    type="success"
    title="Success"
    text="Ticket booked successfully!"
    class="position-absolute"
    style="top: 0; right: 0;"
  />

  <teleport to="#app">
    <v-dialog
      v-if="isRevealed"
      v-model="isRevealed"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          Do you want to book the ticket?
        </v-card-title>

        <v-card-text class="px-5">
          <v-list class="pt-0">
            <v-list-item class="px-0">
              <template #title>
                <span>
                  Movie: <b>{{ chosenMovie.name }}</b>
                </span>
              </template>
            </v-list-item>

            <v-list-item class="px-0">
              <template #title>
                <span>
                  Date: <b>{{ movieParams.showdate }}</b>
                </span>
              </template>
            </v-list-item>

            <v-list-item class="px-0">
              <template #title>
                <span>
                  Time: <b>{{ movieParams.daytime }}</b>
                </span>
              </template>
            </v-list-item>

            <v-list-item class="px-0">
              <template #title>
                <span>
                  Row: <b>{{ movieParams.row }}</b>
                </span>
              </template>
            </v-list-item>

            <v-list-item class="px-0">
              <template #title>
                <span>
                  Seat: <b>{{ movieParams.seat }}</b>
                </span>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="red-darken-1"
            variant="text"
            @click="confirm(false)"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green-darken-1"
            variant="text"
            @click="confirm(true)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </teleport>
</template>

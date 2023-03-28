<script setup>
import { ref, computed } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { useMoviesStore } from '@/stores/moviesStore.js';
import BaseSearch from '@/components/base/BaseSearch.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';

const moviesStore = useMoviesStore();

// moviesStore.getMoviesList();

const search = ref('');
const movieName = ref('');
const isShowDialog = ref(false);

const headers = [
  {
    key: 'name',
    title: 'Name',
    sortable: false,
    filterable: true,
  }, {
    key: 'genre',
    title: 'Genre',
    sortable: false,
  },{
    key: 'description',
    title: 'Description',
    sortable: false,
  },{
    key: 'image',
    title: 'Image',
    sortable: false,
  },{
    key: 'actions',
    title: 'Actions',
    sortable: false,
  },
];

// const filteredTodos = computed(() => {
//   if (!search.value) {
//     return todosStore.todos;
//   }
//
//   return todosStore.todos.filter(({ title }) => title.includes(search.value));
// });
//
const handleClickRow = async ({ target }, { item }) => {
  console.log('handleClickRow', item);
  // const userId = item.raw.userId;
  //
  // const { data } = await getUser(userId);
  //
  // userName.value = data.name;
  isShowDialog.value = true;
};

const description = computed(() => {
  return 'Description';
});

</script>

<template>
  <v-card
    :loading="moviesStore.moviesLoading"
    border
  >
    <v-expand-transition>
      <v-row dense align="center">
        <v-col cols="6" class="pa-4">
          <BaseSearch
            v-model="search"
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
      <!--      <template #item.completed="{ item }">-->
      <!--        <v-icon-->
      <!--          :icon="handleCompleted(item.completed).icon"-->
      <!--          :color="handleCompleted(item.completed).color"-->
      <!--        />-->
      <!--      </template>-->
    </VDataTable>
  </v-card>

  <BaseDialog
    v-model="isShowDialog"
    :description="description"
  />
</template>

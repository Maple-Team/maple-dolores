<script setup lang="ts">
import { ref } from 'vue'
import { usePaginationQuery } from './api'

const tagColors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#5b6d8e', '#843534', '#9c69e2', '#3f8600', '#dc2626']
const getRandomIndex = () => {
  return Math.floor(Math.random() * tagColors.length)
}
const pageSize = ref<number>(10)
const current = ref<number>(1)

const { data, isFetching } = usePaginationQuery({ pageSize: pageSize.value, current })
</script>

<template>
  <div class="flex flex-col">
    <a-spin
      :spinning="isFetching"
      wrapperClassName="flex-1 overflow-auto bg-white p-2"
    >
      <a-row :gutter="[16, 16]">
        <a-col
          :span="4"
          v-for="{ _id, date, actresses, title, tags, code, cover } in data?.records"
          :key="_id"
        >
          <RouterLink :to="`/video/${_id}`">
            <span>{{ title }} ({{ code }}) {{ date }}</span>
            <img
              :src="cover"
              :alt="title"
            />
            <a-tag
              v-for="(tag, index) in tags"
              :key="tag"
              :color="tagColors[index]"
            >
              {{ tag }}
            </a-tag>
            <a-tag
              v-for="actress in actresses"
              :key="actress"
              :color="tagColors[getRandomIndex()]"
            >
              {{ actress }}
            </a-tag>
          </RouterLink>
        </a-col>
      </a-row>
    </a-spin>
    <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="data?.pagination.total"
      class="bg-white !p-2 rounded"
    />
  </div>
</template>

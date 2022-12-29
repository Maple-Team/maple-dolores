<template>
  <a-form :layout="'inline'">
    <a-row class="w-full py-2">
      <a-col :span="6">
        <a-form-item label="年份">
          <a-select v-model:value="modelRef.year">
            <a-select-option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="标题">
          <a-input v-model:value="modelRef.path" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item>
          <a-button
            type="primary"
            @click.prevent="onSubmit"
            htmlType="submit"
          >
            查找
          </a-button>
          <a-button
            style="margin-left: 10px"
            @click.prevent="handleReset"
            >重置</a-button
          >
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <template v-if="error"> {{ JSON.stringify(error) }}</template>
  <template v-else>
    <div class="max-h-[700px] overflow-auto">
      <a-table
        :dataSource="data?.records"
        :columns="columns"
        :pagination="{ ...data?.pagination, onChange, onShowSizeChange, showQuickJumper: true }"
        :loading="isLoading"
        rowKey="_id"
      />
    </div>
  </template>
</template>
<script setup lang="ts">
import { h, ref, reactive, toRaw, unref } from 'vue'
import { Tag } from 'ant-design-vue'
import type { TableColumnProps } from 'ant-design-vue'
import { SonYoonJoo } from './type'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { fetchCategory, fetchList } from './api'

const searchKey = 'sonyoonjoo-list'

const modelRef = reactive<Partial<SonYoonJoo>>({})
const router = useRouter()
const { query } = useRoute()
const { page } = query as { page?: number }
const current = ref<number>(page || 1)
const pageSize = ref<number>(10)
const path = ref<string>()
const year = ref<number>()

const { isLoading, data, error } = useQuery<BaseList<SonYoonJoo>>(
  [
    searchKey,
    {
      current: toRaw(current),
      pageSize: toRaw(pageSize),
      path: toRaw(path),
      year: toRaw(year),
    },
  ],
  () =>
    fetchList({
      page: unref(current),
      pageSize: unref(pageSize),
      path: unref(path),
      year: unref(year),
    }),
  {
    refetchOnWindowFocus: true,
    select: (data) => {
      return {
        ...data,
        records: data.records.map(({ path, ...rest }) => ({
          ...rest,
          path,
          title: path.split('/').pop(),
        })),
      }
    },
  }
)

const onSubmit = () => {
  const data = toRaw(modelRef)
  year.value = data.year
  path.value = data.path
  current.value = 1
}
const columns: TableColumnProps<SonYoonJoo>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    customRender: ({ text, record }) => h(RouterLink, { to: `/sonyoonjoo/${record._id}` }, () => [text]),
  },
  {
    title: '是否推荐',
    dataIndex: 'isRecommend',
    customRender: ({ record }) => {
      if (record.isRecommend) {
        return h(Tag, { color: 'red' }, () => ['精选'])
      }
    },
  },
  { title: '日期', dataIndex: 'date' },
  { title: '年份', dataIndex: 'year' },
  {
    title: '预览',
    customRender: ({ record }) => {
      if (record?.images?.length) {
        return h('img', { src: `http://localhost:4091${record.path}/${record?.images[0]}`, width: 150 }, () => [])
      }
    },
  },
]

const onChange = (page: number) => {
  router.push('/sonyoonjoo?page=' + page)
  current.value = page
}
const onShowSizeChange = (_: number, size: number) => {
  pageSize.value = size
}

const handleReset = () => {
  year.value = undefined
  path.value = undefined
}

const { data: categories } = useQuery<number[]>(['sonyoonjoo-category'], () => fetchCategory(), {
  refetchOnWindowFocus: true,
})
</script>

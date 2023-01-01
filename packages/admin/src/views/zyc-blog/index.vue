<template>
  <a-form :layout="'inline'">
    <a-row class="w-full py-2">
      <a-col :span="6">
        <a-form-item label="分类">
          <a-select v-model:value="modelRef.category">
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
        <a-form-item label="题目">
          <a-input v-model:value="modelRef.title" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="内容">
          <a-input v-model:value="modelRef.content" />
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
    <a-table
      :dataSource="data?.records"
      :columns="columns"
      :pagination="{ ...data?.pagination, onChange, onShowSizeChange }"
      :loading="isLoading"
      rowKey="_id"
    />
  </template>
</template>
<script setup lang="ts">
import { h, ref, reactive, toRaw } from 'vue'
import { Tag } from 'ant-design-vue'
import type { TableColumnProps } from 'ant-design-vue'
import { Blog } from './type'
import { RouterLink } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { fetchCategory, fetchList } from './api'

const searchKey = 'zyc-blog-list'

const modelRef = reactive<Partial<Blog>>({
  content: '',
  title: '',
  category: '',
})
const current = ref<number>(1)
const pageSize = ref<number>(10)
const content = ref<string>()
const title = ref<string>()
const category = ref<string>()

const { isLoading, data, error } = useQuery<BaseList<Blog>>(
  [
    searchKey,
    {
      current: toRaw(current),
      pageSize: toRaw(pageSize),
      content: toRaw(content),
      title: toRaw(title),
      category: toRaw(category),
    },
  ],
  fetchList,
  {
    refetchOnWindowFocus: true,
    networkMode: 'offlineFirst',
  }
)

const onSubmit = () => {
  const data = toRaw(modelRef)
  content.value = data.content
  title.value = data.title
  category.value = data.category
}
const columns: TableColumnProps<Blog>[] = [
  {
    title: '题目',
    dataIndex: 'title',
    customRender: ({ text, record }) => h(RouterLink, { to: `/zyc-blog/${record._id}` }, () => [text]),
  },
  { title: '字数', dataIndex: 'reads' },
  {
    title: '是否推荐',
    dataIndex: 'isRecommend',
    customRender: ({ record }) => {
      if (record.isRecommend) {
        return h(Tag, { color: 'red' }, () => ['精选'])
      }
    },
  },
  { title: '发表日期', dataIndex: 'date' },
  { title: '类型', dataIndex: 'category' },
]

const onChange = (page: number) => {
  current.value = page
}
const onShowSizeChange = (_page: number, size: number) => {
  pageSize.value = size
}

const handleReset = () => {
  content.value = undefined
  title.value = undefined
  category.value = undefined
}

const { data: categories } = useQuery<string[]>(['zyc-blog-category'], fetchCategory, {
  refetchOnWindowFocus: true,
  networkMode: 'offlineFirst',
})
</script>

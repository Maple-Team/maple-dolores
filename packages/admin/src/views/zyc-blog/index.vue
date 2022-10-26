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
            @click="handleReset"
            >重置</a-button
          >
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <a-table
    :dataSource="blogs"
    :columns="columns"
    :pagination="pagination"
    rowKey="_id"
  />
</template>
<script setup lang="ts">
import { h, computed, ComputedRef, ref, onMounted, reactive, toRaw } from 'vue'
import { Tag, Form } from 'ant-design-vue'
import type { TablePaginationConfig, TableColumnProps } from 'ant-design-vue'
import { Blog } from './type'
import { RouterLink } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { fetchCategory, fetchList } from './api'

const useForm = Form.useForm
const modelRef = reactive<Partial<Blog>>({
  content: '',
  title: '',
  category: '',
})

const { resetFields } = useForm(modelRef)

const onSubmit = () => {
  const data = toRaw(modelRef)
  fetchList({ current: current.value, pageSize: pageSize.value, ...data }).then(({ records, pagination }) => {
    blogs.value = records
    pageSize.value = pagination.pageSize
    current.value = pagination.current
    total.value = pagination.total
  })
}
const columns: TableColumnProps<Blog>[] = [
  {
    title: '题目',
    dataIndex: 'title',
    customRender: ({ text, record }) => {
      return h(RouterLink, { to: `/zyc-blog/${record._id}` }, () => [text])
    },
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
const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const blogs = ref<Blog[]>([])

// const { isLoading, data, error } = useQuery<BaseList<Blog>>(
//   [
//     'zyc-blog-list',
//     {
//       current: current.value,
//       pageSize: pageSize.value,
//     },
//   ],
//   () => fetchList({ current: current.value, pageSize: pageSize.value })
//   // { refetchInterval: 30 * 1000 }
// )
const pagination: ComputedRef<TablePaginationConfig> = computed(() => {
  return {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    onChange: (page) => {
      console.log(page, 'onChange')
      current.value = page
      fetchList({ current: current.value, pageSize: pageSize.value }).then(({ records, pagination }) => {
        blogs.value = records
        pageSize.value = pagination.pageSize
        current.value = pagination.current
        total.value = pagination.total
      })
    },
    onShowSizeChange: (_page, size) => {
      console.log(_page, size, 'onShowSizeChange')
      pageSize.value = size
      fetchList({ current: current.value, pageSize: pageSize.value }).then(({ records, pagination }) => {
        blogs.value = records
        pageSize.value = pagination.pageSize
        current.value = pagination.current
        total.value = pagination.total
      })
    },
  }
})

const categories = ref<string[]>()
onMounted(() => {
  fetchCategory().then((d) => {
    categories.value = d
  })
  fetchList({ current: current.value, pageSize: pageSize.value }).then(({ records, pagination }) => {
    blogs.value = records
    pageSize.value = pagination.pageSize
    current.value = pagination.current
    total.value = pagination.total
  })
})
const handleReset = () => {
  fetchList().then(({ records, pagination }) => {
    blogs.value = records
    pageSize.value = pagination.pageSize
    current.value = pagination.current
    total.value = pagination.total
  })
  resetFields()
}
</script>

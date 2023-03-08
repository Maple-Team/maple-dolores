<template>
  <a-form :layout="'inline'">
    <a-row class="w-full py-2">
      <a-col :span="6">
        <a-form-item label="标签">
          <a-select v-model:value="modelRef.tags">
            <a-select-option
              v-for="tag in []"
              :key="tag"
              :value="tag"
            >
              {{ tag }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="模特">
          <a-input v-model:value="modelRef.modelName" />
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
import { h, ref, reactive, toRaw, unref, watch } from 'vue'
import { Tag } from 'ant-design-vue'
import type { TableColumnProps } from 'ant-design-vue'
import { Meitu } from './type'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { fetchTags, fetchList } from './api'

const searchKey = 'meitulu-list'

const modelRef = reactive<Partial<Meitu>>({})
const router = useRouter()
const { query } = useRoute()
const { page } = query as { page?: number }

// TODO 根据路由更新数据
watch(
  () => query,
  (n) => {
    console.log(n, 'n')
  }
)

const current = ref<number>(page || 1)
const pageSize = ref<number>(10)

const title = ref<string>()
const modelName = ref<string>()
const tagName = ref<string>()
const orgName = ref<string>()

const { isLoading, data, error } = useQuery<BaseList<Meitu>>(
  [
    searchKey,
    {
      current: toRaw(current),
      pageSize: toRaw(pageSize),
      title: toRaw(title),
      modelName: toRaw(modelName),
      tagName: toRaw(tagName),
      orgName: toRaw(orgName),
    },
  ],
  () =>
    fetchList({
      page: unref(current),
      pageSize: unref(pageSize),
      title: unref(title),
      modelName: unref(modelName),
      tagName: unref(tagName),
      orgName: unref(orgName),
    }),
  {
    refetchOnWindowFocus: true,
    networkMode: 'offlineFirst',
  }
)

const onSubmit = () => {
  const data = toRaw(modelRef)
  title.value = data.title
  // @ts-ignore
  modelName.value = data.modelName as string
  // @ts-ignore
  tagName.value = data.tagName as string
  orgName.value = data.orgName
  current.value = 1
}
const columns: TableColumnProps<Meitu>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    customRender: ({ text, record }) => h(RouterLink, { to: `/xiuren/${record._id}` }, () => [text]),
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
  {
    title: '标签',
    dataIndex: 'tags',
    customRender: ({ record }) => {
      return record.tags.map((tag) =>
        h(
          RouterLink,
          {
            key: tag,
            to: `/xiuren?tag=${tag}`,
          },
          () => [h(Tag, { color: 'red' }, () => [tag])]
        )
      )
    },
  },
  {
    title: '模特',
    dataIndex: 'modelName',
    customRender: ({ record }) => {
      return record.modelName.map((model) =>
        h(
          RouterLink,
          {
            key: model,
            to: `/xiuren?modelName=${model}`,
          },
          () => [h(Tag, { color: 'blue' }, () => [model])]
        )
      )
    },
  },
  {
    title: '机构',
    dataIndex: 'orgName',
    customRender: ({ record }) => {
      return h(Tag, { color: 'green' }, () => [record.orgName])
    },
  },
  {
    title: '预览',
    customRender: ({ record }) => {
      if (record?.images?.length) {
        return h(
          'img',
          {
            src: `http://localhost:4091/ins/Meitulu/${record.title}/${
              record?.images.filter((file) => !file.startsWith('.'))[0]
            }`,
            width: 150,
          },
          () => []
        )
      }
    },
  },
]

const onChange = (page: number) => {
  router.push('/xiuren?page=' + page)
  current.value = page
}
const onShowSizeChange = (_: number, size: number) => {
  pageSize.value = size
}

const handleReset = () => {
  title.value = undefined
  modelName.value = undefined
  tagName.value = undefined
  orgName.value = undefined
}

// const { data: tags } = useQuery<string[]>(['xiuren-tags'], () => fetchTags(), {
//   refetchOnWindowFocus: true,
// networkMode: 'offlineFirst',
// })
</script>

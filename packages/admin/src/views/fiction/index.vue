<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      label="Book Name"
      v-bind="validateInfos.bookName"
    >
      <a-input v-model:value="modelRef.bookName"></a-input>
    </a-form-item>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        key="input"
        tab="Textarea"
      >
        <a-form-item
          label="Chapter Name"
          v-bind="validateInfos.chapterName"
        >
          <a-input v-model:value="modelRef.chapterName"></a-input>
        </a-form-item>
        <a-form-item
          label="Chapter No."
          v-bind="validateInfos.chapterNo"
        >
          <a-input-number
            v-model:value="modelRef.chapterNo"
            :min="0"
            :step="1"
          ></a-input-number>
        </a-form-item>
        <a-form-item
          label="Chapter Content"
          v-bind="validateInfos.chapterContent"
        >
          <a-textarea
            v-model:value="modelRef.chapterContent"
            allowClear
          ></a-textarea>
        </a-form-item>
        <a-form-item label="Chapter Words">
          <a-input-number
            v-model:value="modelRef.words"
            :min="0"
          ></a-input-number>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane
        key="upload"
        tab="Upload"
      >
        <a-upload
          multiple
          :file-list="fileList"
          :before-upload="beforeUpload"
          @remove="handleRemove"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Upload
          </a-button>
        </a-upload>
      </a-tab-pane>
    </a-tabs>
    <!-- <a-form-item label="labels">
    <a-form-item label="labels">
      <a-select
        v-model:value="modelRef.labels"
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="选择或输入标签"
      >
        <a-select-option
          :value="label.id"
          v-for="label in labels"
          :key="label.id"
          >{{ label.name }}</a-select-option
        >
      </a-select>
    </a-form-item> -->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click.prevent="onSubmit"
        htmlType="submit"
      >
        创建
      </a-button>
      <a-button
        style="margin-left: 10px"
        @click="resetFields"
        >重置</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, toRaw, ref, computed } from 'vue'
import { Form, message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { useQuery } from '@tanstack/vue-query'
import { fetchLabels, save, upload } from './api'
import { Fiction, Label } from './type'
import { RuleObject } from 'ant-design-vue/lib/form'

const useForm = Form.useForm

const fileList = ref<File[]>([])
const uploading = ref<boolean>(false)
// TODO reactive vs ref
const activeKey = ref<'input' | 'upload'>('input')

const handleRemove = (file: File) => {
  const index = fileList.value?.indexOf(file) || -1
  const newFileList = fileList.value?.slice()
  index > -1 && newFileList?.splice(index, 1)
  fileList.value = newFileList
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...fileList.value, file]
  return false
}

const rulesRef = computed(() => {
  if (activeKey.value === 'input') {
    return {
      bookName: [{ required: true, message: '书名必需' }],
      chapterName: [{ required: true, message: '章节名必需' }],
      chapterContent: [{ required: true, message: '章节内容必需' }],
    } as Record<string, RuleObject[]>
  } else {
    return {
      bookName: [{ required: true, message: '书名必需' }],
    } as Record<string, RuleObject[]>
  }
})
const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 14 }

const modelRef = reactive<Fiction>({
  bookName: '',
  chapterName: '',
  chapterContent: '',
  chapterNo: 0,
  words: 0,
  labels: [],
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
const onSubmit = () => {
  validate()
    .then(() => {
      const data = toRaw(modelRef)
      if (activeKey.value === 'input') {
        save(data).then(() => {
          message.success('保存成功')
          // resetFields()
        })
      } else if (activeKey.value === 'upload') {
        const formData = new FormData()
        fileList.value.forEach((file) => {
          formData.append('fictions', file as File, encodeURIComponent(file.name))
        })
        formData.append('bookName', data.bookName)
        upload(formData).then(() => {
          message.success('保存成功')
          // resetFields()
        })
      }
    })
    .catch((err) => {
      // message.error(JSON.stringify(err))
      console.error(err)
    })
}

<<<<<<< HEAD
// const labelsQuery = useQuery<Label>(['labels'], fetchLabels)
// const labels = labelsQuery.data
=======
const labelsQuery = useQuery('labels', fetchLabels)
const labels = labelsQuery.data
>>>>>>> c2696c3c3071f2e95310fd2a0d9f53fd0b0c59de
</script>

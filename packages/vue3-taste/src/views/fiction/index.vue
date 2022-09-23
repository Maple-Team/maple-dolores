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
          <a-textarea v-model:value="modelRef.chapterContent"></a-textarea>
        </a-form-item>
        <a-form-item
          label="Chapter Words"
          v-bind="validateInfos.words"
        >
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
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click.prevent="onSubmit"
        htmlType="submit"
      >
        Create
      </a-button>
      <a-button
        style="margin-left: 10px"
        @click="resetFields"
        >Reset</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, toRaw, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { Form, message } from 'ant-design-vue'
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'

const useForm = Form.useForm
interface FormState {
  bookName: string
  chapterName: string
  chapterContent: string
  chapterNo: number
  words: number
}
const fileList = ref<UploadProps['fileList']>([])
const uploading = ref<boolean>(false)
// TODO reactive vs ref
const activeKey = ref<'input' | 'upload'>() // RuleRef 动态变化
const handleRemove: UploadProps['onRemove'] = (file) => {
  const index = fileList.value?.indexOf(file)
  const newFileList = fileList.value?.slice()
  newFileList?.splice(index, 1)
  fileList.value = newFileList
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...fileList.value, file]
  return false
}
//@ts-ignore FIXME
let rules: Record<keyof Partial<FormState>, Rule[]> = {}
if (activeKey.value === 'input') {
  rules['bookName'] = [{ required: true }]
  rules['chapterName'] = [{ required: false }]
  rules['chapterContent'] = [{ required: false }]
  rules['chapterNo'] = [{ type: 'number' }]
  rules['words'] = [{ type: 'number' }]
} else {
  rules['bookName'] = [{ required: true }]
}
console.log(activeKey.value, rules)
const rulesRef = reactive<Record<keyof FormState, Rule[]>>(rules)

const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 14 }

const modelRef = reactive<FormState>({
  bookName: '',
  chapterName: '',
  chapterContent: '',
  chapterNo: 0,
  words: 0,
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
const onSubmit = () => {
  validate()
    .then(() => {
      const data = toRaw(modelRef)
      if (activeKey.value === 'input') {
        axios
          .post(
            'http://localhost:3090/api/fiction',
            { ...data, words: data.chapterContent.length },
            {
              headers: {
                'X-API-VERSION': 'v1',
              },
            }
          )
          .then(() => {
            message.success('保存成功')
            resetFields()
          })
      } else if (activeKey.value === 'upload') {
        const formData = new FormData()
        fileList.value.forEach((file: UploadProps['fileList'][number]) => {
          formData.append('fictions', file as File, encodeURIComponent(file.name))
        })
        formData.append('bookName', data.bookName)
        axios
          .post('http://localhost:3090/api/fiction/upload', formData, {
            headers: {
              'X-API-VERSION': 'v1',
              ContentType: 'text/html',
            },
          })
          .then(() => {
            message.success('保存成功')
            resetFields()
          })
      }
    })
    .catch((err) => {
      message.error(JSON.stringify(err))
      console.log('error', err)
    })
}
</script>

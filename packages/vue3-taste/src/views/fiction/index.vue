<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Book Name" v-bind="validateInfos.bookName">
      <a-input v-model:value="modelRef.bookName"></a-input>
    </a-form-item>
    <a-form-item label="Chapter Name" v-bind="validateInfos.chapterName">
      <a-input v-model:value="modelRef.chapterName"></a-input>
    </a-form-item>
    <a-form-item label="Chapter No." v-bind="validateInfos.chapterNo">
      <a-input-number
        v-model:value="modelRef.chapterNo"
        :min="0"
        :step="1"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="Chapter Content" v-bind="validateInfos.chapterContent">
      <a-textarea v-model:value="modelRef.chapterContent"></a-textarea>
    </a-form-item>
    <a-form-item label="Read Count" v-bind="validateInfos.readCount">
      <a-input-number
        v-model:value="modelRef.readCount"
        :min="0"
        :step="1"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="Chapter Words" v-bind="validateInfos.words">
      <a-input-number v-model:value="modelRef.words" :min="0"></a-input-number>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit" htmlType="submit"
        >Create</a-button
      >
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, toRaw } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { Form } from "ant-design-vue";
import axios from "axios";
const useForm = Form.useForm;
interface FormState {
  bookName: string;
  chapterName: string;
  chapterContent: string;
  chapterNo: number;
  readCount: number;
  words: number;
}

const rulesRef = reactive<Record<keyof FormState, Rule[]>>({
  bookName: [{ required: true }],
  chapterName: [{ required: true }],
  chapterContent: [{ required: true }],
  chapterNo: [{ min: 1, type: "number" }],
  readCount: [{ min: 0, type: "number" }],
  words: [{ type: "number" }],
});

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const modelRef = reactive<FormState>({
  bookName: "",
  chapterName: "",
  chapterContent: "",
  chapterNo: 0,
  readCount: 0,
  words: 0,
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
const onSubmit = () => {
  validate()
    .then(() => {
      const data = toRaw(modelRef);
      axios
        .post(
          "http://localhost:3090/api/fiction",
          { ...data, words: data.chapterContent.length },
          {
            headers: {
              "X-API-VERSION": "v1",
            },
          }
        )
        .then(() => {
          resetFields();
        });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
</script>

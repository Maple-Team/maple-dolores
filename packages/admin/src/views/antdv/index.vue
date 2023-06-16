<script lang="ts" setup>
import { columns, dataSource } from './data'
</script>

<template>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
  />
</template>

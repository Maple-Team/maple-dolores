<template>
  <aside class="aside w-[140px]">
    <a-menu mode="vertical">
      <a-menu-item>
        <RouterLink to="/">首页</RouterLink>
      </a-menu-item>
      <a-menu-item
        v-for="link in links"
        :key="link"
      >
        <RouterLink :to="`/${link}`">{{
          routerMap[link.replace(/\//, '')] ? routerMap[link.replace(/\//, '')].name : link.replace(/\//, '')
        }}</RouterLink>
      </a-menu-item>
    </a-menu>
  </aside>
  <main class="main">
    <RouterView class="content" />
    <footer>powered by Vue + Typescript + Vite + Antd</footer>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { links as _links, routerMap } from '@/utils'

const links = ref<string[]>(_links)
</script>
<style scoped lang="less">
.aside {
  box-shadow: 0 0 5px #eee;
}
.main {
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 20px;
  header,
  footer {
    text-align: center;
    padding: 10px 0;
  }
  .content {
    flex: 1;
  }
}
</style>

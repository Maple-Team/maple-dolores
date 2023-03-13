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
          capitalize(
            routerMap[link.replace(/\//, '')] ? routerMap[link.replace(/\//, '')].name : link.replace(/\//, '')
          )
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
import { capitalize } from '@liutsing/utils'

const links = ref<string[]>(_links)
</script>
<style scoped lang="less">
.aside {
  box-shadow: 0 0 5px #eee;
  overflow: auto;
  max-height: 100%;
}

.main {
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 20px;
  background: #eee;

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

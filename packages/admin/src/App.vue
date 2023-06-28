<script lang="ts" setup>
import { ref } from 'vue'
import { capitalize } from '@liutsing/utils'
import { links as _links, routerMap } from '@/utils'

const links = ref<string[]>(_links)
</script>

<template>
  <aside class="aside w-[140px]">
    <h1 class="logo">MapleImage</h1>
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
.logo {
  text-align: center;
  font-size: 24px;
  font-family: 'SF Pro Rounded';
  background: linear-gradient(to right, #ff6b6b, #ffa06a, #f3ff6d, #72ff6a, #72ffcc, #72cfff, #b072ff, #ff72f2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  //   text-fill-color: transparent;
  background-size: 300% auto;
  animation: textShine 2s ease-in-out infinite alternate;
  margin-bottom: 0;
}
@keyframes textShine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>

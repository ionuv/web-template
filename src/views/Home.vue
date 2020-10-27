<!--
 * @Author: Yu lin Liu
 * @Date: 2019-08-22 09:21:27
 * @Description: file content
 -->
<template>
  <div class="home">
    <% if(lang) { %>{{ $t('home.welcome') }}
    <button @click="$i18n.locale = 'en_US'">点击切换语言</button><% } else { %>欢迎使用<% } %>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  }
}
</script>

<style lang="css">

/* 滚动列表添加 */
* {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
  
</style>

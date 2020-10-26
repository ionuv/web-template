<!--
 * @Author: Yu lin Liu
 * @Date: 2019-08-22 09:21:26
 * @Description: file content
 -->
<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <vue-page-stack>
        <router-view />
      </vue-page-stack>
    </transition>
  </div>
</template>

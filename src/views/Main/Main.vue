<script setup>
import CommonHeader from '../../components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue';
import {ref} from 'vue'

const collapse = ref(false)

const getMenuClick = () => {
  collapse.value = !collapse.value
  console.log('col',collapse.value);
}
</script>
<template>
    <div class="common-layout">
      <el-container>
        <common-aside :col="collapse"/>
        <el-container>
          <el-header>
            <common-header @menu-click="getMenuClick()" />
          </el-header>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<style scoped>
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
  }
}
.el-header {
  background-color: #ccc;
}
</style>
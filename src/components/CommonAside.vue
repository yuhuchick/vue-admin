<template>
    <el-aside >
        <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        :default-active="currentPath"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="collapse.col"
        
      >
      <h2 v-show="!collapse.col">后台管理</h2>
      <el-menu-item 
      v-for="item in noChildren()"
      :index="item.path"
      :key ="item.path"
      @click="onMenuClick(item)"
      >
        <el-icon>
            <component :is="item.meta.icon" class="icons"></component>
        </el-icon>
        <span>{{ item.meta.label }}</span>
      </el-menu-item>

      <el-sub-menu 
        v-for="item in hasChildren()"
        :index="item.meta.label"
        :key="item.meta.label"
        >
          <template #title>
            <el-icon>
            <component :is="item.meta.icon" class="icons"></component>
        </el-icon>
        <span>{{ item.meta.label }}</span>
          </template>
          <el-menu-item-group>
            
            <el-menu-item   
        v-for="(subItem,subIndex) in item.children"
        :index="subItem.path"
        :key="subItem.path"
        @click="onMenuClick(subItem)"
        >
            <span>
                {{ subItem.meta.label }}
            </span>
            </el-menu-item>
          </el-menu-item-group>
         
      </el-sub-menu>

      </el-menu>
    </el-aside>
</template>

<script setup>
import {ref,reactive, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import { useBreadStore } from '@/store/bread';
import {useMeanStore} from '@/store/menus'

const router = useRouter()
const currentPath = router.currentRoute.value.path
console.log('route',router);
const collapse = defineProps(['col'])
const breadStore = useBreadStore()
const meanStore = useMeanStore()
const list = meanStore.menuList
const noChildren = () => {
    console.log('menu',list);
    return list[0].children.filter(item => !item.children)
}
const hasChildren = () => {
    return list[0].children.filter(item => item.children)
}

const onMenuClick = (item) => {
    router.push(item.path)
    if(!breadStore.path.includes(item.path)){
        breadStore.addPath(item.path)
        console.log('path',breadStore.path);
    }
}

// onMounted(()=>{
//     console.log('menu',meanStore.menuList[0].children);
// })

</script>

<style scoped>
    .icons {
        width: 16px;
        height: 16px;
    }
    .el-aside {
        height: 100%;
        width: auto;
    }
    .el-menu {
        height: 100%;
    }
    .el-menu-item {
        padding-right: 100px;
    }
    h2 {
        height: 100px;
        line-height: 100px;
        color: #fff;
        font-size: 24px;
        text-align: center;
    }
</style>
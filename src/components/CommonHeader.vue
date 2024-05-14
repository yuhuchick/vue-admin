<script setup>
import { useBreadStore } from '@/store/bread';
import { useMeanStore } from '@/store/menus';
import { InfoFilled } from '@element-plus/icons-vue'
import {removeToken} from '../utils/token.js'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'

const breadStore = useBreadStore()
const meanStore = useMeanStore()
const path = breadStore.path
const emit = defineEmits(['menuClick'])
const router = useRouter()
const handleDisplay = () => {
    emit('menuClick')
}

const onConfirm = () => {
    ElMessage({
        type: 'success',
        message: '退出成功！'
    })
    meanStore.changeRouteStatus(false)
    breadStore.removePath()
    removeToken()
    router.push('/login')
}

</script>
<template>
    <el-header>
        <div class="l-content">
            <el-button size="small" @click="handleDisplay">
                <el-icon :size="size" :color="color">
                    <Menu />
                </el-icon>
            </el-button>
            <div class="breadContainer">
                <el-breadcrumb separator="">
                    <el-breadcrumb-item v-for="(item, index) in path" :key="index" :to="{ path: item }"
                        style=" padding: 5px;background-color: #fff;margin-right: 5px;box-shadow: 2px 2px 5px #ccc">
                        <span v-if="item === '/home'">
                            首页
                        </span>
                        <span v-else-if="item === '/user'">
                            用户管理
                        </span>
                        <span v-else-if="item === '/article'">
                            文章
                        </span>
                        <span v-else-if="item === '/page1'">
                            页面一
                        </span>
                        <span v-else-if="item === '/page2'">
                            页面二
                        </span>
                    </el-breadcrumb-item>
                </el-breadcrumb>

            </div>
        </div>
        <div class="r-content">
            <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
                icon-color="#626AEF" title="您确定要退出吗?" @confirm="onConfirm">
                <template #reference>
                    <el-button style="margin-right: 20px;font-weight: 700;" type="info">退出系统</el-button>
                </template>
            </el-popconfirm>
            <img src="../assets/images/touxiang.jpg" alt="">
        </div>
    </el-header>
</template>

<style scoped>
.el-header {
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.r-content {
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}

.l-content {
    display: flex;
    align-items: center;

    .breadContainer {
        margin-left: 10px;
    }
}

h3 {
    color: #fff;
    margin-left: 10px;
}
</style>
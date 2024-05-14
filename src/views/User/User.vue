<template>
        <div class="userHeader">
                <AddDialog @on-update="getDataAgain"/>
                <div>
                        <el-input v-model="input1" style="width: 240px" placeholder="输入用户名搜索" />
                        <el-button :icon="Search" @click="onSearch()" :disabled="btnState"></el-button>
                </div>
        </div>
        <div class="userBody">
                <el-table :data="tableData" style="width: 100%">
                        <el-table-column fixed prop="name" label="姓名" />
                        <el-table-column prop="age" label="年龄" />
                        <el-table-column prop="sex" label="性别" />
                        <el-table-column prop="bornTime" label="出生日期" />
                        <el-table-column prop="address" label="地址" />
                        <el-table-column label="操作">
                                <template #default="scope">
                                        <el-button size="small" @click="handleEdit(scope.$index,scope.row)">
                                                编辑
                                        </el-button>
                                        <el-button size="small" type="danger"
                                                @click="handleDelete(scope.$index, scope.row)">
                                                删除
                                        </el-button>
                                </template>
                        </el-table-column>
                </el-table>
                 <el-pagination
                 class="pag"
                     background
                    layout="prev, pager, next" 
                    :total="total" 
                    :page-size="pageSize"
                    @current-change="onChange"
                />       
        </div>
        <EditDialog  ref="editRef" @on-update="getDataAgain"/>
</template>

<script lang="ts" setup>
import { getUserData ,delUserData,searchUserData} from "../../api/user"
import { onMounted, reactive, ref ,watch} from 'vue'
import { Search } from '@element-plus/icons-vue'
import AddDialog from './compoments/AddDialog.vue';
import EditDialog from './compoments/EditDialog.vue';
import { ElMessage } from 'element-plus'

const input1 = ref('')
const tableData = ref()
const editRef = ref(null)
const pageSize = ref(10)
const total = ref(0)
const btnState = ref(false)
interface User {
        id: number,
        name: string,
        sex: string,
        address: string,
        age: number,
        bornTime: string
}
onMounted(()=>{
        getUserData().then(res=>{
                console.log('res',res);
                tableData.value = res.data
                total.value = res.total
        })
})
const getDataAgain = () => {
        getUserData().then(res=>{
                console.log('res2',res);
                tableData.value = res.data
                total.value = res.total
        })
        
}
const onChange = (value) => {
        console.log('value',value);
        getUserData(value).then(res=>{
                tableData.value = res.data
        })
}
const onSearch = () => {
        searchUserData(input1.value).then(res=>{
                tableData.value = res.data
                total.value = res.total
                btnState.value = true
        })
}
watch(input1,(newValue,oldValue)=>{
        if(newValue === ''){
                getUserData().then(res=>{
                tableData.value = res.data
                total.value = res.total
        })  
}
btnState.value = false
})
const handleEdit = (index,row) => {
    editRef.value.setDisplayEdit(row)
}
const handleFalse = () => {
        dialogFormVisible.value = false
        
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  delUserData(row.id).then(res=>{
        getUserData().then(res=>{
                console.log('res',res);
                tableData.value = res.data
                total.value = res.total
        })
        ElMessage({
          message: '删除成功！',
          type: 'success',
        })
  }).catch(err=>{
        console.log(err);
        ElMessage({
          message: '删除异常！',
          type: 'warning',
        })
  })
}
</script>

<style scoped>
        .userHeader {
                display: flex;
                justify-content: space-between;
        }
       .userBody {
        width: 100%;
        .pag {
                position: absolute;
                right: 80px;
                margin-top: 30px
        }
       }
</style>
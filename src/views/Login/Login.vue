<template>
    <div class="container">
        <div class="loginBox">
            <h1>登录</h1>
            <el-form style="max-width: 550px;margin-top: 50px;" :model="ruleForm" :rules="rules" label-width="auto" ref="ruleFormRef">
                <el-form-item label="用户名" :label-width="100" prop="name" >
                    <el-input v-model="ruleForm.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="100" prop="password">
                    <el-input v-model="ruleForm.password" autocomplete="off" type="password" show-password/>
                </el-form-item>
                <el-form-item :label-width="100" style="margin-left: 180px;margin-top: 50px;">
                    <el-button type="primary"  @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {doLogin,nav} from '../../api/department.js'
import {setToken} from '../../utils/token.js'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
import {useUserStore} from '../../store/user.ts'

interface RuleForm {
  name: string,
  password: string
}

const ruleForm = reactive<RuleForm>({
  name: '',
  password: ''
})
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()

const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 7, message: '用户名长度在1——7个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 17, message: '用户名长度在6——17个字符之间', trigger: 'blur' },
  ],
  
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {

     doLogin(ruleForm).then(res=>{
        console.log('res',res);
        setToken(res.data.token)
        ElMessage({
            type: 'success',
            message: '登录成功'
        })
        router.push('/home')
        userStore.setInfo(res.data)
        console.log('loginInfo',userStore.userInfo);
        
        
     }).catch(err=>{
        console.log('err',err);
        ElMessage({
            type: 'error',
            message: err.response.data.message
        })
     })
    } else {

    }
  })
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: aqua;
    position: relative;
}

.loginBox {
    width: 600px;
    height: 300px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 10px 10px 15px #b9a4e7;
    /* margin: 0 auto; */
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    h1 {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
}
</style>
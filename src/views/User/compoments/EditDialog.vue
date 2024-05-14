<template>

  <el-dialog v-model="displayEdit" title="修改用户信息" width="500" append-to="body">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status>
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
        <el-input-number v-model="ruleForm.age" :min="0" :max="1000" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="ruleForm.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth" prop="bornTime">
        <el-input v-model="ruleForm.bornTime" autocomplete="off" />
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="displayEdit=false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onUpdated, toRefs,watch} from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {editUserData} from '../../../api/user'
import { ElMessage } from 'element-plus'
interface RuleForm {
  name: string,
  sex: string,
  address: string,
  age: number,
  bornTime: string,
  id:number
}
const formLabelWidth = '140px'
const displayEdit = ref(false)
const emit = defineEmits(['on-update'])

const radio = ref(0)
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  sex: '',
  address: '',
  age: 0,
  bornTime: '',
  id:0
})

const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 7, message: '用户名长度在1——7个字符之间', trigger: 'blur' },
  ],
  address: [
    {
      required: true,
      message: '请输入所在地区',
      trigger: 'blur',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
      message: '请输入性别',
      trigger: 'blur',
    },
  ],
  bornTime: [
    {
      required: true,
      message: '请输入出生日期',
      trigger: 'blur',
    },
  ],
})

const setDisplayEdit = (row) => {
  displayEdit.value = true
  ruleForm.name = row.name
  ruleForm.sex = row.sex
  ruleForm.age = row.age
  ruleForm.address = row.address
  ruleForm.id = row.id
  ruleForm.bornTime = row.bornTime
}

defineExpose({
  setDisplayEdit
})

const submitForm = async (formEl: FormInstance | undefined) => {
  
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {  

      editUserData(ruleForm).then(res=>{
        console.log('res', res);
        displayEdit.value = false
        ElMessage({
          message: '编辑成功！',
          type: 'success',
        })
        ruleForm.name = ''
        ruleForm.sex = ''
        ruleForm.age = 0
        ruleForm.address = ''
        ruleForm.bornTime = ''
        ruleForm.id = 0
      }).catch(err => {
        console.log(err);
        ElMessage({
          message: '异常！',
          type: 'warning',
        })
      }).finally(fin => {
        emit('on-update')
      })
        }
     else {
    }
  })
}
</script>
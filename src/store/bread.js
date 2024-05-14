import {ref,computed} from 'vue'
import { defineStore } from 'pinia'

export const useBreadStore = defineStore('bread',()=>{
    const path = ref(['/home'])
    const addPath = (params) => {
        path.value.push(params)
    }
    const delPath = (params) => {
        path.value = path.value.filter((item)=>item!==params)
    }
    const removePath = () => {
        path.value = ['/home']
    }
    return {path,addPath,delPath,removePath}
})
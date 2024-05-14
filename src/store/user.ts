import {ref,computed} from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({} as UserInfo)
  
    function setInfo(user: UserInfo) {
      userInfo.value = user
    }
   
    return {
      persist: true,
      userInfo,
      setInfo
    }
  })

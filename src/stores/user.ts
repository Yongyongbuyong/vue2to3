import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      gHand: 0,
      gCheckLeft: false,
      gCheckRight: false,
      gCheckQS: false,
      userType: 1,

      cBegin: false,
      cFinish: false,
      cLoading: false,
      cFailed: false,

      mJOAScore: -1,

      //先去localStorage中获取数据
      gId: JSON.parse(localStorage.getItem('gId') || '{}')
    }
  },
  // 这里的this是指当前store
  actions: {
    setHand(v: number) {
      this.gHand = v
    },
    setgId(v: any) {
      //将传递的数据先保存到localStorage中
      localStorage.setItem('gId', JSON.stringify(v))
      // 之后才是修改state中的状态
      this.gId = v
    },
    setUserType(payload: number) {
      this.userType = payload
    },
    setTrue(payload: number) {
      if (payload == 0) {
        this.gCheckLeft = true
      } else if (payload == 1) {
        this.gCheckRight = true
      } else if (payload == 2) {
        this.gCheckQS = true
      }
    },
    setFalse(payload: number) {
      if (payload == 0) {
        this.gCheckLeft = false
      } else if (payload == 1) {
        this.gCheckRight = false
      } else if (payload == 2) {
        this.gCheckQS = false
      }
    },
    setDefault() {
      this.gCheckLeft = false
      this.gCheckRight = false
      this.gCheckQS = false
      this.userType = 1

      this.cBegin = false
      this.cFinish = false
      this.cLoading = false
      this.cFailed = false

      this.mJOAScore = -1
    }
  }
})

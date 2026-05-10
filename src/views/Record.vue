<script lang="ts" setup name="Record">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'
const userStore = useUserStore()
const { t } = useI18n()
let cFailed = ref(userStore.cFailed)
let cLoading = ref(userStore.cLoading)
let cFinish = ref(userStore.cFinish)
let checkLeft = ref(userStore.gCheckLeft)
let checkRight = ref(userStore.gCheckRight)
let checkQS = ref(userStore.gCheckQS)

// 使用computed定义计算属性
const checkBoth = computed(() => {
  return checkLeft.value && checkRight.value
})

//方法
function onRecordLeft() {
  userStore.setHand(0)
  router.push({ path: '/test' })
}

function onRecordRight() {
  console.log('录制右手')
  userStore.setHand(1)
  router.push({ path: '/test' })
}
function onQs() {
  console.log('补充信息')
  router.push({ path: '/mJOA' })
}
function onCheckFail() {
  ElMessage({
    showClose: true,
    message: i18n.global.t('tutorial_page.finishAll'),
    type: 'error'
  })
}
function beginCount() {
  const url = '/d-count/' + userStore.gId + '/start'
  userStore.cLoading = true

  axios
    .get(url)
    .then(() => {
      setTimeout(() => {
        userStore.cLoading = false
        userStore.cFinish = true
        userStore.cFailed = false
        cFinish.value = true
        cFailed.value = false
        console.log('start success!')
      }, 20 * 1000)
    })
    .catch(() => {
      setTimeout(() => {
        userStore.cLoading = false
        userStore.cFinish = false
        userStore.cFailed = true
        cFinish.value = false
        cFailed.value = true
        console.log('start failed!')
      }, 20 * 1000)
    })
}
function onSubmit() {
  userStore.cLoading = true
  cLoading.value = true
  beginCount()
  router.push({ path: '/thanks' })
}
</script>

<template>
  <div class="divh">
    <el-container class="bg-purple">
      <el-main class="blur-box">
        <div class="container">
          <!-- <div class="note"> -->
          <div class="note-txt">{{ $t('tutorial_page.prompt_right1') }}</div>
          <div class="note-txt">{{ $t('tutorial_page.prompt_right2') }}</div>
          <div class="note-txt">{{ $t('tutorial_page.prompt_right3') }}</div>
          <div class="note-txt">{{ $t('tutorial_page.prompt_right4') }}</div>
          <!-- </div> -->

          <el-button size="large" v-if="!checkLeft" type="warning" round @click="onRecordLeft"
            ><el-icon><Camera /></el-icon>{{ $t('tutorial_page.btn1') }}</el-button
          >
          <el-button size="large" v-else type="success" round
            ><el-icon><SuccessFilled /></el-icon>{{ $t('tutorial_page.btn1') }}</el-button
          >
          <div></div>
          <!-- ??? -->
          <i class="el-icon-arrow-down"></i>
          <el-icon><ArrowDown /></el-icon>

          <el-button size="large" v-if="!checkRight" type="warning" round @click="onRecordRight"
            ><el-icon><Camera /></el-icon>{{ $t('tutorial_page.btn2') }}</el-button
          >
          <el-button size="large" v-else type="success" round
            ><el-icon><SuccessFilled /></el-icon>{{ $t('tutorial_page.btn2') }}</el-button
          >
          <!-- ??? -->
          <i class="el-icon-arrow-down"></i>
          <el-icon><ArrowDown /></el-icon>

          <el-button size="large" v-if="!checkQS" type="warning" round @click="onQs"
            ><el-icon><Document /></el-icon>{{ $t('tutorial_page.btn3') }}</el-button
          >
          <el-button size="large" v-else type="success" round
            ><el-icon><SuccessFilled /></el-icon>{{ $t('tutorial_page.btn3') }}</el-button
          >

          <!-- ??? -->
          <i class="el-icon-arrow-down"></i>
          <el-icon><ArrowDown /></el-icon>
          <el-button
            size="large"
            v-if="!(checkBoth && checkQS) && !cLoading"
            type="danger"
            round
            @click="onCheckFail"
            ><el-icon><WarningFilled /></el-icon>{{ $t('tutorial_page.btn4') }}</el-button
          >
          <!-- v-if="!cFailed && checkBoth && checkQs && !cLoading" -->

          <el-button
            size="large"
            v-if="!cFailed && checkBoth && checkQS && !cLoading"
            type="primary"
            round
            @click="onSubmit"
            ><el-icon><SuccessFilled /></el-icon>{{ $t('tutorial_page.btn4') }}</el-button
          >

          <el-button
            size="large"
            v-if="!cFailed && cLoading && !cFinish"
            type="primary"
            :loading="true"
            :disabled="true"
            round
            ><el-icon><Loading /></el-icon>正在检测</el-button
          >
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.divh {
  height: 630px !important;
}
.bg-purple {
  background: #d3dce6;
  background-image: url('../assets/华南理工大学励吾科技楼（2007）.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* 确保图片居中 */
  height: 100%; /* 确保容器有足够的高度 */
  width: 100%; /* 确保容器有足够的宽度 */
}
.blur-box {
  width: 100%;
  /* 宽度改成跟字一样长，字有多长，宽有多长 */

  /* height: 250px; */
  /* background-image: url("../assets/华南理工大学励吾科技楼（2007）.jpg"); */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  padding-top: 25px;
  margin: 0 auto;
}
.container {
  /* margin-top: 10%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.note-red-txt {
  color: red;
  margin-bottom: 10px;
  font-weight: bold;
}
.note-txt {
  font-size: 19px;
  margin-bottom: 10px;
}
</style>

<script lang="ts" setup name="Thanks">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import router from '@/router'
const userStore = useUserStore()

const video = ref(null)

// 使用computed定义计算属性
const cLoading = computed(() => {
  return userStore.cLoading
})

function backToHome() {
  userStore.setDefault()
  router.push({ path: '/' })
}
function toResult() {
  userStore.setDefault()
  router.push({ path: '/result' })
}
// 定义 get_ploted1 函数
function get_ploted1() {
  axios
    .get('d-count/' + userStore.gId + '/ploted_video')
    .then((response) => {
      console.log(response.data)
      video.value = response.data // 使用 .value 来设置 ref 的值
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  get_ploted1()
})
</script>

<template>
  <div class="divh">
    <el-container class="bg-purple">
      <el-main class="blur-box">
        <div class="note">
          <h1 class="thanks">{{ $t('thanks_page.title') }}</h1>
          <div class="note-txt">{{ $t('thanks_page.description1') }}</div>
          <div class="note-txt">{{ $t('thanks_page.description2') }}</div>
          <div class="note-txt">{{ $t('thanks_page.description3') }}</div>
        </div>

        <div class="button-container">
          <el-button v-if="false" class="btn-txt" type="primary" round @click="backToHome"
            ><el-icon><HomeFilled /></el-icon>现在返回首页</el-button
          >
          <el-button class="btn-txt" type="primary" round :loading="cLoading" @click="toResult"
            ><el-icon><Document /></el-icon>{{ $t('thanks_page.btn_res') }}</el-button
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
  padding-top: 15px;
  margin: 0 auto;
}
.button-container {
  text-align: center; /* 让容器内的内容居中 */
}
.container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.note {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  margin-bottom: 70px;
}

.note-txt {
  font-size: 20px;
  margin-bottom: 15px;
}

.thanks {
  font-size: 40px;
  letter-spacing: 2px;
  margin-bottom: 50px;
  font-weight: bold;
}

.btn-txt {
  font-size: 20px;
  color: white;
  font-weight: bold;
}
</style>

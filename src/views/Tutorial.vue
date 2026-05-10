<template>
  <div class="divh">
    <el-container class="bg-purple">
      <el-main class="blur-box">
        <h1 class="tutorialtitle">{{ $t('tutorial_page.title') }}</h1>
        <el-container>
          <el-aside width="50%"
            ><div>
              <video id="myVideo" class="video-js" controls>
                <source :src="videoSrc" type="video/mp4" />
              </video>
              <p class="note-txt">{{ $t('tutorial_page.prompt_left') }}</p>
            </div></el-aside
          >
          <el-main>
            <Record1 />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup name="Tutorial">
import Record1 from './Record1.vue'
// import Record from './Record.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import router from '@/router'
let videoSrc = ref('http://42.193.155.226/videos/tutorial.mp4')
let showBegin = ref(false)
let second = ref(5)

function countdown() {
  second.value--
  if (second.value <= 0) {
    showBegin.value = true
  }
}

function beginRecord() {
  router.push({ path: '/record' })
}

let timer = ref<number | null>(null)

onMounted(() => {
  timer.value = setInterval(() => {
    countdown()
  }, 1000)
})

onBeforeUnmount(() => {
  // 如果 timer.value 存在（即不是 null），则清除定时器
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = null
})
</script>

<style scoped>
.tutorialtitle {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 3%;
}
.video-js {
  border-radius: 20px;
}
.divh {
  height: 630px !important;
}
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 0px;
}
.el-footer {
  color: #333;
  text-align: center;
  line-height: 120px;
}
.el-aside {
  /* background-color: #d3dce6; */
  /* background-image: url('../assets/background.jpg'); */
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 25px;
  margin-top: 10px;
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
.el-button--goon {
  color: #fff;
  background-color: #20b2aa;
  border-color: #20b2aa;
}
.to-center {
  display: flex;
  flex-direction: column;
  align-items: center !important;
}
.note-txt {
  color: red;
  font-weight: bold;
  font-size: 35rpx;
  margin-bottom: 10rpx;
  text-align: center;
}
.bt-begin {
  letter-spacing: 5px;
  margin-bottom: 0px;
}
/* 调整视频大小 */
#myVideo {
  width: 40%;
  height: auto;
}
</style>

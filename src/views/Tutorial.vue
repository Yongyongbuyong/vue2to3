<template>
  <div>
    <el-container>
      <el-header
        ><h1>{{ $t('tutorial_page.title') }}</h1></el-header
      >
      <el-container>
        <el-aside width="50%"
          ><div>
            <video id="myVideo" class="video-js" controls="true">
              <!-- autoplay ="true" -->
              <source :src="videoSrc" type="video/mp4" />
            </video>
            <p class="note-txt">{{ $t('tutorial_page.prompt_left') }}</p>
          </div></el-aside
        >
        <el-main>
          <Record />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup name="Tutorial">
import Record from './Record.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import router from '@/router'
let videoSrc = ref(
  'https://6876-hvc-cloud-9ge10myz6e6ceea2-1304550954.tcb.qcloud.la/tutorial_video_small.mp4?sign=e3cfe3686e0a14893b422a167142dce8&t=1620975471'
)
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

<style>
.el-footer {
  color: #333;
  text-align: center;
  line-height: 120px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 30px;
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

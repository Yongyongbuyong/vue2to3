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
  'https://tutorial-hvc.oss-cn-beijing.aliyuncs.com/tutorial.mp4?Expires=1722478574&OSSAccessKeyId=TMP.3Kh7KsCwvnnMYE2j6MiwzZQXrsRtkbEKqre4CGstVwv5ZdtADhfx7pAbQz9CMPDL7mYGZdKH3DF4mzeeYyqchWdcZiKwvw&Signature=VP8%2F2L7XW5UE2Fkqq3gX4XXfV6E%3D'
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

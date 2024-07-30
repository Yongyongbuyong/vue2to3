<script setup lang="ts" name="Test">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-record/dist/css/videojs.record.css'
// import 'webrtc-adapter'
import RecordRTC from 'recordrtc'
import 'videojs-record/dist/videojs.record.js'
import Test1 from './Test1.vue'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'
const userStore = useUserStore()

const player = ref<any>(null)
const myVideo = ref(null)

let options = reactive({
  maxLength: false,
  controls: true,
  autoplay: false,
  fluid: false,
  // fill: true,
  loop: false,
  width: 640 / 1.3,
  height: 360 / 1.3,
  bigPlayButton: false,
  controlBar: {
    volumePanel: false
  },
  plugins: {
    // configure videojs-record plugin
    record: {
      audio: false,
      video: true,
      debug: true,
      maxLength: 17
    }
  }
})

const hand = computed(() => userStore.gHand)
const url = computed(() =>
  hand.value === 0
    ? `/d-video/${userStore.gId}/upload/left`
    : `/d-video/${userStore.gId}/upload/right`
)

onMounted(() => {
  if (myVideo.value) {
    const options = {
      controls: true,
      autoplay: false,
      preload: 'auto',
      // 这里可以添加其他 videojs-record 的配置选项
      plugins: {
        record: {
          audio: true,
          video: true,
          maxLength: 17,
          debug: true
        }
      }
    }

    player.value = videojs(myVideo.value, options, () => {
      console.log(
        `Using video.js ${videojs} with videojs-record ${videojs.getPluginVersion('record')} and recordrtc ${RecordRTC.version}`
      )
    })

    player.value.on('deviceReady', () => {
      console.log('device is ready!')
    })

    player.value.on('startRecord', () => {
      console.log('started recording!')
    })

    player.value.on('finishRecord', () => {
      console.log('finished recording: ', player.value?.recordedData)
    })

    player.value.on('error', (element: any, error: any) => {
      console.warn(error)
    })

    player.value.on('deviceError', () => {
      console.error('device error:', player.value?.deviceErrorCode)
      alert('找不到摄像头！')
    })
  }
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})

function upload() {
  let formData = new FormData()
  formData.append('file', player.value.recordedData)
  axios
    .post(url.value, formData)
    .then((res) => {
      console.log('yes')
      console.log(url.value)
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })

  userStore.setTrue(hand.value)
  router.push({ path: '/tutorial' })
}
</script>

<template>
  <div>
    <h1>{{ $t('camera_page.title') }}</h1>
    <video ref="myVideo" class="video-js vjs-default-skin mirrored-video" playsinline></video>
    <div>
      <span class="note-txt">{{ $t('camera_page.prompt1') }}</span>
      <div></div>
    </div>
    <el-button type="primary" size="default" @click="upload" round>{{
      $t('camera_page.btn_upload_live')
    }}</el-button>
    <Test1 style="margin-top: 10px" />
  </div>
</template>

<style scoped>
.el-main {
  text-align: center;
  line-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#myVideo {
  /* width: 80%; 调整视频框的宽度 */
  margin: 0 auto; /* 居中视频框 */
  margin-bottom: 20px; /* 增加底部间距 */
  transform: scaleX(1); /* 初始状态为镜像显示 */
}
.el-button {
  margin-top: 10px; /* 调整按钮与视频框的上部间距 */
}
.note-txt {
  color: red;
  font-weight: bold;
  font-size: 35rpx; /* 你可能需要调整这个值来适应新的界面布局 */
  margin-bottom: 0px;
  text-align: center;
}
/* 固定视频元素的尺寸 */
.video-js {
  width: 480px;
  height: 360px;
}
</style>

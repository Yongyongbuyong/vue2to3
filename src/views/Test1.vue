<script setup lang="ts" name="Test1">
import { reactive, computed } from 'vue'
import router from '@/router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// let fileUrl = ref('')
let fileList = reactive([])

const hand = computed(() => {
  return userStore.gHand
})
const url = computed(() => {
  return hand.value === 0
    ? '/d-video/' + userStore.gId + '/upload/left'
    : '/d-video/' + userStore.gId + '/upload/right'
})
const beforeUpload = (file: any) => {
  console.log(file.type)
  const isLt30M = file.size / 1024 / 1024 < 30

  if (!isLt30M) {
    ElMessage.error('上传视频大小不能超过 30MB!')
  }
  return isLt30M
}

const upload = (params: any) => {
  let formData = new FormData()
  formData.append('file', params.file)
  axios
    .post(url.value, formData)
    .then(() => {
      onSuccess()
    })
    .catch(() => {
      ElMessageBox.alert('未上传成功，请重新尝试上传！', '提示', {
        confirmButtonText: '确认',
        callback: () => {}
      })
      console.log('error upload!!!!')
    })
}

const handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList)
}

const handlePreview = (file: any) => {
  console.log(file)
}

const handleExceed = (files: any, fileList: any) => {
  ElMessage.warning(
    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
  )
}

const beforeRemove = () => {
  // return ElMessageBox.confirm(`确定移除 ${file.name}？`);
}

const onSuccess = () => {
  userStore.setTrue(hand.value)
  console.log('onSuccess!!!')
  router.push({
    path: '/record'
  })
}
</script>

<template>
  <div>
    <el-upload
      accept="video/*"
      class="upload-demo"
      action=""
      :http-request="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :before-remove="beforeRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="normal" type="info" round
        >上传视频文件<el-icon><UploadFilled /></el-icon
      ></el-button>
    </el-upload>
    <div v-if="hand === 0" class="el-upload__tip">请上传左手的视频</div>
    <div v-if="hand === 1" class="el-upload__tip">请上传右手的视频</div>
  </div>
</template>

<style>
.bold {
  font-weight: bold;
  display: inline-block;
}
.el-upload__tip {
  text-align: center;
}
</style>

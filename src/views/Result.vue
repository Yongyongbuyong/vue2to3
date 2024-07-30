<script setup lang="ts" name="Result">
import Result_data from './result/result_data.vue'
import Result_graph from './result/result_graph.vue'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import i18n from '@/i18n'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
import router from '@/router'
import { ElMessage } from 'element-plus'

let isPatient = ref(false)

let info = reactive({
  id: 0,
  name: '',
  sex: 0,
  age: 0,
  patient: '',
  // left_atime: "",
  // right_atime: "",
  mjoa_score: 0,
  result: ''
  // left_check: false,
  // right_check: false,
})
let analyse = reactive({
  left_count: '',
  right_count: '',
  left_vmax: '',
  right_vmax: '',
  left_vmin: '',
  right_vmin: '',
  left_vCV: '',
  right_vCV: ''
})
let note = ref(i18n.global.t('result_page.note'))
let isSubmitValidate = ref(false)

const video_url = computed(() => {
  // ${userStore.gId}
  return 'http://42.193.155.226:3000/app/data/' + 2861 + '/output.mp4'
})
const errorResult = computed(() => {
  console.log(analyse.left_count)
  console.log(analyse.right_count)

  const leftCount = Number(analyse.left_count)
  const rightCount = Number(analyse.right_count)
  return leftCount < 5 || rightCount < 5
})
const left_atime = computed(() => {
  return analyse.left_count === '0'
    ? analyse.left_count
    : (10 / parseInt(analyse.left_count)).toFixed(2)
})
const right_atime = computed(() => {
  return analyse.right_count === '0'
    ? analyse.right_count
    : (10 / parseInt(analyse.right_count)).toFixed(2)
})
const suggest = reactive({
  text: ''
})

// 监听 info 和 i18n.global.locale 的变化
watch(
  () => [info.result, info.mjoa_score, i18n.global.locale.value],
  ([newResult, newMjoaScore, locale]) => {
    // 将 mjoa_score 转换为 number 类型
    const mjoaScoreNumber =
      typeof newMjoaScore === 'string' ? parseFloat(newMjoaScore) : newMjoaScore

    // 根据 mjoa_score 和 result 的逻辑更新 result
    if (newResult === '较低' && mjoaScoreNumber < 18) {
      info.result = '中度'
    }

    // 生成建议文本
    if (locale === 'en') {
      if (info.result === '较低') {
        info.result = i18n.global.t('result_page.result_page_level.level1')
      } else if (info.result === '中度') {
        info.result = i18n.global.t('result_page.result_page_level.level2')
      } else if (info.result === '较高') {
        info.result = i18n.global.t('result_page.result_page_level.level3')
      } else {
        info.result = i18n.global.t('result_page.result_page_level.level4')
      }
      suggest.text = suggest.text =
        info.result === '优秀' || info.result === '暂无结果'
          ? 'regularly recheck the function of your cervical spine.'
          : "seek medical treatment at the Spinal Surgery Outpatient Department of Guangdong Provincial People's Hospital."
    } else if (locale === 'zh') {
      if (info.result === '较低') {
        info.result = '优秀'
      } else if (info.result === '中度') {
        info.result = '良好'
      } else if (info.result === '较高') {
        info.result = '中等'
      } else {
        info.result = '较差'
      }
      suggest.text =
        info.result === '优秀' || info.result === '暂无结果'
          ? '定期复查颈椎功能。'
          : '到广东省人民医院脊柱外科门诊就诊。'
    } else if (locale === 'zhTW') {
      if (info.result === '较低') {
        info.result = '優秀'
      } else if (info.result === '中度') {
        info.result = '良好'
      } else if (info.result === '较高') {
        info.result = '中等'
      } else {
        info.result = '較差'
      }
      suggest.text =
        info.result === '优秀' || info.result === '暂无结果'
          ? '定期檢查頸椎功能。'
          : '到廣東省人民醫院脊柱外科門診就診。'
    }
  },
  { immediate: true } // 添加这一行以确保初始值也被处理
)
const get = async () => {
  // `d-info/${userStore.gId}/get`
  try {
    const response = await axios.get('d-info/' + 2861 + '/get')
    console.log(response.data)
    // 更新 info 对象的属性
    Object.assign(info, response.data.info)

    // 更新 analyse 对象的属性
    Object.assign(analyse, response.data.analyse)

    console.log(analyse)
  } catch (error) {
    console.error(error)
  }
}
const video = ref(null)
const get_ploted = async () => {
  try {
    // `d-count/${userStore.gId}/ploted_video`
    const response = await axios.get('d-count/' + 2861 + '/ploted_video')
    console.log(response.data)
    video.value = response.data
  } catch (error) {
    console.error(error)
  }
}

function onBack() {
  userStore.setDefault
  router.push({ path: '/' })
}

function fetchVideoUrl() {
  console.log(video_url.value)
}

function resetGlobalData() {
  window.location.reload()
  console.log(userStore.mJOAScore)
}

const genCopyData = () => {
  let ret = ''
  ret += i18n.global.t('result_page.id') + info.id + '\n'
  if (userStore.gId == 1) {
    ret += i18n.global.t('info_page.name') + info.name + '\n'
  }
  ret += i18n.global.t('result_page.gender') + info.sex + '\n'
  ret += i18n.global.t('result_page.age') + info.age + '\n'
  if (userStore.gId == 1) {
    ret += i18n.global.t('info_page.patient_id') + info.patient + '\n'
  }
  ret +=
    i18n.global.t('result_page.times') +
    i18n.global.t('result_page.left_hand') +
    analyse.left_count +
    i18n.global.t('result_page.times1') +
    ', ' +
    i18n.global.t('result_page.right_hand') +
    analyse.right_count +
    i18n.global.t('result_page.times1') +
    '\n'
  ret +=
    i18n.global.t('result_page.avg_time') +
    i18n.global.t('result_page.left_hand') +
    left_atime.value +
    i18n.global.t('result_page.times1') +
    ', ' +
    i18n.global.t('result_page.right_hand') +
    right_atime.value +
    i18n.global.t('result_page.times1') +
    '\n'
  ret +=
    i18n.global.t('result_page.max_speed') +
    ': ' +
    i18n.global.t('result_page.left_hand') +
    analyse.left_vmax +
    ' GPM, ' +
    i18n.global.t('result_page.right_hand') +
    analyse.right_vmax +
    ' GPM\n'
  ret +=
    i18n.global.t('result_page.min_speed') +
    ': ' +
    i18n.global.t('result_page.left_hand') +
    analyse.left_vmin +
    ' GPM, ' +
    i18n.global.t('result_page.right_hand') +
    analyse.right_vmin +
    ' GPM\n'
  ret +=
    i18n.global.t('result_page.变异系数') +
    i18n.global.t('result_page.left_hand') +
    analyse.left_vCV +
    '%, ' +
    i18n.global.t('result_page.right_hand') +
    analyse.right_vCV +
    '%\n'
  ret +=
    i18n.global.t('result_page.补充信息评分') +
    i18n.global.t('result_page.info') +
    info.mjoa_score +
    '\n'
  ret +=
    i18n.global.t('result_page.result_half1') +
    info.result +
    i18n.global.t('result_page.result_half2') +
    suggest.text +
    '\n'
  return ret
}
const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    console.log('Copied to clipboard successfully!')
  } catch (err) {
    console.error('Could not copy text: ', err)
  }
}
const onCopyResult = () => {
  copyToClipboard(genCopyData())
  ElMessage({
    message: i18n.global.t('noti.copy'),
    type: 'success',
    center: true
  })
}
onMounted(() => {
  get()
  get_ploted()
})
</script>

<template>
  <div>
    <el-row style="display: block">
      <div style="text-align: center">
        <!--标题-->
        <h2>{{ $t('result_page.title') }}</h2>
      </div>

      <div style="display: flex">
        <!--下面的视频和评估-->
        <el-col :span="12">
          <div class="hr"></div>
          <div class="l-form-label" style="margin-top: 5%; text-align: center">
            {{ $t('result_page.video_text') }}
          </div>

          <!-- ref="videoPlayer" -->
          <div class="video-wrapper">
            <video
              ref="videoPlayer"
              controls
              :style="{
                width: '300px',
                height: 'auto',
                margin: '100 10%'
              }"
            >
              <source :src="video_url" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <hr class="hr1" />
            <div>
              <Result_graph />
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <Result_data />
        </el-col>
      </div>
    </el-row>

    <el-footer>
      <el-button
        v-if="!errorResult"
        round
        class="bt-check"
        type="primary"
        size="small"
        @click="onCopyResult"
        ><span class="btn-txt"
          ><el-icon><CopyDocument /></el-icon>{{ $t('result_page.btn_copy') }}</span
        ></el-button
      >

      <el-button
        round
        v-if="errorResult"
        class="bt-check"
        type="warning"
        size="small"
        @click="onBack"
        ><span class="btn-txt"
          ><el-icon><Refresh /></el-icon>{{ $t('result_page.btn_re') }}</span
        ></el-button
      >

      <el-button
        v-if="!errorResult"
        round
        class="bt-check"
        type="success"
        size="small"
        @click="onBack"
        ><span class="btn-txt"
          ><el-icon><SuccessFilled /></el-icon>{{ $t('result_page.btn_home') }}</span
        ></el-button
      >
      <!-- <div v-if="!errorResult" class="note-txt">注：{{ note }}</div> -->
    </el-footer>
  </div>
</template>

<style scoped>
.hr {
  width: 100%;
  height: 3px;
  background-color: #eeeeee;
}

.hr1 {
  opacity: 20%;
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}

.el-container {
  /* margin-top: 10%; */
  margin-left: 10%;
  margin-right: 10%;
  /* display: flex;
    flex-direction: column; */
  /* align-items: center; */
}

.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  /* text-align: left; */
}

.bt-check {
  margin-top: 0px;
}

.btn-txt {
  font-size: 20px;
  color: white;
  font-weight: bold;
}

.l-form-label {
  text-align: left;
  /* float: left; */

  font-size: 25rpx;
  font-weight: bold;
  /* opacity: 20%; */
  color: #566573;
}

.l-form-label1 {
  text-align: left;
  float: left;

  font-size: 25rpx;
  font-weight: bold;
  color: #566573;

  /* opacity: 20%; */
}

.plain-txt {
  font-size: 25px;
  color: #08088a;

  text-align: center;
}

.l-long-label {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

h1.title {
  font-weight: bold;
  letter-spacing: 3px;
  color: black;
  margin: 10px;
}

.number-txt {
  font-family: 'Times New Roman', Times, serif;
  font-size: 25px;
  color: #298a08;
  font-weight: bold;
}

.danger-txt {
  font-size: 25px;
  color: red;
  font-weight: bold;
}

.result-txt {
  font-size: 25px;
  color: #08088a;
  line-height: 32px;
  text-align: left;
}

.l-note-label {
  font-size: 25px;
  font-weight: bold;
  /* margin-top: 20px; */
  margin-bottom: 0px;
}

.l-note-content {
  margin-top: 10px;
  margin-bottom: 10px;
}

.note-txt {
  font-size: 18px;
  text-align: left;
}

.note2-txt {
  font-size: 18px;
  font-weight: bold;
  color: red;
  text-align: left;
}

.left-bar {
  float: left;
  width: 20%;
  height: 100%;
  position: absolute;
  overflow: auto;
}

.right-bar {
  margin-top: -190px;
  float: right;
  right: 0px;
  width: 50%;
  height: 100%;
  position: absolute;
  overflow: auto;
}

.video-wrapper {
  text-align: center;
  height: 50%;
  /* 调到离上面一个组件30px */
  margin-top: 3%;
}

.hr1 {
  opacity: 20%;
  width: 80%;
  height: 0.1px;
  background-color: #eeeeee;
  margin-bottom: 3%;
  margin-top: 2%;
}
</style>

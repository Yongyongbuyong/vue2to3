<script lang="ts" setup name="result_data">
import * as echarts from 'echarts'
import i18n from '@/i18n'
import { ref, reactive, onMounted, watch, computed, watchEffect, onBeforeMount } from 'vue'
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

//计算属性
const margin_top = computed(() => {
  return i18n.global.locale.value === 'en' ? 1 : 3
})
const sex = computed(() => {
  return info.sex === 0 ? i18n.global.t('info_page.male') : i18n.global.t('info_page.female')
})
const left_atime = ref(0)
const right_atime = ref(0)

// 合并逻辑到一个函数中
function updateTimes() {
  const leftCountNumber = parseFloat(analyse.left_count)
  if (isNaN(leftCountNumber)) {
    left_atime.value = NaN // 或者返回其他默认值
  } else {
    left_atime.value = leftCountNumber === 0 ? 0 : Number((10 / leftCountNumber).toFixed(2))
  }

  right_atime.value =
    analyse.right_count === '0'
      ? Number(analyse.right_count)
      : Number((10 / parseInt(analyse.right_count)).toFixed(2))
}

// 监听 analyse.left_count 和 analyse.right_count 的变化
watch([() => analyse.left_count, () => analyse.right_count], updateTimes)
const errorResult = computed(() => {
  return parseInt(analyse.left_count) < 5 || parseInt(analyse.right_count) < 5
})
const diagnosis = reactive({
  resultText: ''
})
watch(
  () => [info.result, info.mjoa_score, i18n.global.locale.value], // 添加 i18n.global.locale.value
  ([newResult, newMjoaScore]) => {
    // 更新性别显示
    // info.sex = info.sex == 0 ? '男' : '女';

    // 将 mjoa_score 转换为 number 类型
    const mjoaScoreNumber =
      typeof newMjoaScore === 'string' ? parseFloat(newMjoaScore) : newMjoaScore

    // 根据 mjoa_score 和 result 的逻辑更新 result
    if (newResult === '较低' && mjoaScoreNumber < 18) {
      info.result = '中度'
    }

    // 处理 result 的显示文本
    if (info.result === '较低') {
      diagnosis.resultText = i18n.global.t('result_page.result_page_level.level1')
    } else if (info.result === '中度') {
      diagnosis.resultText = i18n.global.t('result_page.result_page_level.level2')
    } else if (info.result === '较高') {
      diagnosis.resultText = i18n.global.t('result_page.result_page_level.level3')
    } else {
      diagnosis.resultText = i18n.global.t('result_page.result_page_level.level4')
    }
  },
  { immediate: true } // 添加这一行以确保初始值也被处理
)

const suggest = reactive({
  text: ''
})

// 监听 info 和 i18n.global.locale 的变化
watchEffect(() => {
  const { result, mjoa_score } = info
  const locale = i18n.global.locale.value

  // 将 mjoa_score 转换为 number 类型
  const mjoaScoreNumber = typeof mjoa_score === 'string' ? parseFloat(mjoa_score) : mjoa_score

  // 根据 mjoa_score 和 result 的逻辑更新 result
  if (result === '较低' && mjoaScoreNumber < 18) {
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
    suggest.text =
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
})

//方法

const get = async () => {
  // `d-info/${userStore.gId}/get`
  try {
    const response = await axios.get(`d-info/4925/get`)
    console.log(response.data)
    // 更新 info 对象的属性
    Object.assign(info, response.data.info)

    // 更新 analyse 对象的属性
    Object.assign(analyse, response.data.analyse)

    console.log(analyse)
    console.log(analyse.left_count)
    updateTimes()
  } catch (error) {
    console.error(error)
  }
}
const video = ref(null)
const get_ploted = async () => {
  try {
    // `d-count/${userStore.gId}/ploted_video`
    const response = await axios.get(`d-count/4925/ploted_video`)
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
function resetGlobalData() {
  window.location.reload()
  console.log(userStore.mJOAScore)
}
const genCopyData = () => {
  let ret = ''
  ret += '编号：' + info.id + '\n'
  if (userStore.gId == 1) {
    ret += '姓名：' + info.name + '\n'
  }
  ret += '性别：' + info.sex + '\n'
  ret += '年龄：' + info.age + '\n'
  if (userStore.gId == 1) {
    ret += '住院号：' + info.patient + '\n'
  }
  ret += '十秒抓握次数：左手 ' + analyse.left_count + ' 次，右手 ' + analyse.right_count + ' 次\n'
  ret += '平均抓握时间：左手 ' + left_atime.value + ' 秒，右手 ' + right_atime.value + ' 秒\n'
  ret += '最高抓握速度：左手 ' + analyse.left_vmax + ' GPM，右手 ' + analyse.right_vmax + ' GPM\n'
  ret += '最低抓握速度：左手 ' + analyse.left_vmin + ' GPM，右手 ' + analyse.right_vmin + ' GPM\n'
  ret += '变异系数：左手 ' + analyse.left_vCV + ' %，右手 ' + analyse.right_vCV + ' %\n'
  ret += '补充信息评分：mJOA评分为 ' + info.mjoa_score + ' 分\n'
  ret +=
    '检测结论：根据十秒抓握实验结果，预测您的手部灵活性等级为 ' +
    info.result +
    '。根据以上结果，建议您 ' +
    suggest.text +
    '。\n'
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
get()
onMounted(() => {})
onBeforeMount(() => {
  get()
  get_ploted()
})
</script>

<template>
  <div>
    <!-- <h1>颈椎病功能分析报告</h1> -->

    <div>
      <div class="hr"></div>
    </div>
    <div v-if="!errorResult" style="margin-right: 10%">
      <el-row style="margin-top: 5%">
        <el-col :span="8">
          <div class="l-form-label" style="margin-left: 30%">
            {{ i18n.global.t('result_page.id') }}
          </div>
          <span class="plain-txt">{{ info.id }}</span>
        </el-col>
        <el-col :span="8"
          ><div class="l-form-label">
            {{ i18n.global.t('result_page.gender') }}
          </div>
          <span class="plain-txt">{{ sex }}</span></el-col
        >
        <el-col :span="8"
          ><div class="l-form-label">{{ i18n.global.t('result_page.age') }}</div>
          <span class="number-txt" style="margin-right: 40%">{{ info.age }}</span></el-col
        >
      </el-row>
      <hr class="hr1" />

      <div v-if="info.patient">
        <!-- v-if = "isPatient" -->
        <span class="l-form-label">{{ $t('result_page.Hnumber') }}</span>
        <span class="plain-txt">{{ info.patient }}</span>
        <hr class="hr1" />
      </div>

      <span class="l-form-label">{{ i18n.global.t('result_page.times') }}</span>
      <span class="plain-txt"
        >{{ i18n.global.t('result_page.left_hand')
        }}<span class="number-txt">
          {{ analyse.left_count }}
        </span>
        {{ i18n.global.t('result_page.times1') }}，</span
      >
      <span class="plain-txt"
        >{{ i18n.global.t('result_page.right_hand')
        }}<span class="number-txt">
          {{ analyse.right_count }}
        </span>
        {{ i18n.global.t('result_page.times1') }}</span
      >

      <hr class="hr1" />

      <div class="l-form-label">{{ i18n.global.t('result_page.avg_time') }}</div>
      <!-- <div></div> -->
      <span class="plain-txt"
        >{{ i18n.global.t('result_page.left_hand') }}
        <span class="number-txt">
          {{ left_atime }}
        </span>
        {{ i18n.global.t('result_page.second') }}，</span
      >
      <span class="plain-txt"
        >{{ i18n.global.t('result_page.right_hand')
        }}<span class="number-txt"> {{ right_atime }} </span
        >{{ i18n.global.t('result_page.second') }}</span
      >
      <hr class="hr1" />

      <span class="l-form-label">{{ i18n.global.t('result_page.变异系数') }}</span>
      <span class="plain-txt"
        >{{ i18n.global.t('result_page.left_hand')
        }}<span class="number-txt"> {{ analyse.left_vCV }} </span>%，</span
      >
      <span class="plain-txt"
        >{{ i18n.global.t('result_page.right_hand')
        }}<span class="number-txt"> {{ analyse.right_vCV }} </span>%</span
      >
      <hr class="hr1" />

      <div class="l-form-label">{{ $t('result_page.补充信息评分') }}</div>
      <span class="plain-txt"
        >{{ $t('result_page.info')
        }}<span class="number-txt">
          {{ info.mjoa_score }}
        </span>
      </span>
      <div></div>

      <hr class="hr1" />

      <div class="l-form-label" style="margin-top: 1.2%">
        {{ $t('result_page.检测结论') }}
      </div>
      <el-row style="margin-bottom: 3%">
        <el-button-group>
          <el-button
            size="small"
            type="success"
            :disabled="
              diagnosis.resultText !== i18n.global.t('result_page.result_page_level.level1')
            "
            >{{ $t('result_page.result_page_level.level1') }}</el-button
          >
          <el-button
            size="small"
            type="info"
            :disabled="
              diagnosis.resultText !== i18n.global.t('result_page.result_page_level.level2')
            "
            >{{ $t('result_page.result_page_level.level2') }}</el-button
          >
          <el-button
            size="small"
            type="warning"
            :disabled="
              diagnosis.resultText !== i18n.global.t('result_page.result_page_level.level3')
            "
            >{{ $t('result_page.result_page_level.level3') }}</el-button
          >
          <el-button
            size="small"
            type="danger"
            :disabled="
              diagnosis.resultText !== i18n.global.t('result_page.result_page_level.level4')
            "
            >{{ $t('result_page.result_page_level.level4') }}</el-button
          >
        </el-button-group>
      </el-row>

      <div class="result-txt">
        {{ $t('result_page.result_half1')
        }}<span class="danger-txt">{{ diagnosis.resultText }}</span
        >{{ $t('result_page.result_half2') }}{{ suggest.text }}
      </div>
      <hr class="hr1" style="margin-bottom: 4%" />
      <div v-if="!errorResult" class="note2-txt" style="margin-left: 10%">
        {{ $t('result_page.Screenshot') }}
      </div>

      <!-- <el-popover
                    placement="top-start"
                    :title="this.$t('result_page.note_title')"
                    width="200"
                    trigger="hover"
                    :content="this.$t('result_page.note_text')"
                >
                    <el-button type="text" slot="reference">{{
                        $t("result_page.btn_ref")
                    }}</el-button>
                </el-popover> -->
      <div class="note-txt" style="margin-top: 2%">
        <span class="l-note-label">{{ $t('result_page.note_title') }}</span
        ><span>{{ $t('result_page.note_text') }}</span>
      </div>
    </div>
    <div v-if="errorResult">
      <span class="result-txt">{{ $t('result_page.failure_text') }}</span>
    </div>
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
  height: 0.1px;
  background-color: #eeeeee;
  margin-bottom: 3%;
  margin-top: 2%;
}
.el-container {
  /* margin-top: 10%; */
  margin-left: 1%;
  margin-right: 1%;
  /* display: flex;
    flex-direction: column; */
  /* align-items: center; */
}

.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 2px;
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
  font-size: 20rpx;
  color: white;
  font-weight: bold;
}

.l-form-label {
  float: left;

  font-size: 25rpx;
  font-weight: bold;
  color: #566573;

  /* opacity: 20%; */
  margin-left: 10%;
}
.plain-txt {
  font-size: 25rpx;
  color: #08088a;

  /* text-align: right; */
}
.l-long-label {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

h1.title {
  letter-spacing: 3px;
  color: black;
  margin: 10px;
}

.number-txt {
  font-family: 'Times New Roman', Times, serif;
  font-size: 25rpx;
  color: #298a08;
  font-weight: bold;
}

.danger-txt {
  font-size: 26rpx;
  color: red;
  font-weight: bold;
}

.result-txt {
  font-size: 25rpx;
  color: #08088a;
  line-height: 32rpx;
  text-align: left;
  margin-left: 10%;
  /* margin-right: 10%; */
}

.l-note-label {
  font-size: 25rpx;
  font-weight: bold;
  /* margin-top: 20px; */
  margin-bottom: 0px;
}

.l-note-content {
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.note-txt {
  font-size: 15px;
  text-align: left;
  margin-left: 10%;
  /* margin-right: 10%; */
  line-height: 1.2;
  opacity: 50%;
}

.note2-txt {
  font-size: 18rpx;
  font-weight: bold;
  color: red;
  text-align: left;
  opacity: 80%;

  /* margin-right: 10%; */
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
  height: 100%;
}
.el-button[disabled] {
  opacity: 0.1;
}
.el-button:not([disabled]) {
  /* font-size: 16px; */
  font-weight: bold;
  /* color: red; */
}

.el-col {
  border-radius: 4px;
}
.el-button[disabled] {
  opacity: 0.5;
}
h1.title {
  font-weight: bold;
  letter-spacing: 3px;
  color: black;
  margin: 10px;
}
</style>

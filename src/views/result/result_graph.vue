<script lang="ts" setup nmae="result_graph">
import * as echarts from 'echarts'
import i18n from '@/i18n'
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

let myChartOption = reactive({
  xData: ['左手', '右手'], //横坐标
  left: [0, 0],
  right: [0, 0],
  myChartStyle: {
    float: 'center',
    width: '80%',
    height: '200px'
  } //图表样式
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

let info = ref<any>(null)

function initEcharts() {
  // 多列柱状图
  const mulColumnZZTData = {
    xAxis: {
      data: myChartOption.xData
    },
    // 图例
    legend: {
      //   data: ["人数1", "任务数"],
      //   top: "0%"
    },
    yAxis: {},
    series: [
      {
        type: 'bar', //形状为柱状图
        data: myChartOption.left,
        name: i18n.global.t('result_page.max_speed'), // legend属性
        label: {
          // 柱状图上方文本标签，默认展示数值信息
          show: true,
          position: 'top'
        }
      },
      {
        type: 'bar', //形状为柱状图
        data: myChartOption.right,
        name: i18n.global.t('result_page.min_speed'), // legend属性
        label: {
          // 柱状图上方文本标签，默认展示数值信息
          show: true,
          position: 'top'
        }
      }
    ]
  }
  const myChart = echarts.init(document.getElementById('mychart'))
  myChart.setOption(mulColumnZZTData)
  //随着屏幕大小调节图表
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
function getChartUpdate() {
  initEcharts()
}

function get() {
  axios
    // .get('d-info/' + userStore.gId + '/get')
    .get('d-info/' + 2861 + '/get')
    .then((response) => {
      console.log(response.data)
      analyse = response.data.analyse
      info.value = response.data.info
      myChartOption.left = [response.data.analyse.left_vmax, response.data.analyse.right_vmax]

      myChartOption.right = [response.data.analyse.left_vmin, response.data.analyse.right_vmin]

      initEcharts()

      // console.log(this.analyse);
    })
    .catch(function (error) {
      console.log(error)
    })
  console.log('jj')
}

function print() {
  console.log('jjjjjjj')
}
onMounted(() => {
  get()
  print()
})
watch(i18n.global.locale, () => {
  //监听语言的变化，每次变动都要重新渲染图表
  initEcharts()
  console.log('语言变化')
})
</script>

<template>
  <div>
    <div class="l-form-label">{{ $t('result_page.graph_title') }}</div>
    <div
      class="echart"
      id="mychart"
      :style="myChartOption.myChartStyle"
      style="margin-left: 10%"
    ></div>
  </div>
</template>

<style scoped>
.l-form-label {
  /* float: left; */

  font-size: 25rpx;
  font-weight: bold;
  color: #566573;

  /* opacity: 20%; */
  /* margin-left: 10%; */
  text-align: center;
  margin-top: 5%;
  margin-bottom: 2%;

  /* margin-left: 30%; */
}
</style>

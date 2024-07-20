<!-- 这是我的主页面 -->
<script setup lang="ts">
import Home_icon from './Home_icon.vue'
import { ref } from 'vue'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import i18n from '../i18n'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const userStore = useUserStore()
const tips = ref(
  '使用本小程序前，请认真阅读(未成年人应当在监护人陪同下阅读)、充分理解本《用户须知》中各条款。勾选“已阅读并同意用户须知”后使用本小程序，将代表您同意本用户须知的内容。除非您阅读并同意本用户须知的内容，否则您无权使用本小程序。<br>1. 本小程序由华南理工大学及广东省人民医院联合研发。本程序的一切版权等知识产权，以及与小程序相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均为华南理工大学及广东省人民医院联合所有，受著作权法和国际著作权条约以及其他知识产权法律法规的保护。<br>2.	本小程序仅供粗略评估手部功能所用，并以此粗略判断测试者患颈椎病的风险，评估所得的结果仅供参考，不可用于诊断依据，不得作为临床诊疗的依据。用户应进一步到医院就诊进行咨询。<br>3.	通过本小程序上传的影像及分析数据仅供疾病筛查及临床研究用途，不作其他用途使用。华南理工大学及广东省人民医院尊重并保护所有使用者的个人隐私权，不会主动泄露给任何第三方。<br>4. 用户不得利用本小程序发表、传送、传播、储存违反国家法律、危害国家安全、祖国统一、社会稳定的内容，或任何不当的、侮辱诽谤的、淫秽的、暴力的及任何违反国家法律法规政策的内容。不得利用本小程序发表、传送、传播、储存侵害他人知识产权、商业秘密权等合法权利的内容。不得利用本小程序误导、欺骗他人。<br>5. 使用本小程序后果由用户自己承担风险，华南理工大学及广东省人民医院对使用本小程序产生的后果不作任何类型的担保，包括但不限于由于诊断评估结果、病情评估结果、手部活动评估结果等及其产生的任何影响。<br>6. 本《用户须知》的一切解释权与修改权归华南理工大学及广东省人民医院联合所有。'
)
const checked = ref(false)
const dialogVisible = ref(false)

function onBeginNormal() {
  if (!checked.value) {
    // 弹出框说 请阅读
    ElNotification({
      title: i18n.global.t('noti.title'),
      message: h('i', { style: 'color: teal' }, i18n.global.t('noti.message'))
    })
  } else {
    console.log('onBeginNormal')
    userStore.setUserType(1)
    router.push({ path: '/infos_normal' })
    // this.$router.push({
    //   path: '/infos_normal'
    // })
    // 跳转
  }
}
function onBegin() {
  if (!checked.value) {
    // 弹出框说 请阅读
    ElNotification({
      title: i18n.global.t('noti.title'),
      message: h('i', { style: 'color: teal' }, i18n.global.t('noti.message'))
    })
  } else {
    console.log('onBegin')
    userStore.setUserType(2)
    router.push({ path: '/infos' })
    // this.$router.push({
    //   path: '/infos'
    // })
  }
}
function handleClose() {
  console.log('handleClose')
}
</script>

<template>
  <div>
    <el-container class="bg-purple">
      <el-main class="blur-box">
        <Home_icon></Home_icon>

        <h1 class="title">{{ $t('home.title') }}</h1>
        <span class="tool_tip">{{ $t('home.description') }}</span>
        <span><br /><br /><br /><br /></span>

        <div class="container-begin">
          <el-button round type="primary" @click="onBeginNormal" class="btn-txt">
            <el-icon><UserFilled /></el-icon>{{ $t('home.btn_normal') }}
          </el-button>

          <el-button round type="success" @click="onBegin" class="btn-txt">
            <el-icon><User /></el-icon>{{ $t('home.btn_hospital') }}&nbsp;
          </el-button>
        </div>

        <input type="checkbox" v-model="checked" />
        {{ $t('home.text_read') }}
        <el-button type="text" @click="dialogVisible = true">{{ $t('home.note') }} </el-button>

        <el-dialog
          :title="$t('home.note')"
          v-model="dialogVisible"
          width="70%"
          :before-close="handleClose"
          center
        >
          <!-- 展示 tips -->
          <span class="tips-text">{{ $t('home.tips') }}</span>
          <template v-slot:footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">{{ $t('button.cancel') }}</el-button>
              <el-button type="primary" @click="dialogVisible = false">
                {{ $t('button.confirm') }}
              </el-button>
            </span>
          </template>
        </el-dialog>
        <div class="version-txt">v1.1<br /><br /><br /></div>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  /* line-height: 0px; */
}

.el-main {
  color: #333;
  text-align: center;
  /* line-height: 0px; */
}

.el-dialog {
  border-radius: 10px; /* 设置圆角半径为 10px */
}

.circleImg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
}

.tips-text {
  display: block; /* 将 span 元素改为块级元素 */
  max-width: 100%; /* 设置最大宽度 */
  word-wrap: break-word; /* 自动换行 */
}
.bg-purple {
  background-image: url('../assets/华南理工大学励吾科技楼（2007）.jpg');
  opacity: 100%;
  /* 允许背景图片拉伸填充整个页面 */
  /* 允许背景填充整个页面 */
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  text-align: center;
  font-size: 40px;
  color: black;
  opacity: 100%;
}
.tool_tip {
  line-height: 10px;
  margin-top: 10px;
  color: rgb(73, 63, 63);
}
.version-txt {
  /* 颜色是当前颜色取反色 */

  color: #f5fad9;
}
.blur-box {
  /* /* width: 100%; */
  /* 宽度改成跟字一样长，字有多长，宽有多长 */

  /* height: 250px; */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);

  margin: 0 auto;
}
</style>

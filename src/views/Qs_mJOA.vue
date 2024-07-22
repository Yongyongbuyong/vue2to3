<script lang="ts" setup name="Qs_mJOA">
import { reactive, computed } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

let form = reactive({
  limb: '5',
  leg: '7',
  feel: '3',
  sphinc: '3'
})

const score = computed(() => {
  return parseInt(form.limb) + parseInt(form.leg) + parseInt(form.feel) + parseInt(form.sphinc)
})

const onSubmit = () => {
  console.log(score.value)
  console.log('上传数据')
  axios.post(`/d-qs/${userStore.gId}/mJOA`, {
    limb: parseInt(form.limb),
    leg: parseInt(form.leg),
    feel: parseInt(form.feel),
    sphinc: parseInt(form.sphinc),
    mJOA_score: score.value
  })
  userStore.setTrue(2)
  if (userStore.userType === 1) {
    router.push({ path: '/record' })
  } else {
    router.push({ path: '/record_normal' })
  }
}
</script>

<template>
  <div>
    <el-row>
      <h1 class="title">{{ $t('mJOA_page.title') }}</h1>
      <div class="hr"></div>
      <el-col :span="12"
        ><div class="question">{{ $t('mJOA_page.Q_upper') }}</div>
        <div class="form_text">
          <el-radio-group v-model="form.limb">
            <el-radio value="5">{{ $t('mJOA_page.A_upper_1') }}</el-radio>
            <el-radio value="4">{{ $t('mJOA_page.A_upper_2') }}</el-radio>
            <el-radio value="3">{{ $t('mJOA_page.A_upper_3') }}</el-radio>
            <el-radio value="2">{{ $t('mJOA_page.A_upper_4') }}</el-radio>
            <el-radio value="1">{{ $t('mJOA_page.A_upper_5') }}</el-radio>
            <el-radio value="0">{{ $t('mJOA_page.A_upper_6') }}</el-radio>
          </el-radio-group>
        </div>
        <div class="hr1"></div>
        <div class="question">{{ $t('mJOA_page.Q_sensation') }}</div>
        <div class="form_text">
          <el-radio-group v-model="form.feel">
            <el-radio value="3">{{ $t('mJOA_page.A_sensation_1') }}</el-radio>
            <el-radio value="2">{{ $t('mJOA_page.A_sensation_2') }}</el-radio>
            <el-radio value="1">{{ $t('mJOA_page.A_sensation_3') }}</el-radio>
            <el-radio value="0">{{ $t('mJOA_page.A_sensation_4') }}</el-radio>
          </el-radio-group>
        </div>
        <div class="hr1"></div>
      </el-col>
      <el-col :span="12"
        ><div class="question">{{ $t('mJOA_page.Q_lower') }}</div>
        <div class="form_text">
          <el-radio-group v-model="form.leg">
            <el-radio value="7">{{ $t('mJOA_page.A_lower_1') }}</el-radio>
            <el-radio value="6">{{ $t('mJOA_page.A_lower_2') }}</el-radio>
            <el-radio value="5">{{ $t('mJOA_page.A_lower_3') }}</el-radio>
            <el-radio value="4">{{ $t('mJOA_page.A_lower_4') }}</el-radio>
            <el-radio value="3">{{ $t('mJOA_page.A_lower_5') }}</el-radio>
            <el-radio value="2">{{ $t('mJOA_page.A_lower_6') }}</el-radio>
            <el-radio value="1">{{ $t('mJOA_page.A_lower_7') }}</el-radio>
            <el-radio value="0">{{ $t('mJOA_page.A_lower_8') }}</el-radio>
          </el-radio-group>
        </div>
        <div class="hr1"></div>
        <div class="question">{{ $t('mJOA_page.Q_sphincter') }}</div>
        <div class="form_text">
          <el-radio-group v-model="form.sphinc">
            <el-radio value="3">{{ $t('mJOA_page.A_sphincter_1') }}</el-radio>
            <el-radio value="2">{{ $t('mJOA_page.A_sphincter_2') }}</el-radio>
            <el-radio value="1">{{ $t('mJOA_page.A_sphincter_3') }}</el-radio>
            <el-radio value="0">{{ $t('mJOA_page.A_sphincter_4') }}</el-radio>
          </el-radio-group>
        </div>
        <div class="hr1"></div>
      </el-col>
      <el-button type="primary" @click="onSubmit" round>{{ $t('button.submit') }}</el-button>
    </el-row>
  </div>
</template>

<style scoped>
.el-main {
  /* color: #333; */
  text-align: center;
  display: flex;
  flex-direction: column;
  /* margin-left: 10%;
    margin-right: 10%; */
}
.title {
  font-weight: bold;
  letter-spacing: 3px;
  color: black;
  text-align: center;
}
.question {
  text-align: left;

  color: #989898;
  font-weight: bold;
}
.hr {
  width: 100%;
  height: 3px;
  background-color: #eeeeee;
}
.hr1 {
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}
.el-radio {
  text-align: left;

  display: block;
  margin: 10px 0;
}

.title {
  text-align: center;
}
.question {
  text-align: center;
}
.form_text {
  margin-left: 15%;
}
</style>

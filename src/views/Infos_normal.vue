<script setup lang="ts" name="Infos_normal">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
import router from '@/router'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const userStore = useUserStore()
// let checkAge = (value: any, callback: any) => {
//   if (!value) {
//     return callback(new Error('年龄不能为空'))
//   }
//   setTimeout(() => {
//     if (!Number.isInteger(value)) {
//       callback(new Error('请输入数字值'))
//     } else {
//       if (value > 99) {
//         callback(new Error('不超过99岁'))
//       } else {
//         callback()
//       }
//     }
//   }, 1000)
// }
// let checkNumber = (value: any, callback: any) => {
//   if (!value) {
//     return callback()
//   }
//   setTimeout(() => {
//     if (!Number.isInteger(Number(value))) {
//       callback(new Error('请输入正确的电话号码'))
//     } else {
//       callback()
//     }
//   }, 1000)
// }

let infoCheck = ref(false)
let isLoading = ref(false)
let ruleForm = reactive({
  name: '',
  tmp: '',
  sex: '',
  age: '',
  number: '',
  patient: '',
  other: '无'
})
const ruleFormRef = ref<FormInstance>()
let rules = reactive({
  sex: [
    {
      required: true,
      message: '请选择您的性别',
      trigger: 'change'
    }
  ],
  age: [
    {
      required: true,
      message: '请输入您的年龄',
      trigger: 'change'
    }
    // { type:'number', message: '您输入的年龄不太对吧' },
    // { min: 0, max: 150, message: '请输入一个0~150的数字', trigger: 'blur' }
  ],
  patient: [{ required: true, message: '请输入您的住院号' }],
  number: [
    // { type:'number', message: '您输入的电话不太对吧' },
    { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessageBox.confirm('确认信息准确无误吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '我再看看',
        // center: true,
        roundButton: true
      })
        .then(() => {
          isLoading.value = true
          axios
            .post('/d-info/add', {
              name: 'normal',
              age: ruleForm.age,
              sex: ruleForm.sex,
              tel: ruleForm.number,
              patient: ''
            })
            .then((res: any) => {
              infoCheck.value = true
              userStore.setgId(res.data.id)
              console.log(res)
            })
            .catch((error: any) => {
              console.log(error)
            })
            .finally(() => {
              isLoading.value = false
            })
        })
        .catch(() => {})
    } else {
      console.log('error submit!', fields)
    }
  })
}
// function resetForm(formName: any) {
//   isLoading.value = false
//   // this.$refs[formName].resetFields()
// }
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
function confirmTutorial() {
  router.push({
    path: '/tutorial'
  })
}

onMounted(() => {
  // this.$store.commit("setDefault");
  userStore.setDefault()
})
</script>

<template>
  <!-- <div>infos_normal</div> -->
  <el-container class="bg-purple">
    <div class="blur-box">
      <el-main>
        <h1 class="title">{{ $t('info_page.normal_title') }}</h1>
        <div>
          <!-- <div class="background-container"> -->
          <el-col :span="12">
            <!-- <div class="background-container"> -->
            <div>
              <img class="circleImg" src="../assets/scut.jpg" />
              <div class="txt-avatar"></div>
              <img class="circleImg" src="../assets/gdph.jpg" />
            </div>
            <div class="grid-content">
              {{ $t('info_page.description') }}
            </div>
            <div>{{ $t('info_page.coopration') }}</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content">
              <el-form
                style="margin-top: 10%"
                :model="ruleForm"
                ref="ruleFormRef"
                :rules="rules"
                class="container"
                label-position="left"
                label-width="80px"
              >
                <el-form-item :label="$t('info_page.gender')" prop="sex">
                  <el-radio-group v-model="ruleForm.sex">
                    <el-radio value="0">{{ $t('info_page.male') }}</el-radio>
                    <el-radio value="1">{{ $t('info_page.female') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('info_page.age')" prop="age">
                  <el-input
                    type="number"
                    v-model.number="ruleForm.age"
                    :placeholder="$t('info_page.age_text')"
                  ></el-input>
                </el-form-item>

                <el-form-item :label="$t('info_page.phone_number')" prop="number">
                  <el-input
                    v-model="ruleForm.number"
                    :placeholder="$t('info_page.phone_number_text')"
                  ></el-input>
                </el-form-item>

                <div style="font-size: 14px; opacity: 0.6">
                  带<span style="color: red; opacity: 0.8">*</span>号代表着必填信息，不带<span
                    style="color: red; opacity: 0.8"
                    >*</span
                  >代表着选填信息
                </div>
                <hr class="hr" />
                <div>
                  <!-- <div class="bold">注:</div> -->
                  {{ $t('info_page.note') }}
                </div>
                <hr class="hr" />
              </el-form></div
          ></el-col>
        </div>
      </el-main>
      <el-footer>
        <el-row>
          <el-button
            v-if="!infoCheck"
            type="primary"
            round
            @click="submitForm(ruleFormRef)"
            :loading="isLoading"
            >{{ $t('button.submit') }}</el-button
          >
          <el-button v-if="!infoCheck" round @click="resetForm(ruleFormRef)">{{
            $t('button.reset')
          }}</el-button>
          <el-button v-if="infoCheck" type="primary" round @click="confirmTutorial"
            ><el-icon><VideoCameraFilled /></el-icon>开始录制视频</el-button
          >
        </el-row></el-footer
      >
    </div>
  </el-container>
</template>

<style>
.circleImg {
  border-radius: 60px;
  width: 120px;
  height: 120px;
}
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 0px;
}
.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 100%;
}

.el-aside {
  /* background-color: #d3dce6; */
  background-image: url('../assets/background.jpg');
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 400px; */
}
.hr {
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}
.bold {
  font-weight: bold;
  display: inline-block;
}
.background-container {
  /* 设置容器的宽高和其他样式 */
  /* width: 100%; */
  /* height: 200%; */
  /* 设置背景图 */
  background-image: url('../assets/background.jpg');
  /* background-size: 200% 200%; 背景图的尺寸适应容器 */
  /* background-position: right bottom; 背景图的位置 */
}
.bg-purple {
  background: #d3dce6;
  background-image: url('../assets/华南理工大学励吾科技楼（2007）.jpg');
}
.bg-purple-light {
  background: #e5e9f2;
  opacity: 75%;
}
.title {
  margin-top: 0px;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 0px;
  color: #000000;
}
.blur-box {
  width: 100%;
  /* 宽度改成跟字一样长，字有多长，宽有多长 */

  /* height: 250px; */
  /* background-image: url("../assets/华南理工大学励吾科技楼（2007）.jpg"); */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);

  margin: 0 auto;
}
.grid-content {
  margin-top: 10%;
}
</style>

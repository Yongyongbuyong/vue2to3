<script setup lang="ts" name="Infos_normal">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
import router from '@/router'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {useI18n} from "vue-i18n";
import i18n from "@/i18n";
const userStore = useUserStore()
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error(i18n.global.t('info_page.ageError') ))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error(i18n.global.t('info_page.inputNum')))
    } else {
      if (value > 99) {
        callback(new Error(i18n.global.t('info_page.notSuper99')))
      } else {
        callback()
      }
    }
  }, 1000)
}
const checkNumber = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback()
  }
  setTimeout(() => {
    if (!Number.isInteger(Number(value))) {
      callback(new Error(i18n.global.t('info_page.inputRightPhone') ))
    } else {
      callback()
    }
  }, 1000)
}

let infoCheck = ref(false)
let isLoading = ref(false)
let ruleForm = reactive({
  name: '',
  tmp: '',
  sex: '',
  age: '',
  number: '',
  patient: '',
  other: i18n.global.t('info_page.none')
})
const ruleFormRef = ref<FormInstance>()
let rules = reactive({
  sex: [
    {
      required: true,
      message: i18n.global.t('info_page.chooseSex'),
      trigger: 'change'
    }
  ],
  age: [
    {
      required: true,
      message: i18n.global.t('info_page.inputAge'),
      trigger: 'change'
    },
    { validator: checkAge, trigger: 'blur' }
  ],
  patient: [{ required: true, message: i18n.global.t('info_page.inputPatientId') }],
  number: [
    { min: 8, max: 11, required: true, message: i18n.global.t('info_page.inputPhone') },
    { validator: checkNumber, trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessageBox.confirm(i18n.global.t('info_page.confirmInfoRight'), i18n.global.t('info_page.tip'), {
        confirmButtonText: i18n.global.t('info_page.yes'),
        cancelButtonText: i18n.global.t('info_page.checkAgain'),
        //center: true
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
        <div style="display: flex">
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
            <div>{{ $t('info_page.coopration') }}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
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

                <!-- <div style="font-size: 14px; opacity: 0.6">
                  带<span style="color: red; opacity: 0.8">*</span>号代表着必填信息，不带<span
                    style="color: red; opacity: 0.8"
                >*</span
                >代表着选填信息
                </div> -->
                <div style="font-size: 14px; opacity: 0.6">{{ $t('info_page.iswith') }}</div>
                <hr class="hr" />
                <div>
                  <!-- <div class="bold">注:</div> -->
                  {{ $t('info_page.note') }}
                </div>
                <hr class="hr" />
              </el-form>
            </div>
          </el-col>
        </div>
      </el-main>
      <div style="display: flex; justify-content: center">
        <el-footer>
          <el-row>
            <el-button
              v-if="!infoCheck"
              type="primary"
              round
              @click="submitForm(ruleFormRef)"
              :loading="isLoading"
              >{{ $t('button.submit') }}
            </el-button>
            <el-button v-if="!infoCheck" round @click="resetForm(ruleFormRef)"
              >{{ $t('button.reset') }}
            </el-button>
            <el-button v-if="infoCheck" type="primary" round @click="confirmTutorial">
              <el-icon>
                <VideoCameraFilled />
              </el-icon>
              {{ $t('info_page.start') }}
            </el-button>
          </el-row>
        </el-footer>
      </div>
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

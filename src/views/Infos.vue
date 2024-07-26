<script setup lang="ts" name="Infos">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
import router from '@/router'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

const store = useUserStore()

const isLoading = ref(false)
const infoCheck = ref(false)
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('年龄不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value > 99) {
        callback(new Error('不超过99岁'))
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
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  }, 1000)
}

let ruleForm = reactive({
  name: '',
  tmp: '',
  sex: -1,
  age: '',
  number: '',
  patient: '',
  other: '无'
})

let rules = reactive({
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change'
    }
  ],
  age: [
    {
      required: true,
      message: '请输入您的年龄',
      trigger: 'change'
    },
    { validator: checkAge, trigger: 'blur' }
  ],
  patient: [{ required: true, message: '请输入您的住院号' }],
  number: [
    { min: 8, max: 11, message: '长度在 8 到 11 个字符' },
    { validator: checkNumber, trigger: 'blur' }
  ],
  other: [
    {
      required: true,
      message: '请选择病人类型',
      trigger: 'change'
    }
  ]
})
//这是一个对表单实例的引用，允许你在方法中访问和操作表单组件本身。它通常用于调用表单的方法，如验证（validate）、重置（resetFields）等。
const ruleFormRef = ref()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('确认信息准确无误吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '我再看看',
        center: true
      })
        .then(() => {
          isLoading.value = true
          axios
            .post('/d-info/add', {
              name: ruleForm.name,
              age: ruleForm.age,
              sex: ruleForm.sex,
              tel: ruleForm.number,
              patient: 'P' + ruleForm.patient
            })
            .then((res: any) => {
              infoCheck.value = true
              store.setgId(res.data.id)
              console.log(res)
            })
            .catch((error: any) => {
              console.log(error)
            })
        })
        .catch(() => {
          // Handle cancellation
        })
    } else {
      console.log('error submit!!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  isLoading.value = false
  formEl.resetFields()
}

const confirmTutorial = () => {
  router.push({ path: '/tutorial' })
}

onMounted(() => {
  store.setDefault()
})
</script>

<template>
  <!--  <div>infos</div>-->
  <el-container class="bg-purple">
    <el-main class="blur-box">
      <!--标题-->
      <h1 class="title">{{ $t('info_page.patient_title') }}</h1>

      <div style="display: flex">
        <!--左侧logo-->
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

        <!--        右侧表单-->
        <!--       model:指定表单数据对象。ruleForm是一个响应式对象，包含表单各字段的数据。 -->
        <el-form
          :model="ruleForm"
          ref="ruleFormRef"
          :rules="rules"
          class="container"
          label-position="left"
          label-width="80px"
        >
          <el-form-item :label="$t('info_page.name')" prop="name" style="margin-top: 10%">
            <el-input v-model="ruleForm.name" :placeholder="$t('info_page.name_text')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('info_page.gender')" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="0">{{ $t('info_page.male') }}</el-radio>
              <el-radio label="1">{{ $t('info_page.female') }}</el-radio>
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

          <el-form-item :label="$t('info_page.patient_id')" prop="patient">
            <el-input
              v-model="ruleForm.patient"
              :placeholder="$t('info_page.patient_text')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('info_page.other')" prop="other">
            <el-radio-group v-model="ruleForm.other">
              <el-radio :label="$t('info_page.no_text')"></el-radio>
              <el-radio :label="$t('info_page.术后随访')"></el-radio>
              <el-radio :label="$t('info_page.筛查')"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!--          表单下面的标注信息-->
          <hr class="hr" />
          <div>
            <div>
              <!-- <div class="bold">注:</div> -->
              {{ $t('info_page.note') }}
            </div>
          </div>
          <hr class="hr" />
        </el-form>
      </div>

      <div style="display: flex; justify-content: center">
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

          <el-button v-if="infoCheck" type="primary" round @click="confirmTutorial"
            ><el-icon> <VideoCameraFilled /> </el-icon>{{ $t('info_page.start') }}
          </el-button>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<style>
.circleImg {
  border-radius: 60px;
  width: 120px;
  height: 120px;
}

.bg-purple {
  background: #d3dce6;
  background-image: url('../assets/华南理工大学励吾科技楼（2007）.jpg');
}

.title {
  margin-top: 0px;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 0px;
  color: #000000;
}

.container {
}

.hr {
  width: 90%;
  height: 1px;
  background-color: #eeeeee;
}

.bold {
  font-weight: bold;
  display: inline-block;
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

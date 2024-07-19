<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
const { locale } = useI18n()

const language = ref({
  value: 'ZH-CN',
  title: '简体中文'
})

const languageList = [
  {
    value: 'ZH-CN',
    title: '简体中文'
  },
  {
    value: 'ZH-TW',
    title: '繁體中文'
  },
  {
    value: 'EN-US',
    title: 'English'
  }
]

function changeLanguage(index: number) {
  language.value = languageList[index]
  switch (language.value.value) {
    case 'ZH-TW':
      locale.value = 'zhTW'
      localStorage.setItem('lang', 'zhTW')
      break
    case 'EN-US':
      locale.value = 'en'
      localStorage.setItem('lang', 'en')
      break
    case 'ZH-CN':
      locale.value = 'zh'
      localStorage.setItem('lang', 'zh')
      break
  }
}

onMounted(() => {
  changeLanguage(0)
})
</script>

<template>
  <div>
    <el-dropdown trigger="click" @command="changeLanguage">
      <span class="el-dropdown-link">
        {{ language.title }} <el-icon><ArrowDown /></el-icon>
      </span>
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in languageList" :key="index" :command="index">
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

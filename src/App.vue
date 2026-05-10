<script setup lang="ts">
import { RouterView } from 'vue-router'
import Switch_lang from './views/Switch_lang.vue'
</script>

<template>
  <div id="app">
    <header>
      <div class="lang">
        <Switch_lang />
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fffefe;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #cfdeeb;
  margin: 6px 2px 0 2px;
  padding: 10px 20px;
  text-align: right;
  color: white;
  border-radius: 30px;
}

.lang {
  display: inline-block;
}

main {
  flex: 1;
  padding: 10px;
}

hr {
  border: none;
  border-top: 1px solid #2c3e50;
  margin: 20px 0;
}

a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #1a73e8;
}

a.router-link-exact-active {
  color: #1a73e8;
}

button {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #155ab6;
}
</style>

<style>
body {
  /* margin: 0; */
  margin: 0 10% 0 10%;
  padding: 0;
  box-sizing: border-box;
}
</style>

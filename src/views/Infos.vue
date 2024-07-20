<script setup lang="ts" name="Infos"></script>

<template>
  <div>infos</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 0px;
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

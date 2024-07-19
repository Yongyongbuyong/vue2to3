<script setup lang="ts"></script>
<template>
  <div class="home">
    <div>
      <!--pages/home/home.wxml-->
      <div class="container">
        <div class="avatar">
          <img class="circleImg" src="../assets/scut.jpg" />

          <div class="txt-avatar">×</div>
          <img class="circleImg" src="../assets/gdph.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-top: 20px;
  /* font-size: 75px; */
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 0px;
}

.circleImg {
  border-radius: 60px;
  width: 120px;
  height: 120px;
}

.avatar {
  margin-top: 0px;
  display: flex;
  /* flex-direction: row; */
  align-items: center;
}

.txt-avatar {
  font-size: 50px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
}

.container-begin {
  margin-top: 30px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bt-begin {
  /* border-radius:50%; */
  margin-top: 20px;
  letter-spacing: 5px;
  margin-bottom: 30px;
}

.btn-txt {
  /* font-size: 45px; */
  color: white;
  font-weight: bold;
}

.agreement {
  color: #0000ff;
}

.l-content {
  height: 60vh;
}

.agreeContent {
  font-size: 32px;
  line-height: 50px;
}

.scroll_display {
  height: 100%;
  vertical-align: middle;
}

.version-txt {
  /* position: absolute; */
  color: grey;
  left: 85.5vw;
  top: 96vh;
  font-weight: bold;
}
</style>

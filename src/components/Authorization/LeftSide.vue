<template>
    <div class="left-side-block">
      <div class="back-to-main-page">
          <img src="@/assets/arrow-left.svg">
           <router-link to="/"><a href="#">На главную</a></router-link>
      </div>
      <div class="left-side-block-items">
          <img src="@/assets/logo.png" alt="NotiKey" class="left-side-block-items-icon">
          <p class="left-side-block-items-title">NotiKey</p>
      </div>
    </div>
</template>
<style>
.left-side-block{
  background: url("../../assets/background-regist.png") no-repeat;
  background-size: cover;
  position: relative;
  height: 100vh;
  width: 75vw;
  float: left;
}
.left-side-block-items{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
.left-side-block-items-icon{
    width: 100px;
    padding-right: 10px;
    display: inline-block;
    vertical-align: middle;
}
.left-side-block-items-title{
    color: white;
    font-size: 60px;
    display: inline-block;
    vertical-align: middle;
}
.back-to-main-page{
    padding-left: 15px;
    padding-top: 15px;
}
.back-to-main-page a{
    padding-left: 5px;
}
@media screen and (max-width: 1240px) {
 .left-side-block{
    width: 70vw;
}
}
@media screen and (max-width: 1024px) {
 .left-side-block{
    width: 60vw;
}
}
@media screen and (max-width: 770px) {
 .left-side-block{
    width: 50vw;
}
}
@media screen and (max-width: 620px) {
 .left-side-block{
    display: none;
}
}
</style>
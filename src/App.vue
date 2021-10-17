<template>
  <main-section></main-section>
  <benefit-section></benefit-section>
  <services-section></services-section>
  <mobile-app-section></mobile-app-section>
  <note-section></note-section>
  <footer-part></footer-part>

  <div class="upButton" id="upPageBtn">
    <img src="@/assets/arrowUpPage.png" alt="" />
  </div>
</template>

<script>
import BenefitSection from "./components/BenefitSection.vue";
import FooterPart from "./components/FooterPart.vue";
import MainSection from "./components/MainSection.vue";
import MobileAppSection from "./components/MobileAppSection.vue";
import NoteSection from "./components/NoteSection.vue";
import ServicesSection from "./components/ServicesSection.vue";

export default {
  components: {
    FooterPart,
    MainSection,
    BenefitSection,
    ServicesSection,
    MobileAppSection,
    NoteSection,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  font-family: "Roboto", sans-serif;
}

@font-face {
  font-family: "Roboto";
  src: local("Roboto"), local("Roboto"),
    url("~@/fonts/Roboto-Regular.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Roboto";
  src: local("Roboto"), local("Roboto"),
    url("~@/fonts/Roboto-Light.woff2") format("woff2");
  font-weight: 100;
  font-style: normal;
}

.upButton {
  background: #fff;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 6px solid #4599f5;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 20;
  -webkit-box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.2);
}

.upButton img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 18px;
  transform: translate(-50%, -50%);
}
</style>
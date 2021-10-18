<template>
  <main-section></main-section>
  <benefit-section></benefit-section>
  <services-section></services-section>
  <partners-section></partners-section>
  <mobile-app-section></mobile-app-section>
  <note-section></note-section>
  <footer-part></footer-part>

  <div class="upButton" id="upPageBtn">
    <img src="@/assets/arrowUpPage.png" alt="" />
  </div>
</template>

<script>
import BenefitSection from '@/components/LandingPage/BenefitSection.vue';
import FooterPart from '@/components/LandingPage/FooterPart.vue';
import MainSection from '@/components/LandingPage/MainSection.vue';
import MobileAppSection from '@/components/LandingPage/MobileAppSection.vue';
import ServicesSection from '@/components/LandingPage/ServicesSection.vue';
import PartnersSection from '@/components/LandingPage/PartnersSection.vue';
import NoteSection from "@/components/LandingPage/NoteSection.vue";

export default {
  components: {
    FooterPart,
    MainSection,
    BenefitSection,
    ServicesSection,
    PartnersSection,
    MobileAppSection,
    NoteSection,
  },
};
</script>

<style>

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
<template>
    <main-section></main-section>
    <benefit-section></benefit-section>
    <services-section></services-section>
    <mobile-app-section></mobile-app-section>
    <footer-part></footer-part>
</template>

<script>
import BenefitSection from './components/BenefitSection.vue';
import FooterPart from './components/FooterPart.vue';
import MainSection from './components/MainSection.vue';
import MobileAppSection from './components/MobileAppSection.vue';
import ServicesSection from './components/ServicesSection.vue'

export default {
  components: {
    FooterPart,
    MainSection,
    BenefitSection,
    ServicesSection,
    MobileAppSection,
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
  font-family: 'Roboto';
  src: local('Roboto'), local('Roboto'),
    url('~@/fonts/Roboto-Regular.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
}


@font-face {
  font-family: 'Roboto';
  src: local('Roboto'), local('Roboto'),
    url('~@/fonts/Roboto-Light.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
}

</style>
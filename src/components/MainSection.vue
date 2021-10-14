<template>
  <my-section class="main-section">
    <header-part></header-part>
    <div class="main-content">
      <div class="main-information">
        <h1>
          <span>Лучшее</span> решение<br />
          <span>ваших</span> проблем
        </h1>
        <p>
          Мы предоставляем лучший сервис по поиску сто,<br />
          и обеспечиваем комфортное использование
        </p>
        <my-button class="note-btn">Записаться</my-button>
      </div>
      <div class="adver-mobile-image">
        <img src="@/assets/mobileAppTwo.png" alt="MobileApp" />
      </div>
    </div>
  </my-section>
</template>

<script>
import HeaderPart from "./HeaderPart.vue";
export default {
  components: {
    HeaderPart,
  },
};
</script>

<style>
.main-section {
  background: url("../assets/mainSectionBg.png") 100% 100% no-repeat;
  background-size: cover;
  height: 820px;
  padding-top: 10px;
}

.main-content {
  display: flex;
  justify-content: space-around;
  margin-top: 45px;
}

.main-information {
  margin-top: 55px;
  text-align: left;
}

.main-information h1 {
  font-size: 50px;
  color: #fff;
  font-weight: 100;
  line-height: 55px;
  margin-bottom: 20px;
}

.main-information h1 span {
  font-weight: 600;
}

.main-information p {
  font-size: 18px;
  color: #fff;
  font-weight: 100;
  margin-bottom: 30px;
}

.adver-mobile-image {
  width: 400px;
  height: 500px;
}

.adver-mobile-image img {
  max-width: 100%;
  max-height: 100%;
}

@media screen and (max-width: 900px) {
  .adver-mobile-image {
    display: none;
  }

  .main-information {
    text-align: center;
  }

  .main-information h1 {
    font-size: 60px;
  }

  .note-btn {
    padding: 20px 50px !important;
    font-size: 20px !important;
  }
}

@media screen and (max-width: 540px) {
  .main-section {
    height: 700px;
  }

  .main-information h1 {
    font-size: 48px;
  }

  .main-information p {
    font-size: 15px;
  }
}

@media screen and (max-width: 430px) {
  .main-information h1 {
    font-size: 40px;
    line-height: 40px;
  }

    .note-btn {
    padding: 15px 30px !important;
    font-size: 14px !important;
  }
}

@media screen and (max-width: 380px) {
    .main-information h1 {
    font-size: 30px;
    line-height: 30px;
  }

    .main-information p {
    font-size: 11px;
  }
}
</style>
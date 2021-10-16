<template>
  <my-section class="mobileApp-section">
    <div class="circle-mobile-block">
      <img src="@/assets/circleBgMobileSection.png" alt="" />
    </div>
    <div class="head-section">
      <h2>Наше мобильное приложение</h2>
    </div>
    <div class="section-content">
      <div class="mobile-image-block">
        <div class="image-wrap">
          <img src="@/assets/mobileAppIPhone.png" alt="" />
        </div>
      </div>
      <div class="mobile-info-block">
        <p>Преимущества приложения NotiKey:</p>
        <ul class="app-benefits">
          <li>Удобный в использовании.</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </li>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore.
          </li>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore.
          </li>
        </ul>
        <div class="app-download-btn-block">
          <a href="#">
            <img src="@/assets/appstorBtn.png" alt="" />
          </a>
          <a href="#">
            <img src="@/assets/googlePlayBtn.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  </my-section>
</template>

<script>
export default {};
</script>

<style>
.mobileApp-section {
  background: url("../assets/mobileSectionBg.png") 76% 80% no-repeat;
  background-size: cover;
  position: relative;
}

.mobile-image-block {
  display: flex;
  flex-basis: 34%;
  justify-content: center;
}

.image-wrap {
  width: 350px;
  height: auto;
}

.image-wrap img {
  max-width: 100%;
  max-height: 100%;
}

.section-content {
  display: flex;
  justify-content: space-around;
  padding: 65px 0;
}

.head-section {
  text-align: center;
  color: #2657b1;
  margin-bottom: 20px;
}

.mobile-info-block {
  color: #fff;
  flex-basis: 50%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mobile-info-block p {
  font-size: 20px;
}

.app-benefits {
  padding-left: 60px;
  margin-bottom: 30px;
  list-style: none;
}

.app-benefits::marker {
  width: 20px;
}

.app-benefits li {
  margin: 30px 0;
  font-size: 20px;
  width: 400px;
  position: relative;
}

.app-benefits li::before {
  content: "";
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: -40px;
  top: 4px;
}

.app-download-btn-block {
  display: flex;
}

.app-download-btn-block a:first-child {
  margin-right: 24px;
  display: block;
}

.circle-mobile-block {
  width: 100px;
  height: 100px;
  position: absolute;
}

.circle-mobile-block img {
  max-width: 100%;
  max-height: 100%;
}

@media screen and (min-width: 1500px) {
  .mobileApp-section {
    background: url("../assets/mobileAppBgFullHD.png") 76% 80% no-repeat;
    background-size: cover;
    position: relative;
  }

  .image-wrap {
    width: 485px;
  }

  .mobile-image-block {
    flex-basis: 68%;
  }

  .mobile-info-block p, .mobile-info-block ul li{
    font-size: 30px;
  }

  .app-benefits li {
    width: 450px;
  }
  
    .head-section h2 {
    font-size: 35px;
  }
}

@media screen and (max-width: 850px) {
  .mobileApp-section {
    background: url("../assets/mobileSectionBg.png") 50% 100% no-repeat;
    background-size: cover;
  }

  .image-wrap {
    width: 280px;
  }

  .app-benefits li {
    margin: 15px 0;
    font-size: 18px;
    width: 300px;
    position: relative;
  }

  .app-benefits li::before {
    width: 10px;
    height: 10px;
  }

  .app-download-btn-block {
    flex-direction: column;
    align-items: center;
  }

  .app-download-btn-block a:first-child {
    margin-bottom: 10px;
    margin-right: 0;
  }
}

@media screen and (max-width: 700px) {
  .mobile-image-block {
    display: none;
  }

  .mobile-info-block {
    padding-top: 0;
  }

  .app-download-btn-block {
    flex-direction: row;
  }

  .app-download-btn-block a:first-child {
    margin-right: 10px;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 610px) {
  .circle-mobile-block {
    display: none;
  }
}

@media screen and (max-width: 420px) {
  .mobile-info-block p {
    font-size: 14px;
  }

  .app-benefits li {
    font-size: 14px;
  }

  .app-download-btn-block {
    flex-direction: column;
    align-items: center;
  }

  .app-download-btn-block a:first-child {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .head-section {
    margin-top: 10px;
  }

  .head-section h2 {
    font-size: 20px;
  }
}

@media screen and (max-width: 380px) {
  .mobile-info-block {
    font-size: 11px;
    flex-basis: 100%;
  }

  .app-benefits {
    padding-left: 39px;
    margin-bottom: 15px;
  }

  .app-benefits li {
    font-size: 11px;
    width: 100%;
  }

  .app-benefits li::before {
    left: -15px;
    width: 8px;
    height: 8px;
  }

  .app-download-btn-block {
    flex-direction: column;
    align-items: center;
  }

  .app-download-btn-block a:first-child {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
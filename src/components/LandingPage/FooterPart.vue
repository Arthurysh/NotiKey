<template>
  <footer>
    <div class="footer-container">
      <div class="link-block">
        <ul class="footer-links">
          <li><a href="#">Главная</a></li>
          <li><a href="#">Преимущества</a></li>
          <li><a href="#">Услуги</a></li>
          <li><a href="#">Партнеры</a></li>
        </ul>
        <div class="mobile-links">
          <div class="left-block-links">
            <a href="#">Главная</a>
            <a href="#">Преимущества</a>
          </div>
          <div class="right-block-links">
            <a href="#">Услуги</a>
            <a href="#">Партнеры</a>
          </div>
        </div>
      </div>
      <div class="logo-block">
        <h2 class="logo-title">NotiKey</h2>
        <a href="#">
          <div class="logo-image">
            <img src="@/assets/logo.png" alt="NotiKey" />
          </div>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-container {
  background: url("../../assets/footerBg.png") 50% 50% no-repeat;
  background-size: cover;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.footer-links {
  list-style: none;
  display: flex;
  justify-content: center;
}

.footer-links li {
  margin: 0 20px;
  position: relative;
}

.footer-links li:hover {
  text-decoration: underline;
}

.footer-links li::after {
  content: "";
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -25px;
}

.footer-links li:last-child::after {
  display: none;
}

.logo-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo-block h2 {
  margin-right: 10px;
}

.mobile-links {
  display: none;
}

@media screen and (min-width: 1500px) {
  .footer-container {
    height: 470px;
  }

  .footer-links a {
    font-size: 25px;
  }
}

@media screen and (max-width: 550px) {
  .link-block {
    margin-bottom: 10px;
  }

  .footer-links li {
    margin: 6px;
  }

  .footer-links li::after {
    display: none;
  }

  .logo-image {
    width: 60px;
    height: 60px;
  }

  .footer-links {
    display: none;
  }

  .mobile-links {
    display: flex;
    justify-content: space-around;
  }

  .left-block-links,
  .right-block-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

    .left-block-links a,
  .right-block-links a {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 430px) {
  .logo-title {
    font-size: 22px;
  }
}
</style>
<template>
  <header>
    <div class="header-container">
      <div class="logo-block">
        <a href="#">
          <div class="logo-image">
            <img src="@/assets/logo.png" alt="NotiKey" />
          </div>
          <h2 class="logo-title">NotiKey</h2>
        </a>
      </div>
      <div class="nav">
        <div class="nav-block">
          <ul class="nav-list">
            <li><a href="#">Главная</a></li>
            <li><a href="#">Преимущества</a></li>
            <li><a href="#">Услуги</a></li>
            <li><a href="#">Партнеры</a></li>
          </ul>
        </div>
        <div class="auth-block">
          <my-button class="auth-btn head-btn" @click="$router.push('/Authorization')">Вход</my-button>
          <my-button class="reg-btn head-btn" @click="$router.push('/Registration')">Регестрация</my-button>
        </div>
      </div>
      <div ref="burger" class="burger_menu">
        <input
          @change="controllMobileNavSide()"
          type="checkbox"
          id="burgerMenu"
        />
        <label for="burgerMenu">
          <div class="burger_line first_line"></div>
          <div class="burger_line second_line"></div>
          <div class="burger_line third_line"></div>
          <div class="burger_line fourth_line"></div>
        </label>
      </div>
    </div>
  </header>

  <div class="nav-side" id="navSide">
    <div class="nav-head">
      <a class="nav-link" href="#">NotiKey</a>
      <div @click="closeNavMenu()" class="close-side-nav" id="closeNavSide">
        <img src="@/assets/closeIconWhite.png" alt="Close" />
      </div>
    </div>
    <div class="nav-body">
      <my-button class="mobile-nav-btn" @click="$router.push('/Authorization')">Вход</my-button>
      <my-button class="mobile-nav-btn" @click="$router.push('/Registration')">Регистрация</my-button>
    </div>
  </div>

  <div @click="closeNavMenu()" class="cover-block" id="coverBlock"></div>
</template>

<script>
export default {
  methods: {
    controllMobileNavSide() {
      let burger = document.getElementById("burgerMenu");
      let navSide = document.getElementById("navSide");
      let coverBlock = document.getElementById("coverBlock");

      if (burger.checked) {
        coverBlock.style.zIndex = 15;
        coverBlock.style.opacity = 1;
        navSide.style.minWidth = "250px";
        navSide.style.maxWidth = "250px";
      }
    },
    closeNavMenu() {
      let burger = document.getElementById("burgerMenu");
      let navSide = document.getElementById("navSide");
      let coverBlock = document.getElementById("coverBlock");

      burger.checked = !burger.checked;
      coverBlock.style.zIndex = -10;
      coverBlock.style.opacity = 0;
      navSide.style.minWidth = "0px";
      navSide.style.maxWidth = "0px";
    },
  },
};
</script>

<style>
.header-container {
  display: flex;
  justify-content: space-between;
}

.logo-block a {
  display: flex;
  align-items: center;
}

a {
  color: #fff;
  text-decoration: none;
}

.logo-image {
  width: 80px;
  height: 80px;
}

.logo-image img {
  max-width: 100%;
  max-height: 100%;
}

.logo-title {
  margin-left: 10px;
  color: #fff;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-block {
  margin-right: 40px;
}

.nav-list {
  list-style-type: none;
  display: flex;
}

.nav-list li {
  margin: 0 10px;
  font-size: 14px;
  cursor: pointer;
}

.auth-btn {
  background: transparent !important;
  border: 2px solid #fff !important;
  margin-right: 20px;
  padding: 10px 40px !important;
}

.reg-btn {
  padding: 12px 20px !important;
}

.auth-btn:hover {
  background: #267ddd !important;
  color: #fff !important;
  border: 2px solid transparent !important;
}

/* Burger menu */

.burger_menu {
  width: 34px;
  height: 34px;
  position: relative;
  display: none;
}

.burger_menu label {
  position: relative;
  display: block;
  height: 100%;
}

.burger_menu input#burgerMenu {
  display: none;
}

.burger_menu .burger_line {
  width: 100%;
  height: 3px;
  background-color: #fff;
  position: absolute;
  transition: all 0.5s;
}

.burger_menu label .second_line,
.third_line {
  top: 50%;
  transform: translateY(-50%);
}

.burger_menu label .first_line {
  opacity: 1;
  top: 5px;
}

.burger_menu label .fourth_line {
  opacity: 1;
  bottom: 5px;
}

#burgerMenu:checked ~ label .first_line {
  opacity: 0;
}

#burgerMenu:checked ~ label .fourth_line {
  opacity: 0;
}

#burgerMenu:checked ~ label .second_line {
  transform: rotate(45deg);
}

#burgerMenu:checked ~ label .third_line {
  transform: rotate(-45deg);
}

/* Nav side */

.nav-side {
  height: 100%;
  position: absolute;
  max-width: 0;
  min-width: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 20;
  overflow: hidden;
  transition: all 0.5s;
}

.nav-side .nav-head {
  display: flex;
  justify-content: space-between;
  padding: 28px 10px;
  background-color: #2657b1;
}

.nav-side .nav-head a {
  font-size: 18px;
  font-weight: bold;
}

.nav-side .nav-body {
  display: flex;
  flex-direction: column;
}

.nav-side .nav-body .nav-link {
  padding: 10px 15px;
  border-bottom: 1px solid #ccc;
  text-decoration: none;
  color: #666666;
}

.close-side-nav {
  height: 20px;
  width: 20px;
}

.close-side-nav img {
  max-width: 100%;
  max-height: 100%;
}

.cover-block {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -10;
  opacity: 0;
}

.mobile-nav-btn {
  background: #4599f5;
  width: 100%;
  border-radius: 0 !important;
  padding: 20px 40px !important;
  border: none !important;
  border-bottom: 1px solid #fff !important;
}

.mobile-nav-btn:hover {
  background: #267ddd ;
}

@media screen and (max-width: 900px) {
  .nav-block {
    display: none;
  }
}

@media screen and (max-width: 550px) {
  .header-container {
    align-items: center;
  }

  .header-container .logo-image {
    width: 60px;
    height: 60px;
  }
  .auth-block {
    display: none;
  }

  .burger_menu {
    display: block;
  }
}
</style>
<template>
  <my-section class="benefit-section">
    <div class="right-circle">
      <img src="@/assets/RightBenefitCircle.png" alt="" />
    </div>
    <div class="left-circle">
      <img src="@/assets/LeftBenefitCircle.png" alt="" />
    </div>
    <div class="benefit-title">
      <h2>Наши преимущества</h2>
    </div>
    <div class="benefit-items">
      <div
        class="benefit-item"
        v-for="imageSrc in arrBenefitImage"
        :key="imageSrc"
      >
        <div class="item-head">
          <div class="image-block">
            <img :src="getImgUrl(imageSrc.image)" alt="" />
          </div>
          <p class="item-title">{{ imageSrc.title }}</p>
        </div>
        <div class="item-body">
          <p class="item-description">{{ imageSrc.description }}</p>
        </div>
      </div>
    </div>
  </my-section>
</template>

<script>
export default {
  data() {
    return {
      arrBenefitImage: [
        {
          image: "benefitLogo.png",
          title: "Удобность",
          description: `С помощью нашего приложения
          вы можете записаться на СТО с любой точки планеты..`,
        },
        {
          image: "benefitLogo.png",
          title: "Удобность",
          description: `С помощью нашего приложения
          вы можете записаться на СТО с любой точки планеты..`,
        },
        {
          image: "benefitLogo.png",
          title: "Удобность",
          description: `С помощью нашего приложения
          вы можете записаться на СТО с любой точки планеты..`,
        },
      ],
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("@/assets/" + pic);
    },
  },
};
</script>

<style>
.benefit-section {
  position: relative;
  padding:  0;
}
.benefit-title {
  text-align: center;
  margin-bottom: 40px;
  color: #2657b1;
}
.image-block {
  width: 67px;
}
.image-block img {
  max-width: 100%;
  max-height: 100%;
}
.benefit-items {
  display: flex;
  justify-content: center;
}
.benefit-item {
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
  margin: 0 20px;
}
.item-head {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-body {
  text-align: center;
}
.item-title {
  font-size: 24px;
  font-weight: 500;
}
.item-description {
  font-size: 15px;
  font-weight: 300;
  color: #7c7c7c;
}
.right-circle {
  position: absolute;
  right: 80px;
  top: 35px;
}

.left-circle {
  position: absolute;
  top: 35px;
}

@media screen and (min-width: 1500px) {
  .benefit-title h2{
    font-size: 35px;
  }

  
  .item-title {
    font-size: 30px;
  }

  .item-description {
    font-size: 20px;
  }
}

@media screen and (max-width: 750px) {
  .benefit-items {
    flex-wrap: wrap;
  }
  .benefit-item:last-child {
    flex-basis: 40%;
    margin-top: 30px;
  }
}

@media screen and (max-width: 600px) {
  .right-circle,
  .left-circle {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  .benefit-item {
    flex-basis: 80%;
    margin-bottom: 40px;
  }

  .benefit-title {
    font-size: 14px;
  }

  .benefit-item:last-child {
    flex-basis: 80%;
    margin-top: 0px;
  }

  .benefit-section {
    padding: 30px 0;
  }
}
</style>
<template>
  <my-section class="services-section">
    <div class="left-circle">
      <img src="@/assets/circle-background-services.png" alt="" />
    </div>
    <div class="services-title">
      <h2>Наши услуги</h2>
    </div>
    <div class="services-items">
      <div
        class="servicesitem services-items-line-one"
        v-for="imageSrc in arrServicesImageOneLine"
        :key="imageSrc"
      >
        <div class="services-item-head">
          <div class="services-image-block">
            <img :src="getImgUrl(imageSrc.image)" alt="" />
          </div>
          <p class="services-item-title">{{ imageSrc.title }}</p>
        </div>
      </div>

      <div
        class="servicesitem services-items-line-two"
        v-for="imageSrc in arrServicesImageTwoLine"
        :key="imageSrc"
      >
        <div class="services-item-head">
          <div class="services-image-block">
            <img :src="getImgUrl(imageSrc.image)" alt="" />
          </div>
          <p class="services-item-title">{{ imageSrc.title }}</p>
        </div>
      </div>

      <div
        class="servicesitem services-items-line-three"
        v-for="imageSrc in arrServicesImageThreeLine"
        :key="imageSrc"
      >
        <div class="services-item-head">
          <div class="services-image-block">
            <img :src="getImgUrl(imageSrc.image)" alt="" />
          </div>
          <p class="services-item-title">{{ imageSrc.title }}</p>
        </div>
      </div>
    </div>
  </my-section>
</template>

<script>
export default {
  data() {
    return {
      arrServicesImageOneLine: [
        {
          image: "brush.png",
          title: "Чистка двигателя",
        },
        {
          image: "candle.png",
          title: "Замена свечей",
        },
        {
          image: "computer.png",
          title: "Компьютерная диагностика",
        },
      ],
      arrServicesImageTwoLine: [
        {
          image: "brush.png",
          title: "Чистка двигателя",
        },
        {
          image: "candle.png",
          title: "Замена свечей",
        },
        {
          image: "computer.png",
          title: "Компьютерная диагностика",
        },
      ],
      arrServicesImageThreeLine: [
        {
          image: "brush.png",
          title: "Чистка двигателя",
        },
        {
          image: "candle.png",
          title: "Замена свечей",
        },
        {
          image: "computer.png",
          title: "Компьютерная диагностика",
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
.services-section {
  background: url("../assets/background-services.png") no-repeat;
  background-size: cover;
  position: relative;
  padding-top: 255px;
  margin-bottom: 35px;
  height: 904px;
}
.services-title {
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
}
.services-items {
  text-align: center;
}
.services-items-line-one {
  float: left;
  width: 33%;
  padding: 31px;
}
.services-items-line-two {
  float: left;
  width: 33%;
  padding: 31px;
}
.services-items-line-three {
  float: left;
  width: 33%;
  padding: 31px;
}
.services-item-title {
  color: #fff;
  font-size: 22px;
}
.services-image-block {
  display: flex;
  justify-content: center;
  margin-bottom: 7px;
}
.services-item-head p {
  display: flex;
  justify-content: center;
  font-size: 23px;
}
.services-image-block img {
  width: 50px;
}
@media screen and (max-width: 1152px) {
  .services-section {
    padding-top: 205px;
  }
}
@media screen and (max-width: 524px) {
  .services-image-block img {
    width: 30px;
  }
  .services-item-head .services-item-title {
    font-size: 15px;
  }
  .services-section {
    height: 754px;
  }
}
@media screen and (max-width: 350px) {
  .services-image-block img {
    width: 22px;
  }
  .services-title {
    font-size: 14px;
  }
  .services-item-head .services-item-title {
    font-size: 12px;
  }
  .services-section {
    height: 664px;
  }
}
@media screen and (min-width: 1440px) {
 .services-section {
  height: 1004px;
} 
}
@media screen and (min-width: 1597px) {
 
 .services-section {
  height: 1204px;
  padding-top: 405px;
} 
}
@media screen and (min-width: 1916px) {
 
 .services-section {
  height: 1404px;
  padding-top: 505px;
} 
}
@media screen and (min-width: 2215px) {
 
 .services-section {
  height: 1604px;
  padding-top: 605px;
} 
}
</style>
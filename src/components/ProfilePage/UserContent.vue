<template>
  <!-- Профиль пользователя -->
  <div
    class="profile-info"
    v-if="this.userItemID == 1 && this.userRole == 'User'"
  >
    <div class="welcoming-image">
      <p class="welcoming-user-text">Hello, user</p>
    </div>
    <div class="user-info">
      <div class="head-item">Профиль</div>
      <div class="user-fields">
        <div class="input-user-wrap">
          <my-input
            value="Алексей"
            :placeholderValue="'Имя'"
            id="nameField"
          ></my-input>
        </div>
        <div class="input-user-wrap">
          <my-input
            value="Трофименко"
            :placeholderValue="'Фамилия'"
            id="surnameField"
          ></my-input>
        </div>
        <div class="input-user-wrap">
          <my-input
            value="+380972362662"
            :placeholderValue="'Телефон'"
            id="phoneField"
          ></my-input>
        </div>
        <div class="input-user-wrap">
          <my-input
            value="master2021@gmail.com"
            :placeholderValue="'Почта'"
            id="emailField"
          ></my-input>
        </div>
        <div class="input-user-wrap">
          <my-input
            value="2001.12.12"
            type="date"
            :placeholderValue="'Дата рождения'"
            id="birthdayField"
          ></my-input>
        </div>
        <div class="input-user-wrap">
          <my-input
            value="master"
            type="password"
            :placeholderValue="'Пароль'"
            id="passwordField"
          ></my-input>
        </div>
        <my-button type="button" class="save-user-info is-not-active-btn"
          >Сохранить</my-button
        >
      </div>
    </div>
  </div>
  <!-- Записи пользователя -->
  <div
    class="note-content user-head-content"
    v-if="this.userItemID == 2 && this.userRole == 'User'"
  >
    <h1>Hello Note</h1>
  </div>
  <!-- Транспорт пользователя -->
  <div
    class="car-content"
    v-if="this.userItemID == 3 && this.userRole == 'User'"
  >
    <div class="car-head-content user-head-content">
      <h2>Транспорт</h2>
    </div>

    <my-grid>
      <my-grid-item class="car-item" v-for="car in userCars" :key="car">
        <div class="car-image-block">
          <img :src="require('@/assets/' + car.image)" alt="">
        </div>
        <div class="car-name">
          <p>{{car.brand + " " + car.model}}</p>
        </div>
      </my-grid-item>
    <my-grid-item class="add-new-car">
      <div class="circle-block">
        <img src="@/assets/addIcon.png" alt="">
      </div>
    </my-grid-item>
    </my-grid>
  </div>
  <!-- Скидки пользователя -->
  <div
    class="Discount-content"
    v-if="this.userItemID == 4 && this.userRole == 'User'"
  >
    <div class="discount-head-content user-head-content">
      <h2>Скидки</h2>
    </div>

    <my-grid>
      <my-grid-item
        class="discount-card"
        v-for="discount in userDiscounts"
        :key="discount"
      >
        <div class="discount-card-head">
          <h3>Станция - {{ discount.station }}</h3>
        </div>
        <div class="discount-content">
          <div class="percent">
            <p>{{ discount.percent }}%</p>
          </div>
          <div class="date-limit">
            <p>Действует до: {{ discount.date }}</p>
          </div>
        </div>
      </my-grid-item>
    </my-grid>
  </div>
</template>

<script>
import MyGridItem from "../UI/MyGridItem.vue";
export default {
  components: { MyGridItem },
  props: {
    userItemID: {
      type: Number,
      default: 1,
    },
    userRole: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userDiscounts: [
        {
          station: "Elcar",
          percent: 5,
          date: "22.10.2022",
        },
        {
          station: "Towcar",
          percent: 10,
          date: "22.10.2022",
        },
        {
          station: "Towcar",
          percent: 10,
          date: "22.10.2022",
        },
        {
          station: "Towcar",
          percent: 10,
          date: "22.10.2022",
        },
      ],
      userCars: [
        {
          image: "carTest1.png",
          brand: "Tesla",
          model: "Model S",
          year: "2017",
          type: "Седан",
          power: "200лс",
          maxSpeed: 200,
          racingTime: 4,
        },
        {
          image: "carTest2.png",
          brand: "Tesla",
          model: "Model X",
          year: "2020",
          type: "Седан",
          power: "300лс",
          maxSpeed: 250,
          racingTime: 3,
        },
      ],
    };
  },
};
</script>

<style>
.welcoming-image {
  height: 175px;
  position: relative;
  background: url("../../assets/welcomingBgProfile1.jpeg") 100% 58% no-repeat;
  background-size: cover;
  border-radius: 18px;
  margin-bottom: 35px;
}

.welcoming-user-text {
  color: #fff;
  font-weight: bold;
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 20px;
}

.head-item {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
}

.user-info {
  width: 60%;
}

.user-fields {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.user-fields .input-user-wrap {
  flex-basis: 45%;
  margin-bottom: 20px;
}

.save-user-info {
  border-radius: 5px !important;
  padding: 10px 70px !important;
}

#birthdayField {
  padding-left: 54px;
}

.user-head-content h2 {
  text-align: center;
  margin-bottom: 24px;
}

/* Скидки пользователя */

.discount-card {
  background: #ffd15a;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  padding: 15px;
  color: #3e3e3e;
}

.discount-card .discount-card-head {
  margin-bottom: 44px;
  font-size: 14px;
}

.discount-card .discount-content {
  display: flex;
  justify-content: space-between;
}

.discount-content .percent p {
  font-size: 36px;
  color: #fff;
  font-weight: bold;
}

.discount-content .date-limit {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  text-align: right;
}

/* Транспорт пользователя */

.car-item {
  cursor: pointer;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  padding: 15px;
  color: #3e3e3e;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: 0.3s;
}

.car-image-block {
  width: 170px;
  height: 100px;
  margin-bottom: 10px;
  text-align: center;
}

.car-image-block img {
max-width: 100%;
  max-height: 100%;
}

.car-name {
  text-align: center;
}

.car-item:hover, .add-new-car:hover {
  -webkit-box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
-moz-box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
}

.add-new-car {
  position: relative;
    cursor: pointer;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  background: #EDEDED;
  transition: 0.5s;
  padding: 78px;
}

.circle-block {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #BFBFBF;
  background: #fff;
}

.circle-block img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

@media screen and (max-width: 1120px) {
  .user-info {
    width: 100%;
  }

  .save-user-info {
    margin: 0 auto;
  }

  .user-profile-block {
    flex-direction: column;
  }
}

@media screen and (max-width: 600px) {
  .user-info .input-user-wrap {
    flex-basis: 100%;
  }

  .table-row {
    flex-basis: 100%;
    margin-right: 0;
  }

  /* User discounts */

  .discount-content .percent p {
    font-size: 25px;
  }

  .discount-content .date-limit p {
    font-size: 12px;
  }

  .discount-card-head h3 {
    font-size: 15px;
  }
}

@media screen and (max-width: 430px) {
  .welcoming-image {
    height: 130px;
  }

  .user-head-content h2 {
    font-size: 20px;
  }
}
</style>
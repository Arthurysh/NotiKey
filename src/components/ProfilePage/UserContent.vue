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
    class="note-content"
    v-if="this.userItemID == 2 && this.userRole == 'User'"
  >
    <h1>Hello Note</h1>
  </div>
  <!-- Транспорт пользователя -->
  <div
    class="car-content"
    v-if="this.userItemID == 3 && this.userRole == 'User'"
  >
    <h1>Hello Car</h1>
  </div>
  <!-- Скидки пользователя -->
  <div
    class="Discount-content"
    v-if="this.userItemID == 4 && this.userRole == 'User'"
  >
    <div class="discount-head-content">
      <h2>Скидки</h2>
    </div>

    <my-grid>
      <my-grid-item class="discount-card" v-for="discount in userDiscounts" :key="discount">
        <div class="discount-card-head">
          <h3>Станция - {{discount.station}}</h3>
        </div>
        <div class="discount-content">
          <div class="percent">
            <p>{{discount.percent}}%</p>
          </div>
          <div class="date-limit">
            <p>Действует до: {{discount.date}}</p>
          </div>
        </div>
      </my-grid-item>
    </my-grid>
  </div>
</template>

<script>
import MyGridItem from '../UI/MyGridItem.vue';
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

/* Скидки пользователя */

.discount-head-content {
  text-align: center;
  margin-bottom: 24px;
}

.discount-card {
  background: #FFD15A;
  border: 1px solid #B0B0B0;
  border-radius: 12px;
  padding: 15px;
  color: #3E3E3E;
}

.discount-card .discount-card-head {
  margin-bottom: 44px;
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

  .discount-head-content h2 {
    font-size: 20px;
  }
}
</style>
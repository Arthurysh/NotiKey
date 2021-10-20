<template>
  <div class="profile-container">
    <div
      class="profile-info"
      v-if="this.userItemID == 1 && this.isAdmin == false"
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
    <div
      class="note-content"
      v-if="this.userItemID == 2 && this.isAdmin == false"
    >
      <h1>Hello Note</h1>
    </div>
    <div
      class="car-content"
      v-if="this.userItemID == 3 && this.isAdmin == false"
    >
      <h1>Hello Car</h1>
    </div>
    <div
      class="Discount-content"
      v-if="this.userItemID == 4 && this.isAdmin == false"
    >
      <h1>Hello Discount</h1>
    </div>

    <!-- Admin content -->

    <div
      class="table-content"
      v-if="this.userItemID == 1 && this.isAdmin == true"
    >
      <div class="table-head-content">
        
      </div>
    </div>
    <div
      class="document-content"
      v-if="this.userItemID == 2 && this.isAdmin == true"
    >
      <h1>Hello doc</h1>
    </div>
    <div
      class="statistic-content"
      v-if="this.userItemID == 3 && this.isAdmin == true"
    >
      <h1>Hello Statistics</h1>
    </div>
  </div>
</template>

<script>
import MyButton from "../UI/MyButton.vue";
import MyInput from "../UI/MyInput.vue";
export default {
  components: { MyInput, MyButton },
  props: {
    userItemID: {
      type: Number,
      default: 1,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
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
}

@media screen and (max-width: 430px) {
  .welcoming-image {
    height: 130px;
  }
}

</style>
<template>
  <div class="container-auth">
    <div class="back-to-main-page">
      <img src="@/assets/arrow-left.svg" />
      <a href="#">На главную</a>
    </div>
    <div class="right-side-block">
      <div class="right-side-block-items">
        <div v-if="this.isElVisible">
          <div class="registration-block">
            <h3 class="right-side-block-title">Welcome</h3>
            <div class="input-registration-block">
              <my-input
                :placeholderValue="'Имя'"
                id="firstNameField"
                @input="form.name = $event.target.value"
                v-bind:value="form.name"
              ></my-input>
              <span class="text-danger" v-if="errors.name">
                {{ errors.name[0] }}
              </span>
              <my-input
                :placeholderValue="'Фамилия'"
                id="lastNameField"
              ></my-input>
              <my-input
                :placeholderValue="'Номер телефона'"
                id="numberField"
              ></my-input>
              <my-input
                :placeholderValue="'Почта'"
                id="emailField"
                @input="form.email = $event.target.value"
                v-bind:value="form.email"
              ></my-input>
              <span class="text-danger" v-if="errors.email">
                {{ errors.email[0] }}
              </span>
              <my-input
                :placeholderValue="'Пароль'"
                id="passwordField"
                @input="form.password = $event.target.value"
                v-bind:value="form.password"
              ></my-input>
              <span class="text-danger" v-if="errors.password">
                {{ errors.password[0] }}
              </span>
              <my-input
                :placeholderValue="'Повторите пароль'"
                id="passwordField"
                @input="form.password_confirmation = $event.target.value"
                v-bind:value="form.password_confirmation"
              ></my-input>
              <span class="text-danger" v-if="errors.password_confirmation">
                {{ errors.password_confirmation[0] }}
              </span>
            </div>
            <div class="checkbox-registr">
              <my-check-box></my-check-box>
              <p>Я соглашаюсь с пользовательским соглашением</p>
            </div>
            <div class="input-registration-block-button">
              <my-button
                class="btn-registration-in-reg"
                @click.prevent="register"
                >Зарегестрироваться</my-button
              >
              <my-button class="btn-log-in-reg" @click="toggleElement"
                >Вход</my-button
              >
            </div>
          </div>
        </div>
        <div v-else >
          <div class="block-log-in">
            <h3 class="right-side-block-title">Welcome</h3>
            <div class="input-registration-block">
              <my-input
                :placeholderValue="'Логин'"
                id="passwordField"
                @input="loginform.email = $event.target.value"
                v-bind:value="loginform.email"
              ></my-input>
              <my-input
                :placeholderValue="'Пароль'"
                id="passwordField"
                @input="loginform.password = $event.target.value"
                v-bind:value="loginform.password"
              ></my-input>
            </div>
            <div class="checkbox-registr">
              <my-check-box></my-check-box>
              <p>Запомнить меня</p>
            </div>
            <div class="input-registration-block-button">
              <my-button class="btn-log-in" @click.prevent="login"
                >Войти</my-button
              >
              <my-button class="btn-registration" @click="toggleElement"
                >Регистрация</my-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyCheckBox from "@/components/UI/MyCheckBox.vue";
import User from "@/apis/User";

export default {
  components: {
    MyInput,
    MyButton,
    MyCheckBox,
    User,
  },
  props: {
    isRegistration: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],

      loginform: {
        email: "",
        password: "",
      },

      isElVisible: this.isRegistration,
    };
  },
  methods: {
    toggleElement() {
      this.isElVisible = !this.isElVisible;
      console.log(this.isRegistration);
    },

    register() {
      User.register(this.form)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },

    login() {
      User.login(this.form)
        .then(() => {
          this.$root.$emit("login", true);
          localStorage.setItem("auth", "true");
          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>

<style>
.right-side-block {
  width: 25vw;
  float: right;
  text-align: center;
}
.right-side-block-title {
  font-size: 40px;
}
.input-registration-block {
  text-align: center;
}
.input-registration-block input {
  width: 300px;
  height: 45px;
  margin-top: 20px;
  text-align: left;
}
.input-registration-block-button button {
  width: 300px;
  height: 45px;
  border-radius: 5px;
  margin-top: 20px;
}
.checkbox-registr input {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  display: inline-block;
}
.checkbox-registr {
  margin-top: 20px;
  text-align: center;
  width: 300px;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.checkbox-registr p {
  display: inline-block;
  width: 270px;
  text-align: left;
  vertical-align: top;
}
.input-registration-block-button .btn-registration {
  background-color: #2657b1;
}
.input-registration-block-button .btn-registration-in-reg {
  background-color: #2657b1;
}
.btn-log-in-reg {
  background-color: #4599f5;
}
.block-log-in {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.registration-block {
  padding-top: 20px;
}
@media screen and (max-width: 1240px) {
  .right-side-block {
    width: 30vw;
  }
}
@media screen and (max-width: 1024px) {
  .right-side-block {
    width: 40vw;
  }
}
@media screen and (max-width: 770px) {
  .right-side-block {
    width: 50vw;
  }
}
@media screen and (max-width: 620px) {
  .right-side-block {
    width: 100vw;
    float: none;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
  .container-auth {
    width: 100vw;
    height: 100vh;
    background: url("../../assets/background-regist.png") no-repeat;
    background-size: cover;
  }
  .right-side-block-title {
    color: white;
  }
  .checkbox-registr p {
    color: white;
  }
}
@media screen and (max-width: 310px) {
  .input-registration-block-button button {
    width: 250px;
  }
  .input-registration-block input {
    width: 250px;
  }
}
@media screen and (max-height: 641px) {
  .right-side-block-title {
    font-size: 25px;
  }
  .input-registration-block input {
    margin-top: 10px;
  }
  .input-registration-block-button button {
    margin-top: 10px;
  }
  .checkbox-registr {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
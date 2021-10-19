<template>
  <div class="right-side-block">
    <div class="right-side-block-items">
     <h3 class="right-side-block-title">Welcome</h3>
    <template v-if="isElVisible">
     <div class="input-registration-block">
       <my-input :placeholderValue="'Имя'" id="firstNameField"></my-input>
       <my-input :placeholderValue="'Фамилия'" id="lastNameField"></my-input>
       <my-input :placeholderValue="'Номер'" id="numberField"></my-input>
       <my-input :placeholderValue="'Почта'" id="emailField"></my-input>
       <my-input :placeholderValue="'Дата рождения'" id="dataField"></my-input>
       <my-input :placeholderValue="'Пароль'" id="passwordField"></my-input>
      </div>
      <div class="checkbox-registr">
          <p><my-check-box></my-check-box>Я соглашаюсь с пользовательским соглашением</p>
      </div>
      <div class="input-regustration-block-button">
        <my-button class="btn-registration-in-reg">Зарегестрироваться</my-button>
        <my-button class="btn-log-in-reg" @click="togggleElement">Вход</my-button>
      </div>
    </template>
 
    <template v-else>
     <div class="input-registration-block">
       <my-input :placeholderValue="'Логин'" id="passwordField"></my-input>
       <my-input :placeholderValue="'Пароль'" id="passwordField"></my-input>
      </div>
      <div class="checkbox-registr">
          <p><my-check-box></my-check-box>Запомнить меня</p>
      </div>
      <div class="input-regustration-block-button">
        <my-button class="btn-log-in">Войти</my-button>
        <my-button class="btn-registration" @click="togggleElement">Регистрация</my-button>
      </div>
    </template>
    </div>
  </div>
</template>
<script>
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MyCheckBox from '@/components/UI/MyCheckBox.vue';


export default {
  components: {
    MyInput,
    MyButton,
    MyCheckBox,
  },
  data: () => {
      return {
          isElVisible: false
      }
  },
  methods: {
      togggleElement() {
          this.isElVisible = !this.isElVisible
      }
  }

};
</script>

<style>
.right-side-block{
    padding-top: 80px;
    width: 25vw;
    float: right;
    text-align: center;
}
.right-side-block-title{
    font-size: 40px;
}
.input-registration-block{
    text-align: center; 
}
.input-registration-block input{
    width: 300px;
    height: 45px;
    margin-top:20px;
    text-align: left;
}
.input-regustration-block-button button{
    width: 300px;
    height: 45px;
    border-radius: 5px;
    margin-top: 20px;
}
.checkbox-registr input{
    width: 15px;
    height: 15px;
    margin-right:5px ;
}
.checkbox-registr{
    margin-top: 20px;
    text-align: center;
}
.checkbox-registr p{
    margin-top: 20px;
}
.input-regustration-block-button .btn-registration{
   background-color: #2657B1;
}
.input-regustration-block-button .btn-registration-in-reg{
  background-color: #2657B1;  
}
.btn-log-in-reg {
    background-color: #4599F5;
}
</style>
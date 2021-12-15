<template>
  <div
    class="manager-user-content"
    v-if="this.userItemID == 1 && this.userRole == 'Manager'"
  >
    <div class="all-manager-users" v-if="!isDetaileView && !isAddActive">
      <div class="users-head-content">
        <h2>Клиенты</h2>
      </div>
      <div class="filter-panel">
        <div class="filter-search">
          <my-select
            :arrData="testArr"
            :plug="'Все'"
            id="filter-select"
          ></my-select>
          <my-input :placeholderValue="'Поиск'" id="nameField"></my-input>
        </div>
        <div class="right-sort">
          <my-select
            class="sort-button"
            :arrData="rightFilterArr"
            :plug="'Фильтр'"
            id="sort-select"
          ></my-select>
        </div>
      </div>
      <my-grid>
        <my-grid-item
          class="grid-item users-item"
          v-for="users in usersArray"
          :key="users"
          @click="this.deteiledManagerUsersView(users.userId), this.getCarsUser()"
        >
          <div class="user-head">
            <h3>{{ users.name + " " + users.surname }}</h3>
          </div>
          <div class="user-content-list">
            <ul>
              <li>Email: {{ users.email }}</li>
              <li>Номер телефона: {{ users.phone }}</li>
              <li>Дата рождения: {{ users.birthday }}</li>
            </ul>
          </div>
        </my-grid-item>
        <my-grid-item class="grid-item add-new-car" @click="addUserModal()">
          <div class="circle-block">
            <img src="@/assets/addIcon.png" alt="" />
          </div>
        </my-grid-item>
      </my-grid>
    </div>
    <!-- Детальный просмотр пользователя -->
    <div class="detailed-user-content" v-if="isDetaileView && !isAddActive">
      <div class="close-detailed-contenet" @click="closeDetailedView()">
        <img src="@/assets/closeCrossIcon.png" alt="" />
      </div>
      <h2>
        {{ viewDetailedUserObj.name + " " + viewDetailedUserObj.surname }}
      </h2>
      <div class="head-user-detailed-info">
        <h2>Информация о пользователе</h2>
      </div>
      <div class="user-info-table">
        <div
          class="user-info-line"
          v-for="(value, property) in viewDetailedUserObj"
          :key="property"
        >
          <div class="user-info-line-inner">
            <p class="characteristic-name">{{ property }}</p>
            <!-- <p class="characteristic-value" v-if="property != 'services'">
              {{ value }}
            </p> -->
            <input
              class="user-characteristic-input"
              :type="property != 'birthDate' ? 'text' : 'date'"
              :value="this.viewDetailedUserObj[property]"
              @change="this.viewDetailedUserObj[property] = $event.target.value"
            />
          </div>
        </div>
      </div>
      <div class="manager-user-car-list">
        <my-grid>
          <my-grid-item
            class="grid-item car-item"
            v-for="car in userCars"
            :key="car"
          >
            <div class="delete-car-button" @click="this.dropCars(car.carId)">
              <img src="@/assets/closeCrossIcon.png" alt="" />
            </div>
            <div class="car-image-block">
              <img :src="require('@/assets/' + car.image)" alt="" />
            </div>
            <div class="car-name">
              <p>{{ car.brand + " " + car.model }}</p>
            </div>
          </my-grid-item>
          <my-grid-item
            class="grid-item detailed-add-new-car"
            @click="addCarView()"
          >
            <div class="circle-block">
              <img src="@/assets/addIcon.png" alt="" />
            </div>
          </my-grid-item>
        </my-grid>
      </div>
      <div class="block-save-btn">
        <my-button
          class="save-detail-user-data-btn"
          @click.prevent="updateUserItem()"
          >Сохранить</my-button
        >
      </div>
    </div>

    <!-- Добавление пользователя -->

    <div class="add-car" v-if="isUserModalOpen">
      <my-modal class="user-modal" @close="closeModal()">
        <div class="add-user-modal">
          <h2 class="user-modal-head">Добавление пользователя</h2>
          <my-input
            v-bind:value="name"
            @input="name = $event.target.value"
            :placeholderValue="'Имя'"
            class="add-user-input"
          ></my-input>
          <my-input
            v-bind:value="surname"
            @input="surname = $event.target.value"
            :placeholderValue="'Фамилия'"
            class="add-user-input"
          ></my-input>
          <my-input
            v-bind:value="phoneNumber"
            @input="phoneNumber = $event.target.value"
            :placeholderValue="'Номер телефона'"
            class="add-user-input"
          ></my-input>
          <my-input
            v-bind:value="email"
            @input="email = $event.target.value"
            :placeholderValue="'Почта'"
            class="add-user-input"
          ></my-input>
          <div class="block-add-btn">
            <my-button class="add-user-button" @click="this.addUserToSystem()">Зарегистрировать</my-button>
          </div>
        </div>
      </my-modal>
    </div>

    <!-- Добавление транспорта пользователя -->
    <div class="add-car" v-if="isAddActive">
      <div class="close-detailed-contenet" @click="closeAddView()">
        <img src="@/assets/closeCrossIcon.png" alt="" />
      </div>
      <div class="add-car-header">
        <h2>Добавление транспорта</h2>
      </div>
      <div class="add-car-info">
        <div class="add-image-car-model">
          <img :src="require('@/assets/' + this.addCarObj.image)" alt="" />
        </div>
       
        <div class="car-info-table">
          <div
            class="car-info-line"
            v-for="(value, property) in addCarObj"
            :key="property"
          >
            <div
              class="car-info-line-inner"
              v-if="property != 'carId' && property != 'image'"
            >
              <p class="characteristic-name">{{ property }}</p>
              <!-- <p class="characteristic-value">{{ value }}</p> -->
              <my-input 
              @input="addCarObj[property] = $event.target.value"
              :value="addCarObj[property]"
              ></my-input>
            </div>
          </div>
        </div>

        <div class="add-car-button-block">
          <my-button class="add-car-button" @click="this.addNewCars()">Добавить транспорт</my-button>
        </div>
      </div>
    </div>
  </div>
  <!-- Записи -->
  <div
    class="manager-note-content"
    v-if="this.userItemID == 2 && this.userRole == 'Manager'"
  >
    <h1>Manager Hello note</h1>
  </div>
  <!-- Скидки -->
  <div
    class="manager-discount-content"
    v-if="this.userItemID == 3 && this.userRole == 'Manager'"
  >
    <div class="manager-discount-head-content">
      <h2>Скидки</h2>
    </div>

    <my-grid>
      <my-grid-item
        class="grid-item manager-discount-card"
        v-for="discount in managerDiscounts"
        :key="discount"
      >
        <div class="delete-manager-discount-button" @click="this.deleteDiscount(discount.discountsId)">
          <img src="@/assets/crossIcon.png" alt="" />
        </div>
        <div class="manager-discount-card-head">
          <h3>Станция - {{ discount.stationName }}</h3>
        </div>
        <div class="discount-content">
          <div class="percent">
            <p>{{ discount.percent }}%</p>
          </div>
          <div class="date-limit">
            <!-- <p>Действует от: {{ discount.activeCount }} покупок</p> -->
            <p>Действует до: {{ discount.date }}</p>
          </div>
        </div>
      </my-grid-item>
      <my-grid-item class="grid-item add-new-car" @click="closeDiscountModal()">
        <div class="circle-block">
          <img src="@/assets/addIcon.png" alt="" />
        </div>
      </my-grid-item>
    </my-grid>
  </div>
  <!-- Добавление скидки -->
  <div class="add-car" v-if="isDiscountModalOpen">
    <my-modal @close="closeDiscountModal()">
      <div class="add-user-modal">
        <h2 class="user-modal-head">Добавление скидки</h2>
        <my-input
        v-bind:value="precent"
            @input="precent = $event.target.value"
          :placeholderValue="'Процент'"
          class="add-discount-input"
        ></my-input>
        <my-input
        v-bind:value="discountLimit"
            @input="discountLimit = $event.target.value"
          :placeholderValue="'Лимит действия'"
          class="add-discount-input"
        ></my-input>
        <my-input
        v-bind:value="endDate"
            @input="endDate = $event.target.value"
          type="date"
          :placeholderValue="'Дата окончания'"
          class="add-discount-input"
        ></my-input>
        <div class="block-add-btn">
          <my-button class="add-discount-button" @click="addDiscount()">Добавить скидку</my-button>
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
import User from "@/apis/User";
import MyButton from "../UI/MyButton.vue";
import Cars from "@/apis/Cars";
import Discount from "@/apis/Discounts";
import Station from "@/apis/Station";
import MySelect from '../UI/MySelect.vue';

export default {
  props: {
    userItemID: {
      type: Number,
      default: 1,
    },
    userRole: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rightFilterArr: ["По алфавиту"],
      testArr: ["dsadadasd"],
      userId: "",
      modelData: ["Model S", "Model X"],
      brandData: ["Tesla"],
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      station: '',
      precent: '',
      discountLimit: '',
      endDate: '',
      isDetaileView: false,
      isAddActive: false,
      isUserModalOpen: false,
      isDiscountModalOpen: false,
      editObj: {},
      addCarObj: {
        carID: 0,
        image: "carPrototype.png",
        brand: "",
        model: "",
        year: "",
        type: "",
        nomera: "",
      },
      
      
      userCars: this.getCarsUser(),
      //  [
      //   {
      //     carID: 12,
      //     image: "carTest1.png",
      //     brand: "Tesla",
      //     model: "Model S",
      //     year: "2017",
      //     type: "Седан",
      //     power: "200лс",
      //     maxSpeed: 200,
      //     racingTime: 4,
      //   },
      //   {
      //     carID: 132,
      //     image: "carTest2.png",
      //     brand: "Tesla",
      //     model: "Model X",
      //     year: "2020",
      //     type: "Седан",
      //     power: "300лс",
      //     maxSpeed: 250,
      //     racingTime: 3,
      //   },
      //   {
      //     carID: 132,
      //     image: "carTest2.png",
      //     brand: "Tesla",
      //     model: "Model X",
      //     year: "2020",
      //     type: "Седан",
      //     power: "300лс",
      //     maxSpeed: 250,
      //     racingTime: 3,
      //   },
      // ],
      allCars: [
        {
          carID: 12,
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
          carID: 132,
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
      usersArray: this.getUser(),
      managerDiscounts: this.getDiscountManager(),
    };
  },
  methods: {
    async deleteDiscount(discount){
      let ObjDiscountDelete = {
        discountId: discount,
      };
      await Discount.deleteDiscount(ObjDiscountDelete);
      this.getDiscountManager();
    },
    async addDiscount(){
      let addDiscountObj = {
        stationId: this.user.stationId,
        date: this.endDate,
        percent: this.precent,
        restrictions: this.discountLimit
      };
      
      await Discount.addDiscount(addDiscountObj);
      this.closeDiscountModal();
      this.getDiscountManager();

    },
    async getDiscountManager(){
      await Discount.getDiscountManager(this.user.stationId).then(response => {
      this.managerDiscounts = response.data;
     });
      
    },
    dropCars(idCars){
      let ObjDelete = {
        idCars: idCars,
      };
       Cars.deleteCars(ObjDelete);
       this.getCarsUser();  
    },
    async addNewCars(){
      let newCar = {
        brand: this.addCarObj.brand,
        model: this.addCarObj.model,
        userId: this.viewDetailedUserObj.userId,
        year: this.addCarObj.year,
        type: this.addCarObj.type,
        image: this.addCarObj.image,
        nomera: this.addCarObj.nomera,
      };
      await Cars.addCarsUser(newCar);
      this.closeAddView();
      this.getCarsUser();
      
    },
    async getCarsUser(){
      let userIdObj = this.viewDetailedUserObj.userId;
      await Cars.getUserCars(userIdObj).then(response => {
      this.userCars = response.data;
      
     });  
    },
    async addUserToSystem(){
      let userObj = {
        name: this.name,
        surname: this.surname,
        phone: this.phoneNumber,
        email: this.email,
        user_role: "User",
        password: "12345678",
        password_confirmation: "12345678",
        birthday: "0",
      };
      await User.addUserManager(userObj);
      this.closeModal();
      this.getUser();
    },
    async updateUserItem() {
      await User.updateUserListItem(this.viewDetailedUserObj);
      this.closeDetailedView();
    },
    async getUser() {
      await User.getUserList().then((response) => {
        this.usersArray = response.data;
      });
    },
    deteiledManagerUsersView(userObjID) {
      this.viewDetailedUserObj = this.findUserObj(userObjID);
      // this.userId = userObjID;
      this.closeDetailedView();
    },
    findUserObj(id) {
      let resUserObj;
      this.usersArray.forEach((element) => {
        if (element.userId == id) {
          resUserObj = element;
        }
      });
      return resUserObj;
    },
    findUserName(userObjID) {
      let resUserObj;
      this.usersArray.forEach((element) => {
        if (element.email == userObjID) {
          resUserObj = element.userName + " " + element.userSurname;
        }
      });
      return resUserObj;
    },
    addUserModal() {
      this.closeModal();
    },
    addDiscountModal() {
      this.closeDiscountModal();
    },
    closeDiscountModal() {
      this.isDiscountModalOpen = !this.isDiscountModalOpen;
    },
    closeModal() {
      this.isUserModalOpen = !this.isUserModalOpen;
    },
    addCarView() {
      this.closeAddView();
    },
    closeAddView() {
      this.isAddActive = !this.isAddActive;
      this.clearAddCarArray();
    },
    getCarInfo($event, id) {
      if (id == 1) {
        this.selectBrandValue = $event.target.value;
        if (this.selectBrandValue == "Бренд") {
          this.clearAddCarArray();
          document.getElementById("user-model-select").selectedIndex = 0;
        }
      } else {
        this.selectModelValue = $event.target.value;
        if (this.selectModelValue == "Модель") {
          this.clearModelCar();
        }
      }
      if (this.selectBrandValue != "" && this.selectModelValue != "") {
        this.getCarArray();
      }
    },
    getCarArray() {
      for (let i = 0; i < this.allCars.length; i++) {
        if (
          this.allCars[i].brand == this.selectBrandValue &&
          this.allCars[i].model == this.selectModelValue
        ) {
          this.addCarObj = this.allCars[i];
        }
      }
    },
    clearAddCarArray() {
      this.addCarObj = {
        image: "carPrototype.png",
        brand: "",
        model: "",
        year: "",
        type: "",
        nomera: "",
      };
      this.selectBrandValue = "";
      this.selectModelValue = "";
    },
    clearModelCar() {
      this.addCarObj = {
        image: "carPrototype.png",
        brand: "",
        model: "",
        year: "",
        type: "",
        nomera: "",
      };
      this.selectModelValue = "";
    },
    closeDetailedView() {
      this.isDetaileView = !this.isDetaileView;
    },
  },
};
</script>

<style scoped>
.block-save-btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.users-head-content h2 {
  text-align: center;
  margin-bottom: 24px;
}
.filter-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.filter-panel select {
  flex-basis: 15%;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.filter-search {
  width: 80%;
  display: flex;
}
.filter-search select {
  margin-right: 20px;
}
.filter-search input {
  flex-basis: 65%;
  height: auto;
  text-align: left;
  padding-left: 10px;
  border-radius: 20px;
}
.users-item {
  position: relative;
  cursor: pointer;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  padding: 15px;
  color: #3e3e3e;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  background: #ffd15a;
  min-height: 158px;
}
.user-head {
  margin-bottom: 20px;
}
.user-content-list ul {
  color: #625e5e;
  list-style-type: none;
}
.add-new-car,
.detailed-add-new-car {
  position: relative;
  cursor: pointer;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  background: #ededed;
  transition: 0.5s;
  padding: 78px;
}
.add-new-car:hover {
  -webkit-box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
}
.circle-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #bfbfbf;
  background: #fff;
}

.circle-block img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Добавление пользователя */
.block-add-btn {
  display: flex;
  justify-content: center;
}
.user-modal .modal-window {
  height: auto;
}
.user-modal-head {
  font-size: 20px;
  margin: 0 0 15px 0;
  text-align: center;
}

.add-user-input {
  width: 100%;
  margin: 0 0 20px 0;
}

/* Подробный просмотр пользователей */

.detailed-user-content {
  position: relative;
}
.close-detailed-contenet {
  position: absolute;
  top: -4px;
  right: 0px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 3;
}

.close-detailed-contenet img {
  max-width: 100%;
  max-height: 100%;
}
.head-user-detailed-info {
  padding: 15px 0;
  text-align: center;
  font-size: 14px;
}
.user-info-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 30px;
}
.user-info-table .user-info-line p {
  font-size: 12px;
  font-weight: bold;
}
.user-info-table .user-info-line input {
  font-size: 12px;
}

.user-info-line:nth-child(2n + 1),
.user-info-line:nth-child(2n + 1) input {
  background: #c4c4c4;
}
.user-info-line-inner {
  width: 100%;
  display: flex;
  padding: 10px 40px;
  justify-content: space-between;
}
.user-characteristic-input {
  background: #fff;
  border: none;
  text-align: right;
  outline: none;
}
.manager-user-car-list {
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #625e5e;
  background: #f1f1f1;
  min-height: 400px;
}
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
  position: relative;
}
.delete-car-button {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid gray;
  background: white;
  padding: 3px;
  opacity: 0;
  transition: opacity 0.3s;
}
.delete-car-button img {
  max-width: 100%;
  max-height: 100%;
}
.car-item:hover .delete-car-button {
  opacity: 1;
  transition: opacity 0.3s;
}
.car-image-block {
  width: 150px;
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
.car-item,
.detailed-add-new-car {
  flex-basis: calc((100% - 60px) / 4);
  background: #fff;
}
.car-item:nth-child(3n + 3) {
  margin-right: 20px;
}
.car-item:nth-child(4n + 4) {
  margin-right: 0;
}
.detailed-add-new-car {
  margin-right: 0;
}

/* Добавление машины */
.add-car {
  position: relative;
}
.add-car-header {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
}
.add-car-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-image-car-model {
  width: 400px;
  height: 250px;
}

.add-image-car-model img {
  max-width: 100%;
  max-height: 100%;
}
.main-add-selectors {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.main-add-selectors select {
  border: none;
  text-align: center;
  width: 20%;
  background: #c4c4c4;
}
.car-info-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.car-info-table .car-info-line:nth-child(2n + 1) {
  background: #c4c4c4;
}
.car-info-line-inner {
  width: 100%;
  display: flex;
  padding: 10px 40px;
  justify-content: space-between;
}
.car-info-table .car-info-line p {
  font-size: 12px;
  font-weight: bold;
}

/* Скидки менеджера */
.delete-manager-discount-button {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
}
.delete-manager-discount-button img {
  max-width: 100%;
  max-height: 100%;
}
.manager-discount-head-content {
  text-align: center;
  margin-bottom: 20px;
}
.manager-discount-card {
  background: #ffd15a;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  padding: 15px;
  color: #3e3e3e;
  position: relative;
  min-height: 158px;
}
.manager-discount-card .manager-discount-card-head {
  margin-bottom: 68px;
  font-size: 14px;
}
.manager-discount-card .discount-content {
  display: flex;
  justify-content: space-between;
}
.discount-content .percent p {
  font-size: 36px;
  color: #fff;
  font-weight: bold;
}
.percent {
  width: 80px;
}
.date-limit {
  flex-direction: column;
}
.date-limit p {
  margin-bottom: 5px;
}

.discount-content .date-limit {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  text-align: right;
}
/* Добавление скидки */
.add-discount-input {
  width: 100%;
  margin: 0 0 20px 0;
}

@media screen and (max-width: 1000px) {
  .car-item,
  .detailed-add-new-car {
    flex-basis: calc((100% - 40px) / 3);
    background: #fff;
  }
  .car-item:nth-child(3n + 3) {
    margin-right: 0;
  }
  .car-item:nth-child(4n + 4) {
    margin-right: 20px;
  }
}

@media screen and (max-width: 850px) {
  .filter-panel {
    flex-direction: column;
  }
  .filter-search {
    margin-bottom: 10px;
    width: 100%;
    justify-content: space-between;
  }
  .filter-search select,
  .filter-search input {
    flex-basis: 48%;
    margin-right: 0;
  }
  .right-sort select {
    margin-right: 0;
  }

  .car-item,
  .detailed-add-new-car {
    flex-basis: calc((100% - 20px) / 2);
    background: #fff;
  }
  .car-item:nth-child(3n + 3) {
    margin-right: 20px;
  }
  .car-item:nth-child(4n + 4) {
    margin-right: 0;
  }

  .add-car-header {
    font-size: 12px;
  }
  /* Добаление транспорта пользователя */
  .main-add-selectors select {
    flex-basis: 40%;
  }
}
@media screen and (max-width: 600px) {
  /* Добавление транспорта пользователя */
  .add-image-car-model {
    width: 100%;
    height: auto;
  }
  /* Скидки менеджера */
  .discount-content .percent p {
    font-size: 32px;
  }

  .discount-content .date-limit p {
    font-size: 12px;
  }

  .manager-discount-card-head h3 {
    font-size: 15px;
  }
  /* Транспорт пользователя детальней */

  .image-car-model {
    width: 100%;
  }
}
@media screen and (max-width: 565px) {
  .delete-manager-discount-button {
    width: 20px;
    height: 20px;
  }
}
@media screen and (max-width: 540px) {
  .detailed-user-content h2 {
    font-size: 16px;
  }
  .head-user-detailed-info h2 {
    font-size: 14px;
  }
  .car-item,
  .detailed-add-new-car {
    flex-basis: 100%;
  }
  .car-item {
    margin-right: 0px;
  }
  .car-item:nth-child(3n + 3) {
    margin-right: 0;
  }
}

@media screen and (max-width: 450px) {
  /* Просмотр клиентов */
  .filter-search {
    flex-direction: column;
  }
  .filter-search select {
    margin-right: 0;
    margin-bottom: 10px;
  }
  .filter-panel select {
    width: 100%;
  }
  .filter-search input {
    padding: 11px 10px;
  }

  .users-item .user-head {
    font-size: 14px;
  }

  .users-item .user-content-list li {
    font-size: 14px;
  }

  .users-head-content h2 {
    font-size: 20px;
  }

  /* Детальный просмотр клиента */
  .user-info-table .user-info-line input {
    width: 80px;
  }
}

@media screen and (max-width: 430px) {
  .add-car-header {
    font-size: 10px;
    text-align: left;
  }
  .main-add-selectors {
    flex-direction: column;
  }
  .main-add-selectors select {
    width: 100%;
    margin-bottom: 10px;
  }
  .car-info-line .car-info-line-inner {
    padding: 10px 20px;
  }
  .add-car-button-block {
    width: 100%;
  }
  .add-car-button-block button {
    padding: 15px 20px !important;
    width: 100% !important;
    font-size: 12px !important;
  }
  /* Детальный просмотр клиента */
  .user-info-line .user-info-line-inner {
    padding: 10px 20px;
  }
}
</style>
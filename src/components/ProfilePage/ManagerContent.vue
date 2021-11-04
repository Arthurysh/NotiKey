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
          v-for="user in usersArray"
          :key="user"
          @click="this.deteiledManagerUsersView(user.email)"
        >
          <div class="user-head">
            <h3>{{ user.userName + " "+ user.userSurname }}</h3>
          </div>
          <div class="user-content-list">
            <ul>
              <li>Email: {{ user.email }}</li>
              <li>Номер телефона: {{ user.phoneNumber }}</li>
              <li>Дата рождения: {{ user.birthDate }}</li>
            </ul>
          </div>
        </my-grid-item>
        <my-grid-item class="grid-item add-new-car">
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
      <h2>{{findUserName(this.userId)}}</h2>
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
            <p class="characteristic-value" v-if="property != 'services'">
              {{ value }}
            </p>
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
            <div class="delete-car-button">
              <img src="@/assets/closeCrossIcon.png" alt="">
            </div>
              <div class="car-image-block">
                <img :src="require('@/assets/' + car.image)" alt="" />
              </div>
              <div class="car-name">
                <p>{{ car.brand + " " + car.model }}</p>
              </div>
            </my-grid-item>
            <my-grid-item class="grid-item detailed-add-new-car" @click="addCarView()">
              <div class="circle-block">
                <img src="@/assets/addIcon.png" alt="" />
              </div>
            </my-grid-item>
          </my-grid>
      </div>
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
        <div class="main-add-selectors">
          <my-select
            class="choose-brand-button"
            :arrData="brandData"
            :plug="'Бренд'"
            id="brend-select"
            @change="getCarInfo($event, 1)"
          ></my-select>
          <my-select
            class="choose-model-button"
            :arrData="modelData"
            :plug="'Модель'"
            id="user-model-select"
            @change="getCarInfo($event, 2)"
          ></my-select>
        </div>
        <div class="car-info-table">
          <div
            class="car-info-line"
            v-for="(value, property) in addCarObj"
            :key="property"
          >
            <div
              class="car-info-line-inner"
              v-if="property != 'carID' && property != 'image'"
            >
              <p class="characteristic-name">{{ property }}</p>
              <p class="characteristic-value">{{ value }}</p>
            </div>
          </div>
        </div>

        <div class="add-car-button-block">
          <my-button class="add-car-button">Добавить транспорт</my-button>
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
    <h1>Manager Hello discount</h1>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      rightFilterArr: ["По алфавиту"],
      testArr: ["dsadadasd"],
      userId: "",
      modelData: ["Model S", "Model X"],
      brandData: ["Tesla"],
      isDetaileView: false,
      isAddActive: false,
      addCarObj: {
        carID: 0,
        image: "carPrototype.png",
        brand: "-",
        model: "-",
        year: "-",
        type: "-",
        power: "-",
        maxSpeed: 0,
        racingTime: 0,
      },
      userCars: [
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
      usersArray: [
        {
          userName: "Алексей",
          userSurname: "Трофименко",
          phoneNumber: "+38093453453",
          email: "alex222@gmail.com",
          birthDate: "19.07.2001 ",
        },
        {
          userName: "Алексей",
          userSurname: "Трофименко",
          phoneNumber: "+38093453453",
          email: "alex222@gmail.com",
          birthDate: "19.07.2001 ",
        },
      ],
    };
  },
  methods: {
    deteiledManagerUsersView(userObjID) {
      this.viewDetailedUserObj = this.findUserObj(userObjID);
      this.userId = userObjID;
      this.closeDetailedView();
    },
    findUserObj(id) {
      let resUserObj;
      this.usersArray.forEach((element) => {
        if (element.email == id) {
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
        carID: 0,
        image: "carPrototype.png",
        brand: "-",
        model: "-",
        year: "-",
        type: "-",
        power: "-",
        maxSpeed: 0,
        racingTime: 0,
      };
      this.selectBrandValue = "";
      this.selectModelValue = "";
    },
    clearModelCar() {
      this.addCarObj = {
        carID: 0,
        image: "carPrototype.png",
        brand: "-",
        model: "-",
        year: "-",
        type: "-",
        power: "-",
        maxSpeed: 0,
        racingTime: 0,
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
  margin-right: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
.filter-search {
  width: 80%;
  display: flex;
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
}
.user-head {
  margin-bottom: 10px;
}
.user-content-list ul {
  color: #625e5e;
  list-style-type: none;
}
.add-new-car, .detailed-add-new-car {
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
.user-info-line:nth-child(2n + 1) {
  background: #c4c4c4;
}
.user-info-line-inner {
  width: 100%;
  display: flex;
  padding: 10px 40px;
  justify-content: space-between;
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
.delete-car-button  img{
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
.car-item, .detailed-add-new-car {
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
@media screen and (max-width: 850px) {
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
  /* Транспорт пользователя детальней */

  .image-car-model {
    width: 100%;
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
}
</style>
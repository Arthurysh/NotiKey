<template>
  <!-- Профиль пользователя -->
  <div
    class="profile-info"
    v-if="this.userItemID == 1 && this.userRole == 'User'"
  >
    <div class="welcoming-image">
      <p class="welcoming-user-text" v-if="user">Hello, {{ user.name }} </p>
    </div>
    <div class="user-info">
      <div class="head-item">Профиль</div>
      <div class="user-fields">
        <div class="input-user-wrap">
          <my-input
            :placeholderValue="Name"
            id="nameField"
            @input="UserUpdate.name = $event.target.value"
            :value="UserUpdate.name"
          ></my-input>
          <span class="text-danger" v-if="errors.surname">
                {{ errors.name[0] }}
              </span>
        </div>
        <div class="input-user-wrap">
          <my-input
            :placeholderValue="'Фамилия'"
            id="surnameField"
            @input="UserUpdate.surname = $event.target.value"
            :value="UserUpdate.surname"
          ></my-input>
          <span class="text-danger" v-if="errors.surname">
                {{ errors.surname[0] }}
              </span>
        </div>
        <div class="input-user-wrap">
          <my-input
            :placeholderValue="'Телефон'"
            id="phoneField"
            @input="UserUpdate.phone = $event.target.value"
            :value="UserUpdate.phone"
          ></my-input>
          <span class="text-danger" v-if="errors.surname">
                {{ errors.phone[0] }}
              </span>
        </div>
        <div class="input-user-wrap">
          <my-input
            :placeholderValue="'Почта'"
            id="emailField"
            @input="UserUpdate.email = $event.target.value"
            :value="UserUpdate.email"
          ></my-input>
          <span class="text-danger" v-if="errors.surname">
                {{ errors.email[0] }}
              </span>
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
            type="password"
            :placeholderValue="'Пароль'"
            id="passwordField"
            @input="UserUpdate.password = $event.target.value"
            :value="UserUpdate.password"
          ></my-input>
          <span class="text-danger" v-if="errors.surname">
                {{ errors.password[0] }}
              </span>
        </div>
        <my-button type="button" class="save-user-info is-not-active-btn" @click.prevent="updateUser"
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
    <div class="all-user-notes" v-if="!isDetaileView">
      <div class="note-head-content">
        <h2>Записи</h2>
      </div>
      <div class="filter-panel">
        <div class="filter-search">
          <my-select
            :arrData="filterData"
            :plug="'Все'"
            id="filter-select"
          ></my-select>
          <my-input :placeholderValue="'Поиск'" id="nameField"></my-input>
        </div>
        <div class="right-sort">
          <my-select
            class="sort-button"
            :arrData="filterData"
            :plug="'По возрастанию'"
            id="sort-select"
          ></my-select>
        </div>
      </div>
      <my-grid>
        <my-grid-item
          class="note-item"
          v-for="note in userNotes"
          :key="note"
          @click="deteiledNoteView(note.noteId)"
          :style="{ 'background-color': this.checkNoteStatus(note.noteId) }"
        >
          <div class="delete-note-button">
            <img src="@/assets/crossIcon.png" alt="" />
          </div>
          <div class="note-head">
            <h3>Запись {{ note.noteId }}</h3>
          </div>
          <div class="note-content-list">
            <ul>
              <li>Статус: {{ note.status }}</li>
              <li>Услуга: {{ note.service }}</li>
              <li>Машина: {{ note.car }}</li>
              <li>Станция: {{ note.station }}</li>
              <li>Дата: {{ note.date }}</li>
            </ul>
            <div class="note-time">
              {{ note.time }}
            </div>
          </div>
        </my-grid-item>
        <my-grid-item class="add-new-car">
          <div class="circle-block">
            <img src="@/assets/addIcon.png" alt="" />
          </div>
        </my-grid-item>
      </my-grid>
    </div>

    <div class="detailed-note-info" v-if="isDetaileView">
      <div class="close-detailed-contenet" @click="closeDetailedView()">
        <img src="@/assets/closeCrossIcon.png" alt="" />
      </div>
      <h3>{{ "Запись " + this.viewNoteObj.noteId }}</h3>
      <div class="deteiled-note-head">
        <h3>Информация о записи</h3>
      </div>
      <div class="note-info-table">
        <div
          class="note-info-line"
          v-for="(value, property) in viewNoteObj"
          :key="property"
        >
          <div
            class="note-info-line-inner"
            v-if="property != 'noteId' && property != 'status'"
          >
            <p class="characteristic-name">{{ property }}</p>
            <p class="characteristic-value">{{ value }}</p>
          </div>
        </div>
      </div>
      <div class="details">
        <div class="deteiled-note-status">
        <h3>Статус записи</h3>
      </div>
      <div class="deteiled-note-description">
        <ul class="details-menu">
          <li>
            <h3 class="menu-link">Детали записи</h3>
            <ul class="details-list">
              <li><p class="sub-menu-link">Осмотр - 500</p></li>
              <li><p class="sub-menu-link">Осмотр - 500</p></li>
            </ul>
          </li>
        </ul>
        <p>Рекомендованные услуги</p>
      </div>
      </div>
    </div>
  </div>
  <!-- Транспорт пользователя -->
  <div
    class="car-content"
    v-if="this.userItemID == 3 && this.userRole == 'User'"
  >
    <div class="all-user-cars" v-if="!isDetaileView">
      <div class="car-head-content user-head-content">
        <h2>Транспорт</h2>
      </div>

      <my-grid>
        <my-grid-item
          class="car-item"
          v-for="car in userCars"
          :key="car"
          @click="detailedCarView(car.carID)"
        >
          <div class="car-image-block">
            <img :src="require('@/assets/' + car.image)" alt="" />
          </div>
          <div class="car-name">
            <p>{{ car.brand + " " + car.model }}</p>
          </div>
        </my-grid-item>
        <my-grid-item class="add-new-car">
          <div class="circle-block">
            <img src="@/assets/addIcon.png" alt="" />
          </div>
        </my-grid-item>
      </my-grid>
    </div>

    <div class="detailed-car-info" v-if="isDetaileView">
      <div class="close-detailed-contenet" @click="closeDetailedView()">
        <img src="@/assets/closeCrossIcon.png" alt="" />
      </div>
      <h3>{{ this.viewCarObj.brand + " " + this.viewCarObj.model }}</h3>

      <div class="detailed-car-info-content">
        <div class="image-car-model">
          <img :src="require('@/assets/' + this.viewCarObj.image)" alt="" />
        </div>
        <div class="car-info-table">
          <div
            class="car-info-line"
            v-for="(value, property) in viewCarObj"
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

        <div class="car-control-panel">
          <my-button class="delete-car">Удалить</my-button>
        </div>
      </div>
    </div>
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
import User from "@/apis/User";
import MyButton from "../UI/MyButton.vue";
import MyGridItem from "../UI/MyGridItem.vue";
export default {
  components: { MyGridItem, MyButton },
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
  mounted() {
     User.auth().then(response => {
       this.user = response.data;
     });
  },
  data() {
    return {
      filterData: ["select1", "select2", "select3"],
      isDetaileView: false,
      viewCarObj: {},
      viewNoteObj: {},
      noteStatus: [
        {
          name: "В процессе",
          color: "#84D1FC",
        },
        {
          name: "Готов к оплате",
          color: "#C8FFAE",
        },
        {
          name: "Просрочено",
          color: "#FF9999",
        },
      ],
      userNotes: [
        {
          noteId: 1,
          status: "В процессе",
          service: "Починка двигателя",
          car: "Tesla Model S",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
        {
          noteId: 2,
          status: "Готов к оплате",
          service: "Починка двигателя",
          car: "Tesla Model R",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
        {
          noteId: 3,
          status: "Просрочено",
          service: "Починка двигателя",
          car: "Tesla Model G",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
      ],
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
      UserUpdate: {
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
      },
            errors: [],
            user: null,


    };
  },
 
  methods: {
    
    updateUser() {
      User.updateUser(this.UserUpdate)
        .then(() => {
          this.$router.push('/Profile');
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          
        })
        
    },
     
    detailedCarView(carObjID) {
      this.viewCarObj = this.findUserCar(carObjID);
      this.closeDetailedView();
    },

    findUserCar(id) {
      let userCar;
      this.userCars.forEach((element) => {
        if (element.carID == id) {
          // console.log(element);
          userCar = element;
        }
      });
      return userCar;
    },
    closeDetailedView() {
      this.isDetaileView = !this.isDetaileView;
    },
    deteiledNoteView(noteObjID) {
      this.viewNoteObj = this.findUserNote(noteObjID);
      this.closeDetailedView();
    },
    findUserNote(id) {
      let userNote;
      this.userNotes.forEach((element) => {
        if (element.noteId == id) {
          userNote = element;
        }
      });
      return userNote;
    },
    checkNoteStatus(id) {
      let userNote = this.findUserNote(id);
      let userStatusColor;
      this.noteStatus.forEach((element) => {
        if (element.name === userNote.status) {
          userStatusColor = element.color;
        }
      });
      return userStatusColor;
    },
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

.input-user-wrap input,
select {
  width: 100%;
  text-align: center;
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

/* Записи пользователя */
.delete-note-button {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
}
.delete-note-button img {
  max-width: 100%;
  max-height: 100%;
}
.note-head-content h2 {
  text-align: center;
  margin-bottom: 24px;
}
.note-content-list ul {
  color: #625e5e;
  list-style-type: none;
}
.note-item {
  position: relative;
  cursor: pointer;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  padding: 15px;
  color: #3e3e3e;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
}
.note-head {
  margin-bottom: 10px;
}
.note-time {
  font-weight: bold;
  position: absolute;
  right: 15px;
  bottom: 15px;
}
.filter-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-search {
  width: 80%;
  display: flex;
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
.filter-search input {
  flex-basis: 65%;
  height: auto;
  text-align: left;
  padding-left: 10px;
  border-radius: 20px;
}
/* Записи пользователя детальней */

.deteiled-note-head h3{
  text-align: center;
  margin-bottom: 24px;
}
.deteiled-note-head{
  margin-bottom: 10px;
}
.note-info-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.note-info-table .note-info-line:nth-child(2n + 1) {
  background: #c4c4c4;
}

.note-info-line-inner {
  width: 100%;
  display: flex;
  padding: 10px 40px;
  justify-content: space-between;
}
.note-info-table .note-info-line p {
  font-size: 12px;
  font-weight: bold;
}
.details {
  display: flex;
}
.deteiled-note-description {
  margin-left: 20px;
}
.deteiled-note-description li {
  position: relative;
  list-style: none;
}
.deteiled-note-description p{
  font-weight: bold;
  font-size: 15px;
}
.details-list {
  position: absolute;
  left: 0;
  top: 0;
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

.car-item:hover,
.add-new-car:hover {
  -webkit-box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 11px 0px rgba(34, 60, 80, 0.2);
}

.add-new-car {
  position: relative;
  cursor: pointer;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  background: #ededed;
  transition: 0.5s;
  padding: 78px;
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

/* Транспорт пользователя детальней */

.detailed-car-info-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-car-model {
  width: 400px;
  margin-bottom: 40px;
}

.image-car-model img {
  max-width: 100%;
  max-height: 100%;
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

.close-detailed-contenet {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 3;
}

.close-detailed-contenet img {
  max-width: 100%;
  max-height: 100%;
}

.delete-car {
  background: #ea7778 !important;
  border-radius: 6px !important;
  padding: 10px 30px !important;
}

.delete-car:hover {
  background: #b45658 !important;
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

@media screen and (max-width: 850px) {
  .filter-panel {
    flex-direction: column;
  }
  .filter-search {
    margin-bottom: 10px;
    width: 100%;
  }
  .filter-search select,
  input {
    flex-basis: 50%;
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

  /* Транспорт пользователя детальней */

  .image-car-model {
    width: 100%;
  }

  .detailed-car-info-content {
    margin-top: 20px;
  }
}
@media screen and (max-width: 450px) {
  .filter-search {
    flex-direction: column;
  }
  .filter-search select {
    margin-right: 0;
    margin-bottom: 10px;
  }
  .filter-search input {
    padding: 11px 10px;
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
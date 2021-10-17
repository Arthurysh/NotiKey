<template>
  <transition name="fade">
    <my-modal @close="changeModalShowStatus()" v-if="serviceModalShow">
      <div class="modal-services">
        <div class="modal-head">
          <h3>Выберите услуги</h3>
        </div>
        <div class="table-block" id="service-table">
          <div class="row row-head">
            <div class="service-field">
              <p>Услуга</p>
            </div>
            <div class="service-cost">
              <p>Стоимость</p>
            </div>
          </div>
          <div class="table-body">
            <div class="row" v-for="elem in userServices" :key="elem">
              <div class="service-field">
                <my-select
                  :arrData="arrDataForm"
                  :plug="'Выбрать услугу'"
                  id="selectDateField"
                ></my-select>
              </div>
              <div class="service-cost">
                <input type="text" readonly />
              </div>
            </div>
          </div>
        </div>
        <div class="services-control-btn-block">
          <div class="save-btn-block">
            <button class="saveUserServices">Сохранить</button>
          </div>
          <div class="control-block">
            <button @click="addServiceRow()" id="addRow">
              <img src="@/assets/plusIcon.png" alt="plus" />
            </button>
            <button id="deletRow">
              <img
                @click="deleteServiceRow()"
                src="@/assets/crossIcon.png"
                alt="cross"
              />
            </button>
          </div>
        </div>
      </div>
    </my-modal>
  </transition>
  <my-section class="note-section">
    <div class="circle-right-note" id="noteCircle1">
      <img src="@/assets/circleRightNote.png" alt="" />
    </div>
    <div class="circle-left-note" id="noteCircle2">
      <img src="@/assets/circleLeftNote.png" alt="" />
    </div>
    <div class="head-section">
      <h2>Онлайн запись</h2>
    </div>
    <div class="note-content">
      <div class="map-block" id="mapBlock">
        <GMapMap
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 100%; height: 20rem"
        >
          <GMapCluster>
            <GMapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center = m.position"
            />
          </GMapCluster>
        </GMapMap>
      </div>
      <div class="online-note-block">
        <div class="head-form">
          <h2>Форма записи</h2>
        </div>
        <div class="online-note-form">
          <form action="POST" id="onlineNote" class="note-form">
            <div class="input-wrap">
              <my-input :placeholderValue="'Имя'" id="nameField"></my-input>
            </div>
            <div class="input-wrap">
              <my-input
                :placeholderValue="'Фамилия'"
                id="surnameField"
              ></my-input>
            </div>
            <div class="input-wrap">
              <my-input
                :placeholderValue="'Телефон'"
                id="phoneField"
              ></my-input>
            </div>
            <div class="input-wrap">
              <my-input :placeholderValue="'Почта'" id="emailField"></my-input>
            </div>
            <div class="input-wrap">
              <my-select
                :arrData="arrDataForm"
                :plug="'Выбрать СТО'"
                id="selectStationField"
              ></my-select>
            </div>
            <div class="input-wrap">
              <my-select
                :arrData="arrDataForm"
                :plug="'Ваши услуги'"
                id="selectServiceField"
              ></my-select>
              <button
                type="button"
                class="select-service-btn"
                id="selectServicesBtn"
                @click="changeModalShowStatus()"
              >
                Выбрать
              </button>
            </div>
            <div class="input-wrap">
              <my-select
                :arrData="arrDataForm"
                :plug="'Выбрать время визита'"
                id="selectTimeField"
              ></my-select>
            </div>
            <div class="input-wrap">
              <my-select
                :arrData="arrDataForm"
                :plug="'Выбрать дату визита'"
                id="selectDateField"
              ></my-select>
            </div>
            <div class="input-wrap">
              <my-select
                :arrData="arrDataForm"
                :plug="'Выбрать модель'"
                id="selectModelField"
              ></my-select>
            </div>
            <div class="input-wrap">
              <my-select
                :arrData="arrDataForm"
                :plug="'Выбрать марку'"
                id="selectBrandField"
              ></my-select>
            </div>
            <div class="form-btn-block">
              <my-button type="submit" submit="#onlineNote"
                >Записаться</my-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </my-section>
</template>

<script>
import MySection from "./UI/MySection.vue";
export default {
  components: {
    MySection,
  },
  data() {
    return {
      arrDataForm: ["select1", "select2", "select3"],
      serviceModalShow: false,
      userServices: 3,
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        }, // Along list of clusters
      ],
    };
  },
  methods: {
    changeModalShowStatus() {
      this.serviceModalShow = !this.serviceModalShow;
      if (this.serviceModalShow) {
        document.getElementById("mapBlock").style.zIndex = -1;
        document.getElementById('upPageBtn').style.display = 'none';
        document.getElementById('noteCircle1').style.zIndex = -1;
        document.getElementById('noteCircle2').style.zIndex = -1;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
        setTimeout(() => {
          document.getElementById("mapBlock").style.zIndex = 1;
          document.getElementById('upPageBtn').style.display = 'block';
          document.getElementById('noteCircle1').style.zIndex = 0;
          document.getElementById('noteCircle2').style.zIndex = 0;

        }, 300);
      }
    },
    addServiceRow() {
      this.userServices++;
    },
    deleteServiceRow() {
      this.userServices--;
    },
  },
};
</script>

<style>
.note-section {
  padding: 60px 0;
}

.note-content {
  display: flex;
  justify-content: space-around;
}

.map-block {
  width: 40%;
}

.online-note-block {
  width: 40%;
}

.online-note-block .head-form {
  color: #2657b1;
  text-align: center;
  margin-bottom: 20px;
}

.note-form {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.online-note-form .input-wrap {
  flex-basis: 45%;
  margin-bottom: 20px;
}

.input-wrap input,
select {
  width: 100%;
}

.form-btn-block {
  text-align: center;
}

.form-btn-block button {
  padding: 15px 40px !important;
  font-size: 25px;
}

.input-wrap:nth-child(6) {
  display: flex;
}

.input-wrap:nth-child(6) select {
  margin-right: 5px;
}

.select-service-btn {
  border: none;
  background: #2657b1;
  color: #fff;
  font-size: 10px;
  padding: 0 15px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in;
}

.modal-head {
  margin-bottom: 20px;
}

.table-block {
  border: 1px solid gray;
  height: 200px;
  background: rgb(189, 189, 189);
  margin-bottom: 10px;
  overflow: scroll;
}

.table-block .row {
  border-bottom: 1px solid gray;
  display: flex;
}

.table-block .row select,
input {
  border: none;
  border-radius: 0;
  height: 100%;
  outline: none;
  width: 100%;
  text-align: center;
}

.service-cost,
.service-field {
  flex-basis: 50%;
}

.service-cost input {
  border-left: 1px solid gray;
}

.row-head {
  background: #fff;
}

.row-head .service-cost,
.row-head .service-field {
  padding: 4px;
  text-align: center;
}

.row-head .service-cost {
  border-left: 1px solid gray;
}

.services-control-btn-block {
  display: flex;
  justify-content: space-between;
}

.services-control-btn-block button {
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 5px;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.5s;
}

.control-block button:first-child:hover {
  background: #006be0;
}

.control-block button:last-child:hover {
  background: #bd3232;
}

.control-block button img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.control-block button:last-child img {
  width: 15px;
  height: 15px;
}

.control-block button:first-child {
  background: #4599f5;
  color: #fff;
  margin-right: 10px;
}

.control-block button:last-child {
  background: #da5252;
  color: #fff;
}

.services-control-btn-block .saveUserServices {
  width: 100px;
  background: #4599f5;
  color: #fff;
}

.saveUserServices:hover {
  background: #006be0;
}

.vue-map {
  min-height: 22rem !important;
  border: 3px solid #000;
  border-radius: 5px;
}

.circle-right-note,
.circle-left-note {
  position: absolute;
}

.circle-right-note {
  right: 40px;
}

.circle-left-note {
  left: 35px;
  transform: translate(-28deg);
}

@media screen and (min-width: 1800px) {
  .vue-map {
    min-height: 38rem !important;
  }

  .head-form {
    font-size: 25px;
  }
  .online-note-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .online-note-block .input-wrap input,
  select {
    padding: 10px 10px !important;
    font-size: 20px;
  }

  .select-service-btn {
    font-size: 20px;
  }

  .form-btn-block button {
    padding: 13px 38px;
    font-size: 20px !important;
  }
}

@media screen and (max-width: 1000px) {
  .map-block {
    width: 46%;
  }

  .online-note-block {
    width: 46%;
  }
}
@media screen and (max-width: 900px) {
  .note-content {
    flex-direction: column;
  }

  .map-block {
    width: 100%;
    margin-bottom: 25px;
  }

  .online-note-block {
    width: 100%;
  }

  .form-btn-block button {
    padding: 20px 50px !important;
    font-size: 20px !important;
  }
}

@media screen and (max-width: 610px) {
  .circle-left-note, .circle-right-note {
    display: none;
  }
}

@media screen and (max-width: 420px) {
  .note-section {
    padding: 30px 0;
  }
  .note-form {
    flex-direction: column;
  }

  .form-btn-block button {
    padding: 18px 35px !important;
    font-size: 14px !important;
  }
}
</style>
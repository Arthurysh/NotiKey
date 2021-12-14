<template>
  <!-- Профиль пользователя -->
  <div
    class="profile-info"
    v-if="this.userItemID == 1 && this.userRole == 'User'"
  >
    <div class="success-update-data-modal" id="successDataUpdateModal">
      <p>Данные успешно обновлены</p>
    </div>
    <div class="welcoming-image">
      <p class="welcoming-user-text" v-if="user">Hello, {{ user.name }}</p>
    </div>
    <div class="user-info">
      <div class="head-item">Профиль</div>
      <div class="user-fields">
        <div class="input-user-wrap">
          <my-input
            :placeholderValue="'Имя'"
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
            type="date"
            :placeholderValue="'Дата рождения'"
            id="birthdayField"
            @input="UserUpdate.birthday = $event.target.value"
            :value="UserUpdate.birthday"
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
        <my-button
          type="button"
          class="save-user-info"
          :class="{ 'is-not-active-btn': !this.isActiveSaveBtn }"
          @click.prevent="updateUser"
          id="saveUserDataChanges"
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
    <div class="all-user-notes" v-if="!isDetaileView && !isAddActive">
      <div class="note-head-content">
        <h2>Записи</h2>
      </div>
      <div class="filter-panel">
        <div class="filter-search">
          <my-select
            :arrData="this.getStatusFilter()"
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
          <div class="delete-note-button" @click="this.deleteNotes(note.noteId), this.closeDetailedView()">
            <img src="@/assets/crossIcon.png" alt="" />
          </div>
          <div class="note-head">
            <h3>Запись {{ note.noteId }}</h3>
          </div>
          <div class="note-content-list">
            <ul>
              <li>Статус: {{ note.status }}</li>
              <li class="note-service-li">
               Услуга: {{ this.getNoteServicesString(note) }}
           <!--Услуга: {{  note.serviceName}} -->
 
            </li>
              <li>Машина: {{ note.brand }} {{ note.model }}</li>
              <li>Станция: {{ note.stationName }}</li>
              <li>Дата: {{ note.date }}</li>
            </ul>
            <div class="note-time">
              {{ note.time }}
            </div>
          </div>
        </my-grid-item>
        <my-grid-item class="add-new-car" @click="addNoteView()">
          <div class="circle-block">
            <img src="@/assets/addIcon.png" alt="" />
          </div>
        </my-grid-item>
      </my-grid>
    </div>

    <!-- Детальные записи пользователя -->
    <div class="detailed-note-info" v-if="isDetaileView">
      <div class="close-detailed-contenet" @click="closeDetailedView()">
        <img src="@/assets/closeCrossIcon.png" alt="" />
      </div>
      <h3 class="opened-note-name">
        {{ "Запись " + this.viewNoteObj.noteId }}
      </h3>
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
            v-if="
              property != 'noteId' &&
              property != 'statusId' &&
              property != 'statusHistory' &&
              property != 'additionalServices'
            "
          >
            <p class="characteristic-name">{{ property }}</p>
            <p class="characteristic-value" v-if="property != 'services'">
              {{ value }}
            </p>
            <p
              class="characteristic-value services-characteristic-value"
              v-if="property == 'services'"
            >
              {{ this.getNoteServicesString(this.viewNoteObj) }}
            </p>
          </div>
        </div>
      </div>
      <div class="details">
        <div class="deteiled-note-status">
          <h3>Статус записи</h3>

          <div class="progress-note-status">
            <div class="progress-note">
              <div
                class="progress-item"
                v-bind:class="{
                  'success-status-item':
                    this.viewNoteObj.statusHistory.includes(this.viewNoteObj.statusHistory[0]),
                }"
              >
                <div class="progress-head-name">
                  <p>Запись</p>
                </div>
                <div
                  class="progress-circle"
                  v-bind:class="{
                    'progress-circle-success':
                      this.viewNoteObj.statusHistory.includes(
                        this.viewNoteObj.statusHistory[0]
                      ),
                  }"
                >
                  <div class="progress-circle-img-wrap">
                    <img src="@/assets/sucsessIcon.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="progress-circle-divider"></div>
              <div
                class="progress-item"
                v-bind:class="{
                  'success-status-item':
                    this.viewNoteObj.statusHistory.includes(this.viewNoteObj.statusHistory[1]),
                }"
              >
                <div class="progress-head-name">
                  <p>Выполнение услуг</p>
                </div>
                <div
                  class="progress-circle"
                  v-bind:class="{
                    'progress-circle-success':
                      this.viewNoteObj.statusHistory.includes(
                        this.viewNoteObj.statusHistory[1]
                      ),
                  }"
                >
                  <div class="progress-circle-img-wrap">
                    <img src="@/assets/sucsessIcon.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="progress-circle-divider"></div>
              <div
                class="progress-item"
                v-bind:class="{
                  'success-status-item':
                    this.viewNoteObj.statusHistory.includes(this.viewNoteObj.statusHistory[2]),
                }"
              >
                <div class="progress-head-name">
                  <p>Готово к<br> оплате</p>
                </div>
                <div
                  class="progress-circle"
                  v-bind:class="{
                    'progress-circle-success':
                      this.viewNoteObj.statusHistory.includes(this.viewNoteObj.statusHistory[2]),
                  }"
                >
                  <div class="progress-circle-img-wrap">
                    <img src="@/assets/sucsessIcon.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="progress-circle-divider"></div>
              <div
                class="progress-item"
                v-bind:class="{
                  'success-status-item':
                    this.viewNoteObj.statusHistory.includes(this.viewNoteObj.statusHistory[3]),
                }"
              >
                <div class="progress-head-name">
                  <p>Закрыта</p>
                </div>
                <div
                  class="progress-circle"
                  v-bind:class="{
                    'progress-circle-success':
                      this.viewNoteObj.statusHistory.includes(this.viewNoteObj.statusHistory[3]),
                  }"
                >
                  <div class="progress-circle-img-wrap">
                    <img src="@/assets/sucsessIcon.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="progress-service"></div>
          </div>
        </div>
        <div class="deteiled-note-description">
          <div class="detailed-note-drop-down">
            <div class="drop-down-head" @click="openDetailNoteList()">
              <h3 class="menu-link">Детали записи</h3>
              <div class="drop-down-icon-wrap">
                <img
                  src="@/assets/DropDownIcon.png"
                  alt=""
                  v-bind:class="{
                    'drop-down-icon-active': isDetaileNoteListActive,
                  }"
                />
              </div>
            </div>
            <ul
              class="details-list"
              v-bind:class="{ 'details-list-active': isDetaileNoteListActive }"
            >
              <li v-for="service in this.viewNoteObj.services" :key="service">
                <p class="sub-menu-link">
                  {{ service.name + " - " + service.price + "грн" }}
                </p>
              </li>
            </ul>
          </div>
          <div class="detailed-recomended-service">
            <div class="drop-down-head" @click="openRecommendedService()">
              <h3 class="menu-link">Рекомендованные услуги</h3>
              <div class="drop-down-recomended-icon-wrap">
                <img
                  src="@/assets/DropDownIcon.png"
                  alt=""
                  v-bind:class="{
                    'drop-down-recomended-icon-active':
                      isRecommendedServiceActive,
                  }"
                />
              </div>
            </div>
            <ul
              class="details-list"
              v-bind:class="{
                'details-recomended-list-active': isRecommendedServiceActive,
              }"
            >
              <li
                v-for="addService in this.viewNoteObj.additionalServices"
                :key="addService"
              >
                <div class="additional-service-wrap">
                  <p class="sub-menu-link">
                    {{ addService.name + " - " + addService.price + "грн" }}
                  </p>
                  <input
                    type="checkbox"
                    @change="includeAdditionalService(addService.name)"
                    :checked="addService.include ? true : false"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="result-block">
        <div class="result-price-block">
          <h3>Общая сумма:</h3>
          <h3 class="result-total-cost">
            {{ this.getTotalNoteServicesCost() + "грн" }}
          </h3>
        </div>
        <div class="pay-note-block"  v-if="this.viewNoteObj.status == 'Готово к оплате'">
          <my-select
                class="pay-user-station-discount"
                :arrData="brandData"
                :plug="'Доступные скидки'"
                id="add-car-select"
              ></my-select>
              <div class="google-pay-button">
          <my-button class="google-pay-button">
            <img src="@/assets/google-pay.png" alt="" />
            Оплатить с помощью google pay
          </my-button>
        </div>
        </div>
      </div>
    </div>

    <!-- Добавление записи -->
    <div class="add-note" v-if="isAddActive">
      <div class="close-detailed-contenet" @click="closeAddNote()">
        <img src="@/assets/closeCrossIcon.png" alt="" />
      </div>
      <h2 class="add-note-head">Добавление записи</h2>
      <div class="add-head-select-block">
        <h2>Информация о записи</h2>
        <div class="note-info-table note-add-info-table">
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Номер</p>
              <p style="padding-right: 35px;">Запись {{this.userNotes.length + 1}}</p>
            </div>
          </div>
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Станция</p>
              <my-select
                class="add-choose-sto"
                :arrData="this.converteToArrayString(this.stationData, 'stationName')"
                :plug="'Станция'"
                id="add-sto-select"
                @change="this.getIdElementObj($event.target.value, 'station')"
                v-model="this.createNotes.station"
              ></my-select>
            </div>
          </div>
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Машина</p>
              <my-select
                class="add-choose-car"
                :arrData="this.converteToArrayStringCars()"
                v-model="this.createNotes.cars"
                :plug="'Выбрать машину'"
                id="add-car-select"
                @change="this.getIdElementObj($event.target.value.split(' ')[1], 'cars')"
                
              ></my-select>
            </div>
          </div>
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Дата</p>
              <my-input
                type="date"
                @change="this.createNotes.date = $event.target.value"
                :value="this.createNotes.date"
              ></my-input>
            </div>
          </div>
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Время</p>
              <my-select
                class="add-choose-time"
                :arrData="this.converteToArrayString(this.time, 'time')"
                :plug="'Время'"
                id="add-time-select"
                @change="this.getIdElementObj($event.target.value, 'time')"
                v-model="this.createNotes.time"
              ></my-select>
            </div>
          </div>
        </div>
      </div>
      <div class="note-add-station-settings">
        <div class="station-location-map">
          <div class="map-station-head">
            <h3>Адресс</h3>
          </div>
          <GMapMap
            :center="center"
            :zoom="7"
            map-type-id="terrain"
            style="width: 100%; height: 20rem"
          >
            <GMapCluster >
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
        <div class="modal-services">
          <div class="modal-head">
            <h3>Выберите услуги</h3>
          </div>
          <div class="table-block add-note-services-table" id="service-table">
            <div class="row row-head">
              <div class="service-field">
                <p>Услуга</p>
              </div>
              <div class="service-cost">
                <p>Стоимость</p>
              </div>
            </div>
            <div class="table-body" id="tableBodyAddServicesId">
              <div class="row" v-for="elem in userServices" :key="elem">
                <div class="service-field">
                  <my-select
                    :arrData="getServiceArray()"
                    :plug="'Выбрать услугу'"
                    id="selectDateField"
                    @change="getServiceCost($event, elem); this.insertObjServices($event); "
                    
                  ></my-select>
                </div>
                <div class="service-cost">
                  <input
                    type="text"
                    :id="'service-cost-input' + elem"
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="services-control-btn-block">
            <div class="total-cost-block">
              <h2 @click="this.getTotalServicesCost()">
                Общая сумма - {{ this.totalAddNoteServicesCost + "грн" }}
              </h2>
            </div>
            <div class="control-block add-service-into-note-control">
              <button @click="addServiceRow()" id="addRow">
                <img src="@/assets/plusIcon.png" alt="plus" />
              </button>
              <button id="deletRow" @click="deleteService()">
                <img src="@/assets/crossIcon.png" alt="cross" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="add-note-btn-block">
        <my-button @click="this.insertNotes()">Записаться</my-button>
      </div>
    </div>
  </div>
  <!-- Транспорт пользователя -->
  <div
    class="car-content"
    v-if="this.userItemID == 3 && this.userRole == 'User'"
  >
    <div class="all-user-cars" v-if="!isDetaileView && !isAddActive">
      <div class="car-head-content user-head-content">
        <h2>Транспорт</h2>
      </div>

      <my-grid>
        <my-grid-item
          class="car-item"
          v-for="car in userCars"
          :key="car"
          @click="detailedCarView(car.carId)"
        >
          <div class="car-image-block">
            <img :src="require('@/assets/' + car.image)" alt="" />
          </div>
          <div class="car-name">
            <p>{{ car.brand + " " + car.model }}</p>
            <p>{{car.nomera}}</p>
          </div>
        </my-grid-item>
        <my-grid-item class="add-new-car" @click="addCarView()">
          <div class="circle-block">
            <img src="@/assets/addIcon.png" alt="" />
          </div>
        </my-grid-item>
      </my-grid>
    </div>

    <!-- Детальный просмотр транспорта -->
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
              v-if="property != 'carId' && property != 'image'"
            >
              <p class="characteristic-name">{{ property }}</p>
              <p class="characteristic-value">{{ value }}</p>
            </div>
          </div>
        </div>

        <div class="car-control-panel">
          <my-button class="delete-car" @click="this.deleteNotes(this.viewCarObj.carId), this.closeDetailedView()">Удалить</my-button>
        </div>
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
          <my-button class="add-car-button" @click="this.addCarUsers()">Добавить транспорт</my-button>
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
          <h3>Станция - {{ discount.stationName }}</h3>
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
import { defaults } from "chart.js";
import Notes from "@/apis/Notes";
import Station from "@/apis/Station";
import Cars from "@/apis/Cars";
import MyInput from '../UI/MyInput.vue';
import MySelect from '../UI/MySelect.vue';
import Discount from "@/apis/Discounts";

export default {
  components: { MyGridItem, MyButton, MyInput, MySelect },
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
  mounted() {},
  data() {
    return {
      /* ========= Профиль пользователя ========= */
      UserUpdate: {
        name: this.user.name,
        surname: this.user.surname,
        phone: this.user.phone,
        email: this.user.email,
        password: "",
        birthday: this.user.birthday,
      },
      errors: [],
      isActiveSaveBtn: false,

      /* ========= Записи пользователя ========= */
      noteStatus: this.getStatus(),
      userNotes: this.getNotes(),
      time: this.getListTime(),
      stationData: this.getStation(),
      carsData: this.getCarsList(),
      /* userNotes: [
        {
          noteId: 1,
          status: "Выполнение услуг",
          statusHistory: ["Успешно записан", "Выполнение услуг"],
          additionalServices: [
            {
              name: "Чистка мотора",
              price: 400,
              include: false,
            },
            {
              name: "Замена свечей",
              price: 200,
              include: false,
            },
          ],
          services: [
            {
              name: "Починка двигателя",
              price: 300,
            },
          ],
          car: "Tesla Model S",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
        {
          noteId: 2,
          status: "Готово к оплате",
          statusHistory: ["Успешно записан", "Выполнение услуг", "Готово к оплате"],
          additionalServices: [
            {
              name: "Чистка Стекла",
              price: 100,
              include: false,
            },
            {
              name: "Замена дверей",
              price: 2200,
              include: false,
            },
          ],
          services: [
            {
              name: "Починка двигателя Про",
              price: 500,
            },
          ],
          car: "Tesla Model R",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
        {
          noteId: 3,
          status: "Просрочено",
          statusHistory: [],
          additionalServices: [
            {
              name: "Чистка мотора",
              price: 400,
              include: false,
            },
          ],
          services: [
            {
              name: "Починка двигателя",
              price: 300,
              include: false,
            },
            {
              name: "Починка бортового компьютера",
              price: 300,
              include: false,
            },
          ],
          car: "Tesla Model G",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
        {
          noteId: 4,
          status: "Успешно записан",
          statusHistory: ["Успешно записан"],
          additionalServices: [
            {
              name: "Чистка мотора",
              price: 400,
              include: false,
            },
          ],
          services: [
            {
              name: "Починка двигателя",
              price: 300,
            },
            {
              name: "Починка бортового компьютера",
              price: 300,
            },
          ],
          car: "Tesla Model S",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
        {
          noteId: 5,
          status: "Закрыта",
          statusHistory: [
            "Успешно записан",
            "Выполнение услуг",
            "Готово к оплате",
            "Закрыта",
          ],
          additionalServices: [
            {
              name: "Чистка мотора",
              price: 400,
              include: false,
            },
          ],
          services: [
            {
              name: "Починка двигателя",
              price: 300,
            },
            {
              name: "Починка бортового компьютера",
              price: 300,
            },
          ],
          car: "Tesla Model S",
          station: "Elcar",
          date: "22.10.2022",
          time: "22:30",
        },
      ], */
      // services: [
      //   {
      //     name: "Ушатать дверь",
      //     cost: 200,
      //   },
      //   {
      //     name: "Поставить дверь",
      //     cost: 300,
      //   },
      //   {
      //     name: "Запилить дверь",
      //     cost: 410,
      //   },
      // ],
      services: this.getServiceList() ,
      /* Записи пользователя детальный просмотр */
      viewNoteObj: {},
      isDetaileNoteListActive: true,
      isRecommendedServiceActive: true,
      totalServiceNoteCost: 0,

      /* Добавление записи пользователя */
      userServices: 0,
      totalAddNoteServicesCost: 0,
      
      // servicesData: this.getServiceList() ,
      createNotes:{
        station: "Станция",
        cars: "Машина",
        services: [],
        date: "Дата записи",
        time: "Время записи",
        userId: this.user.userId,
        statusId: "1",
        

      },

      /* ========= Транспорт пользователя ========= */
      userCars: this.getCarsUser(),
      // [
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
      /* Транспорт пользователя детальный просмотр */
      viewCarObj: {},

      /* Добавление транспорта пользователя */
      addCarObj: {
        carID: 0,
        image: "carPrototype.png",
        brand: "",
        model: "",
        year: "",
        type: "",
        userId: this.user.userId,
        nomera: "",
      },
      selectBrandValue: "",
      selectModelValue: "",
      modelData: ["Model S", "Model X"],
      brandData: ["Tesla"],
      

      /* ========= Скидки пользователя ========= */
       userDiscounts: this.getDiscount(),
       //  [
      //   {
      //     station: "Elcar",
      //     percent: 5,
      //     date: "22.10.2022",
      //   },
      //   {
      //     station: "Towcar",
      //     percent: 10,
      //     date: "22.10.2022",
      //   },
      //   {
      //     station: "Towcar",
      //     percent: 10,
      //     date: "22.10.2022",
      //   },
      //   {
      //     station: "Towcar",
      //     percent: 10,
      //     date: "22.10.2022",
      //   },
      // ],

      /* ========= Общее ========= */
      filterData: ["select1", "select2", "select3"],
      isDetaileView: false,
      isAddActive: false,
    };
  },

  methods: {
    /* ========= Скидки пользователя ========= */
   async getDiscount(){
      await Discount.getDiscounts().then(response => {
      this.userDiscounts = response.data;
      
     });
      
    },
    /* ========= Записи ========= */
   deleteNotes(idNotes){
      let ObjDelete = {
        idNotes: idNotes,
      };
       Notes.deleteNotes(ObjDelete);
       this.getNotes();
       
    },
    insertNotes(){
      Notes.insertNotes(this.createNotes);
      this.closeAddNote();
      this.getNotes();
    },
     converteToArrayStringCars(){
      let newArr = [];
      this.carsData.forEach(element => {
        newArr.push(`${element["brand"]} ${element["model"]}`);
      });
      return newArr;
    },
    converteToArrayString(arr, property){
      let newArr = [];
      arr.forEach(element => {
        newArr.push(element[property]);
      });
      return newArr;
    },
    


    async getListTime(){
      await Notes.TimeList().then(response => {
      this.time = response.data;
      
     });
    },
    getIdElementObj(data, typeArray){
      switch (typeArray) {
        case "time":
          this.time.forEach(element => {
            if(element.time === data) {
              this.createNotes.time = element.timeId;
              }
          });
          break;
          case "station":
          this.stationData.forEach(element => {
            if(element.stationName === data) {
              this.createNotes.station = element.stationId;
              }
          });
          break;
          case "cars":
          this.carsData.forEach(element => {
            if(element.model === data) {
              this.createNotes.cars = element.carId;
              }
          });
          break;
      
      
        default:
          break;
      }
    },
    
    
    insertObjServices($event){
      let inputValue = $event.target.value;
      let count = 0;
      this.services.forEach(element => {
        if(element.name === inputValue) {
          this.createNotes.services.forEach(element => {
            if(element.name === inputValue){
              count++;
              
            }
          });
          if(count === 0) {
            this.createNotes.services.push(element);

          }
        }
      });
      console.log(inputValue);
    },
    deleteObjServices(){
      let servicesTable = document.getElementById('tableBodyAddServicesId');
      let deleteServiceItem = servicesTable.childNodes[servicesTable.childNodes.length-2].childNodes[0].childNodes[0].value;
      this.createNotes.services.forEach((element, index) => {
        if(element.name === deleteServiceItem){
          this.createNotes.services.splice(index, 1);
        }
      });
    },
    async getServiceList() {
    await Notes.ServicesList().then(response => {
      this.services = response.data;
     });
  },
    async getCarsList() {
      let userIdObj = this.user.userId
      await Cars.getList(userIdObj).then(response => {
      this.carsData = response.data;
     });
     
      
    },
    // convertCarsArray(){
      
    //   for (let i = 0; i < this.carsData.length; i++) {
    //     let element = this.carsData[i];
    //     this.carsData[i] = element.model;
    //   }
    // },
    // convertStationArray(){
      
    //   for (let i = 0; i < this.stationData.length; i++) {
    //     let element = this.stationData[i];
    //     this.stationData[i] = element.stationName;
    //   }
    // },
    async getStation() {
    await Station.getList().then(response => {
      this.stationData = response.data;
     });
    //  this.convertStationArray();
  },
  async getStatus() {
    await Notes.statusList().then(response => {
      this.noteStatus = response.data;
     });
  },
    async getNotes() {
      let userIdObj = this.user.userId
      await Notes.viewList(userIdObj).then(response => {
      this.userNotes = response.data;
     });
    },
    /* ========= Профиль пользователя ========= */
    updateUser() {
      User.updateUser(this.UserUpdate)
        .then((response) => {
          if (response.status == 200) {
            document
              .getElementById("successDataUpdateModal")
              .classList.add("success-update-data-modal-active");

            setTimeout(() => {
              document
                .getElementById("successDataUpdateModal")
                .classList.remove("success-update-data-modal-active");
            }, 3000);
          }
        })
        .then(() => {
          this.$router.push("/Profile");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          console.log(error);
        });
      this.$emit("updateUserData");
    },

    /* ========= Записи пользователя ========= */
    addNoteView() {
      this.closeAddNote();
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
        if (element.status === userNote.status) {
          userStatusColor = element.color;
        }
      });
      return userStatusColor;
    },

    openDetailNoteList() {
      this.isDetaileNoteListActive = !this.isDetaileNoteListActive;
    },

    openRecommendedService() {
      this.isRecommendedServiceActive = !this.isRecommendedServiceActive;
    },

    getNoteServicesString(noteObj) {
      let servicesString = "";

      for (let i = 0; i < noteObj.services.length; i++) {
        if (i < noteObj.services.length - 1) {
          servicesString += noteObj.services[i].name + ", ";
        } else {
          servicesString += noteObj.services[i].name;
        }
      }
      return servicesString;
    },
    getTotalNoteServicesCost() {
      let sum = 0;

      for (let i = 0; i < this.viewNoteObj.services.length; i++) {
        sum += +this.viewNoteObj.services[i].price;
      }

      for (let i = 0; i < this.viewNoteObj.additionalServices.length; i++) {
        if (this.viewNoteObj.additionalServices[i].include == true) {
          sum += +this.viewNoteObj.additionalServices[i].price;
        }
      }

      this.totalServiceNoteCost = sum;
      return this.totalServiceNoteCost;
    },
    includeAdditionalService(additionalServiceName) {
      this.viewNoteObj.additionalServices.forEach((element) => {
        if (element.name == additionalServiceName) {
          element.include = !element.include;
        }
      });
    },

    addServiceRow() {
      this.userServices++;
    },

    deleteServiceRow() {
      this.userServices--;
    },

    async deleteService() {
      this.deleteObjServices();
      await this.deleteServiceRow();
      this.getTotalServicesCost();
      
    },

    getServiceCost($event, elem) {
      let inputId = "service-cost-input" + elem;
      let inputValue = $event.target.value.split("-");
      //console.log(inputValue);
      if (inputValue[0] == "Выбрать услугу") {
        document.getElementById(inputId).value = 0;
      }
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i].name == inputValue[0]) {
          document.getElementById(inputId).value = this.services[i].price;
        }
      }
      this.getTotalServicesCost();
    },

    getServiceArray() {
      let resArr = [];
      for (let i = 0; i < this.services.length; i++) {
        resArr[i] = this.services[i].name;
      }
      return resArr;
    },

    getStatusFilter() {
      let resArr = [];
      for (let i = 0; i < this.userNotes.length; i++) {
        resArr[i] = this.userNotes[i].status;
      }
      return resArr;
    },

    getTotalServicesCost() {
      let noteListUserServices =
        document.getElementsByClassName("service-cost");
      let myArray = Array.from(noteListUserServices);
      console.log(myArray);
      let result = 0;
      if (this.userServices > 0) {
        for (let i = 1; i < myArray.length; i++) {
          //console.log(myArray[i].childNodes[0]);
          result += Number(myArray[i].childNodes[0].value);
        }
      }
      console.log(result);
      this.totalAddNoteServicesCost = result;
    },

    closeAddNote() {
      this.isAddActive = !this.isAddActive;
    },

    /* ========= Транспорт пользователя ========= */
    addCarUsers(){
      let newCar = {
        brand: this.addCarObj.brand,
        model: this.addCarObj.model,
        userId: this.user.userId,
        year: this.addCarObj.year,
        type: this.addCarObj.type,
        image: this.addCarObj.image,
        nomera: this.addCarObj.nomera,
      };
      Cars.addCarsUser(newCar);
      this.closeAddView();
      this.getCarsUser();
      this.getCarsList();


    },
    deleteNotes(idCars){
      let ObjDelete = {
        idCars: idCars,
      };
       Cars.deleteCars(ObjDelete);
       this.getCarsUser();
       this.getCarsList();
       
    },
    async getCarsUser(){
      let userIdObj = this.user.userId
      await Cars.getUserCars(userIdObj).then(response => {
      this.userCars = response.data;
     });  
    },
    detailedCarView(carObjID) {
      this.viewCarObj = this.findUserCar(carObjID);
      this.closeDetailedView();
    },

    findUserCar(id) {
      let userCar;
      this.userCars.forEach((element) => {
        if (element.carId == id) {
          userCar = element;
        }
      });
      return userCar;
    },

    addCarView() {
      this.closeAddView();
    },

    getCarInfo($event, id) {
      if (id == 1) {
        this.selectBrandValue = $event.target.value;
        if (this.selectBrandValue == "Бренд") {
          this.clearAddCarArray();
          document.getElementById("model-select").selectedIndex = 0;
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

    /* ========= Скидки пользователя ========= */

    closeAddView() {
      this.isAddActive = !this.isAddActive;
      this.clearAddCarArray();
    },
    closeDetailedView() {
      this.isDetaileView = !this.isDetaileView;
    },
  },
};
</script>

<style scoped>
.success-update-data-modal {
  padding: 20px 30px;
  position: absolute;
  top: 30px;
  text-align: center;
  border: 2px solid #6fa86e;
  background: #c0f1bf;
  color: #6fa86e;
  border-radius: 8px;
  z-index: 4;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
}

.success-update-data-modal-active {
  display: block;
  opacity: 1;
  transition: opacity 0.5s;
}

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
.input-user-wrap select {
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

.services-characteristic-value {
  max-width: 290px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.note-service-li {
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.detailed-note-info {
  position: relative;
}

.deteiled-note-head h3 {
  text-align: center;
  margin-bottom: 24px;
}
.deteiled-note-head {
  margin-bottom: 10px;
}
.note-info-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.note-info-line:nth-child(2n + 1) {
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
.drop-down-icon-wrap,
.drop-down-recomended-icon-wrap {
  width: 15px;
  height: 15px;
}
.drop-down-icon-wrap img,
.drop-down-recomended-icon-wrap img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.2s;
  transform: rotate(-90deg);
}
.drop-down-icon-wrap .drop-down-icon-active,
.drop-down-recomended-icon-wrap .drop-down-recomended-icon-active {
  transition: transform 0.2s;
  transform: rotate(-180deg);
}
.drop-down-head {
  display: flex;
  align-items: center;
}
.drop-down-head h3 {
  margin-right: 7px;
}
.details {
  position: relative;
  display: flex;
  width: 75%;
  justify-content: space-between;
  padding: 10px 0 30px 0;
}
.deteiled-note-description {
  margin-left: 20px;
}
.deteiled-note-description li {
  position: relative;
  list-style: none;
}
.deteiled-note-description p {
  font-weight: bold;
  font-size: 15px;
}
.details-list {
  max-height: 0;
  padding-left: 15px;
  overflow: hidden;
  transition: max-height 0.2s;
}
.details-list li {
  margin-bottom: 5px;
  color: #5b5b5b;
}
.details-list-active,
.details-recomended-list-active {
  max-height: 200px;
  transition: max-height 1s;
}
.details::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #c4c4c4;
  bottom: 0;
  position: absolute;
}
.result-price-block {
  display: flex;
  padding: 15px 0;
}
.result-total-cost {
  margin-left: 10px;
  color: #5b5b5b;
}
.google-pay-button button {
  padding: 10px 15px;
  background: black;
  display: flex;
  align-items: center;
}
.google-pay-button img {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.deteiled-note-status h3 {
  margin-bottom: 15px;
}

.progress-note {
  display: flex;
  justify-content: space-between;
  height: 90px;
}

.progress-note .progress-item {
  width: 64px;
  margin: 0 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.progress-item .progress-head-name {
  color: #5b5b5b;
  font-weight: bold;
  font-size: 14px;
}

.progress-item .progress-circle {
  width: 40px;
  height: 40px;
  background: #c4c4c4;
  border-radius: 50%;
  border: 4px solid #969696;
  position: relative;
}

.progress-circle-divider {
  margin-top: 66px;
  height: 5px;
  width: 30px;
  border-radius: 8px;
  background: #c4c4c4;
}

.progress-item .progress-circle img {
  display: none;
}

.progress-item .progress-circle-success {
  background: #7fd970;
  border: 4px solid #7fd970;
}

.progress-item .progress-circle-success img {
  display: block;
}

.success-status-item + .progress-circle-divider {
  background: #7fd970;
}

.progress-circle-img-wrap {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress-circle-img-wrap img {
  max-width: 100%;
  max-height: 100%;
}

.additional-service-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
}

.additional-service-wrap p {
  margin-right: 10px;
}

.detailed-note-drop-down {
  margin-bottom: 10px;
}

/* Добавление записи пользователя */
.add-note {
  position: relative;
}

.add-select-block {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.add-head-select-block h2 {
  font-size: 18px;
}
.add-select-block select {
  flex-basis: 34%;
  margin-bottom: 20px;
  text-align: center;
  background: #c4c4c4;
}
.add-select-block::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #c4c4c4;
  bottom: 0;
}
.add-note-services-header {
  margin: 20px 0;
}

.add-note-services-table
  .table-body
  .row:nth-child(2n + 1)
  .service-field
  select,
.add-note-services-table
  .table-body
  .row:nth-child(2n + 1)
  .service-cost
  input {
  background: #c4c4c4;
}

.table-block.add-note-services-table {
  overflow: normal;
}

.table-block.add-note-services-table .table-body {
  height: 178px;
  overflow-y: scroll;
}

.table-block.add-note-services-table {
  height: 212px;
}

.total-cost-block {
  font-size: 14px;
}

.modal-services {
  height: 350px;
}

.station-location-map,
.modal-services {
  width: 48%;
}
.modal-head,
.map-station-head {
  margin-bottom: 20px;
}
.table-block {
  border: 1px solid gray;
  border-radius: 5px;
  height: 200px;
  background: #fff;
  margin-bottom: 10px;
  overflow: scroll;
}

.table-block .row {
  border-bottom: 1px solid gray;
  display: flex;
}

.table-block .row select,
.table-block .row input {
  border: none;
  border-radius: 0;
  height: 100%;
  outline: none;
  width: 100%;
  text-align: center;
}
.row-head {
  background: #fff;
}
.service-cost {
  border-left: 1px solid gray;
}

.service-cost,
.service-field {
  flex-basis: 50%;
}
.service-cost input {
  border-left: 1px solid gray;
}
.row-head .service-cost,
.row-head .service-field {
  padding: 6px;
  text-align: center;
}

.row-head .service-cost {
  border-left: 1px solid gray;
}
.services-control-btn-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.note-add-info-table .note-info-line:nth-child(2n + 1) select {
  background: #c4c4c4;
}

.note-add-info-table .note-info-line select {
  border: none;
  outline: none;
  padding: 0 5px 0 0;
  width: 90px;
}

.vue-map {
  min-height: 17rem;
  border: 3px solid #000;
  border-radius: 5px;
}

.vue-map-container {
  min-height: 16rem !important;
}

.note-add-station-settings {
  display: flex;
  justify-content: space-between;
}

.add-note-btn-block {
  display: flex;
  justify-content: center;
}

.pay-note-block select {
  margin-bottom: 10px;
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

.detailed-car-info {
  position: relative;
}

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

.delete-car {
  background: #ea7778 !important;
  border-radius: 6px !important;
  padding: 10px 30px !important;
}

.delete-car:hover {
  background: #b45658 !important;
}

/* Добавление транспорта */
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
.add-car-button {
  background: #4599f5;
  padding: 10px 60px !important;
}

@media screen and (max-width: 1288px) {
  /* Детальный просмотр записей */
  .details {
    width: 100%;
  }
}

@media screen and (max-width: 1120px) {
  .user-info {
    width: 100%;
  }

  .save-user-info {
    margin: 0 auto;
  }

  /* Детальный просмотр записей */
}

@media screen and (max-width: 1120px) {
  .note-item .note-content-list li {
    font-size: 16px;
  }
}

@media screen and (max-width: 1000px) {
    /* Добаление записи пользователя */
  .table-block.add-note-services-table .table-body {
    display: block;
  }
}

@media screen and (max-width: 930px) {
  /* Детальный просмотр записей */
  .details {
    flex-direction: column;
    padding: 10px 0 12px 0;
  }

  .progress-note-status {
    margin-bottom: 30px;
    position: relative;
  }

  .progress-note {
    justify-content: center;
  }

  .progress-note-status::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #c4c4c4;
    bottom: -20px;
    position: absolute;
  }

  .deteiled-note-description {
    display: flex;
    justify-content: space-between;
    margin-left: 0;
  }
      /* Добаление записи пользователя */
  .note-add-station-settings {
    flex-direction: column;
  }
  .station-location-map,
.modal-services {
  width: 100%;
}
  .station-location-map {
    margin-bottom: 20px;
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

  /* Добаление транспорта пользователя */
  .main-add-selectors select {
    flex-basis: 40%;
  }

  .add-car-header {
    font-size: 12px;
  }
}

@media screen and (max-width: 770px) {
  .deteiled-note-description {
    flex-direction: column;
  }

  .additional-service-wrap input {
    width: 18px;
    height: 18px;
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

  /* Добавление транспорта пользователя */
  .add-image-car-model {
    width: 100%;
    height: auto;
  }

  /* Транспорт пользователя детальней */

  .image-car-model {
    width: 100%;
  }

  .detailed-car-info-content {
    margin-top: 20px;
  }

  /* Просмотр записей */

  .filter-panel .right-sort select {
    width: 100%;
  }

  /* Детальный просмотр записей */

  .deteiled-note-head h3 {
    font-size: 16px;
  }

  .progress-note {
    height: 75px;
    justify-content: space-around;
  }
  .progress-note .progress-item {
    width: 12%;
  }

  .progress-item .progress-circle {
    width: 30px;
    height: 30px;
    border: 2px solid #969696;
  }
  .progress-item .progress-circle-success {
    border: 2px solid #7fd970;
  }
  .progress-item .progress-head-name {
    font-size: 12px;
  }
  .progress-circle-img-wrap {
    width: 18px;
    height: 18px;
  }
  .progress-circle-divider {
    margin-top: 57px;
  }
  .deteiled-note-status h3,
  .drop-down-head h3,
  .result-price-block h3 {
    font-size: 15px;
  }

  .deteiled-note-description p {
    font-size: 12px;
  }

  .google-pay-button button {
    width: 100%;
    justify-content: center;
    padding: 12px 0;
    font-size: 10px;
  }

  .opened-note-name {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .services-characteristic-value {
    max-width: 127px;
  }
  /* Добаление записи пользователя */
  .note-add-station-settings .map-station-head,
  .note-add-station-settings .modal-head {
        font-size: 14px;
  }

  .note-add-station-settings .modal-services .total-cost-block h2{
    font-size: 18px;
  }

  .add-note h2 {
    font-size: 21px;
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

  .note-item .note-head {
    font-size: 14px;
  }

  .note-item .delete-note-button {
    width: 20px;
    height: 20px;
  }

  .note-item .note-content-list li {
    font-size: 14px;
  }
}
@media screen and (max-width: 430px) {
  .welcoming-image {
    height: 130px;
  }

  .user-head-content h2 {
    font-size: 20px;
  }

  /* Детальный просмотр записей */
  .note-info-line .note-info-line-inner {
    padding: 10px 20px;
  }

  .progress-item .progress-head-name {
    font-size: 10px;
  }

  .additional-service-wrap input {
    width: 14px;
    height: 14px;
  }

  .note-info-table .note-info-line p {
    font-size: 10px;
  }

  /* Добавление транспорта пользователя */
  .add-car {
    position: relative;
  }
  .car-info-line .car-info-line-inner {
    padding: 10px 20px;
  }
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
  .add-car-button-block {
    width: 100%;
  }
  .add-car-button-block button {
    padding: 15px 20px !important;
    width: 100% !important;
    font-size: 12px !important;
  }
  .add-car .close-detailed-contenet {
    width: 25px;
    height: 25px;
    top: -4px;
    right: 0;
  }
  /* Добаление записи пользователя */
  .note-add-station-settings .modal-services .services-control-btn-block {
    flex-direction: column-reverse;
  }
  .add-service-into-note-control {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }

  .add-service-into-note-control button{
    flex-basis: 50%;
  } 
  .add-note-btn-block button{
    width: 100%;
  }
  .add-note .add-note-head {
    text-align: left;
    font-size: 16px;
  }
  .add-head-select-block h2{
    font-size: 14px;
  }
}
</style>
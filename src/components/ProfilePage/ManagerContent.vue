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
          @click="
            this.deteiledManagerUsersView(users.userId), this.getCarsUser()
          "
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
            <my-button class="add-user-button" @click="this.addUserToSystem()"
              >Зарегистрировать</my-button
            >
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
                :placeholder=property
                @input="addCarObj[property] = $event.target.value"
                :value="addCarObj[property]"
                class="user-addcar-input"
              ></my-input>
            </div>
          </div>
        </div>

        <div class="add-car-button-block">
          <my-button class="add-car-button" @click="this.addNewCars()"
            >Добавить транспорт</my-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- Записи -->
  <div
    class="manager-note-content"
    v-if="this.userItemID == 2 && this.userRole == 'Manager'"
  >
    <div class="all-user-notes" v-if="!isDetaileView && !isAddNoteActive">
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
          class="grid-item note-item"
          v-for="note in userNotes"
          :key="note"
          @click="deteiledNoteView(note.noteId)"
          :style="{ 'background-color': this.checkNoteStatus(note.noteId) }"
        >
          <div
            class="delete-note-button"
            @click="this.deleteNotes(note.noteId), this.closeDetailedView()"
          >
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
        <my-grid-item class="grid-item add-new-car" @click="getCarsList(), addNoteView()">
          <div class="circle-block">
            <img src="@/assets/addIcon.png" alt="" />
          </div>
        </my-grid-item>
      </my-grid>
    </div>
    <!-- Детальный просмотр записей -->
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
                    this.viewNoteObj.statusHistory.includes(
                      this.viewNoteObj.statusHistory[0]
                    ),
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
                    this.viewNoteObj.statusHistory.includes(
                      this.viewNoteObj.statusHistory[1]
                    ),
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
                    this.viewNoteObj.statusHistory.includes(
                      this.viewNoteObj.statusHistory[2]
                    ),
                }"
              >
                <div class="progress-head-name">
                  <p>
                    Готово к<br />
                    оплате
                  </p>
                </div>
                <div
                  class="progress-circle"
                  v-bind:class="{
                    'progress-circle-success':
                      this.viewNoteObj.statusHistory.includes(
                        this.viewNoteObj.statusHistory[2]
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
                    this.viewNoteObj.statusHistory.includes(
                      this.viewNoteObj.statusHistory[3]
                    ),
                }"
              >
                <div class="progress-head-name">
                  <p>Закрыта</p>
                </div>
                <div
                  class="progress-circle"
                  v-bind:class="{
                    'progress-circle-success':
                      this.viewNoteObj.statusHistory.includes(
                        this.viewNoteObj.statusHistory[3]
                      ),
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
                    @change="
                      getServiceCost($event, elem);
                      this.insertObjServices($event);
                    "
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
      <div class="result-block">
        <div class="result-price-block">
          <h3>Общая сумма:</h3>
          <h3 class="result-total-cost">
            {{ this.getTotalNoteServicesCost() + "грн" }}
          </h3>
        </div>
        <div class="pay-note-block">
          <div class="google-pay-button">
            <my-button> Сохранить </my-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Добавление записи -->
  <div class="add-note" v-if="isAddNoteActive">
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
          <!-- <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Станция</p>
              <my-select
                class="add-choose-sto"
                :plug="'Станция'"
                id="add-sto-select"
                :arrData="this.converteToArrayString(this.stationData, 'stationName')"
                @change="this.getIdElementObj($event.target.value, 'station')"
                v-model="this.createNotes.station"
              ></my-select>
            </div>
          </div>
           -->
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Машина</p>
              <my-select
                :arrData="this.converteToArrayStringCars()"
                class="add-choose-car"
                v-model="this.createNotes.cars"
                :plug="'Выбрать машину'"
                id="add-car-select"
                @change="this.getIdElementObj($event.target.value.split(' ')[1], 'cars')"
                @click="this.getCarsList()"
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
                class="note-info-date"
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
          <div class="note-info-line">
            <div class="note-info-line-inner">
              <p class="characteristic-name">Пользователь</p>
              <my-select
                class="add-choose-car"
                :arrData="this.getAllUsers()"
                :plug="'Юзер'"
                id="add-car-select"   
                @change="this.getIdElementObj($event.target.value, 'user')"
                v-model="this.createNotes.userId" 
                @click="this.getCarsList()"           
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
        <div
          class="delete-manager-discount-button"
          @click="this.deleteDiscount(discount.discountsId)"
        >
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
          v-bind:value="station"
          @input="station = $event.target.value"
          :placeholderValue="'Станция'"
          class="add-discount-input"
        ></my-input>
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
          <my-button class="add-discount-button" @click="addDiscount()"
            >Добавить скидку</my-button
          >
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
import MySelect from "../UI/MySelect.vue";
import Notes from "@/apis/Notes";

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
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
      station: "",
      precent: "",
      discountLimit: "",
      endDate: "",
      isDetaileView: false,
      isAddActive: false,
      isAddNoteActive: false,
      isUserModalOpen: false,
      services: this.getServiceList(),
      isDiscountModalOpen: false,
      userServices: 0,
      noteStatus: this.getStatus(),
      viewNoteObj: {},
      totalAddNoteServicesCost: 0,
      //userNotes: this.getNotes(),
      time: this.getListTime(),
      stationData: this.getStation(),
      carsData: this.getCarsList(),
      createNotes: {
        station: this.user.stationId,
        cars: "Машина",
        services: [],
        date: "Дата записи",
        time: "Время записи",
        userId: 14,
        statusId: "1",
      },
      userNotes: this.managerViewNotes(),
      // [
      //   {
      //     additionalServices: [],
      //     adress: "Kharkiv",
      //     brand: "tesla",
      //     date: "20.20.2012",
      //     model: "model s",
      //     noteId: 64,
      //     services: [
      //       {
      //         serviceId: 1,
      //         name: "service1",
      //         price: 241,
      //       },
      //       {
      //         serviceId: 2,
      //         name: "service1",
      //         price: 241,
      //       },
      //     ],
      //     stationName: "sto artura",
      //     status: "Выполнение услуг",
      //     statusHistory: [
      //       {
      //         statusId: 1,
      //         status: "Успешно записан",
      //         color: "#FFD15A",
      //       },
      //       { statusId: 2, status: "Выполнение услуг", color: "#84D1FC" },
      //     ],
      //     time: "20:10",
      //   },
      // ],
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
      services: [
        {name: "Ушатавыфв",
        price: 200,},
        {name: "Ушатавыфв",
        price: 200,},
        {name: "Ушатавыфв",
        price: 200,}
      ],
      
      usersArray: this.getUser(),
      managerDiscounts: this.getDiscountManager(),
    };
  },
  methods: {
    insertNotes(){
      Notes.insertNotes(this.createNotes);
      this.closeAddNote();
      this.managerViewNotes();
    },
    async getStatus() {
    await Notes.statusList().then(response => {
      this.noteStatus = response.data;
     });
  },
    async getListTime(){
      await Notes.TimeList().then(response => {
      this.time = response.data;
      
     });
    },
    async getCarsList() {
      await Cars.getList(this.createNotes.userId).then(response => {
      this.carsData = response.data;
     });

    
    },
    async getServiceList() {
    await Notes.ServicesList().then(response => {
      this.services = response.data;
     });
  },
    async getStation() {
    await Station.getList().then(response => {
      this.stationData = response.data;
     });
  },
   async managerViewNotes() {
      
      await Notes.managerViewNotes(this.user.stationId).then(
        (response) => {
          this.userNotes = response.data;
        });
    },
    async deleteDiscount(discount) {
      let ObjDiscountDelete = {
        discountId: discount,
      };
      await Discount.deleteDiscount(ObjDiscountDelete);
      this.getDiscountManager();
    },
    async addDiscount() {
      let addDiscountObj = {
        stationId: this.user.stationId,
        date: this.endDate,
        percent: this.precent,
        restrictions: this.discountLimit,
      };

      await Discount.addDiscount(addDiscountObj);
      this.closeDiscountModal();
      this.getDiscountManager();
    },
    async getDiscountManager() {
      await Discount.getDiscountManager(this.user.stationId).then(
        (response) => {
          this.managerDiscounts = response.data;
        }
      );
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
          case "user":
          this.usersArray.forEach(element => {
            if((element.name + " " + element.surname + " " + element.email) === data) {
              this.createNotes.userId = element.userId;
              }
          });
          break;
      
      
        default:
          break;
      }
    },
    dropCars(idCars) {
      let ObjDelete = {
        idCars: idCars,
      };
      Cars.deleteCars(ObjDelete);
      this.getCarsUser();
    },
    addNoteView() {
      this.closeAddNote();
    },
    closeAddNote() {
      this.isAddNoteActive = !this.isAddNoteActive;
    },
    async addNewCars() {
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
    async getCarsUser() {
      let userIdObj = this.viewDetailedUserObj.userId;
      await Cars.getUserCars(userIdObj).then((response) => {
        this.userCars = response.data;
      });
    },
    async addUserToSystem() {
      let userObj = {
        name: this.name,
        surname: this.surname,
        phone: this.phoneNumber,
        email: this.email,
        user_role: "User",
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
    getAllUsers() {
      let userArr = [];
      this.usersArray.forEach(element => {
        userArr.push(element.name + " " + element.surname + " " + element.email);
      });
      return userArr;
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
    async getServiceList() {
      await Notes.ServicesList().then((response) => {
        this.services = response.data;
      });
    },
    deteiledNoteView(noteObjID) {
      this.viewNoteObj = this.findUserNote(noteObjID);
      this.closeDetailedView();
    },
    addServiceRow() {
      this.userServices++;
    },
    getServiceArray() {
      let resArr = [];
      for (let i = 0; i < this.services.length; i++) {
        resArr[i] = this.services[i].name;
      }
      return resArr;
    },
    deleteObjServices() {
      let servicesTable = document.getElementById("tableBodyAddServicesId");
      let deleteServiceItem =
        servicesTable.childNodes[servicesTable.childNodes.length - 2]
          .childNodes[0].childNodes[0].value;
      this.createNotes.services.forEach((element, index) => {
        if (element.name === deleteServiceItem) {
          this.createNotes.services.splice(index, 1);
        }
      });
    },
    async deleteService() {
      this.deleteObjServices();
      await this.deleteServiceRow();
      this.getTotalServicesCost();
    },
    deleteServiceRow() {
      this.userServices--;
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
    findUserName(userObjID) {
      let resUserObj;
      this.usersArray.forEach((element) => {
        if (element.email == userObjID) {
          resUserObj = element.userName + " " + element.userSurname;
        }
      });
      return resUserObj;
    },
    async getListTime() {
      await Notes.TimeList().then((response) => {
        this.time = response.data;
      });
    },
    async getStation() {
      await Station.getList().then((response) => {
        this.stationData = response.data;
      });
      //  this.convertStationArray();
    },
    async getStatus() {
      await Notes.statusList().then((response) => {
        this.noteStatus = response.data;
      });
    },
    async getNotes() {
      let userIdObj = this.user.userId;
      await Notes.viewList(userIdObj).then((response) => {
        this.userNotes = response.data;
      });
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
      console.log(this.services[1].price);
      this.getTotalServicesCost();
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
    insertObjServices($event) {
      let inputValue = $event.target.value;
      let count = 0;
      this.services.forEach((element) => {
        if (element.name === inputValue) {
          this.createNotes.services.forEach((element) => {
            if (element.name === inputValue) {
              count++;
            }
          });
          if (count === 0) {
            this.createNotes.services.push(element);
          }
        }
      });
      console.log(inputValue);
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
    findUserNote(id) {
      let userNote;
      this.userNotes.forEach((element) => {
        if (element.noteId == id) {
          userNote = element;
        }
      });
      return userNote;
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
    getStatusFilter() {
      let resArr = [];
      for (let i = 0; i < this.userNotes.length; i++) {
        resArr[i] = this.userNotes[i].status;
      }
      return resArr;
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
.car-info-line-inner input {
  background: #fff;
  border: none;
  text-align: right;
  outline: none;
}
.car-info-line:nth-child(2n + 1),
.car-info-line:nth-child(2n + 1) input {
  background: #c4c4c4;
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
/* Просмотр записи */
.note-head-content h2 {
  text-align: center;
  margin-bottom: 24px;
}
.note-head {
  margin-bottom: 10px;
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
.note-content-list ul {
  color: #625e5e;
  list-style-type: none;
}
.note-service-li {
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.note-time {
  font-weight: bold;
  position: absolute;
  right: 15px;
  bottom: 15px;
}
.note-info-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.note-info-table .note-info-line p {
  font-size: 12px;
  font-weight: bold;
}
.note-info-line:nth-child(2n + 1) {
  background: #c4c4c4;
}
.note-info-date {
  border: 0;
  padding: 0;
  border-radius: 0;
}
.note-info-line-inner {
  width: 100%;
  display: flex;
  padding: 10px 40px;
  justify-content: space-between;
}
.note-info-line-inner input{
  background: #fff;
  border: none;
  text-align:right;
  padding-left: 20px;
  box-sizing:border-box;
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
.services-characteristic-value {
  max-width: 290px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.progress-item .progress-circle img {
  display: none;
}

.progress-item .progress-circle-success {
  background: #7fd970;
  border: 4px solid #7fd970;
}
.progress-circle-divider {
  margin-top: 66px;
  height: 5px;
  width: 30px;
  border-radius: 8px;
  background: #c4c4c4;
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
.progress-item .progress-circle-success img {
  display: block;
}
.success-status-item + .progress-circle-divider {
  background: #7fd970;
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
.detailed-note-drop-down {
  margin-bottom: 10px;
}
.drop-down-head {
  display: flex;
  align-items: center;
}
.drop-down-head h3 {
  margin-right: 7px;
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
.result-price-block {
  display: flex;
  padding: 15px 0;
}
.result-total-cost {
  margin-left: 10px;
  color: #5b5b5b;
}
.pay-note-block select {
  margin-bottom: 10px;
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
.details {
  position: relative;
  display: flex;
  width: 75%;
  justify-content: space-between;
  padding: 10px 0 30px 0;
}
.modal-services {
  height: 350px;
}

.station-location-map,
.modal-services {
  width: 48%;
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

.row-head .service-cost {
  border-left: 1px solid gray;
}
/* Добавление записи */
.user-head-content h2 {
  text-align: center;
  margin-bottom: 24px;
}
.add-note-head {
  text-align: center;
  margin-bottom: 24px;
}
.add-head-select-block h2{
  margin-bottom: 24px;
}
.add-head-select-block h2 {
  font-size: 18px;
  text-align: center;
}
.note-add-station-settings {
  display: flex;
  justify-content: space-between;
}
.add-note-btn-block {
  display: flex;
  justify-content: center;
}
.add-note {
  position: relative;
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
.my-input-field {

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
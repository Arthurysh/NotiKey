<template>
  <div class="profile-container">
    <!-- Форма добавления/Редактирования -->
    <my-modal
      @close="closeModal()"
      class="add-edit-modal"
      v-if="isModalOpen"
    >
      <div class="modal-head" v-show="!modalEdit">Добавление</div>
      <div class="modal-head" v-show="modalEdit">Редактирование</div>
      <div class="add-modal-content">
        <div
          class="add-input-wrap"
          v-for="(value, property) in this.currentTable[0]"
          :key="value"
          v-show="!modalEdit"
        >
          <label :for="property + 'Input'">{{ property }}</label>
          <my-input
            :placeholderValue="property"
            :id="property + 'Input'"
          ></my-input>
        </div>
                <div
          class="add-input-wrap"
          v-for="(value, property) in this.currentTable[0]"
          :key="value"
          v-show="modalEdit"
        >
          <label :for="property + 'Input'">{{ property }}</label>
          <my-input
            :placeholderValue="property"
            :id="property + 'Input'"
            :value="this.editObj[property]"
          ></my-input>
        </div>
        <div class="btn-container" v-show="!modalEdit">
          <my-button class="add-table-note-btn">Добавить</my-button>
        </div>
        <div class="btn-container" v-show="modalEdit">
          <my-button class="add-table-note-btn">Сохранить</my-button>
        </div>
      </div>
    </my-modal>
    <!-- Интерфейсы пользователя -->
    <!-- Профиль пользователя -->
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
    <!-- Записи пользователя -->
    <div
      class="note-content"
      v-if="this.userItemID == 2 && this.isAdmin == false"
    >
      <h1>Hello Note</h1>
    </div>
    <!-- Транспорт пользователя -->
    <div
      class="car-content"
      v-if="this.userItemID == 3 && this.isAdmin == false"
    >
      <h1>Hello Car</h1>
    </div>
    <!-- Скидки пользователя -->
    <div
      class="Discount-content"
      v-if="this.userItemID == 4 && this.isAdmin == false"
    >
      <h1>Hello Discount</h1>
    </div>

    <!-- Интерфейсы администратора -->
    <!-- Таблицы -->
    <div
      class="table-content"
      v-if="this.userItemID == 1 && this.isAdmin == true"
    >
      <div class="table-head-content">
        <h2>Таблицы</h2>
      </div>

      <div class="tables-content">
        <div class="control-panel">
          <div class="control-left-panel">
            <my-select
              @change="changeTable()"
              :plug="'Станции'"
              :arrData="this.tables"
              id="selectTableDB"
            ></my-select>
            <my-input :placeholderValue="'Поиск'"></my-input>
          </div>
          <my-button @click="activeAddModal()">Добавить</my-button>
        </div>
        <table class="table-grid">
          <thead class="table-head">
            <th
              class="headline-item"
              v-for="(value, property) in this.currentTable[0]"
              :key="value"
            >
              <p>{{ property }}</p>
            </th>
            <th class="headline-item">
              <p>Панель управления</p>
            </th>
          </thead>
          <tbody class="table-body">
            <tr class="table-row" v-for="elem in this.currentTable" :key="elem">
              <td class="col" v-for="value in elem" :key="value">
                <p>{{ value }}</p>
              </td>
              <td class="row-panel">
                <div class="row-control">
                  <div class="edit-icon" @click="activeEditModal(elem)"></div>
                  <div class="delete-icon"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Отчеты -->
    <div
      class="document-content"
      v-if="this.userItemID == 2 && this.isAdmin == true"
    >
      <h1>Hello doc</h1>
    </div>
    <!-- Статистика -->
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
import MySelect from "../UI/MySelect.vue";
export default {
  components: { MyInput, MyButton, MySelect },
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
    return {
      tables: ["Пользователи", "Записи", "Транспорт", "Станции"],
      currentTable: [],
      isModalOpen: false,
      modalEdit: false,
      editObj: {},
      station: [
        {
          stationID: 1,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 2,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 3,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 4,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 5,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 6,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 7,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 8,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 9,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 10,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 11,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
        {
          stationID: 12,
          name: "Elcar",
          adress: "Kharkiv 22 A",
          description: "Best Station in Kharkiv",
        },
      ],
      users: [
        {
          userID: 1,
          name: "Alexey",
          surname: "Trofimneko",
          number: "+38092342342",
          email: "master222@gmail.com",
          birthday: "18.10.2001",
          isActive: "Active",
        },
        {
          userID: 2,
          name: "Alexey",
          surname: "Trofimneko",
          number: "+38092342342",
          email: "master222@gmail.com",
          birthday: "18.10.2001",
          isActive: "Active",
        },
        {
          userID: 3,
          name: "Alexey",
          surname: "Trofimneko",
          number: "+38092342342",
          email: "master222@gmail.com",
          birthday: "18.10.2001",
          isActive: "Active",
        },
      ],
    };
  },
  methods: {
    changeTable() {
      let table = document.getElementById("selectTableDB").value;

      switch (table) {
        case "Станции":
          this.currentTable = this.station;
          break;
        case "Пользователи":
          this.currentTable = this.users;
          console.log(this.currentTable);
          break;
        default:
          this.currentTable = this.station;
      }
    },
    activeAddModal() {
      this.isModalOpen = !this.isModalOpen;
      this.modalEdit = false;
    },
    activeEditModal(elem) {
      this.editObj = elem;
      this.isModalOpen = !this.isModalOpen;
      this.modalEdit = true;
    },
    closeModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    findObjOnId(id) {
      this.currentTable.forEach(element => {
        if (element.idItem == id) {
          // return element;
          // console.log(element);
        }
      });
    }
  },
  mounted: function() {
    this.changeTable();
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

/* ===== Интерфейс админа ===== */

/* Таблицы контент */

.tables-content {
  padding: 0 10px;
}

.table-head-content {
  text-align: center;
  margin-bottom: 30px;
}

.table-head-content h2 {
  font-weight: bold;
  font-size: 20px;
}

.tables-content .control-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.control-left-panel {
  width: 80%;
  display: flex;
}

.tables-content .control-panel select {
  flex-basis: 35%;
  background: #4599f5;
  outline: none;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-right: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.tables-content .control-panel input {
  flex-basis: 65%;
  height: auto;
  text-align: left;
  padding-left: 10px;
  border-radius: 20px;
}

.table-row {
  text-align: center;
  border: 1px solid gray;
  box-shadow: 0px 0px 15px rgb(69 69 69 / 25%);
  border-radius: 10px;
}

.row-panel {
  width: 100px;
}

.row-control .edit-icon,
.row-control .delete-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.row-control {
  display: flex;
  justify-content: space-around;
  border-left: 1px solid gray;
  padding: 18px;
}

.row-control .edit-icon {
  background: url("../../assets/pancilIcon.png");
  background-size: cover;
  margin-right: 10px;
}

.row-control .edit-icon:hover {
  background: url("../../assets/edtiIconActive.png");
  background-size: cover;
}

.row-control .delete-icon {
  background: url("../../assets/delIcon.png");
  background-size: cover;
  margin-left: 10px;
}

.row-control .delete-icon:hover {
  background: url("../../assets/deleteIconActive.png");
  background-size: cover;
}

.table-grid {
  width: 100%;
  border-spacing: 0px 20px;
}

.table-head {
  color: gray;
}

.add-edit-modal .modal-window {
  height: auto !important;
}

.add-edit-modal .modal-window input {
  text-align: left;
  padding-left: 10px;
  margin-bottom: 10px;
}

.add-edit-modal .btn-container {
  display: flex;
  justify-content: center;
}

.mobile-row-headline {
  display: none;
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

@media screen and (max-width: 1000px) {
  /* Админ */
  /* Интерфейс таблиц */
  .table-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .table-head {
    display: none;
  }

  .table-row {
    flex-basis: calc((100% - 40px) / 3);
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  .table-row:nth-child(3n + 3) {
    margin-right: 0;
  }

  .row-panel {
    width: 100%;
  }

  .table-row .col {
    padding: 2px 10px;
  }

  .row-panel .row-control {
    border-left: none;
    border-top: 1px solid gray;
    padding-bottom: 0;
    margin-top: 10px;
  }
}

@media screen and (max-width: 872px) {
  /* Админ */
  /* Интерфейс таблиц */
  .table-body {
    justify-content: space-between;
  }
  .table-row {
    flex-basis: calc((100% - 30px) / 2);
    margin-right: 0;
  }
}

@media screen and (max-width: 840px) {
  /* Админ */
  /* Интерфейс таблиц */
  .control-panel {
    flex-direction: column;
  }

  .control-left-panel {
    margin-bottom: 10px;
    width: 100%;
  }

  .control-left-panel select,
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
}

@media screen and (max-width: 480px) {
  /* Админ */
  /* Интерфейс таблиц */
  .table-row {
    flex-basis: 100%;
  }
}

@media screen and (max-width: 430px) {
  .welcoming-image {
    height: 130px;
  }

  /* Админ */
  /* Интерфейс таблиц */

  .tables-content {
    padding: 0;
  }
  .control-left-panel {
    flex-direction: column;
  }

  .control-left-panel select {
    margin-bottom: 10px;
  }

  .add-edit-modal {
    width: 300px !important;
  }
}
</style>
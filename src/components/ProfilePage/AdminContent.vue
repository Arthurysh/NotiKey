<template>
  <!-- Форма добавления/Редактирования -->
  <my-modal @close="closeModal()" class="add-edit-modal" v-if="isModalOpen">
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
          @change="this.editObj[property] = $event.target.value"
        ></my-input>
      </div>
      <div class="btn-container" v-show="!modalEdit">
        <my-button class="add-table-note-btn" @click.prevent="getAddModelInput()">Добавить</my-button>
      </div>
      <div class="btn-container" v-show="modalEdit">
        <my-button class="add-table-note-btn" @click.prevent="updateIdStation(editObj)">Сохранить</my-button>
      </div>
    </div>
  </my-modal>

  <!-- Таблицы -->
  <div
    class="table-content"
    v-if="this.userItemID == 1 && this.userRole == 'Admin'"
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
                <div class="delete-icon" @click.prevent="deleteIdStation(elem)" ></div>
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
    v-if="this.userItemID == 2 && this.userRole == 'Admin'"
  >
    <div class="document-head-content">
      <h2>Отчеты</h2>
    </div>
    <div class="documents-content">
      <div class="up-line">
        <button class="doc-block earning-block">
          <p>Зароботок</p>
        </button>
        <button class="doc-block new-user-block">
          <p>Новые пользователи</p>
        </button>
      </div>
      <div class="down-line">
        <button class="doc-block new-station-block">
          <p>Новые СТО</p>
        </button>
        <button class="doc-block earning-from-station">
          <p>Зароботок с CТО</p>
        </button>
      </div>
    </div>
  </div>
  <!-- Статистика -->
  <div
    class="statistic-content"
    v-if="this.userItemID == 3 && this.userRole == 'Admin'"
  >
    <div class="statistic-head-content">
      <h2>Статистика</h2>
    </div>

    <div class="chart-content">
      <div class="wrap-chart">
        <h2>Количество новых сто</h2>
        <div class="pie-chart chart-diagramm">
          <pie-chart :dataChart="statisticData1"></pie-chart>
        </div>
      </div>

      <div class="wrap-chart">
        <h2>Приток пользователей</h2>
        <div class="bar-chart chart-diagramm">
          <bar-chart :dataChart="statisticData2"></bar-chart>
        </div>
      </div>

      <div class="wrap-chart">
        <h2>Заработок компании</h2>
        <div class="line-chart chart-diagramm" style="width: 100%">
          <line-chart :dataChart="statisticData3"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/ProfilePage/AdminCharts/PieChart.vue";
import BarChart from "@/components/ProfilePage/AdminCharts/BarChart.vue";
import LineChart from "@/components/ProfilePage/AdminCharts/LineChart.vue";
import Station from "@/apis/Station"

export default {
  components: { PieChart, BarChart, LineChart },
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
      statisticData1: [12, 19, 3, 5, 2, 3, 8],
      statisticData2: [13, 9, 12, 20, 22, 20, 24],
      statisticData3: [300, 215, 300, 500, 803, 580, 1004],
      tables: ["Пользователи", "Записи", "Транспорт", "Станции"],
      currentTable: [],
      isModalOpen: false,
      modalEdit: false,
      editObj: {},
      station: this.getStation(),
    };
  },
  methods: {
     deleteIdStation(elem) {
      let elemId;

      switch (document.getElementById("selectTableDB").value) {
        case "Пользователи": 
        this.elemId = elem.id; 
        break;
        case "Станции": 
        this.elemId = elem.stationID; 
        break;
        case "Записи": 
        this.elemId = elem.notesID; 
        break;
        case "Транспорт": 
        this.elemId = elem.carsID; 
        break;
      }  
      let idElementSection = {
         Id: this.elemId,
       };
       Station.delete(idElementSection);
    },

     updateIdStation(editObj) {
     Station.editStation(editObj);    
      },

    async getStation() {
      await Station.viewList().then(response => {
      this.station = response.data;
     });
    },
    updateStationData() {
      this.getStation()
    },
    getAddModelInput() {
      let addObject = {}
       for (const key in this.currentTable[0]) {
         let inputId = key + "Input";
         addObject[key] = document.getElementById(inputId).value;
       }
       this.closeModal();
       Station.createStation(addObject);
    },

    changeTable() {
      if (this.userRole == "Admin") {
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
      this.currentTable.forEach((element) => {
        if (element.idItem == id) {
          // return element;
          // console.log(element);
        }
      });
    },
  },
  mounted: function () {
    this.changeTable();
  },
};
</script>

<style>
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

.add-input-wrap input, .add-input-wrap select {
  width: 100%;
}
.modal-head {
  font-weight: bold;
  margin-bottom: 20px;
}

.add-edit-modal .btn-container {
  display: flex;
  justify-content: center;
}

.mobile-row-headline {
  display: none;
}

/* Отчеты контент */

.document-head-content {
  text-align: center;
  margin-bottom: 75px;
}

.doc-block {
  width: 40%;
  height: 200px;
  border-radius: 10px;
  position: relative;
  background: red;
  border: none;
  cursor: pointer;
}

.doc-block p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}

.documents-content .up-line,
.documents-content .down-line {
  display: flex;
  justify-content: space-around;
}

.documents-content .up-line {
  margin-bottom: 50px;
}

.earning-block {
  background: #e28d8d;
}

.new-user-block {
  background: #7ac4ee;
}

.new-station-block {
  background: #9ad8c9;
}

.earning-from-station {
  background: #ffcb7d;
}
/* Статистика */
.chart-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 30px;
}
.wrap-chart {
  flex-basis: 45%;
  background: transparent;
}
.wrap-chart:last-child {
  margin-top: 25px;
  flex-basis: 100%;
}
.wrap-chart:last-child .canv-chart {
  height: 290px;
}
.wrap-chart h2 {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 20px;
  color: #747474;
  text-align: center;
}
.chart-diagramm {
  padding: 30px;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 25px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 25px 0px rgba(34, 60, 80, 0.2);
  border-radius: 15px;
}

.statistic-head-content {
  text-align: center;
  margin-bottom: 28px;
}

@media screen and (max-width: 1060px) {
  .chart-content {
    flex-direction: column;
  }

  .wrap-chart {
    width: 100%;
  }

  .wrap-chart:first-child {
    margin-bottom: 25px;
  }
}

@media screen and (max-width: 600px) {
  .chart-content {
    padding: 0 5px;
  }
  .wrap-chart div {
    padding: 6px;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 8px 0px rgb(34 60 80 / 20%);
  }
  .wrap-chart h2 {
    font-size: 12px;
    margin-bottom: 15px;
  }

  .wrap-chart {
    margin-bottom: 15px !important;
  }

  .wrap-chart:last-child .canv-chart {
    height: 240px;
  }
  .wrap-chart:last-child {
    margin-top: 15px;
  }

  .statistic-head-content h2 {
    font-size: 16px;
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

  /* Интерфейс отчетов */
  .doc-block p {
    font-size: 16px;
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

  .control-left-panel select, .control-left-panel input {
    flex-basis: 50%;
  }
}

@media screen and (max-width: 650px) {
  .documents-content .up-line,
  .documents-content .down-line {
    flex-direction: column;
  }

  .doc-block {
    width: 100%;
    height: 130px;
    margin-bottom: 20px;
  }

  .documents-content .up-line {
    margin-bottom: 0;
  }

  .document-head-content {
    margin-bottom: 40px;
  }

  .document-head-content h2 {
    font-size: 16px;
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
  /* Админ */
  /* Интерфейс таблиц */

  .tables-content {
    padding: 0;
  }
  .control-left-panel {
    flex-direction: column;
  }

  .tables-content .control-left-panel select {
    margin-bottom: 10px;
    margin-right: 0;
  }

  .add-edit-modal {
    width: 300px !important;
  }
}
</style>
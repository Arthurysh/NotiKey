<template>
  <div class="menu">
    <div class="head-menu"><p>Меню</p></div>
    <div class="menu-items">
      <div class="user-menu" v-if="this.userRole == 'User'">
        <div
          class="menu-item"
          @click="disableItemsMenu(elem)"
          v-for="elem in arrMenuItemsUser"
          :key="elem"
        >
          <div
            class="main-menu-item"
            v-if="elem.idItem < this.arrMenuItemsUser.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/profileMenuIcon/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ elem.text }}</p>
            </div>
          </div>
          <div
            class="wrap-out-item"
            @click="logout"
            v-if="elem.idItem == this.arrMenuItemsUser.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/profileMenuIcon/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ elem.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-menu" v-if="this.userRole == 'Admin'">
        <div
          class="menu-item"
          @click="disableItemsMenu(elem)"
          v-for="elem in arrMenuItemsAdmin"
          :key="elem"
          v-bind:class="{ activeMenuItem: elem.isActive }"
        >
          <div
            class="main-menu-item"
            v-if="elem.idItem < this.arrMenuItemsAdmin.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/profileMenuIcon/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ elem.text }}</p>
            </div>
          </div>
          <div
            class="wrap-out-item"
            @click="$router.push('/')"
            v-if="elem.idItem == this.arrMenuItemsAdmin.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/profileMenuIcon/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ elem.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="manager-menu" v-if="this.userRole == 'Manager'">
        <div
          class="menu-item"
          @click="disableItemsMenu(elem)"
          v-for="elem in arrMenuItemsManager"
          :key="elem"
          v-bind:class="{ activeMenuItem: elem.isActive }"
        >
          <div
            class="main-menu-item"
            v-if="elem.idItem < this.arrMenuItemsManager.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/profileMenuIcon/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ elem.text }}</p>
            </div>
          </div>
          <div
            class="wrap-out-item"
            @click="$router.push('/')"
            v-if="elem.idItem == this.arrMenuItemsManager.length"
            v-bind:class="{ activeMenuItem: elem.isActive }"
          >
            <div
              class="icon-block-menu-item"
              :style="{ 'background-color': elem.color }"
            >
              <div class="menu-icon-wrap">
                <img
                  :src="require('@/assets/profileMenuIcon/' + elem.icon)"
                  alt=""
                />
              </div>
            </div>
            <div class="text-block">
              <p>{{ elem.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/apis/User';

export default {
  props: {
    userRole: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      arrMenuItemsUser: [
        {
          idItem: 1,
          icon: "userIcon.png",
          text: "Профиль",
          color: "#6A69E0",
          isActive: true,
        },
        {
          idItem: 2,
          icon: "noteIcon.png",
          text: "Записи",
          color: "#54A5DE",
          isActive: false,
        },
        {
          idItem: 3,
          icon: "carIcon.png",
          text: "Транспорт",
          color: "#AB4DC1",
          isActive: false,
        },
        {
          idItem: 4,
          icon: "discountIcon.png",
          text: "Скидки",
          color: "#E79436",
          isActive: false,
        },
        {
          idItem: 5,
          icon: "outIcon.png",
          text: "Выход",
          color: "#EA7778",
          isActive: false,
        },
      ],
      arrMenuItemsAdmin: [
        {
          idItem: 1,
          icon: "userIcon.png",
          text: "Таблицы",
          color: "#6A69E0",
          isActive: true,
        },
        {
          idItem: 2,
          icon: "noteIcon.png",
          text: "Отчеты",
          color: "#54A5DE",
          isActive: false,
        },
        {
          idItem: 3,
          icon: "carIcon.png",
          text: "Статистика",
          color: "#AB4DC1",
          isActive: false,
        },
        {
          idItem: 4,
          icon: "outIcon.png",
          text: "Выход",
          color: "#EA7778",
          isActive: false,
        },
      ],
      arrMenuItemsManager: [
        {
          idItem: 1,
          icon: "userIcon.png",
          text: "Пользователи",
          color: "#6A69E0",
          isActive: true,
        },
        {
          idItem: 2,
          icon: "noteIcon.png",
          text: "Записи",
          color: "#54A5DE",
          isActive: false,
        },
        {
          idItem: 3,
          icon: "discountIcon.png",
          text: "Скидки",
          color: "#AB4DC1",
          isActive: false,
        },
        {
          idItem: 4,
          icon: "outIcon.png",
          text: "Выход",
          color: "#EA7778",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    disableItemsMenu(elem) {
      let itemMenuID = elem.idItem;
      this.$emit("activateItemMenu", itemMenuID);
      if (this.userRole == "Admin") {
        this.arrMenuItemsAdmin.forEach((element) => {
          if (element.idItem != elem.idItem) {
            element.isActive = false;
          } else {
            element.isActive = true;
          }
        });
      } else if (this.userRole == "User") {
        this.arrMenuItemsUser.forEach((element) => {
          if (element.idItem != elem.idItem) {
            element.isActive = false;
          } else {
            element.isActive = true;
          }
        });
      } else if (this.userRole == "Manager") {
          this.arrMenuItemsManager.forEach((element) => {
          if (element.idItem != elem.idItem) {
            element.isActive = false;
          } else {
            element.isActive = true;
          }
        });
      }
    },
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("auth");

        this.$router.push('/');
      })
    },
  },
};
</script>

<style>
.menu {
  display: flex;
  flex-direction: column;
}

.head-menu {
  color: #005dcf;
  font-size: 15px;
  margin-bottom: 18px;
  padding-left: 15px;
}

.menu-item {
  border-radius: 8px;
}

.main-menu-item,
.wrap-out-item {
  padding: 15px;
  color: #747474;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
}

.icon-block-menu-item {
  width: 35px;
  height: 35px;
  border-radius: 12px;
  position: relative;
  margin-right: 17px;
}

.icon-block-menu-item .menu-icon-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-icon-wrap {
  width: 20px;
  height: 20px;
}

.menu-icon-wrap img {
  max-height: 100%;
  max-width: 100%;
}

.activeMenuItem {
  background: #8bc2ff;
  color: #fff;
}

@media screen and (max-width: 700px) {
  .menu-item .text-block {
    display: none;
  }

  .icon-block-menu-item {
    margin-right: 0;
  }

  .head-menu {
    text-align: center;
    padding-left: 0;
  }
}

@media screen and (max-width: 430px) {
  .main-menu-item,
  .wrap-out-item {
    padding: 10px;
  }
}
</style>
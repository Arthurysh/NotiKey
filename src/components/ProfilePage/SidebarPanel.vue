<template>
  <div class="sidebar-container">
    <div class="bread-crumbs">
      <div class="bread-crumb back-main-page">
        <router-link to="/">
        <img src="@/assets/backArrowProfile.png" alt="" />
          <a class="on-main-link" href="#">На главную</a>
          </router-link>
      </div>
    </div>
    <div class="user-profile-block">
      <div class="user-image">
        <img src="@/assets/testUserPhoto.png" alt="" />
      </div>
      <div class="user-info-block">
        <p class="user-name">{{ this.user.name }} {{ this.user.surname }}</p>
        <p class="user-email">{{ this.user.email }}</p>
      </div>
    </div>
    <sidebar-menu
      :userRole="userRole"
      @activateItemMenu="sendActiveItemId"
    ></sidebar-menu>
  </div>
</template>

<script>
import User from "@/apis/User";

import SidebarMenu from "@/components/ProfilePage/SidebarMenu.vue";

export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  components: { SidebarMenu },
  props: {
    userRole: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    }
  },
  methods: {
    sendActiveItemId(itemMenuID) {
      this.$emit("activatedId", itemMenuID);
    },
  },
  
};
</script>

<style scoped>
a {
  color: #000;
}

.bread-crumbs {
  margin-bottom: 36px;
}

.bread-crumbs,
.user-profile-block {
  padding-left: 15px;
}

.user-profile-block {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.user-profile-block .user-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
}

.user-profile-block .user-image {
  margin-right: 12px;
  width: 60px;
  height: 60px;
  border: 3px solid #000;
  border-radius: 50%;
  overflow: hidden;
}

.user-profile-block .user-image img {
  max-width: 100%;
  max-height: 100%;
}

.user-profile-block .user-email {
  font-size: 16px;
  text-decoration: underline;
}

.back-main-page {
  align-items: center;
  display: flex;
}

.back-main-page img {
  width: 10px;
  margin-right: 8px;
  transition: all 0.5s ease;
  left: 0px;
}

.back-main-page:hover img {
  position: relative;
  left: -4px;
}

@media screen and (max-width: 1120px) {
  .user-profile-block .user-image {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .user-profile-block .user-name {
      text-align: center;
      font-size: 12px;
  }

  .user-profile-block .user-email {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  .bread-crumbs,
  .user-profile-block {
    padding-left: 0;
  }

  .bread-crumbs .back-main-page .on-main-link {
    display: none;
  }

  .bread-crumbs .back-main-page img {
    width: 16px;
  }

  .bread-crumbs .back-main-page {
    justify-content: center;
  }
}

@media screen and (max-width: 430px) {
  .user-profile-block .user-image {
    width: 55px;
    height: 55px;
  }

  .user-profile-block .user-name {
    font-size: 10px;
  }
}
</style>
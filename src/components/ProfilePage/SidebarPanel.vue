<template>
  <div class="sidebar-container">
    <div class="bread-crumbs">
      <div class="bread-crumb back-main-page">
        <img src="@/assets/backprofileArrow.png" alt="" />
        <a href="#">На главную</a>
      </div>
    </div>
    <div class="user-profile-block">
      <div class="user-image">
        <img src="@/assets/testUserPhoto.png" alt="" />
      </div>
      <div class="user-info-block">
        <p class="user-name">Alexey</p>
        <p class="user-email">master2021@gmail.com</p>
      </div>
    </div>
    <sidebar-menu :isAdmin="isAdminAcc" @activateItemMenu="sendActiveItemId"></sidebar-menu>
  </div>
</template>

<script>
import SidebarMenu from "@/components/ProfilePage/SidebarMenu.vue";
export default {
  components: { SidebarMenu },
  props: {
    isAdminAcc: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    sendActiveItemId(itemMenuID) {
      this.$emit('activatedId', itemMenuID);
    }
  }
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
  font-size: 18px;
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

.back-main-page img {
  margin-right: 8px;
  transition: all 0.5s;
  left:0px;
}

.back-main-page:hover img {
  position: relative;
  left: -3px;
}
</style>
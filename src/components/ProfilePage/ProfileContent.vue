<template>
  <div class="profile-container">
    <!-- Интерфейсы пользователя -->
    <user-content @updateUserData="sendEventUserDataUpdate()" :userItemID="userItemID" :userRole="userRole" :user="user"></user-content>
    <!-- Интерфейсы администратора -->
    <admin-content
      :userItemID="userItemID"
      :userRole="userRole"
    ></admin-content>
    <!-- Интерфейсы менеджера -->
    <manager-content
      :userItemID="userItemID"
      :userRole="userRole"
    ></manager-content>
  </div>
</template>

<script>
import AdminContent from "@/components/ProfilePage/AdminContent";
import UserContent from "@/components/ProfilePage/UserContent";
import ManagerContent from "@/components/ProfilePage/ManagerContent";
export default {
  components: {
    AdminContent,
    UserContent,
    ManagerContent,
  },
  props: {
    userItemID: {
      type: Number,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {};
  },
  methods: {
    sendEventUserDataUpdate() {
      this.$emit("updateUserData");
    }
  },
};
</script>

<style>
</style>
<template>
  <div class="profile-container">
    <!-- Интерфейсы пользователя -->
    <user-content :userItemID="userItemID" :isAdmin="isAdmin"></user-content>
    <!-- Интерфейсы администратора -->
    <admin-content :userItemID="userItemID" :isAdmin="isAdmin"></admin-content>
    <!-- Интерфейсы менеджера -->
    <manager-content></manager-content>
  </div>
</template>

<script>
import AdminContent from '@/components/ProfilePage/AdminContent';
import UserContent from '@/components/ProfilePage/UserContent';
import ManagerContent from '@/components/ProfilePage/ManagerContent';
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
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
};
</script>

<style>
</style>
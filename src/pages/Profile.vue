<template>
  <div class="profile">
    <sidebar-panel
      :userRole="userRole"
      @activatedId="outArr"
      class="sidebar"
    ></sidebar-panel>
    <div class="divider"></div>
    <profile-content
      :userRole="userRole"
      :userItemID="idCurrentItem"
      class="profile-content"
    ></profile-content>
  </div>
</template>

<script>
import SidebarPanel from "@/components/ProfilePage/SidebarPanel.vue";
import ProfileContent from "@/components/ProfilePage/ProfileContent.vue";
export default {
  components: { SidebarPanel, ProfileContent },
  data() {
    return {
      userRole: "Admin",
      idCurrentItem: 1,
    };
  },
  methods: {
    outArr(itemMenuID) {
      this.idCurrentItem = itemMenuID;
    },
  },
};
</script>

<style>
.profile {
  padding: 20px;
  display: flex;
  height: 100vh;
}

.sidebar {
  flex-basis: 20%;
  padding-right: 20px;
  position: relative;
}

.profile-content {
  flex-basis: 100%;
  overflow: scroll;
}

.divider {
  height: 95%;
  width: 1px;
  background: #c4c4c4;
  margin: auto 20px;
}

@media screen and (max-width: 1120px) {
  .sidebar {
    padding-right: 0;
    flex-basis: 5%;
  }
}

@media screen and (max-width: 700px) {
  .divider {
    height: 100%;
  }
}

@media screen and (max-width: 430px) {
  .profile {
    padding: 20px 20px 20px 10px;
  }

  .divider {
    margin: 0;
    margin-right: 20px;
    margin-left: 10px;
  }
}

@media screen and (max-width: 330px) {
  .profile {
    padding: 20px 10px 20px 10px;
  }

  .divider {
    margin: 0;
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>
<template>
<div class="profile">
  <sidebar-panel :isAdminAcc="isAdminRole" @activatedId="outArr" class="sidebar"></sidebar-panel>
  <div class="divider"></div>
  <profile-content :isAdmin="isAdminRole" :userItemID="idCurrentItem" class="profile-content"></profile-content>
</div>
</template>

<script>
import SidebarPanel from '@/components/ProfilePage/SidebarPanel.vue'
import ProfileContent from '@/components/ProfilePage/ProfileContent.vue'
export default {
  components: { SidebarPanel, ProfileContent },
  data() {
    return {
      isAdminRole: false,
      idCurrentItem: 1,
    }
  },
  methods: {
    outArr(itemMenuID) {
      this.idCurrentItem = itemMenuID;
    }
  }
}
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
  flex-basis: 80%;
}

.divider {
    height: 95%;
    width: 1px;
    background: #C4C4C4;
    margin: auto 20px;
}

</style>
<template>
  <div class="modal-wrap">
    <div @click="closeModal()" class="cover-block-modal"></div>
    <div class="modal-window">
      <span class="close-btn" @click="closeModal()">
        <img src="@/assets/closeIconBlack.png" alt="" />
      </span>
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-modal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.cover-block-modal {
  position: fixed;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 40%);
  z-index: 999;
}

.modal-window {
  position: fixed;
  width: 50%;
  height: 350px;
  background: #fff;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 30px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.close-btn img {
  max-width: 100%;
  max-height: 100%;
}

@media screen and (max-width: 830px) {
    .modal-window {
        width: 80%;
    }
}

@media screen and (max-width: 430px) {
    .modal-window {
        width: 90%;
        padding: 20px;
    }
}
</style>
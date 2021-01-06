<template>
  <div>
    <b-modal
      id="modal"
      :no-close-on-backdrop="true"
      ref="modal"
      @hide="closeModal"
      hide-header
      hide-footer
      centered
    >
      <div class="container">
        <slot></slot>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "Modal",
  methods: {
    closeModal() {
      this.$refs["modal"].hide();
    }
  },
  mounted() {
    this.$refs["modal"].show();
  }
};
</script>
<style lang="scss" scoped>
#modal {
  display: flex;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<template>
  <div>
    <Modal v-if="isGameStart">
      <div>Rules:</div>
      <button class="mt-3" @click="isGameStart = false">Play tha game</button>
    </Modal>
    <Modal v-if="isGameOver">
      <button class="mt-3" @click="isGameOver = false">Play again</button>
    </Modal>
    <Game />
  </div>
</template>
<script>
import Modal from "../components/Modal";
import Game from "../components/Game";
export default {
  name: "GameContainer",
  components: {
    Modal,
    Game
  },
  data() {
    return {
      isGameStart: false,
      isGameOver: false
    };
  }
};
</script>
<style lang="scss" scoped></style>

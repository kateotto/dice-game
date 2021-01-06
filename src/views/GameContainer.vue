<template>
  <div>
    <Modal v-if="isGameStart">
      <div>Rules:</div>
      <button class="mt-3" @click="isGameStart = false">Play tha game</button>
    </Modal>
    <Modal v-if="isGameOver">
      <div>Game status: {{ gameStat.status }}</div>
      <div v-if="gameStat.status == 'win'">CONGRATULATION!</div>
      <div v-else>
        <div>All points: {{ gameStat.gamePoints }}</div>
        <div>Your points: {{ gameStat.userPoints }}</div>
      </div>
      <button
        class="mt-3"
        @click="
          isGameOver = false;
          game = game + 1;
        "
      >
        Play again
      </button>
    </Modal>
    <Game @gameover="setGameover" :reload="game" />
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
      isGameOver: false,
      game: 0,
      gameStat: {}
    };
  },
  methods: {
    setGameover(data) {
      this.isGameOver = true;
      console.log(data);
      this.gameStat = data;
    }
  }
};
</script>
<style lang="scss" scoped></style>

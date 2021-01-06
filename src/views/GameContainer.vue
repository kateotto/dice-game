<template>
  <div>
    <Modal v-if="isGameStart">
      <h3>Rules:</h3>
      <ol>
        <li>
          You have 5 dices
        </li>
        <li>You have only 3 throws</li>
        <li>
          On each throw, you may choose any number o dices, which won't be used
          in the next throw
        </li>
        <li>Numbers from dices are summed</li>
        <li>
          You win if achieve the same number of points as the number drawn at
          the start of the game
        </li>
      </ol>
      <button class="mt-3 button" @click="isGameStart = false">
        Play tha game
      </button>
    </Modal>
    <Modal v-if="isGameOver">
      <div class="text-center">
        Game status: <br />
        <span class="highlight">{{ gameStat.status }}</span>
      </div>
      <div v-if="gameStat.status !== 'win'" class="highlight__win">
        CONGRATULATION!
      </div>
      <div v-else>
        <div>All points: {{ gameStat.gamePoints }}</div>
        <div>Your points: {{ gameStat.userPoints }}</div>
      </div>
      <button
        class="mt-3 button"
        @click="
          isGameOver = false;
          game = game + 1;
        "
      >
        Play again
      </button>
    </Modal>
    <Game v-if="!isGameStart" @gameover="setGameover" :reload="game" />
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
      isGameStart: true,
      isGameOver: false,
      game: 0,
      gameStat: {}
    };
  },
  methods: {
    setGameover(data) {
      setTimeout(() => {
        this.gameStat = data;
        this.isGameOver = true;
      }, 1500);
    }
  }
};
</script>
<style lang="scss" scoped>
.button {
  border: none;
  background: #1d976c; /* fallback for old browsers */
  padding: 15px 8px;
  border-radius: 25px;
  outline: transparent;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}

.highlight {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;

  &__win {
    font-size: 22px;
    letter-spacing: 0.75px;
    color: #1d976c;
    font-weight: bold;
  }
}
</style>

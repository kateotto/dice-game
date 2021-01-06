<template>
  <div>
    <div class="container" v-if="isGameLoaded">
      <div v-if="throwNumber < 4">Throw number: {{ throwNumber }}</div>
      <div v-else>throwNumber: 3</div>
      <div>Points to win game: {{ gamePoints }}</div>
      <div>Your points: {{ userPoints }}</div>
      <div v-if="dicesLeft > 0">
        How many dices would you like to use in this throw?
      </div>
      <div v-else>You had used all dices</div>
      <div>
        <select
          name="dices"
          id="dices"
          v-model="selectedDices"
          class="mt-2"
          v-if="dicesLeft > 0"
        >
          <option v-for="(n, key) in dicesLeft" :key="key" :value="key + 1">{{
            key + 1
          }}</option>
        </select>
      </div>
      <button
        v-if="dicesLeft > 0 && this.throwNumber < 4"
        @click="trowDices()"
        class="mt-3"
      >
        THROW THE DICES
      </button>
      <div class="container__image mt-3" v-if="this.dicesArr.length">
        <div v-for="(n, key) in dicesArr" :key="key">
          <img :src="url + n + '.png'" :alt="'Dice ' + n" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "GameContainer",
  props: {
    reload: Number
  },
  data() {
    return {
      throwNumber: 1,
      gamePoints: 0,
      userPoints: 0,
      dicesLeft: 5,
      dicesArr: [],
      selectedDices: 1,
      url: "http://roll.diceapi.com/images/poorly-drawn/d6/",
      isGameLoaded: false,
      gameStatus: ""
    };
  },
  methods: {
    trowDices() {
      this.dicesLeft = this.dicesLeft - this.selectedDices;
      console.log("throw");
      this.drawDiceNumber();
    },
    drawDiceNumber() {
      axios
        .get(
          this.$apiUrl +
            `num=${this.selectedDices}&min=1&max=6&col=${this.selectedDices}&base=10&format=plain&rnd=new`
        )
        .then(({ data }) => {
          let arr = [];
          this.dicesArr = [];
          // console.log(arr);
          // console.log(data.length);
          if (data.length > 3) {
            arr = data.split("");
            console.log(arr);
            arr.map((x, index) => {
              if (index % 2 === 0) {
                this.dicesArr.push(parseInt(x));
              }
            });
            console.log(this.dicesArr);
            const p = this.dicesArr.reduce((a, b) => {
              return a + b;
            });
            this.userPoints = this.userPoints + p;
          } else {
            console.log(typeof data);
            this.userPoints = this.userPoints + data;
            this.dicesArr.push(data);
          }
          this.selectedDices = 1;
          this.throwNumber = this.throwNumber + 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async drawPointsSum() {
      await axios
        .get(
          this.$apiUrl +
            "num=1&min=10&max=30&col=1&base=10&format=plain&rnd=new"
        )
        .then(({ data }) => {
          this.isGameLoaded = false;
          this.gamePoints = data;
          this.isGameLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sumGame() {
      this.gamePoints - this.userPoints == 0
        ? (this.gameStatus = "win")
        : (this.gameStatus = "lose");
      const data = {
        status: this.gameStatus,
        userPoints: this.userPoints,
        gamePoints: this.gamePoints,
        dicesLeft: this.dicesLeft
      };
      this.$emit("gameover", data);
    }
  },

  created() {
    this.drawPointsSum();
  },
  watch: {
    throwNumber: function() {
      if (this.throwNumber > 3) {
        console.log("game over");
        this.sumGame();
      }
    },
    dicesLeft: function() {
      if (this.dicesLeft === 0) {
        console.log("game over");
        this.sumGame();
      }
    },
    userPoints: function() {
      if (this.userPoints > this.gamePoints) {
        console.log("game over");
        this.sumGame();
      }
    },
    reload: function() {
      this.throwNumber = 1;
      this.userPoints = 0;
      this.dicesLeft = 5;
      this.dicesArr = [];
      this.drawPointsSum();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__image {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
      border-radius: 15px;
    }
  }
}
</style>

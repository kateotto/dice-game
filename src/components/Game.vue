<template>
  <div>
    <div class="container" v-if="isGameLoaded">
      <div v-if="throwNumber < 4">Throw number: {{ throwNumber }}</div>
      <div v-else>Throw number: 3</div>
      <div>Points to win the game: {{ gamePoints }}</div>
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
        class="mt-4 button"
      >
        THROW THE DICES
      </button>
      <div class="container__image mt-3" v-if="this.dicesArr.length">
        <div v-for="(n, key) in dicesArr" :key="key">
          <img :src="url + n + '.png'" :alt="'Dice ' + n" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="spinner">
        <div v-for="(el, key) in 3" :key="key" :class="bounce + el"></div>
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
          if (data.length > 3) {
            arr = data.split("");
            arr.map((x, index) => {
              if (index % 2 === 0) {
                this.dicesArr.push(parseInt(x));
              }
            });
            const p = this.dicesArr.reduce((a, b) => {
              return a + b;
            });
            this.userPoints = this.userPoints + p;
          } else {
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
        this.sumGame();
      }
    },
    dicesLeft: function() {
      if (this.dicesLeft === 0) {
        this.sumGame();
      }
    },
    userPoints: function() {
      if (this.userPoints > this.gamePoints) {
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
  background-color: #fff;
  padding: 30px;
  height: 60vh;
  font-size: 18px;
  box-shadow: 2px 2px 50px #0005;

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

#dices {
  width: 150px;
}

.spinner {
  margin: 100px auto 0;
  width: 100%;
  text-align: center;

  & > div {
    width: 25px;
    height: 25px;
    margin: 0 10px;
    background-color: #eee;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;

    & .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    & .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }
}
</style>

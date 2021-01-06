<template>
  <div>
    <div class="container">
      <div>Round: {{ round }}</div>
      <div>Points to win game: {{ gamePoints }}</div>
      <div>Your points: {{ userPoints }}</div>
      <div v-if="dicesLeft > 0">
        How many dices would you like to use in this round?
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
      <button v-if="dicesLeft > 0" @click="trowDices()" class="mt-3">
        THROW THE DICES
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "GameContainer",
  components: {},
  data() {
    return {
      round: 1,
      gamePoints: 0,
      userPoints: 0,
      dicesLeft: 5,
      dicesArr: [],
      selectedDices: 1
    };
  },
  methods: {
    trowDices() {
      console.log(this.selectedDices);
      this.dicesLeft = this.dicesLeft - this.selectedDices;
      this.drawDiceNumber();
    },
    async drawDiceNumber() {
      await axios
        .get(
          this.$apiUrl +
            `num=${this.selectedDices}&min=1&max=6&col=${this.selectedDices}&base=10&format=plain&rnd=new`
        )
        .then(({ data }) => {
          let arr = [];
          this.dicesArr = [];
          arr = data.split("");
          arr.map((x, index) => {
            if (index % 2 === 0) {
              this.dicesArr.push(parseInt(x));
            }
          });
          console.log(this.dicesArr);
          this.userPoints = this.dicesArr.reduce((a, b) => {
            return a + b;
          });
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
          console.log("drawPointsSum");
          console.log(data);
          this.gamePoints = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    this.drawPointsSum();
  },
  watch: {
    round: function() {}
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
}
</style>

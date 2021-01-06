<template>
  <div>
    <div class="text-center">Round: {{ round }}</div>
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
      gamePoints: 0
    };
  },
  methods: {
    async drawPointsSum() {
      console.log("draw points sum");
      await axios
        .get(
          this.$apiUrl +
            "num=1&min=10&max=50&col=1&base=10&format=plain&rnd=new"
        )
        .then(({ data }) => {
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
<style lang="scss" scoped></style>

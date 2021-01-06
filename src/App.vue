<template>
  <div id="app">
    <h1 class="text-center mt-5 mb-5">Dice game</h1>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0 auto;
  box-sizing: border-box;
  background: #1d976c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#app {
  height: 100vh;
}

h1 {
  color: #fff;
}
</style>

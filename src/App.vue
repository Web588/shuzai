<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0 auto;
  border: 0;
  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  overflow-x: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}
</style>

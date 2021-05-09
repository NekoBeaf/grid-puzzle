<template>
  <div id="app">
    <grid-puzzle />
  </div>
</template>

<script>
import GridPuzzle from "@/components/GridPuzzle";
export default {
  name: "App",
  components: {
    GridPuzzle,
  },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

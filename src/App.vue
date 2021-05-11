<template>
  <div id="app">
    <h1 class="text-3xl">Grid Puzzle</h1>
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

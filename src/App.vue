<template>
  <div id="app" class="container mx-auto">
    <h1 class="text-3xl">Grid Puzzle</h1>
    <select-image />
    <div class="grid grid-cols-3">
      <grid-puzzle ref="puzzle" class="col-span-2" />
      <mode ref="mode" @start="start" />
    </div>
  </div>
</template>

<script>
import GridPuzzle from "@/components/GridPuzzle";
import SelectImage from "@/components/SelectImage";
import Mode from "@/components/Mode";
export default {
  name: "App",
  components: {
    GridPuzzle,
    SelectImage,
    Mode,
  },
  data() {
    return {};
  },
  methods: {
    start(param) {
      this.$refs.puzzle.start(param);
    },
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
  width: 950px;
  min-width: 750px;
  margin-top: 30px;
}
</style>

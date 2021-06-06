<template>
  <div id="app" class="container mx-auto">
    <div id="content" class="container max-auto">
      <h1 class="text-3xl">Grid Puzzle</h1>
      <select-image ref="select" @select="select" />
      <div class="grid grid-cols-3">
        <grid-puzzle ref="puzzle" @clear="clear" class="col-span-2" />
        <mode ref="mode" @start="start" @quit="quit" />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import GridPuzzle from "@/components/GridPuzzle";
import SelectImage from "@/components/SelectImage";
import Mode from "@/components/Mode";
import AppFooter from "@/components/Footer";
export default {
  name: "App",
  components: {
    GridPuzzle,
    SelectImage,
    Mode,
    AppFooter,
  },
  data() {
    return {};
  },
  methods: {
    select(image) {
      this.$refs.puzzle.setImage(image);
    },
    start(param) {
      this.$refs.select.setStatus(true);
      this.$refs.puzzle.start(param);
    },
    quit() {
      this.$refs.select.setStatus(false);
      this.$refs.puzzle.quit();
    },
    clear() {
      this.$refs.select.setStatus(false);
      this.$refs.puzzle.clear();
      this.$refs.mode.clear();
    },
  },
};
</script>

<style>
html {
  background: #eee;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#content {
  width: 950px;
  min-width: 750px;
}
</style>

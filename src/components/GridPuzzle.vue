<template>
  <div>
    <div @click="test">image</div>
    <div id="container"></div>
    <div>
      cols:
      <input v-model="cols" placeholder="4" />
    </div>
    <div>
      rows:
      <input v-model="rows" placeholder="4" />
    </div>
    <div>
      divs:
      <input v-model="divs" placeholder="6" />
    </div>
    <div @click="generate">generate</div>
    <div class="grid">
      <grid-layout
        :layout.sync="layout"
        :col-num="colNum"
        :row-height="rowHeight"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[2, 2]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >
          <img :src="item.image" class="piece" />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import gridGenerator from "@/assets/js/gridGenerator";
import imagesGenerator from "@/assets/js/imagesGenerator";

export default {
  name: "GridPuzzle",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      cols: 4,
      rows: 4,
      divs: 6,
      colNum: 4,
      rowHeight: 51.7,
      gridData: [],
      layout: [
        { x: 0, y: 0, w: 1, h: 1, i: "0", image: "" },
        { x: 1, y: 0, w: 1, h: 1, i: "1", image: "" },
        { x: 2, y: 0, w: 1, h: 1, i: "2", image: "" },
        { x: 3, y: 0, w: 1, h: 1, i: "3", image: "" },
        { x: 0, y: 1, w: 1, h: 1, i: "4", image: "" },
      ],
    };
  },
  methods: {
    async test() {
      const result = await imagesGenerator.generate(
        require("@/assets/img/default1.jpg"),
        this.cols,
        this.rows,
        this.gridData
      );
      this.layout.forEach((item, index) => {
        this.$set(item, "image", result[index]);
      });
    },
    generate() {
      // TODO
      this.colNum = Number(this.cols);
      this.layout = gridGenerator.generate(this.cols, this.rows, this.divs);
      this.gridData = this.layout;
    },
  },
};
</script>

<style>
.grid {
  width: 500px;
  margin: auto;
  padding: 20px;
}
.vue-grid-item {
  background: gray;
  width: 100%;
}
img {
  padding: 1px;
  width: 100%;
}
</style>

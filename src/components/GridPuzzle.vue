<template>
  <div>
    <div @click="test">image</div>
    <div id="container"></div>
    <div>
      cols:
      <input type="number" v-model="cols" placeholder="4" />
    </div>
    <div>
      rows:
      <input type="number" v-model="rows" placeholder="4" />
    </div>
    <div>
      divs:
      <input type="number" v-model="divs" placeholder="6" />
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
          <img :src="item.image" />
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
      answer: [],
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
      // 分割した画像のパスを追加
      this.layout.forEach((item, index) => {
        this.$set(item, "image", result[index]);
      });
      // 正解データを保存
      this.answer = this.layout;
      // 新しい分割で再生成
      this.layout = gridGenerator.generate(this.cols, this.rows, this.divs);
      this.layout.forEach((item, index) => {
        this.$set(item, "image", result[index]);
      });
    },
    generate() {
      // TODO:validate
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
}
img {
  padding: 1px;
  width: 100%;
  height: 100%;
}
</style>

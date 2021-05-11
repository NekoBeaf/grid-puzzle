<template>
  <div>
    <div @click="makePuzzle">image</div>
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
        :margin="[0, 0]"
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
          @moved="checkLayout"
          @resized="checkLayout"
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
      rowHeight: 50,
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
    async makePuzzle() {
      const result = await imagesGenerator.generate(
        require("@/assets/img/default1.jpg"),
        this.cols,
        this.rows,
        this.gridData,
        { width: 500, height: 500 }
      );
      const images = result.images;
      this.rowHeight = result.rowHeight;
      console.log(this.rowHeight);
      // 分割した画像のパスを追加
      this.layout.forEach((item, index) => {
        this.$set(item, "image", images[index]);
      });
      // 正解データを保存
      this.answer = this.layout;
      // 新しい分割で再生成
      this.layout = gridGenerator.generate(this.cols, this.rows, this.divs);
      this.layout.forEach((item, index) => {
        this.$set(item, "image", images[index]);
      });
    },
    generate() {
      // TODO:validate
      this.colNum = Number(this.cols);
      this.layout = gridGenerator.generate(this.cols, this.rows, this.divs);
      this.gridData = this.layout;
    },
    checkLayout() {
      let judge = true;
      this.layout.forEach((item) => {
        const answer = this.answer.find((elem) => elem.image === item.image);
        if (
          item.x !== answer.x ||
          item.y !== answer.y ||
          item.w !== answer.w ||
          item.h !== answer.h
        ) {
          judge = false;
        }
      });
      if (judge) {
        alert("Congratulations!!");
      }
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
  width: 100%;
  height: 100%;
}
</style>

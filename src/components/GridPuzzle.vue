<template>
  <div
    class="imageView mx-auto pt-5"
    :style="[imageViewWidth, imageViewHeight]"
  >
    <div v-if="isRunning">
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
          <img :src="item.image" class="puzzle-piece" />
        </grid-item>
      </grid-layout>
    </div>
    <img v-else :src="image" class="mx-auto" />
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
      image: require("@/assets/img/default1.jpg"),
      isRunning: false,
      imageWidth: 500,
      imageHeight: 300,
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
    setImage(image) {
      this.image = image;
    },
    start(param) {
      this.colNum = param.cols;
      this.cols = param.cols;
      this.rows = param.rows;
      this.divs = param.divs;
      this.layout = gridGenerator.generate(param.cols, param.rows, param.divs);
      this.gridData = this.layout;
      this.makePuzzle();
      this.isRunning = true;
    },
    quit() {
      this.isRunning = false;
      this.imageWidth = 500;
      this.imageHeight = 300;
    },
    clear() {
      this.quit();
    },
    async makePuzzle() {
      const result = await imagesGenerator.generate(
        this.image,
        this.cols,
        this.rows,
        this.gridData,
        { width: 500, height: 300 }
      );
      const images = result.images;
      this.rowHeight = result.rowHeight;
      this.imageWidth = result.width;
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
        this.$emit("clear");
      }
    },
  },
  computed: {
    imageViewWidth() {
      return {
        "--width": this.imageWidth + "px",
      };
    },
    imageViewHeight() {
      return {
        "--height": this.imageHeight + "px",
      };
    },
  },
};
</script>

<style>
.imageView {
  --width: 500;
  width: var(--width);
  --height: 300;
  height: var(--height);
}
.vue-grid-item {
  background: gray;
}
.puzzle-piece {
  width: 100%;
  height: 100%;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>

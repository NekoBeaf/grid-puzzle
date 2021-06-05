<template>
  <div class="grid grid-cols-5 gap-4">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="mx-auto flex items-center h-20"
      :class="{ select: isSelected(index) }"
      @click="changeImage(index)"
    >
      <img :src="image" class="max-h-full" />
    </div>
    <div>
      <input type="file" name="custom-image" ref="preview" v-on:change="show" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectImage",
  mounted: function() {
    this.changeImage(0);
  },
  data() {
    return {
      isRunning: false,
      images: [
        require("@/assets/img/default1.jpg"),
        require("@/assets/img/default2.jpg"),
        require("@/assets/img/default3.jpg"),
      ],
      select: 0,
    };
  },
  methods: {
    changeImage(index) {
      if (!this.isRunning) {
        this.select = index;
        this.$emit("select", this.images[this.select]);
      }
    },
    setStatus(value) {
      this.isRunning = value;
    },
    show() {
      const file = this.$refs.preview.files[0];
      const url = URL.createObjectURL(file);
      this.$set(this.images, 3, url);
      this.changeImage(3);
    },
  },
  computed: {
    isSelected: function() {
      return function(index) {
        return index === this.select;
      };
    },
  },
};
</script>

<style scoped>
.select img {
  border: solid 3px red;
}
</style>

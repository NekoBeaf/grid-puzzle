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
    <label
      class="mx-auto flex items-center border-dotted border-4
              m-2 px-4 cursor-pointer"
      :class="onMouse ? 'border-blue-700 bg-blue-200' : 'border-gray-500'"
      @mouseover="onMouse = true"
      @mouseleave="onMouse = false"
      @dragenter="onMouse = true"
      @dragleave="onMouse = false"
      @dragover.prevent
      @drop.prevent="onDrop"
      >Upload
      <input
        type="file"
        accept="image/jpeg, image/png"
        name="custom-image"
        ref="preview"
        v-on:change="onSelect"
      />
    </label>
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
      onMouse: false,
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
    onSelect() {
      this.show(this.$refs.preview.files[0]);
    },
    onDrop() {
      this.show(event.dataTransfer.files[0]);
    },
    show(file) {
      if (file) {
        if (file.type.indexOf("image/") >= 0) {
          const url = URL.createObjectURL(file);
          this.$set(this.images, 3, url);
          this.changeImage(3);
        }
      }
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
input {
  display: none;
}
</style>

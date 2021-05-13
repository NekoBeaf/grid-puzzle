<template>
  <div>
    <div
      v-for="mode in modes"
      :key="mode"
      class="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded cursor-pointer"
      :class="{ 'bg-blue-700': isSelectedMode(mode) }"
      @click="changeMode(mode)"
    >
      {{ mode }}
    </div>
    <!--
    <div class="grid grid-rows-2 grid-flow-col gap-x-1 mx-3">
      <template v-for="param in customParams">
        <div :key="param">{{ param }}</div>
        <input
          :key="param"
          class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
          type="number"
          v-model="custom[param]"
          placeholder="4"
        />
      </template>
    </div>
    -->
    <div class="grid grid-cols-3 gap-x-1 mx-3">
      <div>cols</div>
      <div>rows</div>
      <div>divs</div>
      <input
        class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
        type="number"
        v-model="custom.cols"
        placeholder="4"
      />
      <input
        class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
        type="number"
        v-model="custom.rows"
        placeholder="4"
      />
      <input
        class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
        type="number"
        v-model="custom.divs"
        placeholder="4"
      />
    </div>
    <div
      class="bg-gray-600 hover:bg-blue-700 text-white font-bold
             py-2 px-4 m-3 rounded cursor-pointer"
      @click="start"
    >
      Start
    </div>
  </div>
</template>

<script>
const MODE_PARAMS = {
  easy: {
    cols: 2,
    rows: 2,
    divs: 4,
  },
  normal: {
    cols: 4,
    rows: 4,
    divs: 6,
  },
  hard: {
    cols: 10,
    rows: 10,
    divs: 15,
  },
};
export default {
  name: "Mode",
  created: function() {
    console.log(MODE_PARAMS[this.mode]);
  },
  data() {
    return {
      modes: ["easy", "normal", "hard", "custom"],
      mode: "normal",
      customParams: ["cols", "rows", "divs"],
      custom: {
        cols: 6,
        rows: 6,
        divs: 8,
      },
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
      if (MODE_PARAMS[this.mode] !== undefined) {
        this.cols = MODE_PARAMS[this.mode].cols;
        this.rows = MODE_PARAMS[this.mode].rows;
        this.divs = MODE_PARAMS[this.mode].divs;
      } else {
        this.cols = this.custom.cols;
        this.rows = this.custom.rows;
        this.divs = this.custom.divs;
      }
    },
    isSelectedMode(mode) {
      if (mode === this.mode) {
        return true;
      }
      return false;
    },
    start() {
      this.$emit("start", {
        cols: Number(this.custom.cols),
        rows: Number(this.custom.rows),
        divs: Number(this.custom.divs),
      });
    },
  },
};
</script>

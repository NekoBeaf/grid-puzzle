<template>
  <div>
    <div
      v-for="mode in modes"
      :key="mode"
      class="bg-gray-600 text-white font-bold py-2 px-4 m-3 rounded"
      :class="[
        isSelectedMode(mode) ? 'bg-blue-700' : '',
        status !== 'running' ? 'cursor-pointer hover:bg-blue-700' : '',
      ]"
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
    <div v-if="mode === 'custom'" class="grid grid-cols-3 gap-x-1 mx-3">
      <div>cols</div>
      <div>rows</div>
      <div>divs</div>
      <input
        class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
        type="number"
        min="1"
        v-model="custom.cols"
        placeholder="4"
        :disabled="status === 'running'"
      />
      <input
        class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
        type="number"
        min="1"
        v-model="custom.rows"
        placeholder="4"
        :disabled="status === 'running'"
      />
      <input
        class="shadow border rounded my-1 py-2 px-2 focus:outline-none"
        type="number"
        min="1"
        v-model="custom.divs"
        placeholder="4"
        :disabled="status === 'running'"
      />
    </div>
    <div
      class="bg-gray-600 text-white font-bold
             py-2 px-4 m-3 rounded cursor-pointer"
      :class="[
        status === 'ready' ? 'bg-green-500 hover:bg-green-700' : '',
        status === 'running' ? 'bg-red-500 hover:bg-red-700' : '',
      ]"
      @click="run"
    >
      {{ runButtonLabel }}
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
  data() {
    return {
      status: "ready",
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
      if (this.status === "running") {
        return;
      }
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
    run() {
      if (this.status === "ready") {
        this.status = "running";
        let cols = this.custom.cols;
        let rows = this.custom.cols;
        let divs = this.custom.cols;
        if (MODE_PARAMS[this.mode] !== undefined) {
          cols = MODE_PARAMS[this.mode].cols;
          rows = MODE_PARAMS[this.mode].rows;
          divs = MODE_PARAMS[this.mode].divs;
        }
        this.$emit("start", {
          cols: Number(cols),
          rows: Number(rows),
          divs: Number(divs),
        });
      } else if (this.status === "running") {
        this.status = "ready";
        this.$emit("quit");
      }
    },
    clear() {
      this.status = "ready";
    },
  },
  computed: {
    runButtonLabel() {
      if (this.status === "running") {
        return "Quit";
      }
      return "Start";
    },
    isReady() {
      if (this.status === "ready") {
        return true;
      }
      return false;
    },
  },
};
</script>

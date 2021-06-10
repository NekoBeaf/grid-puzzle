function generate(cols, rows, divs) {
  // 初期化
  let grid = [];
  let value = 0;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      grid.push(value);
      value++;
    }
  }

  let data = [
    {
      cols: cols,
      rows: rows,
      values: grid,
    },
  ];

  while (data.length < divs) {
    // 要素をランダムで取り出す
    const index = randomIndex(data.length);
    let datum = data[index];
    if (datum.values.length === 1) {
      // これ以上分割できない
      continue;
    }
    // dataからは削除しておく
    data.splice(index, 1);

    if (getSplitDirection(datum.cols, datum.rows) === "col") {
      // 列方向で分割
      const pos = randomPos(datum.cols);
      let _data = [
        {
          cols: pos,
          rows: datum.rows,
          values: [],
        },
        {
          cols: datum.cols - pos,
          rows: datum.rows,
          values: [],
        },
      ];
      // valuesから抜き出す
      datum.values.forEach((elem, index) => {
        if (index % datum.cols < pos) {
          _data[0].values.push(elem);
        } else {
          _data[1].values.push(elem);
        }
      });
      data = data.concat(_data);
    } else {
      // 行方向で分割
      const pos = randomPos(datum.rows);
      let _data = [
        {
          cols: datum.cols,
          rows: pos,
          values: [],
        },
        {
          cols: datum.cols,
          rows: datum.rows - pos,
          values: [],
        },
      ];
      // valuesから抜き出す
      const middle = datum.cols * pos;
      datum.values.forEach((elem, index) => {
        if (index < middle) {
          _data[0].values.push(elem);
        } else {
          _data[1].values.push(elem);
        }
      });
      data = data.concat(_data);
    }
  }
  return toLayout(data, cols);
}

/*
 * Functions
 */

// 分割方法を決める
function getSplitDirection(cols, rows) {
  if (cols === 1) return "row";
  if (rows === 1) return "col";
  return Math.floor(Math.random() * 2) ? "row" : "col";
}

// 0以上(max-1)以下の整数値を返す
function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

// 1以上(max-1)以下の整数値を返す
function randomPos(max) {
  return Math.floor(Math.random() * (max - 1) + 1);
}

// vue-grid-layoutのデータ構造に変換する
function toLayout(data, cols) {
  let layout = [];
  data.forEach((datum, index) => {
    const min = datum.values.reduce((a, b) => Math.min(a, b));
    const max = datum.values.reduce((a, b) => Math.max(a, b));
    const x = min % cols;
    const y = Math.floor(max / cols);
    const item = {
      x: x,
      y: y,
      w: Number(datum.cols),
      h: Number(datum.rows),
      i: index,
    };
    layout.push(item);
  });
  return layout;
}

export default { generate };

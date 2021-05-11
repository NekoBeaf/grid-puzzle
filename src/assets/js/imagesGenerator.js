async function generate(path, cols, rows, gridData, maxSize) {
  let result = [];
  let rowHeight = 0;
  try {
    const image = await loadImage(path);

    let width = image.width;
    let height = image.height;
    // 幅チェック
    if (width > maxSize.width) {
      height = height * (maxSize.width / width);
      width = maxSize.width;
    }
    // 高さチェック
    if (height > maxSize.height) {
      width = width * (maxSize.height / height);
      height = maxSize.height;
    }
    // 一行の高さ
    rowHeight = height / rows;

    const sprite = { width: image.width / cols, height: image.height / rows };
    let canvas = document.createElement("canvas");

    gridData.forEach((data) => {
      canvas.width = data.w * sprite.width;
      canvas.height = data.h * sprite.height;
      let context = canvas.getContext("2d");

      context.drawImage(
        image,
        data.x * sprite.width,
        data.y * sprite.height,
        data.w * sprite.width,
        data.h * sprite.height,
        0,
        0,
        data.w * sprite.width,
        data.h * sprite.height
      );
      var spriteElement = new Image();
      spriteElement.src = canvas.toDataURL();

      result.push(spriteElement.src);
    });
  } catch (e) {
    console.log("onload error", e);
  }

  return { images: result, rowHeight: rowHeight };
}

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

export default { generate };

async function generate(path, cols, rows, gridData) {
  let result = [];
  try {
    const image = await loadImage(path);

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

      //document.querySelector("#container").appendChild(spriteElement);
      result.push(spriteElement.src);
    });
  } catch (e) {
    console.log("onload error", e);
  }

  return result;
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

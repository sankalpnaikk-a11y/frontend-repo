// utils/cropImage.js
// helper to crop using canvas and return blob
export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (err) => reject(err));
      img.setAttribute("crossOrigin", "anonymous");
      img.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(image, (safeArea - image.width) / 2, (safeArea - image.height) / 2);

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // crop to the requested area
  const canvas2 = document.createElement("canvas");
  canvas2.width = pixelCrop.width;
  canvas2.height = pixelCrop.height;

  const ctx2 = canvas2.getContext("2d");

  ctx2.putImageData(
    data,
    Math.round(0 - (safeArea / 2 - image.width / 2) - pixelCrop.x),
    Math.round(0 - (safeArea / 2 - image.height / 2) - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas2.toBlob((blob) => {
      resolve({ blob, url: URL.createObjectURL(blob) });
    }, "image/png");
  });
}

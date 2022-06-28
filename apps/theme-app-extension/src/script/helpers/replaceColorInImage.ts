interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}

const replaceColorInImage = (image: HTMLImageElement, old_color: Color, new_color: Color) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imgd = ctx.getImageData(0, 0, image.width, image.height);
    const pix = imgd.data;

    for (let i = 0, n = pix.length; i < n; i += 4) {
        const r = pix[i],
            g = pix[i + 1],
            b = pix[i + 2];

        if (r == old_color.r && g == old_color.g && b == old_color.b) {
            pix[i] = new_color.r;
            pix[i + 1] = new_color.g;
            pix[i + 2] = new_color.b;
            pix[i + 3] = new_color.a != undefined ? new_color.a : pix[i + 3];
        }
    }
    ctx.putImageData(imgd, 0, 0);
    return canvas.toDataURL();
}

export default replaceColorInImage;
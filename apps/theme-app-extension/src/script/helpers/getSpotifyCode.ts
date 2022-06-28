import incrementColor from "./incrementColor";
import imgUrlToBase64 from "./imgUrlToBase64";
import loadImage from "./loadImage";
import replaceColorInImage from "./replaceColorInImage";
import hexToRgb from "./hexToRgb";

const getSpotifyCode = async (
    spotify_uri: string,
    remove_background = false,
    remove_padding = false,
    color = "black",
    background_color = "#ffffff",
    width = 1080
): Promise<string> => {
    const get_color = color == "white" ? "white" : "black";
    let bg_color = background_color;
    if (remove_background) {
        switch (color) {
            case "black":
            case "#000000":
                bg_color = "#000001";
                break;
            case "white":
            case "#ffffff":
                bg_color = "#fffffe";
                break;
            default:
                bg_color = incrementColor(color, 1);
                break;
        }
    }
    const code_url = `https://scannables.scdn.co/uri/plain/png/${bg_color.replace(
        "#",
        ""
    )}/${get_color}/${width}/${spotify_uri}`;
    let src = await imgUrlToBase64(code_url);
    if (remove_padding) {
        const image = await loadImage(src);
        const padding = 54;
        const canvas = document.createElement("canvas");
        canvas.width = image.width - padding * 2;
        canvas.height = image.height - padding * 2;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            padding,
            padding,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        src = canvas.toDataURL();
    }
    if (remove_background) {
        const image = await loadImage(src);
        src = replaceColorInImage(image, hexToRgb(bg_color), {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
        });
    }
    if (color != "white" && color != "black") {
        const image = await loadImage(src);
        const remove_color = hexToRgb(
            bg_color === "white" ? "#ffffff" : "#000000"
        );
        src = replaceColorInImage(
            image,
            remove_color,
            hexToRgb(color)
        );
    }
    return src;
}

export default getSpotifyCode;
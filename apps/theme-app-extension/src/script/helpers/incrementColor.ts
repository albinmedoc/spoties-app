const incrementColor = (color: string, step: number) => {
    var colorToInt = parseInt(color.substr(1), 16);
    colorToInt += step;
    var ncolor = colorToInt.toString(16);
    ncolor = "#" + new Array(7 - ncolor.length).join('0') + ncolor;
    if (/^#[0-9a-f]{6}$/i.test(ncolor)) {
        return ncolor;
    }
    return color;
}

export default incrementColor;
import getSpotifyCode from "../helpers/getSpotifyCode";
import imgUrlToBase64 from "../helpers/imgUrlToBase64";
import loadImage from "../helpers/loadImage";

class SpotiesProductPreview extends HTMLElement {
    modal: any;
    preview_image: any;
    spoties_fields: any;
    variant_radios: any;
    template_images: any;
    settings: any;
    defaults: { record: string; artist: string; cover: string; spotify_uri: string; };
    last_print: {};
    constructor() {
        super();
        this.modal = this.querySelector("spoties-modal-dialog");

        this.preview_image = this.modal.querySelector("img");

        this.spoties_fields = document.querySelector("spoties-fields");
        this.variant_radios = document.querySelector("variant-radios");

        this.template_images =
            JSON.parse(this.getAttribute("templateImages")) || [];
        this.settings = JSON.parse(this.getAttribute("settings")) || [];

        this.defaults = {
            record: this.getAttribute("defaultRecordName"),
            artist: this.getAttribute("defaultArtistName"),
            cover: this.getAttribute("defaultCoverImage"),
            spotify_uri: this.getAttribute("defaultSpotifyUri"),
        };

        this.last_print = {};
        this.modal.addEventListener("open", () => {
            const new_print = {
                template: this.template_image,
                data: { ...this.spoties_fields.data },
            };

            if (JSON.stringify(this.last_print) !== JSON.stringify(new_print)) {
                this.getPreviewImage().then((image_src) => {
                    this.updatePreviewImage(image_src);
                    this.last_print = new_print;
                });
            }
        });

        if (this.variant_radios) {
            this.variant_radios.addEventListener("change", () => {
                this.current_variant = this.variant_radios.currentVariant.id;
            });
        }
    }

    get current_variant() {
        return this.getAttribute("selectedVariant");
    }

    set current_variant(value) {
        this.setAttribute("selectedVariant", value);
    }

    get preview() {
        return this.template_images.find((template_image) =>
            template_image.variants.includes(this.current_variant)
        );
    }

    get preview_id() {
        return this.preview.id;
    }

    get template_image() {
        return this.preview.src;
    }

    getPreviewImage() {
        const data = { ...this.spoties_fields.data };
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        return imgUrlToBase64(this.template_image)
            .then((template_src) => loadImage(template_src))
            .then((template_image) => {
                canvas.width = template_image.naturalWidth;
                canvas.height = template_image.naturalHeight;
                ctx.drawImage(template_image, 0, 0);

                let promises = [];

                // Convert to Image
                this.settings[this.preview_id].forEach((element) => {
                    if (
                        element.type === "cover" &&
                        typeof data[`spoties-cover`] !== "object"
                    ) {
                        const key = `spoties-cover`;
                        const src = data[key] || this.defaults["cover"];
                        const promise = loadImage(src).then((image) => {
                            data[key] = image;
                        });
                        promises.push(promise);
                    } else if (
                        element.type === "code" &&
                        typeof data[`spoties-code-${this.preview_id}`] !== "object"
                    ) {
                        const src = data["spotify-uri"] || this.defaults["spotify_uri"];
                        const color = element.color || "black";
                        const promise = getSpotifyCode(src, true, true, color)
                            .then((src) => {
                                return loadImage(src);
                            })
                            .then((image) => {
                                data[`spoties-code-${this.preview_id}`] = image;
                            });
                        promises.push(promise);
                    } else if (
                        (element.type === "record" ||
                            element.type === "artist" ||
                            element.type === "text") &&
                        element.font?.src
                    ) {
                        // Load fonts
                        promises.push(
                            new Promise<void>((resolve, reject) => {
                                var font = new FontFace(
                                    element.font.name,
                                    `url(${element.font.src})`
                                );
                                font
                                    .load()
                                    .then(function (loaded_face) {
                                        document.fonts.add(loaded_face);
                                        resolve();
                                    })
                                    .catch((err) => reject(err));
                            })
                        );
                    }
                });
                return Promise.all(promises);
            })
            .then(() => {
                this.settings[this.preview_id].forEach((element) => {
                    const key = `spoties-${element.type === "text" ? element.inputId : element.type
                        }`;
                    switch (element.type) {
                        case "cover":
                        case "code":
                            const image =
                                data[
                                `${key}${element.type === "code" ? "-" + this.preview_id : ""
                                }`
                                ];
                            if (!image) break;
                            if (element.rotate) {
                                const positionX = element.position[0];
                                const positionY = element.position[1];
                                const radians = (element.rotate || 1) * (Math.PI / 180);
                                ctx.translate(positionX, positionY);
                                ctx.rotate(radians);
                                ctx.drawImage(image, 0, 0, element.width, element.height);
                                ctx.rotate(-radians);
                                ctx.translate(-positionX, -positionY);
                            } else {
                                ctx.drawImage(
                                    image,
                                    element.position[0],
                                    element.position[1],
                                    element.width,
                                    element.height
                                );
                            }
                            break;
                        case "record":
                        case "artist":
                        case "text":
                            const text =
                                data[key] || this.defaults[element.type] || element.default;
                            if (!text) break;
                            ctx.font = `${element.font?.weight || "normal"} ${element.font?.size || 50
                                }px ${element.font?.name || "arial"}`;
                            ctx.textAlign = element.align || "center";
                            ctx.fillStyle = element.color || "black";
                            ctx.fillText(text, element.position[0], element.position[1]);
                            break;
                    }
                });
                return canvas.toDataURL();
            });
    }

    updatePreviewImage(image_src) {
        this.preview_image.src = image_src;
    }
}

export default SpotiesProductPreview;
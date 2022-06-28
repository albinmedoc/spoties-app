import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css"
import base64toBlob from "../helpers/base64ToBlob";
import blobToBase64 from "../helpers/blobToBase64";
import imgUrlToBase64 from "../helpers/imgUrlToBase64";
import SpotiesFields from "./spotiesFields";
import type SpotiesErrors from "./spotiesErrors";
import type { SpotiesSelectedEvent } from './spotiesFields';
import SpotiesModalDialog from "./spotiesModalDialog";

export interface SpotiesCoverImageUpdateEvent extends Event {
    detail: {
        "spoties-cover": string;
    }
}

class SpotiesCoverImage extends HTMLElement {
    spoties_fields: SpotiesFields;
    cover_upload_field: HTMLInputElement;
    cover_image_container: HTMLDivElement;
    cover_image_elem: HTMLImageElement;
    modal: SpotiesModalDialog;
    modal_image: HTMLImageElement;
    modal_save: HTMLButtonElement;
    remove_cover_btn: HTMLButtonElement;
    errors: SpotiesErrors;
    cover_data: string;
    cropper: Cropper;
    manual_value: boolean;
    constructor() {
        super();

        this.spoties_fields = this.closest("spoties-fields");
        this.cover_upload_field = this.querySelector('input[type="file"]');
        this.cover_image_container = this.querySelector(".cover-image-container");
        this.cover_image_elem = this.cover_image_container.querySelector("img");

        this.modal = this.querySelector("#SpotiesModal-Cover-Edit");
        this.modal_image = this.modal.querySelector("img");
        this.modal_save = this.modal.querySelector("button");

        this.remove_cover_btn = this.querySelector("#remove-cover");

        this.errors = this.querySelector("spoties-option-errors");

        this.cover_data = null;
        this.cropper = null;

        this.manual_value = false;

        this.spoties_fields.addEventListener("spotiesSelected", (event: SpotiesSelectedEvent) => {
            if (!this.cover_data || !this.manual_value) {
                imgUrlToBase64(event.detail.image).then((image) => {
                    this.setCoverImage(image);
                    this.manual_value = false;
                });
            }
        });

        this.remove_cover_btn.addEventListener("click", (event) => {
            this.cover_image_elem.setAttribute("src", "");
            this.cover_data = null;
            this.dispatchEvent(
                new CustomEvent("update", {
                    detail: { "spoties-cover": null },
                })
            );
            this.cover_image_container.style.display = "none";
        });

        this.cover_upload_field.addEventListener("change", (event) => {
            this.uploadFile((event.target as HTMLInputElement).files[0]);
        });

        this.modal_save.addEventListener("click", () => this.onSave());
    }

    get cover_image() {
        return base64toBlob(this.cover_data.split(",")[1], "images/png");
    }

    validate() {
        this.errors.clear();
        const valid = this.cover_data !== "" && this.cover_data != null;
        if (!valid) {
            this.errors.add("Var vänlig och ange en omslagsbild");
        }
        return valid;
    }

    uploadFile(file: Blob) {
        blobToBase64(file).then((image_data) => {
            const image = this.modal.querySelector("img");
            image.src = image_data;
            this.modal.show();
            this.cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
            });
        });
        this.cover_upload_field.value = "";
    }

    onSave() {
        const image = this.cropper
            .getCroppedCanvas({
                maxWidth: 1920,
                maxHeight: 1920,
            })
            .toDataURL("image/jpeg");
        this.cropper.destroy();
        this.setCoverImage(image);
        this.manual_value = true;
        this.modal.hide();
    }

    setCoverImage(source: string) {
        this.cover_data = source;
        this.cover_image_elem.src = source;
        this.cover_image_container.style.display = "block";
        this.modal_image.src = source;
        this.dispatchEvent(
            new CustomEvent("update", {
                detail: { "spoties-cover": source },
            }) as SpotiesCoverImageUpdateEvent
        );
    }
}

export default SpotiesCoverImage;
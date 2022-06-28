import base64toBlob from "../helpers/base64ToBlob";
import type SpotiesArtist from "./spotiesArtist";
import type SpotiesCoverImage from "./spotiesCoverImage";
import type SpotiesProductPreview from "./spotiesProductPreview";
import type SpotiesRecord from "./spotiesRecord";
import type SpotiesSearch from "./spotiesSearch";
import type SpotiesText from "./spotiesText";

import type { SpotiesSearchResClickEvent, SpotiesSearchUpdateEvent } from './spotiesSearch';
import type { SpotiesCoverImageUpdateEvent } from './spotiesCoverImage';
import type { SpotiesTextUpdateEvent } from './spotiesText';

export type SpotiesUpdateEvent = SpotiesSearchUpdateEvent | SpotiesCoverImageUpdateEvent | SpotiesTextUpdateEvent;

export type SpotiesSelectedEvent = SpotiesSearchResClickEvent;

type SpotiesElement = SpotiesArtist | SpotiesCoverImage | SpotiesRecord | SpotiesSearch | SpotiesText;

class SpotiesFields extends HTMLElement {
    search_field: SpotiesSearch;
    cover_field: SpotiesCoverImage;
    preview: SpotiesProductPreview;
    data: {};
    constructor() {
        super();

        this.search_field = this.querySelector("spoties-search-field");
        this.cover_field = this.querySelector("spoties-cover-field");
        this.preview = document.querySelector("spoties-preview");

        this.data = {};

        if (this.search_field) {
            this.search_field.addEventListener("resClick", (event: SpotiesSearchResClickEvent) => {
                this.dispatchEvent(
                    new CustomEvent("spotiesSelected", {
                        detail: event.detail,
                    }) as SpotiesSelectedEvent
                );
            });
        }
        this.getChildren().forEach((child) => {
            child.addEventListener("update", (event: SpotiesUpdateEvent) => {
                this.data = Object.assign(this.data, event.detail);
                this.dispatchEvent(
                    new CustomEvent("spotiesUpdate", {
                        detail: event.detail,
                    }) as SpotiesUpdateEvent
                );
            });
        });
    }

    getChildren() {
        const children = Array.from(this.children) as Array<SpotiesElement>;
        return children;
    }

    validate() {
        const valid = this.getChildren().map((child) => child.validate()).every(Boolean);
        return valid;
    }

    addToFormData(formData: FormData): Promise<FormData> {
        return new Promise((resolve, reject) => {
            this.querySelectorAll('input[name^="properties["]').forEach((input: HTMLInputElement) => {
                formData.append(input.getAttribute("name"), input.value);
            });

            if (this.search_field && this.search_field.required) {
                formData.append(
                    "properties[_Spotify URI]",
                    this.search_field.spotify_uri
                );
                formData.append(
                    "properties[Spotify Code]",
                    this.search_field.spotify_code,
                    "spotify_code.png"
                );
            }
            if (this.cover_field) {
                formData.append(
                    "properties[Cover Image]",
                    this.cover_field.cover_image,
                    "cover_image.png"
                );
            }
            if (this.preview) {
                this.preview
                    .getPreviewImage()
                    .then((image_src) =>
                        base64toBlob(image_src.split(",")[1], "images/png")
                    )
                    .then((blob) => {
                        formData.append(
                            "properties[_Preview Image]",
                            blob,
                            "preview_image.png"
                        );
                        resolve(formData);
                    })
                    .catch((err) => reject(err));
            } else {
                resolve(formData);
            }
        });
    }
}

export default SpotiesFields;
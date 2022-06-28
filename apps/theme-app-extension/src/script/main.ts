import { SpotiesArtist, SpotiesCoverImage, SpotiesErrors, SpotiesFields, SpotiesOption, SpotiesProductPreview, SpotiesRecord, SpotiesSearch, SpotiesText, SpotiesModalDialog, SpotiesModalOpener } from './components';

if (!customElements.get("spoties-search-field")) {
    customElements.define("spoties-search-field", SpotiesSearch);
}

if (!customElements.get("spoties-cover-field")) {
    customElements.define("spoties-cover-field", SpotiesCoverImage);
}

if (!customElements.get("spoties-text-field")) {
    customElements.define("spoties-text-field", SpotiesText);
}

if (!customElements.get("spoties-record-name-field")) {
    customElements.define("spoties-record-name-field", SpotiesRecord);
}

if (!customElements.get("spoties-artist-field")) {
    customElements.define("spoties-artist-field", SpotiesArtist);
}

if (!customElements.get("spoties-option-field")) {
    customElements.define("spoties-option-field", SpotiesOption);
}

if (!customElements.get("spoties-option-errors")) {
    customElements.define("spoties-option-errors", SpotiesErrors);
}

if (!customElements.get("spoties-preview")) {
    customElements.define("spoties-preview", SpotiesProductPreview);
}

if (!customElements.get("spoties-fields")) {
    customElements.define("spoties-fields", SpotiesFields);
}

if (!customElements.get("spoties-modal-dialog")) {
    customElements.define("spoties-modal-dialog", SpotiesModalDialog);
  }

if (!customElements.get("spoties-modal-opener")) {
    customElements.define("spoties-modal-opener", SpotiesModalOpener);
  }

const addVariants = [
    'form[action="/cart"]',
    'form[action^="/cart"]',
    'form[action*="/cart?"]',
    'form[action="/checkout"]',
    'form[action^="/checkout"]',
    'form[action*="/checkout?"]',
];
const addedForms = [];
addVariants.forEach((variant) => {
    const forms = document.querySelectorAll(variant);
    forms.forEach((form) => {
        if (!addedForms.includes(form)) {
            const spotiesFields = document.querySelector("spoties-fields") as SpotiesFields;
            if (spotiesFields) {
                form.addEventListener("formdata", async (e: FormDataEvent) => {
                    const formData = e.formData;
                    await spotiesFields.addToFormData(formData);
                });
                form.addEventListener(
                    "submit",
                    async (e) => {
                        if (!spotiesFields.validate()) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }
                    },
                    {
                        capture: true,
                    }
                );
            }
            addedForms.push(form);
        }
    });
});

import type SpotiesModalDialog from "./spotiesModalDialog";

class SpotiesModalOpener extends HTMLElement {
    constructor() {
        super();
        const button = this.querySelector("[open]");

        if (!button) return;
        button.addEventListener("click", () => {
            const modal = document.querySelector(this.getAttribute("data-modal")) as SpotiesModalDialog;
            if (modal) modal.show();
        });
    }
}

export default SpotiesModalOpener
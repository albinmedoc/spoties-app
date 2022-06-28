class SpotiesModalDialog extends HTMLElement {
    constructor() {
        super();
        this.querySelector("[close]").addEventListener(
            "click",
            this.hide.bind(this)
        );
        this.addEventListener("keyup", (event) => {
            if (event.code.toUpperCase() === "ESCAPE") this.hide();
        });
        this.addEventListener("click", (event) => {
            if ((event.target as HTMLElement).nodeName === "SPOTIES-MODAL-DIALOG") this.hide();
        });
    }

    show() {
        document.body.classList.add("spoties-modal-open");
        this.setAttribute("open", "");
        this.dispatchEvent(new CustomEvent("open"));
    }

    hide() {
        document.body.classList.remove("spoties-modal-open");
        this.removeAttribute("open");
    }
}

export default SpotiesModalDialog;
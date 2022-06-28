class SpotiesErrors extends HTMLElement {
    clear() {
        while (this.firstChild) {
            this.removeChild(this.lastChild);
        }
    }

    add(message: string) {
        const error = document.createElement("div");
        error.innerHTML = message;
        error.addEventListener("click", () => this.removeChild(error));
        this.appendChild(error);
    }
}

export default SpotiesErrors;
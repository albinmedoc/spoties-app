export interface SpotiesTextUpdateEvent extends Event {
    detail: Record<string, string>;
}

class SpotiesText extends HTMLElement {
    input: HTMLInputElement;
    errors: any;
    constructor() {
        super();
        this.input = this.querySelector("input");
        this.errors = this.querySelector("spoties-option-errors");

        this.input.addEventListener("change", () => this.onChange());
    }

    onChange() {
        let detail = {};
        detail[this.input.id] = this.input.value;
        this.dispatchEvent(new CustomEvent("update", { detail }) as SpotiesTextUpdateEvent);
    }

    get pattern() {
        return this.input.getAttribute("pattern");
    }

    get minLength() {
        if (this.input.hasAttribute("minlength")) {
            return parseInt(this.input.getAttribute("minlength"));
        }
        return null;
    }

    get maxLength() {
        if (this.input.hasAttribute("maxlength")) {
            return parseInt(this.input.getAttribute("maxlength"));
        }
        return null;
    }

    validate() {
        this.errors.clear();
        const length = this.input.value.length;

        const required_valid = this.input.hasAttribute("required")
            ? this.input.value.trim() !== ""
            : true;
        const min_valid = this.minLength ? length >= this.minLength : true;
        const max_valid = this.maxLength ? length <= this.maxLength : true;

        const regex = this.pattern ? new RegExp(this.pattern) : null;
        const regex_valid = regex ? regex.test(this.input.value) : true;

        if (!required_valid && min_valid) {
            this.errors.add("Var vänlig och ange");
        }
        if (!min_valid) {
            this.errors.add(
                `Var vänlig och ange minst ${this.input.getAttribute(
                    "minlength"
                )} tecken`
            );
        }
        if (!max_valid) {
            this.errors.add(
                `Var vänlig och ange max ${this.input.getAttribute(
                    "maxlength"
                )} tecken`
            );
        }
        if (!regex_valid) {
            this.errors.add("Fältet innehåller otillåtna tecken");
        }

        const valid = required_valid && min_valid && max_valid && regex_valid;
        return valid;
    }
}

export default SpotiesText;
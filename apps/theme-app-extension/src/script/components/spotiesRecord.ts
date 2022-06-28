import { SpotiesSelectedEvent } from './spotiesFields';
import SpotiesText from './spotiesText';

class SpotiesRecord extends SpotiesText {
    spoties_fields: any;
    update_value: string;
    manual_value: boolean;
    constructor() {
        super();

        this.spoties_fields = this.closest("spoties-fields");
        this.update_value = "record";
        this.manual_value = false;

        this.spoties_fields.addEventListener("spotiesSelected", (event: SpotiesSelectedEvent) => {
            if (!this.manual_value || !this.input.value) {
                const value = event.detail[this.update_value];
                this.input.value = value.substring(0, this.maxLength || value.length);
                this.onChange();
                this.manual_value = false;
            }
        });
    }

    onChange() {
        super.onChange();
        this.manual_value = true;
    }
}

export default SpotiesRecord;
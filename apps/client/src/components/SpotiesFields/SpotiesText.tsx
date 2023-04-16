import { RadioButton, TextField } from "@shopify/polaris";
import { useCallback } from "react";
import type { SpotiesTextSettings, SpotiesRecordNameSettings, SpotiesArtistNameSettings } from '@types';

interface SpotiesTextProps {
    name?: string;
    settings: SpotiesTextSettings | SpotiesRecordNameSettings | SpotiesArtistNameSettings;
}

export default function SpotiesText(props: SpotiesTextProps) {

    const handleRequiredChange = useCallback(
        // eslint-disable-next-line no-param-reassign
        (_checked: boolean, newValue: string) => { props.settings.required = newValue === 'true'; console.error('updated required') },
        [props.settings]
    );

    const handleMinLengthChange = useCallback(
        // eslint-disable-next-line no-param-reassign
        (newValue: string) => { props.settings.minLength = parseInt(newValue, 10) },
        [props.settings]
    );

    const handleMaxLengthChange = useCallback(
        // eslint-disable-next-line no-param-reassign
        (newValue: string) => { props.settings.maxLength = parseInt(newValue, 10) },
        [props.settings]
    );

    const handleNameChange = useCallback(
        // eslint-disable-next-line no-param-reassign
        (newValue: string) => { props.settings.name = newValue },
        [props.settings]
    );

    return <>
        <RadioButton
            label="Field is optional"
            helpText="This field is not required"
            checked={!props.settings.required ?? true}
            id="false"
            name="required"
            onChange={handleRequiredChange}
        />
        <RadioButton
            label="Field is required"
            helpText="This field is required"
            id="true"
            name="required"
            checked={props.settings.required ?? false}
            onChange={handleRequiredChange}
        />
        <TextField
            label="Min length"
            type="number"
            value={props.settings.minLength?.toString()}
            onChange={handleMinLengthChange}
            autoComplete="off"
        />
        <TextField
            label="Max length"
            type="number"
            value={props.settings.maxLength?.toString()}
            onChange={handleMaxLengthChange}
            autoComplete="off"
        />
        <TextField
            label="Field name"
            helpText="Used to bind field value to preview image"
            disabled={!!props.name}
            value={props.name ?? props.settings.name}
            onChange={handleNameChange}
            autoComplete="off"
        />
    </>;
}

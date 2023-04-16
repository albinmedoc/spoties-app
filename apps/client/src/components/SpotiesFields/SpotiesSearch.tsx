import { RadioButton } from "@shopify/polaris";
import { useCallback } from "react";
import type { SpotiesSearchSettings } from '@types';

interface SpotiesSearchProps {
    settings: SpotiesSearchSettings;
}

export default function SpotiesSearch(props: SpotiesSearchProps) {

    const handleRequiredChange = useCallback(
        // eslint-disable-next-line no-param-reassign
        (_checked: boolean, newValue: string) => { props.settings.required = newValue === 'true' },
        [props.settings]
    );

    return <>
        <RadioButton
            label="Field is optional"
            helpText="The Spotify-code is not required on the product"
            checked={!props.settings.required ?? true}
            id="false"
            name="required"
            onChange={handleRequiredChange}
        />
        <RadioButton
            label="Field is required"
            helpText="The Spotify-code is required on the product"
            id="true"
            name="required"
            checked={props.settings.required ?? false}
            onChange={handleRequiredChange}
        />
    </>;
}

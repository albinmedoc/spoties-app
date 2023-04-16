import { Card, Button, Select } from "@shopify/polaris";
import type { SpotiesFieldSettings, SpotiesFieldType, SpotiesSettings } from '@types';
import { useState, useReducer } from "react";
import { generateSpotiesDefaultSettings, upperCaseEachWord } from '@client/helpers';
import SpotiesCoverImage from "./SpotiesCoverImage";
import SpotiesSearch from "./SpotiesSearch";
import SpotiesText from "./SpotiesText";

interface SpotiesFieldsProps {
    settings: SpotiesSettings
}

export default function SpotiesFields(props: SpotiesFieldsProps) {

    const types: Array<{label: string, value: SpotiesFieldType}> = [
        'text',
        'artist-name',
        'record-name',
        'search',
        'cover-image'
    ].map((value: SpotiesFieldType) => ({
        label: upperCaseEachWord(value, '-'),
        value
    }));

    const [selectedType, setSelectedType]  = useState<SpotiesFieldType>(types[0].value);

    const reducer = (oldSettings: SpotiesSettings, action: {method: 'add' | 'remove' | 'update', fieldSettings: SpotiesFieldSettings}) => {
        const copy = oldSettings;
        if(action.method === 'add') {
            copy.push(action.fieldSettings);
        } else {
            const index = copy.findIndex((settings) => settings.name === action.fieldSettings.name);
            if(!index) {
                throw new Error();
            }
            if(action.method === 'remove') {
                copy.splice(index, 1);
            }
            else {
                copy[index] = action.fieldSettings;
            }
        }
        return copy;
    }

    const [settings, updateSettings] = useReducer(reducer, props.settings);

    const addField = () => {
        const fieldSettings = generateSpotiesDefaultSettings(selectedType)

        if(fieldSettings !== null) {
            updateSettings({method: 'add', fieldSettings});
        }

        // eslint-disable-next-line no-console
        console.log(fieldSettings, props.settings);
    }

    const getFieldMarkup = (fieldSettings: SpotiesFieldSettings) => {
        switch (fieldSettings.type) {
            case 'text':
                return <SpotiesText settings={fieldSettings} />
            case 'artist-name':
                return <SpotiesText name="artist-name" settings={fieldSettings} />
            case 'record-name':
                return <SpotiesText name="record-name" settings={fieldSettings} />
            case 'search':
                return <SpotiesSearch settings={fieldSettings} />
            case 'cover-image':
                return <SpotiesCoverImage settings={fieldSettings} />
            default:
                return <p>Unknown field type</p>
        }
    }

    const fieldsMarkup = () =>
        settings.map((fieldSettings) => 
            <Card key={fieldSettings.name} title={upperCaseEachWord(fieldSettings.type, '-')} actions={[{content: 'Delete', onAction: () => updateSettings({method: 'remove', fieldSettings})}]}>
                {getFieldMarkup(fieldSettings)}
            </Card>
        );

    return <Card title="Spoties Fields">
        <Card.Section>
            {fieldsMarkup()}
        </Card.Section>
        <Card.Section>
            <Select label="Type" options={types} onChange={(value) => setSelectedType(value as SpotiesFieldType)} value={selectedType} />
            <Button onClick={addField}>Add new field</Button>
        </Card.Section>
    </Card>;
}

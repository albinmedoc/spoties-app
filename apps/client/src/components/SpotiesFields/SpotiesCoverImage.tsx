import { Card } from "@shopify/polaris";
import type { SpotiesCoverImageSettings } from '@types';

interface SpotiesCoverImageProps {
    // eslint-disable-next-line react/no-unused-prop-types, @typescript-eslint/ban-types
    settings: SpotiesCoverImageSettings
}

export default function SpotiesCoverImage(props: SpotiesCoverImageProps) {

    return <Card>
        <Card.Section
            title="Cover Image"
            actions={[
                { content: "Delete", destructive: true },
            ]}
        />
    </Card>;
}

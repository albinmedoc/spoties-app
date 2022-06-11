import { Page, Layout } from "@shopify/polaris";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <h2>Homepage</h2>
          <Link to="/orders" data-primary-link>
            Overview
          </Link>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

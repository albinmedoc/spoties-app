import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "@client/helpers";
import { AppProvider as _PolarisProvider } from "@shopify/polaris";
import type { AppProviderProps as PolarisProviderProps } from "@shopify/polaris"; 
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import type { LinkProps as ReactRouterLinkProps } from "react-router-dom";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import Router from "@client/routes/Router";

const PolarisProvider = (_PolarisProvider as unknown) as React.FC<PolarisProviderProps>;

export default function App() {
  return (
    <BrowserRouter>
      <PolarisProvider i18n={translations} linkComponent={Link}>
        <AppBridgeProvider
          config={{
            apiKey: process.env.SHOPIFY_API_KEY,
            host: new URLSearchParams(location.search).get("host"),
            forceRedirect: true,
          }}
        >
          <MyProvider>
            <Router />
          </MyProvider>
        </AppBridgeProvider>
      </PolarisProvider>
    </BrowserRouter>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

interface LinkProps extends ReactRouterLinkProps {
  url: string;
  external: boolean;
}

function Link({ children, url = "", external, ...rest }: LinkProps) {
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = "_blank";
    rest.rel = "noopener noreferrer";
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

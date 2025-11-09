import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/token";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  // wrapper fetch pour logger la requête
  fetch: (uri, options) => {
    console.debug("Apollo Request:", {
      url: uri,
      method: options.method,
      headers: options.headers,
      body: options.body ? JSON.parse(options.body) : null,
    });
    return fetch(uri, options).then((response) => {
      console.debug("Apollo Response Status:", response.status);
      return response;
    });
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

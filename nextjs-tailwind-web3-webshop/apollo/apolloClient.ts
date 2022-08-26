import { ApolloClient, InMemoryCache } from "@apollo/client"

const key = "**************************"

const client = new ApolloClient({
  uri: "**********************",
  headers: {
    Authorization: `${key}`,
  },
  cache: new InMemoryCache(),
})

export default client

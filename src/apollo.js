import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://restaurant-menu-ourself-777413492293.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
})

const authLink = setContext((parent, { headers }) => {
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client

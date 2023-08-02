import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { ApolloProvider, provideApolloClient } from '@vue/apollo-composable';
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const app = createApp(App);

app.use(router)
   .use(store)
   .component("font-awesome-icon", FontAwesomeIcon)
   .use(ApolloProvider, apolloClient)
   .provide(provideApolloClient(apolloClient))
   .mount("#app");

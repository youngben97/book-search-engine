import './App.css';
// Important for API Consumption: To enable interaction with our GraphQL API on the front end, we utilize these tools to develop the client-side behavior
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Important for API Consumption: Create an instance of the ApolloClient class and specify the endpoint of your GraphQL API (e.g., 'http://localhost:3001')—the proxy set up in the previous activity facilitates this. 
// We also instantiate a new InMemoryCache class that automatically caches queried data, enhancing performance.
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
      </ApolloProvider>
  );
}

export default App;

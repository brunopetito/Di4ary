import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { client } from './lib/apollo';
import { ApolloProvider } from '@apollo/client';
import Header from './Components/Header';
import Footer from './Components/Footer';

export function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;

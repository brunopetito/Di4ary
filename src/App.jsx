import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { client } from './lib/apollo';
import { ApolloProvider } from '@apollo/client';
import Header from './Components/Header';
import Footer from './Components/Footer';

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <div className="flex-1">
            <Router />
          </div>

          <Footer className="relative bottom-0" />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;

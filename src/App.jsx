import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { client } from './lib/apollo';
import { ApolloProvider } from '@apollo/client';
import Header from './Components/Header';
import Footer from './Components/Footer';
import React from 'react';
import { UserStorage } from './UserContext';

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <UserStorage>
            <Header />
            <div className="flex-1 mt-24">
              <Router />
            </div>

            <Footer />
          </UserStorage>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;

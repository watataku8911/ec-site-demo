import React from 'react';
import './assets/style.css';
import './assets/reset.css';
import Footer from './conpoments/Footer';
import Router from './Router';

const App = () => {
    return (
      <>
      <main className="c-main">
        <Router />
      </main>
      <Footer />
      </>
    )
}

export default App;

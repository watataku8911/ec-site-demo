import React from 'react';
import './assets/style.css';
import './assets/reset.css';
import Header from './conpoments/Header/Header'
import Router from './Router';
import Footer from './conpoments/Footer';


const App = () => {
    return (
      <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
      <Footer />
      </>
    )
}

export default App;

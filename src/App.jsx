import React from "react";
import "./assets/style.css";
import "./assets/reset.css";
import Header from "./components/Header/Header";
import Router from "./Router";
import {
  Footer,
  //Loading
} from "./components/UIKit/index";

const App = () => {
  return (
    <>
      {/* <Loading> */}
      <Header />
      <main className="c-main">
        <Router />
      </main>
      <Footer />
      {/* </Loading> */}
    </>
  );
};

export default App;

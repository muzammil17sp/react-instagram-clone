import React, { useState, useEffect } from "react";

import { firestore } from "./firebase";
import Login from "./components/Login/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/Header/Nav";
import Home from "./components/Home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login"  component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

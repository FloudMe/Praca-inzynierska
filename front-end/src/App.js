import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import ListOfTrainings from './Routes/ListOfTrainings';
import Bar from './Routes/Bar';

function App() {
  return (
      <div className="App">
        <Bar />
        <ListOfTrainings />
      </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";

import './indexx.css'
import { Navi_manage } from "./Navi_manage";
import { Shop } from "./Shop";

function App() {
  return (
    <BrowserRouter>
    <Navi_manage/>
    </BrowserRouter>
  );
}

export default App;

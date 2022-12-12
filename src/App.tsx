import React from "react";
import { Routes, Route } from "react-router-dom";

import Points from "./pages/Points";
import Tree from "./pages/Tree";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Points/>}/>
      <Route path="/tree" element={<Tree/>}/>
    </Routes>
  );
}

export default App;

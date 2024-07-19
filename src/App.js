import React from "react";

import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search city="New Orleans" />
      </header>
    </div>
  );
}

export default App;

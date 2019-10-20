import React from "react";
import logo from "../../assets/img/logo.svg";
import "./Main.css";

const Main = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>process.env.PUBLIC_URL: {process.env.REACT_APP_API_ENDPOINT}</p>
        <p>process.env.BASE_URL: {process.env.REACT_APP_DOC_TITLE}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Main;

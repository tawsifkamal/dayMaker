import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from "react"


function App() {
  const [text, setText] = useState(0)
  let clickHandle = () => {
    console.log("Text")
    fetch(`http://localhost:5000/test/${text}`)
      .then(res => res.text())
      .then(text => {
        setText(text)
      })
      .catch(e => {
        setText("fetch test failed 😒")
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" onClick={clickHandle} alt="logo" />
        <button onClick={clickHandle}>{text}</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:5000/test"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      </header>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import Calculator from "./components/Calculator";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    )
  }
}



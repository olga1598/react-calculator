import React, { Component } from "react";
import "./calculator.css";
import CalculatorDisplay from "./CalculatorDisplay";
import Header from "./Header";

class Calculator extends Component {
  state = {
    realvalue: null,
    display: "0",
    waitingForOperand: false,
    operator: null
  };

  inputDigit = input => {
    const { display, waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        display: String(input),
        waitingForOperand: false
      });
    } else {
      this.setState(() => {
        return {
          display: display == 0 ? String(input) : String(display) + input,
          waitingForOperand: false
        };
      });
    }
  };

  inputDot = () => {
    console.log(".");
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: ".",
        waitingForOperand: false
      });
    } else if (display.indexOf(".") === -1) {
      this.setState({
        display: display + ".",
        waitingForOperand: false
      });
    }
  };

  clearDisplay = () => {
    this.setState(() => ({ display: "0" }));
  };

  reverseDigit = () => {
    const { display } = this.state;
    this.setState({
      display: display.charAt(0) == "-" ? display.substr(1) : "-" + display
    });
  };

  inputPercent = () => {
    const { display } = this.state;
    const percent = parseInt(display) / 100;
    this.setState({ display: String(percent) });
  };

  makeOperation = (nextOperator) => {
    const { display, operator, realvalue } = this.state;

    const operations = {
      "/": (currentValue, nextValue) => currentValue / nextValue,
      "*": (currentValue, nextValue) => currentValue * nextValue,
      "-": (currentValue, nextValue) => currentValue - nextValue,
      "+": (currentValue, nextValue) => currentValue + nextValue,
      "=": (currentValue, nextValue) => nextValue
    };

    const nextValue = parseFloat(display);
    if (realvalue == null) {
      this.setState({ realvalue: nextValue });
    } else if (operator) {
      const currentValue = realvalue || 0;
      const computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        realvalue: computedValue,
        display: String(computedValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  };

  render() {
    return (
      <div className="calculator">
      {/*Look for changint the whole state in UI while testing:
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
      <div className="calculator-display">{this.state.display}</div>*/}
        <Header />
        <CalculatorDisplay display={this.state.display} />
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button
                id="key-clear"
                value="C"
                className="calculator-key key-clear"
                onClick={() => this.clearDisplay()}
              >
                AC
              </button>
              <button
                id="key-sign"
                value="±"
                className="calculator-key key-sign"
                onClick={() => this.reverseDigit()}
              >
                &plusmn;
              </button>
              <button
                id="key-percent"
                value="%"
                className="calculator-key key-percent"
                onClick={() => this.inputPercent()}
              >
                %
              </button>
            </div>

            <div className="digit-keys">
              <button
                id="key-0"
                value="0"
                className="calculator-key key-0"
                onClick={() => this.inputDigit(0)}
              >
                0
              </button>
              <button
                id="key-dot"
                value="."
                className="calculator-key key-dot"
                onClick={() => this.inputDot()}
              >
                &middot;
              </button>
              <button
                id="key-1"
                value="1"
                className="calculator-key key-1"
                onClick={() => this.inputDigit(1)}
              >
                1
              </button>
              <button
                id="key-2"
                value="2"
                className="calculator-key key-2"
                onClick={() => this.inputDigit(2)}
              >
                2
              </button>
              <button
                id="key-3"
                value="3"
                className="calculator-key key-3"
                onClick={() => this.inputDigit(3)}
              >
                3
              </button>
              <button
                id="key-4"
                value="4"
                className="calculator-key key-4"
                onClick={() => this.inputDigit(4)}
              >
                4
              </button>
              <button
                id="key-5"
                value="5"
                className="calculator-key key-5"
                onClick={() => this.inputDigit(5)}
              >
                5
              </button>
              <button
                id="key-6"
                value="6"
                className="calculator-key key-6"
                onClick={() => this.inputDigit(6)}
              >
                6
              </button>
              <button
                id="key-7"
                value="7"
                className="calculator-key key-7"
                onClick={() => this.inputDigit(7)}
              >
                7
              </button>
              <button
                id="key-8"
                value="8"
                className="calculator-key key-8"
                onClick={() => this.inputDigit(8)}
              >
                8
              </button>
              <button
                id="key-9"
                value="9"
                className="calculator-key key-9"
                onClick={() => this.inputDigit(9)}
              >
                9
              </button>
            </div>
          </div>

          <div className="operator-keys">
            <button
              id="key-divide"
              value="/"
              className="calculator-key key-divide"
              onClick={() => this.makeOperation("/")}
            >
              &divide;
            </button>
            <button
              id="key-multiply"
              value="*"
              className="calculator-key key-multiply"
              onClick={() => this.makeOperation("*")}
            >
              &times;
            </button>
            <button
              id="key-subtract"
              value="-"
              className="calculator-key key-subtract"
              onClick={() => this.makeOperation("-")}
            >
              &ndash;
            </button>
            <button
              id="key-add"
              value="+"
              className="calculator-key key-add"
              onClick={() => this.makeOperation("+")}
            >
              +
            </button>
            <button
              id="key-equals"
              value="="
              className="calculator-key key-equals"
              onClick={() => this.makeOperation("=")}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;

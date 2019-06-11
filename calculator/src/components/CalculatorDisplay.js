import React from 'react';
import "./calculatordisplay.css";

export default function CalculatorDisplay(props) {
    return (
        <div className="calculator-display">
                <p className="input-display">{props.display}</p>
        </div>
    )
}

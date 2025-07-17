import React, { Component } from "react";
import "./index.css";
export default class Keypads extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="keypads" onClick={this.props.handleClick}>
        {this.props.keys.map((btn) => (
          <button
            data-value={btn.label}
            data-category={btn.category}
            className={btn.span || ""}
            id={btn.id}
            key={btn.id}
          >
            {btn.label}
          </button>
        ))}
      </div>
    );
  }
}

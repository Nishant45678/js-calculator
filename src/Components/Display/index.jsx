import { Component } from "react";
import "./index.css";

export default class Display extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="display-wrapper">
        <div className="evaluation">{this.props.expression}</div>
        <div className="display" id="display">
          {this.props.display}
        </div>
      </div>
    );
  }
}

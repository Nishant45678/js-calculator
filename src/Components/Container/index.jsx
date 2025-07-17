import { Component } from "react";
import "./index.css";
import Display from "../Display";
import Keypads from "../Keypads";
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      expression: "",
      isEvaluated: false,
    };
  }
  handleClick = (e) => {
    const { expression, isEvaluated, display } = this.state;

    const { value, category } = e.target.dataset;

    if (!value) return;

    switch (category) {
      case "clear":
        this.setState({ display: "0", expression: "", isEvaluated: false });
        break;
      case "operand":
        if (display === "0" || isEvaluated) {
          this.setState({
            display: value,
            expression: value,
            isEvaluated: false,
          });
        } else {
          this.setState({
            display: display + value,
            expression: expression + value,
          });
        }

        break;
      case "decimal":
        if (isEvaluated) {
          this.setState({
            display: "0.",
            expression: "0.",
            isEvaluated: false,
          });
        } else if (display === "0" || /[+\-*/]$/.test(display)) {
          this.setState({
            display: "0.",
            expression: expression + "0.",
          });
        } else if (!display.includes(".")) {
          this.setState({
            display: display + value,
            expression: expression + value,
          });
        }
        break;
      case "operator":
        if (isEvaluated) {
          this.setState({
            expression: display + value,
            display: value,
            isEvaluated: false,
          });
        } else if (/[+\-*/]$/.test(expression)) {
          if (/[+*/]-$/.test(expression)) {
            this.setState({
              display: value,
              expression: expression.slice(0, -2) + value,
            });
          } else if (value === "-") {
            this.setState({
              display: value,
              expression: expression + value,
            });
          } else {
            this.setState({
              display: value,
              expression: expression.slice(0, -1) + value,
            });
          }
        } else {
          this.setState({
            display: value,
            expression: expression + value,
          });
        }
        break;
      case "equals":
        try {
          if (!expression || /[+\-*/]$/.test(expression)) return;
          else if (!isEvaluated) {
            const sanitized = expression.replace(/[^+\-*./\d]/g, "");
            const result = Function(`return ${sanitized}`)();
            this.setState({
              display: result,
              expression: expression + "=" + result,
              isEvaluated: true,
            });
          }
        } catch (error) {
          this.setState({
            display: error,
            expression: "",
            isEvaluated: true,
          });
        }
        break;
      default:
        break;
    }
  };
  render() {
    const keys = [
      {
        label: "AC",
        id: "clear",
        category: "clear",
        span: "col-span-2",
      },
      {
        label: "/",
        id: "divide",
        category: "operator",
      },
      {
        label: "*",
        id: "multiply",
        category: "operator",
      },
      {
        label: "7",
        id: "seven",
        category: "operand",
      },
      {
        label: "8",
        id: "eight",
        category: "operand",
      },
      {
        label: "9",
        id: "nine",
        category: "operand",
      },
      {
        label: "-",
        id: "subtract",
        category: "operator",
      },
      {
        label: "4",
        id: "four",
        category: "operand",
      },
      {
        label: "5",
        id: "five",
        category: "operand",
      },
      {
        label: "6",
        id: "six",
        category: "operand",
      },
      {
        label: "+",
        id: "add",
        category: "operator",
      },
      {
        label: "1",
        id: "one",
        category: "operand",
      },
      {
        label: "2",
        id: "two",
        category: "operand",
      },
      {
        label: "3",
        id: "three",
        category: "operand",
      },
      {
        label: "=",
        id: "equals",
        category: "equals",
        span: "row-span-2",
      },
      {
        label: "0",
        id: "zero",
        category: "operand",
        span: "col-span-2",
      },
      {
        label: ".",
        id: "decimal",
        category: "decimal",
      },
    ];
    return (
      <div className="container">
        <Display
          expression={this.state.expression}
          display={this.state.display}
        />
        <Keypads keys={keys} handleClick={this.handleClick} />
      </div>
    );
  }
}

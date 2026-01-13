// @ts-nocheck
import React from "react";

class Test extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2023,
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    //runs after first render => RETRIEVE DATA FROM BACKEND SERVER
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    //runs before component unmount
  }

  componentDidUpdate() {
    console.log("componentDidUpdate()");
    //runs before component unmount
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change detail
        </button>
      </div>
    );
  }
}
export default Test;

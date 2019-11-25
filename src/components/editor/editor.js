import React, { Component } from "react";
import "./editor.css";
import axios from "axios";

export default class Editor extends Component {
  state = {
    value: this.props.label,
    isInEditMode: this.props.isInEditMode
  };

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    });
    console.log("editing right now");
  };

  updateComponentValue = () => {
    this.setState({
      isInEditMode: false,
      value: this.refs.theTextInput.value
    });

    this.AxiosPut();
  };

  AxiosPut() {
    const task = {
      label: this.refs.theTextInput.value,
      important: false,
      done: false
    };
    axios
      .put(
        `https://my-json-server.typicode.com/magina671/todolist-react/todoData/${this.props.id}`,
        { task }
      )
      // .then(res => console.log(`PUT: ${res.data}`));
  }

  renderEditView = () => {
    return (
      <div>
        <input type="text" defaultValue={this.state.value} ref="theTextInput" />
        <button onClick={this.changeEditMode}>X</button>
        <button onClick={this.updateComponentValue}>OK</button>
      </div>
    );
  };

  renderDefaultView = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-outline-warning btn-sm float-left"
          onClick={this.changeEditMode}
        >
          <i className="fa fa-pencil-square-o"></i>
        </button>
        {this.state.value}
      </div>
    );
  };

  render() {
    return this.state.isInEditMode
      ? this.renderEditView()
      : this.renderDefaultView();
  }
}

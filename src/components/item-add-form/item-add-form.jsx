import React, { Component } from "react";
import "./item-add-form.css";
import axios from "axios";

export default class ItemAddForm extends Component {
  state = {
    label: "",
    important: false,
    done: this.props.done
  };

  


  onLabelChange = event => {
    this.setState({
      label: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault(); // не перезагружать страницу

    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ""
    });

    const task = {
      label: this.state.label,
      important: false,
      done: false, 
    };
    axios
      .post(
        `https://my-json-server.typicode.com/magina671/todolist-react/todoData/`,
        { task }
      )
      .then(res => {
        console.log("POST :" + res.data);
        // this.setState({
        //   todoData: [
        //     this.state.label,
        //     this.state.important,
        //     this.state.done,
        //   ]
        // });
      });
  };

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="what needs to be done"
          value={this.state.label}
        />
        <button type="submit" className="btn btn-outline-secondary">
          Addtask
        </button>
      </form>
    );
  }
}

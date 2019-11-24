import React, { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    term: ""
  };

  onSearchChange = e => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    const searchText = { fontSize: "20px" };
    return (
      <input
        type="text"
        className="form-control search-input"
        style={searchText}
        placeholder="search"
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    );
  }
}

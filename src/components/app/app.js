import React, { Component } from "react";
// import ReactDOM from "react-dom";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import "./app.css";
import ItemAddForm from "../item-add-form";
// import TodoListItem from "../todo-list-item";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      // this.createTodoItem("Learn Frontend"),
      // this.createTodoItem("Listen to music"),
      // this.createTodoItem("Relax"),
      { label: "Learn Frontend", important: false, done: false, id: 1 },
      { label: "Learn React", important: false, done: false, id: 2 },
      { label: "Find Work", important: false, done: false, id: 3 }
    ],
    term: "",
    filter: "all"
  };

  // createTodoItem(label) {
  //   return {
  //     id: this.maxId++,
  //     label,
  //     important: false,
  //     done: false
  //   };
  // }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray
      };
    });
  };

  addItem = label => {
    //generate id
    // const newItem = this.createTodoItem(text);
    const newItem = {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
    //add element to array
    this.setState(({ todoData }) => {
      // const dataForNewArray = todoData.slice(0);
      // dataForNewArray.push(newItem);
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  // toggleProperty(arr, id, propName) {
  //   const idx = arr.findIndex(el => el.id === id);
  //   //1) update object
  //   const oldItem = arr[idx];
  //   const newItem = { ...oldItem, [propName]: !oldItem[propName] };
  //   //2) construct new array
  //   // const before = arr.slice(0, idx);
  //   // const after = arr.slice(idx + 1);
  //   // const newArray = [...before, newItem, ...after];
  //   const newArray = [arr.slice(0, idx), newItem, arr.slice(idx + 1)];
  //   return { newArray };
  // }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, important: !oldItem.important };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, newItem, ...after];
      return {
        todoData: newArray
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, newItem, ...after];
      return {
        todoData: newArray
      };
    });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  filterItems(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter(item => !item.done);
    } else if (filter === "done") {
      return items.filter(item => item.done);
    }
  }

  onSearchChange = term => {
    this.setState({ term });
  };

  searchItems(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1; //больше -1 те строки, которые есть
    });
  }

  render() {
    const { term, filter } = this.state;
    const visibleItems = this.filterItems(
      this.searchItems(this.state.todoData, term),
      filter
    );
    const doneCount = this.state.todoData.filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="search-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

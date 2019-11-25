import React, { Component } from "react";
import "./todo-list-item.css";
import Editor from "../editor";

export default class TodoListItem extends Component {
  // constructor() {
  //   super();
  // this.state = {
  //   done:false
  // };
  // this.onLabelClick = () => {
  //   console.log(`Done: ${this.props.label}`);
  // };
  // }
  // state = {
  //   done: false,
  //   important: false
  // };
  // onLabelClick = () => {
  //   this.setState(state => {
  //     return {
  //       done: !state.done
  //     };
  //   });
  // };
  // makeImportant = () => {
  //   this.setState(({ important }) => {
  //     return {
  //       important: !important
  //     };
  //   });
  // };
  

  render() {
    const {
      label,
      onDeleted,
      onToggleDone,
      onToggleImportant,
      important,
      done,
      isInEditMode,
      id
    } = this.props;

    let classNames = "todo-list-item";
    if (done) {
      classNames += " done";
    }

    if (important) {
      classNames += " important";
    }

    return (
      
        <span className={classNames}>
          <div className="todo-list-item-label" onClick={onToggleDone}>
            <Editor id = {id} label = {label} isInEditMode = {isInEditMode} />
          </div>

          <button
            type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={onToggleImportant}
          >
            <i className="fa fa-exclamation"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={onDeleted}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </span>
    );
  }
}

// const TodoListItemFunc = ({ label, important = false }) => {
//   const textStyle = {
//     color: important ? "steelblue" : "black",
//     fontWeight: important ? "bold" : "normal"
//   };
//   return (
//     <span className="todo-list-item">
//       <span className="todo-list-item-label" style={textStyle}>
//         {label}
//       </span>

//       <button
//         type="button"
//         className="btn btn-outline-success btn-sm float-right"
//       >
//         <i className="fa fa-exclamation"></i>
//       </button>

//       <button
//         type="button"
//         className="btn btn-outline-danger btn-sm float-right"
//       >
//         <i className="fa fa-trash-o"></i>
//       </button>
//     </span>
//   );
// };

// export default TodoListItem;

import React from "react";
import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
  const elements = todos.map(item => {
    const { id, ...itemProps } = item; //передаем в TodoListItem все кроме ID-

    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem
          {...itemProps} // берем все свойства item и передаем их, в итоге сокращается код и нам не надо использовать нижнюю строку.
          // label={item.label} important={item.important}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;

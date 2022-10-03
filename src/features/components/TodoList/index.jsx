import { DeleteOutline, Edit } from '@mui/icons-material';
import { Checkbox, IconButton } from '@mui/material';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TodoForm from '../TodoForm';
import './styles.scss';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
  onRemoveTodo: null,
  onEditTodo: null,
};

function TodoList({ todoList, onTodoClick, onRemoveTodo, onEditTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const handleTodoClick = (todo, index) => {
    if (!onTodoClick) return;
    onTodoClick(todo, index);
  };

  const handleRemoveTodo = (todo, index) => {
    if (!onRemoveTodo) return;
    onRemoveTodo(todo, index);
  };

  const submitUpdate = (value) => {
    onEditTodo({ id: edit.id, title: value.title });
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id !== null) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <ul className="todo-list">
      {todoList.map((todo, index) => (
        <li
          key={todo.id}
          className={classnames({
            'todo-item': true,
            completed: todo.status === 'completed',
          })}
        >
          <IconButton onClick={() => handleTodoClick(todo, index)}>
            <Checkbox
              sx={{ color: '#ffffffe0' }}
              checked={todo.status === 'completed' ? true : false}
            />
          </IconButton>

          <span className="todo-title">{todo.title}</span>

          <div>
            <IconButton
              sx={{ color: '#ffffffe0' }}
              onClick={() => handleRemoveTodo(todo.id)}
            >
              <DeleteOutline />
            </IconButton>

            <IconButton
              sx={{ color: '#ffffffe0' }}
              onClick={() => setEdit({ id: todo.id, value: todo.title })}
            >
              <Edit />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles.scss';

function TodoFeature(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search); // ?status=new ==> status: 'new'
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search); // ?status=new ==> status: 'new'
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, index) => {
    // clone current array to the new one ==> spread
    const newTodoList = [...todoList];

    // Toggle state
    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === 'new' ? 'completed' : 'new',
    };

    // update todo list
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    // setFilteredStatus('all');
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompletedClick = () => {
    // setFilteredStatus('completed');
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNewClick = () => {
    // setFilteredStatus('new');
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter(
      (todo) => filteredStatus === 'all' || filteredStatus === todo.status
    );
  }, [todoList, filteredStatus]);

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      title: values.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  const handleRemoveTodo = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const handleEditTodo = ({ id, title }) => {
    const newTodoList = [...todoList].map((todo) =>
      todo.id === id ? { ...todo, title: title } : todo
    );

    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList
        todoList={renderedTodoList}
        onTodoClick={handleTodoClick}
        onRemoveTodo={handleRemoveTodo}
        onEditTodo={handleEditTodo}
      />

      <div className="filter">
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default TodoFeature;

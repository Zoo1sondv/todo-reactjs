import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/InputField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.scss';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  edit: PropTypes.object,
};

function TodoForm({ edit, onSubmit = null }) {
  const schema = yup
    .object()
    .shape({
      title: yup
        .string()
        .required('please enter title')
        .min(3, 'title is too short'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      title: edit ? edit.value : '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <form className="todo-form" onSubmit={form.handleSubmit(handleSubmit)}>
      {!edit ? (
        <div className="todo-input">
          <InputField name="title" label="Todo" form={form} />
          <button
            onClick={form.handleSubmit(handleSubmit)}
            className="todo-button"
          >
            Add todo
          </button>
        </div>
      ) : (
        <div className="todo-input edit">
          <InputField name="title" label="Update Todo" form={form} />
          <button
            onClick={form.handleSubmit(handleSubmit)}
            className="todo-button  edit"
          >
            Update
          </button>
        </div>
      )}
    </form>
  );
}

export default TodoForm;

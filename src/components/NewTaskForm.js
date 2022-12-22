import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';

const INITIAL_FORM_DATA = {
  id: 1000,
  title: 'Enter new task title here',
  description: 'Enter task description here',
  isComplete: false,
};

const NewTaskForm = ({addTask}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    let datafield = e.target.value;
    const newFormData = {
      ...formData,
      [e.target.name]: datafield,

    };
    setFormData(newFormData);
  };

  const handleNewTaskSubmit = (e) =>{
    e.preventDefault();
    addTask(formData);
  };

  return (
    <form onSubmit={handleNewTaskSubmit}>
      <label htmlFor='title'>Task Title</label>
      <input
        type='text'
        id='title'
        name='title'
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor='description'>Task Description</label>
      <input
        type='text'
        id='description'
        name='description'
        value={formData.description}
        onChange={handleChange}
      />

      <input type='submit' value='Add task'/>
    </form>
  );
};
NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired
};
export default NewTaskForm;
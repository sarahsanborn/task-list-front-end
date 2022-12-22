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

  const handleChange = (e) => { // When there is a change in the input, an "event" occures. We call this e.
    let datafield = e.target.value; // using e.target.value allows us to enter to the data of the event
    const newFormData = {
      ...formData,
      [e.target.name]: datafield, // We're making new keys based on the input names and the values associated with that name
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
        id='title' // id is a unique identifier for the input
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
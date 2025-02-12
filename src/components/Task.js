import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, updateComplete, deleteTask }) => {
  // const [complete, setComplete] = useState(isComplete);

  // const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  const updateCompleteButtonClick = isComplete
    ? 'tasks__item__toggle--completed'
    : '';
    // The above switches the class back and forth (called a ternary function)

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${updateCompleteButtonClick}`}
        onClick={() => updateComplete(id, isComplete)} // We made sure to pass these in, as specified in App.js
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteTask(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;

import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, updateComplete }) => {
  // const [complete, setComplete] = useState(isComplete);


  // const buttonClass = complete ? 'tasks__item__toggle--completed' : '';


  // THIS IS WHERE WE GOT LOST
  const updateCompleteButtonClick = () => {
    const updateCompleteButton = {
      id: {id},
      titleData: {title},
      isComplete: (isComplete ? 'tasks__item__toggle--completed' : '')
    };
    updateComplete(id, updateCompleteButtonClick); // SHOULD THIS BE A FUNCTION OR A VARIABLE?!?!?!!
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${updateCompleteButtonClick}`} // SAME QUESTION HERE
        onClick={() => updateComplete(!isComplete)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateComplete: PropTypes.func.isRequired
};

export default Task;

import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const initialCopy = TASKS.map((task) => {
    return {...task};
  });

  const [taskList, setTaskList] = useState(initialCopy);

  const updateComplete = (taskId, isComplete) => {
    const newTaskList = [];
    for (const task of taskList) {
      if (task.id !== taskId) {
        newTaskList.push(task);
      } else {
        const newTask = {
          ...task,
          isComplete: !isComplete
        };
        newTaskList.push(newTask);
      }
    }
    setTaskList(newTaskList);
    console.log("We're in the updateComplete function");
    console.log(newTaskList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskList} updateComplete={updateComplete} />}</div>
      </main>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  // const initialCopy = TASKS.map((task) => {
  //   return { ...task };
  // });

  const [taskList, setTaskList] = useState([]);
  const URL = 'http://127.0.0.1:5000/tasks';
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        // console.log(response);
        const tasksApiResCopy = response.data.map((task) => {
          return {
            ...task,
          };
        });
        setTaskList(tasksApiResCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Tasks not updating on website
  const updateComplete = (taskId, isComplete) => {
    const newTaskList = [];
    axios
      .patch(`${URL}/${taskId}/${isComplete}`)
      .then((response) => {
        for (const task of taskList) {
          if (task.id !== taskId) {
            newTaskList.push(task);
          } else {
            const newTask = {
              ...task,
              isComplete: !isComplete,
            };
            newTaskList.push(newTask);
          }
        }
        setTaskList(newTaskList);
        console.log("We're in the updateComplete function");
        console.log(newTaskList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTaskList = [];
        for (const task of taskList) {
          if (task.id !== taskId) {
            newTaskList.push(task);
          }
        }
        setTaskList(newTaskList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskList}
              updateComplete={updateComplete}
              deleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;

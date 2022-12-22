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
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const tasksApiResCopy = response.data.map((task) => {
          return {
            description: task.description,
            id: task.id,
            title: task.title,
            isComplete: task.is_complete, // changing given is_complete from API to isComplete for JS (camel case) for 
          };
        });
        console.log(tasksApiResCopy);
        setTaskList(tasksApiResCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newTaskList = [];
  const updateCompleteHelper = (taskId, isComplete) => {
    console.log('in helper function');
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
  };

  const updateComplete = (taskId, isComplete) => {
    // console.log('We are in updateComplete function! Yay!');
    if (isComplete === false) {
      // console.log('We are in the conditional statement');
      axios
        .patch(`${URL}/${taskId}/mark_complete`)
        .then(() => {updateCompleteHelper(taskId, isComplete);
          setTaskList(newTaskList);
          // console.log('mark_complete');
          // console.log(newTaskList);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isComplete === true) {
      axios
        .patch(`${URL}/${taskId}/mark_incomplete`)
        .then(() => {updateCompleteHelper(taskId, isComplete);
          setTaskList(newTaskList);
          // console.log('mark INcomplete');
          // console.log(newTaskList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

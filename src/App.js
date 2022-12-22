import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

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

  const getAllTasks = () => {
    axios
      .get(URL)
      .then((response) => {
        const tasksApiResCopy = response.data.map((task) => {
          return {
            description: task.description,
            id: task.id,
            title: task.title,
            isComplete: task.is_complete, // The API gives is_complete (snake case) as a key, but we need to change it to isComplete (camel case) for JS to understand it 
          };
        });
        console.log(tasksApiResCopy);
        setTaskList(tasksApiResCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getAllTasks, []);

  const newTaskList = [];
  const updateCompleteHelper = (taskId, isComplete) => {
    console.log('in helper function');
    for (const task of taskList) {
      if (task.id !== taskId) {
        newTaskList.push(task);
      } else {
        const newTask = {
          ...task, // This says to make a copy of each task 
          isComplete: !isComplete, // except for the isComplete key, which should switch the value from false to true and vice versa
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
        .then(() => {updateCompleteHelper(taskId, isComplete); // Made a helper function to have DRY code
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

  const addTask = (newTaskInfo) => {
    axios.post(URL, newTaskInfo)
    .then((response)=>{
      getAllTasks();
      const newTasks = [...taskList];
      const newTaskJSON={
        ...newTaskInfo,
        'id': response.data.id
      };
      newTasks.push(newTaskJSON);
      setTaskList(newTasks); 
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
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
          <NewTaskForm addTask={addTask}></NewTaskForm>
        </div>
      </main>
    </div>
  );
};

export default App;

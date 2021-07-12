import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from "react";

const  App = (props)  => { 
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks()
      setTask(taskFromServer)
    }
    getTask()
  })


// fetch tasks (all)
const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5000/task')
    const data = await res.json()
    return data 
}

// fetch task (singular)
const fetchTask = async (id)=>{
  const res = await fetch (`http:localhost:5000/task${id}`) 
  const data = await res.json()
  return data

}
//Add Task
const addTask  = async (task) =>{ 
  const res = await fetch('http://localhost:5000/task',{
    method: 'POST',
    headers : {
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTask([...tasks, data])
}
//Delete Task
const deleteTask = async(id) => {
  await fetch(`http://localhost:5000/task/${id}`, {method : 'DELETE'})
  setTask(tasks.filter((task)=> task.id !== id))
}

//Toggle Reminder
const toggleReminder = async(id)=>{
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.remider}
  const res = await fetch(`http://localhost:5000/task/${id}`,{
    method : 'PUT',
    header : {
      'Content-type':'application/json'
    },
    body: JSON.stringify(updateTask)
  })

  const data = await res.json()
  setTask(
    tasks.map((task)=> 
    task.id === id ? {...task, reminder: 
      data.reminder } : task
      )
  )
}


  return (
    <div className='container'>
      <Header title = {"Task Tracker"} onAdd = {()=> setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? ( <Tasks 
      tasks = {tasks}  
      onDelete = {deleteTask}
      onToggle = {toggleReminder} />):('No task to show.')}
    </div>  
  )

}
 
export default App
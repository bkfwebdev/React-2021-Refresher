import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from "react";

const  App = (props)  => { 
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTask()
      setTask(taskFromServer)
    }
    getTask()
  })

const fetchTask = async ()=>{
    const res = await fetch("http://localhost:5000/task")
    const data = await res.json()
    return data 
}

//Add Task
const addTask  = (task) =>{ 
  const id = Math.floor(Math.random()*1000)+1
  const newTask = {id,...task}
  setTask([...tasks,newTask])
}
//Delete Task
const deleteTask = async(id) => {
  await fetch(`http://localhost:5000/task/${id}`, {method : 'DELETE'})
  setTask(tasks.filter((task)=> task.id !== id))
}

//Toggle Reminder
const toggleReminder = (id)=>{
  setTask(
    tasks.map((task)=> 
    task.id === id ? {...task, reminder: 
      !task.reminder } : task
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
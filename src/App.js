import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState } from "react";

const  App = (props)  => { 
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([
    { id: 1, 
      text: "some of these", 
      day: "June 16th 2021 1:00pm", 
      reminder: true },
    {
      id: 2,
      text: "some of them",
      day: "June 17th 2021 3:00pm",
      reminder: true,
    },
    { id: 3, 
      text: "some of those", 
      day: "June 18th 2021 5:00pm", 
      reminder: true },
  ])

//Add Task
const addTask  = (task) =>{ 
  const id = Math.floor(Math.random()*1000)+1
  const newTask = {id,...task}
  setTask([...tasks,newTask])
}
//Delete Task
const deleteTask = (id)=>{
  setTask(tasks.filter((task)=>task.id !== id))
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
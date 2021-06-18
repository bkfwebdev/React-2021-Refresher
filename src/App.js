import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from "react";

const  App = (props)  => {
  const [tasks, setTask] = useState([
    { id: 1, text: "fuck this nigga", day: "June 16th 2021", reminder: true },
    {
      id: 2,
      text: "fuck that nigga",
      day: "June 17th 2021",
      reminder: true,
    },
    { id: 3, text: "fuck those niggas", day: "June 18th 2021", reminder: true },
  ])

const deleteTask = (id)=>{
  setTask(tasks.filter((task)=>task.id !== id))
}


  return (
    <div className='container'>
      <Header title = {"Task Tracker"} />
      <Tasks tasks = {tasks}  onDelete = {deleteTask}/>
    </div> 
  )

}

export default App
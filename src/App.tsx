import './App.css'
import { useState, useEffect } from 'react'
import { Title } from './components/Title'
import { InputForm } from './components/InputForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskList } from './components/TaskList'
import type { Task, FilterType, Priority, Category, TaskUpdate } from './types'

function App() {
  const [filter, setFilter] = useState<FilterType>('ALL')
  const [taskList, setTaskList] = useState<Task[]>([])
  const priority: Priority = 'medium'
  const category: Category = 'work'
  const handleRemoveTask = (id: number) => {
    setTaskList(taskList.filter(task => task.id !== id))
  }

  const handleClearAllTasks = () => {
    setTaskList([])
  }

  const handleChangeTask = (id: number, updatedTask: TaskUpdate) => {
    setTaskList(taskList.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ))
  }
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList))
  }, [taskList])

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date()
    }
    setTaskList([...taskList, newTask])
  }


  return (
    <>
      <div className='todo'>
        <Title str="ToDo App" />
        <InputForm onAddTask={handleAddTask} priority={priority} category={category} />
        <TaskFilter onChange={setFilter} value={filter} />
        <TaskList taskList={taskList} handleRemoveTask={handleRemoveTask} handleClearAllTasks={handleClearAllTasks} handleChangeTask={handleChangeTask} filter={filter} />
      </div>
    </>
  )
}

export default App

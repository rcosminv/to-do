import React, {useState, useRef, useEffect} from 'react';
import ToDoList from './ToDoList'
import { v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'todoAPP.todos'

function App() {
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef()
  
useEffect( () => {

  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodos) setTodos(storedTodos)

},[] )

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
},[todos])

  function toggleToDo (id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => (id === todo.id))

    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddToDo (e)
  {
   let name = todoNameRef.current.value 
   if(name === '') return
   setTodos(prevTodos =>{
     return [...prevTodos , {id : uuidv4() , name : name , complete : false}]
   })
   todoNameRef.current.value = null

  }
  return (
    <>

      <ToDoList todos = {todos} toggleToDo = {toggleToDo} />
      
      <input  ref = {todoNameRef} type = "text"/>
      <button onClick = {handleAddToDo}>Add To do</button>
      <button> Clear complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )

}
export default App;

import React, { useState, useEffect} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import AddToDo from "./components/addToDo/addToDo";
import ListToDo from "./components/ListToDo/ListToDo";

function App() {
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="App">
      <Header />
      <AddToDo todo={todo} setTodo={setTodo} />
      <ListToDo todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;

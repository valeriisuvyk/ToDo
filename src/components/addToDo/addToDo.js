import styled from "styled-components";
import React, { useState, useEffect } from "react";

const ButtonSave = styled.button`
  color: white;
  background-color: green;
`;
const Layout = styled.div``
const clearStatisticSavedTodos = styled.button`

`

const AddToDo = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");

  const [countTodos, setCountTodos] = useState(localStorage.getItem("countTodos") || todo.length);

  useEffect(() => {
    setCountTodos(todo.length)
  }, [todo]);


  const deleteAllTodos = () => {
  setTodo([])
  }



  const [count, setCount] = useState(localStorage.getItem("count") || 0);

 let deleteSavedTodoStatistic = () => {
 setCount(0)
 }



  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const saveTodo = () => {
    if (value.trim() !== "") {
      setTodo([
        ...todo,
        {
          id: new Date().toISOString(),
          title: value,
          status: true,
        },
      ]);
      setCount((prev) => +prev + 1);
      setValue("");
    }
  };

  return (
    <Layout>
      <input
        placeholder="enter todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ButtonSave onClick={saveTodo}>Save</ButtonSave>
      <div><button onClick={deleteAllTodos}>delete all todos</button></div>
      
      <p>Statistic:</p>
      <p>you have {countTodos} todos already</p>
      <p>you created {count} todos </p>
      <div><button onClick={deleteSavedTodoStatistic}>Delete saved todo statistic</button></div>
    </Layout>
  );
};

export default AddToDo;

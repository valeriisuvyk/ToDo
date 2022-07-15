import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "../../App.scss";

const ButtonSave = styled.button`
  color: white;
  margin-left: 5px;
  background-color: rgb(60, 179, 113);
  border-radius: 5px;
  border: 2px solid grey;
`;

const InputTask = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid grey;
  :placeholder {
    color: red;
  }
`;

const ButtonDeleteAllTodos = styled.button`
  padding: 0px;
  background: rgb(249, 249, 197);
  border-radius: 7px;
  border: 1px solid gray;
  padding-left: 5px;
  padding-right: 5px;
`;

const ButtonDeleteStatistic = styled.button`
  padding: 0px;
  background: rgb(249, 249, 197);
  border-radius: 7px;
  border: 1px solid gray;
  padding-left: 5px;
  padding-right: 5px;
`;

const AddToDo = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");

  const [countTodos, setCountTodos] = useState(
    localStorage.getItem("countTodos") || todo.length
  );

  const randColor = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    setCountTodos(todo.length);
  }, [todo]);

  const deleteAllTodos = () => {
    setTodo([]);
  };

  const [count, setCount] = useState(localStorage.getItem("count") || 0);

  let deleteSavedTodoStatistic = () => {
    setCount(0);
  };

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
          color: `rgb(${randColor(0, 255)}, ${randColor(0, 255)}, ${randColor(
            0,
            255
          )})`,
        },
      ]);
      setCount((prev) => +prev + 1);
      setValue("");
    }
  };

  return (
    <div className="Layout">
      <div className="Input">
        <InputTask
          placeholder="type your task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ButtonSave onClick={saveTodo}>Save</ButtonSave>
      </div>
      <p className="statistic">Statistic:</p>
      <div className="StatisticDivFirst">
        <div className="StatisticWrapper">
          <p>already you have {countTodos} todos</p>
          <ButtonDeleteAllTodos onClick={deleteAllTodos}>
            Clear all todos
          </ButtonDeleteAllTodos>
        </div>
        <div className="StatisticWrapper">
          <p>you created {count} todos </p>

          <ButtonDeleteStatistic onClick={deleteSavedTodoStatistic}>
            Reset
          </ButtonDeleteStatistic>
        </div>
      </div>
    </div>
  );
};

export default AddToDo;

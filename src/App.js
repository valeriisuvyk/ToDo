import React, { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import AddToDo from "./components/addToDo/addToDo";
import ListToDo from "./components/ListToDo/ListToDo";
import styled from "styled-components";

const ButtonAddData = styled.button`
  font-size: 22px;
  padding: 3px 6px;
  background: rgb(249, 249, 197);
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid gray;
`;

function App() {
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );

  const randColor = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const addFetchData = () => {
    fetch(
      "https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json",
      { method: "GET" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodo(
          todo.concat(
            data.map((obj) => {
              return {
                title: obj.text,
                id: obj.id,
                status: obj.isCompleted,
                color: `rgb(${randColor(0, 255)}, ${randColor(
                  0,
                  255
                )}, ${randColor(0, 255)})`,
              };
            })
          )
        );
      });
    // }, []);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="divvv">
      <div className="layoutdiv">
        <div className="Wrapper">
          <Header />
          <div>
            <ButtonAddData onClick={addFetchData}>
              add from server
            </ButtonAddData>
          </div>
          <AddToDo todo={todo} setTodo={setTodo} />
          <ListToDo todo={todo} setTodo={setTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;

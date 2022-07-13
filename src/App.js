import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import AddToDo from "./components/addToDo/addToDo";
import ListToDo from "./components/ListToDo/ListToDo";
import styled from "styled-components";


const Wrapper = styled.div`

width: 20%;
text-align: center;
`
const Layout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

function App() {
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );

  const addFetchData = () => {
    // useEffect(() => {
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
    <Layout>
      <Wrapper>
        <Header />
        <div>
          <button onClick={addFetchData}>add from server</button>
        </div>
        <AddToDo todo={todo} setTodo={setTodo} />
        <ListToDo todo={todo} setTodo={setTodo} />
      </Wrapper>
    </Layout>
  );
}

export default App;

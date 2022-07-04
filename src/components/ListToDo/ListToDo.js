import React, { useState, useEffect} from "react";
import styled from "styled-components";

const Button = styled.button`
  color: white;
  background-color: red;
`;

const ButtonSave = styled.button`
  color: white;
  background-color: green;
  margin-left: 10px;
`;

const ButtonEdit = styled.button`
  color: white;
  background-color: gray;
`;

const ButtonClearStatisticEditedTodos = styled.button`

`

const P = styled.p``;

const ListToDo = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState(null);

  const [value, setValue] = useState("");

  const [deletedTodos, setDeletedTodos] = useState(localStorage.getItem("deleted") || 0);

  useEffect(() => {
    localStorage.setItem("deleted", deletedTodos);
  }, [deletedTodos]);

  const [editedTodos, setEditedTodos] = useState(localStorage.getItem("edited") || 0);

  useEffect(() => {
    localStorage.setItem("edited", editedTodos);
  }, [editedTodos]);

  const deleteTodo = (id) => {
    let newTodo = [...todo].filter((item) => item.id !== id);
    setTodo(newTodo);
    setDeletedTodos((prev) => +prev + 1);
  };
  
  let deleteEditedStatistic = () => {
   setEditedTodos(0)
  }
  let deleteDeletedStatistic = () => {
  setDeletedTodos(0)
  }

  const editTodo = (id, title) => {
    setEdit(id);
    setValue(title);
  };

  const saveTodo = (id) => {
    let newTodo = [...todo].map((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
    setEditedTodos((prev) => +prev + 1);
  };

  return (
    <div>
      <P>you deleted {deletedTodos} todos</P>
      <div><button onClick={deleteDeletedStatistic}>Delete deleted todo statistic</button></div>
      <P>you edited {editedTodos} todos</P>
      <div><button onClick={deleteEditedStatistic}>Delete edited todo statistic</button></div>
      {todo.map((item) => (
        <div key={item.id}>
          {edit === item.id ? (
            <div>
              <input value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          ) : (
            <div>{item.title}</div>
          )}

          {edit === item.id ? (
            <div>
              <ButtonSave onClick={() => saveTodo(item.id)}>
                save changes
              </ButtonSave>
            </div>
          ) : (
            <div>
              <Button onClick={() => deleteTodo(item.id)}>Delete</Button>
              <ButtonEdit onClick={() => editTodo(item.id, item.title)}>
                Edit
              </ButtonEdit>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default ListToDo;

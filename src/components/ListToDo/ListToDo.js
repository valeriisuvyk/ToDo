import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ButtonDelete = styled.button`
  border: none;
  border-radius: 3px;
  padding: 3px;
  color: white;
  background-color: red;
  margin-right: 5px;
`;

const ButtonEdit = styled.button`
  padding: 3px;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: gray;
`;


const Div = styled.div``
const Layout = styled.div``
const WrapperTodo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-radius: 5px;
background-color: lightgrey;
margin-bottom: 20px;
padding: 5px 10px;

`


const ButtonSave = styled.button`
  border: none;
  border-radius: 3px;
  color: white;
  background-color: green;
  margin-left: 10px;
`;




const P = styled.p``;

const ListToDo = ({ todo, setTodo }) => {
  

  const [edit, setEdit] = useState(null);

  const [value, setValue] = useState("");

  const [deletedTodos, setDeletedTodos] = useState(
    localStorage.getItem("deleted") || 0
  );

  useEffect(() => {
    localStorage.setItem("deleted", deletedTodos);
  }, [deletedTodos]);

  const [editedTodos, setEditedTodos] = useState(
    localStorage.getItem("edited") || 0
  );

  useEffect(() => {
    localStorage.setItem("edited", editedTodos);
  }, [editedTodos]);

  const deleteTodo = (id) => {
    let newTodo = [...todo].filter((item) => item.id !== id);
    setTodo(newTodo);
    setDeletedTodos((prev) => +prev + 1);
  };

  let deleteEditedStatistic = () => {
    setEditedTodos(0);
  };
  let deleteDeletedStatistic = () => {
    setDeletedTodos(0);
  };

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
    <Layout>
      <P>you deleted {deletedTodos} todos</P>
      <div>
        <button onClick={deleteDeletedStatistic}>
          Delete deleted todo statistic
        </button>
      </div>
      <P>you edited {editedTodos} todos</P>
      <div>
        <button onClick={deleteEditedStatistic}>
          Delete edited todo statistic
        </button>
      </div>
      
      {todo.map((item) => (
        <WrapperTodo key={item.id}>
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
            <Div>
              <ButtonDelete onClick={() => deleteTodo(item.id)}>Delete</ButtonDelete>
              <ButtonEdit onClick={() => editTodo(item.id, item.title)}>
                Edit
              </ButtonEdit>
            </Div>
          )}
        </WrapperTodo>
      ))}
    </Layout>
  );
};

export default ListToDo;

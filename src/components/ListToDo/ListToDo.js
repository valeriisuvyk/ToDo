import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../App.scss";

const ButtonDelete = styled.button`
  border: none;
  border-radius: 7px;
  padding: 3px;
  color: white;
  background-color: rgb(255, 69, 0);
  margin-right: 5px;
`;

const Input = styled.input`
  width: 350px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const ButtonDeleteStatistic = styled.button`
  padding: 0px;
  background: rgb(249, 249, 197);
  border-radius: 7px;
  border: 1px solid gray;
  padding-left: 5px;
  padding-right: 5px;
`;

const ButtonEdit = styled.button`
  padding: 3px;
  border: 1px solid gray;
  border-radius: 7px;
  color: white;
  background-color: gray;
`;

const ButtonSave = styled.button`
  border: 1px solid gray;
  border-radius: 7px;
  color: white;
  background-color: rgb(60, 179, 113);
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
    <div className="Layout">
      <div className="StatisticDiv">
        <div className="StatisticWrapper">
          <P>you deleted {deletedTodos} todos</P>

          <ButtonDeleteStatistic onClick={deleteDeletedStatistic}>
            Reset
          </ButtonDeleteStatistic>
        </div>

        <div className="StatisticWrapper">
          <P>you edited {editedTodos} todos</P>
          <ButtonDeleteStatistic onClick={deleteEditedStatistic}>
            Reset
          </ButtonDeleteStatistic>
        </div>
      </div>

      {todo.map((item) => (
        <div
          className="WrapperTodo"
          style={{ backgroundColor: item.color }}
          key={item.id}
        >
          {edit === item.id ? (
            <div>
              <Input value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          ) : (
            <div className="ItemDiv">{item.title}</div>
          )}

          {edit === item.id ? (
            <div>
              <ButtonSave onClick={() => saveTodo(item.id)}>
                save changes
              </ButtonSave>
            </div>
          ) : (
            <div className="DeleteDiv">
              <ButtonDelete onClick={() => deleteTodo(item.id)}>
                Delete
              </ButtonDelete>
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

import styled from "styled-components";
import React, { useState } from "react";

const ButtonSave = styled.button`
  color: white;
  background-color: green;
`;

const AddToDo = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");

  const saveTodo = () => {
    setTodo([
      ...todo,
      {
        id: new Date().toISOString(),
        title: value,
        status: true,
      },
    ]);
    setValue("");
  };

  return (
    <div>
      <input
        placeholder="enter todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ButtonSave onClick={saveTodo}>Save</ButtonSave>
    </div>
  );
};

export default AddToDo;

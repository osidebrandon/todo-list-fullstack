import { List, ListItem, Typography } from "@mui/material";
import Background from "./components/Background";
import Layout from "./components/Layout";
import { Todo } from "./components/Todo";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddForm } from "./components/AddForm";
import { styled } from "styled-components";
import { Todo as TodoType } from "./types";
import { createTodo, getAllTodos, updateTodo } from "./utils/service";

const Header = styled.div`
  position: sticky;
`;

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodoType>();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const todoList = await getAllTodos();
      setTodos(todoList);
    } catch (err) {
      alert("Could not get all todos...");
    }
  };

  const addItem = async (name: string) => {
    try {
      const todo = await createTodo(name);
      setTodos([...todos, todo]);
    } catch (err) {
      alert("Could not create todo...");
    }
  };

  const setIsEditing = async (todo: TodoType, updatedName: string) => {
    if (editingTodo) {
      const newTodo: TodoType = {
        ...todo,
        name: updatedName,
      };
      await updateTodoList(newTodo);
      setEditingTodo(undefined);
      return;
    }
    setEditingTodo(todo);
  };

  const updateTodoList = async (newTodo: TodoType) => {
    const found = todos.filter((todo) => todo._id === newTodo._id)[0];
    const updatedTodo = await updateTodo(newTodo._id, newTodo);
    const newTodos = [...todos];
    const index = todos.indexOf(found);
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  };

  const checkTodo = async (id: string) => {
    try {
      const todo = todos.filter((todo) => todo._id === id)[0];
      todo.isCompleted = !todo.isCompleted;
      await updateTodoList(todo);
    } catch (err) {
      alert("Could not update todo...");
    }
  };

  return (
    <Layout>
      <Background elevation={5}>
        <Header>
          <Typography
            variant="h5"
            borderBottom={"1px solid lightgrey"}
            paddingBottom={"1rem"}
            marginBottom={"1rem"}
          >
            Todo List
          </Typography>
          <AddForm addItem={addItem} />
        </Header>
        <List>
          {todos.map((todo) => (
            <Todo
              key={todo._id}
              id={todo._id}
              name={todo.name}
              isEditing={editingTodo?._id === todo._id}
              setIsEditing={(updatedName) => setIsEditing(todo, updatedName)}
              completed={todo.isCompleted}
              onChecked={checkTodo}
            />
          ))}
        </List>
      </Background>
    </Layout>
  );
};

export default App;

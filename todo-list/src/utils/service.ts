import axios from "axios";
import { Todo } from "../types";

const BASE_URL = "http://localhost:3700";

export const createTodo = async (name: string): Promise<Todo> => {
  const url = `${BASE_URL}/api/todos`;
  const response = await axios.post(url, { name });
  const todo = response.data as Todo;
  return todo;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  const url = `${BASE_URL}/api/todos`;
  const response = await axios.get(url);
  const todoList = response.data as Todo[];
  return todoList;
};

export const updateTodo = async (id: string, todo: Todo): Promise<Todo> => {
  const url = `${BASE_URL}/api/todos/${id}`;
  const response = await axios.patch(url, todo);
  const updated = response.data as Todo;
  return updated;
};

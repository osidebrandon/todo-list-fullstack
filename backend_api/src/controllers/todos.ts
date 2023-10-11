import { Request, Response } from 'express';
import Database from '../database/database';
import { ObjectId } from 'mongodb';

const collection = 'todos';
const uri = 'mongodb://127.0.0.1:27017';
const database = new Database(uri);

type TodoWithId = {
    _id: string;
    name: string;
    isCompleted: boolean;
}

type Todo = Omit<TodoWithId, '_id'>

const getAllTodos = async (request: Request, response: Response, next: any) => {
    const todos = await database.getCollection(collection);
    response.json(todos);
}

const getTodoById = async (request: Request, response: Response, next: any) => {
    const oId = new ObjectId(request.params.id);
    const todo = await database.getDocumentById(collection, oId);
    response.json(todo);
}

const createTodo = async (request: Request, response: Response, next: any) => {
    const name = request.body.name;
    const todoForm: Todo = { name: name, isCompleted: false };
    const insertResult = await database.createDocument(collection, todoForm);
    const oId = insertResult.insertedId;

    const todo = await database.getDocumentById(collection, oId);
    response.json(todo);
}

const updateTodo = async (request: Request, response: Response, next: any) => {
    const oId = new ObjectId(request.params.id);
    const todo = request.body as TodoWithId;
    if (!todo._id || !todo.name || todo.isCompleted === undefined) {
        response.status(400).json({ message: 'Need a full todo object' });
        return;
    }
    const validated = {
        name: todo.name,
        isCompleted: todo.isCompleted,
    }
    await database.updateDocument(collection, oId, validated);
    const updatedTodo = await database.getDocumentById(collection, oId);
    response.json(updatedTodo);
}

const deleteTodo = (request: Request, response: Response, next: any) => {
    
}


export default {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
}

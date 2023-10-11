import express, { json } from 'express';
import cors from 'cors';
import todoRouter from './routes/todos';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/todos', todoRouter);

// Error Handler
// ...

// Export to use
export default app;
import app from './app';

const port = 3700;

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
});
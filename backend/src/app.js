import express from 'express';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from  "./routes/todo.routes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true // Allow cookies to be sent
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth" , authRoutes);
app.use("/api/todo" , todoRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
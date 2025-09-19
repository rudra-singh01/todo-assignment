import todoModel from "../models/todo.model.js"

export const createTodo = async (req, res) => {
    const { title, description ,dueDate } = req.body;

    console.log(req.user.id)


    if (!title ) {
        return res.status(400).json({ message: "Title are required" });
    }
    try {
        const todo = await todoModel.create({
            title,
            description,
            dueDate,
            user: req.user.id,
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.completed = completed !== undefined ? completed : !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description ,dueDate } = req.body;
    try {
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.title = title;
        todo.description = description;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await todoModel.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTodo = async (req, res) => {
    try {
        const todo = await todoModel.find({ user: req.user.id });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
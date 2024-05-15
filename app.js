const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Connect to MongoDB with increased connect timeout
const uri = "add uri here";
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  connectTimeoutMS: 60000, // Increased connect timeout to 60 seconds
});

async function run() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Connect to MongoDB using Mongoose (without deprecated options)
    await mongoose.connect(uri);

    console.log("Mongoose connected to MongoDB!");

    // Define a schema and model using Mongoose
    const todoSchema = new mongoose.Schema({
      text: String,
      completed: Boolean,
    });

    const Todo = mongoose.model('Todo', todoSchema);

    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', async (req, res) => {
      try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const todos = await Todo.find({}, { text: 1, _id: 1 })
                                .sort({ _id: -1 }) // Sort by creation time in descending order
                                .skip(skip)
                                .limit(limit);
        const totalTodos = await Todo.countDocuments();
        const hasNextPage = page * limit < totalTodos;
        res.render('index', { todos, currentPage: page, hasNextPage });
      } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).send('Internal Server Error');
      }
    });
    
    // POST endpoint for adding data
    app.post('/api/todos', async (req, res) => {
      try {
        const { text } = req.body;

        if (!text || typeof text !== 'string' || text.trim() === '') {
          return res.status(400).send('The text field is required and must be a non-empty string');
        }

        const todo = new Todo({
          text: text.trim(),
          completed: req.body.completed || false,
        });

        await todo.save();

        res.render('index', {
          todos: await Todo.find({}, { text: 1, _id: 1 }),
          successMessage: 'Item added successfully!',
          currentPage: 1
        });
      } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    // DELETE endpoint for deleting data
    app.delete('/todos/:id', async (req, res) => {
      try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).send('No todo found with that ID');
        res.send({ message: 'Item deleted successfully!', todo });
      } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    // PUT endpoint for editing data
    app.put('/todos/:id', async (req, res) => {
      try {
        const { text } = req.body;
        if (!text || typeof text !== 'string' || text.trim() === '') {
          return res.status(400).send('The text field is required and must be a non-empty string');
        }

        const todo = await Todo.findByIdAndUpdate(req.params.id, { text: text.trim() }, { new: true });
        if (!todo) return res.status(404).send('No todo found with that ID');
        res.render('index', {
          todos: await Todo.find({}, { text: 1, _id: 1 }),
          successMessage: 'Item edited successfully!',
          currentPage: 1
        });
      } catch (err) {
        console.error('Error updating todo:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

run();

// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// MongoDB connection string (Replace with your actual MongoDB URI)
const mongoURI = 'mongodb+srv://rakesh1:1234@cluster0.qpcvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB Atlas URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Define a schema for the form data
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    country: String
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// POST route to handle form submission and store data in MongoDB
app.post('/submit', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        country: req.body.country
    });

    // Save the user data to the database
    newUser.save()
        .then(() => res.status(200).send('User data saved successfully'))
        .catch(err => res.status(500).send('Error saving user data:', err));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

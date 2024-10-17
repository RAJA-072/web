const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Event model
const Event = mongoose.model('Event', new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    description: String
}), 'events');

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html'))); // Serve the frontend
app.post('/add-event', async (req, res) => {
    try {
        // Create and save a new event
        const newEvent = new Event({ ...req.body, date: new Date(req.body.date) });
        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully!' });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Failed to add event' });
    }
});

// Start the server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

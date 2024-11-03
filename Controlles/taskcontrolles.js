const { IncomingForm } = require('formidable');
const { readTasksFromFile, writeTasksToFile } = require("../utils/fileHandlers");
const { copyFileSync } = require('fs');
const path = require('path');


// Get all tasks
exports.getTasks = (req, res) => {
    const tasks = readTasksFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
};

// Create a new task
// Create a new task
exports.createTasks = (req, res) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Error parsing form'
            }));
            return;
        }
        
        const tasks = readTasksFromFile();
        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields.description,
            status: fields.status || "pending",
        };

        // Correct variable name here
        const image = files.image ? files.image[0] : null; // Handle cases where no image is uploaded

        if (image) {
            // Assuming you have the logic to copy the image here
            copyFileSync(image.path, path.join(__dirname, '../uploads', image.name));
        }

        tasks.push(newTask);
        writeTasksToFile(tasks);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Task created successfully',
            task: newTask
        }));
    });
};


// Placeholder for updating a task
exports.updateTasks = (req, res) => {
    res.end(JSON.stringify({
        message:'Not yet implemented'
    }))
    
};

// Placeholder for deleting a task
exports.deleteTasks = (req, res) => {
    res.end(JSON.stringify({
        message:'Not yet implemented'
    }))
    
}; 

const express = require('express');
const { requireToken } = require('../middleware/authorization');

const router = express.Router()
const Task = require('../models/Task')

router.get("/", requireToken, async (req, res, next) => {
    try{
        const task = await Task.find({});
        console.log(res.json(task)); 
    } catch (err) {
        next(err);
    }
});

//Get one task by id
router.get("/:id", requireToken, async (req, res, next) => {
    try {
        const oneTask = await Task.findById(req.params.id);
        res.json(oneTask);
    } catch (err){
        next(err);
    }
});

//Add a new task based on the body of the request
router.post("/", requireToken, async (req, res, next) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
});

//Updating task data, specify which one by ID
router.put("/:id", requireToken, async (req, res, next) => {
    try {
        const taskToUpdate = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(taskToUpdate);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", requireToken, async (req, res, next) => {

    try {
        const taskToUpdate = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(taskToUpdate);
    } catch (err) {
        next(err);
    }
});

//Delete a task, specify which one by ID
router.delete("/:id", requireToken, async (req, res, next) => {
    try {
        const taskToDelete = await Task.findByIdAndDelete(
            req.params.id
        );
        if(taskToDelete) {
            res.sendStatus(204); 
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router
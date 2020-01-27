const express = require('express');
const router  = express.Router();
const Task = require('../../models/Task')

/* GET Form Page */
router.get('/form', (req, res, next) => {
  res.render('form-views/form');
});

//Post Form Input
router.post('/form-input', (req, res, next) => {
  console.log('the form info: ', req.body);

  Task.create(req.body)
  .then(taskFromDB => {
    console.log('the newly created task: ', {taskFromDB});
    res.redirect(`/task-details/${taskFromDB._id}`)
  }).catch(err => next(err));

})

//View Task List  
router.get('/task-list', (req, res, next) => {
  Task.find()
  .then(tasksFromDB => {
    data = {
      tasks: tasksFromDB
    }
    res.render('task-views/task-list', data);
  }).catch(err => next(err));
})

//View Details of Task
router.get('/task-details/:taskId', (req, res, next) => {
  console.log({id: req.params.taskId})
  Task.findById(req.params.taskId)
  .then(taskFromDB => {
    const data = {
      pageTitle: taskFromDB.title + "Details",
      task: taskFromDB
    };
    res.render('task-views/task-details', data)
  }).catch(err => next(err));
});

module.exports = router;


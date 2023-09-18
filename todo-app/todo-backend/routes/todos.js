const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync, setAsync} = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const todosBefore = await getAsync('added_todos')
  let todosNow = "0"
  todosBefore === null ? todosNow = "1" : todosNow = (parseInt(todosBefore) + 1).toString()
  console.log(todosNow);
  await setAsync('added_todos', todosNow)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.replaceOne(req.todo, req.body)
  res.send(req.body)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

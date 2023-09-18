const express = require('express');
const redis = require('../redis')
const {getAsync } = require('../redis')
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  const addedTodos = await getAsync('added_todos')
  let statistics = {"added_todos": 0}
  if(addedTodos != null) statistics.added_todos = parseInt(addedTodos)
  res.json(statistics);
});

module.exports = router;

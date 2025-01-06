const express = require('express');
const { Create, Fetch, DeleteId } = require('../controller/expensecontroller');  

const router = express.Router();

// POST route to create new expense
router.post('/create', Create);
router.get('/getdata',Fetch);
router.delete('/deletedata/:id',DeleteId);


module.exports = router;

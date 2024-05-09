const express = require('express');

const {createRoom, getAllRooms} = require('../controllers/roomController')

const router = express.Router();

router.post('/createRoom', createRoom);
router.get('/getAllRooms', getAllRooms);

module.exports = router;
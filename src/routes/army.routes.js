const express = require('express');
const router = express.Router();
const armyController = require('../controllers/army.controller');

router.post('/players', armyController.addPlayer);
router.get('/players/active', armyController.getActivePlayers);
router.get('/players', armyController.getAllPlayers);
router.patch('/players/:id/activate', armyController.activatePlayer);
router.patch('/players/:id/deactivate', armyController.deactivatePlayer);
router.patch('/players/:id/group', armyController.updatePlayerGroup);
router.get('/players/group/:groupId', armyController.getPlayersByGroup);

module.exports = router; 
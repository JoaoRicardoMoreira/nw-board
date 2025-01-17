const Player = require('../models/Player');

exports.addPlayer = async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getActivePlayers = async (req, res) => {
  try {
    const players = await Player.find({ isActive: true });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activatePlayer = async (req, res) => {
  try {
    const activeCount = await Player.countDocuments({ isActive: true });
    
    if (activeCount >= 50) {
      return res.status(400).json({ message: 'Limite de 50 jogadores ativos atingido' });
    }

    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deactivatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { isActive: false, groupId: 0 },
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePlayerGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const playerId = req.params.id;

    if (groupId < 0 || groupId > 10) {
      return res.status(400).json({ message: 'Grupo inválido' });
    }

    if (groupId > 0) {
      const groupCount = await Player.countDocuments({ groupId });
      if (groupCount >= 5) {
        return res.status(400).json({ message: 'Grupo já está cheio' });
      }
    }

    const player = await Player.findByIdAndUpdate(
      playerId,
      { groupId },
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ message: 'Jogador não encontrado' });
    }

    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPlayersByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    
    if (groupId < 0 || groupId > 10) {
      return res.status(400).json({ message: 'Grupo inválido' });
    }

    const players = await Player.find({ groupId: parseInt(groupId) });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
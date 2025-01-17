const mongoose = require('mongoose');

const validClasses = ['melee', 'tank', 'healer', 'arco', 'fire', 'desruptor'];
const validWeapons = [
  'espada_escudo',
  'lanca',
  'machadinha',
  'martelo',
  'machado',
  'fire',
  'ice',
  'void',
  'lifestaf',
  'flail',
  'bacamarte',
  'mosquete'
];

const playerSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    required: true,
    enum: validClasses
  },
  primaryWeapon: {
    type: String,
    required: true,
    enum: validWeapons
  },
  secondaryWeapon: {
    type: String,
    required: true,
    enum: validWeapons
  },
  isActive: {
    type: Boolean,
    default: false
  },
  groupId: {
    type: Number,
    min: 0,
    max: 10,
    default: 0  // 0 significa sem grupo
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema); 
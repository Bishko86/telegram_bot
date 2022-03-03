const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  attemp: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  gameMode: {
      type: Boolean,
      required: true,
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
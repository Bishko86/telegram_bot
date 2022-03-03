const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stickerSchema = new Schema({
  sticker: {
    type: String,
    required: true,
  }
});

const Sticker = mongoose.model('Sticker', stickerSchema);

module.exports = Sticker;
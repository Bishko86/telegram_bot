const TelegramApi = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const { startGameOptions } = require("./options");
const token = "5019194207:AAHMx5B0hzgh1ysQmwG1B4paFiNAp3VawXw";
const db =
  "mongodb+srv://RomanUA:fsX5sbtfrLEUSpP@cluster0.k9f32.mongodb.net/Telegram_Bot?retryWrites=true&w=majority";
const Game = require("./models/game_data.js");
const Sticker = require("./models/sticker");

mongoose
  .connect(db)
  .then((res) => console.log("mongoDB works"))
  .catch((err) => console.log("mongoDB error"));


const bot = new TelegramApi(token, { polling: true });
let gameData = {
  attemp: 0,
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Hello! What can be useful?" },
    { command: "/info", description: "I am a test bot" },
    { command: "/game", description: "Let's play an amazing game!" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const name = msg.chat.first_name;

    if (text === "/start") {
      await Sticker.find()
        .then((res) => {
          const sticker = res[0].sticker;
          bot.sendSticker(chatId, sticker);
        })
        .catch(() =>
          bot.sendMessage(chatId, `Something went wrong. Try again`)
        );

      return bot.sendMessage(
        chatId,
        `Hello ${name}! I am a telegram bot written by Roman Bishko?`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Are you waiting to play interesting game? Write: '/game'`
      );
    }

    if (text === "/game") {
      await bot.sendMessage(
        chatId,
        `Let's play game. I invente some number from 1 to 5, try to guess it`
      );

      return bot.sendMessage(
        chatId,
        "Would you like to play?",
        startGameOptions
      );
    }

    if (gameData.gameMode && parseInt(text)) {
      gameData.attemp++;

      return gameData.number === +text
        ? (await bot.sendMessage(chatId, "Yes!!! You Guessed!!!"),
          await bot.sendMessage(
            chatId,
            `You have used ${gameData.attemp} attemps`
          ),
          bot.sendMessage(
            chatId,
            "Would you like to play again?",
            startGameOptions
          ))
        : bot.sendMessage(chatId, "No. Try againe...");
    }

    return bot.sendMessage(
      chatId,
      "I dont understand you, look available commands"
    );
  });

  bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;
    const data = msg.data;
    if (data == "play") {
      const attemp = 0;
      const randomNumber = Math.ceil(Math.random() * 5);
      gameData.gameMode = true;
      gameData.number = randomNumber;
      gameData.attemp = attemp;
    //   const game = new Game({});
    //   game
    //     .save()
    //     .then((res) => console.log('start'))
    //     .catch((err) => console.log("YO", err));

      bot.sendMessage(chatId, "Guess what");
    } else {
      gameData.gameMode = false;
      gameData.number = null;
      bot.sendMessage(chatId, "Okey!");
    }
  });
};

start();

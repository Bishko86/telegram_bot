module.exports = {
startGameOptions: {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              { text: "Yes", callback_data: "play" },
              { text: "No", callback_data: "no" },
            ],
          ],
        }),
      }
}
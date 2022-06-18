require("dotenv").config()

const cron = require("node-cron")

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

const times = ["from now till Sunday morning @10am", "* 8 * * *", "* 48 * * *"]
let nextTime = 0

// Schedule tasks to be run on the server.
cron.schedule("* * * * *", () => {
  client.messages
    .create({
      body: "Plz work lol",
      from: TWILIO_PHONE_NUMBER,
      to: "+16479385063",
    })
    .then((message) => {
      console.log(message.body)
      nextTime == 2 ? 0 : nextTime + 1
    })
})

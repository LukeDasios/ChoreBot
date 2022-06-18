require("dotenv").config()

const cron = require("node-cron")

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

let garbageWeek = false
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 0

const tuesdayMessage = () => {
  client.messages
    .create({
      body: garbageWeek
        ? `Good Evening ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
        : `Good Evening ${theBoys[iter]}! In case you haven't already done so already, friendly reminder that the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
      from: TWILIO_PHONE_NUMBER,
      to: "+16479385063",
    })
    .then((message) => {
      console.log(message.body)
      nextTime == 2 ? 0 : nextTime + 1
    })
}

const sundayMessage1 = () => {
  client.messages
    .create({
      body: "",
      from: TWILIO_PHONE_NUMBER,
      to: "+16479385063",
    })
    .then((message) => {
      console.log(message.body)
      nextTime == 2 ? 0 : nextTime + 1
    })
}

const sundayMessage2 = () => {
  client.messages
    .create({
      body: "",
      from: TWILIO_PHONE_NUMBER,
      to: "+16479385063",
    })
    .then((message) => {
      console.log(message.body)
      nextTime == 2 ? 0 : nextTime + 1
    })
}

let messages = [tuesdayMessage, sundayMessage1, sundayMessage2]

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
  messages[nextTime]
})

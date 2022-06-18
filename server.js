require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

const client = require("twilio")(accountSid, authToken)

client.messages
  .create({ body: "Hi there", from: TWILIO_PHONE_NUMBER, to: "+16479385063" })
  .then((message) => console.log(message.sid))

const express = require("express")
const app = express()

app.get("/", function (req, res) {
  res.send("Hello World")
})

app.listen(3000)

var CronJob = require("cron").CronJob
var job = new CronJob(
  "* * * * * *",
  function () {
    console.log("You will see this message every second")
  },
  null,
  true,
  "America/Los_Angeles"
)

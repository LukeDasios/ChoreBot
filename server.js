require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

const client = require("twilio")(accountSid, authToken)

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

function whoIsNext(num) {
  num === 3 ? "Luke" : theBoys[num + 1]
}

let garbageWeek = false
const theBoys = ["Luke", "Duncan", "Sam", "Jp"]
const numbers = ["+16479385063", "+14168261333", "+14168447692", "+14166169331"]
let iter = 0
let towel = 2

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// * * * * * *

app.listen(port, () => {
  let fullDate = new Date()
  let day = fullDate.getDay()
  let hour = fullDate.getHours()

  message(day, hour)
})

const message = (day, hour) => {
  // Send the correct message depending on what day it is
  if (hour === 18) {
    if (day === 0) {
      // Sunday
      client.messages.create({
        body: `Good Evening ${theBoys[iter]}! Heads up, You're on garbage duty this week.`,
        from: TWILIO_PHONE_NUMBER,
        to: numbers[iter],
      })
    } else if (day === 2) {
      // Tuesday
      client.messages
        .create({
          body: garbageWeek
            ? `Good Evening ${theBoys[iter]}! In case you haven't already done so already, the Recycling, Compost, and Garbage need to be taken to the curb by tonight. Cheers.`
            : `Good Evening ${theBoys[iter]}! In case you haven't already done so already, the Recycling and Compost need to be taken to the curb by tonight. Cheers.`,
          from: TWILIO_PHONE_NUMBER,
          to: numbers[iter],
        })
        .then(() => {
          garbageWeek = !garbageWeek
        })
    } else if (day === 4) {
      // Thursday
      client.messages
        .create({
          body: `Good Evening ${theBoys[towels]}, It's your turn on towel duty! They need to be washed, dryed, folded, and put back in their respective drawer upstairs.`,
          from: TWILIO_PHONE_NUMBER,
          to: numbers[towel],
        })
        .then((message) => {
          towel == 3 ? 0 : towel + 1
        })
    } else if (day === 6) {
      // Saturday
      client.messages
        .create({
          body: `Good Efternoon ${
            theBoys[iter]
          }! Please empty the Recycling, Green bin, and Garbage one last time so that ${whoIsNext()} may start their week with a clean slate. After that, you are free!`,
          from: TWILIO_PHONE_NUMBER,
          to: numbers[iter],
        })
        .then((message) => {
          iter == 3 ? 0 : iter + 1
        })
    }
  }
}

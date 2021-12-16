const bodyparser = require("body-parser")
const xmlparser = require('xml-parser')
const xmlbuilder = require("xmlbuilder")
const mongoose = require("mongoose")
const express = require("express")
const http = require('http')
const fs = require("fs")
const path = require("path")
const { setInterval } = require("timers")
const app = express()
const httpServer = http.createServer(app)

// Basic Shit
const main = require(__dirname, `/configs/main.json`);
const port = 80;

// MongoDB
mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true}, async e => {
    if (e) throw e
    console.log("MongoDB Connected");
})

// Services
fs.readdirSync(`${__dirname}/routes`).forEach(route => {
    require(`${__dirname}/routes/${route}`)(app, port);
})

// Connecting everything together
httpServer.listen(port, ()=> {
  console.log(`Project Nexus is listening on Port: ${port}`)
});
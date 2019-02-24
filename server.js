const fs = require('fs')
const http = require('http')
const spdy = require('spdy')
const express = require('express')

const app = express().use(express.static('public'))

const credentials = {
  //ca: fs.readFileSync('ssl/ca-bundle.ca'),
  key: fs.readFileSync('ssh/private.key'),
  cert: fs.readFileSync('ssh/cert.crt')
}

http
  .createServer(express().get('*', (req, res) => res.redirect(`https://${req.hostname}${req.url}`)))
  .listen(80, error => error ? console.error(`Не удалось запустить HTTP-сервер (порт 80)`) : null)

spdy
  .createServer(credentials, app)
  .listen(443, error => error ? console.error(`Не удалось запустить HTTPS-сервер (порт 443)`) : null)

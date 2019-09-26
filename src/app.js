const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebarss engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// partials
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// static route
// app.get('', (req, res) => {
//   res.send('<h1>hello H1</h1>');
// });

// view for handlebar
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Michael'
  })
})

// about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Michael',
    robotName: 'Franky'
  })
})
// help
app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Welcome to Help Page',
    title: 'Help',
    name: 'Michael'
  })
})

// weather route
app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
    if(error) {
      return res.send({ error })
    }

    forecast(latitude, longtitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

  // res.send({
  //   forecast: 'it is snowing',
  //   location: 'Philippines',
  //   address: req.query.address
  // })
})


// error with main data
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Michael',
    errorMessage: 'Help Article not found.'
  })
})

// Page Error 404
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Michael',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
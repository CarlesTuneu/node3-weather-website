const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Carles'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Carles Tuneu'
    })
})

//
// Goal: Create two more HTML files
//
// 1. Create a html page for about with "About" title
// 2. Create a html page for help with "Help" title
// 3. Remove the old route handlers for both
// 4. Visit both in the browser to test yout work

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Carles',
//         age: 22
//     }])
// })

//
// Goal: Update routes
//
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON
//    - Object with forecast and location strings
// 3. Test your work by visiting both in the browser

// app.get('/about', (req, res) => {
//     res.send('<h1>About page<h1>')
// })

//
// Goal: Create a template for help page
//
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Carles'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                location: location,
                forecast: forecastData
            })
           
        })
        
    })
})

//
// Goal: Wire up /weather
//
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location

//
// Goal: Update weather endpoint to accept adress
//
// 1. No adress? Send back an error message
// 2. Adress? Send back the static JSON
//    - Add adress property onto JSON wich returns the provides address
// 3. Test /weather and /weather?address=philadelphia

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Carles',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { // * indica que agafa qualsevol altre adreça que no esitgui definida previament
    res.render('404',{
        title: '404',
        name: 'Carles',
        errorMessage: 'Page not found'
    })
})

//
// Goal: Setup two new routes
//
// 1. Setup an abput route and render a page title
// 2. Setup a weather route and render a page title
// 3. Test your wprk by visiting both in the browser

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//
// Goal: Create a partial for the footer
//
// 1. Setup the template for the footer partial "Created by some name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

//
// Goal: Create and render a 404 page with handelbars
//
// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
//    - Page not found.
//    - Help article not found.
// 4. Test your work. Visit /what and /help/units
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title:'Weather',
        name: 'K K'
    })
})
app.get('/about', (req,res) =>{
    res.render('about', {
        title:'About',
        name: 'K K'
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        title:'Help Page',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        name: 'K K'
    })
})
app.get('/weather',(req,res) => {
    let address = req.query.address
    if(!address){
        return res.send('You must provide an address')
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
           return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return  res.send({error})
            }

            res.send({
                forecast:forecastData,
                location, 
                address
            })
        })
        
    })

    
})

app.get('/help/*',(req,res) => {
    res.render('error404', {
        title: '404',
        error:'help article not found',
        name: 'K K'
    })
})
app.get('*',(req,res) => {
    res.render('error404', {
        title: '404',
        error:'Page not Found',
        name: 'K K'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})
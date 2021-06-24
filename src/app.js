const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const hbs = require('hbs');
const path = require('path')
const express = require('express');
const { response } = require('express');
const e = require('express');


//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()




app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partial'))

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public/about.html')))
app.use(express.static(path.join(__dirname, '../public/help.html')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather Application',
        name: 'Alan Arif'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About US',
        name: 'world'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'world'
    })
})


app.get('/weather', (req, res) => {
    if(! req.query.address){
        return res.send({
          error: 'please provide location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    // res.send({
    //     forecast: 'hottt',
    //     location:'erbil',
    //     address: req.query.location
    // })
}
)



// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         res.send({
//             error: 'you must provide search'
//         })
//     }
//     else {
//         console.log(req.query.search)
//         res.send({
//             products: []
//         })
//     }
// })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'alan',
        errorMessage: 'artice not found'
    })
})





app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'alan',
        errorMessage: 'Page not found'
    })
})


// app.get('/help', (req, res)=>{
// res.send([{
//     name: 'alan',
//     age: 21
// },{
//     name: 'arif',
//     age: 50
// }])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>about page</h1>')
// })



app.listen(3000, () => {
    console.log('the server is up and running')
})
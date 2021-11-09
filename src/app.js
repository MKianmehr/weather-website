const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialDirectory = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialDirectory)


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send('Please provide a valid address')
    }
    forecast(req.query.address, (err, Response)=>{
        if(err){
            res.send({
                error: err
            })
        }else{
            res.send({
                forecast: Response[0],
                location: Response[1],
                address: req.query.address
            })
        }
    })
})





app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mk'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MKian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        HelpText: 'This is some helpful text.',
        title: 'Help',
        name: 'MKian'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Mkian',
        title: '404'
    })
})


app.get('*', (req, res)=>{
    res.status(404).render('404',{
        name: 'MKian',
        title: '404 ',
        errorMessage: 'Page not found'
    })
})


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

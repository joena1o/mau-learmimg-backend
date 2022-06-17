//// installation of express here 
const express = require('express')
const mongoose= require('mongoose')
// importation of routerrs from the router folder here//
const routes = require('./routes/route')
const booksR = require('./routes/book.route')
const FQAR = require('./routes/FQA')
const journalsR = require('./routes/journal')
const paparR = require('./routes/paper')
const theses = require('./routes/thesis')
// ///////////// upload for imgagine from multer////////
const upload = require('./uploads/uploadUSER')
const uploadbooks = require('./uploads/books')
const fQA = require('./uploads/FQA')
const journal = require('./uploads/journal')
const paper = require('./uploads/paper')
const thesis = require('./uploads/theses')
///////////////////////////////////////////////////////
const app= express()

// create and listen to port 3000 Headers //////////////
app.use(express.json());
//  create a public folder for static file/////////////
app.use('/uploads', express.static('uploads'))

// CREATE connection from mongos db/////////////////////////
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
//  throw error or success on the connections ////////////
mongoose.connect(mongoString);
const database = mongoose.connection
//  throw error or success on the connections ////////////
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

//  useing the route file//////////////////////////////////////
app.use('/api/v1', upload.single('avater'), routes)
app.use('/api/v1', uploadbooks.single('bookfile'), booksR)
app.use('/api/v1', fQA.single('fqafile'), FQAR)
app.use('/api/v1', journal.single('journalfile'),journalsR)
app.use('/api/v1', paper.single('paperfile'), paparR)
app.use('/api/v1', thesis.single('thesisFile'), theses)
///////////////////////////////////////////////////////////////

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
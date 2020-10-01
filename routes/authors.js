const express = require('express');
const Author = require('../models/authors');
const router = express.Router()


// All Authors Route
router.get('/', async (req,res) => {

    let searchOption = {}
    if(req.query.name != null && req.query.name != ''){
        searchOption.name = new RegExp(req.query.name, 'i')
    }

    try{
        const authors = await Author.find(searchOption)
        res.render('authors/index', { authors: authors, searchOption: req.query })

    } catch{
        res.redirect('/')
    }


})

// New Author Route
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
})

// Create Author Route
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)

    } catch {
        res.render('authors/new', { author: author, errorMessage: 'Error Creating Author' })

    }

    // author.save((err,newAuthor) => {
    //     if(err) {
    //         res.render('authors/new', { author: author, errorMessage: 'Error Creating Author' })
    //     }
    //     else {
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })

})


module.exports = router
const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { encrypt, decrypt } = require('./crypto')


router.get('/', async (req, res) => {
    const hash = encrypt('DTX*-+1234')

    console.log(hash)
    
    const text = decrypt(hash)
    
    console.log(text) 

});

router.post('/:hash', (req, res) => {
    const { hash } = req.params;
    //const hash = { var_texto };
    
    const text = decrypt(hash)

    res.json(text)

});

router.delete('/:id', (req, res) => {
    
});


router.put('/:id', (req, res) => {
    
});

module.exports = router;
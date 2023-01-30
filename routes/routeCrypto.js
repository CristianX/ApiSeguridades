const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { encrypt, decrypt } = require('../src/ApiSeguridad/crypto');

router.get('/decrypt/:email', async( req, res ) => {
    const { email } = req.params;
    try {
        const emailDecrypt = decrypt(email);
        res.status(200);
        res.json({
            success: true,
            message: 'Email desencriptado',
            email: emailDecrypt
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/encrypt/:email', async( req, res ) => {
    const { email } = req.params;
    try {
        const emailDecrypt = encrypt(email);
        res.status(200);
        res.json({
            success: true,
            message: 'Email desencriptado',
            email: emailDecrypt
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('../ApiSeguridad/crypto')

router.get('/:codigo', async (req, res) => {
    const { codigo } = req.params;

    try {
        const x = await db
            .collection("ColUsuarios")
            .find({ UsuPassword: codigo })
            .toArray();
        res.send(x[0]._id);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { UsuPassword } = req.body;
        if (UsuPassword) {
            var newvalues = {
                $set: {
                    UsuPassword: encrypt(UsuPassword)
                }
            };
            var myquery = { _id: new ObjectId(id) };
            db.collection("ColUsuarios").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("se actualizó");
            });
            res.json("se actualizó");
        } else {
            //res.json("Error en guardar");
            res.status(500).json("Error al guardar : ");
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.put('/:correo/:codigo', async (req, res) => {
    const { correo } = req.params;
    const { codigo } = req.params;

    correo_encrypt = encrypt(correo)

    var newvalues = {
        $set: {
            UsuRecuperacion: "Si",
            UsuPassword: codigo,
        }
    };

    var myquery = { UsuEmail: correo_encrypt };

    db.collection("ColUsuarios").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
    });
    

    
    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'daed_sa@hotmail.com',
            pass: 'L4nnister'
        }
    });

    var texto_men = "<h2> RECUPERAR CONTRASEÑA </h2> <br /> <br />" 
        texto_men += "Este es su código de verificación: " + codigo + "<br /><br />"
        texto_men += "Acceda al siguiente link para recuperar su contraseña: http://localhost:3000/Recuperar" + "<br /><br />"

    var mailOptions = {
        from: 'daed_sa@hotmail.com',
        to: correo,
        subject: 'Recuperación de contraseña DANITEX',
        html: texto_men
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json("Problemas con el servidor del correo electrónico");
        } else {
            console.log('Email sent: ' + info.response);
            res.json("Verifique su correo electronico");
        }
    });

    

});

module.exports = router;
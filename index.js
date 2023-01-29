const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require("cors");
const database = require("./modulos/dbconect")

// settings
app.set('port', process.env.PORT || 3001);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// PRUEBAS
//app.use(require('./routes'));
// app.use('/usu', require('./routes/insertar'));
// app.use('/prueba', require('./routes/prueba'));

// app.use('/apifactura', require('./ApiPedidos/Factura'))

//SEGURIDADES
app.use('/encryp', require('./src/ApiSeguridad/encrip'));
app.use('/apirecuperar', require('./src/ApiSeguridad/recuperar'));
app.use('/apicrypto', require('./routes/routeCrypto'));
//app.use('/cripto', require('./ApiSeguridad/encrip'));


// starting the serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
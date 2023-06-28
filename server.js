// Levantando el servidor
const express = require('express');
const app = express();
//const cors = require('cors');
const { getJoyas, getJoyasFiltros } = require('./joyas');

app.use(express.json());
app.listen(3000, console.log("¡Servidor encendido en el puerto 3000!"));
//app.use(cors());
//app.use(express.static('public'));

const superMiddleware = (req, res, next) => {
    const params = req.query;
    if (Object.keys(params).length == 0) {
        res.json({ message: 'No se ha recibido ningún parámetro' });
    } else {
        next()
    }
}

app.get('/joyas', superMiddleware, async (req, res) => {
    const params = req.query;
    const data = await getJoyas(params)
    res.send(data);
})

app.get('/joyas/filtros', superMiddleware, async (req, res) => {
    const params = req.query;
    const data = await getJoyasFiltros(params)
    res.send(data);
})
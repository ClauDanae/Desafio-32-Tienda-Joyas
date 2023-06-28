const { Pool } = require("pg");
const format = require('pg-format');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'joyas',
    port: 5432,
    allowExitOnIdle: true
});

const getJoyas = async ({ limits = 2, page = 1, order_by = 'id_ASC' }) => {
    try {
        const offset = (page - 1) * limits;
        //const array = order_by.split('_');
        //const campo = array[0];
        //const direccion = array[1];
        const [campo, direccion] = order_by.split('_');
        const query = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
        const { rows } = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.error("No funcionó", error);
    }
}

const getJoyasFiltros = async ({ precio_max, precio_min, categoria, metal }) => {
    try {
        const filtros = [];
        if (metal) {
            filtros.push(`metal = '${metal}'`)
        };
        if (categoria) {
            filtros.push(`categoria = '${categoria}'`)
        };
        if (precio_min) {
            filtros.push(`precio >= ${precio_min}`)
        };
        if (precio_max) {
            filtros.push(`precio <= ${precio_max}`)
        };
        let query = 'SELECT * FROM inventario';
        if (filtros.length > 0) {
            query = query + ' WHERE ' + filtros.join(' AND ');
            console.log(query);
        };
        const { rows } = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.error("Mal el filtro", error);
    }
}

module.exports = {
    getJoyas,
    getJoyasFiltros
}
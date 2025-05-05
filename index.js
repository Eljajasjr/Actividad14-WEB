const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'diegomerlo01',
    database: 'notas_personales'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas CRUD
// CREATE - Crear una nueva nota
app.post('/notas', (req, res) => {
    const { titulo, autor, cuerpo, clasificacion } = req.body;
    const query = 'INSERT INTO notas (titulo, autor, cuerpo, clasificacion) VALUES (?, ?, ?, ?)';
    
    db.query(query, [titulo, autor, cuerpo, clasificacion], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al crear la nota');
        }
        res.status(201).send('Nota creada exitosamente');
    });
});

// READ - Obtener todas las notas
app.get('/notas', (req, res) => {
    const query = 'SELECT * FROM notas';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener las notas');
        }
        res.status(200).json(results);
    });
});

// READ - Obtener una nota por ID
app.get('/notas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM notas WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener la nota');
        }
        if (results.length === 0) {
            return res.status(404).send('Nota no encontrada');
        }
        res.status(200).json(results[0]);
    });
});

// UPDATE - Actualizar una nota
app.put('/notas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, cuerpo, clasificacion } = req.body;
    const query = 'UPDATE notas SET titulo = ?, autor = ?, cuerpo = ?, clasificacion = ? WHERE id = ?';
    
    db.query(query, [titulo, autor, cuerpo, clasificacion, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar la nota');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Nota no encontrada');
        }
        res.status(200).send('Nota actualizada exitosamente');
    });
});

// DELETE - Eliminar una nota
app.delete('/notas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notas WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar la nota');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Nota no encontrada');
        }
        res.status(200).send('Nota eliminada exitosamente');
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
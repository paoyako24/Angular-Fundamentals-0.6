import express from 'express';
import * as mysql from 'mysql';
const router = express.Router();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos'
});
// Ruta para login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error al consultar la base de datos');
        }
        if (results.length > 0) {
            // Usuario encontrado
            res.status(200).send('Login exitoso');
        }
        else {
            // Usuario no encontrado
            res.status(401).send('Credenciales incorrectas');
        }
    });
});
export default router;

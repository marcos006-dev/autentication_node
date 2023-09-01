import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/database.js';
import { dbseed } from './helper/dbseed.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ruta para probar el servidor
app.get('/ping', (req, res) => {
    res.json({ message: 'Pong (Ruta sin autenticación)' });
});

// rutas con autenticación
import userRoutes from './routes/users.routes.js';
import autenticationRoutes from './routes/autentication.routes.js';

app.use('/api', userRoutes);
app.use('/api', autenticationRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
    connectDB().then(() => {
        dbseed();
    });
});
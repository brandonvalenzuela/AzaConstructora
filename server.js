const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Importar rutas
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Configurar CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 requests por ventana de tiempo
    message: {
        error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
    }
});
app.use(limiter);

// Rate limiting específico para formularios
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 envíos de formulario por IP cada 15 minutos
    message: {
        error: 'Demasiados envíos de formulario. Intenta de nuevo en 15 minutos.'
    }
});

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta específica para proyecto-detalle para asegurar que los parámetros de la URL se mantengan
app.get('/proyecto-detalle', (req, res) => {
    res.sendFile(path.join(__dirname, 'proyecto-detalle'));
});

// Rutas de la API
app.use('/api/contact', formLimiter, contactRoutes);

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    if (req.originalUrl.startsWith('/api/')) {
        res.status(404).json({ error: 'Endpoint no encontrado' });
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📧 Modo de desarrollo: ${process.env.NODE_ENV /*|| 'development'*/}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL /*|| 'http://localhost:8000'*/}`);
});

module.exports = app;
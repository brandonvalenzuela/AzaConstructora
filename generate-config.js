const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Generar archivo de configuración para el frontend
const config = {
    emailjs: {
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID,
        publicKey: process.env.EMAILJS_PUBLIC_KEY
    }
};

const configContent = `// Configuración generada automáticamente desde variables de entorno
// NO EDITAR MANUALMENTE - Este archivo se regenera automáticamente
window.APP_CONFIG = ${JSON.stringify(config, null, 4)};`;

const configPath = path.join(__dirname, 'js', 'config.js');

fs.writeFileSync(configPath, configContent, 'utf8');
console.log('✅ Archivo config.js generado exitosamente');
console.log('📍 Ubicación:', configPath);
console.log('🔧 Variables cargadas:', Object.keys(config.emailjs));
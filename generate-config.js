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

// Verificar si las variables se cargaron correctamente
const loadedVars = Object.keys(config.emailjs);
const emptyVars = loadedVars.filter(key => !config.emailjs[key]);
const validVars = loadedVars.filter(key => config.emailjs[key]);

console.log('\n🔧 ESTADO DE VARIABLES DE ENTORNO:');
console.log('📊 Total de variables esperadas:', loadedVars.length);

if (validVars.length > 0) {
    console.log('✅ Variables cargadas correctamente:', validVars.length);
    validVars.forEach(key => {
        const value = config.emailjs[key];
        const maskedValue = value.length > 10 ? value.substring(0, 8) + '...' : value;
        console.log(`   - ${key}: ${maskedValue}`);
    });
}

if (emptyVars.length > 0) {
    console.log('❌ Variables vacías o no encontradas:', emptyVars.length);
    emptyVars.forEach(key => {
        console.log(`   - ${key}: undefined/empty`);
    });
    console.log('\n⚠️  ADVERTENCIA: Algunas variables de entorno no están configuradas.');
    console.log('   Verifica que el archivo .env existe y contiene:');
    emptyVars.forEach(key => {
        const envKey = key === 'serviceId' ? 'EMAILJS_SERVICE_ID' : 
                      key === 'templateId' ? 'EMAILJS_TEMPLATE_ID' : 
                      key === 'publicKey' ? 'EMAILJS_PUBLIC_KEY' : key;
        console.log(`   - ${envKey}=tu_valor_aqui`);
    });
} else {
    console.log('🎉 Todas las variables de EmailJS están configuradas correctamente!');
}

console.log('\n📋 Configuración final generada:');
console.log(JSON.stringify(config, null, 2));
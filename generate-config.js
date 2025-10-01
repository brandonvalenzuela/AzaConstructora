const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Generar archivo de configuración para el frontend
const config = {
    emailjs: {
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID,
        publicKey: process.env.EMAILJS_PUBLIC_KEY
    },
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY
    }
};

const configContent = `// Configuración generada automáticamente desde variables de entorno
// NO EDITAR MANUALMENTE - Este archivo se regenera automáticamente
window.APP_CONFIG = ${JSON.stringify(config, null, 4)};`;

// Generar config.js en js/
const configPath = path.join(__dirname, 'js', 'config.js');
fs.writeFileSync(configPath, configContent, 'utf8');
console.log('✅ Archivo js/config.js generado exitosamente');
console.log('📍 Ubicación:', configPath);

// Generar config.js en supabase/
const supabaseConfigPath = path.join(__dirname, 'supabase', 'config.js');
fs.writeFileSync(supabaseConfigPath, configContent, 'utf8');
console.log('✅ Archivo supabase/config.js generado exitosamente');
console.log('📍 Ubicación:', supabaseConfigPath);

// Verificar si las variables se cargaron correctamente
const emailjsVars = Object.keys(config.emailjs);
const supabaseVars = Object.keys(config.supabase);
const allVars = [...emailjsVars.map(k => `emailjs.${k}`), ...supabaseVars.map(k => `supabase.${k}`)];

const emptyEmailjsVars = emailjsVars.filter(key => !config.emailjs[key]);
const validEmailjsVars = emailjsVars.filter(key => config.emailjs[key]);
const emptySupabaseVars = supabaseVars.filter(key => !config.supabase[key]);
const validSupabaseVars = supabaseVars.filter(key => config.supabase[key]);

const totalEmpty = emptyEmailjsVars.length + emptySupabaseVars.length;
const totalValid = validEmailjsVars.length + validSupabaseVars.length;

console.log('\n🔧 ESTADO DE VARIABLES DE ENTORNO:');
console.log('📊 Total de variables esperadas:', allVars.length);

if (totalValid > 0) {
    console.log('✅ Variables cargadas correctamente:', totalValid);
    
    if (validEmailjsVars.length > 0) {
        console.log('  📧 EmailJS:');
        validEmailjsVars.forEach(key => {
            const value = config.emailjs[key];
            const maskedValue = value.length > 10 ? value.substring(0, 8) + '...' : value;
            console.log(`     - ${key}: ${maskedValue}`);
        });
    }
    
    if (validSupabaseVars.length > 0) {
        console.log('  🗄️  Supabase:');
        validSupabaseVars.forEach(key => {
            const value = config.supabase[key];
            const maskedValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
            console.log(`     - ${key}: ${maskedValue}`);
        });
    }
}

if (totalEmpty > 0) {
    console.log('❌ Variables vacías o no encontradas:', totalEmpty);
    
    if (emptyEmailjsVars.length > 0) {
        console.log('  📧 EmailJS:');
        emptyEmailjsVars.forEach(key => {
            console.log(`     - ${key}: undefined/empty`);
        });
    }
    
    if (emptySupabaseVars.length > 0) {
        console.log('  🗄️  Supabase:');
        emptySupabaseVars.forEach(key => {
            console.log(`     - ${key}: undefined/empty`);
        });
    }
    
    console.log('\n⚠️  ADVERTENCIA: Algunas variables de entorno no están configuradas.');
    console.log('   Verifica que el archivo .env existe y contiene:');
    
    if (emptyEmailjsVars.length > 0) {
        console.log('   📧 EmailJS:');
        emptyEmailjsVars.forEach(key => {
            const envKey = key === 'serviceId' ? 'EMAILJS_SERVICE_ID' : 
                          key === 'templateId' ? 'EMAILJS_TEMPLATE_ID' : 
                          key === 'publicKey' ? 'EMAILJS_PUBLIC_KEY' : key;
            console.log(`     - ${envKey}=tu_valor_aqui`);
        });
    }
    
    if (emptySupabaseVars.length > 0) {
        console.log('   🗄️  Supabase:');
        emptySupabaseVars.forEach(key => {
            const envKey = key === 'url' ? 'SUPABASE_URL' : 
                          key === 'key' ? 'SUPABASE_ANON_KEY' : key;
            console.log(`     - ${envKey}=tu_valor_aqui`);
        });
    }
} else {
    console.log('🎉 Todas las variables están configuradas correctamente!');
}

console.log('\n📋 Configuración final generada:');
console.log(JSON.stringify(config, null, 2));
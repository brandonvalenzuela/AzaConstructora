/**
 * Utilidades globales
 */

// Detectar entorno
const hostname = window.location.hostname;

const isDevelopment = hostname === 'localhost' || 
                      hostname === '127.0.0.1' || 
                      hostname.includes('192.168.');

const isStaging = hostname.includes('github.io'); // GitHub Pages = Staging/Pruebas

const isProduction = !isDevelopment && !isStaging; // Dominio real = Producción

// Determinar si se deben mostrar logs (desarrollo o staging)
const showLogs = isDevelopment || isStaging;

// Logger condicional - muestra logs en desarrollo y staging, NO en producción
const devLog = {
    log: (...args) => showLogs && console.log(...args),
    warn: (...args) => showLogs && console.warn(...args),
    error: (...args) => showLogs && console.error(...args),
    info: (...args) => showLogs && console.info(...args),
    debug: (...args) => showLogs && console.debug(...args),
    group: (...args) => showLogs && console.group(...args),
    groupEnd: () => showLogs && console.groupEnd()
};

// Mostrar información del entorno al cargar
if (showLogs) {
    console.log(`🌍 Entorno detectado: ${isDevelopment ? 'Desarrollo (localhost)' : 'Staging (GitHub Pages)'}`);
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.isDevelopment = isDevelopment;
    window.isStaging = isStaging;
    window.isProduction = isProduction;
    window.showLogs = showLogs;
    window.devLog = devLog;
}

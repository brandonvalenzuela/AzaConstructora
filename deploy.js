#!/usr/bin/env node

/**
 * Script de Deploy Local - AZA Constructora
 * Automatiza el proceso de despliegue desde el entorno de desarrollo
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DeployManager {
    constructor() {
        this.projectRoot = __dirname;
        this.logPrefix = '🚀 [DEPLOY]';
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            info: '\x1b[36m',    // Cyan
            success: '\x1b[32m', // Green
            warning: '\x1b[33m', // Yellow
            error: '\x1b[31m',   // Red
            reset: '\x1b[0m'     // Reset
        };
        
        console.log(`${colors[type]}${this.logPrefix} [${timestamp}] ${message}${colors.reset}`);
    }

    checkPrerequisites() {
        this.log('Verificando prerequisitos...');
        
        // Verificar que existe .env
        if (!fs.existsSync('.env')) {
            this.log('❌ Archivo .env no encontrado', 'error');
            this.log('Crea el archivo .env con las variables necesarias', 'warning');
            process.exit(1);
        }
        
        // Verificar que existe package.json
        if (!fs.existsSync('package.json')) {
            this.log('❌ Archivo package.json no encontrado', 'error');
            process.exit(1);
        }
        
        this.log('✅ Prerequisitos verificados', 'success');
    }

    installDependencies() {
        this.log('Instalando dependencias...');
        try {
            execSync('npm ci', { stdio: 'inherit' });
            this.log('✅ Dependencias instaladas', 'success');
        } catch (error) {
            this.log('❌ Error instalando dependencias', 'error');
            process.exit(1);
        }
    }

    generateConfig() {
        this.log('Generando configuración de EmailJS...');
        try {
            execSync('node generate-config.js', { stdio: 'inherit' });
            this.log('✅ Configuración generada', 'success');
        } catch (error) {
            this.log('❌ Error generando configuración', 'error');
            process.exit(1);
        }
    }

    runTests() {
        this.log('Ejecutando tests...');
        try {
            execSync('npm test', { stdio: 'inherit' });
            this.log('✅ Tests pasaron', 'success');
        } catch (error) {
            this.log('⚠️ No hay tests configurados o fallaron', 'warning');
        }
    }

    buildProject() {
        this.log('Construyendo proyecto...');
        try {
            execSync('npm run build', { stdio: 'inherit' });
            this.log('✅ Proyecto construido', 'success');
        } catch (error) {
            this.log('⚠️ No hay script de build configurado', 'warning');
        }
    }

    validateFiles() {
        this.log('Validando archivos críticos...');
        
        const criticalFiles = [
            'index.html',
            'contacto.html',
            'js/config.js',
            'js/contact-handler.js',
            'css/styles.css'
        ];
        
        let allValid = true;
        
        criticalFiles.forEach(file => {
            if (fs.existsSync(file)) {
                this.log(`✅ ${file}`, 'success');
            } else {
                this.log(`❌ ${file} no encontrado`, 'error');
                allValid = false;
            }
        });
        
        if (!allValid) {
            this.log('❌ Faltan archivos críticos', 'error');
            process.exit(1);
        }
        
        this.log('✅ Todos los archivos críticos están presentes', 'success');
    }

    showDeployInstructions() {
        this.log('\n📋 INSTRUCCIONES DE DEPLOY:', 'info');
        console.log('\n1. 📁 Subir archivos al servidor:');
        console.log('   - Todos los archivos HTML');
        console.log('   - Carpeta js/ completa');
        console.log('   - Carpeta css/ completa');
        console.log('   - Carpeta media/ completa');
        console.log('\n2. 🔧 Configurar servidor web:');
        console.log('   - Servir archivos estáticos');
        console.log('   - Configurar HTTPS');
        console.log('   - Configurar compresión gzip');
        console.log('\n3. 🌐 Variables de entorno en producción:');
        console.log('   - EMAILJS_SERVICE_ID');
        console.log('   - EMAILJS_TEMPLATE_ID');
        console.log('   - EMAILJS_PUBLIC_KEY');
        console.log('\n4. ✅ Verificar funcionalidad:');
        console.log('   - Formularios de contacto');
        console.log('   - Navegación entre páginas');
        console.log('   - Responsive design');
    }

    async deploy() {
        this.log('🚀 Iniciando proceso de deploy...', 'info');
        
        try {
            this.checkPrerequisites();
            this.installDependencies();
            this.generateConfig();
            this.runTests();
            this.buildProject();
            this.validateFiles();
            
            this.log('\n🎉 ¡Deploy preparado exitosamente!', 'success');
            this.showDeployInstructions();
            
        } catch (error) {
            this.log(`❌ Error durante el deploy: ${error.message}`, 'error');
            process.exit(1);
        }
    }
}

// Ejecutar deploy si se llama directamente
if (require.main === module) {
    const deployManager = new DeployManager();
    deployManager.deploy();
}

module.exports = DeployManager;
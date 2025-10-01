/**
 * 🚀 Inicializador de Supabase para AZA Constructora
 * 
 * Este archivo se encarga de inicializar todos los componentes de Supabase
 * y configurar el sistema para trabajar con la base de datos.
 */

/**
 * 🔧 Configuración de inicialización
 */
const INIT_CONFIG = {
    // Configuración de inicialización
    autoInit: true,
    waitForDOM: true,
    retryAttempts: 3,
    retryDelay: 2000,
    
    // Configuración de componentes
    components: {
        projects: true,
        contacts: true,
        siteConfig: true,
        statistics: true
    },
    
    // Configuración de desarrollo
    development: {
        enableLogs: true,
        enableDebug: false,
        showInitStatus: true
    }
};

/**
 * 🎯 Clase principal de inicialización
 */
class SupabaseInitializer {
    constructor(config = {}) {
        this.config = { ...INIT_CONFIG, ...config };
        this.components = new Map();
        this.initStatus = {
            supabase: false,
            manager: false,
            projects: false,
            contacts: false,
            siteConfig: false,
            complete: false
        };
        this.errors = [];
        
        // Auto-inicializar si está habilitado
        if (this.config.autoInit) {
            this.init();
        }
    }
    
    /**
     * 🚀 Inicialización principal
     */
    async init() {
        this.log('🚀 Iniciando sistema Supabase...');
        
        try {
            // Esperar a que el DOM esté listo
            if (this.config.waitForDOM) {
                await this.waitForDOM();
            }
            
            // Verificar dependencias
            await this.checkDependencies();
            
            // Inicializar Supabase
            await this.initializeSupabase();
            
            // Inicializar componentes
            await this.initializeComponents();
            
            // Verificar estado final
            await this.verifyInitialization();
            
            this.initStatus.complete = true;
            this.log('✅ Sistema Supabase inicializado correctamente');
            
            // Mostrar estado si está habilitado
            if (this.config.development.showInitStatus) {
                this.showInitStatus();
            }
            
            // Disparar evento de inicialización completa
            this.dispatchInitEvent();
            
        } catch (error) {
            this.error('❌ Error inicializando sistema Supabase:', error);
            this.errors.push(error);
            throw error;
        }
    }
    
    /**
     * ⏳ Esperar a que el DOM esté listo
     */
    async waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }
    
    /**
     * 🔍 Verificar dependencias
     */
    async checkDependencies() {
        this.log('🔍 Verificando dependencias...');
        
        const dependencies = {
            'Supabase Client': () => typeof window.supabase !== 'undefined' || typeof window.supabaseClient !== 'undefined'
        };
        
        const missing = [];
        const optional = [];
        
        for (const [name, check] of Object.entries(dependencies)) {
            if (!check()) {
                missing.push(name);
            }
        }
        
        // Verificar dependencias opcionales
        if (typeof window.SiteConfigManager === 'undefined') {
            optional.push('Site Config Manager');
        }
        
        if (missing.length > 0) {
            throw new Error(`Dependencias faltantes: ${missing.join(', ')}`);
        }
        
        if (optional.length > 0) {
            this.log(`ℹ️ Dependencias opcionales no disponibles: ${optional.join(', ')}`);
        }
        
        this.log('✅ Todas las dependencias requeridas están disponibles');
    }
    
    /**
     * 🔌 Inicializar Supabase
     */
    async initializeSupabase() {
        this.log('🔌 Inicializando cliente Supabase...');
        
        try {
            // Verificar si el cliente Supabase ya está disponible
            if (window.supabaseClient) {
                this.components.set('supabaseClient', window.supabaseClient);
                this.initStatus.supabase = true;
                this.log('✅ Cliente Supabase ya inicializado');
                
                // Verificar conexión
                if (window.supabaseClient.isConnected) {
                    this.initStatus.manager = true;
                    this.log('✅ Supabase conectado y listo');
                } else {
                    this.log('ℹ️ Supabase en modo offline');
                }
            } else {
                this.log('⚠️ Cliente Supabase no disponible, continuando sin él');
            }
            
        } catch (error) {
            this.error('Error inicializando Supabase:', error);
            // No lanzar error, permitir continuar sin Supabase
            this.log('⚠️ Continuando sin Supabase');
        }
    }
    
    /**
     * 🧩 Inicializar componentes
     */
    async initializeComponents() {
        this.log('🧩 Inicializando componentes...');
        
        const componentInitializers = {
            projects: this.initializeProjects.bind(this),
            contacts: this.initializeContacts.bind(this),
            siteConfig: this.initializeSiteConfig.bind(this),
            statistics: this.initializeStatistics.bind(this)
        };
        
        for (const [name, initializer] of Object.entries(componentInitializers)) {
            if (this.config.components[name]) {
                try {
                    await initializer();
                    this.log(`✅ Componente ${name} inicializado`);
                } catch (error) {
                    this.error(`Error inicializando ${name}:`, error);
                    // Continuar con otros componentes
                }
            }
        }
    }
    
    /**
     * 📁 Inicializar sistema de proyectos
     */
    async initializeProjects() {
        if (window.ProjectManager && window.initializeProjects) {
            await window.initializeProjects();
            this.initStatus.projects = true;
            this.components.set('projects', window.projectManager);
        }
    }
    
    /**
     * 📧 Inicializar sistema de contactos
     */
    async initializeContacts() {
        if (window.ContactManager && window.initializeContacts) {
            await window.initializeContacts();
            this.initStatus.contacts = true;
            this.components.set('contacts', window.contactManager);
        }
    }
    
    /**
     * ⚙️ Inicializar configuración del sitio
     */
    async initializeSiteConfig() {
        if (window.SiteConfigManager) {
            // Usar instancia existente si ya está disponible
            if (window.siteConfig) {
                this.components.set('siteConfig', window.siteConfig);
                this.initStatus.siteConfig = true;
                this.log('✅ Usando SiteConfigManager existente');
            } else {
                const siteConfig = new window.SiteConfigManager();
                await siteConfig.loadFromSupabase();
                this.initStatus.siteConfig = true;
                this.components.set('siteConfig', siteConfig);
                
                // Exponer globalmente
                window.siteConfigManager = siteConfig;
            }
        } else {
            this.log('ℹ️ SiteConfigManager no disponible');
        }
    }
    
    /**
     * 📊 Inicializar estadísticas
     */
    async initializeStatistics() {
        const supabaseManager = this.components.get('supabaseManager');
        
        if (supabaseManager) {
            try {
                const stats = await supabaseManager.getDatabaseStats();
                this.components.set('statistics', stats);
                
                // Exponer estadísticas globalmente
                window.databaseStats = stats;
                
                this.log('📊 Estadísticas de BD:', stats);
            } catch (error) {
                this.error('Error obteniendo estadísticas:', error);
            }
        }
    }
    
    /**
     * ✅ Verificar inicialización
     */
    async verifyInitialization() {
        this.log('✅ Verificando inicialización...');
        
        const verifications = {
            'Conexión Supabase': () => {
                return window.supabaseClient?.isConnected || false;
            },
            'Proyectos': () => {
                return window.projectManager?.projects?.length > 0 || false;
            },
            'Configuración': () => {
                return window.siteConfig?.loaded || window.siteConfigManager?.loaded || false;
            }
        };
        
        const results = {};
        
        for (const [name, check] of Object.entries(verifications)) {
            try {
                results[name] = check();
            } catch (error) {
                results[name] = false;
                this.error(`Error verificando ${name}:`, error);
            }
        }
        
        this.log('🔍 Resultados de verificación:', results);
        
        return results;
    }
    
    /**
     * 📊 Mostrar estado de inicialización
     */
    showInitStatus() {
        console.group('🚀 Estado de Inicialización Supabase');
        
        console.log('📊 Estado de componentes:');
        for (const [key, status] of Object.entries(this.initStatus)) {
            console.log(`  ${status ? '✅' : '❌'} ${key}`);
        }
        
        console.log('\n🧩 Componentes inicializados:');
        for (const [name, component] of this.components.entries()) {
            console.log(`  ✅ ${name}:`, component);
        }
        
        if (this.errors.length > 0) {
            console.log('\n❌ Errores encontrados:');
            this.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error.message}`);
            });
        }
        
        console.groupEnd();
    }
    
    /**
     * 📡 Disparar evento de inicialización
     */
    dispatchInitEvent() {
        const event = new CustomEvent('supabaseInitialized', {
            detail: {
                status: this.initStatus,
                components: Object.fromEntries(this.components),
                errors: this.errors
            }
        });
        
        window.dispatchEvent(event);
        document.dispatchEvent(event);
    }
    
    /**
     * 🔄 Reinicializar sistema
     */
    async reinitialize() {
        this.log('🔄 Reinicializando sistema...');
        
        // Limpiar estado
        this.components.clear();
        this.errors = [];
        
        for (const key of Object.keys(this.initStatus)) {
            this.initStatus[key] = false;
        }
        
        // Reinicializar
        await this.init();
    }
    
    /**
     * 📊 Obtener estado del sistema
     */
    getStatus() {
        return {
            initialized: this.initStatus.complete,
            status: this.initStatus,
            components: Object.fromEntries(this.components),
            errors: this.errors,
            config: this.config
        };
    }
    
    /**
     * 🧩 Obtener componente
     */
    getComponent(name) {
        return this.components.get(name);
    }
    
    /**
     * 📝 Logging utilities
     */
    log(...args) {
        if (this.config.development.enableLogs) {
            console.log('[Supabase Init]', ...args);
        }
    }
    
    error(...args) {
        console.error('[Supabase Init Error]', ...args);
    }
    
    debug(...args) {
        if (this.config.development.enableDebug) {
            console.debug('[Supabase Init Debug]', ...args);
        }
    }
}

/**
 * 🚀 Función de inicialización global
 */
async function initializeSupabaseSystem(config = {}) {
    try {
        const initializer = new SupabaseInitializer(config);
        
        // Exponer globalmente
        window.supabaseInitializer = initializer;
        
        // Si no está configurado para auto-init, inicializar manualmente
        if (!config.autoInit) {
            await initializer.init();
        }
        
        return initializer;
    } catch (error) {
        console.error('❌ Error en inicialización global de Supabase:', error);
        throw error;
    }
}

/**
 * 🎯 Inicialización automática cuando se carga el script
 */
(function() {
    // Verificar si ya se inicializó
    if (window.supabaseInitializer) {
        console.log('ℹ️ Sistema Supabase ya inicializado');
        return;
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeSupabaseSystem();
        });
    } else {
        // DOM ya está listo
        setTimeout(() => {
            initializeSupabaseSystem();
        }, 100);
    }
})();

// Exportar para diferentes entornos
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = {
        SupabaseInitializer,
        initializeSupabaseSystem,
        INIT_CONFIG
    };
} else {
    // Browser
    window.SupabaseInitializer = SupabaseInitializer;
    window.initializeSupabaseSystem = initializeSupabaseSystem;
    window.SUPABASE_INIT_CONFIG = INIT_CONFIG;
}

/**
 * 🎯 Ejemplo de uso:
 * 
 * // Inicialización automática (por defecto)
 * // Se ejecuta automáticamente al cargar el script
 * 
 * // Inicialización manual
 * const initializer = await initializeSupabaseSystem({
 *     autoInit: false,
 *     components: {
 *         projects: true,
 *         contacts: false
 *     }
 * });
 * 
 * // Verificar estado
 * console.log(initializer.getStatus());
 * 
 * // Obtener componente
 * const projectManager = initializer.getComponent('projects');
 * 
 * // Escuchar evento de inicialización
 * window.addEventListener('supabaseInitialized', (event) => {
 *     console.log('Sistema inicializado:', event.detail);
 * });
 */
/**
 * Site Configuration Manager
 * Gestiona la configuración dinámica del sitio desde Supabase
 */
class SiteConfigManager {
    constructor() {
        this.config = new Map();
        this.supabaseClient = window.supabaseClient;
        this.supabaseManager = null;
        this.supabaseEnabled = this.supabaseClient && this.supabaseClient.isConnected;
        this.loaded = false;
        
        console.log('🔧 SiteConfigManager inicializado:');
        console.log('  - Supabase:', this.supabaseEnabled ? '✅ Conectado' : '❌ No disponible');
        
        // Configuración por defecto
        this.defaultConfig = {
            // Información de la empresa
            'empresa_nombre': 'AZA Constructora',
            'empresa_eslogan': 'Construyendo el futuro de México',
            'empresa_descripcion': 'Empresa líder en construcción con más de 15 años de experiencia en proyectos industriales, comerciales y de infraestructura.',
            
            // Información de contacto
            'contacto_telefono': '+52 (644) 123-4567',
            'contacto_email': 'contacto@azaconstructora.com',
            'contacto_direccion': 'Av. Revolución 1234, Col. Centro, Hermosillo, Sonora',
            'contacto_horarios': 'Lunes a Viernes: 8:00 AM - 6:00 PM',
            
            // Redes sociales
            'social_facebook': 'https://facebook.com/azaconstructora',
            'social_instagram': 'https://instagram.com/azaconstructora',
            'social_linkedin': 'https://linkedin.com/company/azaconstructora',
            'social_youtube': 'https://youtube.com/@azaconstructora',
            
            // Configuración del sitio
            'sitio_titulo': 'AZA Constructora - Líderes en Construcción',
            'sitio_descripcion': 'Empresa constructora especializada en proyectos industriales, comerciales y de infraestructura en México.',
            'sitio_keywords': 'construcción, industrial, comercial, infraestructura, México, Sonora',
            'sitio_autor': 'AZA Constructora',
            
            // Configuración de servicios
            'servicios_activos': true,
            'proyectos_por_pagina': 12,
            'mostrar_testimonios': true,
            'mostrar_estadisticas': true,
            
            // Configuración de formularios
            'formulario_contacto_activo': true,
            'formulario_cotizacion_activo': true,
            'notificaciones_email': true,
            
            // Configuración de diseño
            'tema_color_primario': '#1a365d',
            'tema_color_secundario': '#2d5a87',
            'tema_color_acento': '#f7931e',
            'mostrar_logo': true,
            'mostrar_menu_fijo': true,
            
            // Configuración de Supabase
            'supabase_habilitado': true,
            'supabase_cache_duracion': 300000,
            'supabase_reintentos': 3,
            'supabase_timeout': 10000
        };
        
        // Cargar configuración por defecto
        this.loadDefaultConfig();
        
        // Inicializar SupabaseManager si está disponible
        this.initializeSupabaseManager();
    }
    
    // Inicializar SupabaseManager
    initializeSupabaseManager() {
        if (this.supabaseEnabled && window.SupabaseManager) {
            try {
                this.supabaseManager = new window.SupabaseManager(
                    null, null, // Se inicializará automáticamente
                    {
                        cache: {
                            enabled: true,
                            duration: this.defaultConfig.supabase_cache_duracion
                        },
                        connection: {
                            timeout: this.defaultConfig.supabase_timeout,
                            retries: this.defaultConfig.supabase_reintentos
                        }
                    }
                );
                
                // Inicializar con credenciales existentes
                if (this.supabaseClient && this.supabaseClient.supabase) {
                    this.supabaseManager.supabase = this.supabaseClient.supabase;
                    this.supabaseManager.isConnected = true;
                }
                
                console.log('✅ SupabaseManager inicializado para configuración');
            } catch (error) {
                console.warn('⚠️ Error inicializando SupabaseManager:', error);
            }
        }
    }
    
    // Cargar configuración por defecto
    loadDefaultConfig() {
        for (const [key, value] of Object.entries(this.defaultConfig)) {
            this.config.set(key, {
                clave: key,
                valor: value,
                tipo: this.inferType(value),
                fuente: 'default'
            });
        }
        console.log('📦 Configuración por defecto cargada');
    }
    
    // Inferir tipo de dato
    inferType(value) {
        if (typeof value === 'boolean') return 'booleano';
        if (typeof value === 'number') return 'numero';
        if (value.includes('@')) return 'email';
        if (value.startsWith('http')) return 'url';
        if (value === 'true' || value === 'false') return 'booleano';
        return 'texto';
    }
    
    // Cargar configuración desde Supabase
    async loadFromSupabase() {
        if (!this.supabaseEnabled) {
            console.warn('⚠️ Supabase no disponible, usando configuración por defecto');
            return { success: false, error: 'Supabase no conectado' };
        }
        
        try {
            let result;
            
            // Usar SupabaseManager si está disponible
            if (this.supabaseManager) {
                const configs = await this.supabaseManager.getSiteConfig();
                result = {
                    success: true,
                    data: Array.isArray(configs) ? configs : (configs ? [configs] : [])
                };
            } else {
                // Fallback al método original
                result = await this.supabaseClient.getSiteConfig();
            }
            
            if (result.success && result.data) {
                // Si es un array (todas las configuraciones)
                if (Array.isArray(result.data)) {
                    result.data.forEach(configItem => {
                        this.config.set(configItem.clave, {
                            ...configItem,
                            fuente: 'supabase'
                        });
                    });
                    console.log(`✅ ${result.data.length} configuraciones cargadas desde Supabase`);
                } else {
                    // Si es un objeto único
                    this.config.set(result.data.clave, {
                        ...result.data,
                        fuente: 'supabase'
                    });
                    console.log('✅ Configuración cargada desde Supabase');
                }
                
                this.loaded = true;
                
                // Si no hay configuraciones, crear las básicas
                if (result.data.length === 0) {
                    await this.createDefaultSupabaseConfig();
                }
                
                return { success: true, data: result.data };
            } else {
                console.warn('⚠️ No se pudieron cargar configuraciones desde Supabase');
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('❌ Error cargando configuración desde Supabase:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Obtener valor de configuración
    get(key, defaultValue = null) {
        const configItem = this.config.get(key);
        if (!configItem) {
            return defaultValue;
        }
        
        // Convertir según el tipo
        const value = configItem.valor;
        switch (configItem.tipo) {
            case 'booleano':
                return value === 'true' || value === true;
            case 'numero':
                return parseFloat(value) || 0;
            default:
                return value;
        }
    }
    
    // Establecer valor de configuración
    set(key, value, type = null) {
        const inferredType = type || this.inferType(value);
        this.config.set(key, {
            clave: key,
            valor: value.toString(),
            tipo: inferredType,
            fuente: 'runtime'
        });
    }
    
    // Crear configuración básica en Supabase
    async createDefaultSupabaseConfig() {
        if (!this.supabaseEnabled) {
            return { success: false, error: 'Supabase no conectado' };
        }
        
        try {
            console.log('📝 Creando configuración básica en Supabase...');
            
            const basicConfigs = [
                { clave: 'empresa_nombre', valor: this.defaultConfig.empresa_nombre, tipo: 'texto' },
                { clave: 'contacto_email', valor: this.defaultConfig.contacto_email, tipo: 'email' },
                { clave: 'contacto_telefono', valor: this.defaultConfig.contacto_telefono, tipo: 'texto' },
                { clave: 'sitio_titulo', valor: this.defaultConfig.sitio_titulo, tipo: 'texto' },
                { clave: 'sitio_descripcion', valor: this.defaultConfig.sitio_descripcion, tipo: 'texto' }
            ];
            
            for (const config of basicConfigs) {
                await this.saveToSupabase(config.clave, config.valor, '', 'general', true);
            }
            
            console.log('✅ Configuración básica creada en Supabase');
            return { success: true };
        } catch (error) {
            console.error('❌ Error creando configuración básica:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Guardar configuración en Supabase
    async saveToSupabase(key, value, description = '', category = 'general', isPublic = false) {
        if (!this.supabaseEnabled) {
            return { success: false, error: 'Supabase no conectado' };
        }
        
        try {
            let result;
            
            // Usar SupabaseManager si está disponible
            if (this.supabaseManager) {
                const configData = {
                    clave: key,
                    valor: value.toString(),
                    tipo: this.inferType(value),
                    descripcion: description,
                    categoria: category,
                    publico: isPublic
                };
                
                result = await this.supabaseManager.updateSiteConfig(configData);
            } else {
                // Fallback al método original
                const configData = {
                    key: key,
                    value: value.toString(),
                    description: description
                };
                
                result = await this.supabaseClient.updateSiteConfig(configData);
            }
            
            if (result.success || result) {
                // Actualizar configuración local
                this.set(key, value);
                console.log(`✅ Configuración '${key}' guardada en Supabase`);
                return { success: true, data: result };
            }
            
            return result;
        } catch (error) {
            console.error('❌ Error guardando configuración:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Obtener todas las configuraciones
    getAll() {
        const result = {};
        for (const [key, configItem] of this.config.entries()) {
            result[key] = this.get(key);
        }
        return result;
    }
    
    // Obtener configuraciones por categoría
    getByCategory(category) {
        const result = {};
        for (const [key, configItem] of this.config.entries()) {
            if (configItem.categoria === category) {
                result[key] = this.get(key);
            }
        }
        return result;
    }
    
    // Aplicar configuraciones al DOM
    applyToDOM() {
        // Actualizar título del sitio
        const siteName = this.get('sitio_nombre');
        if (siteName) {
            document.title = siteName;
            
            // Actualizar meta tags
            let metaTitle = document.querySelector('meta[property="og:title"]');
            if (metaTitle) metaTitle.content = siteName;
        }
        
        // Actualizar descripción
        const siteDescription = this.get('sitio_descripcion');
        if (siteDescription) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.content = siteDescription;
            
            let ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.content = siteDescription;
        }
        
        // Actualizar keywords
        const keywords = this.get('seo_keywords');
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.content = keywords;
            } else {
                // Crear meta keywords si no existe
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                metaKeywords.content = keywords;
                document.head.appendChild(metaKeywords);
            }
        }
        
        // Actualizar información de contacto en el DOM
        this.updateContactInfo();
        
        // Actualizar enlaces de redes sociales
        this.updateSocialLinks();
        
        console.log('✅ Configuración aplicada al DOM');
    }
    
    // Actualizar información de contacto
    updateContactInfo() {
        const email = this.get('contacto_email');
        const phone = this.get('contacto_telefono');
        const address = this.get('contacto_direccion');
        
        // Actualizar emails
        if (email) {
            document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
                link.href = `mailto:${email}`;
                if (link.textContent.includes('@')) {
                    link.textContent = email;
                }
            });
        }
        
        // Actualizar teléfonos
        if (phone) {
            document.querySelectorAll('a[href^="tel:"]').forEach(link => {
                const cleanPhone = phone.replace(/[^\d+]/g, '');
                link.href = `tel:${cleanPhone}`;
                if (link.textContent.includes('(') || link.textContent.includes('+')) {
                    link.textContent = phone;
                }
            });
        }
        
        // Actualizar direcciones
        if (address) {
            document.querySelectorAll('[data-contact="address"]').forEach(element => {
                element.textContent = address;
            });
        }
    }
    
    // Actualizar enlaces de redes sociales
    updateSocialLinks() {
        const socialNetworks = {
            'facebook': this.get('redes_facebook'),
            'instagram': this.get('redes_instagram'),
            'linkedin': this.get('redes_linkedin'),
            'twitter': this.get('redes_twitter')
        };
        
        for (const [network, url] of Object.entries(socialNetworks)) {
            if (url) {
                document.querySelectorAll(`a[data-social="${network}"]`).forEach(link => {
                    link.href = url;
                });
            }
        }
    }
    
    // Obtener estadísticas de configuración
    getStats() {
        const total = this.config.size;
        const fromSupabase = Array.from(this.config.values()).filter(item => item.fuente === 'supabase').length;
        const fromDefault = Array.from(this.config.values()).filter(item => item.fuente === 'default').length;
        
        return {
            total,
            fromSupabase,
            fromDefault,
            loaded: this.loaded,
            supabaseEnabled: this.supabaseEnabled
        };
    }
    
    // Inicializar configuración completa
    async initialize() {
        console.log('🚀 Inicializando configuración del sitio...');
        
        // Intentar cargar desde Supabase
        if (this.supabaseEnabled) {
            await this.loadFromSupabase();
        }
        
        // Aplicar configuración al DOM
        this.applyToDOM();
        
        const stats = this.getStats();
        console.log('🎯 Configuración del sitio lista:');
        console.log(`  - Total: ${stats.total} configuraciones`);
        console.log(`  - Desde Supabase: ${stats.fromSupabase}`);
        console.log(`  - Por defecto: ${stats.fromDefault}`);
        
        return stats;
    }
}

// Exponer la clase globalmente
window.SiteConfigManager = SiteConfigManager;

// Crear instancia global
const siteConfig = new SiteConfigManager();
window.siteConfig = siteConfig;

// Función de inicialización
async function initializeSiteConfig() {
    return await siteConfig.initialize();
}

// Exponer función de inicialización
window.initializeSiteConfig = initializeSiteConfig;

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SiteConfigManager, siteConfig, initializeSiteConfig };
}
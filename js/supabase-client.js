/**
 * Supabase Client Configuration
 * Cliente ligero para integración con Supabase como BaaS
 */

class SupabaseClient {
    constructor() {
        // Configuración desde variables de entorno o config.js
        const config = window.APP_CONFIG?.supabase || {};
        
        this.supabaseUrl = config.url || null;
        this.supabaseKey = config.key || null;
        this.showLogs = window.showLogs || false; // Usar variable global de utils.js
        
        if (!this.supabaseUrl || !this.supabaseKey) {
            if (this.showLogs) console.warn('⚠️ Configuración de Supabase no encontrada. Funcionando en modo offline.');
            this.client = null;
            this.isConnected = false;
            return;
        }
        
        try {
            // Importar Supabase dinámicamente
            this.initializeClient();
        } catch (error) {
            if (this.showLogs) console.error('Error inicializando Supabase:', error);
            this.client = null;
            this.isConnected = false;
        }
    }
    
    async initializeClient() {
        try {
            // Verificar si Supabase está disponible globalmente
            if (typeof supabase !== 'undefined') {
                this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
            } else {
                // Fallback: intentar importar desde CDN
                await this.loadSupabaseFromCDN();
                this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
            }
            
            this.isConnected = true;
            if (this.showLogs) console.log('✅ Supabase cliente inicializado correctamente');
            
            // Verificar conexión
            await this.testConnection();
            
        } catch (error) {
            if (this.showLogs) console.error('Error conectando con Supabase:', error);
            this.client = null;
            this.isConnected = false;
        }
    }
    
    async loadSupabaseFromCDN() {
        return new Promise((resolve, reject) => {
            if (typeof supabase !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('No se pudo cargar Supabase desde CDN'));
            document.head.appendChild(script);
        });
    }
    
    async testConnection() {
        if (!this.client) return false;
        
        try {
            const { data, error } = await this.client
                .from('contactos')
                .select('count', { count: 'exact', head: true });
            
            if (error && error.code !== 'PGRST116') { // PGRST116 = tabla no existe (OK para setup inicial)
                throw error;
            }
            
            if (this.showLogs) console.log('✅ Conexión con Supabase verificada');
            return true;
        } catch (error) {
            if (this.showLogs) console.warn('⚠️ Error verificando conexión:', error.message);
            return false;
        }
    }
    
    // Método para insertar contactos
    async insertContact(contactData) {
        if (!this.isConnected) {
            throw new Error('Supabase no está conectado');
        }
        
        try {
            const { data, error } = await this.client
                .from('contactos')
                .insert([
                    {
                        nombre: contactData.name,
                        email: contactData.email,
                        telefono: contactData.phone,
                        tipo_proyecto: contactData.project,
                        mensaje: contactData.message,
                        fecha_creacion: new Date().toISOString(),
                        estado: 'nuevo',
                        origen: 'web'
                    }
                ])
                .select();
            
            if (error) throw error;
            
            if (this.showLogs) console.log('✅ Contacto guardado en Supabase:', data[0]);
            return { success: true, data: data[0] };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error guardando contacto:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para obtener contactos
    async getContacts(filters = {}) {
        if (!this.isConnected) {
            throw new Error('Supabase no está conectado');
        }
        
        try {
            let query = this.client
                .from('contactos')
                .select('*')
                .order('fecha_creacion', { ascending: false });
            
            // Aplicar filtros si existen
            if (filters.estado) {
                query = query.eq('estado', filters.estado);
            }
            
            if (filters.tipo_proyecto) {
                query = query.eq('tipo_proyecto', filters.tipo_proyecto);
            }
            
            if (filters.limit) {
                query = query.limit(filters.limit);
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error obteniendo contactos:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para insertar proyectos
    async insertProject(projectData) {
        if (!this.isConnected) {
            throw new Error('Supabase no está conectado');
        }
        
        try {
            const { data, error } = await this.client
                .from('proyectos')
                .insert([
                    {
                        titulo: projectData.title,
                        descripcion: projectData.description,
                        categoria: projectData.category,
                        imagenes: projectData.images || [],
                        estado: projectData.status || 'activo',
                        fecha_inicio: projectData.startDate || new Date().toISOString(),
                        fecha_creacion: new Date().toISOString()
                    }
                ])
                .select();
            
            if (error) throw error;
            
            if (this.showLogs) console.log('✅ Proyecto guardado en Supabase:', data[0]);
            return { success: true, data: data[0] };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error guardando proyecto:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para obtener proyectos
    async getProjects(filters = {}) {
        if (!this.isConnected) {
            throw new Error('Supabase no está conectado');
        }
        
        try {
            let query = this.client
                .from('proyectos')
                .select('*')
                .order('fecha_creacion', { ascending: false });
            
            // Aplicar filtros
            if (filters.categoria) {
                query = query.eq('categoria', filters.categoria);
            }
            
            if (filters.estado) {
                query = query.eq('estado', filters.estado);
            }
            
            if (filters.limit) {
                query = query.limit(filters.limit);
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error obteniendo proyectos:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para actualizar configuración del sitio
    async updateSiteConfig(configData) {
        if (!this.isConnected) {
            throw new Error('Supabase no está conectado');
        }
        
        try {
            const { data, error } = await this.client
                .from('configuracion')
                .upsert([
                    {
                        clave: configData.key,
                        valor: configData.value,
                        descripcion: configData.description,
                        fecha_actualizacion: new Date().toISOString()
                    }
                ])
                .select();
            
            if (error) throw error;
            
            if (this.showLogs) console.log('✅ Configuración actualizada:', data[0]);
            return { success: true, data: data[0] };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error actualizando configuración:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para obtener configuración del sitio
    async getSiteConfig(key = null) {
        if (!this.isConnected) {
            throw new Error('Supabase no está conectado');
        }
        
        try {
            let query = this.client
                .from('configuracion')
                .select('*');
            
            if (key) {
                query = query.eq('clave', key).single();
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error obteniendo configuración:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para obtener estadísticas básicas
    async getStats() {
        if (!this.isConnected) {
            return { success: false, error: 'Supabase no conectado' };
        }
        
        try {
            const [contactsResult, projectsResult] = await Promise.all([
                this.client.from('contactos').select('*', { count: 'exact', head: true }),
                this.client.from('proyectos').select('*', { count: 'exact', head: true })
            ]);
            
            const stats = {
                totalContactos: contactsResult.count || 0,
                totalProyectos: projectsResult.count || 0,
                fechaActualizacion: new Date().toISOString()
            };
            
            return { success: true, data: stats };
            
        } catch (error) {
            if (this.showLogs) console.error('❌ Error obteniendo estadísticas:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Método para verificar el estado de la conexión
    getConnectionStatus() {
        return {
            connected: this.isConnected,
            hasClient: !!this.client,
            url: this.supabaseUrl ? this.supabaseUrl.substring(0, 30) + '...' : null
        };
    }
}

// Exponer la clase globalmente
window.SupabaseClient = SupabaseClient;

// Crear instancia global
const supabaseClient = new SupabaseClient();
window.supabaseClient = supabaseClient;

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SupabaseClient, supabaseClient };
}
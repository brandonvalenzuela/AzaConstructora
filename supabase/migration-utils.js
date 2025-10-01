/**
 * 🔄 Utilidades de Migración de Datos
 * Herramientas para migrar datos JSON existentes a Supabase
 * y mantener sincronización entre frontend y backend
 */

class MigrationUtils {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    /**
     * Migrar proyectos desde JSON a Supabase
     * @param {Array} defaultProjects - Array de proyectos del frontend
     * @returns {Promise<Object>} Resultado de la migración
     */
    async migrateProjectsToSupabase(defaultProjects) {
        console.log('🔄 Iniciando migración de proyectos a Supabase...');
        
        const results = {
            success: 0,
            errors: 0,
            details: []
        };

        for (const project of defaultProjects) {
            try {
                const supabaseProject = this.convertFrontendProjectToSupabase(project);
                
                // Verificar si el proyecto ya existe
                const { data: existing } = await this.supabase
                    .from('proyectos')
                    .select('id')
                    .eq('slug', supabaseProject.slug)
                    .single();

                if (existing) {
                    console.log(`⚠️ Proyecto ${project.id} ya existe, actualizando...`);
                    
                    const { error } = await this.supabase
                        .from('proyectos')
                        .update(supabaseProject)
                        .eq('slug', supabaseProject.slug);

                    if (error) throw error;
                } else {
                    console.log(`✅ Insertando nuevo proyecto: ${project.id}`);
                    
                    const { error } = await this.supabase
                        .from('proyectos')
                        .insert(supabaseProject);

                    if (error) throw error;
                }

                results.success++;
                results.details.push({
                    project: project.id,
                    status: 'success',
                    action: existing ? 'updated' : 'inserted'
                });

            } catch (error) {
                console.error(`❌ Error migrando proyecto ${project.id}:`, error);
                results.errors++;
                results.details.push({
                    project: project.id,
                    status: 'error',
                    error: error.message
                });
            }
        }

        console.log(`🎯 Migración completada: ${results.success} éxitos, ${results.errors} errores`);
        return results;
    }

    /**
     * Convertir proyecto del frontend al formato de Supabase
     * @param {Object} frontendProject - Proyecto en formato del frontend
     * @returns {Object} Proyecto en formato de Supabase
     */
    convertFrontendProjectToSupabase(frontendProject) {
        const {
            id,
            title,
            description,
            detailedDescription,
            category,
            categoryLabel,
            imageUrl,
            imageAlt,
            location,
            year,
            status,
            area,
            duration,
            client,
            features,
            specifications,
            gallery,
            featured
        } = frontendProject;

        // Mapear categorías del frontend a Supabase
        const categoryMap = {
            'obra-civil': 'construccion',
            'industrial': 'industrial',
            'edificacion': 'edificacion',
            'infraestructura': 'infraestructura'
        };

        // Mapear estados
        const statusMap = {
            'Completado': 'completado',
            'En Progreso': 'activo',
            'Planificación': 'borrador'
        };

        // Extraer área numérica
        const areaMatch = area?.match(/([\d,]+)/);
        const areaNumeric = areaMatch ? parseFloat(areaMatch[1].replace(/,/g, '')) : null;

        // Extraer duración en meses
        const durationMatch = duration?.match(/(\d+)/);
        const durationMonths = durationMatch ? parseInt(durationMatch[1]) : null;

        // Crear slug desde el ID
        const slug = id;

        // Preparar imágenes
        const imagenes = gallery && gallery.length > 0 
            ? gallery.map(img => img.url)
            : [imageUrl].filter(Boolean);

        return {
            slug,
            titulo: title,
            descripcion: description,
            descripcion_corta: description?.substring(0, 200) || '',
            descripcion_detallada: detailedDescription || description,
            categoria: categoryMap[category] || 'construccion',
            subcategoria: this.inferSubcategory(category, title),
            estado: statusMap[status] || 'borrador',
            visible_web: true,
            destacado: featured || false,
            ubicacion: location,
            ciudad: this.extractCity(location),
            estado_republica: this.extractState(location),
            cliente: client,
            area_construccion: areaNumeric,
            duracion_meses: durationMonths,
            fecha_inicio: this.inferStartDate(year, durationMonths),
            fecha_fin: this.inferEndDate(year, durationMonths),
            imagen_principal: imageUrl,
            imagen_alt: imageAlt,
            imagenes: imagenes,
            caracteristicas: features || [],
            especificaciones: specifications || {},
            meta_title: `${title} - AZA Constructora`,
            meta_description: description?.substring(0, 160) || ''
        };
    }

    /**
     * Inferir subcategoría basada en categoría y título
     */
    inferSubcategory(category, title) {
        const titleLower = title.toLowerCase();
        
        if (category === 'industrial') {
            if (titleLower.includes('nave')) return 'naves';
            if (titleLower.includes('planta')) return 'plantas';
            if (titleLower.includes('autopart')) return 'automotriz';
            return 'manufactura';
        }
        
        if (category === 'obra-civil') {
            if (titleLower.includes('carretera')) return 'carreteras';
            if (titleLower.includes('drenaje')) return 'drenaje';
            if (titleLower.includes('demolición')) return 'demolicion';
            return 'construccion';
        }
        
        if (category === 'edificacion') {
            if (titleLower.includes('comercial') || titleLower.includes('plaza')) return 'comercial';
            if (titleLower.includes('residencial') || titleLower.includes('vivienda')) return 'residencial';
            return 'comercial';
        }
        
        if (category === 'infraestructura') {
            if (titleLower.includes('puente')) return 'puentes';
            return 'vial';
        }
        
        return 'general';
    }

    /**
     * Extraer ciudad de la ubicación
     */
    extractCity(location) {
        if (!location) return null;
        const parts = location.split(',');
        return parts[0]?.trim() || null;
    }

    /**
     * Extraer estado de la ubicación
     */
    extractState(location) {
        if (!location) return null;
        const parts = location.split(',');
        return parts[1]?.trim() || null;
    }

    /**
     * Inferir fecha de inicio basada en año y duración
     */
    inferStartDate(year, durationMonths) {
        if (!year) return null;
        
        const currentYear = new Date().getFullYear();
        const projectYear = parseInt(year);
        
        if (projectYear === currentYear) {
            // Proyecto actual, asumir inicio hace algunos meses
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - (durationMonths || 6));
            return startDate.toISOString().split('T')[0];
        } else {
            // Proyecto pasado, asumir inicio en enero
            return `${projectYear}-01-01`;
        }
    }

    /**
     * Inferir fecha de fin basada en año y duración
     */
    inferEndDate(year, durationMonths) {
        if (!year || !durationMonths) return null;
        
        const startDate = new Date(this.inferStartDate(year, durationMonths));
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + durationMonths);
        
        return endDate.toISOString().split('T')[0];
    }

    /**
     * Sincronizar categorías de proyectos
     */
    async syncProjectCategories() {
        console.log('🔄 Sincronizando categorías de proyectos...');
        
        const categories = [
            {
                nombre: 'Construcción',
                slug: 'construccion',
                descripcion: 'Proyectos de construcción general y obra civil',
                icono: 'fas fa-hard-hat',
                color: '#3498db'
            },
            {
                nombre: 'Industrial',
                slug: 'industrial',
                descripcion: 'Naves industriales y plantas de manufactura',
                icono: 'fas fa-industry',
                color: '#e74c3c'
            },
            {
                nombre: 'Edificación',
                slug: 'edificacion',
                descripcion: 'Edificios comerciales y residenciales',
                icono: 'fas fa-building',
                color: '#2ecc71'
            },
            {
                nombre: 'Infraestructura',
                slug: 'infraestructura',
                descripcion: 'Puentes, carreteras y obra pública',
                icono: 'fas fa-road',
                color: '#f39c12'
            },
            {
                nombre: 'Demolición',
                slug: 'demolicion',
                descripcion: 'Servicios de demolición controlada',
                icono: 'fas fa-hammer',
                color: '#9b59b6'
            }
        ];

        for (const category of categories) {
            try {
                const { error } = await this.supabase
                    .from('categorias_proyecto')
                    .upsert(category, { onConflict: 'slug' });

                if (error) throw error;
                console.log(`✅ Categoría sincronizada: ${category.nombre}`);
            } catch (error) {
                console.error(`❌ Error sincronizando categoría ${category.nombre}:`, error);
            }
        }
    }

    /**
     * Verificar integridad de datos
     */
    async verifyDataIntegrity() {
        console.log('🔍 Verificando integridad de datos...');
        
        const checks = {
            proyectos: 0,
            categorias: 0,
            servicios: 0,
            contactos: 0
        };

        try {
            // Contar proyectos
            const { count: projectCount } = await this.supabase
                .from('proyectos')
                .select('*', { count: 'exact', head: true });
            checks.proyectos = projectCount || 0;

            // Contar categorías
            const { count: categoryCount } = await this.supabase
                .from('categorias_proyecto')
                .select('*', { count: 'exact', head: true });
            checks.categorias = categoryCount || 0;

            // Contar servicios
            const { count: serviceCount } = await this.supabase
                .from('servicios')
                .select('*', { count: 'exact', head: true });
            checks.servicios = serviceCount || 0;

            // Contar contactos
            const { count: contactCount } = await this.supabase
                .from('contactos')
                .select('*', { count: 'exact', head: true });
            checks.contactos = contactCount || 0;

            console.log('📊 Estado de la base de datos:');
            console.log(`  - Proyectos: ${checks.proyectos}`);
            console.log(`  - Categorías: ${checks.categorias}`);
            console.log(`  - Servicios: ${checks.servicios}`);
            console.log(`  - Contactos: ${checks.contactos}`);

            return checks;
        } catch (error) {
            console.error('❌ Error verificando integridad:', error);
            return checks;
        }
    }
}

// Función de utilidad para ejecutar migración completa
async function runFullMigration(supabaseClient, defaultProjects) {
    console.log('🚀 Iniciando migración completa...');
    
    const migrationUtils = new MigrationUtils(supabaseClient);
    
    try {
        // 1. Sincronizar categorías
        await migrationUtils.syncProjectCategories();
        
        // 2. Migrar proyectos
        const migrationResult = await migrationUtils.migrateProjectsToSupabase(defaultProjects);
        
        // 3. Verificar integridad
        const integrity = await migrationUtils.verifyDataIntegrity();
        
        console.log('✅ Migración completa finalizada');
        return {
            success: true,
            migration: migrationResult,
            integrity: integrity
        };
    } catch (error) {
        console.error('❌ Error en migración completa:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Exportar para uso en el navegador
if (typeof window !== 'undefined') {
    window.MigrationUtils = MigrationUtils;
    window.runFullMigration = runFullMigration;
}

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MigrationUtils,
        runFullMigration
    };
}
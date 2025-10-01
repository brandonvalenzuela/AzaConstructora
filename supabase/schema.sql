-- 🗄️ Schema de Base de Datos para AZA Constructora
-- Basado en los datos JSON existentes del proyecto
-- Versión: 1.0
-- Fecha: 2024

-- ============================================================================
-- EXTENSIONES NECESARIAS
-- ============================================================================

-- Habilitar extensiones UUID y funciones de fecha
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- TABLA: contactos
-- Basada en los formularios de contacto existentes
-- ============================================================================

CREATE TABLE IF NOT EXISTS contactos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    empresa VARCHAR(255),
    tipo_proyecto VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    presupuesto_estimado VARCHAR(100),
    fecha_inicio_deseada DATE,
    
    -- Campos de gestión interna
    estado VARCHAR(50) DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'en_proceso', 'cotizado', 'completado', 'descartado')),
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'urgente')),
    origen VARCHAR(50) DEFAULT 'web' CHECK (origen IN ('web', 'telefono', 'email', 'referido', 'redes_sociales')),
    
    -- Campos de seguimiento
    notas_internas TEXT,
    asignado_a VARCHAR(255),
    fecha_ultimo_contacto TIMESTAMP,
    fecha_proxima_accion DATE,
    
    -- Metadatos
    ip_origen INET,
    user_agent TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: proyectos
-- Basada en la estructura JSON de defaultProjects
-- ============================================================================

CREATE TABLE IF NOT EXISTS proyectos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL, -- Para URLs amigables (ej: 'nave-industrial-navojoa')
    
    -- Información básica
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    descripcion_corta VARCHAR(500),
    descripcion_detallada TEXT,
    
    -- Categorización
    categoria VARCHAR(100) NOT NULL CHECK (categoria IN (
        'construccion', 'demolicion', 'movimiento_tierras', 'supervision',
        'remodelacion', 'industrial', 'infraestructura', 'edificacion'
    )),
    subcategoria VARCHAR(100),
    etiquetas TEXT[], -- Array de etiquetas para búsqueda
    
    -- Estado y visibilidad
    estado VARCHAR(50) DEFAULT 'borrador' CHECK (estado IN (
        'borrador', 'activo', 'completado', 'pausado', 'cancelado'
    )),
    visible_web BOOLEAN DEFAULT false,
    destacado BOOLEAN DEFAULT false,
    orden_visualizacion INTEGER DEFAULT 0,
    
    -- Información del proyecto
    ubicacion VARCHAR(255),
    ciudad VARCHAR(100),
    estado_republica VARCHAR(100),
    cliente VARCHAR(255),
    area_construccion DECIMAL(10,2), -- en m²
    duracion_meses INTEGER,
    fecha_inicio DATE,
    fecha_fin DATE,
    
    -- Información financiera (opcional)
    presupuesto_total DECIMAL(15,2),
    costo_m2 DECIMAL(10,2),
    
    -- Imágenes y multimedia
    imagen_principal VARCHAR(500),
    imagen_alt VARCHAR(255),
    imagenes JSONB, -- Array de objetos {url, alt, caption}
    video_url VARCHAR(500),
    
    -- Características y especificaciones
    caracteristicas TEXT[], -- Array de características principales
    especificaciones JSONB, -- Objeto con especificaciones técnicas
    
    -- SEO y metadatos
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    meta_keywords TEXT[],
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: configuracion
-- Basada en SiteConfigManager
-- ============================================================================

CREATE TABLE IF NOT EXISTS configuracion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clave VARCHAR(255) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'texto' CHECK (tipo IN (
        'texto', 'numero', 'booleano', 'json', 'url', 'email', 'telefono', 'color'
    )),
    descripcion TEXT,
    categoria VARCHAR(100) DEFAULT 'general',
    es_publico BOOLEAN DEFAULT false, -- Si puede accederse desde el frontend
    es_requerido BOOLEAN DEFAULT false,
    orden_visualizacion INTEGER DEFAULT 0,
    
    -- Validación
    valor_minimo DECIMAL(15,2),
    valor_maximo DECIMAL(15,2),
    patron_validacion VARCHAR(500), -- Regex para validación
    opciones_validas TEXT[], -- Para campos tipo select
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: estadisticas
-- Para tracking de métricas del sitio
-- ============================================================================

CREATE TABLE IF NOT EXISTS estadisticas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo VARCHAR(100) NOT NULL, -- 'visita_pagina', 'formulario_enviado', 'proyecto_visto', etc.
    entidad_tipo VARCHAR(100), -- 'proyecto', 'pagina', 'formulario'
    entidad_id VARCHAR(255), -- ID de la entidad relacionada
    
    -- Datos del evento
    datos JSONB, -- Datos adicionales del evento
    valor_numerico DECIMAL(15,2), -- Para métricas numéricas
    
    -- Información de sesión
    session_id VARCHAR(255),
    user_id UUID, -- Para usuarios autenticados (futuro)
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- Información geográfica (opcional)
    pais VARCHAR(100),
    ciudad VARCHAR(100),
    
    -- UTM y marketing
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    
    -- Timestamp
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: categorias_proyecto
-- Para gestión dinámica de categorías
-- ============================================================================

CREATE TABLE IF NOT EXISTS categorias_proyecto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    icono VARCHAR(100), -- Clase CSS o nombre de icono
    color VARCHAR(20), -- Color hex para la UI
    orden_visualizacion INTEGER DEFAULT 0,
    activa BOOLEAN DEFAULT true,
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: servicios
-- Para gestión de servicios ofrecidos
-- ============================================================================

CREATE TABLE IF NOT EXISTS servicios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    descripcion_corta VARCHAR(500),
    descripcion_completa TEXT,
    
    -- Categorización
    categoria_id UUID REFERENCES categorias_proyecto(id),
    subcategoria VARCHAR(100),
    
    -- Información del servicio
    precio_desde DECIMAL(15,2),
    precio_hasta DECIMAL(15,2),
    unidad_medida VARCHAR(50), -- 'm²', 'm³', 'proyecto', etc.
    tiempo_estimado_dias INTEGER,
    
    -- Características
    caracteristicas TEXT[],
    incluye TEXT[],
    no_incluye TEXT[],
    
    -- Multimedia
    imagen_principal VARCHAR(500),
    imagenes JSONB,
    
    -- Estado y visibilidad
    activo BOOLEAN DEFAULT true,
    destacado BOOLEAN DEFAULT false,
    orden_visualizacion INTEGER DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: clientes
-- Para gestión de clientes y testimonios
-- ============================================================================

CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    empresa VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(50),
    
    -- Información adicional
    tipo_cliente VARCHAR(100) CHECK (tipo_cliente IN (
        'particular', 'empresa_privada', 'gobierno', 'institucion'
    )),
    sector VARCHAR(100),
    
    -- Dirección
    direccion TEXT,
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    codigo_postal VARCHAR(20),
    
    -- Información comercial
    descuento_porcentaje DECIMAL(5,2) DEFAULT 0,
    credito_limite DECIMAL(15,2),
    dias_credito INTEGER DEFAULT 0,
    
    -- Estado
    activo BOOLEAN DEFAULT true,
    vip BOOLEAN DEFAULT false,
    
    -- Notas
    notas_internas TEXT,
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: cotizaciones
-- Para gestión de cotizaciones y presupuestos
-- ============================================================================

CREATE TABLE IF NOT EXISTS cotizaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_cotizacion VARCHAR(50) UNIQUE NOT NULL,
    
    -- Relaciones
    contacto_id UUID REFERENCES contactos(id),
    cliente_id UUID REFERENCES clientes(id),
    
    -- Información del proyecto
    titulo_proyecto VARCHAR(255) NOT NULL,
    descripcion_proyecto TEXT,
    ubicacion VARCHAR(255),
    
    -- Información financiera
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    descuento_porcentaje DECIMAL(5,2) DEFAULT 0,
    descuento_monto DECIMAL(15,2) DEFAULT 0,
    iva_porcentaje DECIMAL(5,2) DEFAULT 16,
    iva_monto DECIMAL(15,2) DEFAULT 0,
    total DECIMAL(15,2) NOT NULL DEFAULT 0,
    
    -- Estado y fechas
    estado VARCHAR(50) DEFAULT 'borrador' CHECK (estado IN (
        'borrador', 'enviada', 'revisada', 'aprobada', 'rechazada', 'vencida'
    )),
    fecha_vencimiento DATE,
    fecha_aprobacion TIMESTAMP,
    
    -- Condiciones
    condiciones_pago TEXT,
    tiempo_entrega VARCHAR(100),
    garantia VARCHAR(100),
    
    -- Notas
    notas_internas TEXT,
    notas_cliente TEXT,
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: items_cotizacion
-- Detalles de las cotizaciones
-- ============================================================================

CREATE TABLE IF NOT EXISTS items_cotizacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cotizacion_id UUID REFERENCES cotizaciones(id) ON DELETE CASCADE,
    
    -- Información del item
    concepto VARCHAR(255) NOT NULL,
    descripcion TEXT,
    unidad VARCHAR(50), -- 'm²', 'm³', 'pza', 'lote', etc.
    cantidad DECIMAL(10,3) NOT NULL,
    precio_unitario DECIMAL(15,2) NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    
    -- Orden y agrupación
    orden_visualizacion INTEGER DEFAULT 0,
    categoria_item VARCHAR(100),
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: blog_posts (Para futuro blog/noticias)
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    resumen VARCHAR(500),
    contenido TEXT NOT NULL,
    
    -- Categorización
    categoria VARCHAR(100),
    etiquetas TEXT[],
    
    -- Multimedia
    imagen_destacada VARCHAR(500),
    imagen_alt VARCHAR(255),
    
    -- Estado y visibilidad
    estado VARCHAR(50) DEFAULT 'borrador' CHECK (estado IN (
        'borrador', 'publicado', 'programado', 'archivado'
    )),
    fecha_publicacion TIMESTAMP,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    
    -- Estadísticas
    vistas INTEGER DEFAULT 0,
    
    -- Timestamps
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: usuarios (Para futuro panel de administración)
-- ============================================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    
    -- Autenticación (manejada por Supabase Auth)
    auth_id UUID UNIQUE, -- ID de Supabase Auth
    
    -- Información del usuario
    telefono VARCHAR(50),
    avatar_url VARCHAR(500),
    
    -- Roles y permisos
    rol VARCHAR(50) DEFAULT 'usuario' CHECK (rol IN (
        'super_admin', 'admin', 'editor', 'usuario'
    )),
    permisos TEXT[], -- Array de permisos específicos
    
    -- Estado
    activo BOOLEAN DEFAULT true,
    email_verificado BOOLEAN DEFAULT false,
    
    -- Configuración personal
    configuracion JSONB DEFAULT '{}',
    
    -- Timestamps
    ultimo_acceso TIMESTAMP,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================================================

-- Índices para contactos
CREATE INDEX IF NOT EXISTS idx_contactos_estado ON contactos(estado);
CREATE INDEX IF NOT EXISTS idx_contactos_fecha_creacion ON contactos(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_contactos_email ON contactos(email);
CREATE INDEX IF NOT EXISTS idx_contactos_tipo_proyecto ON contactos(tipo_proyecto);

-- Índices para proyectos
CREATE INDEX IF NOT EXISTS idx_proyectos_categoria ON proyectos(categoria);
CREATE INDEX IF NOT EXISTS idx_proyectos_estado ON proyectos(estado);
CREATE INDEX IF NOT EXISTS idx_proyectos_visible_web ON proyectos(visible_web);
CREATE INDEX IF NOT EXISTS idx_proyectos_destacado ON proyectos(destacado);
CREATE INDEX IF NOT EXISTS idx_proyectos_slug ON proyectos(slug);
CREATE INDEX IF NOT EXISTS idx_proyectos_fecha_creacion ON proyectos(fecha_creacion DESC);

-- Índices para configuración
CREATE INDEX IF NOT EXISTS idx_configuracion_clave ON configuracion(clave);
CREATE INDEX IF NOT EXISTS idx_configuracion_categoria ON configuracion(categoria);
CREATE INDEX IF NOT EXISTS idx_configuracion_es_publico ON configuracion(es_publico);

-- Índices para estadísticas
CREATE INDEX IF NOT EXISTS idx_estadisticas_tipo ON estadisticas(tipo);
CREATE INDEX IF NOT EXISTS idx_estadisticas_fecha_creacion ON estadisticas(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_estadisticas_entidad ON estadisticas(entidad_tipo, entidad_id);

-- Índices para servicios
CREATE INDEX IF NOT EXISTS idx_servicios_activo ON servicios(activo);
CREATE INDEX IF NOT EXISTS idx_servicios_destacado ON servicios(destacado);
CREATE INDEX IF NOT EXISTS idx_servicios_categoria ON servicios(categoria_id);

-- Índices para cotizaciones
CREATE INDEX IF NOT EXISTS idx_cotizaciones_estado ON cotizaciones(estado);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_fecha_creacion ON cotizaciones(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_contacto ON cotizaciones(contacto_id);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_cliente ON cotizaciones(cliente_id);

-- ============================================================================
-- TRIGGERS PARA TIMESTAMPS AUTOMÁTICOS
-- ============================================================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualización automática
CREATE TRIGGER update_contactos_updated_at BEFORE UPDATE ON contactos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proyectos_updated_at BEFORE UPDATE ON proyectos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_updated_at BEFORE UPDATE ON configuracion
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_servicios_updated_at BEFORE UPDATE ON servicios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cotizaciones_updated_at BEFORE UPDATE ON cotizaciones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- POLÍTICAS RLS (Row Level Security)
-- ============================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
ALTER TABLE estadisticas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_proyecto ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE items_cotizacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas para contactos
CREATE POLICY "Permitir inserción pública de contactos" ON contactos
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura de contactos para autenticados" ON contactos
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir actualización de contactos para autenticados" ON contactos
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para proyectos
CREATE POLICY "Permitir lectura pública de proyectos visibles" ON proyectos
    FOR SELECT USING (visible_web = true);

CREATE POLICY "Permitir gestión completa de proyectos para autenticados" ON proyectos
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para configuración
CREATE POLICY "Permitir lectura pública de configuraciones públicas" ON configuracion
    FOR SELECT USING (es_publico = true);

CREATE POLICY "Permitir gestión completa de configuración para autenticados" ON configuracion
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para estadísticas
CREATE POLICY "Permitir inserción pública de estadísticas" ON estadisticas
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura de estadísticas para autenticados" ON estadisticas
    FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para categorías
CREATE POLICY "Permitir lectura pública de categorías activas" ON categorias_proyecto
    FOR SELECT USING (activa = true);

CREATE POLICY "Permitir gestión completa de categorías para autenticados" ON categorias_proyecto
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para servicios
CREATE POLICY "Permitir lectura pública de servicios activos" ON servicios
    FOR SELECT USING (activo = true);

CREATE POLICY "Permitir gestión completa de servicios para autenticados" ON servicios
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para clientes
CREATE POLICY "Permitir gestión completa de clientes para autenticados" ON clientes
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para cotizaciones
CREATE POLICY "Permitir gestión completa de cotizaciones para autenticados" ON cotizaciones
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir gestión completa de items cotización para autenticados" ON items_cotizacion
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para blog
CREATE POLICY "Permitir lectura pública de posts publicados" ON blog_posts
    FOR SELECT USING (estado = 'publicado' AND fecha_publicacion <= CURRENT_TIMESTAMP);

CREATE POLICY "Permitir gestión completa de blog para autenticados" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para usuarios
CREATE POLICY "Permitir lectura de perfil propio" ON usuarios
    FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Permitir actualización de perfil propio" ON usuarios
    FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Permitir gestión completa de usuarios para admins" ON usuarios
    FOR ALL USING (auth.role() = 'authenticated' AND 
                   EXISTS (SELECT 1 FROM usuarios WHERE auth_id = auth.uid() AND rol IN ('super_admin', 'admin')));

-- ============================================================================
-- DATOS INICIALES
-- ============================================================================

-- Insertar configuraciones por defecto
INSERT INTO configuracion (clave, valor, tipo, descripcion, categoria, es_publico) VALUES
('sitio_nombre', 'AZA Constructora', 'texto', 'Nombre del sitio web', 'general', true),
('sitio_descripcion', 'Empresa líder en construcción, demolición y movimiento de tierras', 'texto', 'Descripción del sitio', 'general', true),
('contacto_email', 'contacto@azaconstructora.com', 'email', 'Email principal de contacto', 'contacto', true),
('contacto_telefono', '+52 (644) 415-XXXX', 'telefono', 'Teléfono principal', 'contacto', true),
('contacto_direccion', 'Cd. Obregón, Sonora, México', 'texto', 'Dirección física', 'contacto', true),
('redes_facebook', 'https://facebook.com/azaconstructora', 'url', 'URL de Facebook', 'redes_sociales', true),
('redes_instagram', 'https://instagram.com/azaconstructora', 'url', 'URL de Instagram', 'redes_sociales', true),
('redes_linkedin', 'https://linkedin.com/company/azaconstructora', 'url', 'URL de LinkedIn', 'redes_sociales', true),
('seo_keywords', 'construcción, demolición, movimiento de tierras, supervisión de obras', 'texto', 'Palabras clave SEO', 'seo', true),
('analytics_enabled', 'true', 'booleano', 'Habilitar Google Analytics', 'analytics', false),
('mantenimiento_modo', 'false', 'booleano', 'Modo mantenimiento', 'sistema', false),
('formulario_contacto_activo', 'true', 'booleano', 'Formulario de contacto activo', 'formularios', true)
ON CONFLICT (clave) DO NOTHING;

-- Insertar categorías de proyecto por defecto
INSERT INTO categorias_proyecto (nombre, slug, descripcion, icono, color, orden_visualizacion) VALUES
('Obra Civil', 'obra-civil', 'Construcción de infraestructura civil', 'building', '#3B82F6', 1),
('Edificación', 'edificacion', 'Construcción de edificios residenciales y comerciales', 'home', '#10B981', 2),
('Industrial', 'industrial', 'Construcción de naves y plantas industriales', 'factory', '#F59E0B', 3),
('Infraestructura', 'infraestructura', 'Puentes, carreteras y obras de infraestructura', 'road', '#EF4444', 4),
('Demolición', 'demolicion', 'Servicios de demolición controlada', 'hammer', '#8B5CF6', 5),
('Movimiento de Tierras', 'movimiento-tierras', 'Excavación y movimiento de tierras', 'truck', '#F97316', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- FUNCIONES ÚTILES
-- ============================================================================

-- Función para generar slug automático
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(
        regexp_replace(
            regexp_replace(input_text, '[áàäâ]', 'a', 'g'),
            '[éèëê]', 'e', 'g'
        ),
        '[^a-z0-9]+', '-', 'g'
    ));
END;
$$ LANGUAGE plpgsql;

-- Función para obtener estadísticas del dashboard
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'contactos_total', (SELECT COUNT(*) FROM contactos),
        'contactos_nuevos', (SELECT COUNT(*) FROM contactos WHERE estado = 'nuevo'),
        'contactos_mes', (SELECT COUNT(*) FROM contactos WHERE fecha_creacion >= date_trunc('month', CURRENT_DATE)),
        'proyectos_total', (SELECT COUNT(*) FROM proyectos WHERE visible_web = true),
        'proyectos_activos', (SELECT COUNT(*) FROM proyectos WHERE estado = 'activo'),
        'proyectos_completados', (SELECT COUNT(*) FROM proyectos WHERE estado = 'completado'),
        'cotizaciones_pendientes', (SELECT COUNT(*) FROM cotizaciones WHERE estado IN ('enviada', 'revisada')),
        'visitas_mes', (SELECT COUNT(*) FROM estadisticas WHERE tipo = 'visita_pagina' AND fecha_creacion >= date_trunc('month', CURRENT_DATE))
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMENTARIOS FINALES
-- ============================================================================

-- Este schema está diseñado para:
-- 1. Ser compatible con los datos JSON existentes del proyecto
-- 2. Proporcionar escalabilidad para futuras funcionalidades
-- 3. Mantener la seguridad con RLS apropiadas
-- 4. Optimizar el rendimiento con índices estratégicos
-- 5. Facilitar la gestión con triggers automáticos

-- Para usar este schema:
-- 1. Ejecutar en el SQL Editor de Supabase
-- 2. Verificar que todas las tablas se crearon correctamente
-- 3. Confirmar que las políticas RLS están activas
-- 4. Probar la inserción de datos de prueba

-- Versión del schema: 1.0
-- Última actualización: 2024
-- Autor: AZA Constructora Development Team
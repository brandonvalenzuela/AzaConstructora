# 🗄️ Configuración de Supabase para AZA Constructora

## 📋 Instrucciones de Setup

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto:
   - **Nombre:** `aza-constructora`
   - **Región:** Selecciona la más cercana a México
   - **Plan:** Starter (gratuito)

### 2. Ejecutar el Schema y Datos de Ejemplo

1. En el dashboard de Supabase, ve a **SQL Editor**
2. **Primero**: Copia y pega el contenido completo del archivo `schema.sql`
3. Ejecuta el script (botón "Run")
4. **Segundo**: Copia y pega el contenido del archivo `seed-data.sql`
5. Ejecuta el script de datos de ejemplo
6. Verifica que se crearon las tablas:
   - `contactos`
   - `proyectos`
   - `configuracion`
   - `estadisticas`
   - `servicios`
   - `categorias_proyecto`
   - Y otras tablas del sistema

### Datos de Ejemplo Incluidos

El archivo `seed-data.sql` incluye:
- **8 proyectos** basados en los datos JSON existentes del frontend
- **4 servicios principales** de la empresa
- **5 contactos de ejemplo** con diferentes estados
- **Estadísticas básicas** de uso del sitio
- **Categorías de proyectos** predefinidas

### 3. Configurar Variables de Entorno

1. En el dashboard, ve a **Settings > API**
2. Copia los siguientes valores:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`

3. Actualiza tu archivo `.env`:
```env
# Supabase Configuration
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 4. Configurar Row Level Security (RLS)

El schema ya incluye las políticas RLS, pero verifica en **Authentication > Policies** que estén activas:

- **contactos:** Inserción pública, lectura para autenticados
- **proyectos:** Lectura pública para proyectos visibles
- **configuracion:** Lectura pública para configs públicas
- **estadisticas:** Inserción pública, lectura para autenticados

### 5. Configuración Inicial

#### Método Rápido (Recomendado)

1. **Incluir scripts en tu HTML:**

```html
<!-- Después del script de Supabase -->
<script src="supabase/config.js"></script>
<script src="supabase/migration-utils.js"></script>
<script src="supabase/init.js"></script>
```

2. **El sistema se inicializa automáticamente** y configura todo lo necesario.

#### Método Manual

1. Ejecuta el generador de configuración:
```bash
npm run config
```

2. Verifica que aparezcan las variables de Supabase:
```
✅ Variables cargadas correctamente: 5
  🗄️  Supabase:
     - url: https://tu-proyecto...
     - key: eyJhbGciOiJIUzI1NiI...
```

3. Abre el sitio web y verifica en la consola:
```
✅ Supabase cliente inicializado correctamente
✅ Conexión con Supabase verificada
🔧 ContactHandler inicializado:
  - Supabase: ✅ Conectado
```

#### Verificar inicialización

```javascript
// Verificar que todo esté funcionando
console.log('Estado del sistema:', window.supabaseInitializer?.getStatus());
```

## 📋 Estructura de la Base de Datos

### Tablas Principales

1. **contactos** - Almacena todos los mensajes del formulario de contacto
2. **configuracion** - Configuración dinámica del sitio web
3. **proyectos** - Información detallada de proyectos con datos completos
4. **estadisticas** - Métricas y analytics del sitio
5. **categorias_proyecto** - Categorías y subcategorías de proyectos
6. **servicios** - Servicios que ofrece la empresa
7. **clientes** - Base de datos de clientes
8. **cotizaciones** - Sistema de cotizaciones y presupuestos
9. **items_cotizacion** - Detalles de cada cotización
10. **blog_posts** - Sistema de blog (futuro)
11. **usuarios** - Sistema de usuarios y roles
12. **logs_sistema** - Registro de actividades del sistema

### Archivos del Sistema

- **`schema.sql`** - Estructura completa de la base de datos
- **`seed-data.sql`** - Datos de ejemplo basados en JSON existente
- **`config.js`** - Gestor avanzado de Supabase con cache y utilidades
- **`migration-utils.js`** - Herramientas para migrar datos JSON a Supabase
- **`init.js`** - Sistema de inicialización automática
- **`MIGRATION_GUIDE.md`** - Guía completa de migración y configuración

## 📊 Estructura de Datos

### Tabla: contactos
```sql
id (UUID) - Identificador único
nombre (VARCHAR) - Nombre del contacto
email (VARCHAR) - Email del contacto
telefono (VARCHAR) - Teléfono (opcional)
tipo_proyecto (VARCHAR) - Tipo de proyecto solicitado
mensaje (TEXT) - Mensaje del contacto
estado (VARCHAR) - nuevo, contactado, en_proceso, completado, descartado
origen (VARCHAR) - web, telefono, email, referido
fecha_creacion (TIMESTAMP) - Fecha de creación automática
fecha_actualizacion (TIMESTAMP) - Fecha de última actualización
notas_internas (TEXT) - Notas para uso interno
prioridad (VARCHAR) - baja, media, alta, urgente
```

### Tabla: proyectos
```sql
id (UUID) - Identificador único
titulo (VARCHAR) - Título del proyecto
descripcion (TEXT) - Descripción completa
descripcion_corta (VARCHAR) - Descripción breve para listados
categoria (VARCHAR) - construccion, demolicion, movimiento_tierras, etc.
estado (VARCHAR) - activo, completado, pausado, cancelado, borrador
imagenes (JSONB) - Array de URLs de imágenes
imagen_principal (VARCHAR) - URL de imagen principal
ubicacion (VARCHAR) - Ubicación del proyecto
cliente (VARCHAR) - Nombre del cliente
fecha_inicio (DATE) - Fecha de inicio
fecha_fin (DATE) - Fecha de finalización
area_construccion (DECIMAL) - Área en m²
destacado (BOOLEAN) - Si aparece destacado
visible_web (BOOLEAN) - Si es visible en el sitio web
```

### Tabla: configuracion
```sql
id (UUID) - Identificador único
clave (VARCHAR) - Clave de configuración (única)
valor (TEXT) - Valor de la configuración
tipo (VARCHAR) - texto, numero, booleano, json, url, email
descripcion (TEXT) - Descripción de la configuración
categoria (VARCHAR) - Categoría para organización
es_publico (BOOLEAN) - Si puede accederse desde el frontend
```

## 💡 Uso en el Frontend

### Sistema Automático (Recomendado)

El sistema se inicializa automáticamente y expone los siguientes objetos globales:

```javascript
// Gestor principal de Supabase
const manager = window.supabaseInitializer.getComponent('supabaseManager');

// Gestor de proyectos (ya inicializado)
const projects = window.projectManager;

// Gestor de configuración
const config = window.siteConfigManager;

// Estadísticas de la base de datos
const stats = window.databaseStats;
```

### Configuración del Cliente

El cliente de Supabase ya está configurado en `js/supabase-client.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Ejemplos de Uso

#### Envío de Formularios de Contacto
```javascript
import { supabase } from './supabase-client.js'

// Enviar contacto a Supabase
const { data, error } = await supabase
  .from('contactos')
  .insert({
    nombre: formData.nombre,
    email: formData.email,
    telefono: formData.telefono,
    empresa: formData.empresa,
    tipo_proyecto: formData.tipoProyecto,
    mensaje: formData.mensaje,
    presupuesto_estimado: formData.presupuesto,
    fecha_inicio_deseada: formData.fechaInicio
  })
```

#### Obtener Proyectos

```javascript
// Usando el gestor automático
const proyectos = await window.projectManager.loadProjectsFromSupabase();

// Método directo
const { data: proyectos, error } = await supabase
  .from('proyectos')
  .select('*')
  .eq('visible_web', true)
  .order('fecha_creacion', { ascending: false })

// Obtener proyecto por slug
const { data: proyecto, error } = await supabase
  .from('proyectos')
  .select('*')
  .eq('slug', 'nave-industrial-navojoa')
  .single()
```

#### Gestión de Configuración

```javascript
// Usando el gestor automático
const empresaNombre = await window.siteConfigManager.get('empresa_nombre');
await window.siteConfigManager.set('empresa_telefono', '+52 (644) 123-4567');

// Método directo
const { data: config, error } = await supabase
  .from('configuracion')
  .select('*')

// Actualizar configuración
const { data, error } = await supabase
  .from('configuracion')
  .upsert({ clave: 'empresa_nombre', valor: 'AZA Constructora' })
```

#### Migración de Datos

```javascript
// Migración completa automática
const result = await runFullMigration(
    window.supabaseClient.supabase,
    window.defaultProjects
);

// Migración paso a paso
const migrationUtils = new MigrationUtils(window.supabaseClient.supabase);
await migrationUtils.syncProjectCategories();
const migrated = await migrationUtils.migrateProjectsToSupabase(projects);
```

## 📈 Estadísticas y Métricas

### Dashboard de Supabase
Puedes ver estadísticas en tiempo real en:
- **Database > Tables** - Ver datos de las tablas
- **Authentication > Users** - Usuarios registrados (futuro)
- **Storage** - Archivos subidos (futuro)

### Consultas Útiles
```sql
-- Contactos por mes
SELECT 
    DATE_TRUNC('month', fecha_creacion) as mes,
    COUNT(*) as total_contactos
FROM contactos 
GROUP BY mes 
ORDER BY mes DESC;

-- Proyectos por categoría
SELECT categoria, COUNT(*) as total
FROM proyectos 
WHERE visible_web = true
GROUP BY categoria;

-- Configuraciones públicas
SELECT clave, valor 
FROM configuracion 
WHERE es_publico = true;
```

## 🚨 Troubleshooting

### Sistema de Inicialización

#### Problema: El sistema no se inicializa

**Diagnóstico**:
```javascript
// Verificar estado del sistema
console.log('Inicializador:', window.supabaseInitializer?.getStatus());
console.log('Credenciales:', window.SupabaseUtils?.checkCredentials());
```

**Soluciones**:
1. Verificar que todos los scripts estén incluidos en el HTML
2. Verificar variables de entorno
3. Revisar la consola del navegador para errores

#### Problema: Componentes no se inicializan

**Solución**:
```javascript
// Reinicializar sistema
await window.supabaseInitializer.reinitialize();

// Inicializar componente específico
const initializer = new SupabaseInitializer({
    components: {
        projects: true,
        contacts: false
    }
});
```

### Base de Datos

#### Error: "Supabase no está conectado"
1. Verifica que las variables de entorno estén configuradas
2. Ejecuta `npm run config` para regenerar config.js
3. Verifica en la consola del navegador si hay errores de CORS

#### Error: "Permission denied"
1. Verifica que RLS esté configurado correctamente
2. Las políticas deben permitir inserción pública para contactos
3. Los proyectos deben tener `visible_web = true` para ser públicos

#### Los formularios no se guardan
1. Verifica la conexión a Supabase en la consola
2. Revisa que la tabla `contactos` exista
3. Verifica que los campos del formulario coincidan con la tabla

#### Los proyectos no se cargan
1. Verifica que existan proyectos con `visible_web = true`
2. Revisa la consola para errores de conexión
3. El sistema usa proyectos por defecto como respaldo

### Migración de Datos

#### Problema: Error en migración de proyectos

**Diagnóstico**:
```javascript
// Verificar integridad de datos
const utils = new MigrationUtils(window.supabaseClient.supabase);
const integrity = await utils.verifyDataIntegrity();
console.log('Integridad:', integrity);
```

**Solución**:
```javascript
// Limpiar y re-migrar
await utils.syncProjectCategories();
const result = await utils.migrateProjectsToSupabase(window.defaultProjects);
```

### Configuración

#### Problema: Configuración no se guarda

**Solución**:
```javascript
// Verificar gestor de configuración
const configManager = window.siteConfigManager;
console.log('Config manager loaded:', configManager?.loaded);

// Forzar recarga
await configManager.loadFromSupabase();
```

### Rendimiento

#### Problema: Consultas lentas

**Solución**:
```javascript
// Usar cache del SupabaseManager
const manager = window.supabaseInitializer.getComponent('supabaseManager');
const config = await manager.getSiteConfig(); // Usa cache automáticamente

// Limpiar cache si es necesario
manager.clearConfigCache();
```

### Problemas con Datos de Ejemplo

1. **Si los proyectos no aparecen**:
   - Verificar que `seed-data.sql` se ejecutó correctamente
   - Revisar que `visible_web = true` en los proyectos
   - Verificar políticas RLS en la tabla proyectos

2. **Si hay errores de inserción**:
   - Ejecutar primero `schema.sql` completamente
   - Luego ejecutar `seed-data.sql`
   - Verificar que no hay conflictos de IDs

3. **Para limpiar y reiniciar**:
   ```sql
   -- Limpiar todas las tablas
   TRUNCATE contactos, proyectos, servicios, estadisticas RESTART IDENTITY CASCADE;
   
   -- Volver a ejecutar seed-data.sql
   ```

## 🔐 Seguridad

### Políticas RLS Configuradas
- **Inserción pública:** Solo para contactos y estadísticas
- **Lectura pública:** Solo para proyectos visibles y configuraciones públicas
- **Gestión completa:** Solo para usuarios autenticados (futuro panel admin)

### Datos Sensibles
- Las claves de Supabase son públicas (anon key)
- Los datos privados requieren autenticación
- Las configuraciones sensibles tienen `es_publico = false`

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [API Reference](https://supabase.com/docs/reference/javascript)
- [Dashboard de tu proyecto](https://supabase.com/dashboard/projects)

---

**¡Configuración completada!** 🎉

Tu sitio web ahora usa Supabase como backend, manteniendo EmailJS como respaldo para notificaciones.
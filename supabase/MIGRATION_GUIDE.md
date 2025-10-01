# 🔄 Guía de Migración de Datos

Esta guía explica cómo migrar los datos JSON existentes del frontend a Supabase y mantener la sincronización entre ambos sistemas.

## 📋 Contenido

1. [Preparación](#preparación)
2. [Ejecutar Schema y Datos](#ejecutar-schema-y-datos)
3. [Migración Automática](#migración-automática)
4. [Verificación](#verificación)
5. [Troubleshooting](#troubleshooting)

## 🚀 Preparación

### 1. Configurar Supabase

Asegúrate de tener configurado tu proyecto de Supabase:

```env
# En tu archivo .env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### 2. Verificar Conexión

Abre la consola del navegador y verifica:

```javascript
// Verificar que Supabase está conectado
console.log('Supabase:', window.supabaseClient?.isConnected);
```

## 📊 Ejecutar Schema y Datos

### Paso 1: Crear Estructura de Base de Datos

1. Ve al **SQL Editor** en tu dashboard de Supabase
2. Copia y pega el contenido completo de `schema.sql`
3. Ejecuta el script (botón "Run")
4. Verifica que se crearon todas las tablas

### Paso 2: Insertar Datos de Ejemplo

1. En el mismo SQL Editor
2. Copia y pega el contenido de `seed-data.sql`
3. Ejecuta el script
4. Verifica que se insertaron los datos

### Verificación Rápida

```sql
-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_proyectos FROM proyectos;
SELECT COUNT(*) as total_servicios FROM servicios;
SELECT COUNT(*) as total_categorias FROM categorias_proyecto;
```

Deberías ver:
- **8 proyectos**
- **4 servicios**
- **5+ categorías**

## 🔄 Migración Automática (Opcional)

Si quieres migrar datos adicionales o personalizar la migración:

### 1. Cargar Utilidades de Migración

```html
<!-- Agregar en tu HTML -->
<script src="supabase/migration-utils.js"></script>
```

### 2. Ejecutar Migración Completa

```javascript
// En la consola del navegador
const migrationResult = await runFullMigration(
    window.supabaseClient.supabase,
    window.defaultProjects || []
);

console.log('Resultado de migración:', migrationResult);
```

### 3. Migración Paso a Paso

```javascript
// Crear instancia de utilidades
const migrationUtils = new MigrationUtils(window.supabaseClient.supabase);

// 1. Sincronizar categorías
await migrationUtils.syncProjectCategories();

// 2. Migrar proyectos específicos
const projects = window.defaultProjects || [];
const result = await migrationUtils.migrateProjectsToSupabase(projects);

// 3. Verificar integridad
const integrity = await migrationUtils.verifyDataIntegrity();
console.log('Estado de la BD:', integrity);
```

## ✅ Verificación

### 1. Verificar en el Frontend

1. Recarga tu sitio web
2. Ve a la página de proyectos
3. Deberías ver los proyectos cargados desde Supabase
4. Revisa la consola del navegador:

```
🚀 Inicializando sistema de proyectos...
✅ 8 proyectos cargados desde Supabase
✅ Sistema de proyectos inicializado con 8 proyectos
```

### 2. Verificar en Supabase Dashboard

1. Ve a **Table Editor** en tu dashboard
2. Revisa las tablas:
   - `proyectos`: Debe tener 8 registros
   - `servicios`: Debe tener 4 registros
   - `categorias_proyecto`: Debe tener 5+ registros
   - `contactos`: Debe tener 5 registros de ejemplo

### 3. Probar Funcionalidad

```javascript
// Probar consulta de proyectos
const { data: proyectos } = await window.supabaseClient.supabase
    .from('proyectos')
    .select('*')
    .eq('visible_web', true);

console.log('Proyectos desde Supabase:', proyectos);

// Probar inserción de contacto
const { data: contacto } = await window.supabaseClient.supabase
    .from('contactos')
    .insert({
        nombre: 'Prueba',
        email: 'prueba@test.com',
        mensaje: 'Mensaje de prueba'
    });

console.log('Contacto insertado:', contacto);
```

## 🔧 Troubleshooting

### Error: "relation does not exist"

**Problema**: Las tablas no se crearon correctamente.

**Solución**:
1. Ejecuta `schema.sql` completamente
2. Verifica que no hay errores en el SQL Editor
3. Revisa que todas las tablas aparecen en Table Editor

### Error: "duplicate key value violates unique constraint"

**Problema**: Intentas insertar datos que ya existen.

**Solución**:
```sql
-- Limpiar datos existentes
TRUNCATE proyectos, servicios, contactos RESTART IDENTITY CASCADE;

-- Volver a ejecutar seed-data.sql
```

### Los proyectos no aparecen en el frontend

**Problema**: Error de conexión o configuración.

**Solución**:
1. Verifica variables de entorno
2. Revisa la consola del navegador
3. Verifica políticas RLS en Supabase

```javascript
// Debug en consola
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 10) + '...');
```

### Datos incompletos o incorrectos

**Problema**: Los datos no se mapearon correctamente.

**Solución**:
1. Revisa el mapeo en `migration-utils.js`
2. Ejecuta migración paso a paso
3. Verifica logs en consola

```javascript
// Verificar mapeo de un proyecto específico
const utils = new MigrationUtils(window.supabaseClient.supabase);
const mapped = utils.convertFrontendProjectToSupabase(window.defaultProjects[0]);
console.log('Proyecto mapeado:', mapped);
```

## 📈 Datos Incluidos

### Proyectos (8 total)

1. **Nave Industrial Navojoa** - Industrial completado
2. **Demolición Obregón** - Obra civil completado
3. **Carretera Hermosillo** - Infraestructura completado
4. **Plaza Norte Tijuana** - Edificación en progreso
5. **Puente Los Pinos** - Infraestructura completado
6. **AutoParts Mexicali** - Industrial en borrador
7. **Drenaje Culiacán** - Obra civil completado
8. **Vista Hermosa Ensenada** - Edificación en progreso

### Servicios (4 total)

1. **Construcción de Naves Industriales**
2. **Demolición Controlada y Segura**
3. **Construcción de Carreteras y Vialidades**
4. **Construcción de Edificios Comerciales**

### Categorías (5 total)

1. **Construcción** - Obra civil general
2. **Industrial** - Naves y plantas
3. **Edificación** - Comercial y residencial
4. **Infraestructura** - Puentes y carreteras
5. **Demolición** - Servicios especializados

### Contactos (5 ejemplos)

Contactos de ejemplo con diferentes estados y tipos de proyecto.

## 🎯 Próximos Pasos

1. **Personalizar datos**: Modifica `seed-data.sql` con tus proyectos reales
2. **Agregar más servicios**: Expande la tabla `servicios`
3. **Configurar usuarios**: Implementa sistema de autenticación
4. **Panel de administración**: Crea interfaz para gestionar contenido
5. **Analytics**: Implementa seguimiento de estadísticas

## 📞 Soporte

Si tienes problemas con la migración:

1. Revisa los logs en la consola del navegador
2. Verifica la configuración de Supabase
3. Consulta la documentación oficial de Supabase
4. Revisa las políticas RLS en tu proyecto

---

**Versión**: 1.0  
**Última actualización**: 2024  
**Compatibilidad**: Supabase v2, Frontend AZA Constructora v1.0
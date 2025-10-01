-- 🌱 Datos de Ejemplo para AZA Constructora
-- Basado en los proyectos JSON existentes del frontend
-- Versión: 1.0
-- Fecha: 2024

-- ============================================================================
-- INSERTAR PROYECTOS BASADOS EN defaultProjects
-- ============================================================================

-- Proyecto 1: Nave Industrial Navojoa
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'nave-industrial-navojoa',
    'Construcción de Nave Industrial',
    'Desarrollo integral de estructura industrial, desde la cimentación hasta los acabados. Un proyecto diseñado para la máxima eficiencia operativa y seguridad.',
    'Desarrollo integral de estructura industrial de 3,500 m² con tecnología de punta.',
    'Este proyecto representa uno de nuestros logros más significativos en el sector industrial. La nave industrial de 3,500 m² fue diseñada específicamente para optimizar los procesos de manufactura del cliente, incorporando las últimas tecnologías en construcción industrial. El proyecto incluyó desde la preparación del terreno hasta la instalación de sistemas especializados de ventilación, iluminación LED de alta eficiencia y sistemas contra incendios de última generación.',
    'industrial',
    'manufactura',
    'completado',
    true,
    true,
    'Navojoa, Sonora',
    'Navojoa',
    'Sonora',
    'Industrias del Norte S.A.',
    3500.00,
    8,
    '2023-06-01',
    '2024-02-01',
    'https://images.unsplash.com/photo-1547303595-5b6dbfc8e677?q=80&w=1632&auto=format&fit=crop',
    'Imagen de interior de nave industrial en construcción',
    ARRAY[
        'Estructura de acero galvanizado de alta resistencia',
        'Sistema de ventilación natural y mecánica',
        'Iluminación LED de alta eficiencia energética',
        'Piso industrial de concreto pulido',
        'Sistema contra incendios automatizado',
        'Oficinas administrativas integradas',
        'Área de carga y descarga optimizada'
    ],
    '{
        "Estructura": "Acero galvanizado con vigas de 12m de claro libre",
        "Cimentación": "Zapatas corridas de concreto armado f''c=250 kg/cm²",
        "Cubierta": "Lámina galvanizada calibre 26 con aislamiento térmico",
        "Instalaciones": "Eléctricas, hidráulicas y sistema contra incendios",
        "Acabados": "Piso industrial, pintura epóxica en estructura"
    }'::jsonb,
    'Construcción de Nave Industrial en Navojoa - AZA Constructora',
    'Proyecto industrial de 3,500 m² en Navojoa, Sonora. Estructura de acero, sistemas especializados y tecnología de punta.'
);

-- Proyecto 2: Demolición Obregón
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'demolicion-obregon',
    'Demolición y Preparación de Sitio',
    'Ejecución segura y controlada de demoliciones, preparando el terreno para nuevas construcciones bajo estrictas normas de seguridad y sostenibilidad.',
    'Demolición controlada de 2,800 m² con reciclaje del 85% de materiales.',
    'Proyecto integral de demolición controlada de antiguas instalaciones industriales y preparación del sitio para nueva construcción. El trabajo incluyó la demolición de estructuras de concreto armado, remoción de materiales peligrosos, y acondicionamiento del terreno siguiendo estrictos protocolos ambientales y de seguridad.',
    'demolicion',
    'industrial',
    'completado',
    true,
    false,
    'Cd. Obregón, Sonora',
    'Ciudad Obregón',
    'Sonora',
    'Desarrollo Urbano Municipal',
    2800.00,
    3,
    '2024-01-15',
    '2024-04-15',
    'https://images.unsplash.com/photo-1683372101362-2efc3e75650e?q=80&w=1169&auto=format&fit=crop',
    'Imagen de demolición de estructura de concreto',
    ARRAY[
        'Demolición controlada con explosivos',
        'Manejo especializado de materiales peligrosos',
        'Reciclaje del 85% de materiales demolidos',
        'Nivelación y compactación del terreno',
        'Estudios de impacto ambiental',
        'Cumplimiento total de normas de seguridad'
    ],
    '{
        "Tipo de demolición": "Controlada con maquinaria pesada y explosivos",
        "Materiales removidos": "1,200 toneladas de concreto y acero",
        "Reciclaje": "85% de materiales reutilizados",
        "Seguridad": "Protocolos OSHA y normas mexicanas",
        "Tiempo de ejecución": "12 semanas incluyendo preparación"
    }'::jsonb,
    'Demolición Controlada en Ciudad Obregón - AZA Constructora',
    'Servicio de demolición segura y sostenible en Obregón. Reciclaje de materiales y cumplimiento de normas ambientales.'
);

-- Proyecto 3: Carretera Hermosillo
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'carretera-hermosillo',
    'Construcción de Carretera Estatal',
    'Proyecto de pavimentación y construcción de 15 km de carretera estatal, incluyendo señalización y sistemas de drenaje.',
    'Construcción de 15 km de carretera estatal con infraestructura completa.',
    'Construcción de 15 kilómetros de carretera estatal de dos carriles con acotamientos, incluyendo obras de drenaje, señalización horizontal y vertical, y sistemas de seguridad vial. El proyecto mejoró significativamente la conectividad regional y redujo los tiempos de traslado en un 40%.',
    'construccion',
    'carreteras',
    'completado',
    true,
    true,
    'Hermosillo, Sonora',
    'Hermosillo',
    'Sonora',
    'Secretaría de Infraestructura Estatal',
    150000.00, -- 15 km * 10m ancho promedio
    14,
    '2022-03-01',
    '2023-05-01',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop',
    'Construcción de carretera',
    ARRAY[
        'Pavimento asfáltico de alta resistencia',
        'Sistema de drenaje pluvial completo',
        'Señalización horizontal y vertical',
        'Acotamientos de 2.5m a cada lado',
        'Puentes vehiculares en cruces importantes',
        'Iluminación LED en intersecciones'
    ],
    '{
        "Longitud": "15 kilómetros de carretera de dos carriles",
        "Ancho de calzada": "7 metros con acotamientos de 2.5m",
        "Pavimento": "Concreto asfáltico de 10cm sobre base hidráulica",
        "Drenaje": "25 obras de drenaje menor y 3 puentes",
        "Señalización": "Completa según normas SCT"
    }'::jsonb,
    'Construcción de Carretera Estatal Hermosillo - AZA Constructora',
    'Proyecto de infraestructura vial de 15 km en Hermosillo. Pavimentación, drenaje y señalización completa.'
);

-- Proyecto 4: Plaza Norte Tijuana
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'plaza-norte-tijuana',
    'Centro Comercial Plaza Norte',
    'Construcción de centro comercial de 3 niveles con 50 locales comerciales y estacionamiento subterráneo.',
    'Centro comercial moderno de 12,000 m² con 50 locales y estacionamiento.',
    'Desarrollo de centro comercial moderno de tres niveles con 50 locales comerciales, área de comidas, cines y estacionamiento subterráneo para 200 vehículos. El proyecto incorpora tecnologías sustentables y diseño arquitectónico contemporáneo.',
    'edificacion',
    'comercial',
    'activo',
    true,
    true,
    'Tijuana, Baja California',
    'Tijuana',
    'Baja California',
    'Grupo Inmobiliario del Pacífico',
    12000.00,
    18,
    '2023-08-01',
    '2025-02-01',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop',
    'Edificio comercial',
    ARRAY[
        '50 locales comerciales distribuidos en 3 niveles',
        'Estacionamiento subterráneo para 200 vehículos',
        'Área de comidas con 12 restaurantes',
        'Complejo de cines con 6 salas',
        'Sistema de climatización centralizada',
        'Tecnologías sustentables integradas'
    ],
    '{
        "Área total": "12,000 m² de construcción",
        "Estructura": "Concreto armado con losa postensada",
        "Fachada": "Muro cortina con cristal de control solar",
        "Instalaciones": "Eléctricas, hidráulicas, clima y seguridad",
        "Estacionamiento": "Subterráneo con sistema automatizado"
    }'::jsonb,
    'Centro Comercial Plaza Norte Tijuana - AZA Constructora',
    'Construcción de centro comercial de 12,000 m² en Tijuana. 50 locales, cines y estacionamiento subterráneo.'
);

-- Proyecto 5: Puente Los Pinos
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'puente-los-pinos',
    'Puente Vehicular Los Pinos',
    'Construcción de puente vehicular de 200 metros de longitud sobre río principal de la ciudad.',
    'Puente vehicular de concreto presforzado de 200 metros de longitud.',
    'Construcción de puente vehicular de concreto presforzado de 200 metros de longitud sobre el río principal de la ciudad. El diseño incluye dos carriles de circulación, banquetas peatonales y sistema de iluminación ornamental.',
    'infraestructura',
    'puentes',
    'completado',
    true,
    false,
    'Guadalajara, Jalisco',
    'Guadalajara',
    'Jalisco',
    'Gobierno Municipal de Guadalajara',
    2400.00, -- 200m x 12m
    10,
    '2022-08-01',
    '2023-06-01',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1170&auto=format&fit=crop',
    'Puente vehicular',
    ARRAY[
        'Estructura de concreto presforzado',
        'Dos carriles de circulación vehicular',
        'Banquetas peatonales de 1.5m',
        'Sistema de drenaje integrado',
        'Iluminación ornamental LED',
        'Barandales de seguridad'
    ],
    '{
        "Longitud": "200 metros con 4 claros de 50m",
        "Ancho": "12 metros incluyendo banquetas",
        "Estructura": "Vigas presforzadas sobre pilas de concreto",
        "Cimentación": "Pilotes de fricción de 25m de profundidad",
        "Acabados": "Concreto arquitectónico e iluminación LED"
    }'::jsonb,
    'Puente Vehicular Los Pinos Guadalajara - AZA Constructora',
    'Construcción de puente de 200m en Guadalajara. Estructura de concreto presforzado con iluminación ornamental.'
);

-- Proyecto 6: AutoParts Mexicali
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'autoparts-mexicali',
    'Planta de Manufactura AutoParts',
    'Construcción de planta industrial de 5,000 m² para manufactura de autopartes con tecnología de punta.',
    'Planta industrial de última generación para manufactura automotriz.',
    'Desarrollo de planta industrial de última generación para la manufactura de autopartes destinadas a la industria automotriz. El proyecto incluye áreas de producción, almacenamiento, oficinas administrativas y laboratorio de control de calidad.',
    'industrial',
    'automotriz',
    'borrador',
    true,
    false,
    'Mexicali, Baja California',
    'Mexicali',
    'Baja California',
    'AutoParts Manufacturing Inc.',
    5000.00,
    12,
    '2024-06-01',
    '2025-06-01',
    'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1170&auto=format&fit=crop',
    'Planta industrial',
    ARRAY[
        'Líneas de producción automatizadas',
        'Laboratorio de control de calidad',
        'Sistema de climatización especializada',
        'Área de almacenamiento automatizada',
        'Oficinas administrativas modernas',
        'Sistemas de seguridad industrial'
    ],
    '{
        "Área de producción": "3,500 m² con equipamiento especializado",
        "Oficinas": "800 m² en dos niveles",
        "Almacén": "700 m² con sistema automatizado",
        "Estructura": "Acero estructural con entrepisos de concreto",
        "Instalaciones": "Especializadas para manufactura automotriz"
    }'::jsonb,
    'Planta AutoParts Mexicali - AZA Constructora',
    'Construcción de planta industrial de 5,000 m² para manufactura automotriz en Mexicali, Baja California.'
);

-- Proyecto 7: Drenaje Culiacán
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'drenaje-culiacan',
    'Sistema de Drenaje Urbano',
    'Modernización del sistema de drenaje pluvial en zona metropolitana, incluyendo 8 km de tuberías principales.',
    'Modernización de 8 km de drenaje pluvial beneficiando a 50,000 habitantes.',
    'Proyecto integral de modernización del sistema de drenaje pluvial que beneficia a más de 50,000 habitantes. Incluye la instalación de 8 kilómetros de tuberías principales, pozos de visita, y sistemas de bombeo para prevenir inundaciones.',
    'construccion',
    'drenaje',
    'completado',
    true,
    false,
    'Culiacán, Sinaloa',
    'Culiacán',
    'Sinaloa',
    'Comisión Municipal de Agua',
    80000.00, -- 8 km lineales
    6,
    '2023-01-15',
    '2023-07-15',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1170&auto=format&fit=crop',
    'Sistema de drenaje',
    ARRAY[
        'Tuberías de concreto de gran diámetro',
        'Pozos de visita cada 100 metros',
        'Estaciones de bombeo automatizadas',
        'Sistema de monitoreo en tiempo real',
        'Conexiones domiciliarias renovadas',
        'Obras complementarias de pavimentación'
    ],
    '{
        "Tuberías": "8 km de tubería de concreto de 1.20m a 2.40m",
        "Pozos": "80 pozos de visita de concreto armado",
        "Bombeo": "3 estaciones con capacidad de 500 l/s",
        "Profundidad": "Variable de 2m a 8m según topografía",
        "Capacidad": "Diseñado para lluvia de 50 años de recurrencia"
    }'::jsonb,
    'Sistema de Drenaje Urbano Culiacán - AZA Constructora',
    'Modernización de drenaje pluvial en Culiacán. 8 km de tuberías y sistemas de bombeo automatizados.'
);

-- Proyecto 8: Vista Hermosa Ensenada
INSERT INTO proyectos (
    slug, titulo, descripcion, descripcion_corta, descripcion_detallada,
    categoria, subcategoria, estado, visible_web, destacado,
    ubicacion, ciudad, estado_republica, cliente,
    area_construccion, duracion_meses, fecha_inicio, fecha_fin,
    imagen_principal, imagen_alt,
    caracteristicas, especificaciones,
    meta_title, meta_description
) VALUES (
    'vista-hermosa-ensenada',
    'Complejo Residencial Vista Hermosa',
    'Desarrollo habitacional de 120 viviendas de interés social con áreas verdes y servicios comunitarios.',
    'Desarrollo de 120 viviendas sustentables en 8 hectáreas con servicios completos.',
    'Desarrollo habitacional integral que incluye 120 viviendas de interés social, áreas verdes, centro comunitario, y servicios básicos. El proyecto está diseñado bajo criterios de sustentabilidad y eficiencia energética.',
    'edificacion',
    'residencial',
    'activo',
    true,
    true,
    'Ensenada, Baja California',
    'Ensenada',
    'Baja California',
    'Instituto de Vivienda Estatal',
    80000.00, -- 8 hectáreas
    15,
    '2023-10-01',
    '2025-01-01',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1170&auto=format&fit=crop',
    'Complejo residencial',
    ARRAY[
        '120 viviendas de 60 m² cada una',
        'Centro comunitario con servicios básicos',
        'Áreas verdes y recreativas',
        'Calles pavimentadas con banquetas',
        'Red de servicios completa',
        'Diseño bioclimático'
    ],
    '{
        "Viviendas": "120 casas de 60 m² en lotes de 120 m²",
        "Construcción": "Muros de block y losa de concreto",
        "Servicios": "Agua potable, drenaje, electricidad y gas",
        "Vialidades": "2.5 km de calles pavimentadas",
        "Áreas verdes": "15% del área total del desarrollo"
    }'::jsonb,
    'Complejo Residencial Vista Hermosa Ensenada - AZA Constructora',
    'Desarrollo habitacional sustentable de 120 viviendas en Ensenada. Diseño bioclimático y servicios completos.'
);

-- ============================================================================
-- INSERTAR SERVICIOS BASADOS EN LAS CATEGORÍAS DE PROYECTOS
-- ============================================================================

-- Servicio 1: Construcción Industrial
INSERT INTO servicios (
    nombre, slug, descripcion_corta, descripcion_completa,
    categoria_id, subcategoria,
    precio_desde, precio_hasta, unidad_medida, tiempo_estimado_dias,
    caracteristicas, incluye, no_incluye,
    imagen_principal, activo, destacado, orden_visualizacion,
    meta_title, meta_description
) VALUES (
    'Construcción de Naves Industriales',
    'construccion-naves-industriales',
    'Construcción integral de naves industriales con estructura de acero y sistemas especializados.',
    'Desarrollamos naves industriales de alta calidad con estructura de acero galvanizado, sistemas de ventilación, iluminación LED y todas las instalaciones necesarias para operaciones industriales eficientes y seguras.',
    (SELECT id FROM categorias_proyecto WHERE slug = 'industrial'),
    'naves',
    8500.00,
    12000.00,
    'm²',
    180,
    ARRAY[
        'Estructura de acero galvanizado',
        'Cimentación de concreto armado',
        'Sistema de ventilación industrial',
        'Iluminación LED de alta eficiencia',
        'Instalaciones eléctricas especializadas',
        'Piso industrial de concreto pulido'
    ],
    ARRAY[
        'Diseño arquitectónico e ingeniería',
        'Permisos y licencias de construcción',
        'Estructura completa de acero',
        'Cimentación y obra civil',
        'Instalaciones básicas (eléctrica, hidráulica)',
        'Supervisión técnica especializada'
    ],
    ARRAY[
        'Equipamiento industrial específico',
        'Sistemas de automatización',
        'Mobiliario de oficinas',
        'Paisajismo exterior'
    ],
    'https://images.unsplash.com/photo-1547303595-5b6dbfc8e677?q=80&w=1632&auto=format&fit=crop',
    true,
    true,
    1,
    'Construcción de Naves Industriales - AZA Constructora',
    'Especialistas en construcción de naves industriales. Estructura de acero, instalaciones especializadas y supervisión técnica.'
);

-- Servicio 2: Demolición Controlada
INSERT INTO servicios (
    nombre, slug, descripcion_corta, descripcion_completa,
    categoria_id, subcategoria,
    precio_desde, precio_hasta, unidad_medida, tiempo_estimado_dias,
    caracteristicas, incluye, no_incluye,
    imagen_principal, activo, destacado, orden_visualizacion,
    meta_title, meta_description
) VALUES (
    'Demolición Controlada y Segura',
    'demolicion-controlada',
    'Servicios de demolición controlada con reciclaje de materiales y cumplimiento de normas ambientales.',
    'Realizamos demoliciones controladas y seguras utilizando técnicas especializadas, equipos de última generación y protocolos estrictos de seguridad. Incluimos reciclaje de materiales y gestión ambiental responsable.',
    (SELECT id FROM categorias_proyecto WHERE slug = 'demolicion'),
    'estructuras',
    150.00,
    350.00,
    'm²',
    30,
    ARRAY[
        'Demolición controlada con explosivos',
        'Manejo de materiales peligrosos',
        'Reciclaje hasta 85% de materiales',
        'Protocolos de seguridad OSHA',
        'Estudios de impacto ambiental',
        'Limpieza y preparación del sitio'
    ],
    ARRAY[
        'Evaluación técnica previa',
        'Permisos y autorizaciones',
        'Demolición controlada',
        'Separación y reciclaje de materiales',
        'Limpieza del sitio',
        'Certificados de disposición'
    ],
    ARRAY[
        'Remoción de servicios públicos',
        'Gestión de residuos especiales',
        'Nivelación del terreno',
        'Nuevas construcciones'
    ],
    'https://images.unsplash.com/photo-1683372101362-2efc3e75650e?q=80&w=1169&auto=format&fit=crop',
    true,
    true,
    2,
    'Demolición Controlada y Segura - AZA Constructora',
    'Servicios profesionales de demolición controlada. Seguridad, reciclaje de materiales y cumplimiento ambiental.'
);

-- Servicio 3: Construcción de Carreteras
INSERT INTO servicios (
    nombre, slug, descripcion_corta, descripcion_completa,
    categoria_id, subcategoria,
    precio_desde, precio_hasta, unidad_medida, tiempo_estimado_dias,
    caracteristicas, incluye, no_incluye,
    imagen_principal, activo, destacado, orden_visualizacion,
    meta_title, meta_description
) VALUES (
    'Construcción de Carreteras y Vialidades',
    'construccion-carreteras',
    'Construcción de carreteras, pavimentación asfáltica y obras de drenaje con estándares de calidad internacional.',
    'Especialistas en construcción de carreteras y vialidades urbanas. Incluimos pavimentación asfáltica, obras de drenaje, señalización y todos los elementos necesarios para infraestructura vial de alta calidad.',
    (SELECT id FROM categorias_proyecto WHERE slug = 'obra-civil'),
    'carreteras',
    2500.00,
    4500.00,
    'km',
    365,
    ARRAY[
        'Pavimento asfáltico de alta resistencia',
        'Sistema de drenaje pluvial',
        'Señalización horizontal y vertical',
        'Acotamientos y banquetas',
        'Obras de arte (puentes menores)',
        'Iluminación en intersecciones'
    ],
    ARRAY[
        'Estudios topográficos y geotécnicos',
        'Movimiento de tierras y terracerías',
        'Base hidráulica y sub-base',
        'Pavimento asfáltico',
        'Obras de drenaje',
        'Señalización completa'
    ],
    ARRAY[
        'Adquisición de derechos de vía',
        'Reubicación de servicios',
        'Puentes mayores',
        'Sistemas inteligentes de tráfico'
    ],
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop',
    true,
    true,
    3,
    'Construcción de Carreteras - AZA Constructora',
    'Construcción profesional de carreteras y vialidades. Pavimentación, drenaje y señalización con estándares internacionales.'
);

-- Servicio 4: Edificación Comercial
INSERT INTO servicios (
    nombre, slug, descripcion_corta, descripcion_completa,
    categoria_id, subcategoria,
    precio_desde, precio_hasta, unidad_medida, tiempo_estimado_dias,
    caracteristicas, incluye, no_incluye,
    imagen_principal, activo, destacado, orden_visualizacion,
    meta_title, meta_description
) VALUES (
    'Construcción de Edificios Comerciales',
    'construccion-edificios-comerciales',
    'Desarrollo de centros comerciales, oficinas y edificios corporativos con diseño moderno y tecnología sustentable.',
    'Construimos edificios comerciales de alta calidad con diseño arquitectónico contemporáneo, tecnologías sustentables y todas las instalaciones necesarias para operaciones comerciales exitosas.',
    (SELECT id FROM categorias_proyecto WHERE slug = 'edificacion'),
    'comercial',
    15000.00,
    25000.00,
    'm²',
    540,
    ARRAY[
        'Estructura de concreto armado',
        'Fachadas con muro cortina',
        'Sistemas de climatización',
        'Instalaciones especializadas',
        'Estacionamientos integrados',
        'Tecnologías sustentables'
    ],
    ARRAY[
        'Diseño arquitectónico completo',
        'Estructura y obra civil',
        'Instalaciones (eléctrica, hidráulica, clima)',
        'Acabados de alta calidad',
        'Sistemas de seguridad',
        'Áreas comunes y servicios'
    ],
    ARRAY[
        'Mobiliario y equipamiento',
        'Decoración interior',
        'Sistemas de sonido',
        'Equipos especializados por local'
    ],
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop',
    true,
    false,
    4,
    'Construcción de Edificios Comerciales - AZA Constructora',
    'Especialistas en edificación comercial. Centros comerciales, oficinas y edificios corporativos con tecnología sustentable.'
);

-- ============================================================================
-- INSERTAR CONTACTOS DE EJEMPLO
-- ============================================================================

INSERT INTO contactos (
    nombre, email, telefono, empresa, tipo_proyecto, mensaje,
    presupuesto_estimado, fecha_inicio_deseada, estado, prioridad, origen
) VALUES 
(
    'Juan Carlos Mendoza',
    'jc.mendoza@empresa.com',
    '+52 644 123 4567',
    'Industrias del Norte',
    'Construcción Industrial',
    'Necesitamos cotización para construcción de nave industrial de aproximadamente 2,000 m². El proyecto debe incluir oficinas administrativas y área de almacén.',
    '$8,000,000 - $12,000,000',
    '2024-06-01',
    'nuevo',
    'alta',
    'web'
),
(
    'María Elena Rodríguez',
    'maria.rodriguez@gobierno.gob.mx',
    '+52 662 987 6543',
    'Secretaría de Obras Públicas',
    'Infraestructura',
    'Requerimos servicios para construcción de puente vehicular sobre arroyo principal. Longitud aproximada 150 metros.',
    '$15,000,000 - $25,000,000',
    '2024-08-15',
    'contactado',
    'urgente',
    'telefono'
),
(
    'Roberto Silva',
    'r.silva@constructora.mx',
    '+52 644 555 0123',
    'Desarrollos Inmobiliarios SA',
    'Demolición',
    'Necesitamos demoler estructura existente de 1,500 m² para nuevo desarrollo habitacional. Requiere manejo de materiales especiales.',
    '$500,000 - $800,000',
    '2024-05-01',
    'en_proceso',
    'media',
    'referido'
),
(
    'Ana Patricia López',
    'ana.lopez@email.com',
    '+52 644 321 9876',
    NULL,
    'Construcción Residencial',
    'Interesada en construcción de casa habitación de 180 m². Terreno ya disponible en fraccionamiento.',
    '$2,500,000 - $3,500,000',
    '2024-07-01',
    'nuevo',
    'baja',
    'web'
),
(
    'Carlos Eduardo Ramírez',
    'carlos.ramirez@municipio.gob.mx',
    '+52 667 444 5555',
    'Municipio de Culiacán',
    'Obra Civil',
    'Proyecto de modernización de sistema de drenaje pluvial en zona centro. Aproximadamente 5 km de tubería principal.',
    '$10,000,000 - $18,000,000',
    '2024-09-01',
    'cotizado',
    'alta',
    'email'
);

-- ============================================================================
-- INSERTAR ESTADÍSTICAS DE EJEMPLO
-- ============================================================================

INSERT INTO estadisticas (tipo, entidad_tipo, entidad_id, datos, valor_numerico, session_id, ip_address) VALUES
('visita_pagina', 'pagina', 'index', '{"pagina": "inicio", "tiempo_permanencia": 45}', 1, 'sess_001', '192.168.1.100'),
('visita_pagina', 'pagina', 'proyectos', '{"pagina": "proyectos", "tiempo_permanencia": 120}', 1, 'sess_001', '192.168.1.100'),
('proyecto_visto', 'proyecto', 'nave-industrial-navojoa', '{"tiempo_visualizacion": 180}', 1, 'sess_001', '192.168.1.100'),
('formulario_enviado', 'formulario', 'contacto', '{"campos_completados": 8, "tiempo_llenado": 300}', 1, 'sess_002', '192.168.1.101'),
('visita_pagina', 'pagina', 'servicios', '{"pagina": "servicios", "tiempo_permanencia": 90}', 1, 'sess_003', '192.168.1.102');

-- ============================================================================
-- COMENTARIOS FINALES
-- ============================================================================

-- Este archivo de datos de ejemplo incluye:
-- 1. 8 proyectos basados en los datos JSON existentes del frontend
-- 2. 4 servicios principales que ofrece la empresa
-- 3. 5 contactos de ejemplo con diferentes estados
-- 4. Estadísticas básicas de uso del sitio

-- Para usar estos datos:
-- 1. Ejecutar primero schema.sql
-- 2. Ejecutar este archivo seed-data.sql
-- 3. Verificar que los datos se insertaron correctamente
-- 4. Probar las consultas desde el frontend

-- Los datos están diseñados para ser consistentes con:
-- - La estructura JSON de defaultProjects en projects.js
-- - Las categorías definidas en el frontend
-- - Los formularios de contacto existentes
-- - El sistema de configuración del sitio

-- Versión: 1.0
-- Última actualización: 2024
-- Basado en: defaultProjects y estructura existente del frontend
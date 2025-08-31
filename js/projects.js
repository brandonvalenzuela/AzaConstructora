// Sistema de gestión de proyectos dinámico
class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentFilter = 'all';
    }

    // Agregar un proyecto
    addProject(projectData) {
        this.projects.push(projectData);
    }

    // Agregar múltiples proyectos
    addProjects(projectsArray) {
        this.projects.push(...projectsArray);
    }

    // Crear HTML para una tarjeta de proyecto
    createProjectCard(projectData) {
        const {
            id,
            category,
            imageUrl,
            imageAlt,
            categoryLabel,
            title,
            description,
            location,
            year,
            status = 'Completado',
        } = projectData;

        
        // Determinar el color de la etiqueta de estado
        let statusColorClass = 'bg-gray-600'; // Color por defecto
        const statusLower = status.toLowerCase();
        
        if (statusLower.includes('completado') || statusLower.includes('terminado') || statusLower.includes('finalizado')) {
            statusColorClass = 'bg-green-600';
        } else if (statusLower.includes('progreso') || statusLower.includes('construcción') || statusLower.includes('desarrollo')) {
            statusColorClass = 'bg-blue-600';
        } else if (statusLower.includes('planificación') || statusLower.includes('planeación') || statusLower.includes('diseño') || statusLower.includes('proyecto')) {
            statusColorClass = 'bg-yellow-600';
        } else if (statusLower.includes('pausado') || statusLower.includes('suspendido')) {
            statusColorClass = 'bg-red-600';
        }

        return `
            <div class="project-card" data-category="${category}">
                <a href="proyecto-detalle.html?id=${id}" class="block">
                    <div class="bg-gray-800/50 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                        <div class="relative overflow-hidden">
                            <img src="${imageUrl}" 
                                 alt="${imageAlt}" 
                                 class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDQwMCAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjU2IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI4IiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxNCI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+Cjwvc3ZnPg=='">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="absolute top-4 left-4">
                                <span class="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">${categoryLabel}</span>
                            </div>
                            <div class="absolute top-4 right-4">
                                <span class="${statusColorClass} text-white px-2 py-1 rounded text-xs font-medium">${status}</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
                            <p class="text-gray-300 mb-4 text-sm leading-relaxed">
                                ${description}
                            </p>
                            <div class="flex justify-between items-center text-sm text-gray-400 mb-4">
                                <span>📍 ${location}</span>
                                <span>📅 ${year}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // Filtrar proyectos por categoría
    filterProjects(category) {
        this.currentFilter = category;
        if (category === 'all') {
            return this.projects;
        }
        return this.projects.filter(project => project.category === category);
    }

    // Renderizar proyectos en un contenedor
    renderProjects(containerId, category = 'all') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container con id '${containerId}' no encontrado`);
            return;
        }

        const filteredProjects = this.filterProjects(category);
        const projectsHTML = filteredProjects.map(project => this.createProjectCard(project)).join('');
        
        container.innerHTML = projectsHTML;
        
        // Agregar animación de entrada
        const cards = container.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Configurar filtros de categoría
    setupCategoryFilters(filterContainerId, projectsContainerId) {
        const filterContainer = document.getElementById(filterContainerId);
        if (!filterContainer) return;

        const categories = [
            { id: 'all', label: 'Todos' },
            { id: 'obra-civil', label: 'Obra Civil' },
            { id: 'edificacion', label: 'Edificación' },
            { id: 'infraestructura', label: 'Infraestructura' },
            { id: 'industrial', label: 'Industrial' }
        ];

        const filtersHTML = categories.map(cat => 
            `<button class="filter-btn px-4 py-2 rounded-lg transition-all duration-300 ${
                cat.id === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }" data-category="${cat.id}">${cat.label}</button>`
        ).join('');

        filterContainer.innerHTML = filtersHTML;

        // Agregar event listeners
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.dataset.category;
                
                // Actualizar estilos de botones
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.className = 'filter-btn px-4 py-2 rounded-lg transition-all duration-300 bg-gray-700 text-gray-300 hover:bg-gray-600';
                });
                e.target.className = 'filter-btn px-4 py-2 rounded-lg transition-all duration-300 bg-blue-600 text-white';
                
                // Renderizar proyectos filtrados
                this.renderProjects(projectsContainerId, category);
            }
        });
    }
}

// Datos de proyectos predefinidos
const defaultProjects = [
    {
        id: 'nave-industrial-navojoa',
        category: 'industrial',
        imageUrl: 'https://images.unsplash.com/photo-1547303595-5b6dbfc8e677?q=80&w=1632&auto=format&fit=crop',
        imageAlt: 'Imagen de interior de nave industrial en construcción',
        categoryLabel: 'Industrial',
        title: 'Construcción de Nave Industrial',
        description: 'Desarrollo integral de estructura industrial, desde la cimentación hasta los acabados. Un proyecto diseñado para la máxima eficiencia operativa y seguridad.',
        detailedDescription: 'Este proyecto representa uno de nuestros logros más significativos en el sector industrial. La nave industrial de 3,500 m² fue diseñada específicamente para optimizar los procesos de manufactura del cliente, incorporando las últimas tecnologías en construcción industrial. El proyecto incluyó desde la preparación del terreno hasta la instalación de sistemas especializados de ventilación, iluminación LED de alta eficiencia y sistemas contra incendios de última generación.',
        location: 'Navojoa, Sonora',
        year: '2024',
        status: 'Completado',
        area: '3,500 m²',
        duration: '8 meses',
        client: 'Industrias del Norte S.A.',
        features: [
            'Estructura de acero galvanizado de alta resistencia',
            'Sistema de ventilación natural y mecánica',
            'Iluminación LED de alta eficiencia energética',
            'Piso industrial de concreto pulido',
            'Sistema contra incendios automatizado',
            'Oficinas administrativas integradas',
            'Área de carga y descarga optimizada'
        ],
        specifications: {
            'Estructura': 'Acero galvanizado con vigas de 12m de claro libre',
            'Cimentación': 'Zapatas corridas de concreto armado f\'c=250 kg/cm²',
            'Cubierta': 'Lámina galvanizada calibre 26 con aislamiento térmico',
            'Instalaciones': 'Eléctricas, hidráulicas y sistema contra incendios',
            'Acabados': 'Piso industrial, pintura epóxica en estructura'
        },
        gallery: [
            {
                url: 'https://images.unsplash.com/photo-1547303595-5b6dbfc8e677?q=80&w=1632&auto=format&fit=crop',
                alt: 'Vista interior de la nave industrial',
                caption: 'Espacio interior con estructura de acero'
            },
            {
                url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1170&auto=format&fit=crop',
                alt: 'Vista exterior de la nave',
                caption: 'Fachada principal terminada'
            }
        ]
    },
    {
        id: 'demolicion-obregon',
        category: 'obra-civil',
        imageUrl: 'https://images.unsplash.com/photo-1683372101362-2efc3e75650e?q=80&w=1169&auto=format&fit=crop',
        imageAlt: 'Imagen de demolición de estructura de concreto',
        categoryLabel: 'Obra Civil',
        title: 'Demolición y Preparación de Sitio',
        description: 'Ejecución segura y controlada de demoliciones, preparando el terreno para nuevas construcciones bajo estrictas normas de seguridad y sostenibilidad.',
        detailedDescription: 'Proyecto integral de demolición controlada de antiguas instalaciones industriales y preparación del sitio para nueva construcción. El trabajo incluyó la demolición de estructuras de concreto armado, remoción de materiales peligrosos, y acondicionamiento del terreno siguiendo estrictos protocolos ambientales y de seguridad.',
        location: 'Cd. Obregón, Sonora',
        year: '2024',
        status: 'Completado',
        area: '2,800 m²',
        duration: '3 meses',
        client: 'Desarrollo Urbano Municipal',
        features: [
            'Demolición controlada con explosivos',
            'Manejo especializado de materiales peligrosos',
            'Reciclaje del 85% de materiales demolidos',
            'Nivelación y compactación del terreno',
            'Estudios de impacto ambiental',
            'Cumplimiento total de normas de seguridad'
        ],
        specifications: {
            'Tipo de demolición': 'Controlada con maquinaria pesada y explosivos',
            'Materiales removidos': '1,200 toneladas de concreto y acero',
            'Reciclaje': '85% de materiales reutilizados',
            'Seguridad': 'Protocolos OSHA y normas mexicanas',
            'Tiempo de ejecución': '12 semanas incluyendo preparación'
        }
    },
    {
        id: 'carretera-hermosillo',
        category: 'obra-civil',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Construcción de carretera',
        categoryLabel: 'Obra Civil',
        title: 'Construcción de Carretera Estatal',
        description: 'Proyecto de pavimentación y construcción de 15 km de carretera estatal, incluyendo señalización y sistemas de drenaje.',
        detailedDescription: 'Construcción de 15 kilómetros de carretera estatal de dos carriles con acotamientos, incluyendo obras de drenaje, señalización horizontal y vertical, y sistemas de seguridad vial. El proyecto mejoró significativamente la conectividad regional y redujo los tiempos de traslado en un 40%.',
        location: 'Hermosillo, Sonora',
        year: '2023',
        status: 'Completado',
        area: '15 km lineales',
        duration: '14 meses',
        client: 'Secretaría de Infraestructura Estatal',
        features: [
            'Pavimento asfáltico de alta resistencia',
            'Sistema de drenaje pluvial completo',
            'Señalización horizontal y vertical',
            'Acotamientos de 2.5m a cada lado',
            'Puentes vehiculares en cruces importantes',
            'Iluminación LED en intersecciones'
        ],
        specifications: {
            'Longitud': '15 kilómetros de carretera de dos carriles',
            'Ancho de calzada': '7 metros con acotamientos de 2.5m',
            'Pavimento': 'Concreto asfáltico de 10cm sobre base hidráulica',
            'Drenaje': '25 obras de drenaje menor y 3 puentes',
            'Señalización': 'Completa según normas SCT'
        }
    },
    {
        id: 'plaza-norte-tijuana',
        category: 'edificacion',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Edificio comercial',
        categoryLabel: 'Edificación',
        title: 'Centro Comercial Plaza Norte',
        description: 'Construcción de centro comercial de 3 niveles con 50 locales comerciales y estacionamiento subterráneo.',
        detailedDescription: 'Desarrollo de centro comercial moderno de tres niveles con 50 locales comerciales, área de comidas, cines y estacionamiento subterráneo para 200 vehículos. El proyecto incorpora tecnologías sustentables y diseño arquitectónico contemporáneo.',
        location: 'Tijuana, Baja California',
        year: '2024',
        status: 'En Progreso',
        area: '12,000 m²',
        duration: '18 meses',
        client: 'Grupo Inmobiliario del Pacífico',
        features: [
            '50 locales comerciales distribuidos en 3 niveles',
            'Estacionamiento subterráneo para 200 vehículos',
            'Área de comidas con 12 restaurantes',
            'Complejo de cines con 6 salas',
            'Sistema de climatización centralizada',
            'Tecnologías sustentables integradas'
        ],
        specifications: {
            'Área total': '12,000 m² de construcción',
            'Estructura': 'Concreto armado con losa postensada',
            'Fachada': 'Muro cortina con cristal de control solar',
            'Instalaciones': 'Eléctricas, hidráulicas, clima y seguridad',
            'Estacionamiento': 'Subterráneo con sistema automatizado'
        }
    },
    {
        id: 'puente-los-pinos',
        category: 'infraestructura',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Puente vehicular',
        categoryLabel: 'Infraestructura',
        title: 'Puente Vehicular Los Pinos',
        description: 'Construcción de puente vehicular de 200 metros de longitud sobre río principal de la ciudad.',
        detailedDescription: 'Construcción de puente vehicular de concreto presforzado de 200 metros de longitud sobre el río principal de la ciudad. El diseño incluye dos carriles de circulación, banquetas peatonales y sistema de iluminación ornamental.',
        location: 'Guadalajara, Jalisco',
        year: '2023',
        status: 'Completado',
        area: '200 m lineales',
        duration: '10 meses',
        client: 'Gobierno Municipal de Guadalajara',
        features: [
            'Estructura de concreto presforzado',
            'Dos carriles de circulación vehicular',
            'Banquetas peatonales de 1.5m',
            'Sistema de drenaje integrado',
            'Iluminación ornamental LED',
            'Barandales de seguridad'
        ],
        specifications: {
            'Longitud': '200 metros con 4 claros de 50m',
            'Ancho': '12 metros incluyendo banquetas',
            'Estructura': 'Vigas presforzadas sobre pilas de concreto',
            'Cimentación': 'Pilotes de fricción de 25m de profundidad',
            'Acabados': 'Concreto arquitectónico y iluminación LED'
        }
    },
    {
        id: 'autoparts-mexicali',
        category: 'industrial',
        imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Planta industrial',
        categoryLabel: 'Industrial',
        title: 'Planta de Manufactura AutoParts',
        description: 'Construcción de planta industrial de 5,000 m² para manufactura de autopartes con tecnología de punta.',
        detailedDescription: 'Desarrollo de planta industrial de última generación para la manufactura de autopartes destinadas a la industria automotriz. El proyecto incluye áreas de producción, almacenamiento, oficinas administrativas y laboratorio de control de calidad.',
        location: 'Mexicali, Baja California',
        year: '2024',
        status: 'Planificación',
        area: '5,000 m²',
        duration: '12 meses',
        client: 'AutoParts Manufacturing Inc.',
        features: [
            'Líneas de producción automatizadas',
            'Laboratorio de control de calidad',
            'Sistema de climatización especializada',
            'Área de almacenamiento automatizada',
            'Oficinas administrativas modernas',
            'Sistemas de seguridad industrial'
        ],
        specifications: {
            'Área de producción': '3,500 m² con equipamiento especializado',
            'Oficinas': '800 m² en dos niveles',
            'Almacén': '700 m² con sistema automatizado',
            'Estructura': 'Acero estructural con entrepisos de concreto',
            'Instalaciones': 'Especializadas para manufactura automotriz'
        }
    },
    {
        id: 'drenaje-culiacan',
        category: 'obra-civil',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Sistema de drenaje',
        categoryLabel: 'Obra Civil',
        title: 'Sistema de Drenaje Urbano',
        description: 'Modernización del sistema de drenaje pluvial en zona metropolitana, incluyendo 8 km de tuberías principales.',
        detailedDescription: 'Proyecto integral de modernización del sistema de drenaje pluvial que beneficia a más de 50,000 habitantes. Incluye la instalación de 8 kilómetros de tuberías principales, pozos de visita, y sistemas de bombeo para prevenir inundaciones.',
        location: 'Culiacán, Sinaloa',
        year: '2023',
        status: 'Completado',
        area: '8 km lineales',
        duration: '6 meses',
        client: 'Comisión Municipal de Agua',
        features: [
            'Tuberías de concreto de gran diámetro',
            'Pozos de visita cada 100 metros',
            'Estaciones de bombeo automatizadas',
            'Sistema de monitoreo en tiempo real',
            'Conexiones domiciliarias renovadas',
            'Obras complementarias de pavimentación'
        ],
        specifications: {
            'Tuberías': '8 km de tubería de concreto de 1.20m a 2.40m',
            'Pozos': '80 pozos de visita de concreto armado',
            'Bombeo': '3 estaciones con capacidad de 500 l/s',
            'Profundidad': 'Variable de 2m a 8m según topografía',
            'Capacidad': 'Diseñado para lluvia de 50 años de recurrencia'
        }
    },
    {
        id: 'vista-hermosa-ensenada',
        category: 'edificacion',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Complejo residencial',
        categoryLabel: 'Edificación',
        title: 'Complejo Residencial Vista Hermosa',
        description: 'Desarrollo habitacional de 120 viviendas de interés social con áreas verdes y servicios comunitarios.',
        detailedDescription: 'Desarrollo habitacional integral que incluye 120 viviendas de interés social, áreas verdes, centro comunitario, y servicios básicos. El proyecto está diseñado bajo criterios de sustentabilidad y eficiencia energética.',
        location: 'Ensenada, Baja California',
        year: '2024',
        status: 'En Progreso',
        area: '8 hectáreas',
        duration: '15 meses',
        client: 'Instituto de Vivienda Estatal',
        features: [
            '120 viviendas de 60 m² cada una',
            'Centro comunitario con servicios básicos',
            'Áreas verdes y recreativas',
            'Calles pavimentadas con banquetas',
            'Red de servicios completa',
            'Diseño bioclimático'
        ],
        specifications: {
            'Viviendas': '120 casas de 60 m² en lotes de 120 m²',
            'Construcción': 'Muros de block y losa de concreto',
            'Servicios': 'Agua potable, drenaje, electricidad y gas',
            'Vialidades': '2.5 km de calles pavimentadas',
            'Áreas verdes': '15% del área total del desarrollo'
        }
    }
];

// Instancia global del gestor de proyectos
const projectManager = new ProjectManager();

// Función de inicialización
function initializeProjects() {
    // Cargar proyectos predefinidos
    projectManager.addProjects(defaultProjects);
    
    // Renderizar proyectos si existe el contenedor
    if (document.getElementById('projects-container')) {
        projectManager.renderProjects('projects-container');
    }
    
    // Configurar filtros si existe el contenedor
    if (document.getElementById('category-filters')) {
        projectManager.setupCategoryFilters('category-filters', 'projects-container');
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ProjectManager = ProjectManager;
    window.projectManager = projectManager;
    window.initializeProjects = initializeProjects;
}
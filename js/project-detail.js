// Sistema de gestión de detalles de proyecto
class ProjectDetailManager {
    constructor() {
        this.currentProject = null;
        this.allProjects = [];
    }

    // Obtener parámetros de la URL
    getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            id: urlParams.get('id'),
            category: urlParams.get('category'),
            title: urlParams.get('title')
        };
    }

    // Buscar proyecto por diferentes criterios
    findProject(params) {
        console.log('Buscando proyecto con parámetros:', params);
        console.log('Total de proyectos disponibles:', this.allProjects.length);
        
        if (!this.allProjects.length) {
            console.error('No hay proyectos cargados');
            return null;
        }

        // Mostrar IDs disponibles para depuración
        console.log('IDs de proyectos disponibles:', this.allProjects.map(p => p.id));

        // Buscar por ID si está disponible
        if (params.id) {
            console.log('Buscando por ID:', params.id);
            const project = this.allProjects.find(p => p.id === params.id);
            if (project) {
                console.log('Proyecto encontrado por ID:', project.title);
                return project;
            } else {
                console.log('No se encontró proyecto con ID:', params.id);
            }
        }

        // Buscar por título y categoría
        if (params.title && params.category) {
            console.log('Buscando por título y categoría:', params.title, params.category);
            const project = this.allProjects.find(p => 
                p.title.toLowerCase().replace(/\s+/g, '-') === params.title.toLowerCase() &&
                p.category === params.category
            );
            if (project) {
                console.log('Proyecto encontrado por título y categoría:', project.title);
                return project;
            }
        }

        // Buscar solo por título
        if (params.title) {
            console.log('Buscando por título:', params.title);
            const project = this.allProjects.find(p => 
                p.title.toLowerCase().replace(/\s+/g, '-') === params.title.toLowerCase()
            );
            if (project) {
                console.log('Proyecto encontrado por título:', project.title);
                return project;
            }
        }

        console.log('No se encontró ningún proyecto');
        return null;
    }

    // Cargar datos del proyecto
    loadProjectData() {
        const params = this.getUrlParams();
        console.log('Parámetros de URL obtenidos:', params);
        console.log('URL actual:', window.location.href);
        
        // Si no hay parámetros, mostrar error y redirigir
        if (!params.id && !params.title) {
            console.log('No hay parámetros de proyecto, mostrando error');
            this.showError();
            // Redirigir a la página de proyectos después de 3 segundos
            setTimeout(() => {
                window.location.href = 'proyectos.html';
            }, 3000);
            return;
        }

        // Buscar el proyecto
        console.log('Iniciando búsqueda de proyecto...');
        this.currentProject = this.findProject(params);
        
        if (!this.currentProject) {
            console.log('Proyecto no encontrado, mostrando error');
            this.showError();
            return;
        }

        console.log('Proyecto encontrado, renderizando detalles:', this.currentProject.title);
        this.renderProjectDetail();
    }

    // Mostrar estado de error
    showError() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('error-state').classList.remove('hidden');
        document.getElementById('main-content').classList.add('hidden');
    }

    // Mostrar lista de proyectos disponibles cuando no se especifica ID
    showProjectsList() {
        const container = document.getElementById('project-detail-container');
        if (container && this.allProjects.length > 0) {
            const projectsHtml = this.allProjects.map(project => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img src="${project.imageUrl}" alt="${project.imageAlt}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
                        <p class="text-gray-600 mb-4">${project.description}</p>
                        <button onclick="window.location.href='proyecto-detalle.html?id=${project.id}'" class="btn-primary px-6 py-2 rounded-lg font-semibold inline-block cursor-pointer">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="text-center py-8 mb-8">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">Selecciona un Proyecto</h1>
                    <p class="text-gray-600 text-lg">Elige uno de nuestros proyectos para ver los detalles completos</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${projectsHtml}
                </div>
            `;
        }
    }

    // Mostrar contenido principal
    showMainContent() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('error-state').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    }

    // Determinar color del estado
    getStatusColorClass(status) {
        const statusLower = status.toLowerCase();
        
        if (statusLower.includes('completado') || statusLower.includes('terminado') || statusLower.includes('finalizado')) {
            return 'bg-green-600';
        } else if (statusLower.includes('progreso') || statusLower.includes('construcción') || statusLower.includes('desarrollo')) {
            return 'bg-blue-600';
        } else if (statusLower.includes('planificación') || statusLower.includes('planeación') || statusLower.includes('diseño') || statusLower.includes('proyecto')) {
            return 'bg-yellow-600';
        } else if (statusLower.includes('pausado') || statusLower.includes('suspendido')) {
            return 'bg-red-600';
        }
        
        return 'bg-gray-600';
    }

    // Renderizar detalles del proyecto
    renderProjectDetail() {
        const project = this.currentProject;
        
        // Actualizar título de la página
        document.title = `${project.title} - AZA Constructora`;
        
        // Hero section
        const heroImage = document.getElementById('project-hero-image');
        heroImage.innerHTML = `<img src="${project.imageUrl}" alt="${project.imageAlt}" class="w-full h-full object-cover">`;
        
        document.getElementById('project-category').textContent = project.categoryLabel;
        document.getElementById('project-status').textContent = project.status;
        document.getElementById('project-status').className = `ml-2 px-3 py-1 rounded text-sm font-medium text-white ${this.getStatusColorClass(project.status)}`;
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-location').textContent = `📍 ${project.location} • 📅 ${project.year}`;
        
        // Descripción principal
        document.getElementById('project-description').innerHTML = project.detailedDescription || project.description;
        
        // Características destacadas
        if (project.features && project.features.length > 0) {
            const featuresList = document.getElementById('features-list');
            featuresList.innerHTML = project.features.map(feature => 
                `<li class="flex items-start"><span class="text-accent-gold mr-2">✓</span>${feature}</li>`
            ).join('');
        } else {
            document.getElementById('project-features').classList.add('hidden');
        }
        
        // Información técnica
        document.getElementById('detail-location').textContent = project.location;
        document.getElementById('detail-year').textContent = project.year;
        document.getElementById('detail-status').textContent = project.status;
        
        // Información adicional opcional
        if (project.area) {
            document.getElementById('detail-area').classList.remove('hidden');
            document.getElementById('detail-area-value').textContent = project.area;
        }
        
        if (project.duration) {
            document.getElementById('detail-duration').classList.remove('hidden');
            document.getElementById('detail-duration-value').textContent = project.duration;
        }
        
        if (project.client) {
            document.getElementById('detail-client').classList.remove('hidden');
            document.getElementById('detail-client-value').textContent = project.client;
        }
        
        // Galería de imágenes
        if (project.gallery && project.gallery.length > 0) {
            this.renderGallery(project.gallery);
        }
        
        // Especificaciones técnicas
        if (project.specifications && Object.keys(project.specifications).length > 0) {
            this.renderSpecifications(project.specifications);
        }
        
        // Proyectos relacionados
        this.renderRelatedProjects();
        
        this.showMainContent();
    }

    // Renderizar galería
    renderGallery(gallery) {
        const gallerySection = document.getElementById('project-gallery');
        const galleryGrid = document.getElementById('gallery-grid');
        
        const galleryHTML = gallery.map((image, index) => `
            <div class="group cursor-pointer" onclick="openImageModal('${image.url}', '${image.alt}')">
                <img src="${image.url}" alt="${image.alt}" 
                     class="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300">
                <p class="text-gray-400 text-sm mt-2">${image.caption || ''}</p>
            </div>
        `).join('');
        
        galleryGrid.innerHTML = galleryHTML;
        gallerySection.classList.remove('hidden');
    }

    // Renderizar especificaciones
    renderSpecifications(specs) {
        const specsSection = document.getElementById('project-specs');
        const specsContent = document.getElementById('specs-content');
        
        const specsHTML = Object.entries(specs).map(([key, value]) => `
            <div>
                <h4 class="text-lg font-semibold text-white mb-2">${key}</h4>
                <p class="text-gray-300">${value}</p>
            </div>
        `).join('');
        
        specsContent.innerHTML = specsHTML;
        specsSection.classList.remove('hidden');
    }

    // Renderizar proyectos relacionados
    renderRelatedProjects() {
        const relatedContainer = document.getElementById('related-projects');
        
        // Filtrar proyectos de la misma categoría, excluyendo el actual
        const relatedProjects = this.allProjects
            .filter(p => p.category === this.currentProject.category && p.title !== this.currentProject.title)
            .slice(0, 3);
        
        if (relatedProjects.length === 0) {
            // Si no hay proyectos de la misma categoría, mostrar proyectos aleatorios
            const otherProjects = this.allProjects
                .filter(p => p.title !== this.currentProject.title)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            relatedProjects.push(...otherProjects);
        }
        
        const relatedHTML = relatedProjects.map(project => `
            <a href="proyecto-detalle?id=${project.id || encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}&category=${project.category}" class="block">
                <div class="bg-gray-800/50 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                    <div class="relative overflow-hidden">
                        <img src="${project.imageUrl}" alt="${project.imageAlt}" 
                             class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div class="p-4">
                        <h4 class="text-lg font-bold text-white mb-2">${project.title}</h4>
                        <p class="text-gray-400 text-sm mb-3">${project.description.substring(0, 100)}...</p>
                    </div>
                </div>
            </a>
        `).join('');
        
        relatedContainer.innerHTML = relatedHTML;
    }

    // Inicializar con datos de proyectos
    initialize(projects) {
        console.log('=== INITIALIZE PROJECT DETAIL MANAGER ===');
        console.log('Proyectos recibidos:', projects);
        console.log('Número de proyectos:', projects ? projects.length : 0);
        
        this.allProjects = projects || [];
        console.log('Proyectos asignados a allProjects:', this.allProjects.length);
        
        this.loadProjectData();
    }
}

// Modal para imágenes de galería
function openImageModal(imageUrl, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="relative max-w-4xl max-h-full">
            <img src="${imageUrl}" alt="${imageAlt}" class="max-w-full max-h-full object-contain">
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Instancia global del manager
const projectDetailManager = new ProjectDetailManager();

// Función de inicialización
function initializeProjectDetail() {
    // Verificar si tenemos acceso a los proyectos desde projects.js
    if (typeof projectManager !== 'undefined' && projectManager.projects && projectManager.projects.length > 0) {
        console.log('Proyectos encontrados:', projectManager.projects.length);
        projectDetailManager.initialize(projectManager.projects);
    } else if (typeof projectManager !== 'undefined') {
        // Si projectManager existe pero no tiene proyectos, inicializar proyectos primero
        console.log('ProjectManager existe pero sin proyectos, inicializando...');
        if (typeof initializeProjects === 'function') {
            initializeProjects();
        }
        // Esperar un momento para que se carguen los proyectos
        setTimeout(() => {
            if (projectManager.projects && projectManager.projects.length > 0) {
                console.log('Proyectos cargados después de inicialización:', projectManager.projects.length);
                projectDetailManager.initialize(projectManager.projects);
            } else {
                console.error('No se pudieron cargar los proyectos');
                projectDetailManager.showError();
            }
        }, 100);
    } else {
        console.error('ProjectManager no está disponible');
        projectDetailManager.showError();
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ProjectDetailManager = ProjectDetailManager;
    window.projectDetailManager = projectDetailManager;
    window.initializeProjectDetail = initializeProjectDetail;
    window.openImageModal = openImageModal;
}
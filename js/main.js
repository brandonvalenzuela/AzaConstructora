// Cargar el header dinámicamente
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        // Reinicializar eventos del menú móvil después de cargar el header
        initializeMobileMenu();
        // Configurar el efecto de scroll del header después de cargarlo
        setupHeaderScrollEffect();
    });

// Cargar el footer dinámicamente
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

// Función para inicializar el menú móvil
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('is-open');
        });
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
        });
        // Ocultar menú al hacer clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
            });
        });
    }
}

// Función para configurar el efecto de scroll del header
function setupHeaderScrollEffect() {
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Animación "fade-in-section" al hacer scroll
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para que la animación ocurra solo una vez
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px' // Detecta elementos un poco antes de que entren en la vista
    });

    // Verificar elementos visibles al cargar la página
    function checkInitialVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Si la sección está visible en la ventana al cargar
            if (rect.top < window.innerHeight) {
                section.classList.add('is-visible');
                observer.unobserve(section); // No necesitamos observar más este elemento
            } else {
                observer.observe(section);
            }
        });
    }

    // Ejecutar inmediatamente después de cargar
    checkInitialVisibility();
    
    // Los formularios ahora son manejados automáticamente por ContactHandler
});

// Los botones de llamada ahora son manejados automáticamente por ContactHandler

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    // Colores según el tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }
    
    notification.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Función genérica para crear tarjetas de proyectos
function createProjectCard(projectData) {
    const {
        category,
        imageUrl,
        imageAlt,
        categoryLabel,
        title,
        description,
        location,
        year
    } = projectData;

    return `
        <div class="project-card" data-category="${category}">
            <div class="bg-gray-800/50 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                <div class="relative overflow-hidden">
                    <img src="${imageUrl}" 
                         alt="${imageAlt}" 
                         class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="absolute top-4 left-4">
                        <span class="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">${categoryLabel}</span>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-white mb-2">${title}</h3>
                    <p class="text-gray-300 mb-4 text-sm leading-relaxed">
                        ${description}
                    </p>
                    <div class="flex justify-between items-center text-sm text-gray-400">
                        <span>📍 ${location}</span>
                        <span>📅 ${year}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar múltiples proyectos
function renderProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }

    const projectsHTML = projects.map(project => createProjectCard(project)).join('');
    container.innerHTML = projectsHTML;
}

// Datos de ejemplo para proyectos
const projectsData = [
    {
        category: 'obra-civil',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Construcción de carretera',
        categoryLabel: 'Obra Civil',
        title: 'Construcción de Carretera Estatal',
        description: 'Proyecto de pavimentación y construcción de 15 km de carretera estatal, incluyendo señalización y sistemas de drenaje.',
        location: 'Hermosillo, Sonora',
        year: '2023'
    },
    {
        category: 'edificacion',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Edificio comercial',
        categoryLabel: 'Edificación',
        title: 'Centro Comercial Plaza Norte',
        description: 'Construcción de centro comercial de 3 niveles con 50 locales comerciales y estacionamiento subterráneo.',
        location: 'Tijuana, Baja California',
        year: '2024'
    },
    {
        category: 'infraestructura',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1170&auto=format&fit=crop',
        imageAlt: 'Puente vehicular',
        categoryLabel: 'Infraestructura',
        title: 'Puente Vehicular Los Pinos',
        description: 'Construcción de puente vehicular de 200 metros de longitud sobre río principal de la ciudad.',
        location: 'Guadalajara, Jalisco',
        year: '2023'
    }
];
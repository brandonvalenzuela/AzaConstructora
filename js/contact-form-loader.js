/**
 * Contact Form Loader
 * Carga dinámicamente el componente de formulario de contacto reutilizable
 */

class ContactFormLoader {
    constructor() {
        this.formLoaded = false;
    }

    /**
     * Carga el formulario de contacto en el contenedor especificado
     * @param {string} containerId - ID del contenedor donde cargar el formulario
     * @param {string} formId - ID personalizado para el formulario (opcional)
     */
    async loadForm(containerId, formId = null) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Contenedor con ID '${containerId}' no encontrado`);
                return false;
            }

            // Cargar el HTML del formulario
            const response = await fetch('./contact-form.html');
            if (!response.ok) {
                throw new Error(`Error al cargar el formulario: ${response.status}`);
            }

            const formHTML = await response.text();
            container.innerHTML = formHTML;

            // Personalizar el ID del formulario si se proporciona
            if (formId) {
                const form = container.querySelector('#contact-form');
                if (form) {
                    form.id = formId;
                }
            }

            this.formLoaded = true;
            console.log('Formulario de contacto cargado exitosamente');
            return true;
        } catch (error) {
            console.error('Error al cargar el formulario de contacto:', error);
            return false;
        }
    }

    /**
     * Inicializa el formulario después de cargarlo
     * @param {string} formId - ID del formulario a inicializar
     */
    initializeForm(formId = 'contact-form') {
        if (!this.formLoaded) {
            console.warn('El formulario debe ser cargado antes de inicializarlo');
            return;
        }

        const form = document.getElementById(formId);
        if (!form) {
            console.error(`Formulario con ID '${formId}' no encontrado`);
            return;
        }

        // Establecer el timestamp actual en el campo oculto
        const timeField = form.querySelector('input[name="time"]');
        if (timeField) {
            timeField.value = new Date().toISOString();
        }

        // Verificar que el manejador de contacto esté disponible
        if (typeof window.ContactHandler !== 'undefined') {
            // Inicializar el manejador de contacto para este formulario
            window.ContactHandler.init(formId);
            console.log(`Formulario '${formId}' inicializado con ContactHandler`);
        } else {
            console.warn('ContactHandler no está disponible. Asegúrate de incluir contact-handler.js');
        }
    }

    /**
     * Carga e inicializa el formulario en un solo paso
     * @param {string} containerId - ID del contenedor donde cargar el formulario
     * @param {string} formId - ID personalizado para el formulario (opcional)
     */
    async loadAndInitialize(containerId, formId = null) {
        const loaded = await this.loadForm(containerId, formId);
        if (loaded) {
            // Esperar un momento para que el DOM se actualice
            setTimeout(() => {
                this.initializeForm(formId || 'contact-form');
            }, 100);
        }
        return loaded;
    }
}

// Crear instancia global
window.ContactFormLoader = new ContactFormLoader();

// Función de conveniencia para uso directo
window.loadContactForm = async function(containerId, formId = null) {
    return await window.ContactFormLoader.loadAndInitialize(containerId, formId);
};

// Auto-inicialización si hay un contenedor con ID 'contact-form-container'
document.addEventListener('DOMContentLoaded', async function() {
    const autoContainer = document.getElementById('contact-form-container');
    if (autoContainer) {
        await window.ContactFormLoader.loadAndInitialize('contact-form-container');
    }
});
/**
 * Contact Handler - EmailJS Integration
 * Maneja todos los formularios de contacto del sitio web
 */
class ContactHandler {
    constructor() {
        // Configuracion de EmailJS desde config.js
        const env = window.APP_CONFIG?.emailjs;
        if (!env) {
            console.error('⚠️ Configuración de EmailJS no encontrada. Asegúrate de incluir config.js');
            return;
        }
        
        this.serviceId = env.serviceId || env.EMAILJS_SERVICE_ID;
        this.templateId = env.templateId || env.EMAILJS_TEMPLATE_ID;
        this.publicKey = env.publicKey || env.EMAILJS_PUBLIC_KEY;
        this.initializedForms = new Set();
        this.init();
    }

    // Método estático para inicializar formularios específicos
    static init(formId) {
        if (window.contactHandler) {
            window.contactHandler.initializeSpecificForm(formId);
        }
    }

    init() {
        // Inicializar EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
            console.log('EmailJS inicializado correctamente');
        } else {
            console.error('EmailJS no esta disponible. Asegurate de incluir la libreria EmailJS');
            return;
        }

        // Configurar event listeners cuando el DOM este listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Formulario reutilizable (contacto.html y otros)
        const reusableForm = document.getElementById('contact-form');
        if (reusableForm && !this.initializedForms.has('contact-form')) {
            reusableForm.addEventListener('submit', (e) => this.handleReusableContactFormSubmit(e));
            this.initializedForms.add('contact-form');
        }

        // Formulario de la pagina principal (index.html)
        const homeForm = document.getElementById('contact-form-home');
        if (homeForm && !this.initializedForms.has('contact-form-home')) {
            homeForm.addEventListener('submit', (e) => this.handleHomeContactFormSubmit(e));
            this.initializedForms.add('contact-form-home');
        }

        // Formulario de contacto principal
        const contactForm = document.getElementById('contact-form-page');
        if (contactForm && !this.initializedForms.has('contact-form-page')) {
            contactForm.addEventListener('submit', (e) => this.handleContactFormSubmit(e));
            this.initializedForms.add('contact-form-page');
        }

        // Boton de solicitud de llamada
        const callButton = document.getElementById('call-request-btn');
        if (callButton) {
            callButton.addEventListener('click', (e) => this.handleCallRequest(e));
        }
    }

    initializeSpecificForm(formId) {
        // Inicializar un formulario específico por ID
        const form = document.getElementById(formId);
        if (form && !this.initializedForms.has(formId)) {
            form.addEventListener('submit', (e) => this.handleReusableContactFormSubmit(e));
            this.initializedForms.add(formId);
            console.log(`Formulario '${formId}' inicializado con ContactHandler`);
        }
    }

    addTimestamp(form) {
        let timeField = form.querySelector('input[name="time"]');
        if (!timeField) {
            timeField = document.createElement('input');
            timeField.type = 'hidden';
            timeField.name = 'time';
            form.appendChild(timeField);
        }
        timeField.value = new Date().toISOString();
    }

    handleReusableContactFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Agregar timestamp
        this.addTimestamp(form);
        
        // Preparar datos del formulario
        const formData = new FormData(form);
        const templateParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            project: formData.get('project'),
            message: formData.get('message'),
            time: formData.get('time')
        };
        
        this.setButtonLoading(submitButton, 'Enviando...');
        
        emailjs.send(this.serviceId, this.templateId, templateParams)
            .then((response) => {
                console.log('Email enviado exitosamente:', response.status, response.text);
                this.showNotification('Mensaje Enviado!', 'Gracias por contactarnos. Te responderemos pronto.', 'success');
                form.reset();
            })
            .catch((error) => {
                console.error('Error al enviar email:', error);
                this.showNotification('Error', 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.', 'error');
            })
            .finally(() => {
                this.resetButton(submitButton, originalText);
            });
    }

    handleHomeContactFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Agregar timestamp
        this.addTimestamp(form);
        
        // Preparar datos del formulario
        const formData = new FormData(form);
        const templateParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            project: formData.get('project'),
            message: formData.get('message'),
            time: formData.get('time')
        };
        
        this.setButtonLoading(submitButton, 'Enviando...');
        
        emailjs.send(this.serviceId, this.templateId, templateParams)
            .then((response) => {
                console.log('Email enviado exitosamente:', response.status, response.text);
                this.showNotification('Mensaje Enviado!', 'Gracias por contactarnos. Te responderemos pronto.', 'success');
                form.reset();
            })
            .catch((error) => {
                console.error('Error al enviar email:', error);
                this.showNotification('Error', 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.', 'error');
            })
            .finally(() => {
                this.resetButton(submitButton, originalText);
            });
    }

    handleContactFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Agregar timestamp
        this.addTimestamp(form);
        
        // Preparar datos del formulario
        const formData = new FormData(form);
        const templateParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            project: formData.get('project'),
            message: formData.get('message'),
            time: formData.get('time')
        };
        
        this.setButtonLoading(submitButton, 'Enviando...');
        
        emailjs.send(this.serviceId, this.templateId, templateParams)
            .then((response) => {
                console.log('Email enviado exitosamente:', response.status, response.text);
                this.showNotification('Mensaje Enviado!', 'Gracias por contactarnos. Te responderemos pronto.', 'success');
                form.reset();
            })
            .catch((error) => {
                console.error('Error al enviar email:', error);
                this.showNotification('Error', 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.', 'error');
            })
            .finally(() => {
                this.resetButton(submitButton, originalText);
            });
    }

    handleCallRequest(e) {
        e.preventDefault();
        
        const button = e.target;
        const originalText = button.textContent;
        
        // Crear formulario temporal con datos de solicitud de llamada
        const templateParams = {
            name: 'Solicitud de Llamada',
            email: 'cliente@ejemplo.com',
            phone: 'Por definir',
            project: 'Solicitud de Llamada',
            message: 'El cliente ha solicitado que lo contactemos por telefono.',
            time: new Date().toISOString()
        };
        
        this.setButtonLoading(button, 'Enviando...');
        
        emailjs.send(this.serviceId, this.templateId, templateParams)
            .then((response) => {
                console.log('Solicitud de llamada enviada:', response.status, response.text);
                this.showNotification('Solicitud Enviada!', 'Nos pondremos en contacto contigo pronto.', 'success');
            })
            .catch((error) => {
                console.error('Error al enviar solicitud:', error);
                this.showNotification('Error', 'Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente.', 'error');
            })
            .finally(() => {
                this.resetButton(button, originalText);
            });
    }

    setButtonLoading(button, loadingText) {
        button.disabled = true;
        button.textContent = loadingText;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    }

    resetButton(button, originalText) {
        button.disabled = false;
        button.textContent = originalText;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }

    showNotification(title, message, type) {
        // Crear estilos CSS dinámicamente si no existen
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    pointer-events: none;
                }
                
                .modern-notification {
                    pointer-events: auto;
                    margin-bottom: 12px;
                    animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .modern-notification.removing {
                    animation: slideOutRight 0.3s ease-in-out forwards;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Crear o obtener contenedor de notificaciones
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        // Configuración de tipos de notificación
        const notificationConfig = {
            success: {
                icon: '✓',
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                shadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
            },
            error: {
                icon: '✕',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                shadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
            },
            warning: {
                icon: '⚠',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                shadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
            },
            info: {
                icon: 'ℹ',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                shadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
            }
        };
        
        const config = notificationConfig[type] || notificationConfig.info;
        
        // Crear elemento de notificación moderna
        const notification = document.createElement('div');
        notification.className = 'modern-notification';
        notification.innerHTML = `
            <div style="
                background: ${config.gradient};
                color: white;
                padding: 20px;
                border-radius: 16px;
                box-shadow: ${config.shadow};
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 420px;
                min-width: 320px;
                position: relative;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <!-- Efecto de brillo -->
                <div style="
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 2s infinite;
                "></div>
                
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <!-- Icono -->
                    <div style="
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        font-weight: bold;
                        flex-shrink: 0;
                        animation: pulse 2s infinite;
                    ">${config.icon}</div>
                    
                    <!-- Contenido -->
                    <div style="flex: 1; min-width: 0;">
                        <h4 style="
                            margin: 0 0 8px 0;
                            font-size: 16px;
                            font-weight: 600;
                            line-height: 1.2;
                            color: white;
                        ">${title}</h4>
                        <p style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.4;
                            color: rgba(255, 255, 255, 0.9);
                            word-wrap: break-word;
                        ">${message}</p>
                    </div>
                    
                    <!-- Botón de cierre -->
                    <button class="notification-close" style="
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        border-radius: 50%;
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: bold;
                        transition: all 0.2s ease;
                        flex-shrink: 0;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1)'">&times;</button>
                </div>
                
                <!-- Barra de progreso -->
                <div style="
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    width: 100%;
                    overflow: hidden;
                ">
                    <div class="progress-bar" style="
                        height: 100%;
                        background: rgba(255, 255, 255, 0.8);
                        width: 100%;
                        animation: progressBar 5s linear forwards;
                    "></div>
                </div>
            </div>
        `;
        
        // Agregar animación de barra de progreso
        if (!document.getElementById('progress-animation')) {
            const progressStyle = document.createElement('style');
            progressStyle.id = 'progress-animation';
            progressStyle.textContent = `
                @keyframes progressBar {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            `;
            document.head.appendChild(progressStyle);
        }
        
        // Agregar al contenedor
        container.appendChild(notification);
        
        // Configurar cierre manual
        const closeBtn = notification.querySelector('.notification-close');
        const removeNotification = () => {
            notification.classList.add('removing');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
                // Remover contenedor si está vacío
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', removeNotification);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(removeNotification, 5000);
        
        // Hacer clic en la notificación para cerrar (opcional)
        notification.addEventListener('click', (e) => {
            if (e.target !== closeBtn) {
                removeNotification();
            }
        });
    }
}

// Exponer la clase ContactHandler globalmente
window.ContactHandler = ContactHandler;

// Inicializar el manejador de contacto
const contactHandler = new ContactHandler();
window.contactHandler = contactHandler;
/**
 * Validation and Error Handler
 * Sistema robusto de validaciones y manejo de errores
 */
class ValidationHandler {
    constructor() {
        this.validators = new Map();
        this.errorMessages = new Map();
        this.setupDefaultValidators();
        this.setupDefaultErrorMessages();
        
        console.log('🔧 ValidationHandler inicializado');
    }
    
    // Configurar validadores por defecto
    setupDefaultValidators() {
        // Validador de email
        this.validators.set('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        });
        
        // Validador de teléfono mexicano
        this.validators.set('phone', (value) => {
            if (!value) return true; // Teléfono es opcional
            const phoneRegex = /^(\+52\s?)?(\d{3}\s?\d{3}\s?\d{4}|\d{2}\s?\d{4}\s?\d{4}|\d{10})$/;
            return phoneRegex.test(value.replace(/[\s()-]/g, ''));
        });
        
        // Validador de nombre
        this.validators.set('name', (value) => {
            if (!value || value.trim().length < 2) return false;
            if (value.trim().length > 100) return false;
            const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            return nameRegex.test(value.trim());
        });
        
        // Validador de mensaje
        this.validators.set('message', (value) => {
            if (!value || value.trim().length < 10) return false;
            if (value.trim().length > 1000) return false;
            return true;
        });
        
        // Validador de proyecto
        this.validators.set('project', (value) => {
            const validProjects = [
                'Obra Civil', 'Demolición', 'Movimiento de Tierras', 
                'Industrial', 'Edificacion', 'Infraestructura', 
                'Supervisión', 'Mantenimiento', 'other'
            ];
            return !value || validProjects.includes(value);
        });
        
        // Validador de URL
        this.validators.set('url', (value) => {
            if (!value) return true;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        });
        
        // Validador de longitud mínima
        this.validators.set('minLength', (value, minLength = 1) => {
            return value && value.trim().length >= minLength;
        });
        
        // Validador de longitud máxima
        this.validators.set('maxLength', (value, maxLength = 255) => {
            return !value || value.trim().length <= maxLength;
        });
    }
    
    // Configurar mensajes de error por defecto
    setupDefaultErrorMessages() {
        this.errorMessages.set('email', 'Por favor, ingresa un email válido');
        this.errorMessages.set('phone', 'Por favor, ingresa un teléfono válido (formato mexicano)');
        this.errorMessages.set('name', 'El nombre debe tener entre 2 y 100 caracteres y solo contener letras');
        this.errorMessages.set('message', 'El mensaje debe tener entre 10 y 1000 caracteres');
        this.errorMessages.set('project', 'Por favor, selecciona un tipo de proyecto válido');
        this.errorMessages.set('url', 'Por favor, ingresa una URL válida');
        this.errorMessages.set('required', 'Este campo es obligatorio');
        this.errorMessages.set('minLength', 'Este campo es demasiado corto');
        this.errorMessages.set('maxLength', 'Este campo es demasiado largo');
        this.errorMessages.set('generic', 'Por favor, verifica este campo');
    }
    
    // Validar un campo individual
    validateField(fieldName, value, rules = []) {
        const errors = [];
        
        // Si el campo es requerido y está vacío
        if (rules.includes('required') && (!value || value.trim() === '')) {
            errors.push(this.errorMessages.get('required'));
            return { valid: false, errors };
        }
        
        // Si el campo está vacío pero no es requerido, es válido
        if (!value || value.trim() === '') {
            return { valid: true, errors: [] };
        }
        
        // Aplicar validadores específicos
        for (const rule of rules) {
            if (rule === 'required') continue; // Ya se validó arriba
            
            let isValid = true;
            let errorMessage = this.errorMessages.get(rule) || this.errorMessages.get('generic');
            
            if (this.validators.has(rule)) {
                isValid = this.validators.get(rule)(value);
            } else if (rule.startsWith('minLength:')) {
                const minLength = parseInt(rule.split(':')[1]);
                isValid = this.validators.get('minLength')(value, minLength);
                errorMessage = `Debe tener al menos ${minLength} caracteres`;
            } else if (rule.startsWith('maxLength:')) {
                const maxLength = parseInt(rule.split(':')[1]);
                isValid = this.validators.get('maxLength')(value, maxLength);
                errorMessage = `No puede tener más de ${maxLength} caracteres`;
            }
            
            if (!isValid) {
                errors.push(errorMessage);
            }
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    }
    
    // Validar un formulario completo
    validateForm(formElement) {
        const results = {
            valid: true,
            errors: {},
            fieldCount: 0,
            validFields: 0
        };
        
        // Definir reglas de validación por campo
        const fieldRules = {
            'name': ['required', 'name'],
            'email': ['required', 'email'],
            'phone': ['phone'],
            'project': ['project'],
            'message': ['required', 'message']
        };
        
        // Validar cada campo
        const formData = new FormData(formElement);
        
        for (const [fieldName, rules] of Object.entries(fieldRules)) {
            const value = formData.get(fieldName);
            const validation = this.validateField(fieldName, value, rules);
            
            results.fieldCount++;
            
            if (validation.valid) {
                results.validFields++;
            } else {
                results.valid = false;
                results.errors[fieldName] = validation.errors;
            }
        }
        
        return results;
    }
    
    // Mostrar errores en el formulario
    displayFormErrors(formElement, validationResults) {
        // Limpiar errores previos
        this.clearFormErrors(formElement);
        
        if (validationResults.valid) {
            return;
        }
        
        // Mostrar errores por campo
        for (const [fieldName, errors] of Object.entries(validationResults.errors)) {
            const field = formElement.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldError(field, errors[0]); // Mostrar solo el primer error
            }
        }
    }
    
    // Mostrar error en un campo específico
    showFieldError(fieldElement, errorMessage) {
        // Agregar clase de error al campo
        fieldElement.classList.add('error', 'border-red-500');
        fieldElement.classList.remove('border-gray-300');
        
        // Crear o actualizar mensaje de error
        let errorElement = fieldElement.parentNode.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            fieldElement.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }
    
    // Limpiar errores del formulario
    clearFormErrors(formElement) {
        // Remover clases de error
        formElement.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error', 'border-red-500');
            field.classList.add('border-gray-300');
        });
        
        // Remover mensajes de error
        formElement.querySelectorAll('.error-message').forEach(errorElement => {
            errorElement.remove();
        });
    }
    
    // Limpiar error de un campo específico
    clearFieldError(fieldElement) {
        fieldElement.classList.remove('error', 'border-red-500');
        fieldElement.classList.add('border-gray-300');
        
        const errorElement = fieldElement.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Validación en tiempo real
    setupRealTimeValidation(formElement) {
        const fieldRules = {
            'name': ['required', 'name'],
            'email': ['required', 'email'],
            'phone': ['phone'],
            'project': ['project'],
            'message': ['required', 'message']
        };
        
        for (const [fieldName, rules] of Object.entries(fieldRules)) {
            const field = formElement.querySelector(`[name="${fieldName}"]`);
            if (field) {
                // Validar al perder el foco
                field.addEventListener('blur', () => {
                    const validation = this.validateField(fieldName, field.value, rules);
                    
                    if (validation.valid) {
                        this.clearFieldError(field);
                    } else {
                        this.showFieldError(field, validation.errors[0]);
                    }
                });
                
                // Limpiar error al escribir
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        this.clearFieldError(field);
                    }
                });
            }
        }
    }
    
    // Sanitizar datos de entrada
    sanitizeInput(value, type = 'text') {
        if (!value) return '';
        
        let sanitized = value.toString().trim();
        
        switch (type) {
            case 'email':
                sanitized = sanitized.toLowerCase();
                break;
            case 'phone':
                // Mantener solo números, espacios, paréntesis y guiones
                sanitized = sanitized.replace(/[^\d\s()+-]/g, '');
                break;
            case 'name':
                // Capitalizar primera letra de cada palabra
                sanitized = sanitized.replace(/\b\w/g, l => l.toUpperCase());
                break;
            case 'text':
            case 'message':
                // Remover caracteres peligrosos para XSS
                sanitized = sanitized
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/\//g, '&#x2F;');
                break;
        }
        
        return sanitized;
    }
    
    // Sanitizar datos de formulario
    sanitizeFormData(formData) {
        const sanitized = {};
        
        const fieldTypes = {
            'name': 'name',
            'email': 'email',
            'phone': 'phone',
            'project': 'text',
            'message': 'message'
        };
        
        for (const [key, value] of formData.entries()) {
            const type = fieldTypes[key] || 'text';
            sanitized[key] = this.sanitizeInput(value, type);
        }
        
        return sanitized;
    }
    
    // Manejar errores de red/API
    handleApiError(error, context = 'operación') {
        console.error(`❌ Error en ${context}:`, error);
        
        let userMessage = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        
        if (error.message) {
            if (error.message.includes('network') || error.message.includes('fetch')) {
                userMessage = 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.';
            } else if (error.message.includes('timeout')) {
                userMessage = 'La operación tardó demasiado. Por favor, intenta nuevamente.';
            } else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
                userMessage = 'No tienes permisos para realizar esta acción.';
            }
        }
        
        return {
            success: false,
            error: error.message || 'Error desconocido',
            userMessage,
            timestamp: new Date().toISOString()
        };
    }
    
    // Registrar errores para debugging
    logError(error, context = 'general', additionalData = {}) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            context,
            error: {
                message: error.message || 'Error desconocido',
                stack: error.stack,
                name: error.name
            },
            url: window.location.href,
            userAgent: navigator.userAgent,
            additionalData
        };
        
        console.error('🚨 Error registrado:', errorLog);
        
        // En producción, aquí podrías enviar el error a un servicio de logging
        // como Sentry, LogRocket, etc.
        
        return errorLog;
    }
    
    // Agregar validador personalizado
    addValidator(name, validatorFunction, errorMessage) {
        this.validators.set(name, validatorFunction);
        if (errorMessage) {
            this.errorMessages.set(name, errorMessage);
        }
    }
    
    // Obtener estadísticas de validación
    getValidationStats() {
        return {
            totalValidators: this.validators.size,
            totalErrorMessages: this.errorMessages.size,
            availableValidators: Array.from(this.validators.keys()),
            availableErrorMessages: Array.from(this.errorMessages.keys())
        };
    }
}

// Exponer la clase globalmente
window.ValidationHandler = ValidationHandler;

// Crear instancia global
const validationHandler = new ValidationHandler();
window.validationHandler = validationHandler;

// Función de utilidad para validar formularios
function validateAndSubmitForm(formElement, submitCallback) {
    const validation = validationHandler.validateForm(formElement);
    
    if (validation.valid) {
        const formData = new FormData(formElement);
        const sanitizedData = validationHandler.sanitizeFormData(formData);
        return submitCallback(sanitizedData);
    } else {
        validationHandler.displayFormErrors(formElement, validation);
        return Promise.resolve({ success: false, error: 'Formulario inválido' });
    }
}

// Exponer funciones de utilidad
window.validateAndSubmitForm = validateAndSubmitForm;

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ValidationHandler, validationHandler, validateAndSubmitForm };
}
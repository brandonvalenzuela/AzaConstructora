document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar el footer
    function loadFooter() {
        fetch('/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el footer');
                }
                return response.text();
            })
            .then(html => {
                // Buscar el elemento footer existente y reemplazarlo
                const existingFooter = document.querySelector('footer');
                if (existingFooter) {
                    // Crear un contenedor temporal para el nuevo footer
                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = html;
                    
                    // Reemplazar el footer existente con el nuevo
                    existingFooter.parentNode.replaceChild(tempContainer.firstElementChild, existingFooter);
                } else {
                    // Si no hay footer, añadirlo al final del body
                    document.body.insertAdjacentHTML('beforeend', html);
                }
            })
            .catch(error => {
                console.error('Error al cargar el footer:', error);
            });
    }

    // Cargar el footer
    loadFooter();
});
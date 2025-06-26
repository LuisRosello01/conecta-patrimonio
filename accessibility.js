// Funcionalidad de accesibilidad para alternar entre lectura fácil y audiodescripción
document.addEventListener('DOMContentLoaded', function() {
    const lecturaFacilBtn = document.getElementById('lectura-facil');
    const audiodescripcionBtn = document.getElementById('audiodescripcion');
    
    // Solo ejecutar si existen los botones en la página
    if (!lecturaFacilBtn || !audiodescripcionBtn) {
        return;
    }
    
    // Función para mostrar solo lectura fácil
    function showLecturaFacil() {
        // Activar botón y desactivar el otro
        lecturaFacilBtn.classList.add('active');
        audiodescripcionBtn.classList.remove('active');
        lecturaFacilBtn.setAttribute('aria-pressed', 'true');
        audiodescripcionBtn.setAttribute('aria-pressed', 'false');
        
        // Mostrar sección de descripción de texto
        const descriptionSection = document.querySelector('.description-section');
        if (descriptionSection) {
            descriptionSection.style.display = 'block';
            descriptionSection.setAttribute('aria-hidden', 'false');
        }
        
        // Ocultar secciones multimedia
        const mediaSections = document.querySelectorAll('.media-section, .audio-section');
        mediaSections.forEach(section => {
            section.style.display = 'none';
            section.setAttribute('aria-hidden', 'true');
        });
        
        // Anunciar el cambio para lectores de pantalla
        announceChange('Mostrando contenido en lectura fácil');
    }
    
    // Función para mostrar solo audiodescripción (solo video principal)
    function showAudiodescripcion() {
        // Activar botón y desactivar el otro
        audiodescripcionBtn.classList.add('active');
        lecturaFacilBtn.classList.remove('active');
        audiodescripcionBtn.setAttribute('aria-pressed', 'true');
        lecturaFacilBtn.setAttribute('aria-pressed', 'false');
        
        // Ocultar sección de descripción de texto
        const descriptionSection = document.querySelector('.description-section');
        if (descriptionSection) {
            descriptionSection.style.display = 'none';
            descriptionSection.setAttribute('aria-hidden', 'true');
        }
        
        // Mostrar solo la sección de video (primera sección multimedia)
        const videoSection = document.querySelector('.media-section');
        const audioSection = document.querySelector('.audio-section');
        
        if (videoSection) {
            videoSection.style.display = 'block';
            videoSection.setAttribute('aria-hidden', 'false');
        }
        
        // Ocultar sección de audio si existe
        if (audioSection) {
            audioSection.style.display = 'none';
            audioSection.setAttribute('aria-hidden', 'true');
        }
        
        // Enfocar al video
        const videoElement = document.querySelector('.media-section video');
        if (videoElement) {
            // Dar un momento para que se muestre antes de enfocar
            setTimeout(() => {
                videoElement.focus();
            }, 100);
        }
        
        // Anunciar el cambio para lectores de pantalla
        announceChange('Mostrando video con audiodescripción');
    }
    
    // Función para anunciar cambios a lectores de pantalla
    function announceChange(message) {
        // Crear elemento temporal para anuncio
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        // Limpiar el anuncio después de un momento
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Event listeners
    lecturaFacilBtn.addEventListener('click', showLecturaFacil);
    audiodescripcionBtn.addEventListener('click', showAudiodescripcion);
    
    // Manejar teclas para accesibilidad del teclado
    lecturaFacilBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showLecturaFacil();
        }
    });
    
    audiodescripcionBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showAudiodescripcion();
        }
    });
    
    // Inicializar en modo lectura fácil
    showLecturaFacil();
});

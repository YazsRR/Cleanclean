document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    toggleButton.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Cambia el ícono (opcional)
        const isOpen = mainNav.classList.contains('active');
        toggleButton.textContent = isOpen ? '✕' : '☰';
    });
});
// ===== CARRUSEL AUTOMÁTICO (NUEVO) =====
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.products-carousel-container');
    const carousel = document.querySelector('.products-carousel');
    const products = document.querySelectorAll('.product-card');
    const productWidth = 250 + 24; // Ancho de tarjeta + gap (ajusta según tu CSS)
    let currentIndex = 0;
    let isTransitioning = false;

    // Clona los primeros productos y añádelos al final
    const originalProducts = Array.from(products).slice(0, 7); // Copia los primeros 7
    originalProducts.forEach(product => {
        carousel.appendChild(product.cloneNode(true));
    });

    // Mueve el carrusel con efecto infinito
    const moveCarousel = () => {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex++;
        
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${-currentIndex * productWidth}px)`;
    };

    // Reinicio invisible cuando llega al final
    carousel.addEventListener('transitionend', () => {
        if (currentIndex >= products.length) {
            currentIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0)`;
            // Fuerza un reflow para aplicar el cambio sin animación
            void carousel.offsetWidth;
        }
        isTransitioning = false;
    });

    // Auto-scroll cada 3 segundos
    let autoScrollInterval = setInterval(moveCarousel, 3000);

    // Pausa al interactuar
    container.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    container.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(moveCarousel, 3000);
    });
});
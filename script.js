document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element, and calculate offset for fixed navbar
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 20; // Added extra 20px for breathing room

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Scroll to circuit section from hero button
    const scrollToCircuitBtn = document.querySelector('.scroll-to-circuit');
    if (scrollToCircuitBtn) {
        scrollToCircuitBtn.addEventListener('click', () => {
            const circuitSection = document.getElementById('circuit');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = circuitSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    }

    // Circuit Map Hotspot Logic
    const hotspots = document.querySelectorAll('.hotspot');
    const overlay = document.getElementById('circuit-info-overlay');
    const closeOverlayBtn = document.querySelector('.close-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayImage = document.getElementById('overlay-image');
    const overlayHistory = document.getElementById('overlay-history');
    const overlayDrivers = document.getElementById('overlay-drivers');
    const arSpeed = document.getElementById('ar-speed');
    const arGforce = document.getElementById('ar-gforce');
    const arBraking = document.getElementById('ar-braking');

    const circuitData = {
        turn1: {
            title: "Curva 1: Sainte Dévote - Mónaco",
            image: "curva1.jpg", // Placeholder updated for visual variety
            history: "Testigo de adelantamientos legendarios y maniobras atrevidas desde 1929. La primera verdadera prueba de habilidad en cada Gran Premio de Mónaco. Su estrechez y la barrera cercana lo hacen un punto crítico.",
            drivers: "Un desafío dominado por leyendas como Ayrton Senna y Graham Hill, que demostraron precisión y valentía en su paso por aquí.",
            speed: "200 km/h (Entrada) | 80 km/h (Ápice)",
            gforce: "3.5G Lateral",
            braking: "120 metros"
        },
        hairpin: {
            title: "Horquilla Loews (Fairmont) - Mónaco",
            image: "curva2.webp", // Placeholder updated
            history: "La curva más lenta y cerrada del calendario de F1, crucial para la estrategia. Ofrece una vista increíble del manejo del coche a baja velocidad y es un punto clave para la cámara lenta.",
            drivers: "Un punto clave para la destreza y el control del acelerador de pilotos como Michael Schumacher y Lewis Hamilton.",
            speed: "45 km/h",
            gforce: "1.5G",
            braking: "0 metros (giro constante y precisión extrema)"
        },
        pitlane: {
            title: "Pit Lane - Área de Garajes - Mónaco",
            image: "pitlane.jpg", // Placeholder updated
            history: "El centro neurálgico de la estrategia de carrera. Aquí se deciden las victorias y se pierden las carreras en cuestión de segundos durante las paradas en boxes. La coordinación del equipo es vital.",
            drivers: "Hogar de los equipos de ingenieros y mecánicos, verdaderos héroes invisibles de la F1. Los pilotos confían plenamente en su eficiencia.",
            speed: "Velocidad Límite: 80 km/h (estricto)",
            gforce: "N/A (zona de baja velocidad)",
            braking: "Paradas de 2 segundos (promedio de F1)"
        },
        startfinish: {
            title: "Línea de Salida/Meta - Recta Principal",
            image: "lineametamonaco.jpg", // Placeholder updated
            history: "El punto de partida de la emoción y el final de la gloria en Mónaco. Ha sido testigo de innumerables arranques explosivos y finales de carrera dramáticos, con poco margen de error.",
            drivers: "El lugar donde los campeones cruzan la línea para la victoria y se graban en la historia, sintiendo la adrenalina pura.",
            speed: "Hasta 300 km/h (velocidad máxima)",
            gforce: "2.0G Aceleración (al inicio)",
            braking: "N/A (Recta larga, poca frenada)"
        }
    };

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const spotId = hotspot.dataset.spot;
            const data = circuitData[spotId];

            if (data) {
                overlayTitle.textContent = data.title;
                overlayImage.src = data.image;
                overlayImage.alt = data.title; // Ensure alt text is dynamic
                overlayHistory.textContent = data.history;
                overlayDrivers.textContent = data.drivers;
                arSpeed.textContent = data.speed;
                arGforce.textContent = data.gforce;
                arBraking.textContent = data.braking;

                overlay.classList.add('visible');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is active
            }
        });
    });

    closeOverlayBtn.addEventListener('click', () => {
        overlay.classList.remove('visible');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close overlay if clicking outside content
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('visible');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });


    // AR Filter Demo Logic
    const filterButtons = document.querySelectorAll('.ar-filter-demo .btn-secondary');
    const ghostCarOverlay = document.getElementById('ghost-car-overlay');
    const driverStatsOverlay = document.getElementById('driver-stats-overlay');
    const demoImage = document.getElementById('filter-demo-image');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Deactivate all first
            ghostCarOverlay.classList.remove('active');
            driverStatsOverlay.classList.remove('active');
            demoImage.style.filter = 'none'; // Reset image filter

            if (filter === 'ghost-car') {
                ghostCarOverlay.classList.add('active');
                demoImage.style.filter = 'brightness(0.7)'; // Slightly dim base image for effect
            } else if (filter === 'driver-stats') {
                driverStatsOverlay.classList.add('active');
                demoImage.style.filter = 'brightness(0.8)'; // Slightly dim base image for effect
            }
            // 'reset' filter will just deactivate all, which is already done above
        });
    });

    // Simulated Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            alert('¡Gracias por tu interés! Este es un formulario de demostración y tus datos no han sido enviados. Nos pondremos en contacto contigo pronto (¡en una demo)!'); // More detailed message
            contactForm.reset(); // Clear the form
        });
    }
});
// --- INICIALIZACIÓN ---
let carrito = JSON.parse(localStorage.getItem('appleShineCarrito')) || [];
window.calificacionActual = 5; // Valor por defecto para las estrellas

document.addEventListener('DOMContentLoaded', () => {
    // Solo ejecutamos las funciones si el elemento existe en la página actual
    if (document.getElementById('contenedor-carrito')) renderizarCarrito();
    if (document.getElementById('selector-estrellas')) initEstrellas();
    if (document.getElementById('review-form')) initReviews();
});

// --- LÓGICA DEL CARRITO (Añadir) ---
document.addEventListener('click', (e) => {
    if (e.target.innerText === 'Añadir') {
        const card = e.target.closest('.product-card') || e.target.closest('.service-card');
        
        // Buscamos el precio (puede ser .product-price o .service-price)
        const precioElemento = card.querySelector('.product-price') || card.querySelector('.service-price');
        
        const item = {
            id: card.querySelector('h3').innerText,
            nombre: card.querySelector('h3').innerText,
            precio: parseFloat(precioElemento.innerText.replace('$', '')),
            imagen: card.querySelector('img').src,
            cantidad: 1
        };

        agregarAlCarrito(item);
    }
});

function agregarAlCarrito(item) {
    const existe = carrito.find(p => p.id === item.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(item);
    }
    guardarYActualizar();
    alert(`¡${item.nombre} añadido al carrito! ✨`);
}

function guardarYActualizar() {
    localStorage.setItem('appleShineCarrito', JSON.stringify(carrito));
    // Si estamos en la página del carrito, lo refrescamos visualmente
    if (document.getElementById('contenedor-carrito')) renderizarCarrito();
}

// --- RENDERIZAR CARRITO (Bootstrap Design) ---
function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito');
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-center h5 text-muted py-5'>Tu carrito está vacío.</p>";
    }

    carrito.forEach((item, index) => {
        contenedor.innerHTML += `
            <div class="card mb-3 p-3 shadow-sm border-0">
                <div class="row align-items-center">
                    <div class="col-3 col-md-2">
                        <img src="${item.imagen}" class="img-fluid rounded" alt="${item.nombre}">
                    </div>
                    <div class="col-6 col-md-6">
                        <h5 class="mb-1">${item.nombre}</h5>
                        <p class="text-muted small mb-0">$${item.precio} c/u</p>
                        <div class="d-flex align-items-center gap-2 mt-2">
                            <button class="btn btn-sm btn-light border" onclick="cambiarCant(${index}, -1)">-</button>
                            <span class="fw-bold">${item.cantidad}</span>
                            <button class="btn btn-sm btn-light border" onclick="cambiarCant(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-3 col-md-4 text-end">
                        <p class="fw-bold mb-2">$${(item.precio * item.cantidad).toFixed(2)}</p>
                        <button class="btn btn-sm text-danger" onclick="eliminarItem(${index})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    });
    actualizarTotales();
}

window.cambiarCant = (index, delta) => {
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad < 1) return eliminarItem(index);
    guardarYActualizar();
}

window.eliminarItem = (index) => {
    carrito.splice(index, 1);
    guardarYActualizar();
}

function actualizarTotales() {
    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const impuestos = subtotal * 0.21;
    const total = subtotal + impuestos;

    if (document.getElementById('subtotal-carrito')) {
        document.getElementById('subtotal-carrito').innerText = `$${subtotal.toFixed(2)}`;
        document.getElementById('impuestos-carrito').innerText = `$${impuestos.toFixed(2)}`;
        document.getElementById('total-carrito').innerText = `$${total.toFixed(2)}`;
    }
}

// --- LÓGICA DE ESTRELLAS ---
function initEstrellas() {
    const stars = document.querySelectorAll('#selector-estrellas span');
    stars.forEach((s, i) => {
        // Efecto visual al pasar el mouse
        s.addEventListener('mouseover', () => {
            stars.forEach((st, index) => {
                st.style.color = index <= i ? '#ff9a08' : '#ccc';
            });
        });
        
        // Volver al estado real al sacar el mouse
        s.addEventListener('mouseout', () => {
            stars.forEach((st, index) => {
                st.style.color = index < window.calificacionActual ? '#ff9a08' : '#ccc';
            });
        });

        s.addEventListener('click', () => {
            window.calificacionActual = i + 1;
            // Actualizar visualmente de forma permanente
            stars.forEach((st, index) => {
                st.innerText = index <= i ? "★" : "☆";
            });
        });
    });
}

// --- LÓGICA DE OPINIONES (IDs Alineados con HTML) ---
function initReviews() {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Usamos los IDs actualizados: nombre-review y texto-review
        const nombre = document.getElementById('nombre-review').value;
        const opinion = document.getElementById('texto-review').value;
        const tipo = document.getElementById('tipo-review').value;
        const estrellas = "★".repeat(window.calificacionActual) + "☆".repeat(5 - window.calificacionActual);

        const reviewHtml = `
            <div class="col-md-6">
                <article class="card p-3 shadow-sm border-0 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h4 class="h6 mb-0 fw-bold">${nombre}</h4>
                        <span class="text-warning">${estrellas}</span>
                    </div>
                    <p class="small text-muted mb-2">${opinion}</p>
                    <span class="badge bg-light text-dark align-self-start border">${tipo}</span>
                </article>
            </div>
        `;
        
        document.getElementById('grid-opiniones').insertAdjacentHTML('afterbegin', reviewHtml);
        form.reset();
        // Reset visual de estrellas a 5
        document.querySelectorAll('#selector-estrellas span').forEach(s => s.innerText = "★");
        window.calificacionActual = 5;
        alert("¡Gracias por tu opinión! Se ha publicado debajo.");
    });
}